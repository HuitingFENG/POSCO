import React from "react";
import { Navigate, BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home/home";
import Questionnaire from "./pages/questionnaire/questionnaire";
import References from "./pages/references/references";
import Actions from "./pages/actions/actions";
import Profil from "./pages/profil/profil";
import Sinscrire from "./pages/sinscrire/sinscrire";
import Seconnecter from "./pages/seconnecter/seconnecter";
import { UserProvider, useUser } from './context/UserContext';
import AuthenticatedRoutes from './authenticate'; // This is the new component
  /* 

function App() {
// const { user } = useUser();
  const userContext = useUser();

  if (!userContext) {
    // Handle the case when context is not available
    return <div>Loading...</div>; // or some other fallback UI
  }

  const { user } = userContext;

  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/questionnaire" element={<Questionnaire />} />
          <Route path="/references" element={<References />} />
          <Route path="/actions" element={<Actions />} />
           <Route path="/signup" element={<Sinscrire/>} />
          <Route path="/login" element={<Seconnecter />} />
          <Route path="/profil" element={<Profil />} /> }
           <Route path="/profil" element={user ? <Profil /> : <Navigate to="/login" />} />
          <Route path="/signup" element={user ? <Navigate to="/profil" /> : <Sinscrire />} />
          <Route path="/login" element={user ? <Navigate to="/profil" /> : <Seconnecter />} />
        </Routes>
      </Router>
    </UserProvider>
      
  ); 

}

*/

function App() {
  return (
    <UserProvider>
      <Router>
        <AuthenticatedRoutes />
      </Router>
    </UserProvider>
  );
}



export default App;
