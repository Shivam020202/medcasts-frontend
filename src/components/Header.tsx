// components/Header.tsx
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Phone, ChevronDown, Menu, X } from "lucide-react";

interface Hospital {
  id: number;
  name: string;
  slug: string;
}

interface Treatment {
  id: number;
  name: string;
  slug: string;
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://medcasts-backend.onrender.com/api";

const Header: React.FC = () => {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isHospitalDropdownOpen, setIsHospitalDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileTreatmentOpen, setIsMobileTreatmentOpen] = useState(false);
  const [isMobileHospitalOpen, setIsMobileHospitalOpen] = useState(false);

  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [treatments, setTreatments] = useState<Treatment[]>([]);

  const treatmentDropdownRef = useRef<HTMLDivElement>(null);
  const hospitalDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const hospitalsRes = await fetch(`${API_BASE_URL}/hospitals?limit=20`);
        const hospitalsData = await hospitalsRes.json();
        if (hospitalsData.success) {
          setHospitals(hospitalsData.data.hospitals);
        }

        const treatmentsRes = await fetch(
          `${API_BASE_URL}/treatments?isActive=true&limit=50`
        );
        const treatmentsData = await treatmentsRes.json();
        if (treatmentsData.success) {
          setTreatments(treatmentsData.data.treatments);
        }
      } catch (error) {
        console.error("Error fetching menu data:", error);
      }
    };

    fetchData();
  }, []); // Empty dependency array - only fetch once on mount

  const handleTreatmentClick = (path: string) => {
    navigate(path);
    setIsDropdownOpen(false);
    setIsMobileMenuOpen(false);
    setIsMobileTreatmentOpen(false);
  };

  const handleHospitalClick = (_path: string) => {
    // navigate(path); // Pages not created yet
    setIsHospitalDropdownOpen(false);
    setIsMobileMenuOpen(false);
    setIsMobileHospitalOpen(false);
  };

  const handleLogoClick = () => {
    navigate("/");
    setIsMobileMenuOpen(false);
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate("/");
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    }
    setIsMobileMenuOpen(false);
  };

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    setIsMobileTreatmentOpen(false);
    setIsMobileHospitalOpen(false);
  };

  const handleMobileTreatmentToggle = () => {
    setIsMobileTreatmentOpen(!isMobileTreatmentOpen);
    setIsMobileHospitalOpen(false); // Close hospital when opening treatment
  };

  const handleMobileHospitalToggle = () => {
    setIsMobileHospitalOpen(!isMobileHospitalOpen);
    setIsMobileTreatmentOpen(false); // Close treatment when opening hospital
  };

  const handleTreatmentDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
    setIsHospitalDropdownOpen(false); // Close hospital dropdown
  };

  const handleHospitalDropdownToggle = () => {
    setIsHospitalDropdownOpen(!isHospitalDropdownOpen);
    setIsDropdownOpen(false); // Close treatment dropdown
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;

      if (
        treatmentDropdownRef.current &&
        !treatmentDropdownRef.current.contains(target)
      ) {
        setIsDropdownOpen(false);
      }

      if (
        hospitalDropdownRef.current &&
        !hospitalDropdownRef.current.contains(target)
      ) {
        setIsHospitalDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 py-1">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <div
              className="flex items-center cursor-pointer"
              onClick={handleLogoClick}
            >
              <img
                src="/images/logo.png"
                alt="Medcasts Logo"
                className="h-14"
              />
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-6 items-center">
              <button
                onClick={() => scrollToSection("doctors")}
                className="text-gray-700 hover:text-teal-600 transition-colors font-medium"
              >
                Best Doctors
              </button>

              {/* Hospitals Dropdown */}
              <div className="relative" ref={hospitalDropdownRef}>
                <button
                  onClick={handleHospitalDropdownToggle}
                  className="flex items-center space-x-1 text-gray-700 hover:text-teal-600 transition-colors font-medium"
                >
                  <span>Best Hospitals</span>
                  <ChevronDown
                    size={16}
                    className={`transform transition-transform ${
                      isHospitalDropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isHospitalDropdownOpen && (
                  <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-xl shadow-xl border-2 border-gray-100 py-2 z-50 max-h-96 overflow-y-auto">
                    {hospitals.length > 0 ? (
                      hospitals.map((hospital) => (
                        <button
                          key={hospital.id}
                          onClick={() =>
                            handleHospitalClick(`/hospital/${hospital.slug}`)
                          }
                          className="block w-full text-left px-4 py-2.5 text-gray-700 hover:bg-teal-50 hover:text-teal-700 transition-colors truncate"
                        >
                          {hospital.name}
                        </button>
                      ))
                    ) : (
                      <div className="px-4 py-2 text-gray-500 text-sm">
                        No hospitals found
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Treatments Dropdown */}
              <div className="relative" ref={treatmentDropdownRef}>
                <button
                  onClick={handleTreatmentDropdownToggle}
                  className="flex items-center space-x-1 text-gray-700 hover:text-teal-600 transition-colors font-medium"
                >
                  <span>Treatments</span>
                  <ChevronDown
                    size={16}
                    className={`transform transition-transform ${
                      isDropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isDropdownOpen && (
                  <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-xl shadow-xl border-2 border-gray-100 py-2 z-50 max-h-96 overflow-y-auto">
                    {treatments.length > 0 ? (
                      treatments.map((treatment) => (
                        <button
                          key={treatment.id}
                          onClick={() =>
                            handleTreatmentClick(`/treatment/${treatment.slug}`)
                          }
                          className="block w-full text-left px-4 py-2.5 text-gray-700 hover:bg-teal-50 hover:text-teal-700 transition-colors truncate"
                        >
                          {treatment.name}
                        </button>
                      ))
                    ) : (
                      <div className="px-4 py-2 text-gray-500 text-sm">
                        No treatments found
                      </div>
                    )}
                  </div>
                )}
              </div>

              <button
                onClick={() => navigate("/contact")}
                className="text-gray-700 hover:text-teal-600 transition-colors font-medium"
              >
                Contact Us
              </button>
            </nav>
          </div>

          <div className="flex items-center space-x-3">
            {/* Phone Button */}
            <a
              href="tel:+919643452714"
              className="hidden lg:flex items-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors group border border-gray-200"
            >
              <Phone size={18} className="text-teal-600" />
              <span className="font-semibold text-gray-700">
                +91 964 345 2714
              </span>
            </a>

            {/* Request Call Button */}
            <button
              onClick={() => navigate("/contact")}
              className="hidden md:flex items-center bg-gradient-to-r from-teal-500 to-emerald-500 text-white px-6 py-2.5 rounded-lg hover:from-teal-600 hover:to-emerald-600 transition-all font-semibold shadow-md hover:shadow-lg transform hover:scale-105"
            >
              Request a Call
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={handleMobileMenuToggle}
              className="md:hidden p-2 text-gray-700 hover:text-teal-600 transition-colors rounded-lg hover:bg-gray-100"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-gray-200 animate-in slide-in-from-top-2 duration-200">
            <nav className="flex flex-col space-y-1 mt-4">
              <button
                onClick={() => scrollToSection("doctors")}
                className="w-full text-left px-4 py-3 text-gray-700 hover:text-teal-600 hover:bg-teal-50 transition-colors font-medium rounded-lg"
              >
                Best Doctors
              </button>

              {/* Mobile Hospitals Section */}
              <div>
                <button
                  onClick={handleMobileHospitalToggle}
                  className="w-full flex items-center justify-between px-4 py-3 text-gray-700 hover:text-teal-600 hover:bg-teal-50 transition-colors font-medium rounded-lg"
                >
                  <span>Best Hospitals</span>
                  <ChevronDown
                    size={16}
                    className={`transform transition-transform ${
                      isMobileHospitalOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isMobileHospitalOpen && (
                  <div className="ml-4 mt-1 space-y-1 max-h-60 overflow-y-auto">
                    {hospitals.length > 0 ? (
                      hospitals.map((hospital) => (
                        <button
                          key={hospital.id}
                          onClick={() =>
                            handleHospitalClick(`/hospital/${hospital.slug}`)
                          }
                          className="block w-full text-left px-4 py-2 text-gray-600 hover:text-teal-600 hover:bg-teal-50 transition-colors rounded-lg truncate"
                        >
                          {hospital.name}
                        </button>
                      ))
                    ) : (
                      <div className="px-4 py-2 text-gray-500 text-sm">
                        No hospitals found
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Mobile Treatments Section */}
              <div>
                <button
                  onClick={handleMobileTreatmentToggle}
                  className="w-full flex items-center justify-between px-4 py-3 text-gray-700 hover:text-teal-600 hover:bg-teal-50 transition-colors font-medium rounded-lg"
                >
                  <span>Treatments</span>
                  <ChevronDown
                    size={16}
                    className={`transform transition-transform ${
                      isMobileTreatmentOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isMobileTreatmentOpen && (
                  <div className="ml-4 mt-1 space-y-1 max-h-60 overflow-y-auto">
                    {treatments.length > 0 ? (
                      treatments.map((treatment) => (
                        <button
                          key={treatment.id}
                          onClick={() =>
                            handleTreatmentClick(`/treatment/${treatment.slug}`)
                          }
                          className="block w-full text-left px-4 py-2 text-gray-600 hover:text-teal-600 hover:bg-teal-50 transition-colors rounded-lg truncate"
                        >
                          {treatment.name}
                        </button>
                      ))
                    ) : (
                      <div className="px-4 py-2 text-gray-500 text-sm">
                        No treatments found
                      </div>
                    )}
                  </div>
                )}
              </div>

              <button
                onClick={() => navigate("/contact")}
                className="w-full text-left px-4 py-3 text-gray-700 hover:text-teal-600 hover:bg-teal-50 transition-colors font-medium rounded-lg"
              >
                Contact Us
              </button>

              {/* Mobile Contact Info */}
              <div className="px-4 py-3 border-t border-gray-200 mt-4 space-y-3">
                <a
                  href="tel:+919643452714"
                  className="flex items-center space-x-2 text-gray-700 hover:text-teal-600 transition-colors"
                >
                  <Phone size={18} className="text-teal-600" />
                  <span className="font-semibold">+91 964 345 2714</span>
                </a>
                <button
                  onClick={() => navigate("/contact")}
                  className="w-full bg-gradient-to-r from-teal-500 to-emerald-500 text-white px-6 py-3 rounded-lg hover:from-teal-600 hover:to-emerald-600 transition-all font-semibold shadow-md"
                >
                  Request a Call
                </button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
