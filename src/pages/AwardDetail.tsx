import { useParams, Link } from 'react-router-dom';
import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAwards } from '@/hooks/useContent';
import { Skeleton } from '@/components/ui/skeleton';
import { Award, ArrowLeft, Users, Calendar, Image as ImageIcon, Quote } from 'lucide-react';

// Demo detail content — replace with real data later
const demoDetails: Record<string, { en: string[]; kn: string[] }> = {
  default: {
    en: [
      'The award ceremony was held in the presence of distinguished literary figures and scholars from across Karnataka.',
      'The recipient was felicitated with a citation, memento, and cash prize as part of the DVG Prashasti honour.',
      'A special lecture on DVG\'s contributions to Kannada literature was delivered during the ceremony.',
      'The gathering included members of DVG Balaga from Mysuru, Bangalore, Mangaluru, and other cities.',
    ],
    kn: [
      'ಪ್ರಶಸ್ತಿ ಪ್ರದಾನ ಸಮಾರಂಭವು ಕರ್ನಾಟಕದ ವಿವಿಧ ಭಾಗಗಳಿಂದ ಬಂದ ಪ್ರಸಿದ್ಧ ಸಾಹಿತಿಗಳು ಮತ್ತು ವಿದ್ವಾಂಸರ ಸಮ್ಮುಖದಲ್ಲಿ ನಡೆಯಿತು.',
      'ಡಿ.ವಿ.ಜಿ ಪ್ರಶಸ್ತಿ ಗೌರವದ ಭಾಗವಾಗಿ ಪ್ರಶಸ್ತಿ ಪತ್ರ, ಸ್ಮರಣಿಕೆ ಮತ್ತು ನಗದು ಬಹುಮಾನದೊಂದಿಗೆ ಸನ್ಮಾನಿಸಲಾಯಿತು.',
      'ಸಮಾರಂಭದಲ್ಲಿ ಕನ್ನಡ ಸಾಹಿತ್ಯಕ್ಕೆ ಡಿ.ವಿ.ಜಿ ಅವರ ಕೊಡುಗೆ ಕುರಿತು ವಿಶೇಷ ಉಪನ್ಯಾಸ ನಡೆಯಿತು.',
      'ಮೈಸೂರು, ಬೆಂಗಳೂರು, ಮಂಗಳೂರು ಮತ್ತು ಇತರ ನಗರಗಳಿಂದ ಡಿ.ವಿ.ಜಿ ಬಳಗದ ಸದಸ್ಯರು ಹಾಜರಿದ್ದರು.',
    ],
  },
};

const demoQuotes = {
  en: [
    '"The essence of DVG\'s writing lies not just in poetry, but in the pursuit of truth and meaning in everyday life."',
    '"This award is a recognition of those who keep the flame of Kannada literary tradition alive."',
  ],
  kn: [
    '"ಡಿ.ವಿ.ಜಿ ಅವರ ಬರಹದ ಸಾರ ಕೇವಲ ಕಾವ್ಯದಲ್ಲಿ ಮಾತ್ರವಲ್ಲ, ದೈನಂದಿನ ಜೀವನದಲ್ಲಿ ಸತ್ಯ ಮತ್ತು ಅರ್ಥದ ಅನ್ವೇಷಣೆಯಲ್ಲಿದೆ."',
    '"ಈ ಪ್ರಶಸ್ತಿ ಕನ್ನಡ ಸಾಹಿತ್ಯ ಪರಂಪರೆಯ ಜ್ಯೋತಿಯನ್ನು ಜೀವಂತವಾಗಿಡುವವರ ಮನ್ನಣೆ."',
  ],
};

const demoGallery = [
  'Award presentation ceremony',
  'Chief guest addressing the gathering',
  'Recipient delivering acceptance speech',
  'Group photo with dignitaries',
  'Audience during the ceremony',
  'Felicitation and memento',
];

const AwardDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { language, t } = useLanguage();
  const { data: awards = [], isLoading } = useAwards();
  const [photoError, setPhotoError] = useState(false);

  const award = awards.find((a) => a.id === id);

  if (isLoading) {
    return (
      <div className="container mx-auto max-w-4xl px-4 py-16">
        <Skeleton className="mb-4 h-8 w-48" />
        <Skeleton className="mb-8 h-12 w-full" />
        <Skeleton className="h-64 w-full rounded-lg" />
      </div>
    );
  }

  if (!award) {
    return (
      <div className="container mx-auto max-w-4xl px-4 py-20 text-center">
        <h1 className="font-display text-3xl font-bold text-foreground">
          {t('Award Not Found', 'ಪ್ರಶಸ್ತಿ ಕಂಡುಬಂದಿಲ್ಲ')}
        </h1>
        <p className="mt-4 text-muted-foreground">
          {t('The award entry you are looking for does not exist.', 'ನೀವು ಹುಡುಕುತ್ತಿರುವ ಪ್ರಶಸ್ತಿ ನಮೂದು ಅಸ್ತಿತ್ವದಲ್ಲಿಲ್ಲ.')}
        </p>
        <Link to="/awards" className="btn-primary-literary mt-6 inline-flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" /> {t('Back to Awards', 'ಪ್ರಶಸ್ತಿಗಳಿಗೆ ಹಿಂತಿರುಗಿ')}
        </Link>
      </div>
    );
  }

  const recipient = language === 'en' ? award.recipient : award.recipientKn;
  const citation = award.citation[language];
  const details = demoDetails[award.id] ?? demoDetails.default;

  return (
    <>
      {/* Hero */}
      <section className="bg-primary py-16 text-primary-foreground md:py-24">
        <div className="container mx-auto max-w-4xl px-4">
          <Link
            to="/awards"
            className="mb-6 inline-flex items-center gap-1.5 text-sm text-primary-foreground/70 transition-colors hover:text-primary-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            {t('All Awards', 'ಎಲ್ಲಾ ಪ್ರಶಸ್ತಿಗಳು')}
          </Link>

          <div className="flex flex-col items-center text-center md:flex-row md:items-start md:text-left md:gap-8">
            {/* Photo frame */}
            <div className="mb-6 shrink-0 md:mb-0">
              <div className="relative h-40 w-40 overflow-hidden rounded-full border-4 border-gold/60 bg-primary-foreground/10 shadow-lg">
                {award.photo && !photoError ? (
                  <img
                    src={award.photo}
                    alt={recipient}
                    className="h-full w-full object-cover"
                    onError={() => setPhotoError(true)}
                  />
                ) : (
                  <div className="flex h-full w-full flex-col items-center justify-center">
                    <ImageIcon className="h-10 w-10 text-primary-foreground/30" aria-hidden="true" />
                    <span className="mt-1 text-xs text-primary-foreground/40">{t('Photo', 'ಫೋಟೊ')}</span>
                  </div>
                )}
              </div>
            </div>

            <div>
              <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-gold/20 px-4 py-1.5">
                <Award className="h-4 w-4 text-gold" aria-hidden="true" />
                <span className="text-sm font-bold text-gold">
                  {t('DVG Prashasti', 'ಡಿ.ವಿ.ಜಿ ಪ್ರಶಸ್ತಿ')} {award.year}
                </span>
              </div>

              <h1 className="font-display text-3xl font-bold leading-tight md:text-4xl lg:text-5xl">
                {recipient}
              </h1>

              <div className="mt-4 flex flex-wrap justify-center gap-4 text-sm text-primary-foreground/80 md:justify-start">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" aria-hidden="true" />
                  <span>{award.year}</span>
                </div>
                {(award.president || award.chiefGuest) && (
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4" aria-hidden="true" />
                    <span>
                      {award.president && `${t('President', 'ಅಧ್ಯಕ್ಷರು')}: ${award.president}`}
                      {award.president && award.chiefGuest && ' · '}
                      {award.chiefGuest && `${t('Chief Guest', 'ಮುಖ್ಯ ಅತಿಥಿ')}: ${award.chiefGuest}`}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Citation */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto max-w-4xl px-4">
          <h2 className="font-display text-2xl font-bold text-foreground">
            {t('Citation', 'ಪ್ರಶಸ್ತಿ ಪತ್ರ')}
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-foreground">
            {citation}
          </p>
        </div>
      </section>

      {/* Details */}
      <section className="bg-muted/30 py-12 md:py-16">
        <div className="container mx-auto max-w-4xl px-4">
          <h2 className="font-display text-2xl font-bold text-foreground">
            {t('About the Ceremony', 'ಸಮಾರಂಭದ ಬಗ್ಗೆ')}
          </h2>
          <ul className="mt-6 space-y-4">
            {details[language].map((item, i) => (
              <li key={i} className="flex gap-3">
                <div className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-gold" aria-hidden="true" />
                <p className="text-foreground">{item}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Quotes */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto max-w-4xl px-4 space-y-8">
          {demoQuotes[language].map((quote, i) => (
            <blockquote key={i} className="relative rounded-lg border-l-4 border-gold bg-muted/30 p-6">
              <Quote className="absolute -top-3 -left-3 h-8 w-8 text-gold/30" aria-hidden="true" />
              <p className="font-display text-lg italic text-foreground">{quote}</p>
            </blockquote>
          ))}
          <p className="text-sm italic text-muted-foreground">
            {t('* Demo quotes. Actual quotes will be updated soon.', '* ಡೆಮೊ ಉಲ್ಲೇಖಗಳು. ನಿಜವಾದ ಉಲ್ಲೇಖಗಳನ್ನು ಶೀಘ್ರದಲ್ಲಿ ನವೀಕರಿಸಲಾಗುವುದು.')}
          </p>
        </div>
      </section>

      {/* Gallery */}
      <section className="bg-muted/30 py-12 md:py-16">
        <div className="container mx-auto max-w-4xl px-4">
          <h2 className="font-display text-2xl font-bold text-foreground">
            {t('Gallery', 'ಗ್ಯಾಲರಿ')}
          </h2>
          {award.gallery && award.gallery.length > 0 ? (
            <div className="mt-6 grid gap-4 grid-cols-2 md:grid-cols-3">
              {award.gallery.map((src, i) => (
                <div key={i} className="overflow-hidden rounded-lg shadow-sm">
                  <img
                    src={src}
                    alt={`${recipient} - ${i + 1}`}
                    className="h-40 w-full object-cover transition-transform duration-300 hover:scale-105"
                    onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="mt-6 grid gap-4 grid-cols-2 md:grid-cols-3">
              {demoGallery.map((caption, i) => (
                <div key={i} className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/20 bg-muted/50 p-8 text-center">
                  <ImageIcon className="mb-2 h-8 w-8 text-muted-foreground/40" aria-hidden="true" />
                  <p className="text-xs text-muted-foreground">{caption}</p>
                </div>
              ))}
            </div>
          )}
          {(!award.gallery || award.gallery.length === 0) && (
            <p className="mt-4 text-sm italic text-muted-foreground">
              {t('* Photos will be added soon.', '* ಫೋಟೋಗಳನ್ನು ಶೀಘ್ರದಲ್ಲಿ ಸೇರಿಸಲಾಗುವುದು.')}
            </p>
          )}
        </div>
      </section>

      {/* Back link */}
      <section className="py-10">
        <div className="container mx-auto max-w-4xl px-4 text-center">
          <Link to="/awards" className="btn-primary-literary inline-flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            {t('Back to All Awards', 'ಎಲ್ಲಾ ಪ್ರಶಸ್ತಿಗಳಿಗೆ ಹಿಂತಿರುಗಿ')}
          </Link>
        </div>
      </section>
    </>
  );
};

export default AwardDetail;
