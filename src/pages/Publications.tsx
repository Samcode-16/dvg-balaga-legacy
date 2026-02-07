import { useLanguage } from '@/contexts/LanguageContext';
import PublicationCard from '@/components/PublicationCard';
import SectionHeading from '@/components/SectionHeading';
import { publications } from '@/data/content';
import pubsHero from '@/assets/publications-hero.jpg';

const Publications = () => {
  const { t } = useLanguage();

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden py-20 md:py-28">
        <div className="absolute inset-0">
          <img src={pubsHero} alt="" className="h-full w-full object-cover" />
          <div className="hero-gradient absolute inset-0" />
        </div>
        <div className="relative container mx-auto px-4 text-center">
          <h1 className="font-display text-4xl font-bold text-primary-foreground md:text-5xl">
            {t('Publications', 'ಪ್ರಕಟಣೆಗಳು')}
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-lg text-primary-foreground/80">
            {t(
              'Books published by DVG Balaga Prathisthana with the help of Sri Jameel of Savanna Prakashana',
              'ಸವನ್ನ ಪ್ರಕಾಶನದ ಶ್ರೀ ಜಮೀಲ್ ಅಸರ ಸಹಾಯದೊಂದಿಗೆ ಡಿ.ವಿ.ಜಿ ಬಳಗ ಪ್ರತಿಷ್ಠಾನ ಪ್ರಕಟಿಸಿದ ಪುಸ್ತಕಗಳು'
            )}
          </p>
        </div>
      </section>

      {/* Publications Grid */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <SectionHeading
            title={{ en: 'Our Books', kn: 'ನಮ್ಮ ಪುಸ್ತಕಗಳು' }}
            subtitle={{
              en: 'Translations, commentaries, and original works that celebrate DVG\'s literary vision',
              kn: 'ಡಿ.ವಿ.ಜಿ ಅವರ ಸಾಹಿತ್ಯ ದೃಷ್ಟಿಯನ್ನು ಆಚರಿಸುವ ಅನುವಾದಗಳು, ವ್ಯಾಖ್ಯಾನಗಳು, ಮತ್ತು ಮೂಲ ಕೃತಿಗಳು',
            }}
          />

          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {publications.map((pub) => (
              <PublicationCard key={pub.id} publication={pub} />
            ))}
          </div>
        </div>
      </section>

      {/* Schema.org structured data for books */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            publications.map((pub) => ({
              '@context': 'https://schema.org',
              '@type': 'Book',
              name: pub.title.en,
              author: { '@type': 'Person', name: pub.author },
              datePublished: String(pub.year),
              publisher: { '@type': 'Organization', name: 'DVG Balaga Prathisthana' },
              description: pub.description.en,
              ...(pub.price && {
                offers: {
                  '@type': 'Offer',
                  price: pub.price,
                  priceCurrency: 'INR',
                  availability: 'https://schema.org/InStock',
                },
              }),
            }))
          ),
        }}
      />
    </>
  );
};

export default Publications;
