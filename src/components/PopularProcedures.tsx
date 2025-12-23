// components/PopularProcedures.tsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, ChevronDown } from "lucide-react";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://medcasts-backend.onrender.com/api";

interface Treatment {
  id: number;
  name: string;
  slug: string;
  cost: string;
  description?: string;
  duration?: string;
  stay?: string;
  successRate?: number;
  procedureType?: string;
  specialty: {
    id: number;
    name: string;
    slug: string;
  };
  hospital: {
    id: number;
    name: string;
    location: string;
  };
}

interface Specialty {
  id: number;
  name: string;
  slug: string;
  description?: string;
  icon?: string;
  clinicsCount?: number;
  bgColor?: string;
  iconBg?: string;
  iconColor?: string;
  imageUrl?: string;
  isActive: boolean;
}

interface GroupedTreatments {
  [specialtyName: string]: {
    specialty: Specialty;
    treatments: Treatment[];
  };
}

const PopularProcedures: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<string>("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [popularTreatments, setPopularTreatments] = useState<Treatment[]>([]);
  const [groupedTreatments, setGroupedTreatments] = useState<GroupedTreatments>(
    {}
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);

      console.log("Fetching popular treatments...");

      // Fetch popular treatments
      const treatmentsResponse = await axios.get(
        `${API_BASE_URL}/treatments/popular`
      );

      // Fetch all active specialties
      const specialtiesResponse = await axios.get(
        `${API_BASE_URL}/specialties?isActive=true`
      );

      const treatments = treatmentsResponse.data.data || [];
      const allSpecialties = specialtiesResponse.data.data?.specialties || [];

      console.log("Popular treatments:", treatments);
      console.log("All specialties:", allSpecialties);

      setPopularTreatments(treatments);

      // Group treatments by specialty
      const grouped: GroupedTreatments = {};
      treatments.forEach((treatment: Treatment) => {
        const specialtyName = treatment.specialty.name;
        if (!grouped[specialtyName]) {
          grouped[specialtyName] = {
            specialty: allSpecialties.find(
              (s: Specialty) => s.id === treatment.specialty.id
            ) || {
              id: treatment.specialty.id,
              name: specialtyName,
              slug: treatment.specialty.slug,
              isActive: true,
            },
            treatments: [],
          };
        }
        grouped[specialtyName].treatments.push(treatment);
      });

      console.log("Grouped treatments:", grouped);

      setGroupedTreatments(grouped);

      // Set first specialty as active tab
      const firstSpecialty = Object.keys(grouped)[0];
      if (firstSpecialty) {
        setActiveTab(firstSpecialty);
        console.log("Active tab set to:", firstSpecialty);
      }
    } catch (error) {
      console.error("Error fetching popular treatments:", error);
    } finally {
      setLoading(false);
    }
  };

  const specialtyTabs = Object.keys(groupedTreatments);
  const activeTreatments = groupedTreatments[activeTab]?.treatments || [];

  if (loading) {
    return (
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-1/2 mx-auto mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/3 mx-auto mb-8"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (popularTreatments.length === 0) {
    return null;
  }

  return (
    <section className="pt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-4">
        {/* Header */}
        <div className="text-center ">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Popular Medical Treatments & Procedures
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Comprehensive healthcare solutions with transparent pricing
          </p>
        </div>

        {/* Specialty Tabs - Desktop with Stage Effect */}
        <div className="hidden lg:flex justify-center mb-12">
          <div className="relative bg-gradient-to-b from-gray-50 to-white rounded-xl px-4 p-2 border border-gray-300 shadow-2xl">
            {/* Stage base */}
            {/* <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent rounded-b-3xl"></div> */}

            <div className="flex flex-wrap justify-center gap-3 relative">
              {specialtyTabs.map((specialtyName) => {
                const isActive = activeTab === specialtyName;
                const specialty = groupedTreatments[specialtyName]?.specialty;

                return (
                  <button
                    key={specialtyName}
                    onClick={() => setActiveTab(specialtyName)}
                    className={`relative group px-6 py-1 rounded-lg font-semibold transition-all duration-500 whitespace-nowrap overflow-hidden ${
                      isActive
                        ? "text-white test-base transform scale-110 shadow-2xl"
                        : "text-gray-700 text-base hover:text-gray-900 hover:bg-gray-50 hover:scale-105"
                    }`}
                    style={{
                      transformStyle: "preserve-3d",
                    }}
                  >
                    {/* Radial gradient stage effect for active tab */}
                    {isActive && (
                      <>
                        {/* Main radial gradient */}
                        <div
                          className="absolute inset-0 opacity-100 animate-pulse-slow"
                          style={{
                            background:
                              "radial-gradient(ellipse at bottom, #10b981 0%, #059669 40%, #047857 100%)",
                            animation: "stage-glow 3s ease-in-out infinite",
                          }}
                        ></div>

                        {/* Spotlight effect */}
                        <div
                          className="absolute inset-0 opacity-60"
                          style={{
                            background:
                              "radial-gradient(ellipse 120% 80% at 50% 120%, rgba(255,255,255,0.3) 0%, transparent 50%)",
                            animation:
                              "spotlight 2s ease-in-out infinite alternate",
                          }}
                        ></div>

                        {/* Shimmer effect */}
                        <div
                          className="absolute inset-0 opacity-30"
                          style={{
                            background:
                              "linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.5) 50%, transparent 70%)",
                            backgroundSize: "200% 200%",
                            animation: "shimmer 3s linear infinite",
                          }}
                        ></div>
                      </>
                    )}

                    {/* Hover glow effect */}
                    {!isActive && (
                      <div className="absolute inset-0 bg-gradient-to-t from-emerald-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
                    )}

                    {/* Content */}
                    <span className="relative z-10 flex items-center space-x-2">
                      {specialty?.icon && (
                        <span className="text-xl">{specialty.icon}</span>
                      )}
                      <span className="font-normal text-sm">
                        {specialtyName}
                      </span>
                    </span>

                    {/* Active indicator */}
                    {isActive && (
                      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1/2 h-1 bg-white/50 rounded-full animate-pulse"></div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Mobile Dropdown - Enhanced */}
        <div className="lg:hidden mb-8">
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="w-full bg-gradient-to-br from-emerald-500 to-teal-600 text-white border-2 border-emerald-400 rounded-2xl px-4 py-2 flex items-center justify-between shadow-xl hover:shadow-2xl transition-all duration-300"
            >
              <div className="flex items-center space-x-3">
                {groupedTreatments[activeTab]?.specialty?.icon && (
                  <span className="text-2xl">
                    {groupedTreatments[activeTab].specialty.icon}
                  </span>
                )}
                <span className="font-base   text-base">{activeTab}</span>
              </div>
              <ChevronDown
                size={24}
                className={`transition-transform duration-300 ${
                  isDropdownOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {isDropdownOpen && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white border-2 border-gray-200 rounded-2xl shadow-2xl z-10 max-h-64 overflow-y-auto">
                {specialtyTabs.map((specialtyName) => {
                  const specialty = groupedTreatments[specialtyName]?.specialty;
                  const isActive = activeTab === specialtyName;

                  return (
                    <button
                      key={specialtyName}
                      onClick={() => {
                        setActiveTab(specialtyName);
                        setIsDropdownOpen(false);
                      }}
                      className={`w-full flex items-center space-x-3 px-6 py-4 text-left transition-all duration-300 ${
                        isActive
                          ? "bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold shadow-lg"
                          : "text-gray-700 hover:bg-emerald-50"
                      }`}
                    >
                      {specialty?.icon && (
                        <span className="text-xl">{specialty.icon}</span>
                      )}
                      <span className="font-medium">{specialtyName}</span>
                      {isActive && <span className="ml-auto">✓</span>}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Treatments Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {activeTreatments.map((treatment, index) => (
            <div
              key={treatment.id}
              onClick={() => navigate(`/treatment/${treatment.slug}`)}
              className="group bg-white/70 backdrop-blur-sm rounded-3xl p-6 hover:shadow-xl transition-all duration-500 cursor-pointer border border-emerald-200 hover:border-gray-200 hover:-translate-y-2 transform"
              style={{
                animationDelay: `${index * 100}ms`,
                animation: "fadeInUp 0.6s ease-out forwards",
              }}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow duration-300">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </div>
                <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full font-medium">
                  Popular
                </span>
              </div>

              <h3 className="font-bold text-lg text-gray-900 mb-3 leading-tight group-hover:text-emerald-600 transition-colors duration-300">
                {treatment.name}
              </h3>

              <div className="mb-4">
                <p className="text-sm text-gray-500 mb-1">
                  Average Package Cost
                </p>
                <p className="text-xl font-bold text-gray-900">
                  {treatment.cost}
                </p>
              </div>

              {treatment.description && (
                <p className="text-sm text-gray-600 mb-4 leading-relaxed line-clamp-2">
                  {treatment.description}
                </p>
              )}

              <div className="mb-4 flex flex-wrap gap-2">
                {treatment.duration && (
                  <span className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded-full">
                    {treatment.duration}
                  </span>
                )}
                {treatment.stay && (
                  <span className="text-xs bg-purple-50 text-purple-700 px-2 py-1 rounded-full">
                    {treatment.stay} stay
                  </span>
                )}
                {treatment.successRate && (
                  <span className="text-xs bg-green-50 text-green-700 px-2 py-1 rounded-full">
                    {treatment.successRate}% success rate
                  </span>
                )}
              </div>

              <div className="text-xs text-gray-500 mb-3">
                <p>
                  {treatment.hospital.name}, {treatment.hospital.location}
                </p>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-emerald-600 font-semibold text-sm group-hover:text-emerald-700 transition-colors duration-300">
                  View Details
                </span>
                <ArrowRight
                  size={16}
                  className="text-gray-400 group-hover:text-emerald-500 group-hover:translate-x-1 transition-all duration-300"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes stage-glow {
          0%, 100% {
            filter: brightness(1) saturate(1);
          }
          50% {
            filter: brightness(1.1) saturate(1.2);
          }
        }
        
        @keyframes spotlight {
          0% {
            opacity: 0.4;
            transform: translateY(0);
          }
          100% {
            opacity: 0.7;
            transform: translateY(-2px);
          }
        }
        
        @keyframes shimmer {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }
        
        @keyframes pulse-slow {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.95;
          }
        }
      `}</style>
    </section>
  );
};

export default PopularProcedures;
