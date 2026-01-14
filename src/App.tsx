import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./static/Home";
import ContactUs from "./static/ContactUs";
import HelpCenter from "./static/HelpCenter";
import SafetyGuidelines from "./static/SafetyGuidelines";
import PrivacyPolicy from "./static/PrivacyPolicy";
import ThankYou from "./static/ThankYou";
import OrthopaedicTreatments from "./static/OrthopaedicTreatments";
import CardiacServicePage from "./static/CardiacServicePage";
import OncologyServicePage from "./static/OncologyServicePage";
import BMTServicePage from "./static/BMTServicePage";
import NeuroSpineServicePage from "./static/NeuroSpineServicePage";
import GISurgeryServicePage from "./static/GISurgeryServicePage";
import ArtemisOrthoService from "./static/artemis-ortho";
import MedantaOrthoService from "./static/medanta-ortho";
import ApolloOrthoService from "./static/apollo-ortho";
import MaxOrthoService from "./static/max-ortho";
import AmritaOrthoService from "./static/amrita-ortho";
import SarvodayaOrthoService from "./static/sarvodaya-ortho";
import ArtemisOncoService from "./static/artemis-onco";
import MedantaOncoService from "./static/medanta-onco";
import ApolloOncoService from "./static/apollo-onco";
import MaxOncoService from "./static/max-onco";
import AmritaOncoService from "./static/amrita-onco";
import SarvodayaOncoService from "./static/sarvodaya-onco";
import ArtemisCardiacService from "./static/artemis-cardiac";
import MedantaCardiacService from "./static/medanta-cardiac";
import ApolloCardiacService from "./static/apollo-cardiac";
import MaxCardiacService from "./static/max-cardiac";
import AmritaCardiacService from "./static/amrita-cardiac";
import SarvodayaCardiacService from "./static/sarvodaya-cardiac";
import ArtemisBMTService from "./static/artemis-bmt";
import MedantaBMTService from "./static/medanta-bmt";
import ApolloBMTService from "./static/apollo-bmt";
import MaxBMTService from "./static/max-bmt";
import AmritaBMTService from "./static/amrita-bmt";
import SarvodayaBMTService from "./static/sarvodaya-bmt";
import ArtemisGISurgeryService from "./static/artemis-gi-surgery";
import MedantaGISurgeryService from "./static/medanta-gi-surgery";
import ApolloGISurgeryService from "./static/apollo-gi-surgery";
import MaxGISurgeryService from "./static/max-gi-surgery";
import AmritaGISurgeryService from "./static/amrita-gi-surgery";
import SarvodayaGISurgeryService from "./static/sarvodaya-gi-surgery";
import ArtemisNeuroSpineService from "./static/artemis-neurospine";
import MedantaNeuroSpineService from "./static/medanta-neurospine";
import ApolloNeuroSpineService from "./static/apollo-neurospine";
import MaxNeuroSpineService from "./static/max-neurospine";
import AmritaNeuroSpineService from "./static/amrita-neurospine";
import SarvodayaNeuroSpineService from "./static/sarvodaya-neurospine";
import AdminSpecialties from "./pages/AdminSpecialties";
import TreatmentPage from "./pages/TreatmentPage";
import HospitalSpecialtyPage from "./pages/HospitalSpecialtyPage";
import HospitalSpecialtyDirectory from "./pages/HospitalSpecialtyDirectory";
import SpecialtyListingPage from "./pages/SpecialtyListingPage";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/help-center" element={<HelpCenter />} />
        <Route path="/safety-guidelines" element={<SafetyGuidelines />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/thank-you" element={<ThankYou />} />

        {/* Admin Routes */}
        <Route path="/admin/specialties" element={<AdminSpecialties />} />

        {/* Service Pages */}
        <Route path="/orthopaedic" element={<OrthopaedicTreatments />} />
        <Route path="/oncology-service" element={<OncologyServicePage />} />
        <Route path="/cardiac" element={<CardiacServicePage />} />
        <Route path="/bmt" element={<BMTServicePage />} />
        <Route path="/neuro-spine" element={<NeuroSpineServicePage />} />
        <Route path="/gi-surgery" element={<GISurgeryServicePage />} />
        <Route path="/artemis-ortho" element={<ArtemisOrthoService />} />
        <Route path="/medanta-ortho" element={<MedantaOrthoService />} />
        <Route path="/apollo-ortho" element={<ApolloOrthoService />} />
        <Route path="/max-ortho" element={<MaxOrthoService />} />
        <Route path="/amrita-ortho" element={<AmritaOrthoService />} />
        <Route path="/sarvodaya-ortho" element={<SarvodayaOrthoService />} />
        <Route path="/artemis-onco" element={<ArtemisOncoService />} />
        <Route path="/medanta-onco" element={<MedantaOncoService />} />
        <Route path="/apollo-onco" element={<ApolloOncoService />} />
        <Route path="/max-onco" element={<MaxOncoService />} />
        <Route path="/amrita-onco" element={<AmritaOncoService />} />
        <Route path="/sarvodaya-onco" element={<SarvodayaOncoService />} />
        <Route path="/artemis-cardiac" element={<ArtemisCardiacService />} />
        <Route path="/medanta-cardiac" element={<MedantaCardiacService />} />
        <Route path="/apollo-cardiac" element={<ApolloCardiacService />} />
        <Route path="/max-cardiac" element={<MaxCardiacService />} />
        <Route path="/amrita-cardiac" element={<AmritaCardiacService />} />
        <Route
          path="/sarvodaya-cardiac"
          element={<SarvodayaCardiacService />}
        />
        <Route path="/artemis-bmt" element={<ArtemisBMTService />} />
        <Route path="/medanta-bmt" element={<MedantaBMTService />} />
        <Route path="/apollo-bmt" element={<ApolloBMTService />} />
        <Route path="/max-bmt" element={<MaxBMTService />} />
        <Route path="/amrita-bmt" element={<AmritaBMTService />} />
        <Route path="/sarvodaya-bmt" element={<SarvodayaBMTService />} />
        <Route
          path="/artemis-gi-surgery"
          element={<ArtemisGISurgeryService />}
        />
        <Route
          path="/medanta-gi-surgery"
          element={<MedantaGISurgeryService />}
        />
        <Route path="/apollo-gi-surgery" element={<ApolloGISurgeryService />} />
        <Route path="/max-gi-surgery" element={<MaxGISurgeryService />} />
        <Route path="/amrita-gi-surgery" element={<AmritaGISurgeryService />} />
        <Route
          path="/sarvodaya-gi-surgery"
          element={<SarvodayaGISurgeryService />}
        />
        <Route
          path="/artemis-neurospine"
          element={<ArtemisNeuroSpineService />}
        />
        <Route
          path="/medanta-neurospine"
          element={<MedantaNeuroSpineService />}
        />
        <Route
          path="/apollo-neurospine"
          element={<ApolloNeuroSpineService />}
        />
        <Route path="/max-neurospine" element={<MaxNeuroSpineService />} />
        <Route
          path="/amrita-neurospine"
          element={<AmritaNeuroSpineService />}
        />
        <Route
          path="/sarvodaya-neurospine"
          element={<SarvodayaNeuroSpineService />}
        />

        {/* Dynamic Pages - Must be last to avoid route conflicts */}
        <Route path="/treatment/:slug" element={<TreatmentPage />} />
        <Route path="/specialty/:slug" element={<SpecialtyListingPage />} />
        <Route
          path="/hospital-directory"
          element={<HospitalSpecialtyDirectory />}
        />
        <Route
          path="/hospital/:hospitalSlug/:specialtySlug"
          element={<HospitalSpecialtyPage />}
        />
      </Routes>
    </Router>
  );
};

export default App;
