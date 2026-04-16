import { useState } from "react";
import { domains, type Domain, type Club } from "@/lib/clubData";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { BookOpen, CheckCircle2, School } from "lucide-react";
import schoolLogo from "@/assets/school-logo.jpeg";

export function ClubSelectionForm() {
  const [selectedDomain, setSelectedDomain] = useState<Domain | null>(null);
  const [selectedClubs, setSelectedClubs] = useState<Club[]>([]);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [maxDialogOpen, setMaxDialogOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const maxSelections = 6;
  const totalSelected = selectedClubs.length;
  const singleChoiceDomains = ["Dance", "Music", "Sports"];
  const selectedDomainAllowsMultiple = selectedDomain
    ? !singleChoiceDomains.includes(selectedDomain.name)
    : true;
  const isMaxReached = totalSelected >= maxSelections;

  const handleDomainSelect = (domain: Domain) => {
    if (selectedDomain?.id === domain.id) {
      setSelectedDomain(null);
      setPreviewOpen(false);
      return;
    }

    setSelectedDomain(domain);
    setPreviewOpen(false);
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };

  const handleReset = () => {
    setSelectedDomain(null);
    setSelectedClubs([]);
    setPreviewOpen(false);
    setMaxDialogOpen(false);
    setSubmitted(false);
  };

  const selectedClubNames = selectedClubs.map((club) => club.name).join(", ");
  const selectedIncharge = selectedClubs.map((club) => club.incharge).join(", ");

  const selectedCountForDomain = (domain: Domain) =>
    selectedClubs.filter((club) => domain.clubs.some((domainClub) => domainClub.name === club.name))
      .length;

  const selectedClubsByDomain = domains
    .map((domain) => ({
      domainName: domain.name,
      clubs: selectedClubs.filter((club) =>
        domain.clubs.some((domainClub) => domainClub.name === club.name),
      ),
    }))
    .filter((item) => item.clubs.length > 0);

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
              <InfoRow label="Total selected" value={`${totalSelected}/${maxSelections}`} />
              <InfoRow label="Clubs" value={selectedClubNames} />
              <InfoRow label="Incharge" value={selectedIncharge} />
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
              width: selectedDomain
                ? `${Math.min((totalSelected / maxSelections) * 100, 100)}%`
                : "0%",
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
            {domains.map((domain) => {
              const selectedCount = selectedCountForDomain(domain);

              return (
                <button
                  key={domain.id}
                  onClick={() => handleDomainSelect(domain)}
                  className={cn(
                    "rounded-xl border-2 px-4 py-3 text-left transition-all text-sm font-medium",
                    selectedDomain?.id === domain.id
                      ? "border-[#1b3a2d] bg-[#1b3a2d] text-white shadow-md"
                      : "border-[#e5e7eb] bg-white text-[#1b3a2d] hover:border-[#1b3a2d]/30 hover:bg-[#f8faf9]",
                  )}
                >
                  <div className="flex items-center justify-between gap-3">
                    <span>{domain.name}</span>
                    <span
                      className={cn(
                        "rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.12em]",
                        selectedCount > 0
                          ? "bg-white text-[#1b3a2d]"
                          : "bg-[#e5e7eb] text-[#6b7280]",
                      )}
                    >
                      {selectedCount}
                    </span>
                  </div>
                  <span
                    className={cn(
                      "block text-xs mt-1 font-normal",
                      selectedDomain?.id === domain.id ? "text-white/70" : "text-[#9ca3af]",
                    )}
                  >
                    {domain.clubs.length} clubs
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Club Selection */}
        {selectedDomain && (
          <>
            <div className="rounded-2xl bg-white p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-5">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#f0f2f5]">
                  <School className="h-5 w-5 text-[#1b3a2d]" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-[#1b3a2d]">Choose Club</h3>
                  <p className="text-xs text-[#6b7280]">
                    Select a club from{" "}
                    <Badge className="bg-[#1b3a2d]/10 text-[#1b3a2d] hover:bg-[#1b3a2d]/10 text-xs">
                      {selectedDomain.name}
                    </Badge>
                  </p>
                </div>
                <div className="text-right text-xs text-[#6b7280]">
                  <div>Total selected</div>
                  <div className="font-semibold text-[#1b3a2d]">
                    {totalSelected}/{maxSelections}
                  </div>
                </div>
              </div>
              <div className="grid gap-3">
                {selectedDomain.clubs.map((club) => {
                  const isSelected = selectedClubs.some((selected) => selected.name === club.name);
                  const domainClubNames = selectedDomain.clubs.map((domainClub) => domainClub.name);
                  const hasSameDomainSelected = selectedClubs.some((selected) =>
                    domainClubNames.includes(selected.name),
                  );

                  return (
                    <button
                      key={club.name}
                      onClick={() => {
                        if (isSelected) {
                          setSelectedClubs((prev) =>
                            prev.filter((selected) => selected.name !== club.name),
                          );
                          return;
                        }

                        if (!selectedDomainAllowsMultiple) {
                          if (isMaxReached && !hasSameDomainSelected) {
                            setMaxDialogOpen(true);
                            return;
                          }

                          setSelectedClubs((prev) => [
                            ...prev.filter((selected) => !domainClubNames.includes(selected.name)),
                            club,
                          ]);
                          return;
                        }

                        if (isMaxReached) {
                          setMaxDialogOpen(true);
                          return;
                        }

                        setSelectedClubs((prev) => [...prev, club]);
                      }}
                      className={cn(
                        "flex items-center justify-between rounded-xl border-2 p-4 text-left transition-all",
                        isSelected
                          ? "border-[#1b3a2d] bg-[#1b3a2d]/5 shadow-sm"
                          : "border-[#e5e7eb] hover:border-[#1b3a2d]/30 hover:bg-[#f8faf9]",
                      )}
                    >
                      <div>
                        <span className="font-semibold text-[#1b3a2d] text-sm">{club.name}</span>
                        <p className="mt-0.5 text-xs text-[#6b7280]">Incharge: {club.incharge}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        {isSelected && <CheckCircle2 className="h-5 w-5 text-[#1b3a2d] shrink-0" />}
                      </div>
                    </button>
                  );
                })}
              </div>
              <div className="flex justify-end pt-5 gap-3 flex-wrap">
                <Button
                  onClick={() => setPreviewOpen((prev) => !prev)}
                  className="px-4 h-11 rounded-xl bg-[#1b3a2d] hover:bg-[#153024] text-white"
                >
                  {previewOpen ? "Hide Preview" : "Show Preview"}
                </Button>
                <Button
                  disabled={selectedClubs.length === 0}
                  onClick={handleSubmit}
                  className="px-8 h-11 rounded-xl bg-[#1b3a2d] hover:bg-[#153024] text-white"
                >
                  Submit Registration
                </Button>
              </div>
              {previewOpen && (
                <div className="mt-5 rounded-2xl bg-[#f8faf9] p-4 text-sm">
                  {selectedClubsByDomain.length ? (
                    selectedClubsByDomain.map((item) => (
                      <div key={item.domainName} className="mb-4 last:mb-0">
                        <p className="font-semibold text-[#1b3a2d]">{item.domainName}</p>
                        <ul className="list-disc list-inside text-[#6b7280]">
                          {item.clubs.map((club) => (
                            <li key={club.name}>{club.name}</li>
                          ))}
                        </ul>
                      </div>
                    ))
                  ) : (
                    <p className="text-[#6b7280]">No clubs selected yet.</p>
                  )}
                </div>
              )}
            </div>

            <Dialog open={maxDialogOpen} onOpenChange={setMaxDialogOpen}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Maximum reached</DialogTitle>
                  <DialogDescription>
                    You have reached the maximum of 6 club selections. Remove one selection to add
                    another.
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button className="px-6 h-11 rounded-xl bg-[#1b3a2d] hover:bg-[#153024] text-white">
                      OK
                    </Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </>
        )}
      </div>
    </div>
  );
}

function Header() {
  return (
    <div className="pb-14 pt-6 px-4" style={{ backgroundColor: "#1A5C2A" }}>
      <div className="mx-auto max-w-4xl flex flex-col items-center text-center gap-3">
        <img
          src={schoolLogo}
          alt="Wisdom World School Logo"
          className="h-16 w-16 rounded-full object-cover"
        />
        <div>
          <h1 className="text-3xl font-bold text-white">Club Registration</h1>
          <p className="text-lg text-white">Wisdom World School - Kurukshetra</p>
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
