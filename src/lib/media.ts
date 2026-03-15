const BASE_URL = import.meta.env.BASE_URL || '/';

const CLOUDINARY_CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME as string | undefined;
const CLOUDINARY_DELIVERY_PARAMS = (import.meta.env.VITE_CLOUDINARY_DELIVERY_PARAMS as string | undefined) || 'f_auto,q_auto';

const ABSOLUTE_URL_RE = /^(?:https?:)?\/\//i;
const DATA_OR_BLOB_RE = /^(?:data:|blob:)/i;

/**
 * Converts a JSON image value into a browser-safe URL.
 * Supports:
 * - Full URLs: https://res.cloudinary.com/...
 * - Local paths: /images/foo.jpg
 * - Cloudinary shorthand: cloudinary:folder/public-id
 */
export function resolveMediaUrl(value?: string): string | undefined {
  if (!value) return undefined;

  const trimmed = value.trim();
  if (!trimmed) return undefined;

  if (ABSOLUTE_URL_RE.test(trimmed) || DATA_OR_BLOB_RE.test(trimmed)) {
    return trimmed;
  }

  if (trimmed.startsWith('cloudinary:')) {
    const publicId = trimmed.slice('cloudinary:'.length).replace(/^\/+/, '');
    if (!publicId || !CLOUDINARY_CLOUD_NAME) return undefined;

    return `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/upload/${CLOUDINARY_DELIVERY_PARAMS}/${publicId}`;
  }

  if (trimmed.startsWith('/')) {
    const base = BASE_URL.endsWith('/') ? BASE_URL.slice(0, -1) : BASE_URL;
    return `${base}${trimmed}`;
  }

  // Relative paths are treated as static files under public/.
  return `${BASE_URL}${trimmed.replace(/^\/+/, '')}`;
}

const URL_STRING_KEYS = new Set(['photo', 'image', 'cover', 'avatar']);
const URL_ARRAY_KEYS = new Set(['gallery', 'images']);

/**
 * Recursively resolves image-like fields in content JSON payloads.
 */
export function normalizeMediaUrls<T>(input: T): T {
  if (Array.isArray(input)) {
    return input.map((item) => normalizeMediaUrls(item)) as T;
  }

  if (input && typeof input === 'object') {
    const entries = Object.entries(input as Record<string, unknown>).map(([key, value]) => {
      if (URL_STRING_KEYS.has(key) && typeof value === 'string') {
        return [key, resolveMediaUrl(value)];
      }

      if (URL_ARRAY_KEYS.has(key) && Array.isArray(value)) {
        return [
          key,
          value
            .map((item) => (typeof item === 'string' ? resolveMediaUrl(item) : item))
            .filter((item): item is string => typeof item === 'string' && item.length > 0),
        ];
      }

      return [key, normalizeMediaUrls(value)];
    });

    return Object.fromEntries(entries) as T;
  }

  return input;
}
