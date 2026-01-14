import { useState, useEffect } from "react";
import {
  Star,
  ChevronLeft,
  ChevronRight,
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
    <section id="doctors" className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col items-center text-center mb-12 md:flex-row md:justify-between md:items-center md:text-left">
          <h2 className="text-4xl font-bold text-gray-900 mb-4 md:mb-0">Popular doctors</h2>

          {/* Navigation Arrows in Corner */}
          {totalSlides > 1 && (
            <div className="flex space-x-2">
              <button
                onClick={prevSlide}
                className="bg-white rounded-full p-2 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={currentSlide === 0}
              >
                <ChevronLeft size={20} className="text-gray-600" />
              </button>

              <button
                onClick={nextSlide}
                className="bg-white rounded-full p-2 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={currentSlide === totalSlides - 1}
              >
                <ChevronRight size={20} className="text-gray-600" />
              </button>
            </div>
          )}
        </div>

        <div className="relative">
          {/* Slider Container */}
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
                          className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer text-center border border-gray-100"
                        >
                          <div className="relative mb-4">
                            <img
                              src={
                                doctor.image?.startsWith("/uploads")
                                  ? `${SERVER_BASE_URL}${doctor.image}`
                                  : doctor.image || "/images/default-doctor.jpg"
                              }
                              alt={doctor.name}
                              className="w-20 h-20 rounded-full mx-auto object-cover border-2 border-gray-100"
                              onError={(e) => {
                                (e.target as HTMLImageElement).src =
                                  "/images/default-doctor.jpg";
                              }}
                            />
                          </div>
                          <h3 className="font-bold text-lg text-gray-900 mb-2">
                            {doctor.name}
                          </h3>
                          <p className="text-gray-600 text-sm mb-1">
                            {doctor.specialty?.name || doctor.specialization}
                          </p>
                          <p className="text-gray-500 text-xs mb-3">
                            {doctor.hospital?.name || "Hospital"}
                          </p>
                          <div className="flex items-center justify-center space-x-1 mb-4">
                            <div className="flex">
                              {[...Array(Math.floor(doctor.rating || 0))].map(
                                (_, i) => (
                                  <Star
                                    key={i}
                                    size={16}
                                    className="text-yellow-400 fill-current"
                                  />
                                )
                              )}
                            </div>
                            <span className="text-sm font-semibold text-gray-900">
                              {doctor.rating}
                            </span>
                            <span className="text-sm text-gray-500">
                              ({doctor.reviews || "0"} reviews)
                            </span>
                          </div>
                          <button
                            onClick={() => handleBookAppointment(doctor)}
                            className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors font-semibold"
                          >
                            Book Appointment
                          </button>
                        </div>
                      ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PopularDoctors;
