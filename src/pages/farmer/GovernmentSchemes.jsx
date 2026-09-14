import { useState } from 'react';
import {
  Landmark,
  Search,
  ExternalLink,
  CheckCircle2,
  FileText,
  Clock,
  ShieldCheck,
  HandCoins,
  GraduationCap,
  CreditCard,
  Droplets,
  FlaskConical,
  Store,
  Tractor,
} from 'lucide-react';

import PageHeader from '../../components/ui/PageHeader';
import Badge from '../../components/ui/Badge';
import Modal from '../../components/ui/Modal';

import { governmentSchemes, schemeCategories, schemeStates } from '../../data/mockData';

const schemeIcons = {
  handCoins: HandCoins,
  shieldCheck: ShieldCheck,
  graduationCap: GraduationCap,
  creditCard: CreditCard,
  droplets: Droplets,
  flaskConical: FlaskConical,
  store: Store,
  tractor: Tractor,
  default: Landmark,
};

export default function GovernmentSchemes() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [state, setState] = useState('All');
  const [selectedScheme, setSelectedScheme] = useState(null);

  const filteredSchemes = governmentSchemes.filter((scheme) => {
    const matchesSearch =
      scheme.name.toLowerCase().includes(search.toLowerCase()) ||
      scheme.summary.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === 'All' || scheme.category === category;
    const matchesState = state === 'All' || scheme.state.includes(state);
    return matchesSearch && matchesCategory && matchesState;
  });

  const handleSchemeClick = (scheme) => {
    setSelectedScheme(scheme);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Government Schemes"
        subtitle="Subsidies, insurance and support programs for farmers"
        icon={Landmark}
      />

      {/* Filters */}
      <div className="card p-5">
        <div className="grid md:grid-cols-4 gap-4">
          <div>
            <label className="label">Search</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search schemes..."
                className="input pl-10"
              />
            </div>
          </div>
          <div>
            <label className="label">Category</label>
            <select value={category} onChange={(e) => setCategory(e.target.value)} className="input">
              {schemeCategories.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="label">State</label>
            <select value={state} onChange={(e) => setState(e.target.value)} className="input">
              {schemeStates.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
          </div>
          <div className="flex items-end">
            <p className="text-xs text-gray-500">
              Showing <span className="font-semibold text-gray-800">{filteredSchemes.length}</span> schemes
            </p>
          </div>
        </div>
      </div>

      {/* Scheme cards */}
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filteredSchemes.map((scheme) => {
          const Icon = schemeIcons[scheme.icon] || schemeIcons.default;
          return (
            <div key={scheme.id} className="card p-5 flex flex-col hover:border-green-300 transition-colors">
              <div className="flex items-start justify-between">
                <div className="p-2.5 rounded-lg bg-green-100 text-green-700">
                  <Icon className="h-5 w-5" />
                </div>
                <Badge color="blue">{scheme.category}</Badge>
              </div>
              <h3 className="font-semibold text-gray-900 mt-3">{scheme.name}</h3>
              <p className="text-sm text-gray-600 mt-1.5 flex-1">{scheme.summary}</p>
              <div className="mt-3 space-y-1">
                <p className="text-xs text-gray-500">
                  <span className="font-medium text-gray-700">Eligibility:</span> {scheme.eligibility[0]}
                </p>
                <p className="text-xs text-gray-500">
                  <span className="font-medium text-gray-700">State:</span> {scheme.state}
                </p>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-xs text-amber-700 bg-amber-50 px-2 py-1 rounded-full">
                  <Clock className="h-3 w-3 inline mr-1 -mt-0.5" />
                  {scheme.deadline}
                </span>
                <button
                  onClick={() => handleSchemeClick(scheme)}
                  className="text-sm font-medium text-green-700 hover:text-green-800"
                >
                  View Details →
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {filteredSchemes.length === 0 && (
        <div className="card p-12 text-center">
          <p className="text-gray-500">No schemes match your filters. Try adjusting the search.</p>
        </div>
      )}

      <p className="text-xs text-gray-400 text-center">
        Scheme information shown is sample mock data for frontend demonstration. Official details should be verified from the source website.
      </p>

      {/* Scheme detail modal */}
      <Modal open={!!selectedScheme} onClose={() => setSelectedScheme(null)} title={selectedScheme?.name} size="lg">
        {selectedScheme && (
          <div className="space-y-5">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <Badge color="blue">{selectedScheme.category}</Badge>
                <Badge color="earth">{selectedScheme.state}</Badge>
                <Badge color="amber">
                  <Clock className="h-3 w-3 inline mr-1 -mt-0.5" />
                  {selectedScheme.deadline}
                </Badge>
              </div>
              <p className="text-sm text-gray-600">{selectedScheme.summary}</p>
            </div>

            {/* Benefits */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-600" /> Key Benefits
              </h4>
              <ul className="space-y-1.5">
                {selectedScheme.benefits.map((benefit, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                    <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>

            {/* Eligibility */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-green-600" /> Eligibility
              </h4>
              <ul className="space-y-1.5">
                {selectedScheme.eligibility.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                    <span className="text-green-600 font-medium mt-0.5">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Documents */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                <FileText className="h-4 w-4 text-green-600" /> Required Documents
              </h4>
              <ul className="space-y-1.5">
                {selectedScheme.documents.map((doc, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                    <span className="text-amber-600 font-medium mt-0.5">•</span>
                    {doc}
                  </li>
                ))}
              </ul>
            </div>

            {/* Application */}
            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
              <h4 className="font-semibold text-gray-900 mb-1.5">How to Apply</h4>
              <p className="text-sm text-gray-700">{selectedScheme.application}</p>
            </div>

            {/* Official source */}
            <a
              href={selectedScheme.officialSource}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-medium text-green-700 hover:text-green-800"
            >
              Visit official source <ExternalLink className="h-4 w-4" />
            </a>
          </div>
        )}
      </Modal>
    </div>
  );
}