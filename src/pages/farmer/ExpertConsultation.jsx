import { useState } from 'react';
import {
  Users,
  Star,
  MapPin,
  Clock,
  MessageSquare,
  Languages,
  CheckCircle2,
  Clock3,
  Phone,
} from 'lucide-react';

import PageHeader from '../../components/ui/PageHeader';
import Badge from '../../components/ui/Badge';
import Modal from '../../components/ui/Modal';
import { TextArea, Select } from '../../components/ui/FormInputs';
import { InfoBanner } from '../../components/ui/StatusState';

import { experts, previousQueries } from '../../data/mockData';

export default function ExpertConsultation() {
  const [selectedExpert, setSelectedExpert] = useState(null);
  const [consultModalOpen, setConsultModalOpen] = useState(false);

  const openConsultModal = (expert) => {
    setSelectedExpert(expert);
    setConsultModalOpen(true);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Expert Consultation"
        subtitle="Get advice from agricultural experts"
        icon={Users}
      />

      <InfoBanner
        icon={MessageSquare}
        title="How consultation works"
        message="Book a consultation with a specialist. Ask your question, upload photos if needed, and the expert will respond within 24 hours. Live chat will be available in a future phase."
        color="green"
      />

      {/* Expert listing */}
      <div className="grid md:grid-cols-2 gap-4">
        {experts.map((expert) => (
          <div key={expert.id} className="card p-5">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="h-14 w-14 rounded-full bg-green-100 text-green-700 flex items-center justify-center font-bold text-lg">
                  {expert.name.split(' ').slice(1).map((n) => n[0]).join('')}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{expert.name}</h3>
                  <p className="text-sm text-green-700">{expert.specialty}</p>
                  <div className="flex items-center gap-3 mt-1 text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                      <Star className="h-3 w-3 text-amber-500 fill-amber-500" />
                      {expert.rating}
                    </span>
                    <span>{expert.experience} experience</span>
                  </div>
                </div>
              </div>
              <Badge color={expert.available ? 'green' : 'gray'}>
                {expert.available ? 'Available' : 'Unavailable'}
              </Badge>
            </div>

            <p className="text-sm text-gray-600 mt-3">{expert.bio}</p>

            <div className="mt-3 space-y-1.5 text-xs text-gray-500">
              <p className="flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5 text-green-600" />
                {expert.location}
              </p>
              <p className="flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5 text-green-600" />
                {expert.availability}
              </p>
              <p className="flex items-center gap-1.5">
                <Languages className="h-3.5 w-3.5 text-green-600" />
                {expert.languages.join(', ')}
              </p>
            </div>

            <div className="mt-4 flex items-center justify-between pt-4 border-t border-gray-100">
              <div>
                <p className="text-sm font-semibold text-gray-900">{expert.price}</p>
                <p className="text-xs text-gray-500">{expert.consultations} consultations done</p>
              </div>
              <button
                onClick={() => openConsultModal(expert)}
                disabled={!expert.available}
                className="btn-primary px-5 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <MessageSquare className="h-4 w-4" /> Ask for Consultation
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Previous queries */}
      <div>
        <h3 className="font-semibold text-gray-900 mb-4">Your Previous Queries</h3>
        {previousQueries.length === 0 ? (
          <div className="card p-10 text-center text-gray-500">
            No consultations yet. Ask your first question above.
          </div>
        ) : (
          <div className="space-y-3">
            {previousQueries.map((query) => (
              <div key={query.id} className="card p-5">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <h4 className="font-medium text-gray-900">{query.topic}</h4>
                    <div className="flex flex-wrap items-center gap-3 mt-1 text-xs text-gray-500">
                      <span>{query.expertName}</span>
                      <span>•</span>
                      <span>{query.date}</span>
                    </div>
                  </div>
                  {query.statusType === 'completed' ? (
                    <Badge color="green">
                      <CheckCircle2 className="h-3 w-3 inline mr-1 -mt-0.5" />
                      {query.status}
                    </Badge>
                  ) : (
                    <Badge color="amber">
                      <Clock3 className="h-3 w-3 inline mr-1 -mt-0.5" />
                      {query.status}
                    </Badge>
                  )}
                </div>
                {query.answerSummary && (
                  <div className="mt-3 p-3 bg-green-50 rounded-lg border border-green-200">
                    <p className="text-xs font-medium text-green-800 mb-1">Expert's response:</p>
                    <p className="text-sm text-gray-700">{query.answerSummary}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Consultation modal */}
      <Modal
        open={consultModalOpen}
        onClose={() => setConsultModalOpen(false)}
        title="Ask for Consultation"
        size="lg"
      >
        {selectedExpert && (
          <form
            className="space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              setConsultModalOpen(false);
            }}
          >
            <div className="flex items-center gap-3 p-3 bg-earth-50 rounded-lg">
              <div className="h-10 w-10 rounded-full bg-green-100 text-green-700 flex items-center justify-center font-bold">
                {selectedExpert.name.split(' ').slice(1).map((n) => n[0]).join('')}
              </div>
              <div>
                <p className="font-medium text-gray-900">{selectedExpert.name}</p>
                <p className="text-xs text-gray-500">{selectedExpert.specialty} • {selectedExpert.price}</p>
              </div>
            </div>

            <div>
              <label className="label">Topic / Crop</label>
              <Select required>
                <option value="">Select topic</option>
                <option>Soybean cultivation</option>
                <option>Cotton pest management</option>
                <option>Onion fertilizer guidance</option>
                <option>Soil health & testing</option>
                <option>Disease identification</option>
                <option>Irrigation management</option>
                <option>Other</option>
              </Select>
            </div>

            <div>
              <label className="label">Your Question</label>
              <TextArea
                required
                placeholder="Describe your problem in detail. Include crop stage, symptoms, and any actions you've taken..."
                minLength={20}
              />
            </div>

            <InfoBanner
              icon={Phone}
              title="Response time"
              message="Experts typically respond within 24 hours. You'll receive a notification when the answer is ready."
              color="blue"
            />

            <div className="flex justify-end gap-3 pt-2">
              <button type="button" onClick={() => setConsultModalOpen(false)} className="btn-secondary">
                Cancel
              </button>
              <button type="submit" className="btn-primary">
                Submit Question
              </button>
            </div>
          </form>
        )}
      </Modal>
    </div>
  );
}