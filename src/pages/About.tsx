import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAbout } from '@/hooks/useContent';
import SectionHeading from '@/components/SectionHeading';
import { Skeleton } from '@/components/ui/skeleton';
import { Image as ImageIcon, ArrowRight } from 'lucide-react';
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

/** Founder photo with fallback */
const FounderPhoto = ({ founder, language }: { founder: { name?: { en: string; kn: string }; photo?: string } | undefined; language: 'en' | 'kn' }) => {
  const [imgError, setImgError] = useState(false);
  const hasPhoto = founder?.photo && !imgError;

  if (hasPhoto) {
    return (
      <img
        src={founder.photo}
        alt={founder.name?.[language] ?? 'Founder'}
        className="h-full w-full object-cover"
        onError={() => setImgError(true)}
      />
    );
  }

  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <ImageIcon className="h-8 w-8 text-muted-foreground/30" aria-hidden="true" />
    </div>
  );
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

      {/* Founder */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto max-w-3xl px-4 text-center">
          <SectionHeading title={{ en: 'Our Founder', kn: 'ನಮ್ಮ ಸ್ಥಾಪಕ' }} />

          <Link to="/founder" className="group mt-10 block">
            <div className="mx-auto max-w-md rounded-xl border border-border bg-card p-8 shadow-sm transition-shadow group-hover:shadow-lg group-hover:border-gold/40">
              <div className="mx-auto mb-5 flex h-32 w-32 items-center justify-center overflow-hidden rounded-full border-4 border-gold/50 bg-muted shadow-lg transition-transform group-hover:scale-105">
                <FounderPhoto founder={founder} language={language} />
              </div>
              <h3 className="font-display text-2xl font-bold text-foreground">
                {founder?.name?.[language] ?? t('Sri Kanakaraju C', 'ಶ್ರೀ ಕನಕರಾಜು ಸಿ')}
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                {founder?.title?.[language] ?? t('Founder — DVG Balaga Prathisthana', 'ಸ್ಥಾಪಕ — ಡಿ.ವಿ.ಜಿ ಬಳಗ ಪ್ರತಿಷ್ಠಾನ')}
              </p>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground line-clamp-3">
                {founder?.bio?.[language]?.[0] ?? founder?.[language]}
              </p>
              <p className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary group-hover:underline">
                {t('Read Full Story', 'ಪೂರ್ಣ ಕಥೆ ಓದಿ')}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </p>
            </div>
          </Link>
        </div>
      </section>

      {/* Trustees */}
      <section className="bg-muted/30 py-16 md:py-20">
        <div className="container mx-auto max-w-3xl px-4 text-center">
          <SectionHeading title={{ en: 'Our Trustees', kn: 'ನಮ್ಮ ಟ್ರಸ್ಟಿಗಳು' }} />
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {trustees.map((trustee, i) => (
              <div key={i} className="rounded-xl border border-border bg-card p-6 shadow-sm">
                <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center overflow-hidden rounded-full bg-muted border-2 border-gold/30">
                  <TrusteePhoto trustee={trustee} language={language} />
                </div>
                <h3 className="font-display text-lg font-semibold text-foreground">{trustee.name[language]}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{trustee.role[language]}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
