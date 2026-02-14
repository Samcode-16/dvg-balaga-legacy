import { useLanguage } from '@/contexts/LanguageContext';
import Timeline from '@/components/Timeline';
import SectionHeading from '@/components/SectionHeading';
import { useAwards } from '@/hooks/useContent';
import { Skeleton } from '@/components/ui/skeleton';
import { Award } from 'lucide-react';

const Awards = () => {
  const { language, t } = useLanguage();
  const { data: awards = [], isLoading } = useAwards();

  return (
    <>
      <section className="bg-primary py-20 text-primary-foreground md:py-28">
        <div className="container mx-auto px-4 text-center">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full border-2 border-gold bg-primary-foreground/10">
            <Award className="h-10 w-10 text-gold" aria-hidden="true" />
          </div>
          <h1 className="font-display text-4xl font-bold md:text-5xl">
            {t('DVG Prashasti', 'ಡಿ.ವಿ.ಜಿ ಪ್ರಶಸ್ತಿ')}
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-lg opacity-80">
            {t(
              'Honouring outstanding contributions to Kannada literature and the legacy of D.V. Gundappa since 2013',
              '೨೦೧೩ ರಿಂದ ಕನ್ನಡ ಸಾಹಿತ್ಯ ಮತ್ತು ಡಿ.ವಿ. ಗುಂಡಪ್ಪ ಅವರ ಪರಂಪರೆಗೆ ಅತ್ಯುತ್ತಮ ಕೊಡುಗೆಗಳನ್ನು ಗೌರವಿಸುವುದು'
            )}
          </p>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <SectionHeading
            title={{ en: 'Complete Awards Archive', kn: 'ಪೂರ್ಣ ಪ್ರಶಸ್ತಿ ದಾಖಲೆ' }}
            subtitle={{
              en: `${awards.length} awards conferred over ${new Date().getFullYear() - 2013} years`,
              kn: `${awards.length} ಪ್ರಶಸ್ತಿಗಳು ${new Date().getFullYear() - 2013} ವರ್ಷಗಳಲ್ಲಿ`,
            }}
          />

          <div className="mt-12">
            {isLoading ? (
              <div className="space-y-4">
                {Array.from({ length: 3 }).map((_, i) => (
                  <Skeleton key={i} className="h-24 rounded-lg" />
                ))}
              </div>
            ) : (
              <Timeline awards={awards} />
            )}
          </div>
        </div>
      </section>

      <section className="bg-muted/30 py-16">
        <div className="container mx-auto max-w-2xl px-4 text-center">
          <h2 className="font-display text-2xl font-bold text-foreground">
            {t('BGL Swamy Award', 'ಬಿ.ಜಿ.ಎಲ್. ಸ್ವಾಮಿ ಪ್ರಶಸ್ತಿ')}
          </h2>
          <p className="mt-4 text-muted-foreground">
            {t(
              'In 2019, the BGL Swamy Award was awarded to Sri Chennesh for his works on science in Kannada. BGL Swamy, being the son of DVG, was also remembered during the function.',
              '೨೦೧೯ ರಲ್ಲಿ, ಕನ್ನಡದಲ್ಲಿ ವಿಜ್ಞಾನ ಕುರಿತ ಕೃತಿಗಳಿಗಾಗಿ ಶ್ರೀ ಚೆನ್ನೇಶ ಅವರಿಗೆ ಬಿ.ಜಿ.ಎಲ್. ಸ್ವಾಮಿ ಪ್ರಶಸ್ತಿ ನೀಡಲಾಯಿತು.'
            )}
          </p>
        </div>
      </section>
    </>
  );
};

export default Awards;
