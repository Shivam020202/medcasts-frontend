import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Star,
  MapPin,
  ChevronRight,
  ChevronLeft,
  Phone,
  Award,
  Users,
  MessageCircle,
  X,
  Calendar,
  Loader2,
  Quote,
} from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://medcasts-backend.onrender.com/api";
const SERVER_BASE_URL = import.meta.env.VITE_SERVER_BASE_URL || "https://medcasts-backend.onrender.com";

// Helper function to get image URL
const getImageUrl = (
  imagePath?: string,
  defaultImage: string = "/images/default.jpg"
): string => {
  if (!imagePath) return defaultImage;
  if (/^https?:\/\//i.test(imagePath)) {
    return imagePath;
  }
  const normalizedPath = imagePath.startsWith("/")
    ? imagePath
    : `/${imagePath.replace(/^\.\//, "")}`;
  return `${SERVER_BASE_URL}${normalizedPath}`;
};

interface Specialty {
  id: number;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  isActive: boolean;
}

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

interface Doctor {
  id: number;
  hospitalId: number;
  specialtyId: number;
  name: string;
  slug: string;
  specialization: string;
  experience: string;
  patientsTreated?: string;
  rating: number;
  reviews?: string;
  image?: string;
  qualifications?: string;
  expertise?: string;
  bio?: string;
  email?: string;
  phone?: string;
  consultationFee?: number;
  availableDays?: string;
  isActive: boolean;
  hospital?: {
    id: number;
    name: string;
  };
}

interface Treatment {
  id: number;
  hospitalId: number;
  specialtyId: number;
  name: string;
  slug: string;
  cost: string;
  description?: string;
  duration?: string;
  stay?: string;
  successRate?: number;
  procedureType?: string;
  isPopular?: boolean;
  isActive: boolean;
  hospital?: {
    id: number;
    name: string;
    location: string;
  };
  specialty?: {
    id: number;
    name: string;
  };
}

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

const PAGE_SIZE = 3;

const TreatmentPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  // State
  const [treatment, setTreatment] = useState<Treatment | null>(null);
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Pagination and filters
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState("Most Popular");
  const [searchTerm, setSearchTerm] = useState("");
  // const [activeFilter, setActiveFilter] = useState('All');

  // Testimonials slider
  const [currentTestimonialSlide, setCurrentTestimonialSlide] = useState(0);
  const [testimonialCardsPerSlide, setTestimonialCardsPerSlide] = useState(4);
  const [selectedPatient, setSelectedPatient] = useState<Testimonial | null>(
    null
  );

  // Doctors slider
  const [currentDoctorSlide, setCurrentDoctorSlide] = useState(0);
  const [doctorCardsPerSlide, setDoctorCardsPerSlide] = useState(4);

  // Fetch treatment data
  useEffect(() => {
    const fetchTreatmentData = async () => {
      if (!slug) return;

      try {
        setLoading(true);
        setError("");

        // Fetch all treatments and find by slug
        const treatmentResponse = await fetch(
          `${API_BASE_URL}/treatments?isActive=true&limit=1000`
        );
        const treatmentData = await treatmentResponse.json();

        if (!treatmentData.success) {
          throw new Error("Failed to load treatment");
        }

        const foundTreatment = treatmentData.data.treatments.find(
          (t: Treatment) => t.slug.toLowerCase() === slug.toLowerCase()
        );

        if (!foundTreatment) {
          setError("Treatment not found");
          setLoading(false);
          return;
        }

        setTreatment(foundTreatment);

        // Fetch hospitals that offer this treatment (filter by hospitalId or specialty)
        const hospitalsResponse = await fetch(
          `${API_BASE_URL}/hospitals?isActive=true&limit=100`
        );
        const hospitalsData = await hospitalsResponse.json();
        if (hospitalsData.success) {
          // Filter hospitals by specialty matching the treatment's specialty
          const filteredHospitals = hospitalsData.data.hospitals.filter(
            (h: Hospital) => h.specialty === foundTreatment.specialty?.name
          );
          setHospitals(filteredHospitals || []);
        }

        // Fetch doctors for this treatment's specialty
        if (foundTreatment.specialtyId) {
          const doctorsResponse = await fetch(
            `${API_BASE_URL}/doctors?specialtyId=${foundTreatment.specialtyId}&isActive=true&limit=100`
          );
          const doctorsData = await doctorsResponse.json();
          if (doctorsData.success) {
            setDoctors(doctorsData.data.doctors || []);
          }
        }

        // Fetch testimonials for this specific treatment
        const testimonialsResponse = await fetch(
          `${API_BASE_URL}/testimonials?isApproved=true&isActive=true&limit=100`
        );
        const testimonialsData = await testimonialsResponse.json();
        if (testimonialsData.success) {
          // Filter testimonials that match this treatment name
          const filteredTestimonials = (
            testimonialsData.data.testimonials || []
          ).filter(
            (t: Testimonial) =>
              t.treatment.toLowerCase() === foundTreatment.name.toLowerCase()
          );
          setTestimonials(filteredTestimonials);
        }

        setLoading(false);
      } catch (err) {
        console.error("Error fetching treatment data:", err);
        setError("Failed to load treatment page");
        setLoading(false);
      }
    };

    fetchTreatmentData();
  }, [slug]);

  // Responsive cards per slide
  useEffect(() => {
    const updateCardsPerSlide = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setTestimonialCardsPerSlide(1);
        setDoctorCardsPerSlide(1);
      } else if (width < 1024) {
        setTestimonialCardsPerSlide(2);
        setDoctorCardsPerSlide(2);
      } else if (width < 1280) {
        setTestimonialCardsPerSlide(3);
        setDoctorCardsPerSlide(3);
      } else {
        setTestimonialCardsPerSlide(4);
        setDoctorCardsPerSlide(4);
      }
      setCurrentTestimonialSlide(0);
      setCurrentDoctorSlide(0);
    };

    updateCardsPerSlide();
    window.addEventListener("resize", updateCardsPerSlide);
    return () => window.removeEventListener("resize", updateCardsPerSlide);
  }, []);

  // Filter and sort hospitals
  const sortedHospitals = [...hospitals].sort((a, b) => {
    if (sortBy === "Price: Low to High") {
      return 0; // Price sorting can be added if price field exists
    } else if (sortBy === "Price: High to Low") {
      return 0;
    } else {
      return b.rating - a.rating;
    }
  });

  const paginatedHospitals = sortedHospitals.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE
  );
  const totalPages = Math.ceil(sortedHospitals.length / PAGE_SIZE);

  // Filter testimonials
  const filteredTestimonials = testimonials.filter((testimonial) => {
    const search = searchTerm.toLowerCase();
    const matchesSearch =
      testimonial.patientName.toLowerCase().includes(search) ||
      (testimonial.country?.toLowerCase() || "").includes(search) ||
      testimonial.treatment.toLowerCase().includes(search);
    return matchesSearch;
  });

  const totalTestimonialSlides = Math.max(
    1,
    Math.ceil(filteredTestimonials.length / testimonialCardsPerSlide)
  );
  const totalDoctorSlides = Math.max(
    1,
    Math.ceil(doctors.length / doctorCardsPerSlide)
  );

  // Handlers
  const handleBookAppointment = (doctor: Doctor) => {
    const message = encodeURIComponent(
      `Hello! I would like to book an appointment with Dr. ${doctor.name} (${doctor.specialization}). Please provide available slots.`
    );
    const whatsappUrl = `https://wa.me/919643452714?text=${message}`;
    window.open(whatsappUrl, "_blank");
  };

  const nextTestimonialSlide = () => {
    setCurrentTestimonialSlide((prev) => (prev + 1) % totalTestimonialSlides);
  };

  const prevTestimonialSlide = () => {
    setCurrentTestimonialSlide(
      (prev) => (prev - 1 + totalTestimonialSlides) % totalTestimonialSlides
    );
  };

  const nextDoctorSlide = () => {
    setCurrentDoctorSlide((prev) => (prev + 1) % totalDoctorSlides);
  };

  const prevDoctorSlide = () => {
    setCurrentDoctorSlide(
      (prev) => (prev - 1 + totalDoctorSlides) % totalDoctorSlides
    );
  };

  const getGridCols = (cardsPerSlide: number) => {
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

  // Loading state
  if (loading) {
    return (
      <>
        <Header />
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-50 to-cyan-50">
          <div className="text-center">
            <Loader2 className="w-16 h-16 text-teal-600 animate-spin mx-auto mb-4" />
            <p className="text-gray-600 text-lg">Loading specialty page...</p>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  // Error state
  if (error || !treatment) {
    return (
      <>
        <Header />
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-50 to-cyan-50">
          <div className="text-center">
            <p className="text-red-600 text-xl mb-4">
              {error || "Treatment not found"}
            </p>
            <button
              onClick={() => navigate("/")}
              className="px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700"
            >
              Go Back Home
            </button>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-teal-50 to-cyan-50">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-r from-teal-600 to-cyan-600 text-white py-20">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
                {treatment.name}
              </h1>
              {treatment.specialty && (
                <p className="text-lg text-teal-100">
                  Specialty: {treatment.specialty.name}
                </p>
              )}
              {treatment.description && (
                <p className="text-xl md:text-2xl text-teal-100 max-w-3xl mx-auto mt-4">
                  {treatment.description}
                </p>
              )}
              <div className="mt-8 flex flex-wrap justify-center gap-4">
                {treatment.cost && (
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-3">
                    <p className="text-sm text-teal-100">Cost</p>
                    <p className="text-2xl font-bold">{treatment.cost}</p>
                  </div>
                )}
                {treatment.duration && (
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-3">
                    <p className="text-sm text-teal-100">Duration</p>
                    <p className="text-2xl font-bold">{treatment.duration}</p>
                  </div>
                )}
                {treatment.successRate && (
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-3">
                    <p className="text-sm text-teal-100">Success Rate</p>
                    <p className="text-2xl font-bold">
                      {treatment.successRate}%
                    </p>
                  </div>
                )}
                <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-3">
                  <p className="text-sm text-teal-100">Hospitals</p>
                  <p className="text-2xl font-bold">{hospitals.length}+</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-3">
                  <p className="text-sm text-teal-100">Doctors</p>
                  <p className="text-2xl font-bold">{doctors.length}+</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Hospitals Section */}
        {hospitals.length > 0 && (
          <section className="py-16">
            <div className="max-w-7xl mx-auto px-4">
              <div className="mb-8">
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                  Hospitals Offering {treatment.name}
                </h2>
                <p className="text-gray-600">
                  World-class facilities specialized in this treatment
                </p>
              </div>

              {/* Sort and Filter */}
              <div className="mb-6 flex flex-wrap gap-4 items-center">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-teal-500"
                >
                  <option>Most Popular</option>
                  <option>Highest Rated</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                </select>
              </div>

              {/* Hospital Cards */}
              <div className="space-y-6">
                {paginatedHospitals.map((hospital) => (
                  <div
                    key={hospital.id}
                    className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 border-2 border-gray-100 hover:border-teal-300"
                  >
                    <div className="grid md:grid-cols-3 gap-6">
                      {/* Hospital Image */}
                      <div className="relative h-64 md:h-auto">
                        <img
                          src={getImageUrl(
                            hospital.image,
                            "/images/default-hospital.jpg"
                          )}
                          alt={hospital.name}
                          className="w-full h-full object-cover"
                        />
                        {hospital.accreditation && (
                          <div className="absolute top-4 left-4 bg-teal-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                            {hospital.accreditation}
                          </div>
                        )}
                      </div>

                      {/* Hospital Details */}
                      <div className="md:col-span-2 p-6">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-2">
                              {hospital.name}
                            </h3>
                            <div className="flex items-center text-gray-600 mb-2">
                              <MapPin
                                size={16}
                                className="mr-2 text-teal-600"
                              />
                              <span>
                                {hospital.city}, {hospital.state},{" "}
                                {hospital.country}
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center bg-yellow-50 px-3 py-1 rounded-full">
                            <Star
                              size={18}
                              className="text-yellow-400 fill-current mr-1"
                            />
                            <span className="font-bold text-gray-900">
                              {hospital.rating}
                            </span>
                          </div>
                        </div>

                        {hospital.description && (
                          <p className="text-gray-600 mb-4 line-clamp-2">
                            {hospital.description}
                          </p>
                        )}

                        <div className="flex flex-wrap gap-2 mb-4">
                          {hospital.phone && (
                            <div className="flex items-center text-sm text-gray-600">
                              <Phone size={14} className="mr-1 text-teal-600" />
                              {hospital.phone}
                            </div>
                          )}
                          {hospital.establishedYear && (
                            <div className="flex items-center text-sm text-gray-600">
                              <Calendar
                                size={14}
                                className="mr-1 text-teal-600"
                              />
                              Est. {hospital.establishedYear}
                            </div>
                          )}
                          {hospital.bedCapacity && (
                            <div className="flex items-center text-sm text-gray-600">
                              <Users size={14} className="mr-1 text-teal-600" />
                              {hospital.bedCapacity} Beds
                            </div>
                          )}
                        </div>

                        <div className="flex gap-3">
                          <button
                            onClick={() => {
                              const message = encodeURIComponent(
                                `Hello! I'm interested in ${treatment.name} treatment at ${hospital.name}. Please provide more information.`
                              );
                              window.open(
                                `https://wa.me/919643452714?text=${message}`,
                                "_blank"
                              );
                            }}
                            className="flex-1 bg-teal-600 text-white px-6 py-3 rounded-lg hover:bg-teal-700 transition-colors font-semibold"
                          >
                            Book Appointment
                          </button>
                          {hospital.website && (
                            <a
                              href={hospital.website}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-6 py-3 border-2 border-teal-600 text-teal-600 rounded-lg hover:bg-teal-50 transition-colors font-semibold"
                            >
                              Visit Website
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center gap-2 mt-8">
                  <button
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={page === 1}
                    className="p-2 rounded-lg border-2 border-gray-200 hover:border-teal-500 disabled:opacity-50"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (p) => (
                      <button
                        key={p}
                        onClick={() => setPage(p)}
                        className={`px-4 py-2 rounded-lg font-semibold ${
                          page === p
                            ? "bg-teal-600 text-white"
                            : "border-2 border-gray-200 hover:border-teal-500"
                        }`}
                      >
                        {p}
                      </button>
                    )
                  )}
                  <button
                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                    disabled={page === totalPages}
                    className="p-2 rounded-lg border-2 border-gray-200 hover:border-teal-500 disabled:opacity-50"
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>
              )}
            </div>
          </section>
        )}

        {/* Doctors Section */}
        {doctors.length > 0 && (
          <section className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4">
              <div className="flex flex-col md:flex-row justify-between items-center mb-8">
                <div>
                  <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                    Expert Doctors for {treatment.name}
                  </h2>
                  <p className="text-gray-600">
                    Experienced specialists dedicated to your care
                  </p>
                </div>
                {totalDoctorSlides > 1 && (
                  <div className="flex gap-2 mt-4 md:mt-0">
                    <button
                      onClick={prevDoctorSlide}
                      className="p-2 bg-white rounded-full shadow-lg hover:shadow-xl border-2 border-teal-200 hover:border-teal-300"
                    >
                      <ChevronLeft size={20} className="text-teal-600" />
                    </button>
                    <button
                      onClick={nextDoctorSlide}
                      className="p-2 bg-white rounded-full shadow-lg hover:shadow-xl border-2 border-teal-200 hover:border-teal-300"
                    >
                      <ChevronRight size={20} className="text-teal-600" />
                    </button>
                  </div>
                )}
              </div>

              <div className="overflow-hidden">
                <div
                  className="flex transition-transform duration-500 ease-in-out"
                  style={{
                    transform: `translateX(-${
                      currentDoctorSlide * (100 / totalDoctorSlides)
                    }%)`,
                    width: `${totalDoctorSlides * 100}%`,
                  }}
                >
                  {Array.from({ length: totalDoctorSlides }).map(
                    (_, slideIndex) => {
                      const startIndex = slideIndex * doctorCardsPerSlide;
                      const slideDoctors = doctors.slice(
                        startIndex,
                        startIndex + doctorCardsPerSlide
                      );

                      return (
                        <div
                          key={slideIndex}
                          className="flex-shrink-0"
                          style={{ width: `${100 / totalDoctorSlides}%` }}
                        >
                          <div
                            className={`grid gap-6 ${getGridCols(
                              doctorCardsPerSlide
                            )} px-2`}
                          >
                            {slideDoctors.map((doctor) => (
                              <div
                                key={doctor.id}
                                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 border-2 border-gray-100 hover:border-teal-300"
                              >
                                <div className="relative h-48">
                                  <img
                                    src={getImageUrl(
                                      doctor.image,
                                      "/images/default-doctor.jpg"
                                    )}
                                    alt={doctor.name}
                                    className="w-full h-full object-cover"
                                  />
                                  <div className="absolute top-4 right-4 bg-yellow-50 px-3 py-1 rounded-full">
                                    <div className="flex items-center">
                                      <Star
                                        size={14}
                                        className="text-yellow-400 fill-current mr-1"
                                      />
                                      <span className="text-sm font-bold">
                                        {doctor.rating}
                                      </span>
                                    </div>
                                  </div>
                                </div>

                                <div className="p-5">
                                  <h3 className="text-xl font-bold text-gray-900 mb-1">
                                    Dr. {doctor.name}
                                  </h3>
                                  <p className="text-sm text-teal-600 mb-3">
                                    {doctor.specialization}
                                  </p>

                                  <div className="space-y-2 mb-4">
                                    <div className="flex items-center text-sm text-gray-600">
                                      <Award
                                        size={14}
                                        className="mr-2 text-teal-600"
                                      />
                                      {doctor.experience}
                                    </div>
                                    {doctor.patientsTreated && (
                                      <div className="flex items-center text-sm text-gray-600">
                                        <Users
                                          size={14}
                                          className="mr-2 text-teal-600"
                                        />
                                        {doctor.patientsTreated}
                                      </div>
                                    )}
                                    {doctor.hospital && (
                                      <div className="flex items-center text-sm text-gray-600">
                                        <MapPin
                                          size={14}
                                          className="mr-2 text-teal-600"
                                        />
                                        {doctor.hospital.name}
                                      </div>
                                    )}
                                  </div>

                                  <button
                                    onClick={() =>
                                      handleBookAppointment(doctor)
                                    }
                                    className="w-full bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors font-semibold flex items-center justify-center"
                                  >
                                    <MessageCircle size={16} className="mr-2" />
                                    Book Appointment
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      );
                    }
                  )}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Testimonials Section */}
        {testimonials.length > 0 && (
          <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
            <div className="max-w-7xl mx-auto px-4">
              <div className="flex flex-col md:flex-row justify-between items-center mb-8">
                <div>
                  <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                    Patient Success Stories
                  </h2>
                  <p className="text-gray-600">
                    Real experiences from real patients
                  </p>
                </div>
                {totalTestimonialSlides > 1 && (
                  <div className="flex gap-2 mt-4 md:mt-0">
                    <button
                      onClick={prevTestimonialSlide}
                      className="p-2 bg-white rounded-full shadow-lg hover:shadow-xl border-2 border-teal-200 hover:border-teal-300"
                    >
                      <ChevronLeft size={20} className="text-teal-600" />
                    </button>
                    <button
                      onClick={nextTestimonialSlide}
                      className="p-2 bg-white rounded-full shadow-lg hover:shadow-xl border-2 border-teal-200 hover:border-teal-300"
                    >
                      <ChevronRight size={20} className="text-teal-600" />
                    </button>
                  </div>
                )}
              </div>

              {/* Search and Filter */}
              <div className="mb-6">
                <input
                  type="text"
                  placeholder="Search testimonials..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-teal-500"
                />
              </div>

              <div className="overflow-hidden">
                <div
                  className="flex transition-transform duration-500 ease-in-out"
                  style={{
                    transform: `translateX(-${
                      currentTestimonialSlide * (100 / totalTestimonialSlides)
                    }%)`,
                    width: `${totalTestimonialSlides * 100}%`,
                  }}
                >
                  {Array.from({ length: totalTestimonialSlides }).map(
                    (_, slideIndex) => {
                      const startIndex = slideIndex * testimonialCardsPerSlide;
                      const slideTestimonials = filteredTestimonials.slice(
                        startIndex,
                        startIndex + testimonialCardsPerSlide
                      );

                      return (
                        <div
                          key={slideIndex}
                          className="flex-shrink-0"
                          style={{ width: `${100 / totalTestimonialSlides}%` }}
                        >
                          <div
                            className={`grid gap-6 ${getGridCols(
                              testimonialCardsPerSlide
                            )} px-2`}
                          >
                            {slideTestimonials.map((testimonial) => (
                              <div
                                key={testimonial.id}
                                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 border-2 border-gray-100 hover:border-teal-300 cursor-pointer"
                                onClick={() => setSelectedPatient(testimonial)}
                              >
                                <div className="relative h-48">
                                  <img
                                    src={getImageUrl(
                                      testimonial.image,
                                      "/images/default-patient.jpg"
                                    )}
                                    alt={testimonial.patientName}
                                    className="w-full h-full object-cover"
                                  />
                                  <div className="absolute top-4 right-4 bg-white/90 rounded-full p-2">
                                    <Quote
                                      size={16}
                                      className="text-teal-600"
                                    />
                                  </div>
                                </div>

                                <div className="p-5">
                                  <div className="flex justify-between items-start mb-3">
                                    <div>
                                      <h3 className="font-bold text-lg text-gray-900">
                                        {testimonial.patientName}
                                      </h3>
                                      <p className="text-sm text-gray-600">
                                        {testimonial.age &&
                                          `Age ${testimonial.age} • `}
                                        {testimonial.country}
                                      </p>
                                    </div>
                                    <div className="flex items-center bg-yellow-50 px-2 py-1 rounded-full">
                                      <Star
                                        size={14}
                                        className="text-yellow-400 fill-current mr-1"
                                      />
                                      <span className="text-sm font-bold">
                                        {testimonial.rating}
                                      </span>
                                    </div>
                                  </div>

                                  <p className="text-sm text-gray-600 mb-3 line-clamp-3">
                                    {testimonial.story}
                                  </p>

                                  <div className="text-xs text-gray-500">
                                    {testimonial.hospital && (
                                      <div className="flex items-center mb-1">
                                        <MapPin size={12} className="mr-1" />
                                        {testimonial.hospital.name}
                                      </div>
                                    )}
                                    <div className="text-teal-600 font-semibold">
                                      {testimonial.treatment}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      );
                    }
                  )}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Testimonial Modal */}
        {selectedPatient && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
              <div className="relative">
                <img
                  src={getImageUrl(
                    selectedPatient.image,
                    "/images/default-patient.jpg"
                  )}
                  alt={selectedPatient.patientName}
                  className="w-full h-64 object-cover"
                />
                <button
                  onClick={() => setSelectedPatient(null)}
                  className="absolute top-4 right-4 bg-white rounded-full p-2 hover:bg-gray-100"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-1">
                      {selectedPatient.patientName}
                    </h2>
                    <p className="text-gray-600">
                      {selectedPatient.age && `Age ${selectedPatient.age} • `}
                      {selectedPatient.country}
                    </p>
                  </div>
                  <div className="flex items-center bg-yellow-50 px-3 py-1 rounded-full">
                    <Star
                      size={18}
                      className="text-yellow-400 fill-current mr-1"
                    />
                    <span className="font-bold">{selectedPatient.rating}</span>
                  </div>
                </div>

                <div className="mb-4 p-4 bg-teal-50 rounded-lg">
                  <p className="text-sm text-teal-600 font-semibold mb-1">
                    Treatment
                  </p>
                  <p className="text-gray-900">{selectedPatient.treatment}</p>
                </div>

                {selectedPatient.hospital && (
                  <div className="mb-4 flex items-center text-gray-600">
                    <MapPin size={16} className="mr-2 text-teal-600" />
                    <span>{selectedPatient.hospital.name}</span>
                  </div>
                )}

                {selectedPatient.doctor && (
                  <div className="mb-4 flex items-center text-gray-600">
                    <Users size={16} className="mr-2 text-teal-600" />
                    <span>Dr. {selectedPatient.doctor.name}</span>
                  </div>
                )}

                <div className="mb-4">
                  <Quote size={24} className="text-teal-600 mb-2" />
                  <p className="text-gray-700 leading-relaxed italic">
                    {selectedPatient.story}
                  </p>
                </div>

                {selectedPatient.date && (
                  <div className="text-sm text-gray-500 flex items-center">
                    <Calendar size={14} className="mr-2" />
                    {new Date(selectedPatient.date).toLocaleDateString()}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Empty States */}
        {hospitals.length === 0 &&
          doctors.length === 0 &&
          testimonials.length === 0 && (
            <section className="py-16">
              <div className="max-w-7xl mx-auto px-4 text-center">
                <p className="text-gray-600 text-lg">
                  Content for {treatment.name} is being added. Please check back
                  soon!
                </p>
              </div>
            </section>
          )}
      </div>
      <Footer />
    </>
  );
};

export default TreatmentPage;
