import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { navItems } from '@/data/content';
import { Mail, MapPin } from 'lucide-react';

const Footer = () => {
  const { language, t } = useLanguage();
  const items = language === 'en' ? navItems.en : navItems.kn;

  return (
    <footer className="border-t border-border bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <h3 className="font-display text-xl font-bold">
              {t('DVG Balaga Prathisthana', 'ಡಿ.ವಿ.ಜಿ ಬಳಗ ಪ್ರತಿಷ್ಠಾನ')}
            </h3>
            <p className="mt-3 text-sm leading-relaxed opacity-80">
              {t(
                'A literary trust dedicated to preserving and propagating the works of D.V. Gundappa. Founded in 2009, we celebrate Kannada literature and the legacy of DVG.',
                'ಡಿ.ವಿ. ಗುಂಡಪ್ಪ ಅವರ ಕೃತಿಗಳನ್ನು ಸಂರಕ್ಷಿಸಲು ಮತ್ತು ಪ್ರಸಾರ ಮಾಡಲು ಸಮರ್ಪಿತ ಸಾಹಿತ್ಯ ಟ್ರಸ್ಟ್.'
              )}
            </p>
          </div>

          <div>
            <h4 className="font-display text-lg font-semibold">
              {t('Quick Links', 'ತ್ವರಿತ ಲಿಂಕ್‌ಗಳು')}
            </h4>
            <nav className="mt-3 flex flex-col gap-2" aria-label="Footer navigation">
              {items.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className="text-sm opacity-80 transition-opacity hover:opacity-100"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <h4 className="font-display text-lg font-semibold">
              {t('Contact', 'ಸಂಪರ್ಕ')}
            </h4>
            <div className="mt-3 flex flex-col gap-3">
              <div className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 opacity-80" />
                <span className="text-sm opacity-80">
                  {t('Mysuru, Karnataka, India', 'ಮೈಸೂರು, ಕರ್ನಾಟಕ, ಭಾರತ')}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 shrink-0 opacity-80" />
                <span className="text-sm opacity-80">[email TBD]</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-primary-foreground/20 pt-6 text-center text-xs opacity-60">
          <p>
            © {new Date().getFullYear()} DVG Balaga Prathisthana, Mysuru.{' '}
            {t('All rights reserved.', 'ಎಲ್ಲಾ ಹಕ್ಕುಗಳನ್ನು ಕಾಯ್ದಿರಿಸಲಾಗಿದೆ.')}
          </p>
          <p className="mt-1 italic">
            {t(
              '"DVG Chukki Chitra" motif by Sri Mohan Vernekar',
              '"ಡಿ.ವಿ.ಜಿ ಚುಕ್ಕಿ ಚಿತ್ರ" — ಶ್ರೀ ಮೋಹನ ವರ್ಣೇಕರ'
            )}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
