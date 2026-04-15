import { useState } from "react";
import { domains, type Domain, type Club } from "@/lib/clubData";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

const classOptions = ["VI", "VII", "VIII", "IX", "X", "XI", "XII"];

export function ClubSelectionForm() {
  const [step, setStep] = useState(1);
  const [studentName, setStudentName] = useState("");
  const [studentClass, setStudentClass] = useState("");
  const [section, setSection] = useState("");
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

  const canProceedStep1 = studentName.trim() && studentClass && section.trim();
  const canProceedStep2 = selectedDomain !== null;
  const canSubmit = selectedClub !== null;

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <Card className="w-full max-w-lg text-center">
          <CardHeader>
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
              <svg className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <CardTitle className="text-2xl">Registration Successful!</CardTitle>
            <CardDescription>Your club preference has been recorded.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div className="rounded-lg bg-muted p-4 text-left space-y-2">
              <p><span className="font-medium text-muted-foreground">Name:</span> {studentName}</p>
              <p><span className="font-medium text-muted-foreground">Class:</span> {studentClass} - {section}</p>
              <p><span className="font-medium text-muted-foreground">Domain:</span> {selectedDomain?.name}</p>
              <p><span className="font-medium text-muted-foreground">Club:</span> {selectedClub?.name}</p>
              <p><span className="font-medium text-muted-foreground">Incharge:</span> {selectedClub?.incharge}</p>
            </div>
            <Button
              className="mt-4 w-full"
              onClick={() => {
                setStep(1);
                setStudentName("");
                setStudentClass("");
                setSection("");
                setSelectedDomain(null);
                setSelectedClub(null);
                setSubmitted(false);
              }}
            >
              Register Another Student
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card">
        <div className="mx-auto max-w-3xl px-4 py-6">
          <h1 className="text-2xl font-bold text-foreground">Wisdom World School</h1>
          <p className="mt-1 text-sm text-muted-foreground">Club Registration 2026-27</p>
        </div>
      </div>

      {/* Progress */}
      <div className="mx-auto max-w-3xl px-4 pt-6">
        <div className="flex items-center gap-2 mb-8">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center gap-2 flex-1">
              <div
                className={cn(
                  "flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-medium transition-colors",
                  step >= s
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground"
                )}
              >
                {s}
              </div>
              <span className={cn("text-sm hidden sm:inline", step >= s ? "text-foreground font-medium" : "text-muted-foreground")}>
                {s === 1 ? "Student Info" : s === 2 ? "Select Domain" : "Select Club"}
              </span>
              {s < 3 && <div className={cn("h-px flex-1", step > s ? "bg-primary" : "bg-border")} />}
            </div>
          ))}
        </div>
      </div>

      {/* Form Content */}
      <div className="mx-auto max-w-3xl px-4 pb-12">
        {step === 1 && (
          <Card>
            <CardHeader>
              <CardTitle>Student Information</CardTitle>
              <CardDescription>Please enter your details to get started.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  placeholder="Enter your full name"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Class</Label>
                  <Select value={studentClass} onValueChange={setStudentClass}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select class" />
                    </SelectTrigger>
                    <SelectContent>
                      {classOptions.map((c) => (
                        <SelectItem key={c} value={c}>{c}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="section">Section</Label>
                  <Input
                    id="section"
                    placeholder="e.g. A, B, C"
                    value={section}
                    onChange={(e) => setSection(e.target.value)}
                    maxLength={2}
                  />
                </div>
              </div>
              <div className="flex justify-end pt-4">
                <Button disabled={!canProceedStep1} onClick={() => setStep(2)}>
                  Next →
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {step === 2 && (
          <Card>
            <CardHeader>
              <CardTitle>Choose Your Domain</CardTitle>
              <CardDescription>Select the domain you're interested in.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3 sm:grid-cols-2">
                {domains.map((domain) => (
                  <button
                    key={domain.id}
                    onClick={() => handleDomainSelect(domain)}
                    className={cn(
                      "flex flex-col items-start rounded-lg border p-4 text-left transition-all hover:shadow-md",
                      selectedDomain?.id === domain.id
                        ? "border-primary bg-primary/5 ring-2 ring-primary"
                        : "border-border hover:border-primary/50"
                    )}
                  >
                    <span className="font-semibold text-foreground">{domain.name}</span>
                    <span className="mt-1 text-xs text-muted-foreground">
                      {domain.clubs.length} club{domain.clubs.length > 1 ? "s" : ""} available
                    </span>
                  </button>
                ))}
              </div>
              <div className="flex justify-between pt-6">
                <Button variant="outline" onClick={() => setStep(1)}>← Back</Button>
                <Button disabled={!canProceedStep2} onClick={() => setStep(3)}>Next →</Button>
              </div>
            </CardContent>
          </Card>
        )}

        {step === 3 && selectedDomain && (
          <Card>
            <CardHeader>
              <CardTitle>Choose Your Club</CardTitle>
              <CardDescription>
                Select a club from <Badge variant="secondary">{selectedDomain.name}</Badge>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3">
                {selectedDomain.clubs.map((club) => (
                  <button
                    key={club.name}
                    onClick={() => setSelectedClub(club)}
                    className={cn(
                      "flex items-center justify-between rounded-lg border p-4 text-left transition-all hover:shadow-md",
                      selectedClub?.name === club.name
                        ? "border-primary bg-primary/5 ring-2 ring-primary"
                        : "border-border hover:border-primary/50"
                    )}
                  >
                    <div>
                      <span className="font-semibold text-foreground">{club.name}</span>
                      <p className="mt-0.5 text-xs text-muted-foreground">Incharge: {club.incharge}</p>
                    </div>
                    {selectedClub?.name === club.name && (
                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary">
                        <svg className="h-4 w-4 text-primary-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    )}
                  </button>
                ))}
              </div>
              <div className="flex justify-between pt-6">
                <Button variant="outline" onClick={() => setStep(2)}>← Back</Button>
                <Button disabled={!canSubmit} onClick={handleSubmit}>Submit Registration</Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
