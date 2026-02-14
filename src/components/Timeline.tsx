import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import type { AwardEntry } from '@/data/content';
import { Award, Image as ImageIcon } from 'lucide-react';

interface TimelineProps {
  awards: AwardEntry[];
}

/** Small wrapper so each award can track its own image error state */
const AwardPhoto = ({ award, label }: { award: AwardEntry; label: string }) => {
  const [imgError, setImgError] = useState(false);
  const hasPhoto = award.photo && !imgError;

  if (hasPhoto) {
    return (
      <img
        src={award.photo}
        alt={award.recipient}
        className="h-full w-full object-cover"
        onError={() => setImgError(true)}
      />
    );
  }

  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <ImageIcon className="h-6 w-6 text-muted-foreground/30" aria-hidden="true" />
      <span className="text-[10px] text-muted-foreground/40">{label}</span>
    </div>
  );
};

const Timeline = ({ awards }: TimelineProps) => {
  const { language, t } = useLanguage();

  return (
    <div className="relative">
      <div className="timeline-line hidden md:block" aria-hidden="true" />

      <div className="flex flex-col gap-8 md:gap-12">
        {awards.map((award, index) => {
          const isLeft = index % 2 === 0;
          const recipient = language === 'en' ? award.recipient : award.recipientKn;
          const citation = award.citation[language];

          return (
            <div
              key={award.id}
              className={`relative flex flex-col md:flex-row ${
                isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
              } items-start md:items-center gap-4 md:gap-8`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={`w-full md:w-[calc(50%-2rem)] ${isLeft ? 'md:text-right' : 'md:text-left'}`}>
                <Link to={`/awards/${award.id}`} className="block group">
                  <div className="card-literary p-5 transition-shadow group-hover:shadow-lg group-hover:border-gold/40">
                    {/* Photo frame */}
                    <div className={`mb-4 flex ${isLeft ? 'md:justify-end' : 'md:justify-start'} justify-start`}>
                      <div className="relative h-20 w-20 overflow-hidden rounded-full border-3 border-gold/50 bg-muted shadow-md transition-transform group-hover:scale-105">
                        <AwardPhoto award={award} label={t('Photo', 'ಫೋಟೊ')} />
                      </div>
                    </div>

                    <div className="flex items-center gap-2 mb-2">
                      <Award className="h-4 w-4 text-gold shrink-0" aria-hidden="true" />
                      <span className="text-lg font-bold text-gold font-display">{award.year}</span>
                    </div>
                    <h3 className="font-display text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                      {recipient}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground line-clamp-2">
                      {citation}
                    </p>
                    {(award.president || award.chiefGuest) && (
                      <div className="mt-3 text-xs text-muted-foreground italic">
                        {award.president && <span>{t('President', 'ಅಧ್ಯಕ್ಷರು')}: {award.president}</span>}
                        {award.president && award.chiefGuest && <span> · </span>}
                        {award.chiefGuest && <span>{t('Chief Guest', 'ಮುಖ್ಯ ಅತಿಥಿ')}: {award.chiefGuest}</span>}
                      </div>
                    )}
                    <p className="mt-3 text-xs font-medium text-primary group-hover:underline">
                      {t('View Details →', 'ವಿವರ ನೋಡಿ →')}
                    </p>
                  </div>
                </Link>
              </div>

              <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 h-4 w-4 items-center justify-center rounded-full border-2 border-gold bg-background" aria-hidden="true">
                <div className="h-2 w-2 rounded-full bg-gold" />
              </div>

              <div className="hidden md:block w-[calc(50%-2rem)]" />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Timeline;
