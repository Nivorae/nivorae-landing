import { Routes, Route } from "react-router-dom";
import { LandingPage } from "./features/landing/LandingPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
    </Routes>
  );
}

export default App;
