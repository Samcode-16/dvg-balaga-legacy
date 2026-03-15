import { readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

/* ------------------------------------------------------------------ */
/*  .env loader (no external deps needed)                              */
/* ------------------------------------------------------------------ */
async function loadDotEnv() {
  try {
    const content = await readFile(resolve(process.cwd(), '.env'), 'utf8');
    for (const line of content.split('\n')) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) continue;
      const eqIdx = trimmed.indexOf('=');
      if (eqIdx < 0) continue;
      const key = trimmed.slice(0, eqIdx).trim();
      const value = trimmed.slice(eqIdx + 1).trim().replace(/^['"]|['"]$/g, '');
      if (key && !(key in process.env)) process.env[key] = value;
    }
  } catch {
    // .env not present — rely on process.env (CI / hosting environment)
  }
}

/* ------------------------------------------------------------------ */
/*  Cloudinary Admin API — list images in a folder                    */
/* ------------------------------------------------------------------ */
async function fetchFolderImages(folder) {
  const cloudName = process.env.VITE_CLOUDINARY_CLOUD_NAME;
  const apiKey    = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;

  if (!cloudName || !apiKey || !apiSecret) return null;

  const auth   = Buffer.from(`${apiKey}:${apiSecret}`).toString('base64');
  const prefix = folder.endsWith('/') ? folder : `${folder}/`;
  const params = new URLSearchParams({ prefix, type: 'upload', max_results: '500' });
  const url    = `https://api.cloudinary.com/v1_1/${cloudName}/resources/image?${params}`;

  try {
    const res = await fetch(url, { headers: { Authorization: `Basic ${auth}` } });
    if (!res.ok) {
      console.warn(`  Cloudinary folder fetch failed for "${folder}": ${res.status} ${res.statusText}`);
      return null;
    }
    const data = await res.json();
    const resources = (data.resources ?? []).sort((a, b) =>
      a.public_id.localeCompare(b.public_id),
    );
    return resources.map((r) => `cloudinary:${r.public_id}`);
  } catch (err) {
    console.warn(`  Cloudinary folder fetch error for "${folder}":`, err.message);
    return null;
  }
}

/* ------------------------------------------------------------------ */
/*  Step 1 — convert local /images/... paths → cloudinary: shorthand  */
/* ------------------------------------------------------------------ */
const MEDIA_STRING_KEYS = new Set(['photo']);
const MEDIA_ARRAY_KEYS  = new Set(['gallery']);

function toCloudinaryShorthand(value) {
  if (typeof value !== 'string') return value;
  const trimmed = value.trim();
  if (!trimmed || trimmed.startsWith('cloudinary:')) return value;

  const marker = '/images/';
  const idx = trimmed.indexOf(marker);
  if (idx >= 0) {
    const publicId = trimmed.slice(idx + marker.length).replace(/^\/+/, '');
    if (publicId) return `cloudinary:${publicId}`;
  }
  if (trimmed.startsWith('images/')) {
    const publicId = trimmed.slice('images/'.length).replace(/^\/+/, '');
    if (publicId) return `cloudinary:${publicId}`;
  }
  return value;
}

function normalizePaths(input) {
  if (Array.isArray(input)) return input.map(normalizePaths);
  if (input && typeof input === 'object') {
    const out = {};
    for (const [key, value] of Object.entries(input)) {
      if (MEDIA_STRING_KEYS.has(key) && typeof value === 'string') {
        out[key] = toCloudinaryShorthand(value);
      } else if (MEDIA_ARRAY_KEYS.has(key) && Array.isArray(value)) {
        out[key] = value.map((item) =>
          typeof item === 'string' ? toCloudinaryShorthand(item) : item,
        );
      } else {
        out[key] = normalizePaths(value);
      }
    }
    return out;
  }
  return input;
}

/* ------------------------------------------------------------------ */
/*  Step 2 — populate gallery[] from galleryFolder via Cloudinary API */
/* ------------------------------------------------------------------ */
async function applyGalleryFolders(input) {
  if (Array.isArray(input)) {
    return Promise.all(input.map(applyGalleryFolders));
  }
  if (input && typeof input === 'object') {
    let out = { ...input };

    if (typeof out.galleryFolder === 'string' && out.galleryFolder) {
      const images = await fetchFolderImages(out.galleryFolder);
      if (images !== null) {
        out.gallery = images;
        console.log(`  ✓ gallery synced for "${out.id ?? out.galleryFolder}" — ${images.length} image(s)`);
      }
    }

    // Recurse into nested objects (but not the gallery array we just set)
    for (const key of Object.keys(out)) {
      if (key !== 'gallery' && out[key] && typeof out[key] === 'object') {
        out[key] = await applyGalleryFolders(out[key]);
      }
    }
    return out;
  }
  return input;
}

/* ------------------------------------------------------------------ */
/*  Per-file processor                                                 */
/* ------------------------------------------------------------------ */
const CONTENT_FILES = [
  'public/content/events.json',
  'public/content/awards.json',
  'public/content/about.json',
];

async function normalizeFile(relativePath) {
  const absolutePath = resolve(process.cwd(), relativePath);
  const source = await readFile(absolutePath, 'utf8');
  let parsed = JSON.parse(source);

  parsed = normalizePaths(parsed);
  parsed = await applyGalleryFolders(parsed);

  const formatted = `${JSON.stringify(parsed, null, 2)}\n`;
  if (formatted !== source) {
    await writeFile(absolutePath, formatted, 'utf8');
    return { path: relativePath, changed: true };
  }
  return { path: relativePath, changed: false };
}

/* ------------------------------------------------------------------ */
/*  Entry point                                                        */
/* ------------------------------------------------------------------ */
async function main() {
  await loadDotEnv();

  const hasAdminCreds = !!(
    process.env.VITE_CLOUDINARY_CLOUD_NAME &&
    process.env.CLOUDINARY_API_KEY &&
    process.env.CLOUDINARY_API_SECRET
  );

  if (hasAdminCreds) {
    console.log('Cloudinary admin credentials found — gallery folders will be synced.');
  } else {
    console.log(
      'Cloudinary admin credentials not set — skipping gallery sync.\n' +
      '  Add CLOUDINARY_API_KEY and CLOUDINARY_API_SECRET to your .env file.',
    );
  }

  const results = await Promise.all(CONTENT_FILES.map(normalizeFile));
  const changed = results.filter((r) => r.changed).map((r) => r.path);

  if (changed.length > 0) {
    console.log(`Normalized: ${changed.join(', ')}`);
  } else {
    console.log('Normalization complete: no changes needed.');
  }
}

main().catch((err) => {
  console.error('Failed to normalize content files:', err);
  process.exit(1);
});
