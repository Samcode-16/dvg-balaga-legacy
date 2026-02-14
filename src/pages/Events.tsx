import { useLanguage } from '@/contexts/LanguageContext';
import EventCard from '@/components/EventCard';
import SectionHeading from '@/components/SectionHeading';
import { useEvents } from '@/hooks/useContent';
import { Skeleton } from '@/components/ui/skeleton';
import eventsHero from '@/assets/events-hero.jpg';

const Events = () => {
  const { t } = useLanguage();
  const { data: events = [], isLoading } = useEvents();

  return (
    <>
      <section className="relative overflow-hidden py-20 md:py-28">
        <div className="absolute inset-0">
          <img src={eventsHero} alt="" className="h-full w-full object-cover" />
          <div className="hero-gradient absolute inset-0" />
        </div>
        <div className="relative container mx-auto px-4 text-center">
          <h1 className="font-display text-4xl font-bold text-primary-foreground md:text-5xl">
            {t('Events & Programmes', 'ಕಾರ್ಯಕ್ರಮಗಳು')}
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-lg text-primary-foreground/80">
            {t(
              'Upanyasas, seminars, book releases, and literary celebrations',
              'ಉಪನ್ಯಾಸಗಳು, ವಿಚಾರ ಸಂಕಿರಣಗಳು, ಪುಸ್ತಕ ಬಿಡುಗಡೆಗಳು, ಮತ್ತು ಸಾಹಿತ್ಯ ಆಚರಣೆಗಳು'
            )}
          </p>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <SectionHeading
            title={{ en: 'All Events', kn: 'ಎಲ್ಲಾ ಕಾರ್ಯಕ್ರಮಗಳು' }}
          />

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {isLoading
              ? Array.from({ length: 4 }).map((_, i) => (
                  <Skeleton key={i} className="h-48 rounded-lg" />
                ))
              : events.map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
          </div>
        </div>
      </section>

      {events.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Event',
              name: events[0].title.en,
              description: events[0].description.en,
              startDate: events[0].date,
              location: {
                '@type': 'Place',
                name: events[0].location,
                address: { '@type': 'PostalAddress', addressLocality: 'Mysuru', addressCountry: 'IN' },
              },
              organizer: { '@type': 'Organization', name: 'DVG Balaga Prathisthana' },
            }),
          }}
        />
      )}
    </>
  );
};

export default Events;
