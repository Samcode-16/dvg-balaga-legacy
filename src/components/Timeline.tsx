import { useLanguage } from '@/contexts/LanguageContext';
import type { AwardEntry } from '@/data/content';
import { Award } from 'lucide-react';

interface TimelineProps {
  awards: AwardEntry[];
}

const Timeline = ({ awards }: TimelineProps) => {
  const { language, t } = useLanguage();

  return (
    <div className="relative">
      {/* Vertical line — hidden on mobile, shown on md+ */}
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
              {/* Content Card */}
              <div className={`w-full md:w-[calc(50%-2rem)] ${isLeft ? 'md:text-right' : 'md:text-left'}`}>
                <div className="card-literary p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <Award className="h-4 w-4 text-gold shrink-0" aria-hidden="true" />
                    <span className="text-lg font-bold text-gold font-display">{award.year}</span>
                  </div>
                  <h3 className="font-display text-lg font-bold text-foreground">
                    {recipient}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {citation}
                  </p>
                  {(award.president || award.chiefGuest) && (
                    <div className="mt-3 text-xs text-muted-foreground italic">
                      {award.president && <span>{t('President', 'ಅಧ್ಯಕ್ಷರು')}: {award.president}</span>}
                      {award.president && award.chiefGuest && <span> · </span>}
                      {award.chiefGuest && <span>{t('Chief Guest', 'ಮುಖ್ಯ ಅತಿಥಿ')}: {award.chiefGuest}</span>}
                    </div>
                  )}
                </div>
              </div>

              {/* Center dot */}
              <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 h-4 w-4 items-center justify-center rounded-full border-2 border-gold bg-background" aria-hidden="true">
                <div className="h-2 w-2 rounded-full bg-gold" />
              </div>

              {/* Spacer for the other side */}
              <div className="hidden md:block w-[calc(50%-2rem)]" />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Timeline;
