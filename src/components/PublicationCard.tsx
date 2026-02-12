import { useLanguage } from '@/contexts/LanguageContext';
import { BookOpen } from 'lucide-react';
import type { Publication } from '@/data/content';

interface PublicationCardProps {
  publication: Publication;
}

const typeLabels = {
  translation: { en: 'Translation', kn: 'ಅನುವಾದ' },
  original: { en: 'Original', kn: 'ಮೂಲ' },
  children: { en: "Children's Book", kn: 'ಮಕ್ಕಳ ಪುಸ್ತಕ' },
  commentary: { en: 'Commentary', kn: 'ವ್ಯಾಖ್ಯಾನ' },
};

const PublicationCard = ({ publication }: PublicationCardProps) => {
  const { language, t } = useLanguage();
  const title = publication.title[language];
  const description = publication.description[language];
  const typeLabel = typeLabels[publication.type][language];

  return (
    <article className="card-literary flex flex-col overflow-hidden">
      <div className="flex h-48 items-center justify-center bg-muted">
        <div className="text-center">
          <BookOpen className="mx-auto h-12 w-12 text-muted-foreground/40" aria-hidden="true" />
          <p className="mt-2 px-4 text-xs text-muted-foreground/60 italic">
            {publication.coverPlaceholder}
          </p>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <div className="mb-3 flex items-center gap-2">
          <span className="badge-award">{typeLabel}</span>
          <span className="text-xs text-muted-foreground">{publication.year}</span>
        </div>

        <h3 className="font-display text-lg font-bold text-foreground">
          {title}
        </h3>

        <p className="mt-1 text-sm italic text-muted-foreground">
          {publication.author}
        </p>

        <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground line-clamp-3">
          {description}
        </p>

        {publication.price && (
          <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
            <span className="text-lg font-bold text-foreground">₹{publication.price}</span>
            <button className="btn-primary-literary text-sm px-4 py-2">
              {t('Buy Now', 'ಖರೀದಿಸಿ')}
            </button>
          </div>
        )}
      </div>
    </article>
  );
};

export default PublicationCard;
