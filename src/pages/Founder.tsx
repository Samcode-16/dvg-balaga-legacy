import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAbout } from '@/hooks/useContent';
import { Skeleton } from '@/components/ui/skeleton';
import { ArrowLeft, Image as ImageIcon } from 'lucide-react';

const Founder = () => {
  const { language, t } = useLanguage();
  const { data: about, isLoading } = useAbout();
  const [photoError, setPhotoError] = useState(false);

  const founder = about?.founder;

  if (isLoading) {
    return (
      <div className="container mx-auto max-w-4xl px-4 py-16">
        <Skeleton className="mb-4 h-8 w-48" />
        <Skeleton className="mx-auto mb-8 h-48 w-48 rounded-full" />
        <Skeleton className="h-64 w-full rounded-lg" />
      </div>
    );
  }

  if (!founder) {
    return (
      <div className="container mx-auto max-w-4xl px-4 py-20 text-center">
        <h1 className="font-display text-3xl font-bold text-foreground">
          {t('Page Not Found', 'ಪುಟ ಕಂಡುಬಂದಿಲ್ಲ')}
        </h1>
        <Link to="/about" className="btn-primary-literary mt-6 inline-flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" /> {t('Back to About', 'ಹಿಂತಿರುಗಿ')}
        </Link>
      </div>
    );
  }

  const name = founder.name?.[language] ?? 'Sri Kanakaraju C';
  const title = founder.title?.[language] ?? '';
  const bio = founder.bio?.[language] ?? [];
  const photo = founder.photo;
  const hasPhoto = photo && !photoError;

  return (
    <>
      {/* Hero */}
      <section className="bg-primary py-16 text-primary-foreground md:py-24">
        <div className="container mx-auto max-w-4xl px-4">
          <Link
            to="/about"
            className="mb-6 inline-flex items-center gap-1.5 text-sm text-primary-foreground/70 transition-colors hover:text-primary-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            {t('About Us', 'ನಮ್ಮ ಬಗ್ಗೆ')}
          </Link>

          <div className="flex flex-col items-center text-center md:flex-row md:items-center md:text-left md:gap-10">
            {/* Large photo */}
            <div className="mb-8 shrink-0 md:mb-0">
              <div className="relative h-48 w-48 overflow-hidden rounded-full border-4 border-gold/60 bg-primary-foreground/10 shadow-xl md:h-56 md:w-56">
                {hasPhoto ? (
                  <img
                    src={photo}
                    alt={name}
                    className="h-full w-full object-cover"
                    onError={() => setPhotoError(true)}
                  />
                ) : (
                  <div className="flex h-full w-full flex-col items-center justify-center">
                    <ImageIcon className="h-12 w-12 text-primary-foreground/30" aria-hidden="true" />
                    <span className="mt-1 text-sm text-primary-foreground/40">{t('Photo', 'ಫೋಟೊ')}</span>
                  </div>
                )}
              </div>
            </div>

            <div>
              <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-gold">
                {t('Founder', 'ಸ್ಥಾಪಕ')}
              </p>
              <h1 className="font-display text-3xl font-bold leading-tight md:text-4xl lg:text-5xl">
                {name}
              </h1>
              <p className="mt-3 text-lg text-primary-foreground/80">
                {title}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Biography */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto max-w-3xl px-4">
          <h2 className="font-display text-2xl font-bold text-foreground">
            {t('The Journey', 'ಪಯಣ')}
          </h2>
          <div className="mt-8 space-y-6 text-lg leading-relaxed text-foreground">
            {bio.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
        </div>
      </section>

      {/* Vision quote */}
      <section className="bg-muted/30 py-12 md:py-16">
        <div className="container mx-auto max-w-3xl px-4 text-center">
          <blockquote className="font-display text-xl italic leading-relaxed text-foreground md:text-2xl">
            {t(
              '"DVG\'s works are not just literature — they are a way of life. Our mission is to bring that wisdom to every home."',
              '"ಡಿ.ವಿ.ಜಿ ಅವರ ಕೃತಿಗಳು ಕೇವಲ ಸಾಹಿತ್ಯವಲ್ಲ — ಅವು ಒಂದು ಜೀವನ ವಿಧಾನ. ಆ ಜ್ಞಾನವನ್ನು ಪ್ರತಿ ಮನೆಗೆ ತಲುಪಿಸುವುದು ನಮ್ಮ ಧ್ಯೇಯ."'
            )}
          </blockquote>
          <p className="mt-4 text-sm font-semibold text-gold">— {name}</p>
        </div>
      </section>

      {/* Back link */}
      <section className="py-10">
        <div className="container mx-auto max-w-4xl px-4 text-center">
          <Link to="/about" className="btn-primary-literary inline-flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            {t('Back to About Us', 'ನಮ್ಮ ಬಗ್ಗೆ ಹಿಂತಿರುಗಿ')}
          </Link>
        </div>
      </section>
    </>
  );
};

export default Founder;
