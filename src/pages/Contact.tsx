import { useLanguage } from '@/contexts/LanguageContext';
import SectionHeading from '@/components/SectionHeading';
import { Mail, MapPin, Phone } from 'lucide-react';

const Contact = () => {
  const { t } = useLanguage();

  return (
    <>
      <section className="bg-primary py-20 text-primary-foreground md:py-28">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-display text-4xl font-bold md:text-5xl">
            {t('Contact Us', 'ಸಂಪರ್ಕಿಸಿ')}
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-lg opacity-80">
            {t(
              'Reach out to DVG Balaga Prathisthana for enquiries, collaborations, or to join our literary community',
              'ವಿಚಾರಣೆಗಳು, ಸಹಯೋಗಗಳು, ಅಥವಾ ನಮ್ಮ ಸಾಹಿತ್ಯ ಸಮುದಾಯಕ್ಕೆ ಸೇರಲು ಡಿ.ವಿ.ಜಿ ಬಳಗ ಪ್ರತಿಷ್ಠಾನವನ್ನು ಸಂಪರ್ಕಿಸಿ'
            )}
          </p>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="container mx-auto max-w-4xl px-4">
          <div className="grid gap-10 md:grid-cols-2">
            <div>
              <SectionHeading
                title={{ en: 'Get in Touch', kn: 'ಸಂಪರ್ಕದಲ್ಲಿರಿ' }}
              />

              <div className="mt-8 space-y-6">
                <div className="card-literary flex items-start gap-4 p-5">
                  <MapPin className="mt-1 h-5 w-5 shrink-0 text-gold" aria-hidden="true" />
                  <div>
                    <h3 className="font-semibold text-foreground">
                      {t('Address', 'ವಿಳಾಸ')}
                    </h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {t(
                        'DVG Balaga Prathisthana, Mysuru, Karnataka, India',
                        'ಡಿ.ವಿ.ಜಿ ಬಳಗ ಪ್ರತಿಷ್ಠಾನ, ಮೈಸೂರು, ಕರ್ನಾಟಕ, ಭಾರತ'
                      )}
                    </p>
                    <p className="mt-1 text-xs italic text-muted-foreground">
                      [{t('Full address TBD — to be provided by the trust', 'ಪೂರ್ಣ ವಿಳಾಸ TBD')}]
                    </p>
                  </div>
                </div>

                <div className="card-literary flex items-start gap-4 p-5">
                  <Mail className="mt-1 h-5 w-5 shrink-0 text-gold" aria-hidden="true" />
                  <div>
                    <h3 className="font-semibold text-foreground">
                      {t('Email', 'ಇಮೇಲ್')}
                    </h3>
                    <p className="mt-1 text-sm text-muted-foreground">[email TBD]</p>
                  </div>
                </div>

                <div className="card-literary flex items-start gap-4 p-5">
                  <Phone className="mt-1 h-5 w-5 shrink-0 text-gold" aria-hidden="true" />
                  <div>
                    <h3 className="font-semibold text-foreground">
                      {t('Phone', 'ದೂರವಾಣಿ')}
                    </h3>
                    <p className="mt-1 text-sm text-muted-foreground">[phone TBD]</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <SectionHeading
                title={{ en: 'Send a Message', kn: 'ಸಂದೇಶ ಕಳುಹಿಸಿ' }}
              />

              <form className="mt-8 space-y-4" onSubmit={(e) => e.preventDefault()}>
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-foreground">
                    {t('Your Name', 'ನಿಮ್ಮ ಹೆಸರು')}
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="mt-1 w-full rounded-md border border-input bg-background px-4 py-2.5 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                    placeholder={t('Enter your name', 'ನಿಮ್ಮ ಹೆಸರು ನಮೂಡಿಸಿ')}
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-foreground">
                    {t('Email Address', 'ಇಮೇಲ್ ವಿಳಾಸ')}
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="mt-1 w-full rounded-md border border-input bg-background px-4 py-2.5 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                    placeholder={t('your@email.com', 'your@email.com')}
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-foreground">
                    {t('Message', 'ಸಂದೇಶ')}
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    className="mt-1 w-full rounded-md border border-input bg-background px-4 py-2.5 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                    placeholder={t('Your message...', 'ನಿಮ್ಮ ಸಂದೇಶ...')}
                  />
                </div>

                <button type="submit" className="btn-primary-literary w-full">
                  {t('Send Message', 'ಸಂದೇಶ ಕಳುಹಿಸಿ')}
                </button>

                <p className="text-xs text-center text-muted-foreground italic">
                  {t(
                    'Contact form requires backend integration — coming soon',
                    'ಸಂಪರ್ಕ ಫಾರ್ಮ್ ಬ್ಯಾಕೆಂಡ್ ಏಕೀಕರಣ ಅಗತ್ಯ — ಶೀಘ್ರದಲ್ಲಿ ಬರಲಿದೆ'
                  )}
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
