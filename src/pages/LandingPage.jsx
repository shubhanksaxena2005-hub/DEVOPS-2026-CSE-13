import { Link } from 'react-router-dom';
import {
  Sprout,
  CloudRain,
  TrendingUp,
  MessageCircle,
  Tractor,
  ClipboardCheck,
  Store,
  Truck,
  Search,
  Lightbulb,
  Scale,
  CheckCircle2,
  Sun,
  Cloud,
  MapPin,
  ArrowUpRight,
  ArrowDownRight,
} from 'lucide-react';
import PublicNavbar from '../components/layout/PublicNavbar';

const stats = [
  { value: '2,800+', label: 'Active Farmers' },
  { value: '500+', label: 'Mandi Price Points' },
  { value: '18', label: 'States Covered' },
];

const coreFeatures = [
  {
    number: '01',
    icon: Sprout,
    title: 'Crop Recommendations',
    description: 'Know what to plant based on your location, soil and season.',
  },
  {
    number: '02',
    icon: CloudRain,
    title: 'Weather Alerts',
    description: 'Get timely weather information before it affects your crop.',
  },
  {
    number: '03',
    icon: TrendingUp,
    title: 'Mandi Prices',
    description: 'Track current market prices and identify better selling opportunities.',
  },
  {
    number: '04',
    icon: MessageCircle,
    title: 'Expert Advice',
    description: 'Get practical guidance from agronomists when you need it.',
  },
];

const userGroups = [
  { icon: Tractor, title: 'Farmers', description: 'Plan sowing, irrigation and harvest with local data.' },
  { icon: ClipboardCheck, title: 'Field Officers', description: 'Track crop health and advisories across your area.' },
  { icon: Store, title: 'Agri Dealers', description: 'Stay ahead of demand with crop and season insights.' },
  { icon: Truck, title: 'Procurement Teams', description: 'Track mandi prices to time purchases and sourcing.' },
];

const workflowSteps = [
  { icon: Search, title: 'Check', description: 'Weather, soil and market conditions for your area.' },
  { icon: Lightbulb, title: 'Understand', description: 'What it means for your crop and timeline.' },
  { icon: Scale, title: 'Decide', description: 'Compare options with real price and yield data.' },
  { icon: CheckCircle2, title: 'Act', description: 'Sow, irrigate, treat or sell at the right time.' },
];

const mandiPrices = [
  { crop: 'Wheat', location: 'Ludhiana, Punjab', price: '₹2,450', unit: '/ quintal', change: '+3.2%', up: true },
  { crop: 'Onion', location: 'Nashik, Maharashtra', price: '₹1,850', unit: '/ quintal', change: '+6.8%', up: true },
  { crop: 'Soybean', location: 'Indore, Madhya Pradesh', price: '₹4,300', unit: '/ quintal', change: '+1.1%', up: true },
  { crop: 'Cotton', location: 'Nagpur, Maharashtra', price: '₹7,200', unit: '/ quintal', change: '-2.4%', up: false },
  { crop: 'Rice', location: 'Guntur, Andhra Pradesh', price: '₹2,100', unit: '/ quintal', change: '-1.0%', up: false },
];

const forecast = [
  { day: 'Today', icon: Sun, temp: '28°C' },
  { day: 'Tomorrow', icon: Cloud, temp: '26°C' },
  { day: 'Wed', icon: CloudRain, temp: '23°C' },
  { day: 'Thu', icon: CloudRain, temp: '24°C' },
];

const testimonials = [
  {
    quote:
      'I check the mandi prices every morning before deciding where to sell my onions. It has saved me from selling at a loss more than once.',
    name: 'Ramesh Yadav',
    role: 'Farmer, Dindori, Nashik',
  },
  {
    quote:
      'As a field officer covering twelve villages, the weather alerts help me warn farmers before a bad spell hits their crop.',
    name: 'Sunita Patil',
    role: 'Field Officer, Krishi Vibhag, Maharashtra',
  },
  {
    quote:
      'We use the crop calendar to plan our fertilizer stock ahead of the season instead of guessing from last year.',
    name: 'Irfan Sheikh',
    role: 'Agri-Input Dealer, Malegaon',
  },
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
                Built for people who work in agriculture
              </p>
              <h1 className="text-4xl sm:text-5xl font-bold text-ink leading-tight">
                Better Decisions.
                <br />
                Better Harvests.
              </h1>
              <p className="mt-4 text-lg text-muted max-w-lg">
                Crop recommendations, weather alerts, mandi prices and expert guidance — built
                for the people who work in agriculture.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  to="/register"
                  className="inline-flex items-center justify-center bg-forest hover:bg-forest-light text-white font-semibold px-6 py-3 rounded-md transition-colors"
                >
                  Get Started
                </Link>
                <a
                  href="#workflow"
                  className="inline-flex items-center justify-center border border-forest text-forest hover:bg-forest/5 font-semibold px-6 py-3 rounded-md transition-colors"
                >
                  See How It Works
                </a>
              </div>
            </div>

            {/* Hero image + Field Snapshot */}
            <div>
              <div className="rounded-lg overflow-hidden border border-clay/20 shadow-md">
                <img
                  src="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
                  alt="Rows of healthy crops growing in an Indian farm field"
                  className="w-full h-[320px] object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>

              {/* Field Snapshot panel */}
              <div className="mt-4 bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
                <div className="bg-forest px-4 py-2">
                  <p className="text-white text-xs font-bold tracking-wide">FIELD SNAPSHOT</p>
                </div>
                <div className="p-4">
                  <p className="flex items-center gap-1.5 text-sm font-medium text-ink mb-3">
                    <MapPin className="h-3.5 w-3.5 text-muted" /> Nashik, Maharashtra
                  </p>
                  <div className="grid grid-cols-2 gap-4 pb-3 border-b border-gray-100">
                    <div>
                      <p className="text-xs text-muted">Weather</p>
                      <p className="font-semibold text-ink">28°C · Partly Cloudy</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted">Wheat Mandi</p>
                      <p className="font-semibold text-ink">
                        ₹2,450{' '}
                        <span className="text-forest-light text-xs font-medium">↑ 3.2%</span>
                      </p>
                    </div>
                  </div>
                  <p className="text-xs text-muted mt-3">
                    <span className="font-semibold text-ink">Today&apos;s recommendation: </span>
                    Irrigation conditions look favorable.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust / Statistics */}
      <section className="bg-sand border-y border-clay/15 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-bold tracking-wide text-soil uppercase text-center mb-6">
            Trusted by the Field
          </p>
          <div className="grid grid-cols-3 divide-x divide-clay/20">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center px-4">
                <p className="text-3xl font-bold text-forest">{stat.value}</p>
                <p className="text-sm text-muted mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Features */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-14">
            <h2 className="text-3xl font-bold text-ink">Everything You Need to Make the Next Move</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-10">
            {coreFeatures.map((feature) => {
              const Icon = feature.icon;
              return (
                <div key={feature.number} className="border-t-2 border-forest pt-4">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-sm font-bold text-harvest">{feature.number}</span>
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

      {/* Built for the people who work in agriculture */}
      <section id="for-farmers" className="py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-14">
            <h2 className="text-3xl font-bold text-ink">Built for the People Who Work in Agriculture</h2>
            <p className="mt-3 text-muted">
              Whether you farm the land or move what it produces, AgriSathi fits how you work.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {userGroups.map((group) => {
              const Icon = group.icon;
              return (
                <div
                  key={group.title}
                  className="bg-white rounded-lg border border-gray-200 p-6 hover:border-forest/40 transition-colors"
                >
                  <div className="h-10 w-10 rounded-md bg-forest/10 text-forest flex items-center justify-center mb-4">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-semibold text-ink mb-1.5">{group.title}</h3>
                  <p className="text-sm text-muted">{group.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Workflow */}
      <section id="workflow" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-14">
            <h2 className="text-3xl font-bold text-ink">How It Works</h2>
            <p className="mt-3 text-muted">Four steps, every season.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {workflowSteps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={step.title} className="relative">
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

      {/* Mandi / Market prices */}
      <section id="market" className="py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-10">
            <h2 className="text-3xl font-bold text-ink">Today&apos;s Mandi Snapshot</h2>
            <p className="mt-3 text-muted">
              A sample of prices tracked across mandis so you know where to sell.
            </p>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div className="grid grid-cols-4 gap-4 px-5 py-3 bg-soil text-white text-xs font-bold uppercase tracking-wide">
              <span className="col-span-2">Crop &amp; Mandi</span>
              <span className="text-right">Price</span>
              <span className="text-right">Change</span>
            </div>
            {mandiPrices.map((row) => (
              <div
                key={row.crop}
                className="grid grid-cols-4 gap-4 px-5 py-4 border-t border-gray-100 items-center"
              >
                <div className="col-span-2">
                  <p className="font-semibold text-ink">{row.crop}</p>
                  <p className="flex items-center gap-1 text-xs text-muted mt-0.5">
                    <MapPin className="h-3 w-3" /> {row.location}
                  </p>
                </div>
                <p className="text-right font-semibold text-ink">
                  {row.price}
                  <span className="text-muted font-normal text-xs"> {row.unit}</span>
                </p>
                <p
                  className={`flex items-center justify-end gap-1 text-sm font-semibold ${
                    row.up ? 'text-forest-light' : 'text-red-600'
                  }`}
                >
                  {row.up ? (
                    <ArrowUpRight className="h-4 w-4" />
                  ) : (
                    <ArrowDownRight className="h-4 w-4" />
                  )}
                  {row.change}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Weather + Crop guidance */}
      <section id="resources" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-3xl font-bold text-ink mb-3">Weather, With What It Means for You</h2>
              <p className="text-muted mb-8">
                Not just a forecast — practical guidance for what to do next.
              </p>
              <div className="grid grid-cols-4 gap-3 mb-6">
                {forecast.map((day) => {
                  const Icon = day.icon;
                  return (
                    <div
                      key={day.day}
                      className="bg-cream border border-gray-200 rounded-md py-4 text-center"
                    >
                      <p className="text-xs text-muted mb-2">{day.day}</p>
                      <Icon className="h-5 w-5 text-forest mx-auto mb-2" />
                      <p className="text-sm font-semibold text-ink">{day.temp}</p>
                    </div>
                  );
                })}
              </div>
              <div className="bg-sand border-l-2 border-mandi rounded-md p-4">
                <p className="text-sm text-ink">
                  <span className="font-semibold">Rain expected Wednesday.</span> Delay pesticide
                  spraying until conditions clear to avoid wash-off.
                </p>
              </div>
            </div>
            <div className="rounded-lg overflow-hidden border border-clay/20 shadow-md">
              <img
                src="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
                alt="Crop field under changing weather conditions"
                className="w-full h-full min-h-[280px] object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-14">
            <h2 className="text-3xl font-bold text-ink">From the Field</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div key={t.name} className="bg-white rounded-lg border border-gray-200 p-6">
                <p className="text-sm text-ink leading-relaxed mb-5">&ldquo;{t.quote}&rdquo;</p>
                <p className="text-sm font-semibold text-ink">{t.name}</p>
                <p className="text-xs text-muted">{t.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 bg-forest">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white">
            Make Your Next Farming Decision With Confidence.
          </h2>
          <Link
            to="/register"
            className="inline-flex items-center justify-center mt-8 bg-harvest hover:bg-harvest/90 text-ink font-semibold px-8 py-3.5 rounded-md transition-colors text-lg"
          >
            Get Started
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-earth-900 text-earth-100 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="h-8 w-8 rounded-md bg-forest flex items-center justify-center">
                  <Sprout className="h-4.5 w-4.5 text-white" />
                </div>
                <span className="font-display font-bold text-white text-lg">AgriSathi</span>
              </div>
              <p className="text-sm text-earth-300">
                Smart farming platform helping Indian farmers make confident decisions.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-3">Platform</h4>
              <ul className="space-y-2 text-sm text-earth-300">
                <li>Crop Recommendations</li>
                <li>Weather Alerts</li>
                <li>Mandi Prices</li>
                <li>Expert Advice</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-3">Resources</h4>
              <ul className="space-y-2 text-sm text-earth-300">
                <li>Government Schemes</li>
                <li>Crop Calendar</li>
                <li>Fertilizer Guide</li>
                <li>Farming Journal</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-3">Contact</h4>
              <ul className="space-y-2 text-sm text-earth-300">
                <li>support@agrisathi.in</li>
                <li>+91 98765 43210</li>
                <li>Nashik, Maharashtra</li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-6 border-t border-earth-800 text-center text-sm text-earth-400">
            © 2026 AgriSathi. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
