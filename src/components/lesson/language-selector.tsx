"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Globe } from "lucide-react";

const languages = [
  { value: "en", label: "English" },
  { value: "fr", label: "French" },
  { value: "sw", label: "Swahili" },
  { value: "zu", label: "Zulu" },
  { value: "ar", label: "Arabic" },
  { value: "pt", label: "Portuguese" },
];

export default function LanguageSelector() {
  const { toast } = useToast();

  const handleLanguageChange = (value: string) => {
    if (value === "en") return;
    const language = languages.find((l) => l.value === value)?.label;
    toast({
      title: "Translation Simulation",
      description: `Content would be translated to ${language}. This is a UI demonstration.`,
    });
  };

  return (
    <Select defaultValue="en" onValueChange={handleLanguageChange}>
      <SelectTrigger className="w-auto gap-2 border-0 bg-transparent shadow-none focus:ring-0">
        <Globe className="h-4 w-4" />
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {languages.map((lang) => (
          <SelectItem key={lang.value} value={lang.value}>
            {lang.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
