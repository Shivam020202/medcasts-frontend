// components/Home.tsx
import React, { useState } from 'react';
import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import SearchBar from '../components/SearchBar';
import TopSpecialties from '../components/TopSpecialties';
import PopularProcedures from '../components/PopularProcedures';
import PopularDoctors from '../components/PopularDoctors';
import WhyChooseUs from '../components/WhyChooseUs';
import PatientReviews from '../components/PatientReviews';
import TrustSection from '../components/TrustSection';
import Footer from '../components/Footer';
import HospitalCategories from '../components/HospitalCategories';
import MedicalHeroSection from '../components/MedicalHeroSection';
import { Separator } from '../components/ui/separator';

const Home: React.FC = () => {
  // State management for the home page
  const [activeDoctorTab, setActiveDoctorTab] = useState('Plastic Surgery');
  const [activeReviewFilter, setActiveReviewFilter] = useState('All');
  const [currentHospitalSlide, setCurrentHospitalSlide] = useState(0);
  const [currentCategorySlide, setCurrentCategorySlide] = useState(0);

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <HeroSection selectedCountry={''} setSelectedCountry={function (country: string): void {
        throw new Error('Function not implemented.');
      } } selectedTreatment={''} setSelectedTreatment={function (treatment: string): void {
        throw new Error('Function not implemented.');
      } } />

      {/* Search Bar Section */}
      {/* <div className="w-full relative flex justify-center items-center py-8">
        <div className='absolute top-1/2  left-0 right-0 z-0 bg-gray-300/40 h-0.5 -translate-y-1/2'></div>
        <div className='z-10 relative'><SearchBar /></div>
      </div>
       */}
      <TopSpecialties />

      <PopularProcedures />

      <MedicalHeroSection></MedicalHeroSection>
      <HospitalCategories
        currentCategorySlide={currentCategorySlide}
        setCurrentCategorySlide={setCurrentCategorySlide} />

      <PopularDoctors />

      <PatientReviews />

      <Footer />
    </div>);

};

export default Home;