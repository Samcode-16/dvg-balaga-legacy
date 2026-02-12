import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { heroContent } from '@/data/content';
import heroImage from '@/assets/hero-literary.jpg';

const Hero = () => {
  const { language, t } = useLanguage();
  const content = heroContent[language];

  return (
    <section className="relative overflow-hidden" aria-label="Hero">
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt={t(
            'Literary gathering at DVG Balaga Prathisthana',
            'ಡಿ.ವಿ.ಜಿ ಬಳಗ ಪ್ರತಿಷ್ಠಾನದ ಸಾಹಿತ್ಯ ಕೂಟ'
          )}
            className="h-full w-full object-cover object-top"
        />
        <div className="hero-gradient absolute inset-0" />
      </div>

      <div className="relative container mx-auto px-4 py-24 md:py-36 lg:py-44">
        <div className="max-w-2xl animate-fade-in">
          <div className="mb-6 flex items-center gap-3">
            <div className="h-px w-12 bg-gold" />
            <span className="text-sm font-medium tracking-widest uppercase text-gold">
              {t('Since 2009 · Mysuru', '೨೦೦೯ ರಿಂದ · ಮೈಸೂರು')}
            </span>
          </div>

          <h1 className="font-display text-4xl font-bold leading-tight text-primary-foreground md:text-5xl lg:text-6xl">
            {content.title}
          </h1>

          <p className="mt-4 font-display text-xl italic text-gold-light md:text-2xl">
            {content.subtitle}
          </p>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-primary-foreground/80 md:text-lg">
            {content.description}
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              to="/about"
              className="btn-secondary-literary inline-flex items-center gap-2"
            >
              {content.cta}
              <span aria-hidden="true">→</span>
            </Link>
            <Link
              to="/awards"
              className="rounded border border-primary-foreground/30 px-6 py-3 font-semibold text-primary-foreground transition-colors hover:bg-primary-foreground/10"
            >
              {content.ctaSecondary}
            </Link>
          </div>
        </div>

        <div className="mt-16 max-w-md animate-fade-in rounded-lg border border-gold/20 bg-background/10 p-6 backdrop-blur-sm" style={{ animationDelay: '0.3s' }}>
          <blockquote className="font-display text-lg italic text-primary-foreground/90">
            {t(
              '"This world is a riddle, life is a play, and wisdom is knowing the limits of knowledge."',
              '"ಈ ಜಗವೇ ಒಂದು ಒಗಟು, ಬಾಳೇ ಒಂದು ಆಟ, ಜ್ಞಾನದ ಮಿತಿಯ ಅರಿವೇ ವಿವೇಕ."'
            )}
          </blockquote>
          <cite className="mt-2 block text-sm text-gold">
            — {t('Mankuthimmana Kagga, D.V. Gundappa', 'ಮಂಕುತಿಮ್ಮನ ಕಗ್ಗ, ಡಿ.ವಿ. ಗುಂಡಪ್ಪ')}
          </cite>
        </div>
      </div>
    </section>
  );
};

export default Hero;
