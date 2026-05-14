import { useState } from "react";
import { type Lang } from "./i18n";
import { Header } from "./components/Header";

export function QAPage() {
  const [lang, setLang] = useState<Lang>("zh");

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header lang={lang} onLangChange={setLang} />
    </div>
  );
}
