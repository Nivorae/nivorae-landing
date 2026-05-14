import { Routes, Route } from "react-router-dom";
import { LandingPage } from "./features/landing/LandingPage";
import { TeamPage } from "./features/landing/TeamPage";
import { PlansPage } from "./features/landing/PlansPage";
import { QAPage } from "./features/landing/QAPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/team" element={<TeamPage />} />
      <Route path="/plans" element={<PlansPage />} />
      <Route path="/qa" element={<QAPage />} />
    </Routes>
  );
}

export default App;
