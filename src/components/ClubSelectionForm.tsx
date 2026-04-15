import { useState } from "react";
import { domains, type Domain, type Club } from "@/lib/clubData";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Search, User, GraduationCap, BookOpen, CheckCircle2, Loader2, School } from "lucide-react";

interface StudentData {
  name: string;
  class: string;
  section: string;
  admissionNo: string;
  fatherName: string;
  photo?: string;
}

// Mock ERP fetch — replace with real API call
async function fetchStudentFromERP(admissionNo: string): Promise<StudentData | null> {
  await new Promise((r) => setTimeout(r, 1200));
  if (!admissionNo.trim()) return null;
  // Simulated response
  return {
    admissionNo: admissionNo.trim(),
    name: "Aryan Sharma",
    class: "IX",
    section: "A",
    fatherName: "Mr. Rajesh Sharma",
  };
}

export function ClubSelectionForm() {
  const [admissionNo, setAdmissionNo] = useState("");
  const [student, setStudent] = useState<StudentData | null>(null);
  const [loading, setLoading] = useState(false);
  const [fetchError, setFetchError] = useState("");
  const [selectedDomain, setSelectedDomain] = useState<Domain | null>(null);
  const [selectedClub, setSelectedClub] = useState<Club | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSearch = async () => {
    if (!admissionNo.trim()) return;
    setLoading(true);
    setFetchError("");
    setStudent(null);
    setSelectedDomain(null);
    setSelectedClub(null);
    try {
      const data = await fetchStudentFromERP(admissionNo);
      if (data) {
        setStudent(data);
      } else {
        setFetchError("No student found with this Admission Number.");
      }
    } catch {
      setFetchError("Failed to fetch student details. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDomainSelect = (domain: Domain) => {
    setSelectedDomain(domain);
    setSelectedClub(null);
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };

  const handleReset = () => {
    setAdmissionNo("");
    setStudent(null);
    setSelectedDomain(null);
    setSelectedClub(null);
    setSubmitted(false);
    setFetchError("");
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
              <InfoRow label="Admission No" value={student?.admissionNo || ""} />
              <InfoRow label="Name" value={student?.name || ""} />
              <InfoRow label="Class" value={`${student?.class} - ${student?.section}`} />
              <InfoRow label="Father's Name" value={student?.fatherName || ""} />
              <div className="border-t border-[#e5e7eb] my-2" />
              <InfoRow label="Domain" value={selectedDomain?.name || ""} />
              <InfoRow label="Club" value={selectedClub?.name || ""} />
              <InfoRow label="Incharge" value={selectedClub?.incharge || ""} />
            </div>
            <Button
              onClick={handleReset}
              className="mt-6 bg-[#1b3a2d] hover:bg-[#153024] text-white px-8"
            >
              Register Another Student
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f0f2f5]">
      <Header />

      {/* Search Bar */}
      <div className="mx-auto max-w-4xl px-4 -mt-8 relative z-10">
        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <Search className="h-5 w-5 text-[#c8a951]" />
            <h2 className="text-sm font-bold uppercase tracking-wide text-[#1b3a2d]">
              Search Student
            </h2>
          </div>
          <div className="flex gap-3">
            <Input
              placeholder="Enter Admission Number / Student ID"
              value={admissionNo}
              onChange={(e) => setAdmissionNo(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              className="h-12 rounded-xl border-[#e5e7eb] bg-[#f8faf9] text-sm placeholder:text-[#9ca3af]"
            />
            <Button
              onClick={handleSearch}
              disabled={loading || !admissionNo.trim()}
              className="h-12 px-6 rounded-xl bg-[#1b3a2d] hover:bg-[#153024] text-white shrink-0"
            >
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Search"}
            </Button>
          </div>
          {fetchError && (
            <p className="mt-3 text-sm text-red-500">{fetchError}</p>
          )}
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-4 py-8">
        <div className="flex gap-6 flex-col lg:flex-row">
          {/* Main Form Area */}
          <div className="flex-1 space-y-6">
            {/* Progress Bar */}
            {student && (
              <div className="h-1.5 rounded-full overflow-hidden bg-[#e5e7eb]">
                <div
                  className="h-full rounded-full transition-all duration-500 bg-gradient-to-r from-[#c8a951] to-[#e0c86e]"
                  style={{
                    width: selectedClub ? "100%" : selectedDomain ? "66%" : "33%",
                  }}
                />
              </div>
            )}

            {/* Student Details Card */}
            {student && (
              <div className="rounded-2xl bg-white p-6 shadow-sm">
                <div className="flex items-center gap-3 mb-5">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#f0f2f5]">
                    <GraduationCap className="h-5 w-5 text-[#1b3a2d]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#1b3a2d]">Student Details</h3>
                    <p className="text-xs text-[#6b7280]">Auto-fetched from school ERP system</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <FieldDisplay label="Student Name" value={student.name} />
                  <FieldDisplay label="Admission No" value={student.admissionNo} />
                  <FieldDisplay label="Class / Section" value={`${student.class} - ${student.section}`} />
                  <FieldDisplay label="Father's Name" value={student.fatherName} />
                </div>
              </div>
            )}

            {/* Domain Selection */}
            {student && (
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
            )}

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

            {/* Empty state */}
            {!student && !loading && (
              <div className="rounded-2xl bg-white p-12 shadow-sm text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#f0f2f5]">
                  <Search className="h-7 w-7 text-[#9ca3af]" />
                </div>
                <h3 className="font-semibold text-[#1b3a2d]">Search for a Student</h3>
                <p className="mt-1 text-sm text-[#6b7280]">
                  Enter the Admission Number above to auto-fetch student details from the ERP system.
                </p>
              </div>
            )}

            {loading && (
              <div className="rounded-2xl bg-white p-12 shadow-sm text-center">
                <Loader2 className="h-8 w-8 animate-spin text-[#1b3a2d] mx-auto mb-3" />
                <p className="text-sm text-[#6b7280]">Fetching student details from ERP...</p>
              </div>
            )}
          </div>

          {/* Sidebar — Student Profile Card */}
          <div className="w-full lg:w-72 shrink-0">
            <div className="rounded-2xl bg-white p-6 shadow-sm text-center sticky top-8">
              <div className="mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-[#f0f2f5] border-2 border-dashed border-[#d1d5db]">
                <User className="h-10 w-10 text-[#9ca3af]" />
              </div>
              {student ? (
                <>
                  <h4 className="font-bold text-[#1b3a2d]">{student.name}</h4>
                  <p className="text-xs text-[#6b7280] mt-1">Class {student.class} - {student.section}</p>
                  <p className="text-xs text-[#6b7280]">Adm: {student.admissionNo}</p>
                  {selectedDomain && (
                    <div className="mt-4 pt-4 border-t border-[#e5e7eb] text-left space-y-2">
                      <MiniInfo label="Domain" value={selectedDomain.name} />
                      {selectedClub && <MiniInfo label="Club" value={selectedClub.name} />}
                    </div>
                  )}
                </>
              ) : (
                <>
                  <h4 className="font-semibold text-[#6b7280]">No Student Selected</h4>
                  <p className="text-xs text-[#9ca3af] mt-1">
                    Search and select a student to view their details here.
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Header() {
  return (
    <div className="bg-[#1b3a2d] pb-14 pt-6 px-4">
      <div className="mx-auto max-w-4xl flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/10 border border-white/20">
            <GraduationCap className="h-7 w-7 text-[#c8a951]" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">
              Club Registration <span className="font-normal text-white/60">/ Preferences</span>
            </h1>
            <p className="text-sm text-[#c8a951]">Wisdom World School - Kurukshetra</p>
            <p className="text-xs text-white/40">Session 2026-27</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function FieldDisplay({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs font-bold uppercase tracking-wide text-[#6b7280] mb-1">{label}</p>
      <div className="rounded-lg bg-[#f8faf9] border border-[#e5e7eb] px-3 py-2.5 text-sm text-[#1b3a2d] font-medium">
        {value}
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

function MiniInfo({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[10px] uppercase tracking-wide text-[#9ca3af]">{label}</p>
      <p className="text-xs font-semibold text-[#1b3a2d]">{value}</p>
    </div>
  );
}
