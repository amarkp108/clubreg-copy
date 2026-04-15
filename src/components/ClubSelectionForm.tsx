import { useState } from "react";
import { domains, type Domain, type Club } from "@/lib/clubData";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { BookOpen, CheckCircle2, School } from "lucide-react";
import schoolLogo from "@/assets/school-logo.jpeg";

export function ClubSelectionForm() {
  const [selectedDomain, setSelectedDomain] = useState<Domain | null>(null);
  const [selectedClub, setSelectedClub] = useState<Club | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleDomainSelect = (domain: Domain) => {
    setSelectedDomain(domain);
    setSelectedClub(null);
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };

  const handleReset = () => {
    setSelectedDomain(null);
    setSelectedClub(null);
    setSubmitted(false);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-[#f0f2f5]">
        <Header />
        <div className="mx-auto max-w-4xl px-4 py-12">
          <div className="rounded-2xl bg-white p-8 shadow-sm text-center">
            <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-50">
              <CheckCircle2 className="h-10 w-10 text-emerald-600" />
            </div>
            <h2 className="text-2xl font-bold text-[#1b3a2d]">Registration Successful!</h2>
            <p className="mt-2 text-[#6b7280]">Your club preference has been recorded.</p>
            <div className="mt-6 rounded-xl bg-[#f8faf9] p-6 text-left space-y-3 text-sm max-w-md mx-auto">
              <InfoRow label="Domain" value={selectedDomain?.name || ""} />
              <InfoRow label="Club" value={selectedClub?.name || ""} />
              <InfoRow label="Incharge" value={selectedClub?.incharge || ""} />
            </div>
            <Button
              onClick={handleReset}
              className="mt-6 bg-[#1b3a2d] hover:bg-[#153024] text-white px-8"
            >
              Register Again
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f0f2f5]">
      <Header />

      <div className="mx-auto max-w-4xl px-4 py-8 -mt-8 relative z-10 space-y-6">
        {/* Progress Bar */}
        <div className="h-1.5 rounded-full overflow-hidden bg-[#e5e7eb]">
          <div
            className="h-full rounded-full transition-all duration-500 bg-gradient-to-r from-[#c8a951] to-[#e0c86e]"
            style={{
              width: selectedClub ? "100%" : selectedDomain ? "50%" : "0%",
            }}
          />
        </div>

        {/* Domain Selection */}
        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-5">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#f0f2f5]">
              <BookOpen className="h-5 w-5 text-[#1b3a2d]" />
            </div>
            <div>
              <h3 className="font-bold text-[#1b3a2d]">Choose Domain</h3>
              <p className="text-xs text-[#6b7280]">Select the domain you're interested in</p>
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {domains.map((domain) => (
              <button
                key={domain.id}
                onClick={() => handleDomainSelect(domain)}
                className={cn(
                  "rounded-xl border-2 px-4 py-3 text-left transition-all text-sm font-medium",
                  selectedDomain?.id === domain.id
                    ? "border-[#1b3a2d] bg-[#1b3a2d] text-white shadow-md"
                    : "border-[#e5e7eb] bg-white text-[#1b3a2d] hover:border-[#1b3a2d]/30 hover:bg-[#f8faf9]"
                )}
              >
                {domain.name}
                <span className={cn(
                  "block text-xs mt-0.5 font-normal",
                  selectedDomain?.id === domain.id ? "text-white/70" : "text-[#9ca3af]"
                )}>
                  {domain.clubs.length} clubs
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Club Selection */}
        {selectedDomain && (
          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-5">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#f0f2f5]">
                <School className="h-5 w-5 text-[#1b3a2d]" />
              </div>
              <div>
                <h3 className="font-bold text-[#1b3a2d]">Choose Club</h3>
                <p className="text-xs text-[#6b7280]">
                  Select a club from <Badge className="bg-[#1b3a2d]/10 text-[#1b3a2d] hover:bg-[#1b3a2d]/10 text-xs">{selectedDomain.name}</Badge>
                </p>
              </div>
            </div>
            <div className="grid gap-3">
              {selectedDomain.clubs.map((club) => (
                <button
                  key={club.name}
                  onClick={() => setSelectedClub(club)}
                  className={cn(
                    "flex items-center justify-between rounded-xl border-2 p-4 text-left transition-all",
                    selectedClub?.name === club.name
                      ? "border-[#1b3a2d] bg-[#1b3a2d]/5 shadow-sm"
                      : "border-[#e5e7eb] hover:border-[#1b3a2d]/30 hover:bg-[#f8faf9]"
                  )}
                >
                  <div>
                    <span className="font-semibold text-[#1b3a2d] text-sm">{club.name}</span>
                    <p className="mt-0.5 text-xs text-[#6b7280]">Incharge: {club.incharge}</p>
                  </div>
                  {selectedClub?.name === club.name && (
                    <CheckCircle2 className="h-5 w-5 text-[#1b3a2d] shrink-0" />
                  )}
                </button>
              ))}
            </div>
            <div className="flex justify-end pt-5">
              <Button
                disabled={!selectedClub}
                onClick={handleSubmit}
                className="px-8 h-11 rounded-xl bg-[#1b3a2d] hover:bg-[#153024] text-white"
              >
                Submit Registration
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function Header() {
  return (
    <div className="pb-14 pt-6 px-4" style={{ backgroundColor: '#1A5C2A' }}>
      <div className="mx-auto max-w-4xl flex flex-col items-center text-center gap-3">
        <img src={schoolLogo} alt="Wisdom World School Logo" className="h-16 w-16 rounded-full object-cover" />
        <div>
          <h1 className="text-xl font-bold text-white">Club Registration</h1>
          <p className="text-sm text-white">Wisdom World School - Kurukshetra</p>
        </div>
        <p className="text-xs text-white opacity-70">Developed by Okie Dokie</p>
      </div>
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between">
      <span className="text-[#6b7280]">{label}</span>
      <span className="font-medium text-[#1b3a2d]">{value}</span>
    </div>
  );
}
