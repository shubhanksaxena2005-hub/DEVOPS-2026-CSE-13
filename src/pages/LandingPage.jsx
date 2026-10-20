import { Link } from 'react-router-dom';
import {
  Sprout,
  ShieldCheck,
  LayoutDashboard,
  Map,
  Wallet,
  BookOpen,
  UserCog,
  CheckCircle2,
  UserPlus,
  PenLine,
  BarChart3,
} from 'lucide-react';
import PublicNavbar from '../components/layout/PublicNavbar';

// These match the features that actually exist in the app (see /farmer/* routes)
export const features = [
  {
    icon: ShieldCheck,
    title: 'Secure Account',
    description: 'Register with your email and password. Your records are private and only visible to you.',
  },
  {
    icon: LayoutDashboard,
    title: 'Farm Dashboard',
    description: 'See your total land, total and monthly spending, spending by category and recent work at a glance.',
  },
  {
    icon: Map,
    title: 'My Farm',
    description: 'Save each farm with its location, land area, soil type, soil pH and water source.',
  },
  {
    icon: Wallet,
    title: 'Expense Tracker',
    description: 'Record costs for seeds, fertilizer, labour, irrigation and more. Filter by category and see a chart.',
  },
  {
    icon: BookOpen,
    title: 'Activity Journal',
    description: 'Keep a dated diary of sowing, irrigation, spraying and harvest, with crop, time spent and notes.',
  },
  {
    icon: UserCog,
    title: 'Profile',
    description: 'Keep your name, phone number and village, district and state up to date.',
  },
];

const steps = [
  { icon: UserPlus, title: 'Create your account', description: 'Sign up free with your name, email and a password.' },
  { icon: Map, title: 'Add your farm', description: 'Enter your land area, soil and water details once.' },
  { icon: PenLine, title: 'Record as you work', description: 'Log every expense and farm activity on the day it happens.' },
  { icon: BarChart3, title: 'Track your totals', description: 'Your dashboard updates instantly from what you record.' },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-cream text-ink">
      <PublicNavbar />

      {/* Hero */}
      <section className="pt-28 pb-16 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="flex items-center gap-2 text-xs font-semibold tracking-wide text-forest uppercase border-l-2 border-harvest pl-3 mb-5">
                Digital farm record book
              </p>
              <h1 className="text-4xl sm:text-5xl font-bold text-ink leading-tight">
                Keep Your Farm Records
                <br />
                in One Place.
              </h1>
              <p className="mt-4 text-lg text-muted max-w-lg">
                Save your farm details, track every rupee you spend and keep a daily journal of farm work —
                then see it all summarised on your own dashboard.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  to="/register"
                  className="inline-flex items-center justify-center bg-forest hover:bg-forest-light text-white font-semibold px-6 py-3 rounded-md transition-colors"
                >
                  Get Started
                </Link>
                <a
                  href="#how-it-works"
                  className="inline-flex items-center justify-center border border-forest text-forest hover:bg-forest/5 font-semibold px-6 py-3 rounded-md transition-colors"
                >
                  See How It Works
                </a>
              </div>
            </div>

            {/* What you can do */}
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
              <div className="bg-forest px-5 py-3">
                <p className="text-white text-sm font-bold tracking-wide">WITH AGRISATHI YOU CAN</p>
              </div>
              <ul className="p-5 space-y-3">
                {[
                  'Save details of every farm you own',
                  'Record expenses and see where your money goes',
                  'Log daily farm work in an activity journal',
                  'View live totals on your personal dashboard',
                  'Access your records from any device after login',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-ink">
                    <CheckCircle2 className="h-5 w-5 text-forest shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-14">
            <h2 className="text-3xl font-bold text-ink">Features</h2>
            <p className="mt-3 text-muted">Everything included in AgriSathi.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={feature.title} className="border-t-2 border-forest pt-4">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-sm font-bold text-harvest">{String(index + 1).padStart(2, '0')}</span>
                    <Icon className="h-5 w-5 text-forest" />
                  </div>
                  <h3 className="font-semibold text-ink mb-1.5">{feature.title}</h3>
                  <p className="text-sm text-muted leading-relaxed">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-14">
            <h2 className="text-3xl font-bold text-ink">How It Works</h2>
            <p className="mt-3 text-muted">Four simple steps.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={step.title}>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="h-10 w-10 rounded-full bg-forest text-white flex items-center justify-center font-bold text-sm shrink-0">
                      {index + 1}
                    </div>
                    <Icon className="h-5 w-5 text-forest" />
                  </div>
                  <h3 className="font-semibold text-ink mb-1.5">{step.title}</h3>
                  <p className="text-sm text-muted leading-relaxed">{step.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 bg-forest">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white">Start Recording Your Farm Today.</h2>
          <p className="mt-3 text-white/80">Free to use. Your dashboard starts empty and fills in as you record.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              to="/register"
              className="inline-flex items-center justify-center bg-harvest hover:bg-harvest/90 text-ink font-semibold px-8 py-3.5 rounded-md transition-colors text-lg"
            >
              Get Started
            </Link>
            <Link
              to="/login"
              className="inline-flex items-center justify-center border border-white text-white hover:bg-white/10 font-semibold px-8 py-3.5 rounded-md transition-colors text-lg"
            >
              Login
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-earth-900 text-earth-100 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-8">
            <div className="max-w-sm">
              <div className="flex items-center gap-2 mb-3">
                <div className="h-8 w-8 rounded-md bg-forest flex items-center justify-center">
                  <Sprout className="h-4.5 w-4.5 text-white" />
                </div>
                <span className="font-display font-bold text-white text-lg">AgriSathi</span>
              </div>
              <p className="text-sm text-earth-300">A digital farm record book for Indian farmers.</p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-3">Features</h4>
              <ul className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm text-earth-300">
                {features.map((f) => (
                  <li key={f.title}>{f.title}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-6 border-t border-earth-800 text-center text-sm text-earth-400">
            © 2026 AgriSathi
          </div>
        </div>
      </footer>
    </div>
  );
}
