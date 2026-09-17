import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import Logo from './Logo';

const navLinks = [
  { label: 'Platform', href: '#features' },
  { label: 'How It Works', href: '#workflow' },
  { label: 'For Farmers', href: '#for-farmers' },
  { label: 'Market Prices', href: '#market' },
  { label: 'Resources', href: '#resources' },
];

export default function PublicNavbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setMobileOpen(false);
    if (window.location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const el = document.querySelector(href);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 bg-white border-b transition-shadow ${
        scrolled ? 'border-gray-200 shadow-sm' : 'border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Logo size="sm" />

          <nav className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-sm font-medium text-ink/80 hover:text-forest"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            <Link to="/login" className="text-sm font-medium text-ink/80 hover:text-forest px-3 py-2">
              Login
            </Link>
            <Link
              to="/register"
              className="text-sm font-semibold text-white bg-forest hover:bg-forest-light px-5 py-2.5 rounded-md transition-colors"
            >
              Get Started
            </Link>
          </div>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 rounded-md hover:bg-gray-100"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 px-4 py-4 space-y-3">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="block text-sm font-medium text-ink/80 hover:text-forest py-1"
            >
              {link.label}
            </a>
          ))}
          <div className="flex gap-3 pt-2 border-t border-gray-100">
            <Link
              to="/login"
              className="flex-1 text-center text-sm font-semibold border border-forest text-forest hover:bg-forest/5 px-4 py-2.5 rounded-md"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="flex-1 text-center text-sm font-semibold bg-forest hover:bg-forest-light text-white px-4 py-2.5 rounded-md"
            >
              Get Started
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
