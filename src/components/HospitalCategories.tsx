// components/HospitalCategories.tsx
import React, { useState, useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
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
    <section id="hospitals" className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="relative">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Best Hospital in India</h2>
            <p className="text-lg text-gray-600">
              Discover popular hospital types - from multi-specialty to specialized care - find your preferred healthcare facility.
            </p>
          </div>

          {/* Desktop navigation */}
          {totalCategorySlides > 1 && (
            <div className="absolute top-16 right-0 flex space-x-2 z-10 md:block hidden">
              <button
                onClick={prevCategorySlide}
                className="bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-gray-50"
                aria-label="Previous slide"
                disabled={currentCategorySlide === 0}
              >
                <ChevronLeft size={20} className="text-gray-600" />
              </button>
              <button
                onClick={nextCategorySlide}
                className="bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-gray-50"
                aria-label="Next slide"
                disabled={currentCategorySlide === totalCategorySlides - 1}
              >
                <ChevronRight size={20} className="text-gray-600" />
              </button>
            </div>
          )}

          {/* Mobile navigation */}
          {totalCategorySlides > 1 && (
            <div className="flex justify-between items-center mb-6 md:hidden">
              <button
                onClick={prevCategorySlide}
                className="bg-white rounded-full p-2 shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-gray-50"
                aria-label="Previous slide"
                disabled={currentCategorySlide === 0}
              >
                <ChevronLeft size={18} className="text-gray-600" />
              </button>
              <span className="text-sm text-gray-500">
                {currentCategorySlide + 1} / {totalCategorySlides}
              </span>
              <button
                onClick={nextCategorySlide}
                className="bg-white rounded-full p-2 shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-gray-50"
                aria-label="Next slide"
                disabled={currentCategorySlide === totalCategorySlides - 1}
              >
                <ChevronRight size={18} className="text-gray-600" />
              </button>
            </div>
          )}

          {/* Slider */}
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{
                width: `${totalCategorySlides * 100}%`,
                transform: `translateX(-${currentCategorySlide * (100 / totalCategorySlides)}%)`
              }}
            >
              {Array.from({ length: totalCategorySlides }).map((_, slideIndex) => (
                <div
                  key={slideIndex}
                  className="flex-shrink-0"
                  style={{ width: `${100 / totalCategorySlides}%` }}
                >
                  <div
                    className={`grid gap-6 ${screenSize === "sm"
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
                          className="relative rounded-2xl overflow-hidden cursor-pointer group"
                        >
                          <div className="relative h-64 bg-gradient-to-t from-black/70 to-transparent">
                            <img
                              src={getImageUrl(hospital.image)}
                              alt={hospital.name}
                              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                              onError={(e) => {
                                (e.target as HTMLImageElement).src =
                                  "/images/default-hospital.jpg";
                              }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                            <div className="absolute bottom-6 left-6 text-white">
                              <h3 className="text-xl font-bold mb-2 leading-tight">
                                {hospital.name}
                              </h3>
                              <p className="text-sm opacity-90">{hospital.city}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Slide indicators */}
          {totalCategorySlides > 1 && (
            <div className="flex justify-center mt-8 space-x-2">
              {Array.from({ length: totalCategorySlides }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentCategorySlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${currentCategorySlide === index
                    ? "bg-green-600"
                    : "bg-gray-300 hover:bg-gray-400"
                    }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default HospitalCategories;
