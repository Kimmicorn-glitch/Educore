
"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTranslation } from "@/context/translation-context";
import { Globe } from "lucide-react";
import { useEffect, useState } from "react";

const languages = [
  { value: "English", label: "English" },
  { value: "French", label: "French" },
  { value: "Swahili", label: "Swahili" },
  { value: "Zulu", label: "Zulu" },
  { value: "Arabic", label: "Arabic" },
  { value: "Portuguese", label: "Portuguese" },
];

export default function LanguageSelector() {
  const { setLanguage, language } = useTranslation();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <Select defaultValue={language} onValueChange={setLanguage}>
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
