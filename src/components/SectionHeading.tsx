import { useLanguage } from '@/contexts/LanguageContext';

interface SectionHeadingProps {
  title: { en: string; kn: string };
  subtitle?: { en: string; kn: string };
}

const SectionHeading = ({ title, subtitle }: SectionHeadingProps) => {
  const { language } = useLanguage();

  return (
    <div className="text-center">
      <h2 className="font-display text-3xl font-bold text-foreground md:text-4xl">
        {title[language]}
      </h2>
      {subtitle && (
        <p className="mt-3 mx-auto max-w-2xl text-lg text-muted-foreground">
          {subtitle[language]}
        </p>
      )}
      <div className="divider-ornate mt-6">
        <span className="mx-4 text-gold" aria-hidden="true">✦</span>
      </div>
    </div>
  );
};

export default SectionHeading;
