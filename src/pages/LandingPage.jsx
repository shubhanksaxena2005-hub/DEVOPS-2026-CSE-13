import { Link } from 'react-router-dom';
import {
  Sprout,
  Cloud,
  TrendingUp,
  Bug,
  FlaskConical,
  Landmark,
  CalendarDays,
  Wallet,
  Users,
  Map,
  ShieldCheck,
  Sun,
  Droplets,
  Wheat,
  ChevronRight,
} from 'lucide-react';
import PublicNavbar from '../components/layout/PublicNavbar';

const features = [
  {
    icon: Sprout,
    title: 'Crop Recommendations',
    description: 'Get crop suggestions based on your soil report, weather and season to improve yield.',
  },
  {
    icon: Cloud,
    title: 'Weather Updates',
    description: 'Local forecasts, rainfall alerts and irrigation advisories to protect your crops.',
  },
  {
    icon: TrendingUp,
    title: 'Mandi Prices',
    description: 'Current prices from your local mandi with trend charts to help you sell at the right time.',
  },
  {
    icon: Bug,
    title: 'Disease Detection',
    description: 'Upload a photo of a damaged crop leaf and get diagnosis guidance from experts.',
  },
  {
    icon: FlaskConical,
    title: 'Fertilizer Guidance',
    description: 'Balanced fertilizer recommendations based on your soil nutrient levels and crop stage.',
  },
  {
    icon: Landmark,
    title: 'Government Schemes',
    description: 'All subsidy, insurance and support schemes eligible for you in one place.',
  },
  {
    icon: CalendarDays,
    title: 'Crop Calendar',
    description: 'Season-wise sowing, irrigation, fertilization and harvesting timelines for your crop.',
  },
  {
    icon: Wallet,
    title: 'Expense Tracking',
    description: 'Track farm expenses, estimate revenue and understand your profit simply.',
  },
  {
    icon: Users,
    title: 'Expert Consultation',
    description: 'Connect with agricultural scientists, pathologists and agronomists when you need advice.',
  },
];

const steps = [
  {
    number: '01',
    title: 'Set Up Your Farm Profile',
    description: 'Add your land details, soil type, water source and current crops. Takes 5 minutes.',
  },
  {
    number: '02',
    title: 'Get Daily Farming Guidance',
    description: 'Receive weather alerts, mandi prices, scheme deadlines and task reminders relevant to your crops.',
  },
  {
    number: '03',
    title: 'Make Better Decisions',
    description: 'Use crop recommendations, price trends and expert advice to plan each season with confidence.',
  },
];

const benefits = [
  { icon: Sun, title: 'Higher Yield', description: 'Data-backed decisions on crop choice, timing and inputs' },
  { icon: Droplets, title: 'Water Efficiency', description: 'Irrigation advisories based on rainfall and soil moisture' },
  { icon: ShieldCheck, title: 'Risk Protection', description: 'Early weather alerts and insurance scheme guidance' },
  { icon: Wheat, title: 'Better Prices', description: 'Mandi price trends to choose the best selling day' },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      <PublicNavbar />

      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-b from-green-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="inline-flex items-center gap-2 bg-green-100 text-green-800 text-xs font-semibold px-3 py-1.5 rounded-full mb-4">
                <Sprout className="h-3.5 w-3.5" />
                Smart farming for every Indian farmer
              </p>
              <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight">
                Grow More with{' '}
                <span className="text-green-700">Smarter Decisions</span>
              </h1>
              <p className="mt-4 text-lg text-gray-600 max-w-lg">
                AgriSathi brings crop recommendations, weather alerts, mandi prices and expert advice
                together in one simple app — so you can focus on farming, not guessing.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  to="/register"
                  className="inline-flex items-center gap-2 bg-green-700 hover:bg-green-800 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
                >
                  Get Started <ChevronRight className="h-4 w-4" />
                </Link>
                <Link
                  to="/login"
                  className="inline-flex items-center gap-2 border border-green-700 text-green-700 hover:bg-green-50 font-semibold px-6 py-3 rounded-lg transition-colors"
                >
                  Login
                </Link>
              </div>
              <div className="mt-8 flex items-center gap-6 text-sm text-gray-500">
                <span className="flex items-center gap-1.5">
                  <Map className="h-4 w-4 text-green-600" /> 2,800+ farmers
                </span>
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="h-4 w-4 text-green-600" /> Trusted by agri experts
                </span>
              </div>
            </div>

            {/* Hero visual */}
            <div className="relative">
              <div className="rounded-2xl overflow-hidden shadow-lg">
                <img
                  src="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
                  alt="Green crop field at sunrise"
                  className="w-full h-[400px] object-cover"
                />
              </div>
              {/* Floating cards */}
              <div className="absolute -bottom-4 -left-4 bg-white rounded-xl shadow-lg p-4 border border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-amber-100 text-amber-700">
                    <Sun className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Current Temp</p>
                    <p className="font-semibold text-lg">28°C — Partly Cloudy</p>
                  </div>
                </div>
              </div>
              <div className="absolute -top-4 right-4 bg-white rounded-xl shadow-lg p-4 border border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-green-100 text-green-700">
                    <TrendingUp className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Wheat Price — Nashik</p>
                    <p className="font-semibold text-lg">₹2,450 / quintal</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-16 bg-earth-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Everything you need to farm smart</h2>
            <p className="mt-3 text-gray-600">
              Practical tools built around the real needs of farmers — from sowing advice to selling at a good price.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <div key={feature.title} className="bg-white rounded-xl p-6 border border-earth-200 hover:border-green-300 transition-colors">
                  <div className="p-2.5 rounded-lg bg-green-100 text-green-700 w-fit mb-4">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1.5">{feature.title}</h3>
                  <p className="text-sm text-gray-600">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl font-bold text-gray-900">How It Works</h2>
            <p className="mt-3 text-gray-600">Getting started is simple. No complicated technology needed.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step) => (
              <div key={step.number} className="relative">
                <div className="text-4xl font-bold text-green-100 mb-3">{step.number}</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section id="benefits" className="py-16 bg-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Real Benefits for Your Farm</h2>
            <p className="mt-3 text-gray-600">
              Farmers using AgriSathi report better planning, fewer losses and more confidence each season.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit) => {
              const Icon = benefit.icon;
              return (
                <div key={benefit.title} className="bg-white rounded-xl p-6 border border-green-100 text-center">
                  <div className="mx-auto p-3 rounded-full bg-green-100 text-green-700 w-fit mb-4">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1.5">{benefit.title}</h3>
                  <p className="text-sm text-gray-600">{benefit.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-green-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white">Start Farming Smarter Today</h2>
          <p className="mt-3 text-green-100">
            Join thousands of farmers using AgriSathi to plan, protect and profit from their land.
          </p>
          <Link
            to="/register"
            className="inline-flex items-center gap-2 mt-8 bg-white text-green-800 hover:bg-green-50 font-semibold px-8 py-3.5 rounded-lg transition-colors text-lg"
          >
            Create Your Free Account <ChevronRight className="h-5 w-5" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-earth-900 text-earth-100 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="h-8 w-8 rounded-lg bg-green-700 flex items-center justify-center">
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
                <li>Weather & Alerts</li>
                <li>Mandi Prices</li>
                <li>Expert Consultation</li>
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