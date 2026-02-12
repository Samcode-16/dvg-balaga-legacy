import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Calendar, MapPin, Users } from 'lucide-react';
import type { Event } from '@/data/content';

interface EventCardProps {
  event: Event;
}

const typeLabels = {
  upanyasa: { en: 'Upanyasa', kn: 'ಉಪನ್ಯಾಸ' },
  award: { en: 'Award Ceremony', kn: 'ಪ್ರಶಸ್ತಿ ಸಮಾರಂಭ' },
  seminar: { en: 'Seminar', kn: 'ವಿಚಾರ ಸಂಕಿರಣ' },
  camp: { en: 'Camp', kn: 'ಶಿಬಿರ' },
  release: { en: 'Book Release', kn: 'ಪುಸ್ತಕ ಬಿಡುಗಡೆ' },
};

const EventCard = ({ event }: EventCardProps) => {
  const { language, t } = useLanguage();
  const title = event.title[language];
  const description = event.description[language];
  const typeLabel = typeLabels[event.type][language];

  return (
    <article className="card-literary overflow-hidden p-0">
      <div className="p-6">
        <div className="mb-3">
          <span className="badge-award">{typeLabel}</span>
        </div>

        <h3 className="font-display text-xl font-bold text-foreground">
          <Link to={`/events#${event.id}`} className="transition-colors hover:text-primary">
            {title}
          </Link>
        </h3>

        <div className="mt-3 flex flex-wrap gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <Calendar className="h-4 w-4" aria-hidden="true" />
            <time>{event.date}{event.endDate ? ` – ${event.endDate}` : ''}</time>
          </div>
          <div className="flex items-center gap-1.5">
            <MapPin className="h-4 w-4" aria-hidden="true" />
            <span>{event.location}</span>
          </div>
        </div>

        <p className="mt-4 text-sm leading-relaxed text-muted-foreground line-clamp-3">
          {description}
        </p>

        {(event.president || event.chiefGuest) && (
          <div className="mt-4 flex items-start gap-1.5 rounded bg-muted px-3 py-2 text-xs text-muted-foreground">
            <Users className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true" />
            <span>
              {event.president && `${t('President', 'ಅಧ್ಯಕ್ಷರು')}: ${event.president}`}
              {event.president && event.chiefGuest && ' · '}
              {event.chiefGuest && `${t('Chief Guest', 'ಮುಖ್ಯ ಅತಿಥಿ')}: ${event.chiefGuest}`}
            </span>
          </div>
        )}
      </div>
    </article>
  );
};

export default EventCard;
