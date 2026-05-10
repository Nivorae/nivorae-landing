import { Routes, Route } from "react-router-dom";
import { LandingPage } from "./features/landing/LandingPage";
import { TeamPage } from "./features/landing/TeamPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/team" element={<TeamPage />} />
    </Routes>
  );
}

export default App;
