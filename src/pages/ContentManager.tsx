import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useEvents, usePublications, useAwards } from '@/hooks/useContent';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Download, Plus, Copy, Check, Trash2, FileJson } from 'lucide-react';
import type { Event, Publication, AwardEntry } from '@/data/content';

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function generateId(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
    .slice(0, 48);
}

function downloadJSON(data: unknown, filename: string) {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <Button
      variant="outline"
      size="sm"
      onClick={() => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }}
    >
      {copied ? <Check className="mr-1 h-4 w-4" /> : <Copy className="mr-1 h-4 w-4" />}
      {copied ? 'Copied!' : 'Copy JSON'}
    </Button>
  );
}

/* ------------------------------------------------------------------ */
/*  Event Form                                                         */
/* ------------------------------------------------------------------ */

const emptyEvent: Omit<Event, 'id'> = {
  title: { en: '', kn: '' },
  description: { en: '', kn: '' },
  date: '',
  location: '',
  type: 'seminar',
};

function EventForm({
  onAdd,
}: {
  onAdd: (evt: Event) => void;
}) {
  const [form, setForm] = useState(emptyEvent);

  const update = (field: string, value: string) => {
    const keys = field.split('.');
    setForm((prev) => {
      const next = { ...prev } as any;
      if (keys.length === 2) {
        next[keys[0]] = { ...next[keys[0]], [keys[1]]: value };
      } else {
        next[keys[0]] = value;
      }
      return next;
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const id = generateId(form.title.en + '-' + form.date);
    onAdd({ id, ...form });
    setForm(emptyEvent);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <Label>Title (English)</Label>
          <Input value={form.title.en} onChange={(e) => update('title.en', e.target.value)} required />
        </div>
        <div>
          <Label>Title (Kannada)</Label>
          <Input value={form.title.kn} onChange={(e) => update('title.kn', e.target.value)} required />
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <Label>Description (English)</Label>
          <Textarea value={form.description.en} onChange={(e) => update('description.en', e.target.value)} required />
        </div>
        <div>
          <Label>Description (Kannada)</Label>
          <Textarea value={form.description.kn} onChange={(e) => update('description.kn', e.target.value)} required />
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        <div>
          <Label>Date</Label>
          <Input value={form.date} onChange={(e) => update('date', e.target.value)} placeholder="e.g. March 2026" required />
        </div>
        <div>
          <Label>Location</Label>
          <Input value={form.location} onChange={(e) => update('location', e.target.value)} required />
        </div>
        <div>
          <Label>Type</Label>
          <Select value={form.type} onValueChange={(v) => update('type', v)}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="upanyasa">Upanyasa</SelectItem>
              <SelectItem value="award">Award</SelectItem>
              <SelectItem value="seminar">Seminar</SelectItem>
              <SelectItem value="camp">Camp</SelectItem>
              <SelectItem value="release">Book Release</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <Label>Chief Guest (optional)</Label>
          <Input value={form.chiefGuest || ''} onChange={(e) => update('chiefGuest', e.target.value)} />
        </div>
        <div>
          <Label>President (optional)</Label>
          <Input value={form.president || ''} onChange={(e) => update('president', e.target.value)} />
        </div>
      </div>
      <Button type="submit">
        <Plus className="mr-1 h-4 w-4" /> Add Event
      </Button>
    </form>
  );
}

/* ------------------------------------------------------------------ */
/*  Publication Form                                                   */
/* ------------------------------------------------------------------ */

const emptyPub: Omit<Publication, 'id'> = {
  title: { en: '', kn: '' },
  author: '',
  description: { en: '', kn: '' },
  year: new Date().getFullYear(),
  price: undefined,
  type: 'original',
  coverPlaceholder: '',
};

function PublicationForm({ onAdd }: { onAdd: (p: Publication) => void }) {
  const [form, setForm] = useState(emptyPub);

  const update = (field: string, value: string | number) => {
    const keys = field.split('.');
    setForm((prev) => {
      const next = { ...prev } as any;
      if (keys.length === 2) {
        next[keys[0]] = { ...next[keys[0]], [keys[1]]: value };
      } else {
        next[keys[0]] = value;
      }
      return next;
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const id = generateId(form.title.en);
    const entry: Publication = {
      id,
      ...form,
      coverPlaceholder: form.coverPlaceholder || `[Book Cover Placeholder — ${form.title.en}]`,
    };
    // Remove undefined price
    if (!entry.price) delete entry.price;
    onAdd(entry);
    setForm(emptyPub);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <Label>Title (English)</Label>
          <Input value={form.title.en} onChange={(e) => update('title.en', e.target.value)} required />
        </div>
        <div>
          <Label>Title (Kannada)</Label>
          <Input value={form.title.kn} onChange={(e) => update('title.kn', e.target.value)} required />
        </div>
      </div>
      <div>
        <Label>Author</Label>
        <Input value={form.author} onChange={(e) => update('author', e.target.value)} required />
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <Label>Description (English)</Label>
          <Textarea value={form.description.en} onChange={(e) => update('description.en', e.target.value)} required />
        </div>
        <div>
          <Label>Description (Kannada)</Label>
          <Textarea value={form.description.kn} onChange={(e) => update('description.kn', e.target.value)} required />
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        <div>
          <Label>Year</Label>
          <Input type="number" value={form.year} onChange={(e) => update('year', Number(e.target.value))} required />
        </div>
        <div>
          <Label>Price (INR, optional)</Label>
          <Input type="number" value={form.price || ''} onChange={(e) => update('price', e.target.value ? Number(e.target.value) : '')} />
        </div>
        <div>
          <Label>Type</Label>
          <Select value={form.type} onValueChange={(v) => update('type', v)}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="translation">Translation</SelectItem>
              <SelectItem value="original">Original</SelectItem>
              <SelectItem value="children">Children</SelectItem>
              <SelectItem value="commentary">Commentary</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <Button type="submit">
        <Plus className="mr-1 h-4 w-4" /> Add Publication
      </Button>
    </form>
  );
}

/* ------------------------------------------------------------------ */
/*  Award Form                                                         */
/* ------------------------------------------------------------------ */

const emptyAward: Omit<AwardEntry, 'id'> = {
  year: new Date().getFullYear(),
  recipient: '',
  recipientKn: '',
  citation: { en: '', kn: '' },
};

function AwardForm({ onAdd }: { onAdd: (a: AwardEntry) => void }) {
  const [form, setForm] = useState(emptyAward);

  const update = (field: string, value: string | number) => {
    const keys = field.split('.');
    setForm((prev) => {
      const next = { ...prev } as any;
      if (keys.length === 2) {
        next[keys[0]] = { ...next[keys[0]], [keys[1]]: value };
      } else {
        next[keys[0]] = value;
      }
      return next;
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const id = `award-${form.year}`;
    const entry: AwardEntry = { id, ...form };
    if (!entry.president) delete entry.president;
    if (!entry.chiefGuest) delete entry.chiefGuest;
    onAdd(entry);
    setForm(emptyAward);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4 md:grid-cols-3">
        <div>
          <Label>Year</Label>
          <Input type="number" value={form.year} onChange={(e) => update('year', Number(e.target.value))} required />
        </div>
        <div>
          <Label>Recipient (English)</Label>
          <Input value={form.recipient} onChange={(e) => update('recipient', e.target.value)} required />
        </div>
        <div>
          <Label>Recipient (Kannada)</Label>
          <Input value={form.recipientKn} onChange={(e) => update('recipientKn', e.target.value)} required />
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <Label>Citation (English)</Label>
          <Textarea value={form.citation.en} onChange={(e) => update('citation.en', e.target.value)} required />
        </div>
        <div>
          <Label>Citation (Kannada)</Label>
          <Textarea value={form.citation.kn} onChange={(e) => update('citation.kn', e.target.value)} required />
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <Label>Chief Guest (optional)</Label>
          <Input value={form.chiefGuest || ''} onChange={(e) => update('chiefGuest', e.target.value)} />
        </div>
        <div>
          <Label>President (optional)</Label>
          <Input value={form.president || ''} onChange={(e) => update('president', e.target.value)} />
        </div>
      </div>
      <Button type="submit">
        <Plus className="mr-1 h-4 w-4" /> Add Award
      </Button>
    </form>
  );
}

/* ------------------------------------------------------------------ */
/*  Main Content Manager Page                                          */
/* ------------------------------------------------------------------ */

const ContentManager = () => {
  const { t } = useLanguage();

  // Fetch existing data
  const { data: existingEvents = [] } = useEvents();
  const { data: existingPubs = [] } = usePublications();
  const { data: existingAwards = [] } = useAwards();

  // Local state for new entries added via forms
  const [newEvents, setNewEvents] = useState<Event[]>([]);
  const [newPubs, setNewPubs] = useState<Publication[]>([]);
  const [newAwards, setNewAwards] = useState<AwardEntry[]>([]);

  // Combined lists
  const allEvents = [...existingEvents, ...newEvents];
  const allPubs = [...existingPubs, ...newPubs];
  const allAwards = [...existingAwards, ...newAwards];

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-primary py-12 text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <FileJson className="mx-auto mb-4 h-12 w-12 text-gold" />
          <h1 className="font-display text-3xl font-bold md:text-4xl">
            {t('Content Manager', 'ವಿಷಯ ನಿರ್ವಾಹಕ')}
          </h1>
          <p className="mx-auto mt-2 max-w-xl text-primary-foreground/80">
            {t(
              'Add new events, books, and awards. Download the updated JSON files and replace them in public/content/ folder.',
              'ಹೊಸ ಕಾರ್ಯಕ್ರಮಗಳು, ಪುಸ್ತಕಗಳು, ಮತ್ತು ಪ್ರಶಸ್ತಿಗಳನ್ನು ಸೇರಿಸಿ. ನವೀಕರಿಸಿದ JSON ಫೈಲ್‌ಗಳನ್ನು ಡೌನ್‌ಲೋಡ್ ಮಾಡಿ public/content/ ಫೋಲ್ಡರ್‌ನಲ್ಲಿ ಬದಲಾಯಿಸಿ.'
            )}
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-10">
        <Tabs defaultValue="events">
          <TabsList className="mb-6 grid w-full grid-cols-3">
            <TabsTrigger value="events">
              {t('Events', 'ಕಾರ್ಯಕ್ರಮಗಳು')} ({allEvents.length})
            </TabsTrigger>
            <TabsTrigger value="publications">
              {t('Publications', 'ಪ್ರಕಟಣೆಗಳು')} ({allPubs.length})
            </TabsTrigger>
            <TabsTrigger value="awards">
              {t('Awards', 'ಪ್ರಶಸ್ತಿಗಳು')} ({allAwards.length})
            </TabsTrigger>
          </TabsList>

          {/* ---- EVENTS TAB ---- */}
          <TabsContent value="events" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>{t('Add New Event / Programme', 'ಹೊಸ ಕಾರ್ಯಕ್ರಮ ಸೇರಿಸಿ')}</CardTitle>
                <CardDescription>
                  {t('Fill the form to add a new event. Then download the JSON.', 'ಹೊಸ ಕಾರ್ಯಕ್ರಮ ಸೇರಿಸಲು ಫಾರ್ಮ್ ಭರ್ತಿ ಮಾಡಿ.')}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <EventForm onAdd={(evt) => setNewEvents((prev) => [...prev, evt])} />
              </CardContent>
            </Card>

            <div className="flex flex-wrap gap-2">
              <Button onClick={() => downloadJSON(allEvents, 'events.json')}>
                <Download className="mr-1 h-4 w-4" /> Download events.json
              </Button>
              <CopyButton text={JSON.stringify(allEvents, null, 2)} />
            </div>

            <Card>
              <CardHeader>
                <CardTitle>{t('Current Events', 'ಪ್ರಸ್ತುತ ಕಾರ್ಯಕ್ರಮಗಳು')} ({allEvents.length})</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {allEvents.map((evt, i) => (
                    <div key={evt.id} className="flex items-start justify-between rounded-lg border p-3">
                      <div>
                        <p className="font-medium">{evt.title.en}</p>
                        <p className="text-sm text-muted-foreground">{evt.date} &middot; {evt.location} &middot; {evt.type}</p>
                      </div>
                      {i >= existingEvents.length && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setNewEvents((prev) => prev.filter((_, j) => j !== i - existingEvents.length))}
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* ---- PUBLICATIONS TAB ---- */}
          <TabsContent value="publications" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>{t('Add New Book / Publication', 'ಹೊಸ ಪುಸ್ತಕ ಸೇರಿಸಿ')}</CardTitle>
                <CardDescription>
                  {t('Fill the form to add a new publication.', 'ಹೊಸ ಪ್ರಕಟಣೆ ಸೇರಿಸಲು ಫಾರ್ಮ್ ಭರ್ತಿ ಮಾಡಿ.')}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <PublicationForm onAdd={(pub) => setNewPubs((prev) => [...prev, pub])} />
              </CardContent>
            </Card>

            <div className="flex flex-wrap gap-2">
              <Button onClick={() => downloadJSON(allPubs, 'publications.json')}>
                <Download className="mr-1 h-4 w-4" /> Download publications.json
              </Button>
              <CopyButton text={JSON.stringify(allPubs, null, 2)} />
            </div>

            <Card>
              <CardHeader>
                <CardTitle>{t('Current Publications', 'ಪ್ರಸ್ತುತ ಪ್ರಕಟಣೆಗಳು')} ({allPubs.length})</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {allPubs.map((pub, i) => (
                    <div key={pub.id} className="flex items-start justify-between rounded-lg border p-3">
                      <div>
                        <p className="font-medium">{pub.title.en}</p>
                        <p className="text-sm text-muted-foreground">{pub.author} &middot; {pub.year} {pub.price ? `&middot; ₹${pub.price}` : ''}</p>
                      </div>
                      {i >= existingPubs.length && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setNewPubs((prev) => prev.filter((_, j) => j !== i - existingPubs.length))}
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* ---- AWARDS TAB ---- */}
          <TabsContent value="awards" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>{t('Add New Award', 'ಹೊಸ ಪ್ರಶಸ್ತಿ ಸೇರಿಸಿ')}</CardTitle>
                <CardDescription>
                  {t('Fill the form to add a new award entry.', 'ಹೊಸ ಪ್ರಶಸ್ತಿ ಸೇರಿಸಲು ಫಾರ್ಮ್ ಭರ್ತಿ ಮಾಡಿ.')}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <AwardForm onAdd={(award) => setNewAwards((prev) => [...prev, award])} />
              </CardContent>
            </Card>

            <div className="flex flex-wrap gap-2">
              <Button onClick={() => downloadJSON(allAwards, 'awards.json')}>
                <Download className="mr-1 h-4 w-4" /> Download awards.json
              </Button>
              <CopyButton text={JSON.stringify(allAwards, null, 2)} />
            </div>

            <Card>
              <CardHeader>
                <CardTitle>{t('Current Awards', 'ಪ್ರಸ್ತುತ ಪ್ರಶಸ್ತಿಗಳು')} ({allAwards.length})</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {allAwards.map((award, i) => (
                    <div key={award.id} className="flex items-start justify-between rounded-lg border p-3">
                      <div>
                        <p className="font-medium">{award.recipient}</p>
                        <p className="text-sm text-muted-foreground">{award.year} {award.president ? `&middot; President: ${award.president}` : ''}</p>
                      </div>
                      {i >= existingAwards.length && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setNewAwards((prev) => prev.filter((_, j) => j !== i - existingAwards.length))}
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Instructions */}
        <Card className="mt-10">
          <CardHeader>
            <CardTitle>{t('How to Update Content', 'ವಿಷಯ ನವೀಕರಣ ಹೇಗೆ')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="prose prose-sm max-w-none dark:prose-invert">
              <h3>{t('Quick Method — Edit JSON Files Directly', 'ತ್ವರಿತ ವಿಧಾನ — JSON ಫೈಲ್‌ಗಳನ್ನು ನೇರವಾಗಿ ಸಂಪಾದಿಸಿ')}</h3>
              <ol>
                <li>
                  {t(
                    'Open the JSON files in the ',
                    'JSON ಫೈಲ್‌ಗಳನ್ನು ತೆರೆಯಿರಿ '
                  )}
                  <code>public/content/</code>
                  {t(' folder', ' ಫೋಲ್ಡರ್‌ನಲ್ಲಿ')}
                </li>
                <li>{t('Add a new entry by copying an existing one and changing the values', 'ಅಸ್ತಿತ್ವದಲ್ಲಿರುವ ನಮೂದನ್ನು ನಕಲಿಸಿ ಮೌಲ್ಯಗಳನ್ನು ಬದಲಾಯಿಸಿ')}</li>
                <li>{t('Deploy the site — the changes appear instantly', 'ಸೈಟ್ ಅನ್ನು ನಿಯೋಜಿಸಿ — ಬದಲಾವಣೆಗಳು ತಕ್ಷಣ ಕಾಣಿಸುತ್ತವೆ')}</li>
              </ol>

              <h3>{t('Using This Page', 'ಈ ಪುಟವನ್ನು ಬಳಸುವುದು')}</h3>
              <ol>
                <li>{t('Fill the form above to add new entries', 'ಹೊಸ ನಮೂದುಗಳನ್ನು ಸೇರಿಸಲು ಮೇಲಿನ ಫಾರ್ಮ್ ಭರ್ತಿ ಮಾಡಿ')}</li>
                <li>{t('Click "Download" to get the updated JSON file', '"ಡೌನ್‌ಲೋಡ್" ಕ್ಲಿಕ್ ಮಾಡಿ ನವೀಕರಿಸಿದ JSON ಪಡೆಯಿರಿ')}</li>
                <li>
                  {t(
                    'Replace the file in ',
                    'ಫೈಲ್ ಅನ್ನು ಬದಲಾಯಿಸಿ '
                  )}
                  <code>public/content/</code>
                </li>
                <li>{t('Commit & deploy', 'ಕಮಿಟ್ ಮಾಡಿ ಮತ್ತು ನಿಯೋಜಿಸಿ')}</li>
              </ol>

              <h3>{t('File Structure', 'ಫೈಲ್ ರಚನೆ')}</h3>
              <pre className="rounded bg-muted p-3 text-sm">
{`public/
  content/
    events.json        ← Events & programmes
    publications.json  ← Books & publications
    awards.json        ← DVG Prashasti awards`}
              </pre>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ContentManager;
