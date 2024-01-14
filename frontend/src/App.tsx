import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home/home";
import Questionnaire from "./pages/questionnaire/questionnaire";
import References from "./pages/references/references";
import Actions from "./pages/actions/actions";
import Profil from "./pages/profil/profil";
import Sinscrire from "./pages/sinscrire/sinscrire";
import Seconnecter from "./pages/seconnecter/seconnecter";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/questionnaire" element={<Questionnaire />} />
        <Route path="/references" element={<References />} />
        <Route path="/actions" element={<Actions />} />
        <Route path="/signup" element={<Sinscrire/>} />
        <Route path="/login" element={<Seconnecter />} />
        <Route path="/profil" element={<Profil />} />
      </Routes>
    </Router>
  );
}

export default App;
