import React, { useState, useEffect } from "react";
import {
  Star,
  ChevronLeft,
  ChevronRight,
  Award,
  MapPin,
  Loader2,
} from "lucide-react";

// Backend API URL
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://medcasts-backend.onrender.com/api";
const SERVER_BASE_URL = import.meta.env.VITE_SERVER_BASE_URL || "https://medcasts-backend.onrender.com";

// Doctor interface matching backend structure
interface Doctor {
  id: number;
  name: string;
  specialization: string;
  experience?: string;
  patientsTreated?: string;
  rating: number;
  reviews?: string;
  image?: string;
  consultationFee?: number;
  hospital?: {
    id: number;
    name: string;
    location?: string;
  };
  specialty?: {
    id: number;
    name: string;
  };
  phone?: string;
}

const PopularDoctors = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [cardsPerSlide, setCardsPerSlide] = useState(4);

  // Responsive cards per slide
  useEffect(() => {
    const updateCardsPerSlide = () => {
      if (window.innerWidth < 768) {
        setCardsPerSlide(1); // Mobile: 1 card
      } else if (window.innerWidth < 1024) {
        setCardsPerSlide(2); // Tablet: 2 cards
      } else {
        setCardsPerSlide(4); // Desktop: 4 cards
      }
      setCurrentSlide(0); // Reset to first slide when screen size changes
    };

    updateCardsPerSlide();
    window.addEventListener("resize", updateCardsPerSlide);
    return () => window.removeEventListener("resize", updateCardsPerSlide);
  }, []);

  // Fetch doctors from backend API
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(
          `${API_BASE_URL}/doctors?limit=20&isActive=true`
        );
        const data = await response.json();

        if (data.success && data.data.doctors) {
          setDoctors(data.data.doctors);
        } else {
          setError("Failed to load doctors");
        }
      } catch (err) {
        console.error("Error fetching doctors:", err);
        setError("Failed to load doctors. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  const totalSlides = Math.ceil(doctors.length / cardsPerSlide);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const getGridCols = () => {
    if (cardsPerSlide === 1) return "grid-cols-1";
    if (cardsPerSlide === 2) return "grid-cols-2";
    return "grid-cols-4";
  };

  // WhatsApp booking handler
  const handleBookAppointment = (doctor: Doctor) => {
    const hospitalName = doctor.hospital?.name || "the hospital";
    const message = `Hello! I would like to book an appointment with ${doctor.name} (${doctor.specialization}) at ${hospitalName}. Please help me schedule an appointment.`;
    const whatsappNumber = doctor.phone || "+919643452714"; // Fallback to default number
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappUrl, "_blank");
  };

  // Loading state
  if (loading) {
    return (
      <section
        id="doctors"
        className="py-16 bg-gradient-to-b from-gray-50 to-white"
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col items-center justify-center min-h-[400px]">
            <Loader2 className="w-12 h-12 text-teal-600 animate-spin mb-4" />
            <p className="text-gray-600 text-lg">Loading doctors...</p>
          </div>
        </div>
      </section>
    );
  }

  // Error state
  if (error) {
    return (
      <section
        id="doctors"
        className="py-16 bg-gradient-to-b from-gray-50 to-white"
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
  if (doctors.length === 0) {
    return (
      <section
        id="doctors"
        className="py-16 bg-gradient-to-b from-gray-50 to-white"
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col items-center justify-center min-h-[400px]">
            <p className="text-gray-600 text-lg">
              No doctors available at the moment.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="doctors"
      className="py-16 bg-gradient-to-b from-gray-50 to-white"
    >
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-12 md:flex-row md:justify-between md:items-center md:text-left">
          <div>
            <h2 className="text-4xl font-bold text-gray-900 mb-2">
              Popular <span className="text-teal-600">Doctors</span>
            </h2>
            <p className="text-gray-600 text-lg">
              Connect with our top-rated medical specialists
            </p>
          </div>

          {/* Navigation Arrows */}
          {totalSlides > 1 && (
            <div className="flex space-x-3 mt-6 md:mt-0">
              <button
                onClick={prevSlide}
                className="bg-white rounded-full p-3   transition-all duration-300 border-2 border-gray-200 hover:border-teal-400 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:border-gray-200 group"
                disabled={currentSlide === 0}
              >
                <ChevronLeft
                  size={22}
                  className="text-gray-600 group-hover:text-teal-600 transition-colors"
                />
              </button>

              <button
                onClick={nextSlide}
                className="bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-gray-200 hover:border-teal-400 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:border-gray-200 group"
                disabled={currentSlide === totalSlides - 1}
              >
                <ChevronRight
                  size={22}
                  className="text-gray-600 group-hover:text-teal-600 transition-colors"
                />
              </button>
            </div>
          )}
        </div>

        {/* Slider Container */}
        <div className="relative">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {Array.from({ length: totalSlides }).map((_, slideIndex) => (
                <div key={slideIndex} className="w-full flex-shrink-0">
                  <div className={`grid gap-6 ${getGridCols()}`}>
                    {doctors
                      .slice(
                        slideIndex * cardsPerSlide,
                        (slideIndex + 1) * cardsPerSlide
                      )
                      .map((doctor) => (
                        <div
                          key={doctor.id}
                          className="group bg-white rounded-2xl  transition-all duration-300 border-2 border-gray-100 hover:border-teal-300 overflow-hidden"
                        >
                          {/* Card Content */}
                          <div className="p-6">
                            {/* Doctor Image with Badge */}
                            <div className="relative mb-5 flex justify-center">
                              <div className="relative">
                                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-teal-100 to-emerald-100 p-1 group-hover:scale-105 transition-transform duration-300">
                                  <img
                                    src={
                                      doctor.image?.startsWith("/uploads")
                                        ? `${SERVER_BASE_URL}${doctor.image}`
                                        : doctor.image ||
                                          "/images/default-doctor.jpg"
                                    }
                                    alt={doctor.name}
                                    className="w-full h-full rounded-full object-cover border-4 border-white shadow-lg"
                                    onError={(e) => {
                                      (e.target as HTMLImageElement).src =
                                        "/images/default-doctor.jpg";
                                    }}
                                  />
                                </div>
                                {/* Verified Badge */}
                                {doctor.rating >= 4.8 && (
                                  <div className="absolute -bottom-1 -right-1 bg-teal-500 rounded-full p-1.5 shadow-lg">
                                    <Award size={16} className="text-white" />
                                  </div>
                                )}
                              </div>
                            </div>

                            {/* Doctor Info */}
                            <div className="text-center mb-4">
                              <h3 className="font-bold text-xl text-gray-900 mb-2 group-hover:text-teal-700 transition-colors">
                                {doctor.name}
                              </h3>

                              <div className="inline-flex items-center justify-center bg-teal-50 text-teal-700 px-3 py-1 rounded-full text-sm font-semibold mb-3">
                                {doctor.specialty?.name ||
                                  doctor.specialization}
                              </div>

                              {/* Experience */}
                              {doctor.experience && (
                                <div className="text-sm text-gray-600 font-medium mb-2">
                                  {doctor.experience} Experience
                                </div>
                              )}

                              <div className="flex items-center justify-center text-gray-600 text-sm mb-4">
                                <MapPin
                                  size={14}
                                  className="mr-1 text-gray-400"
                                />
                                <span>
                                  {doctor.hospital?.name || "Hospital"}
                                </span>
                              </div>

                              {/* Patients Treated */}
                              {doctor.patientsTreated && (
                                <div className="text-sm text-teal-700 font-semibold mb-3 bg-teal-50 inline-block px-3 py-1 rounded-full">
                                  {doctor.patientsTreated} Patients Treated
                                </div>
                              )}

                              {/* Rating */}
                              <div className="flex items-center justify-center space-x-2 mb-3">
                                <div className="flex items-center bg-yellow-50 px-3 py-1.5 rounded-full">
                                  <Star
                                    size={16}
                                    className="text-yellow-400 fill-current mr-1"
                                  />
                                  <span className="text-sm font-bold text-gray-900">
                                    {doctor.rating}
                                  </span>
                                </div>
                                <span className="text-sm text-gray-500">
                                  ({doctor.reviews || "0"} reviews)
                                </span>
                              </div>

                              {/* Consultation Fee */}
                              {doctor.consultationFee && (
                                <div className="text-lg font-bold text-gray-900 mb-4">
                                  ₹{doctor.consultationFee}{" "}
                                  <span className="text-sm text-gray-500 font-normal">
                                    / consultation
                                  </span>
                                </div>
                              )}
                            </div>

                            {/* Book Button */}
                            <button
                              onClick={() => handleBookAppointment(doctor)}
                              className="w-full bg-gradient-to-r from-teal-500 to-emerald-500 text-white py-3 rounded-xl hover:from-teal-600 hover:to-emerald-600 transition-all duration-300 font-semibold shadow-md hover:shadow-lg transform hover:scale-105"
                            >
                              Book Appointment
                            </button>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              ))}
            </div>
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
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default PopularDoctors;
