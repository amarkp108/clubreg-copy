import { createFileRoute } from "@tanstack/react-router";
import { ClubSelectionForm } from "@/components/ClubSelectionForm";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Wisdom World School - Club Registration 2026-27" },
      { name: "description", content: "Select your preferred domain and club for the 2026-27 session at Wisdom World School." },
    ],
  }),
});

function Index() {
  return <ClubSelectionForm />;
}
