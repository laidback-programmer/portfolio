"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FileText } from "lucide-react";

// Replace each href with the real path/URL to that resume (PDF, Overleaf export link, etc.)
const resumes = [
  { role: "Full-Stack", href: "/resumes/full-stack-resume.pdf" },
  { role: "AI Engineer", href: "/resumes/ai-engineer-resume.pdf" },
  { role: "UI/UX Design", href: "/resumes/uiux-resume.pdf" },
] as const;

export function ResumePicker() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger render={<Button className="gap-2" />}>
        <FileText className="h-4 w-4" />
        View resume
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-48">
        {resumes.map((resume) => (
          <DropdownMenuItem
            key={resume.role}
            render={
              <a href={resume.href} target="_blank" rel="noopener noreferrer" />
            }
          >
            {resume.role}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
