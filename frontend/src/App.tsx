import { Routes, Route } from "react-router-dom";
import { LandingPage } from "./features/landing/LandingPage";
import { TeamPage } from "./features/landing/TeamPage";
import { PlansPage } from "./features/landing/PlansPage";
import { QAPage } from "./features/landing/QAPage";
import { NotFoundPage } from "./features/landing/NotFoundPage";
import { PrivacyPage } from "./features/landing/PrivacyPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/team" element={<TeamPage />} />
      <Route path="/plans" element={<PlansPage />} />
      <Route path="/qa" element={<QAPage />} />
      <Route path="/privacy" element={<PrivacyPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
