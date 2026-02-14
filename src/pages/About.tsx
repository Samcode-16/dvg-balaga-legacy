import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAbout } from '@/hooks/useContent';
import SectionHeading from '@/components/SectionHeading';
import { Skeleton } from '@/components/ui/skeleton';
import heroImage from '@/assets/hero-literary.jpg';

/** Per-trustee photo with fallback to initial letter */
const TrusteePhoto = ({ trustee, language }: { trustee: { name: { en: string; kn: string }; photo?: string }; language: 'en' | 'kn' }) => {
  const [imgError, setImgError] = useState(false);
  const hasPhoto = trustee.photo && !imgError;

  if (hasPhoto) {
    return (
      <img
        src={trustee.photo}
        alt={trustee.name[language]}
        className="h-full w-full object-cover"
        onError={() => setImgError(true)}
      />
    );
  }

  return <span className="font-display text-2xl font-bold">{trustee.name[language].charAt(0)}</span>;
};

const About = () => {
  const { language, t } = useLanguage();
  const { data: about, isLoading } = useAbout();

  const content = about?.[language];
  const milestones = about?.milestones ?? [];
  const trustees = about?.trustees ?? [];
  const founder = about?.founder;

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
          <SectionHeading title={{ en: content?.foundingTitle ?? 'Our Founding Story', kn: content?.foundingTitle ?? 'ನಮ್ಮ ಸ್ಥಾಪನೆಯ ಕಥೆ' }} />

          {isLoading ? (
            <div className="mt-10 space-y-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <Skeleton key={i} className="h-6 w-full rounded" />
              ))}
            </div>
          ) : (
            <div className="mt-10 space-y-6 text-lg leading-relaxed text-foreground">
              <p>{content?.founding}</p>
              <p>{content?.mysuru}</p>
              <p>{content?.award}</p>
              <p>{content?.growth}</p>
              <p>{content?.trust}</p>
            </div>
          )}
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
                  <p className="mt-1 text-foreground">{m[language]}</p>
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
            {content?.future}
          </p>
        </div>
      </section>

      <section className="bg-primary py-16 text-primary-foreground">
        <div className="container mx-auto max-w-3xl px-4 text-center">
          <h2 className="font-display text-3xl font-bold">
            {t('Our Trustees', 'ನಮ್ಮ ಟ್ರಸ್ಟಿಗಳು')}
          </h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {trustees.map((trustee, i) => (
              <div key={i} className="rounded-lg border border-primary-foreground/20 p-6">
                <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center overflow-hidden rounded-full bg-primary-foreground/10">
                  <TrusteePhoto trustee={trustee} language={language} />
                </div>
                <h3 className="font-display text-lg font-semibold">{trustee.name[language]}</h3>
                <p className="mt-1 text-sm opacity-70">{trustee.role[language]}</p>
              </div>
            ))}
          </div>
          <p className="mt-8 text-sm italic opacity-70">
            {founder?.[language] ?? t(
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
