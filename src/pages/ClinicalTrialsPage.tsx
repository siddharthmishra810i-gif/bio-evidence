import React, { useState } from 'react';
import {
  FlaskConical,
  Search,
  ExternalLink,
  Filter,
  CheckCircle2,
  Clock,
  MapPin,
  Sparkles,
} from 'lucide-react';
import { DEMO_TRIALS } from '../data/mockData';
import { SafetyBanner } from '../components/common/SafetyBanner';

export const ClinicalTrialsPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPhase, setSelectedPhase] = useState<string>('All');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');

  const phases = ['All', 'Phase 3', 'Phase 2', 'Phase 1'];
  const statuses = ['All', 'Completed', 'Active, not recruiting', 'Recruiting'];

  const filteredTrials = DEMO_TRIALS.filter((trial) => {
    const matchesSearch =
      searchQuery === '' ||
      trial.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      trial.condition.toLowerCase().includes(searchQuery.toLowerCase()) ||
      trial.nctId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      trial.interventions.some((i) => i.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesPhase = selectedPhase === 'All' || trial.phase === selectedPhase;
    const matchesStatus = selectedStatus === 'All' || trial.status === selectedStatus;

    return matchesSearch && matchesPhase && matchesStatus;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="border-b border-[#DFDCD3] pb-6 space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EFEEE7] border border-[#DFDCD3] text-[11px] font-mono uppercase tracking-widest text-[#516455]">
          <FlaskConical className="w-3.5 h-3.5 text-[#718C78]" />
          <span>ClinicalTrials.gov Registry Integration</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl text-[#252824]">
          Clinical Trials Directory
        </h1>
        <p className="text-sm text-[#585D56] max-w-2xl leading-relaxed">
          Trace prospective interventional studies, patient cohorts, drug regimens, and efficacy readouts for target-directed molecules.
        </p>
      </div>

      {/* Filters Bar */}
      <div className="p-4 rounded-2xl bg-[#EFEEE7]/80 border border-[#DFDCD3] flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#7A8077]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search trials by NCT ID, condition, or drug intervention..."
            className="w-full pl-10 pr-4 py-2 bg-[#F7F5EF] border border-[#DFDCD3] rounded-xl text-xs text-[#252824] placeholder-[#7A8077] focus:outline-none focus:border-[#718C78]"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          <div className="flex items-center gap-1.5">
            <span className="text-[#7A8077] font-mono uppercase text-[10px]">Phase:</span>
            <select
              value={selectedPhase}
              onChange={(e) => setSelectedPhase(e.target.value)}
              className="px-2.5 py-1.5 bg-[#F7F5EF] border border-[#DFDCD3] rounded-lg text-xs font-medium text-[#252824] focus:outline-none focus:border-[#718C78]"
            >
              {phases.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="text-[#7A8077] font-mono uppercase text-[10px]">Status:</span>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-2.5 py-1.5 bg-[#F7F5EF] border border-[#DFDCD3] rounded-lg text-xs font-medium text-[#252824] focus:outline-none focus:border-[#718C78]"
            >
              {statuses.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Trials List */}
      <div className="space-y-4">
        {filteredTrials.map((trial) => (
          <div
            key={trial.id}
            className="p-6 rounded-2xl bg-[#F7F5EF] border border-[#DFDCD3] space-y-4 shadow-2xs hover:border-[#718C78]/60 transition-colors"
          >
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="px-2.5 py-0.5 rounded-full bg-[#EBF0EC] border border-[#718C78]/30 text-[#516455] font-mono text-[10px] font-semibold">
                    {trial.status}
                  </span>
                  <span className="text-xs font-mono font-bold text-[#718C78]">
                    {trial.phase}
                  </span>
                  <span className="text-xs font-mono text-[#7A8077]">
                    Primary Completion: {trial.primaryCompletionDate}
                  </span>
                </div>
                <h3 className="font-serif text-lg sm:text-xl font-bold text-[#252824]">
                  {trial.title}
                </h3>
                <div className="text-xs text-[#585D56] mt-0.5 font-medium">
                  Condition: <span className="text-[#252824]">{trial.condition}</span>
                </div>
              </div>

              <a
                href={`https://clinicaltrials.gov/study/${trial.nctId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-2 rounded-xl bg-[#EFEEE7] hover:bg-[#DFDCD3] text-xs font-medium text-[#252824] inline-flex items-center gap-1.5 shrink-0 self-start transition-colors"
              >
                <span className="font-mono font-bold">{trial.nctId}</span>
                <ExternalLink className="w-3.5 h-3.5 text-[#718C78]" />
              </a>
            </div>

            {/* Trial Details Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs">
              <div className="p-3 rounded-xl bg-[#EFEEE7] border border-[#DFDCD3]">
                <span className="text-[10px] font-mono text-[#7A8077] uppercase font-bold">Interventions Tested</span>
                <div className="font-medium text-[#252824] mt-0.5">
                  {trial.interventions.join(', ')}
                </div>
              </div>

              <div className="p-3 rounded-xl bg-[#EFEEE7] border border-[#DFDCD3]">
                <span className="text-[10px] font-mono text-[#7A8077] uppercase font-bold">Enrollment Cohort</span>
                <div className="font-mono font-bold text-[#252824] mt-0.5">
                  {trial.enrollment.toLocaleString()} participants
                </div>
              </div>

              <div className="p-3 rounded-xl bg-[#EFEEE7] border border-[#DFDCD3]">
                <span className="text-[10px] font-mono text-[#7A8077] uppercase font-bold">Sponsor Organization</span>
                <div className="font-medium text-[#252824] mt-0.5 truncate">
                  {trial.sponsor}
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-[#DFDCD3] flex items-center justify-between text-xs text-[#7A8077]">
              <div className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#718C78]" />
                <span>Primary Sites: {trial.locations.join('; ')}</span>
              </div>
              <span className="font-mono text-[11px]">Demo Registry Mirror</span>
            </div>
          </div>
        ))}
      </div>

      <SafetyBanner compact />
    </div>
  );
};
