import React, { useState, useEffect } from "react";
import {
  Star,
  ChevronLeft,
  ChevronRight,
  X,
  MapPin,
  Calendar,
  Clock,
  DollarSign,
  Loader2,
} from "lucide-react";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://medcasts-backend.onrender.com/api";

interface Testimonial {
  id: number;
  patientName: string;
  age?: number;
  country?: string;
  treatment: string;
  rating: number;
  story: string;
  image?: string;
  date?: string;
  isApproved: boolean;
  isActive: boolean;
  hospital?: {
    id: number;
    name: string;
  };
  doctor?: {
    id: number;
    name: string;
  };
}

interface PatientStory extends Testimonial {
  name: string;
  treatmentCategory: string;
  procedure: string;
  clinic: string;
  location: string;
  beforeAfter?: boolean;
  recoveryTime?: string;
  savings?: string;
  activeTime?: string;
}

// Helper function to convert backend image paths to full URLs
const SERVER_BASE_URL = API_BASE_URL.replace(/\/?api$/, "");

const getImageUrl = (imagePath?: string): string => {
  if (!imagePath) return "/images/default-patient.jpg";
  if (/^https?:\/\//i.test(imagePath)) {
    return imagePath;
  }

  const normalizedPath = imagePath.startsWith("/")
    ? imagePath
    : `/${imagePath.replace(/^\.\//, "")}`;

  return `${SERVER_BASE_URL}${normalizedPath}`;
};

const PatientStoriesSection: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [cardsPerSlide, setCardsPerSlide] = useState<number>(4);
  const [selectedPatient, setSelectedPatient] = useState<PatientStory | null>(
    null
  );
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [activeFilter, setActiveFilter] = useState<string>("All");
  const [patientStories, setPatientStories] = useState<PatientStory[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [treatmentTags, setTreatmentTags] = useState<string[]>(["All"]);

  // Fetch treatments for filter tags
  useEffect(() => {
    const fetchTreatments = async () => {
      try {
        const response = await fetch(
          `${API_BASE_URL}/treatments?limit=100&isActive=true`
        );
        const data = await response.json();

        if (data.success && data.data.treatments) {
          // Extract unique treatment names and add "All" at the beginning
          const treatments = data.data.treatments.map((t: any) => t.name);
          setTreatmentTags(["All", ...treatments]);
        }
      } catch (err) {
        console.error("Error fetching treatments:", err);
      }
    };

    fetchTreatments();
  }, []);

  // Fetch testimonials from backend
  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `${API_BASE_URL}/testimonials?isApproved=true&isActive=true&limit=50`
        );
        const data = await response.json();

        if (data.success && data.data.testimonials) {
          // Transform backend testimonials to PatientStory format
          const stories: PatientStory[] = data.data.testimonials.map(
            (t: Testimonial) => ({
              ...t,
              name: t.patientName,
              treatmentCategory: t.treatment.toLowerCase().replace(/\s+/g, "-"),
              procedure: t.treatment,
              clinic: t.hospital?.name || "Hospital",
              location: t.country || "India",
              beforeAfter: false,
              recoveryTime: "",
              savings: "",
              activeTime: "",
              image: getImageUrl(t.image),
            })
          );
          setPatientStories(stories);
          setError("");
        }
      } catch (err) {
        console.error("Error fetching testimonials:", err);
        setError("Failed to load testimonials");
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  useEffect(() => {
    const updateCardsPerSlide = () => {
      if (window.innerWidth < 768) {
        setCardsPerSlide(1);
      } else if (window.innerWidth < 1024) {
        setCardsPerSlide(2);
      } else if (window.innerWidth < 1280) {
        setCardsPerSlide(3);
      } else {
        setCardsPerSlide(4);
      }
      setCurrentSlide(0);
    };

    updateCardsPerSlide();
    window.addEventListener("resize", updateCardsPerSlide);
    return () => window.removeEventListener("resize", updateCardsPerSlide);
  }, []);

  const filteredPatients = patientStories.filter((patient) => {
    const search = searchTerm.toLowerCase();
    const matchesSearch =
      patient.name.toLowerCase().includes(search) ||
      (patient.country?.toLowerCase() || "").includes(search) ||
      patient.location.toLowerCase().includes(search);
    const matchesFilter =
      activeFilter === "All" || patient.treatment === activeFilter;
    return matchesSearch && matchesFilter;
  });

  const totalSlides = Math.max(
    1,
    Math.ceil(filteredPatients.length / cardsPerSlide)
  );

  // Fixed navigation functions
  const nextSlide = () => {
    setCurrentSlide((prev) => {
      const next = prev + 1;
      return next >= totalSlides ? 0 : next;
    });
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => {
      const previous = prev - 1;
      return previous < 0 ? totalSlides - 1 : previous;
    });
  };

  const getGridCols = () => {
    switch (cardsPerSlide) {
      case 1:
        return "grid-cols-1";
      case 2:
        return "grid-cols-1 sm:grid-cols-2";
      case 3:
        return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3";
      case 4:
        return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4";
      default:
        return "grid-cols-4";
    }
  };

  const openModal = (patient: PatientStory) => {
    setSelectedPatient(patient);
  };

  const closeModal = () => {
    setSelectedPatient(null);
  };

  // Loading state
  if (loading) {
    return (
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-center items-center py-20">
            <Loader2 className="w-12 h-12 text-green-600 animate-spin" />
            <span className="ml-3 text-gray-600">Loading testimonials...</span>
          </div>
        </div>
      </section>
    );
  }

  // Error state
  if (error) {
    return (
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center py-20">
            <p className="text-red-600 mb-4">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              Retry
            </button>
          </div>
        </div>
      </section>
    );
  }

  // Empty state
  if (patientStories.length === 0) {
    return (
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center py-20">
            <p className="text-gray-500">No testimonials available</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="mb-12">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
            <div className="mb-6 lg:mb-0">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Real Recovery Stories from Real Patients
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl">
                Connect with patients who have transformed their lives through
                quality medical care abroad. These are their authentic journeys
                of healing and hope.
              </p>
            </div>

            {/* Search Bar */}
            <div className="flex flex-col sm:flex-row gap-4 items-center lg:flex-shrink-0">
              <div className="w-full sm:w-80">
                <input
                  type="text"
                  placeholder="Search by patient name, country, or treatment location"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Treatment Filter Tags */}
        <div className="flex flex-wrap gap-3 mb-8">
          {treatmentTags.map((tag) => (
            <button
              key={tag}
              onClick={() => {
                setActiveFilter(tag);
                setCurrentSlide(0);
              }}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${activeFilter === tag
                  ? "bg-green-600 text-white"
                  : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
                }`}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Navigation and Slider */}
        <div className="relative">
          {/* Navigation Arrows */}
          {totalSlides > 1 && (
            <>
              <button
                onClick={prevSlide}
                className="absolute right-16 -top-2 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 z-10"
                aria-label="Previous slide"
              >
                <ChevronLeft size={20} className="text-gray-600" />
              </button>

              <button
                onClick={nextSlide}
                className="absolute right-2 -top-2 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 z-10"
                aria-label="Next slide"
              >
                <ChevronRight size={20} className="text-gray-600" />
              </button>
            </>
          )}

          {/* Fixed Slider Container */}
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(-${currentSlide * (100 / totalSlides)}%)`,
                width: `${totalSlides * 100}%`,
              }}
            >
              {Array.from({ length: totalSlides }).map((_, slideIndex) => {
                const startIndex = slideIndex * cardsPerSlide;
                const endIndex = Math.min(
                  startIndex + cardsPerSlide,
                  filteredPatients.length
                );
                const slidePatients = filteredPatients.slice(
                  startIndex,
                  endIndex
                );

                return (
                  <div
                    key={slideIndex}
                    className="flex-shrink-0"
                    style={{ width: `${100 / totalSlides}%` }}
                  >
                    <div className={`grid gap-6 ${getGridCols()} px-2`}>
                      {slidePatients.map((patient) => (
                        <div
                          key={patient.id}
                          className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden cursor-pointer"
                          onClick={() => openModal(patient)}
                        >
                          {/* Patient Image */}
                          <div className="relative h-48 overflow-hidden">
                            <img
                              src={patient.image}
                              alt={patient.name}
                              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                            />
                            <div className="absolute bottom-3 left-3 bg-white bg-opacity-90 rounded-full px-3 py-1">
                              <span className="text-xs text-gray-600 flex items-center">
                                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                                {patient.activeTime || "Verified"}
                              </span>
                            </div>
                          </div>

                          {/* Card Content */}
                          <div className="p-6">
                            <h3 className="font-bold text-lg text-gray-900 mb-2">
                              {patient.name}
                            </h3>
                            <p className="text-sm text-gray-600 mb-3 line-clamp-3">
                              {patient.story.substring(0, 120)}...
                            </p>

                            {/* Treatment and Location */}
                            <div className="flex flex-wrap gap-2 mb-4">
                              <span className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded-full">
                                {patient.treatment}
                              </span>
                              <span className="text-xs bg-gray-50 text-gray-600 px-2 py-1 rounded-full">
                                {patient.location}
                              </span>
                            </div>

                            {/* Footer */}
                            <div className="flex items-center justify-between">
                              <div>
                                <div className="text-sm font-medium text-gray-900">
                                  {patient.country}
                                </div>
                                <div className="text-xs text-gray-500">
                                  {patient.location}
                                </div>
                              </div>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  openModal(patient);
                                }}
                                className="text-green-600 text-sm font-medium hover:text-green-700 transition-colors"
                              >
                                Read more
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Slide Indicators */}
          {totalSlides > 1 && (
            <div className="flex justify-center mt-8 space-x-2">
              {Array.from({ length: totalSlides }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentSlide
                      ? "bg-green-600 scale-110"
                      : "bg-gray-300 hover:bg-gray-400"
                    }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Modal */}
        {selectedPatient && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              {/* Modal Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <div className="flex items-center space-x-4">
                  <img
                    src={selectedPatient.image}
                    alt={selectedPatient.name}
                    className="w-16 h-16 rounded-full object-cover border-2 border-gray-100"
                  />
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">
                      {selectedPatient.name}
                    </h3>
                    <p className="text-sm text-gray-600">
                      Age {selectedPatient.age} • {selectedPatient.country}
                    </p>
                    <div className="flex items-center mt-1">
                      <div className="flex">
                        {[...Array(selectedPatient.rating)].map((_, i) => (
                          <Star
                            key={i}
                            size={14}
                            className="text-yellow-400 fill-current"
                          />
                        ))}
                      </div>
                      <span className="text-xs text-green-600 ml-2">
                        ✓ Verified Patient
                      </span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={closeModal}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  aria-label="Close modal"
                >
                  <X size={20} className="text-gray-600" />
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-6">
                {/* Treatment Info */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center mb-2">
                      <MapPin size={16} className="text-gray-600 mr-2" />
                      <span className="text-sm font-medium text-gray-900">
                        Treatment Location
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">
                      {selectedPatient.clinic}
                    </p>
                    <p className="text-xs text-gray-500">
                      {selectedPatient.location}
                    </p>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center mb-2">
                      <Calendar size={16} className="text-gray-600 mr-2" />
                      <span className="text-sm font-medium text-gray-900">
                        Procedure
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">
                      {selectedPatient.procedure}
                    </p>
                    <p className="text-xs text-gray-500">
                      {selectedPatient.date}
                    </p>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center mb-2">
                      <Clock size={16} className="text-gray-600 mr-2" />
                      <span className="text-sm font-medium text-gray-900">
                        Recovery Time
                      </span>
                    </div>
                    <p className="text-sm text-green-600 font-medium">
                      {selectedPatient.recoveryTime || "N/A"}
                    </p>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center mb-2">
                      <DollarSign size={16} className="text-gray-600 mr-2" />
                      <span className="text-sm font-medium text-gray-900">
                        Savings
                      </span>
                    </div>
                    <p className="text-sm text-green-600 font-medium">
                      {selectedPatient.savings || "N/A"}
                    </p>
                  </div>
                </div>

                {/* Full Story */}
                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">
                    Recovery Story
                  </h4>
                  <p className="text-gray-700 leading-relaxed">
                    {selectedPatient.story}
                  </p>
                </div>

                {/* Treatment Badge */}
                <div className="flex items-center justify-between">
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${selectedPatient.treatment === "Cardiac"
                        ? "bg-red-50 text-red-700"
                        : selectedPatient.treatment === "Orthopedic"
                          ? "bg-blue-50 text-blue-700"
                          : selectedPatient.treatment === "Oncology"
                            ? "bg-purple-50 text-purple-700"
                            : selectedPatient.treatment === "Plastic Surgery"
                              ? "bg-pink-50 text-pink-700"
                              : selectedPatient.treatment === "Dental"
                                ? "bg-cyan-50 text-cyan-700"
                                : "bg-green-50 text-green-700"
                      }`}
                  >
                    {selectedPatient.treatment}
                  </span>

                  {selectedPatient.beforeAfter && (
                    <span className="text-xs bg-blue-50 text-blue-700 px-3 py-1 rounded-full">
                      Before/After Available
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default PatientStoriesSection;
