// components/SearchBar.tsx
import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Stethoscope, MapPin, Search, ChevronDown, X } from "lucide-react";
import { countries } from "../data/constants";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://medcasts-backend.onrender.com/api";

interface Specialty {
  id: number;
  name: string;
  slug: string;
  description?: string;
}

const SearchBar: React.FC = () => {
  const navigate = useNavigate();
  const [selectedTreatment, setSelectedTreatment] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [treatmentSearch, setTreatmentSearch] = useState("");
  const [countrySearch, setCountrySearch] = useState("");
  const [showTreatmentDropdown, setShowTreatmentDropdown] = useState(false);
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const [specialties, setSpecialties] = useState<Specialty[]>([]);
  const [loading, setLoading] = useState(false);

  const treatmentRef = useRef<HTMLDivElement>(null);
  const countryRef = useRef<HTMLDivElement>(null);

  // Fetch specialties from API
  useEffect(() => {
    const fetchSpecialties = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `${API_BASE_URL}/specialties?isActive=true`
        );
        const result = await response.json();

        if (result.success && result.data?.specialties) {
          setSpecialties(result.data.specialties);
        }
      } catch (error) {
        console.error("Error fetching specialties:", error);
        // Fallback to hardcoded list if API fails
        setSpecialties([
          { id: 1, name: "Cardiac Surgery", slug: "cardiac-surgery" },
          { id: 2, name: "Neurology", slug: "neurology" },
          { id: 3, name: "Oncology", slug: "oncology" },
          { id: 4, name: "Orthopedics", slug: "orthopedics" },
          { id: 5, name: "BMT", slug: "bmt" },
          { id: 6, name: "GI Surgery", slug: "gi-surgery" },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchSpecialties();
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        treatmentRef.current &&
        !treatmentRef.current.contains(event.target as Node)
      ) {
        setShowTreatmentDropdown(false);
      }
      if (
        countryRef.current &&
        !countryRef.current.contains(event.target as Node)
      ) {
        setShowCountryDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredTreatments = specialties.filter((specialty) =>
    specialty.name.toLowerCase().includes(treatmentSearch.toLowerCase())
  );

  const filteredCountries = countries.filter((country) =>
    country.toLowerCase().includes(countrySearch.toLowerCase())
  );

  const handleTreatmentSelect = (specialty: Specialty) => {
    setSelectedTreatment(specialty.name);
    setTreatmentSearch(specialty.name);
    setShowTreatmentDropdown(false);

    // Auto-navigate to specialty listing page
    setTimeout(() => {
      navigate(`/specialty/${specialty.slug}`);
    }, 100);
  };

  const handleCountrySelect = (country: string) => {
    setSelectedCountry(country);
    setCountrySearch(country);
    setShowCountryDropdown(false);
  };

  const handleSearch = () => {
    if (selectedTreatment) {
      const specialty = specialties.find((s) => s.name === selectedTreatment);
      if (specialty) {
        navigate(`/specialty/${specialty.slug}`);
      }
    }
  };

  const clearTreatment = () => {
    setSelectedTreatment("");
    setTreatmentSearch("");
  };

  const clearCountry = () => {
    setSelectedCountry("");
    setCountrySearch("");
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4">
      <div className="bg-white rounded-2xl shadow-[1px_1px_15px_15px_rgba(0,0,0,0.1)] shadow-teal-100/30 p-2 border border-teal-200">
        <div className="flex flex-col lg:flex-row gap-2">
          {/* Treatment Dropdown */}
          <div ref={treatmentRef} className="relative flex-1">
            <div className="relative">
              <Stethoscope
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 z-10"
                size={20}
              />
              <input
                type="text"
                value={treatmentSearch}
                onChange={(e) => {
                  setTreatmentSearch(e.target.value);
                  setShowTreatmentDropdown(true);
                }}
                onFocus={() => setShowTreatmentDropdown(true)}
                placeholder="Search treatment or specialty"
                className="w-full pl-12 pr-10 py-3.5 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 transition-all duration-200 text-base bg-gray-50 hover:bg-white"
              />
              {treatmentSearch && (
                <button
                  onClick={clearTreatment}
                  className="absolute right-10 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X size={18} />
                </button>
              )}
              <ChevronDown
                className={`absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 transition-transform duration-200 ${
                  showTreatmentDropdown ? "rotate-180" : ""
                }`}
                size={20}
              />
            </div>

            {/* Treatment Dropdown Menu */}
            {showTreatmentDropdown && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white border-2 border-gray-200 rounded-xl shadow-2xl z-50 max-h-80 overflow-y-auto">
                {loading ? (
                  <div className="px-4 py-8 text-center text-gray-500">
                    <p className="text-sm">Loading specialties...</p>
                  </div>
                ) : filteredTreatments.length > 0 ? (
                  <div className="py-2">
                    {filteredTreatments.map((specialty) => (
                      <button
                        key={specialty.id}
                        onClick={() => handleTreatmentSelect(specialty)}
                        className={`w-full text-left px-4 py-3 hover:bg-emerald-50 transition-colors flex items-center justify-between group ${
                          selectedTreatment === specialty.name
                            ? "bg-emerald-50 text-emerald-700"
                            : "text-gray-700"
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <Stethoscope size={16} className="text-emerald-600" />
                          <span className="font-medium text-emerald-700">
                            {specialty.name}
                          </span>
                        </div>
                        <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                          Available
                        </span>
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="px-4 py-8 text-center text-gray-500">
                    <p className="text-sm">No specialties found</p>
                    <p className="text-xs mt-1">Try a different search term</p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Country Dropdown */}
          <div ref={countryRef} className="relative lg:w-64">
            <div className="relative">
              <MapPin
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 z-10"
                size={20}
              />
              <input
                type="text"
                value={countrySearch}
                onChange={(e) => {
                  setCountrySearch(e.target.value);
                  setShowCountryDropdown(true);
                }}
                onFocus={() => setShowCountryDropdown(true)}
                placeholder="Select country"
                className="w-full pl-12 pr-10 py-3.5 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 transition-all duration-200 text-base bg-gray-50 hover:bg-white"
              />
              {countrySearch && (
                <button
                  onClick={clearCountry}
                  className="absolute right-10 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X size={18} />
                </button>
              )}
              <ChevronDown
                className={`absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 transition-transform duration-200 ${
                  showCountryDropdown ? "rotate-180" : ""
                }`}
                size={20}
              />
            </div>

            {/* Country Dropdown Menu */}
            {showCountryDropdown && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white border-2 border-gray-200 rounded-xl shadow-2xl z-50 max-h-80 overflow-y-auto">
                {filteredCountries.length > 0 ? (
                  <div className="py-2">
                    {filteredCountries.map((country) => (
                      <button
                        key={country}
                        onClick={() => handleCountrySelect(country)}
                        className={`w-full text-left px-4 py-3 hover:bg-emerald-50 transition-colors flex items-center space-x-3 ${
                          selectedCountry === country
                            ? "bg-emerald-50 text-emerald-700"
                            : "text-gray-700"
                        }`}
                      >
                        <MapPin size={16} className="text-gray-400" />
                        <span className="font-medium">{country}</span>
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="px-4 py-8 text-center text-gray-500">
                    <p className="text-sm">No countries found</p>
                    <p className="text-xs mt-1">Try a different search term</p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Search Button */}
          <button
            onClick={handleSearch}
            disabled={!selectedTreatment}
            className={`flex items-center justify-center space-x-2 px-8 py-3.5 rounded-xl font-semibold text-base shadow-lg transition-all duration-300 ${
              selectedTreatment
                ? "bg-emerald-600 text-white hover:bg-emerald-700 hover:shadow-xl hover:scale-105 cursor-pointer"
                : "bg-emerald-600 text-white cursor-not-allowed"
            }`}
          >
            <Search size={20} />
            <span>Search</span>
          </button>
        </div>

        {/* Selected Items Display */}
        {(selectedTreatment || selectedCountry) && (
          <div className="flex flex-wrap gap-2 mt-3 pt-3 border-t border-gray-100">
            {selectedTreatment && (
              <div className="flex items-center space-x-2 bg-emerald-50 text-emerald-700 px-3 py-1.5 rounded-full text-sm">
                <Stethoscope size={14} />
                <span className="font-medium">{selectedTreatment}</span>
                <button
                  onClick={clearTreatment}
                  className="hover:bg-emerald-100 rounded-full p-0.5 transition-colors"
                >
                  <X size={14} />
                </button>
              </div>
            )}
            {selectedCountry && (
              <div className="flex items-center space-x-2 bg-blue-50 text-blue-700 px-3 py-1.5 rounded-full text-sm">
                <MapPin size={14} />
                <span className="font-medium">{selectedCountry}</span>
                <button
                  onClick={clearCountry}
                  className="hover:bg-blue-100 rounded-full p-0.5 transition-colors"
                >
                  <X size={14} />
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Quick Suggestions */}
      {/* <div className="mt-4 flex flex-wrap gap-2 justify-center">
        <span className="text-sm text-gray-500">Popular:</span>
        {['Orthopedics', 'Cardiology', 'Oncology'].map((treatment) => (
          <button
            key={treatment}
            onClick={() => handleTreatmentSelect(treatment)}
            className="text-sm bg-white border border-gray-200 text-gray-700 px-3 py-1 rounded-full hover:border-emerald-500 hover:text-emerald-700 hover:bg-emerald-50 transition-all duration-200"
          >
            {treatment}
          </button>
        ))}
      </div> */}
    </div>
  );
};

export default SearchBar;
