// AuthenticatedRoutes.js
import React from 'react';
import { Navigate, Routes, Route } from 'react-router-dom';
import { useUser } from './context/UserContext'; // Adjust the import path as needed

import Home from "./pages/home/home";
import Questionnaire from "./pages/questionnaire/questionnaire";
import References from "./pages/references/references";
import Actions from "./pages/actions/actions";
import Profil from "./pages/profil/profil";
import Sinscrire from "./pages/sinscrire/sinscrire";
import Seconnecter from "./pages/seconnecter/seconnecter";

const AuthenticatedRoutes = () => {
    const userContext = useUser();
    console.log("User context value:", userContext);


    if (!userContext) {
        // Handle the case when context is not available
        return <div>Loading...</div>;
    }

    const { user } = userContext;

    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/questionnaire" element={<Questionnaire />} />
            <Route path="/references" element={<References />} />
            <Route path="/actions" element={<Actions />} />
            <Route path="/profil" element={user ? <Profil /> : <Navigate to="/login" />} />
            <Route path="/signup" element={user ? <Navigate to="/profil" /> : <Sinscrire />} />
            <Route path="/login" element={user ? <Navigate to="/profil" /> : <Seconnecter />} />
            {/* <Route path="/login" element={user ? <Profil /> : <Seconnecter />} /> */}
        </Routes>
    );
};

export default AuthenticatedRoutes;
