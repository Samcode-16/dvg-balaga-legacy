import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import Hero from '@/components/Hero';
import EventCard from '@/components/EventCard';
import PublicationCard from '@/components/PublicationCard';
import SectionHeading from '@/components/SectionHeading';
import { events, publications, awards } from '@/data/content';
import { Award, BookOpen, Calendar, ArrowRight } from 'lucide-react';

const Index = () => {
  const { language, t } = useLanguage();
  const latestEvents = events.slice(0, 3);
  const featuredPubs = publications.slice(0, 2);
  const recentAwards = awards.slice(-3).reverse();

  return (
    <>
      {/* SEO structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: 'DVG Balaga Prathisthana',
            alternateName: 'ಡಿ.ವಿ.ಜಿ ಬಳಗ ಪ್ರತಿಷ್ಠಾನ',
            url: window.location.origin,
            foundingDate: '2009-03-17',
            foundingLocation: { '@type': 'Place', name: 'Kushalanagar, Kodagu, Karnataka' },
            description:
              'A literary trust dedicated to studying, celebrating, and propagating the works of D.V. Gundappa.',
          }),
        }}
      />

      <Hero />

      {/* Stats Strip */}
      <section className="border-b border-border bg-muted/50 py-8" aria-label="Statistics">
        <div className="container mx-auto grid grid-cols-2 gap-6 px-4 md:grid-cols-4">
          {/* Add margin to left-justified text */}
          <div className="mt-4 mb-4 ml-4 mr-4">
            {/* ...existing content... */}
          </div>
          {[
            { icon: Calendar, value: '15+', label: t('Years Active', 'ವರ್ಷಗಳು') },
            { icon: Award, value: `${awards.length}`, label: t('DVG Awards', 'ಡಿ.ವಿ.ಜಿ ಪ್ರಶಸ್ತಿಗಳು') },
            { icon: BookOpen, value: `${publications.length}+`, label: t('Publications', 'ಪ್ರಕಟಣೆಗಳು') },
            { icon: Calendar, value: '18+', label: t('Programmes', 'ಕಾರ್ಯಕ್ರಮಗಳು') },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <stat.icon className="mx-auto h-6 w-6 text-gold" aria-hidden="true" />
              <p className="mt-2 font-display text-2xl font-bold text-foreground">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Recent Events */}
      <section className="py-16 md:py-20" aria-label="Events">
        <div className="container mx-auto px-4">
          <SectionHeading
            title={{ en: 'Recent Events & Programmes', kn: 'ಇತ್ತೀಚಿನ ಕಾರ್ಯಕ್ರಮಗಳು' }}
            subtitle={{
              en: 'Celebrating Kannada literature through lectures, seminars, and cultural gatherings',
              kn: 'ಉಪನ್ಯಾಸ, ವಿಚಾರ ಸಂಕಿರಣ ಮತ್ತು ಸಾಂಸ್ಕೃತಿಕ ಕೂಟಗಳ ಮೂಲಕ ಕನ್ನಡ ಸಾಹಿತ್ಯ ಆಚರಣೆ',
            }}
          />

          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {latestEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>

          <div className="mt-8 text-center">
            <Link
              to="/events"
              className="btn-primary-literary inline-flex items-center gap-2"
            >
              {t('View All Events', 'ಎಲ್ಲಾ ಕಾರ್ಯಕ್ರಮಗಳನ್ನು ನೋಡಿ')}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Publications */}
      <section className="bg-muted/30 py-16 md:py-20" aria-label="Publications">
        <div className="container mx-auto px-4">
          <SectionHeading
            title={{ en: 'Our Publications', kn: 'ನಮ್ಮ ಪ್ರಕಟಣೆಗಳು' }}
            subtitle={{
              en: 'Books that preserve and illuminate DVG\'s literary legacy',
              kn: 'ಡಿ.ವಿ.ಜಿ ಅವರ ಸಾಹಿತ್ಯ ಪರಂಪರೆಯನ್ನು ಸಂರಕ್ಷಿಸುವ ಪುಸ್ತಕಗಳು',
            }}
          />

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {featuredPubs.map((pub) => (
              <PublicationCard key={pub.id} publication={pub} />
            ))}
          </div>

          <div className="mt-8 text-center">
            <Link
              to="/publications"
              className="btn-primary-literary inline-flex items-center gap-2"
            >
              {t('Browse All Publications', 'ಎಲ್ಲಾ ಪ್ರಕಟಣೆಗಳನ್ನು ನೋಡಿ')}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* Recent Awards */}
      <section className="py-16 md:py-20" aria-label="Awards">
        <div className="container mx-auto px-4">
          <SectionHeading
            title={{ en: 'DVG Prashasti — Awards Archive', kn: 'ಡಿ.ವಿ.ಜಿ ಪ್ರಶಸ್ತಿ — ಪ್ರಶಸ್ತಿ ದಾಖಲೆ' }}
            subtitle={{
              en: 'Honoring those who carry forward the spirit of DVG\'s literary vision',
              kn: 'ಡಿ.ವಿ.ಜಿ ಅವರ ಸಾಹಿತ್ಯ ದೃಷ್ಟಿಯ ಆತ್ಮವನ್ನು ಮುಂದುವರಿಸುವವರನ್ನು ಗೌರವಿಸುವುದು',
            }}
          />

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {recentAwards.map((award) => (
              <div key={award.id} className="card-literary p-6 text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gold/10">
                  <Award className="h-7 w-7 text-gold" aria-hidden="true" />
                </div>
                <p className="mt-3 font-display text-2xl font-bold text-gold">{award.year}</p>
                <h3 className="mt-2 font-display text-lg font-bold text-foreground">
                  {language === 'en' ? award.recipient : award.recipientKn}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                  {award.citation[language]}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Link
              to="/awards"
              className="btn-primary-literary inline-flex items-center gap-2"
            >
              {t('View Complete Awards Archive', 'ಪೂರ್ಣ ಪ್ರಶಸ್ತಿ ದಾಖಲೆ ನೋಡಿ')}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* About CTA */}
      <section className="bg-primary py-16 text-primary-foreground" aria-label="About call to action">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-display text-3xl font-bold md:text-4xl">
            {t('The Journey of DVG Balaga', 'ಡಿ.ವಿ.ಜಿ ಬಳಗದ ಪಯಣ')}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg opacity-80">
            {t(
              'From a small gathering of friends in Kushalanagar (2009) reading Mankuthimmana Kagga to a registered literary trust spanning Mysuru, Pune, and Mangaluru.',
              'ಕುಶಾಲನಗರದಲ್ಲಿ (೨೦೦೯) ಮಂಕುತಿಮ್ಮನ ಕಗ್ಗ ಓದುತ್ತಿದ್ದ ಸ್ನೇಹಿತರ ಸಣ್ಣ ಗುಂಪಿನಿಂದ ಮೈಸೂರು, ಪುಣೆ ಮತ್ತು ಮಂಗಳೂರಿಗೆ ವ್ಯಾಪಿಸಿದ ನೋಂದಾಯಿತ ಸಾಹಿತ್ಯ ಟ್ರಸ್ಟ್.'
            )}
          </p>
          <Link
            to="/about"
            className="btn-secondary-literary mt-8 inline-flex items-center gap-2"
          >
            {t('Read Our Story', 'ನಮ್ಮ ಕಥೆ ಓದಿ')}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </section>
    </>
  );
};

export default Index;
