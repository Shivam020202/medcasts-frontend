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
  Quote,
  CheckCircle,
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

  const openModal = (patient: (typeof patientStories)[0]) => {
    setSelectedPatient(patient);
  };

  const closeModal = () => {
    setSelectedPatient(null);
  };

  return (
    <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-12 md:flex-row md:justify-between md:items-center md:text-left">
          <div className="mb-6 md:mb-0">
            <h2 className="text-4xl font-bold text-gray-900 mb-2">
              Real <span className="text-teal-600">Recovery Stories</span>
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl">
              Authentic journeys of healing and hope from patients worldwide
            </p>
          </div>

          {/* Navigation Arrows */}
          {totalSlides > 1 && (
            <div className="flex space-x-3">
              <button
                onClick={prevSlide}
                className="bg-white rounded-full p-3 transition-all duration-300 border-2 border-gray-200 hover:border-teal-400 group"
                aria-label="Previous slide"
              >
                <ChevronLeft
                  size={22}
                  className="text-gray-600 group-hover:text-teal-600 transition-colors"
                />
              </button>
              <button
                onClick={nextSlide}
                className="bg-white rounded-full p-3 transition-all duration-300 border-2 border-gray-200 hover:border-teal-400 group"
                aria-label="Next slide"
              >
                <ChevronRight
                  size={22}
                  className="text-gray-600 group-hover:text-teal-600 transition-colors"
                />
              </button>
            </div>
          )}
        </div>

        {/* Search and Filter */}
        <div className="mb-8 space-y-4">
          {/* Search Bar */}
          <div className="max-w-md">
            <input
              type="text"
              placeholder="Search by name, country, or location..."
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-100 transition-all duration-200"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Treatment Filter Tags */}
          <div className="flex flex-wrap gap-2">
            {treatmentTags.map((tag) => (
              <button
                key={tag}
                onClick={() => {
                  setActiveFilter(tag);
                  setCurrentSlide(0);
                }}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                  activeFilter === tag
                    ? "bg-teal-500 text-white shadow-md"
                    : "bg-white text-gray-600 hover:bg-gray-100 border-2 border-gray-200 hover:border-teal-300"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="w-12 h-12 text-teal-600 animate-spin" />
            <span className="ml-3 text-gray-600">Loading testimonials...</span>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="text-center py-20">
            <p className="text-red-600 mb-4">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700"
            >
              Retry
            </button>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && patientStories.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-500">No testimonials available</p>
          </div>
        )}

        {/* Slider */}
        {!loading && !error && patientStories.length > 0 && (
          <>
            <div className="overflow-hidden">
              <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{
                  transform: `translateX(-${
                    currentSlide * (100 / totalSlides)
                  }%)`,
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
                            className="group bg-white rounded-2xl overflow-hidden transition-all duration-300 border-2 border-gray-100 hover:border-teal-300 cursor-pointer"
                            onClick={() => openModal(patient)}
                          >
                            {/* Patient Image */}
                            <div className="relative h-56 overflow-hidden">
                              <img
                                src={patient.image}
                                alt={patient.name}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>

                              {/* Quote Icon */}
                              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg">
                                <Quote size={18} className="text-teal-600" />
                              </div>

                              {/* Active Badge */}
                              <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm rounded-full px-3 py-1.5 shadow-lg">
                                <span className="text-xs font-semibold text-gray-700 flex items-center">
                                  <div className="w-2 h-2 bg-emerald-500 rounded-full mr-2 animate-pulse"></div>
                                  {patient.activeTime}
                                </span>
                              </div>
                            </div>

                            {/* Card Content */}
                            <div className="p-5">
                              <div className="flex items-start justify-between mb-3">
                                <div>
                                  <h3 className="font-bold text-lg text-gray-900 mb-1 group-hover:text-teal-700 transition-colors">
                                    {patient.name}
                                  </h3>
                                  <p className="text-sm text-gray-600">
                                    Age {patient.age} • {patient.country}
                                  </p>
                                </div>
                                <div className="flex items-center bg-yellow-50 px-2 py-1 rounded-full">
                                  <Star
                                    size={14}
                                    className="text-yellow-400 fill-current mr-1"
                                  />
                                  <span className="text-xs font-bold text-gray-900">
                                    {patient.rating}
                                  </span>
                                </div>
                              </div>

                              <p className="text-sm text-gray-600 mb-4 line-clamp-3 leading-relaxed">
                                {patient.story.substring(0, 120)}...
                              </p>

                              {/* Treatment Badge */}
                              <div className="inline-flex items-center bg-teal-50 text-teal-700 px-3 py-1 rounded-full text-xs font-semibold mb-4">
                                {patient.treatment}
                              </div>

                              {/* Footer */}
                              <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                                <div className="flex items-center text-gray-600 text-sm">
                                  <MapPin
                                    size={14}
                                    className="mr-1 text-gray-400"
                                  />
                                  <span className="text-xs">
                                    {patient.location}
                                  </span>
                                </div>
                                <span className="text-sm font-semibold text-teal-600 group-hover:text-teal-700 inline-flex items-center">
                                  Read Story
                                  <ChevronRight
                                    size={16}
                                    className="ml-1 transform group-hover:translate-x-1 transition-transform"
                                  />
                                </span>
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
                    className={`h-2 rounded-full transition-all duration-300 ${
                      index === currentSlide
                        ? "w-8 bg-teal-500"
                        : "w-2 bg-gray-300 hover:bg-gray-400"
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            )}
          </>
        )}

        {/* Modal */}
        {selectedPatient && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fadeIn">
            <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
              {/* Modal Header */}
              <div className="relative">
                <div className="h-32 bg-gradient-to-r from-teal-500 to-emerald-500"></div>
                <button
                  onClick={closeModal}
                  className="absolute top-4 right-4 p-2 bg-white/90 hover:bg-white rounded-full transition-colors shadow-lg"
                  aria-label="Close modal"
                >
                  <X size={20} className="text-gray-600" />
                </button>

                <div className="px-8 -mt-16">
                  <div className="flex items-end space-x-4">
                    <img
                      src={selectedPatient.image}
                      alt={selectedPatient.name}
                      className="w-24 h-24 rounded-2xl object-cover border-4 border-white shadow-xl"
                    />
                    <div className="pb-2 flex-1">
                      <h3 className="text-2xl font-bold text-white mb-1">
                        {selectedPatient.name}
                      </h3>
                      <p className="text-white/90 text-sm">
                        Age {selectedPatient.age} • {selectedPatient.country}
                      </p>
                    </div>
                    <div className="flex items-center bg-white px-3 py-2 rounded-full shadow-lg mb-2">
                      {[...Array(selectedPatient.rating)].map((_, i) => (
                        <Star
                          key={i}
                          size={16}
                          className="text-yellow-400 fill-current"
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Modal Content */}
              <div className="p-8">
                {/* Verified Badge */}
                <div className="inline-flex items-center bg-emerald-50 text-emerald-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
                  <CheckCircle size={16} className="mr-2" />
                  Verified Patient Story
                </div>

                {/* Treatment Info Grid */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-gradient-to-br from-teal-50 to-emerald-50 rounded-xl p-4 border border-teal-100">
                    <div className="flex items-center mb-2">
                      <MapPin size={18} className="text-teal-600 mr-2" />
                      <span className="text-sm font-semibold text-gray-900">
                        Treatment Location
                      </span>
                    </div>
                    <p className="text-sm text-gray-700 font-medium">
                      {selectedPatient.clinic}
                    </p>
                    <p className="text-xs text-gray-600">
                      {selectedPatient.location}
                    </p>
                  </div>

                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-100">
                    <div className="flex items-center mb-2">
                      <Calendar size={18} className="text-blue-600 mr-2" />
                      <span className="text-sm font-semibold text-gray-900">
                        Procedure
                      </span>
                    </div>
                    <p className="text-sm text-gray-700 font-medium">
                      {selectedPatient.procedure}
                    </p>
                    <p className="text-xs text-gray-600">
                      {selectedPatient.date}
                    </p>
                  </div>

                  <div className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-xl p-4 border border-emerald-100">
                    <div className="flex items-center mb-2">
                      <Clock size={18} className="text-emerald-600 mr-2" />
                      <span className="text-sm font-semibold text-gray-900">
                        Recovery Time
                      </span>
                    </div>
                    <p className="text-lg text-emerald-600 font-bold">
                      {selectedPatient.recoveryTime}
                    </p>
                  </div>

                  <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl p-4 border border-yellow-100">
                    <div className="flex items-center mb-2">
                      <DollarSign size={18} className="text-orange-600 mr-2" />
                      <span className="text-sm font-semibold text-gray-900">
                        Savings
                      </span>
                    </div>
                    <p className="text-lg text-orange-600 font-bold">
                      {selectedPatient.savings}
                    </p>
                  </div>
                </div>

                {/* Full Story */}
                <div className="mb-6">
                  <h4 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                    <Quote size={20} className="text-teal-600 mr-2" />
                    Recovery Journey
                  </h4>
                  <p className="text-gray-700 leading-relaxed text-base">
                    {selectedPatient.story}
                  </p>
                </div>

                {/* Treatment Badge */}
                <div className="flex items-center justify-between pt-6 border-t border-gray-200">
                  <span className="inline-block px-4 py-2 rounded-full text-sm font-semibold bg-teal-50 text-teal-700">
                    {selectedPatient.treatment}
                  </span>

                  {selectedPatient.beforeAfter && (
                    <span className="text-xs bg-blue-50 text-blue-700 px-4 py-2 rounded-full font-semibold">
                      Before/After Available
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
      `}</style>
    </section>
  );
};

export default PatientStoriesSection;
