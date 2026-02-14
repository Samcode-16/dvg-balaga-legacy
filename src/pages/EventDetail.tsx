import { useParams, Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { useEvents } from '@/hooks/useContent';
import { Skeleton } from '@/components/ui/skeleton';
import { Calendar, MapPin, Users, ArrowLeft, Clock, Image as ImageIcon } from 'lucide-react';

const typeLabels: Record<string, { en: string; kn: string }> = {
  upanyasa: { en: 'Upanyasa', kn: 'ಉಪನ್ಯಾಸ' },
  award: { en: 'Award Ceremony', kn: 'ಪ್ರಶಸ್ತಿ ಸಮಾರಂಭ' },
  seminar: { en: 'Seminar', kn: 'ವಿಚಾರ ಸಂಕಿರಣ' },
  camp: { en: 'Camp', kn: 'ಶಿಬಿರ' },
  release: { en: 'Book Release', kn: 'ಪುಸ್ತಕ ಬಿಡುಗಡೆ' },
};

// Demo highlights — replace with real data later
const demoHighlights: Record<string, { en: string[]; kn: string[] }> = {
  default: {
    en: [
      'The programme was attended by a large number of literary enthusiasts from across Karnataka.',
      'Special lectures and discussions were held on the relevance of DVG\'s works in modern times.',
      'Cultural performances including renditions of Mankuthimmana Kagga verses were part of the event.',
      'The gathering reflected the growing interest in DVG\'s philosophical and literary contributions.',
    ],
    kn: [
      'ಕರ್ನಾಟಕದ ವಿವಿಧ ಭಾಗಗಳಿಂದ ಹೆಚ್ಚಿನ ಸಂಖ್ಯೆಯ ಸಾಹಿತ್ಯ ಉತ್ಸಾಹಿಗಳು ಕಾರ್ಯಕ್ರಮಕ್ಕೆ ಹಾಜರಾಗಿದ್ದರು.',
      'ಆಧುನಿಕ ಕಾಲದಲ್ಲಿ ಡಿ.ವಿ.ಜಿ ಅವರ ಕೃತಿಗಳ ಪ್ರಸ್ತುತತೆ ಕುರಿತು ವಿಶೇಷ ಉಪನ್ಯಾಸಗಳು ಮತ್ತು ಚರ್ಚೆಗಳು ನಡೆದವು.',
      'ಮಂಕುತಿಮ್ಮನ ಕಗ್ಗದ ಪದ್ಯಗಳ ವಾಚನ ಸೇರಿದಂತೆ ಸಾಂಸ್ಕೃತಿಕ ಕಾರ್ಯಕ್ರಮಗಳು ಈ ಕಾರ್ಯಕ್ರಮದ ಭಾಗವಾಗಿದ್ದವು.',
      'ಡಿ.ವಿ.ಜಿ ಅವರ ತಾತ್ವಿಕ ಮತ್ತು ಸಾಹಿತ್ಯಿಕ ಕೊಡುಗೆಗಳ ಬಗ್ಗೆ ಹೆಚ್ಚುತ್ತಿರುವ ಆಸಕ್ತಿಯನ್ನು ಈ ಕೂಟ ಪ್ರತಿಬಿಂಬಿಸಿತು.',
    ],
  },
};

// Demo gallery placeholders
const demoGallery = [
  'Inauguration ceremony with lamp lighting',
  'Audience during the main lecture',
  'Felicitation of the chief guest',
  'Group photo of organisers and guests',
];

const EventDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { language, t } = useLanguage();
  const { data: events = [], isLoading } = useEvents();

  const event = events.find((e) => e.id === id);

  if (isLoading) {
    return (
      <div className="container mx-auto max-w-4xl px-4 py-16">
        <Skeleton className="mb-4 h-8 w-48" />
        <Skeleton className="mb-8 h-12 w-full" />
        <Skeleton className="h-64 w-full rounded-lg" />
      </div>
    );
  }

  if (!event) {
    return (
      <div className="container mx-auto max-w-4xl px-4 py-20 text-center">
        <h1 className="font-display text-3xl font-bold text-foreground">
          {t('Event Not Found', 'ಕಾರ್ಯಕ್ರಮ ಕಂಡುಬಂದಿಲ್ಲ')}
        </h1>
        <p className="mt-4 text-muted-foreground">
          {t('The event you are looking for does not exist.', 'ನೀವು ಹುಡುಕುತ್ತಿರುವ ಕಾರ್ಯಕ್ರಮ ಅಸ್ತಿತ್ವದಲ್ಲಿಲ್ಲ.')}
        </p>
        <Link to="/events" className="btn-primary-literary mt-6 inline-flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" /> {t('Back to Events', 'ಕಾರ್ಯಕ್ರಮಗಳಿಗೆ ಹಿಂತಿರುಗಿ')}
        </Link>
      </div>
    );
  }

  const title = event.title[language];
  const description = event.description[language];
  const typeLabel = typeLabels[event.type]?.[language] ?? event.type;
  const highlights = demoHighlights[event.id] ?? demoHighlights.default;

  return (
    <>
      {/* Hero */}
      <section className="bg-primary py-16 text-primary-foreground md:py-24">
        <div className="container mx-auto max-w-4xl px-4">
          <Link
            to="/events"
            className="mb-6 inline-flex items-center gap-1.5 text-sm text-primary-foreground/70 transition-colors hover:text-primary-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            {t('All Events', 'ಎಲ್ಲಾ ಕಾರ್ಯಕ್ರಮಗಳು')}
          </Link>

          <div className="mb-4">
            <span className="badge-award">{typeLabel}</span>
          </div>

          <h1 className="font-display text-3xl font-bold leading-tight md:text-4xl lg:text-5xl">
            {title}
          </h1>

          <div className="mt-6 flex flex-wrap gap-6 text-sm text-primary-foreground/80">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" aria-hidden="true" />
              <time>{event.date}{event.endDate ? ` – ${event.endDate}` : ''}</time>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4" aria-hidden="true" />
              <span>{event.location}</span>
            </div>
            {(event.president || event.chiefGuest) && (
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4" aria-hidden="true" />
                <span>
                  {event.president && `${t('President', 'ಅಧ್ಯಕ್ಷರು')}: ${event.president}`}
                  {event.president && event.chiefGuest && ' · '}
                  {event.chiefGuest && `${t('Chief Guest', 'ಮುಖ್ಯ ಅತಿಥಿ')}: ${event.chiefGuest}`}
                </span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Description */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto max-w-4xl px-4">
          <h2 className="font-display text-2xl font-bold text-foreground">
            {t('About This Event', 'ಈ ಕಾರ್ಯಕ್ರಮದ ಬಗ್ಗೆ')}
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-foreground">
            {description}
          </p>
        </div>
      </section>

      {/* Highlights */}
      <section className="bg-muted/30 py-12 md:py-16">
        <div className="container mx-auto max-w-4xl px-4">
          <h2 className="font-display text-2xl font-bold text-foreground">
            {t('Highlights', 'ಮುಖ್ಯಾಂಶಗಳು')}
          </h2>
          <ul className="mt-6 space-y-4">
            {highlights[language].map((item, i) => (
              <li key={i} className="flex gap-3">
                <div className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-gold" aria-hidden="true" />
                <p className="text-foreground">{item}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Schedule / Timeline (demo) */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto max-w-4xl px-4">
          <h2 className="font-display text-2xl font-bold text-foreground">
            {t('Programme Schedule', 'ಕಾರ್ಯಕ್ರಮ ವೇಳಾಪಟ್ಟಿ')}
          </h2>
          <div className="mt-6 space-y-0">
            {[
              { time: '09:00 AM', en: 'Registration & Welcome', kn: 'ನೋಂದಣಿ ಮತ್ತು ಸ್ವಾಗತ' },
              { time: '10:00 AM', en: 'Inauguration & Lamp Lighting', kn: 'ಉದ್ಘಾಟನೆ ಮತ್ತು ದೀಪ ಬೆಳಗುವಿಕೆ' },
              { time: '11:00 AM', en: 'Main Lecture / Discourse', kn: 'ಮುಖ್ಯ ಉಪನ್ಯಾಸ' },
              { time: '01:00 PM', en: 'Lunch Break', kn: 'ಊಟದ ವಿರಾಮ' },
              { time: '02:30 PM', en: 'Panel Discussion / Q&A', kn: 'ಸಮಿತಿ ಚರ್ಚೆ / ಪ್ರಶ್ನೋತ್ತರ' },
              { time: '04:00 PM', en: 'Valedictory & Vote of Thanks', kn: 'ಸಮಾರೋಪ ಮತ್ತು ವಂದನಾರ್ಪಣೆ' },
            ].map((slot, i) => (
              <div key={i} className="flex gap-4 border-l-2 border-gold/30 pb-6 pl-6 last:pb-0 relative">
                <div className="absolute -left-2 top-0 h-4 w-4 rounded-full border-2 border-gold bg-background" aria-hidden="true" />
                <div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-3.5 w-3.5 text-gold" aria-hidden="true" />
                    <span className="text-sm font-semibold text-gold">{slot.time}</span>
                  </div>
                  <p className="mt-1 text-foreground">{slot[language]}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-6 text-sm italic text-muted-foreground">
            {t('* This is a demo schedule. Actual schedule will be updated soon.', '* ಇದು ಡೆಮೊ ವೇಳಾಪಟ್ಟಿ. ನಿಜವಾದ ವೇಳಾಪಟ್ಟಿ ಶೀಘ್ರದಲ್ಲಿ ನವೀಕರಿಸಲಾಗುವುದು.')}
          </p>
        </div>
      </section>

      {/* Gallery placeholders */}
      <section className="bg-muted/30 py-12 md:py-16">
        <div className="container mx-auto max-w-4xl px-4">
          <h2 className="font-display text-2xl font-bold text-foreground">
            {t('Gallery', 'ಗ್ಯಾಲರಿ')}
          </h2>
          <div className="mt-6 grid gap-4 grid-cols-2 md:grid-cols-4">
            {demoGallery.map((caption, i) => (
              <div key={i} className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/20 bg-muted/50 p-6 text-center">
                <ImageIcon className="mb-2 h-8 w-8 text-muted-foreground/40" aria-hidden="true" />
                <p className="text-xs text-muted-foreground">{caption}</p>
              </div>
            ))}
          </div>
          <p className="mt-4 text-sm italic text-muted-foreground">
            {t('* Photos will be added soon.', '* ಫೋಟೋಗಳನ್ನು ಶೀಘ್ರದಲ್ಲಿ ಸೇರಿಸಲಾಗುವುದು.')}
          </p>
        </div>
      </section>

      {/* Back link */}
      <section className="py-10">
        <div className="container mx-auto max-w-4xl px-4 text-center">
          <Link to="/events" className="btn-primary-literary inline-flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            {t('Back to All Events', 'ಎಲ್ಲಾ ಕಾರ್ಯಕ್ರಮಗಳಿಗೆ ಹಿಂತಿರುಗಿ')}
          </Link>
        </div>
      </section>

      {/* Structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Event',
            name: event.title.en,
            description: event.description.en,
            startDate: event.date,
            location: {
              '@type': 'Place',
              name: event.location,
              address: { '@type': 'PostalAddress', addressLocality: 'Mysuru', addressCountry: 'IN' },
            },
            organizer: { '@type': 'Organization', name: 'DVG Balaga Prathisthana' },
          }),
        }}
      />
    </>
  );
};

export default EventDetail;
