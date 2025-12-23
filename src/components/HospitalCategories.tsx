// components/HospitalCategories.tsx
import React, { useState, useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  MapPin,
  Building2,
  Loader2,
} from "lucide-react";

// Backend API URL
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://medcasts-backend.onrender.com/api";
const SERVER_BASE_URL = import.meta.env.VITE_SERVER_BASE_URL || "https://medcasts-backend.onrender.com";

interface HospitalCategoriesProps {
  currentCategorySlide: number;
  setCurrentCategorySlide: (slide: number) => void;
}

// Hospital interface matching backend structure
interface Hospital {
  id: number;
  name: string;
  slug: string;
  location: string;
  city: string;
  state: string;
  country: string;
  rating: number;
  specialty: string;
  description?: string;
  image?: string;
  accreditation?: string;
  address?: string;
  phone?: string;
  email?: string;
  website?: string;
  establishedYear?: number;
  bedCapacity?: number;
  isActive: boolean;
}

const HospitalCategories: React.FC<HospitalCategoriesProps> = ({
  currentCategorySlide,
  setCurrentCategorySlide,
}) => {
  const [screenSize, setScreenSize] = useState<"sm" | "md" | "lg">("lg");
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch hospitals from backend API
  useEffect(() => {
    const fetchHospitals = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(
          `${API_BASE_URL}/hospitals?limit=20&isActive=true`
        );
        const data = await response.json();

        if (data.success && data.data.hospitals) {
          setHospitals(data.data.hospitals);
        } else {
          setError("Failed to load hospitals");
        }
      } catch (err) {
        console.error("Error fetching hospitals:", err);
        setError("Failed to load hospitals. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchHospitals();
  }, []);

  // Detect responsive screen size
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setScreenSize("sm");
      } else if (width < 1024) {
        setScreenSize("md");
      } else {
        setScreenSize("lg");
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // How many categories to show per slide by screen size
  const getCategoriesPerSlide = () => {
    switch (screenSize) {
      case "sm":
        return 1;
      case "md":
        return 2;
      case "lg":
      default:
        return 4;
    }
  };

  const categoriesPerSlide = getCategoriesPerSlide();
  const totalCategorySlides = Math.ceil(hospitals.length / categoriesPerSlide);

  // Move forward/back (no wrap)
  const nextCategorySlide = () => {
    const nextSlide =
      currentCategorySlide + 1 >= totalCategorySlides
        ? currentCategorySlide
        : currentCategorySlide + 1;
    setCurrentCategorySlide(nextSlide);
  };

  const prevCategorySlide = () => {
    const prevSlide =
      currentCategorySlide - 1 < 0
        ? currentCategorySlide
        : currentCategorySlide - 1;
    setCurrentCategorySlide(prevSlide);
  };

  // Only reset slide if current slide gets out of bounds after resize
  useEffect(() => {
    if (currentCategorySlide > totalCategorySlides - 1) {
      setCurrentCategorySlide(0);
    }
  }, [
    screenSize,
    totalCategorySlides,
    currentCategorySlide,
    setCurrentCategorySlide,
  ]);

  // Helper function to get full image URL
  const getImageUrl = (imagePath?: string) => {
    if (!imagePath) return "/images/default-hospital.jpg";
    if (imagePath.startsWith("http://") || imagePath.startsWith("https://")) {
      return imagePath;
    }
    if (imagePath.startsWith("/uploads")) {
      return `${SERVER_BASE_URL}${imagePath}`;
    }
    return imagePath;
  };

  // Loading state
  if (loading) {
    return (
      <section
        id="hospitals"
        className="pt-6 bg-gradient-to-b from-white to-gray-50"
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col items-center justify-center min-h-[400px]">
            <Loader2 className="w-12 h-12 text-teal-600 animate-spin mb-4" />
            <p className="text-gray-600 text-lg">Loading hospitals...</p>
          </div>
        </div>
      </section>
    );
  }

  // Error state
  if (error) {
    return (
      <section
        id="hospitals"
        className="pt-6 bg-gradient-to-b from-white to-gray-50"
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col items-center justify-center min-h-[400px]">
            <div className="text-center">
              <p className="text-red-600 text-lg mb-4">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="bg-gradient-to-r from-teal-500 to-emerald-500 text-white px-6 py-3 rounded-lg hover:from-teal-600 hover:to-emerald-600 transition-all font-semibold shadow-md hover:shadow-lg"
              >
                Retry
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Empty state
  if (hospitals.length === 0) {
    return (
      <section
        id="hospitals"
        className="pt-6 bg-gradient-to-b from-white to-gray-50"
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col items-center justify-center min-h-[400px]">
            <p className="text-gray-600 text-lg">
              No hospitals available at the moment.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="hospitals"
      className="pt-6 bg-gradient-to-b from-white to-gray-50"
    >
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-12 md:flex-row md:justify-between md:items-center md:text-left">
          <div>
            <h2 className="text-4xl font-bold text-gray-900 mb-2">
              Best <span className="text-teal-600">Hospitals</span> in India
            </h2>
            <p className="text-gray-600 text-lg">
              Discover top-rated healthcare facilities across India
            </p>
          </div>

          {/* Desktop Navigation Arrows */}
          {totalCategorySlides > 1 && (
            <div className="hidden md:flex space-x-3 mt-6 md:mt-0">
              <button
                onClick={prevCategorySlide}
                className="bg-white rounded-full p-3 transition-all duration-300 border-2 border-gray-200 hover:border-teal-400 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:border-gray-200 group"
                aria-label="Previous slide"
                disabled={currentCategorySlide === 0}
              >
                <ChevronLeft
                  size={22}
                  className="text-gray-600 group-hover:text-teal-600 transition-colors"
                />
              </button>
              <button
                onClick={nextCategorySlide}
                className="bg-white rounded-full p-3 transition-all duration-300 border-2 border-gray-200 hover:border-teal-400 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:border-gray-200 group"
                aria-label="Next slide"
                disabled={currentCategorySlide === totalCategorySlides - 1}
              >
                <ChevronRight
                  size={22}
                  className="text-gray-600 group-hover:text-teal-600 transition-colors"
                />
              </button>
            </div>
          )}
        </div>

        {/* Mobile navigation */}
        {totalCategorySlides > 1 && (
          <div className="flex justify-between items-center mb-6 md:hidden">
            <button
              onClick={prevCategorySlide}
              className="bg-white rounded-full p-2 transition-all duration-300 border-2 border-gray-200 hover:border-teal-400 disabled:opacity-40 disabled:cursor-not-allowed group"
              aria-label="Previous slide"
              disabled={currentCategorySlide === 0}
            >
              <ChevronLeft
                size={20}
                className="text-gray-600 group-hover:text-teal-600 transition-colors"
              />
            </button>
            <span className="text-sm font-semibold text-gray-600">
              {currentCategorySlide + 1} / {totalCategorySlides}
            </span>
            <button
              onClick={nextCategorySlide}
              className="bg-white rounded-full p-2 transition-all duration-300 border-2 border-gray-200 hover:border-teal-400 disabled:opacity-40 disabled:cursor-not-allowed group"
              aria-label="Next slide"
              disabled={currentCategorySlide === totalCategorySlides - 1}
            >
              <ChevronRight
                size={20}
                className="text-gray-600 group-hover:text-teal-600 transition-colors"
              />
            </button>
          </div>
        )}

        {/* Slider */}
        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{
              width: `${totalCategorySlides * 100}%`,
              transform: `translateX(-${
                currentCategorySlide * (100 / totalCategorySlides)
              }%)`,
            }}
          >
            {Array.from({ length: totalCategorySlides }).map(
              (_, slideIndex) => (
                <div
                  key={slideIndex}
                  className="flex-shrink-0"
                  style={{ width: `${100 / totalCategorySlides}%` }}
                >
                  <div
                    className={`grid gap-6 ${
                      screenSize === "sm"
                        ? "grid-cols-1"
                        : screenSize === "md"
                        ? "grid-cols-2"
                        : "grid-cols-4"
                    }`}
                  >
                    {hospitals
                      .slice(
                        slideIndex * categoriesPerSlide,
                        (slideIndex + 1) * categoriesPerSlide
                      )
                      .map((hospital) => (
                        <div
                          key={hospital.id}
                          className="group bg-white rounded-2xl overflow-hidden transition-all duration-300 border-2 border-gray-100 hover:border-teal-300 cursor-pointer"
                        >
                          {/* Image Section */}
                          <div className="relative h-48 overflow-hidden">
                            <img
                              src={getImageUrl(hospital.image)}
                              alt={hospital.name}
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                              onError={(e) => {
                                (e.target as HTMLImageElement).src =
                                  "/images/default-hospital.jpg";
                              }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent group-hover:from-black/90 transition-all duration-300"></div>

                            {/* Hospital Badge */}
                            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg">
                              <Building2 size={18} className="text-teal-600" />
                            </div>

                            {/* Rating Badge */}
                            {hospital.rating && (
                              <div className="absolute top-4 left-4 bg-teal-500 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
                                ★ {hospital.rating}
                              </div>
                            )}
                          </div>

                          {/* Content Section */}
                          <div className="p-5">
                            <h3 className="font-bold text-lg text-gray-900 mb-2 group-hover:text-teal-700 transition-colors line-clamp-1">
                              {hospital.name}
                            </h3>

                            {/* Specialty Badge */}
                            {hospital.specialty && (
                              <div className="inline-block bg-teal-50 text-teal-700 px-3 py-1 rounded-full text-xs font-semibold mb-3">
                                {hospital.specialty}
                              </div>
                            )}

                            <div className="flex items-center text-gray-600 text-sm mb-3">
                              <MapPin
                                size={14}
                                className="mr-1 text-gray-400 flex-shrink-0"
                              />
                              <span className="line-clamp-1">
                                {hospital.city}, {hospital.state}
                              </span>
                            </div>

                            <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed mb-3">
                              {hospital.description ||
                                "Quality healthcare services"}
                            </p>

                            {/* Additional Info */}
                            <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                              {hospital.bedCapacity && (
                                <span>🛏️ {hospital.bedCapacity} beds</span>
                              )}
                              {hospital.establishedYear && (
                                <span>📅 Est. {hospital.establishedYear}</span>
                              )}
                            </div>

                            {/* View Details Link */}
                            <div className="pt-4 border-t border-gray-100">
                              <span className="text-sm font-semibold text-teal-600 group-hover:text-teal-700 inline-flex items-center">
                                View Details
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
              )
            )}
          </div>
        </div>

        {/* Slide indicators */}
        {totalCategorySlides > 1 && (
          <div className="flex justify-center mt-8 space-x-2">
            {Array.from({ length: totalCategorySlides }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentCategorySlide(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  currentCategorySlide === index
                    ? "w-8 bg-teal-500"
                    : "w-2 bg-gray-300 hover:bg-gray-400"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default HospitalCategories;
