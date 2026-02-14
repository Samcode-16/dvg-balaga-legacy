import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { navItems } from '@/data/content';
import { useState } from 'react';
import { Menu, X, Globe } from 'lucide-react';

const Header = () => {
  const { language, toggleLanguage, t } = useLanguage();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const items = language === 'en' ? navItems.en : navItems.kn;

  const logo = new URL('@/assets/logo.jpeg', import.meta.url).href;
  return (
      <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
        <div className="container mx-auto flex items-center justify-between px-6 py-5 md:px-8 md:py-6">
          <Link to="/" className="flex items-center gap-3">
            <img src={logo} alt="DVG Balaga Logo" className="h-14 w-14 rounded-full object-cover border-2 border-primary shadow-sm" />
            <div className="hidden sm:block">
              <h1 className="font-display text-xl font-bold leading-tight text-foreground">
                {t('DVG Balaga Prathisthana', 'ಡಿ.ವಿ.ಜಿ ಬಳಗ ಪ್ರತಿಷ್ಠಾನ')}
              </h1>
              <p className="text-sm text-muted-foreground">
                {t('Mysuru', 'ಮೈಸೂರು')}
              </p>
            </div>
            <div className="block sm:hidden">
              <span className="font-display text-lg font-bold text-foreground ml-2">
                {t('DVG Balaga Prathisthana', 'ಡಿ.ವಿ.ಜಿ ಬಳಗ ಪ್ರತಿಷ್ಠಾನ')}
              </span>
            </div>
          </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Main navigation">
          {items.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`nav-link-literary ${location.pathname === item.path ? 'active' : ''}`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-1.5 rounded-md border border-border px-3 py-1.5 text-sm font-medium text-foreground transition-colors hover:bg-muted"
            aria-label={`Switch to ${language === 'en' ? 'Kannada' : 'English'}`}
          >
            <Globe className="h-4 w-4" />
            <span>{language === 'en' ? 'ಕನ್ನಡ' : 'English'}</span>
          </button>

          <button
            className="md:hidden rounded-md p-2 text-foreground hover:bg-muted"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <nav className="border-t border-border bg-background px-4 py-3 md:hidden" aria-label="Mobile navigation">
          <div className="flex flex-col gap-1">
            {items.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                  location.pathname === item.path
                    ? 'bg-primary text-primary-foreground'
                    : 'text-foreground hover:bg-muted'
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
};

export default Header;
