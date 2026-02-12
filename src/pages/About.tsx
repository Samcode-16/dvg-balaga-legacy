import { useLanguage } from '@/contexts/LanguageContext';
import { aboutContent } from '@/data/content';
import SectionHeading from '@/components/SectionHeading';
import heroImage from '@/assets/hero-literary.jpg';

const About = () => {
  const { language, t } = useLanguage();
  const content = aboutContent[language];

  const milestones = [
    { year: '2009', event: t('DVG Balaga founded at Kushalanagar, Kodagu on March 17', 'ಮಾರ್ಚ್ ೧೭ ರಂದು ಕೊಡಗಿನ ಕುಶಾಲನಗರದಲ್ಲಿ ಡಿ.ವಿ.ಜಿ ಬಳಗ ಸ್ಥಾಪನೆ') },
    { year: '2012', event: t('DVG Balaga Mysuru inaugurated by Sri G S Natesh', 'ಶ್ರೀ ಜಿ.ಎಸ್. ನಟೇಶ ಅವರಿಂದ ಡಿ.ವಿ.ಜಿ ಬಳಗ ಮೈಸೂರು ಉದ್ಘಾಟನೆ') },
    { year: '2013', event: t('First DVG Prashasti — Dr. N Ranganatha Sharma', 'ಮೊದಲ ಡಿ.ವಿ.ಜಿ ಪ್ರಶಸ್ತಿ — ಡಾ. ಎನ್. ರಂಗನಾಥ ಶರ್ಮ') },
    { year: '2014', event: t('DVG Balaga Pune inaugurated on Dec 14', 'ಡಿಸೆಂಬರ್ ೧೪ ರಂದು ಡಿ.ವಿ.ಜಿ ಬಳಗ ಪುಣೆ ಉದ್ಘಾಟನೆ') },
    { year: '2016–20', event: t('Golden period — 18+ programmes at Karnataka Bank hall, Mangaluru', 'ಸುವರ್ಣ ಕಾಲ — ಕರ್ನಾಟಕ ಬ್ಯಾಂಕ್ ಸಭಾಂಗಣದಲ್ಲಿ ೧೮+ ಕಾರ್ಯಕ್ರಮಗಳು') },
    { year: '2018', event: t('Formally registered as DVG Balaga Prathisthana (Trust)', 'ಡಿ.ವಿ.ಜಿ ಬಳಗ ಪ್ರತಿಷ್ಠಾನ ಎಂದು ಔಪಚಾರಿಕವಾಗಿ ನೋಂದಣಿ (ಟ್ರಸ್ಟ್)') },
    { year: '2025', event: t('DVG Award to TaNaShi; Geetha Shankara programme', 'ತಾನಾಶಿ ಅವರಿಗೆ ಡಿ.ವಿ.ಜಿ ಪ್ರಶಸ್ತಿ; ಗೀತ ಶಂಕರ ಕಾರ್ಯಕ್ರಮ') },
  ];

  return (
    <>
      <section className="relative overflow-hidden py-20 md:py-28">
        <div className="absolute inset-0">
          <img src={heroImage} alt="" className="h-full w-full object-cover" />
          <div className="hero-gradient absolute inset-0" />
        </div>
        <div className="relative container mx-auto px-4 text-center">
          <h1 className="font-display text-4xl font-bold text-primary-foreground md:text-5xl">
            {t('About Us', 'ನಮ್ಮ ಬಗ್ಗೆ')}
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-lg text-primary-foreground/80">
            {t(
              'The story of a literary movement rooted in love for DVG\'s works',
              'ಡಿ.ವಿ.ಜಿ ಅವರ ಕೃತಿಗಳ ಪ್ರೀತಿಯಲ್ಲಿ ಬೇರೂರಿರುವ ಸಾಹಿತ್ಯ ಚಳವಳಿಯ ಕಥೆ'
            )}
          </p>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="container mx-auto max-w-3xl px-4">
          <SectionHeading title={{ en: content.foundingTitle, kn: content.foundingTitle }} />

          <div className="mt-10 space-y-6 text-lg leading-relaxed text-foreground">
            <p>{content.founding}</p>
            <p>{content.mysuru}</p>
            <p>{content.award}</p>
            <p>{content.growth}</p>
            <p>{content.trust}</p>
          </div>
        </div>
      </section>

      <section className="bg-muted/30 py-16 md:py-20" aria-label="Milestones">
        <div className="container mx-auto max-w-3xl px-4">
          <SectionHeading
            title={{ en: 'Key Milestones', kn: 'ಪ್ರಮುಖ ಮೈಲಿಗಲ್ಲುಗಳು' }}
          />

          <div className="mt-10 space-y-0">
            {milestones.map((m, i) => (
              <div key={i} className="flex gap-6 border-l-2 border-gold/30 pb-8 pl-6 last:pb-0 relative">
                <div className="absolute -left-2 top-0 h-4 w-4 rounded-full border-2 border-gold bg-background" aria-hidden="true" />
                <div>
                  <span className="font-display text-lg font-bold text-gold">{m.year}</span>
                  <p className="mt-1 text-foreground">{m.event}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="container mx-auto max-w-3xl px-4 text-center">
          <SectionHeading
            title={{ en: 'Looking Ahead', kn: 'ಮುಂದಿನ ನೋಟ' }}
          />
          <p className="mt-8 text-lg leading-relaxed text-foreground">
            {content.future}
          </p>
        </div>
      </section>

      <section className="bg-primary py-16 text-primary-foreground">
        <div className="container mx-auto max-w-3xl px-4 text-center">
          <h2 className="font-display text-3xl font-bold">
            {t('Our Trustees', 'ನಮ್ಮ ಟ್ರಸ್ಟಿಗಳು')}
          </h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {[
              { name: t('Mrs. H A Nandini', 'ಶ್ರೀಮತಿ ಎಚ್.ಎ. ನಂದಿನಿ'), role: t('Managing Trustee', 'ವ್ಯವಸ್ಥಾಪಕ ಟ್ರಸ್ಟಿ') },
              { name: t('Vidwan G S Natesh', 'ವಿದ್ವಾನ್ ಜಿ.ಎಸ್. ನಟೇಶ'), role: t('Trustee', 'ಟ್ರಸ್ಟಿ') },
              { name: t('Dr. Virupaksha Devaramane', 'ಡಾ. ವಿರೂಪಾಕ್ಷ ದೇವರಮನೆ'), role: t('Trustee', 'ಟ್ರಸ್ಟಿ') },
            ].map((trustee, i) => (
              <div key={i} className="rounded-lg border border-primary-foreground/20 p-6">
                <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-primary-foreground/10">
                  <span className="font-display text-2xl font-bold">{trustee.name.charAt(0)}</span>
                </div>
                <h3 className="font-display text-lg font-semibold">{trustee.name}</h3>
                <p className="mt-1 text-sm opacity-70">{trustee.role}</p>
              </div>
            ))}
          </div>
          <p className="mt-8 text-sm italic opacity-70">
            {t(
              'Founded by Sri Kanakaraju C — Literature Enthusiast & Visionary',
              'ಸ್ಥಾಪಕ: ಶ್ರೀ ಕನಕರಾಜು ಸಿ — ಸಾಹಿತ್ಯ ಉತ್ಸಾಹಿ ಮತ್ತು ದೂರದರ್ಶಿ'
            )}
          </p>
        </div>
      </section>
    </>
  );
};

export default About;
