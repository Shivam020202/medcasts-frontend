import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import {
  ChevronRight,
  ChevronLeft,
  ChevronDown,
  ChevronUp,
  Star,
  MapPin,
  Phone,
  Mail,
  Plane,
  Car,
  CheckCircle,
  Shield,
  Award,
  Quote,
} from "lucide-react";

interface Hospital {
  id: number;
  name: string;
  slug: string;
  city: string;
  state: string;
  country?: string;
  phone: string;
  email: string;
  address: string;
  logoUrl?: string;
  image?: string;
  rating?: number;
  description?: string;
  accreditation?: string;
  website?: string;
  establishedYear?: number;
  bedCapacity?: number;
  mapEmbedUrl?: string;
  airportDistance?: string;
}

interface Specialty {
  id: number;
  name: string;
  slug: string;
  description?: string;
  iconUrl?: string;
}

interface Doctor {
  id: number;
  name: string;
  qualifications?: string;
  specialization?: string;
  experience?: string;
  imageUrl?: string;
  image?: string;
  rating?: number;
  patientsTreated?: string;
  reviews?: string;
  bio?: string;
  email?: string;
  phone?: string;
  consultationFee?: number;
  expertise?: string[];
}

interface Treatment {
  id: number;
  name: string;
  description?: string;
  cost?: string | number;
  estimatedCost?: string;
  duration?: string;
  stay?: string;
  successRate?: number;
  procedureType?: string;
  isPopular?: boolean;
}

interface Testimonial {
  id: number;
  patientName: string;
  patientCountry?: string;
  age?: number;
  country?: string;
  rating?: number;
  comment?: string;
  story?: string;
  treatmentDate?: string;
  date?: string;
  image?: string;
  treatment?: string;
}

interface HospitalSpecialtyData {
  hospital: Hospital;
  specialty: Specialty;
  doctors: Doctor[];
  treatments: Treatment[];
  testimonials: Testimonial[];
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://medcasts-backend.onrender.com/api";

const HospitalSpecialtyPage = () => {
  const { hospitalSlug, specialtySlug } = useParams<{
    hospitalSlug: string;
    specialtySlug: string;
  }>();
  const [data, setData] = useState<HospitalSpecialtyData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // State for expandable sections
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  // State for carousels
  const [currentDoctorSlide, setCurrentDoctorSlide] = useState(0);
  const [currentTestimonialSlide, setCurrentTestimonialSlide] = useState(0);
  const [doctorsPerSlide, setDoctorsPerSlide] = useState(3);
  const [testimonialsPerSlide, setTestimonialsPerSlide] = useState(2);

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  useEffect(() => {
    const fetchData = async () => {
      if (!hospitalSlug || !specialtySlug) {
        setError("Missing hospital or specialty information");
        setLoading(false);
        return;
      }

      try {
        console.log(
          "Fetching:",
          `${API_BASE_URL}/hospitals/${hospitalSlug}/${specialtySlug}`
        );
        const response = await fetch(
          `${API_BASE_URL}/hospitals/${hospitalSlug}/${specialtySlug}`
        );

        if (!response.ok) {
          const errorText = await response.text();
          console.error("API Error:", response.status, errorText);
          throw new Error(`Failed to fetch: ${response.status}`);
        }

        const result = await response.json();
        console.log("API Response:", result);

        if (result.success && result.data) {
          setData(result.data);
        } else {
          throw new Error("Invalid response format");
        }
      } catch (err) {
        console.error("Fetch error:", err);
        setError(err instanceof Error ? err.message : "Failed to load data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [hospitalSlug, specialtySlug]);

  useEffect(() => {
    const updateSlidesPerView = () => {
      if (window.innerWidth < 768) {
        setDoctorsPerSlide(1);
        setTestimonialsPerSlide(1);
      } else if (window.innerWidth < 1024) {
        setDoctorsPerSlide(2);
        setTestimonialsPerSlide(1);
      } else {
        setDoctorsPerSlide(3);
        setTestimonialsPerSlide(2);
      }
      setCurrentDoctorSlide(0);
      setCurrentTestimonialSlide(0);
    };

    updateSlidesPerView();
    window.addEventListener("resize", updateSlidesPerView);
    return () => window.removeEventListener("resize", updateSlidesPerView);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">Loading...</div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto">
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
              <h2 className="text-2xl font-bold text-red-800 mb-4">
                Page Not Found
              </h2>
              <p className="text-red-600 mb-4">
                {error || "No data available"}
              </p>
              <div className="bg-white rounded-lg p-4 mb-4">
                <p className="text-sm text-gray-700 mb-2">
                  You tried to access:
                </p>
                <code className="text-sm bg-gray-100 px-3 py-1 rounded text-gray-800">
                  /hospital/{hospitalSlug}/{specialtySlug}
                </code>
              </div>
              <div className="space-y-2 text-left">
                <p className="text-sm text-gray-700 font-semibold">
                  Common issues:
                </p>
                <ul className="text-sm text-gray-600 space-y-1 list-disc list-inside">
                  <li>
                    Check the hospital slug (e.g., "artemis-hospital" not
                    "artemis")
                  </li>
                  <li>
                    Check the specialty slug (e.g., "orthopedics" not
                    "orthopaedics")
                  </li>
                  <li>
                    This hospital-specialty combination may not be assigned in
                    the admin panel
                  </li>
                </ul>
              </div>
              <div className="mt-6 flex gap-3 justify-center">
                <button
                  onClick={() => (window.location.href = "/hospital-directory")}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
                >
                  View All Combinations
                </button>
                <button
                  onClick={() => (window.location.href = "/")}
                  className="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition"
                >
                  Go Home
                </button>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const { hospital, specialty, doctors, treatments, testimonials } = data;

  const totalDoctorSlides =
    doctors.length > 0 ? Math.ceil(doctors.length / doctorsPerSlide) : 0;
  const totalTestimonialSlides =
    testimonials.length > 0
      ? Math.ceil(testimonials.length / testimonialsPerSlide)
      : 0;

  const nextDoctorSlide = () => {
    if (totalDoctorSlides > 0) {
      setCurrentDoctorSlide((prev) => (prev + 1) % totalDoctorSlides);
    }
  };

  const prevDoctorSlide = () => {
    if (totalDoctorSlides > 0) {
      setCurrentDoctorSlide(
        (prev) => (prev - 1 + totalDoctorSlides) % totalDoctorSlides
      );
    }
  };

  const nextTestimonialSlide = () => {
    if (totalTestimonialSlides > 0) {
      setCurrentTestimonialSlide((prev) => (prev + 1) % totalTestimonialSlides);
    }
  };

  const prevTestimonialSlide = () => {
    if (totalTestimonialSlides > 0) {
      setCurrentTestimonialSlide(
        (prev) => (prev - 1 + totalTestimonialSlides) % totalTestimonialSlides
      );
    }
  };

  const getDoctorGridCols = () => {
    if (doctorsPerSlide === 1) return "grid-cols-1";
    if (doctorsPerSlide === 2) return "grid-cols-1 md:grid-cols-2";
    return "grid-cols-1 md:grid-cols-2 lg:grid-cols-3";
  };

  const getTestimonialGridCols = () => {
    if (testimonialsPerSlide === 1) return "grid-cols-1";
    return "grid-cols-1 lg:grid-cols-2";
  };

  // Get the first treatment cost for sidebar display
  const startingPrice = (() => {
    if (treatments.length > 0) {
      if (treatments[0].cost) {
        const costValue =
          typeof treatments[0].cost === "string"
            ? parseInt(treatments[0].cost)
            : treatments[0].cost;
        return `$${costValue.toLocaleString()}`;
      } else if (treatments[0].estimatedCost) {
        return treatments[0].estimatedCost;
      }
    }
    return "$2,800";
  })();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            {/* Hero Section with Images */}
            <div className="bg-gradient-to-br from-teal-50 via-white to-blue-50 rounded-2xl p-6 lg:p-8 shadow-lg">
              <div className="flex items-center space-x-2 text-sm text-gray-600 mb-6">
                <span className="hover:text-teal-600 cursor-pointer">Home</span>
                <ChevronRight className="w-4 h-4" />
                <span className="hover:text-teal-600 cursor-pointer">
                  Specialties
                </span>
                <ChevronRight className="w-4 h-4" />
                <span className="text-teal-600 font-medium">
                  {specialty.name}
                </span>
              </div>

              <div className="mb-6">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 leading-tight">
                  Affordable{" "}
                  <span className="text-teal-600">
                    {specialty.name} Excellence
                  </span>
                </h1>
                <p className="text-base sm:text-lg text-gray-600 mb-4 leading-relaxed max-w-3xl">
                  {specialty.description ||
                    `Comprehensive ${specialty.name} care with advanced techniques and personalized treatment protocols at affordable prices.`}
                </p>
              </div>

              {/* Image Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="relative group overflow-hidden rounded-xl shadow-lg">
                  <img
                    src={
                      hospital.image ||
                      hospital.logoUrl ||
                      "/images/Artimes-hospital.png"
                    }
                    alt={`${hospital.name} - Affordable ${specialty.name} Excellence`}
                    className="w-full h-48 sm:h-56 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  <div className="absolute top-4 left-4 bg-teal-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                    🏆 {specialty.name} Excellence
                  </div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="font-bold text-lg">{hospital.name}</h3>
                    <p className="text-sm opacity-90">
                      {hospital.rating && `⭐ ${hospital.rating}/5`} •
                      Affordable {specialty.name} Center
                    </p>
                  </div>
                </div>

                <div className="grid grid-rows-2 gap-4">
                  <div className="relative group overflow-hidden rounded-xl shadow-lg">
                    <img
                      src="/images/ortho/Advanced-Tech.png"
                      alt={`Advanced ${specialty.name} Equipment`}
                      className="w-full h-24 sm:h-28 object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-teal-600/80 to-transparent flex items-center">
                      <div className="text-white p-4">
                        <h4 className="font-bold text-sm">
                          🔬 Advanced Technology
                        </h4>
                        <p className="text-xs opacity-90">
                          Precision Treatment
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="relative group overflow-hidden rounded-xl shadow-lg">
                    <img
                      src="https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=150&fit=crop"
                      alt={`Comprehensive ${specialty.name} Care`}
                      className="w-full h-28 sm:h-32 object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600/80 to-transparent flex items-center">
                      <div className="text-white p-4">
                        <h4 className="font-bold text-sm">
                          🏥 Comprehensive Care
                        </h4>
                        <p className="text-xs opacity-90">
                          Multidisciplinary Team
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Features Grid */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition-shadow border border-teal-100">
                  <div className="text-2xl mb-2">🤖</div>
                  <div className="text-sm font-bold text-gray-900 mb-1">
                    Robotic Surgery
                  </div>
                  <div className="text-xs text-gray-600">
                    Advanced Technology
                  </div>
                </div>
                <div className="bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition-shadow border border-teal-100">
                  <div className="text-2xl mb-2">👨‍⚕️</div>
                  <div className="text-sm font-bold text-gray-900 mb-1">
                    Expert Team
                  </div>
                  <div className="text-xs text-gray-600">
                    Specialist Doctors
                  </div>
                </div>
                <div className="bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition-shadow border border-teal-100">
                  <div className="text-2xl mb-2">📊</div>
                  <div className="text-sm font-bold text-gray-900 mb-1">
                    99.1% Success
                  </div>
                  <div className="text-xs text-gray-600">Proven Results</div>
                </div>
                <div className="bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition-shadow border border-teal-100">
                  <div className="text-2xl mb-2">🏆</div>
                  <div className="text-sm font-bold text-gray-900 mb-1">
                    {hospital.accreditation || "JCI Certified"}
                  </div>
                  <div className="text-xs text-gray-600">
                    International Standards
                  </div>
                </div>
              </div>
            </div>

            {/* Location & Accessibility with Google Maps */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Hospital Location & Accessibility
              </h2>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-4">
                  <div className="flex items-center p-4 bg-teal-50 rounded-lg border border-teal-100">
                    <Plane className="w-6 h-6 text-teal-600 mr-3" />
                    <div>
                      <div className="font-semibold text-gray-900">
                        {hospital.airportDistance ||
                          "35 minutes from Delhi Airport"}
                      </div>
                      <div className="text-sm text-gray-600">
                        IGI Airport (DEL) - Direct connectivity
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center p-4 bg-teal-50 rounded-lg border border-teal-100">
                    <Car className="w-6 h-6 text-teal-600 mr-3" />
                    <div>
                      <div className="font-semibold text-gray-900">
                        Metro Access
                      </div>
                      <div className="text-sm text-gray-600">
                        Huda City Center Metro
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center p-4 bg-teal-50 rounded-lg border border-teal-100">
                    <MapPin className="w-6 h-6 text-teal-600 mr-3" />
                    <div>
                      <div className="font-semibold text-gray-900">
                        Prime Location
                      </div>
                      <div className="text-sm text-gray-600">
                        {hospital.address ||
                          `${hospital.city}, ${hospital.state}`}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Google Maps Integration */}
                <div className="bg-gray-100 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-3">
                    Hospital Location
                  </h3>
                  <div className="bg-white rounded-lg overflow-hidden shadow-sm">
                    <iframe
                      src={
                        hospital.mapEmbedUrl ||
                        `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d172673.23096454516!2d76.97632531403718!3d28.49025518723343!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d1883aaaaaaab%3A0x404085140375fa28!2s${encodeURIComponent(
                          hospital.name
                        )}!5e0!3m2!1sen!2sin!4v1755680098964!5m2!1sen!2sin`
                      }
                      width="100%"
                      height="200"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      className="rounded-lg"
                    ></iframe>
                  </div>
                  <div className="mt-3 text-center">
                    <a
                      href={`https://maps.google.com/?q=${encodeURIComponent(
                        hospital.name + " " + hospital.city
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-teal-600 text-sm font-medium hover:underline"
                    >
                      View Larger Map & Get Directions
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* About Department */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                About the Department
              </h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  {hospital.name} {specialty.name} Department is a
                  state-of-the-art comprehensive care center offering advanced
                  treatment at the most affordable prices.
                </p>
                <p>
                  Our multidisciplinary team of specialists, surgeons, and
                  support staff provide personalized treatment plans using the
                  latest technology and evidence-based protocols with
                  exceptional affordability.
                </p>
              </div>
            </div>

            {/* Treatment Plans - Collapsible */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Treatment Plans
              </h2>

              <div className="space-y-4">
                <div className="border border-gray-200 rounded-xl overflow-hidden">
                  <button
                    onClick={() => toggleSection("consultation")}
                    className="w-full p-5 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-teal-500 rounded-full mr-4"></div>
                      <span className="font-semibold text-lg">
                        Consultation & Diagnosis
                      </span>
                    </div>
                    {expandedSection === "consultation" ? (
                      <ChevronUp className="w-5 h-5" />
                    ) : (
                      <ChevronDown className="w-5 h-5" />
                    )}
                  </button>
                  {expandedSection === "consultation" && (
                    <div className="px-5 pb-5 text-gray-600 leading-relaxed">
                      Comprehensive diagnosis, advanced imaging studies, and
                      multidisciplinary treatment planning with affordable
                      consultation fees.
                    </div>
                  )}
                </div>

                <div className="border border-gray-200 rounded-xl overflow-hidden">
                  <button
                    onClick={() => toggleSection("treatment")}
                    className="w-full p-5 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-teal-500 rounded-full mr-4"></div>
                      <span className="font-semibold text-lg">
                        {specialty.name} Treatment
                      </span>
                    </div>
                    {expandedSection === "treatment" ? (
                      <ChevronUp className="w-5 h-5" />
                    ) : (
                      <ChevronDown className="w-5 h-5" />
                    )}
                  </button>
                  {expandedSection === "treatment" && (
                    <div className="px-5 pb-5 text-gray-600 leading-relaxed">
                      Advanced procedures and treatments with cost-effective
                      protocols.
                    </div>
                  )}
                </div>

                <div className="border border-gray-200 rounded-xl overflow-hidden">
                  <button
                    onClick={() => toggleSection("recovery")}
                    className="w-full p-5 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-teal-500 rounded-full mr-4"></div>
                      <span className="font-semibold text-lg">
                        Recovery & Support
                      </span>
                    </div>
                    {expandedSection === "recovery" ? (
                      <ChevronUp className="w-5 h-5" />
                    ) : (
                      <ChevronDown className="w-5 h-5" />
                    )}
                  </button>
                  {expandedSection === "recovery" && (
                    <div className="px-5 pb-5 text-gray-600 leading-relaxed">
                      Comprehensive post-treatment care, supportive services,
                      and rehabilitation programs with affordable follow-up
                      care.
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Treatments & Pricing */}
            {treatments.length > 0 && (
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Treatments & Pricing
                </h2>

                <div className="space-y-4">
                  {treatments.map((treatment) => (
                    <div
                      key={treatment.id}
                      className="bg-gradient-to-r from-white to-teal-50 border border-teal-200 rounded-xl p-4 hover:shadow-md transition-all duration-300"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-bold text-base text-gray-900 leading-tight">
                          {treatment.name}
                        </h3>
                        <div className="text-right">
                          <div className="text-lg font-bold text-teal-600">
                            {treatment.cost
                              ? `$${(typeof treatment.cost === "string"
                                  ? parseInt(treatment.cost)
                                  : treatment.cost
                                ).toLocaleString()}`
                              : treatment.estimatedCost || "Contact for price"}
                          </div>
                        </div>
                      </div>

                      <p className="text-gray-600 mb-3 leading-relaxed text-sm">
                        {treatment.description ||
                          "Comprehensive treatment protocol"}
                      </p>

                      <div className="grid grid-cols-2 gap-2 mb-3">
                        <div className="bg-teal-50 rounded-lg p-2 text-center border border-teal-100">
                          <div className="text-teal-600 font-semibold text-xs">
                            {treatment.duration || "1-2 weeks"}
                          </div>
                          <div className="text-gray-500 text-xs">
                            Treatment Duration
                          </div>
                        </div>
                        <div className="bg-teal-50 rounded-lg p-2 text-center border border-teal-100">
                          <div className="text-teal-600 font-semibold text-xs">
                            {treatment.stay || "3-5 days"}
                          </div>
                          <div className="text-gray-500 text-xs">
                            Hospital Stay
                          </div>
                        </div>
                      </div>

                      <button
                        className="w-full bg-teal-600 text-white py-2 rounded-lg hover:bg-teal-700 transition-all duration-300 font-semibold shadow-md hover:shadow-lg text-sm"
                        onClick={() =>
                          window.open(
                            `https://wa.me/${hospital.phone.replace(
                              /\D/g,
                              ""
                            )}?text=Hi, I'd like to know more about ${
                              treatment.name
                            } at ${hospital.name}.`,
                            "_blank"
                          )
                        }
                      >
                        Get Quote
                      </button>
                    </div>
                  ))}
                </div>

                <div className="mt-6 bg-amber-50 rounded-xl p-4 border border-amber-200">
                  <div className="flex items-center mb-2">
                    <span className="text-lg mr-2">💡</span>
                    <span className="font-semibold text-amber-800">
                      Pricing Information
                    </span>
                  </div>
                  <ul className="space-y-1 text-amber-700 text-sm">
                    <li>
                      • Most affordable care in India with international quality
                    </li>
                    <li>
                      • Prices include specialist fees, hospital charges, and
                      basic medications
                    </li>
                    <li>• Insurance coverage and EMI options available</li>
                    <li>• Free consultation for treatment planning</li>
                  </ul>
                </div>
              </div>
            )}

            {/* What's Included */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                What's Included in Our Care
              </h2>

              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-teal-50 rounded-xl p-5 border border-teal-100">
                  <div className="flex items-center mb-3">
                    <CheckCircle className="w-5 h-5 text-teal-500 mr-2" />
                    <span className="font-bold text-teal-800">
                      Pre-treatment Care
                    </span>
                  </div>
                  <ul className="text-teal-700 space-y-2 text-sm">
                    <li>• Comprehensive diagnosis</li>
                    <li>• Advanced imaging studies</li>
                    <li>• Multidisciplinary consultation</li>
                    <li>• Treatment planning</li>
                  </ul>
                </div>

                <div className="bg-teal-50 rounded-xl p-5 border border-teal-100">
                  <div className="flex items-center mb-3">
                    <CheckCircle className="w-5 h-5 text-teal-500 mr-2" />
                    <span className="font-bold text-teal-800">
                      Treatment & Hospital Stay
                    </span>
                  </div>
                  <ul className="text-teal-700 space-y-2 text-sm">
                    <li>• Surgery/procedure</li>
                    <li>• Specialist fees</li>
                    <li>• Hospital bed (private room)</li>
                    <li>• Nursing care 24/7</li>
                  </ul>
                </div>

                <div className="bg-teal-50 rounded-xl p-5 border border-teal-100">
                  <div className="flex items-center mb-3">
                    <CheckCircle className="w-5 h-5 text-teal-500 mr-2" />
                    <span className="font-bold text-teal-800">
                      Post-treatment Care
                    </span>
                  </div>
                  <ul className="text-teal-700 space-y-2 text-sm">
                    <li>• Follow-up consultations</li>
                    <li>• Supportive care services</li>
                    <li>• Medications & supplements</li>
                    <li>• Recovery monitoring</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Our Expert Doctors */}
            {doctors.length > 0 && (
              <div className="bg-gradient-to-br from-white to-teal-50 rounded-2xl shadow-lg p-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">
                      Meet Our Expert Doctors
                    </h2>
                    <p className="text-gray-600">
                      Experienced specialists with proven expertise
                    </p>
                  </div>

                  {totalDoctorSlides > 1 && (
                    <div className="flex space-x-2 mt-4 sm:mt-0">
                      <button
                        onClick={prevDoctorSlide}
                        className="bg-teal-100 hover:bg-teal-200 rounded-full p-2 transition-colors border border-teal-200"
                        disabled={currentDoctorSlide === 0}
                      >
                        <ChevronLeft size={20} className="text-teal-600" />
                      </button>
                      <button
                        onClick={nextDoctorSlide}
                        className="bg-teal-100 hover:bg-teal-200 rounded-full p-2 transition-colors border border-teal-200"
                        disabled={currentDoctorSlide === totalDoctorSlides - 1}
                      >
                        <ChevronRight size={20} className="text-teal-600" />
                      </button>
                    </div>
                  )}
                </div>

                <div className="relative overflow-hidden">
                  <div
                    className="flex transition-transform duration-500 ease-in-out"
                    style={{
                      transform: `translateX(-${currentDoctorSlide * 100}%)`,
                    }}
                  >
                    {Array.from({ length: totalDoctorSlides }).map(
                      (_, slideIndex) => (
                        <div key={slideIndex} className="w-full flex-shrink-0">
                          <div className={`grid gap-6 ${getDoctorGridCols()}`}>
                            {doctors
                              .slice(
                                slideIndex * doctorsPerSlide,
                                (slideIndex + 1) * doctorsPerSlide
                              )
                              .map((doctor) => (
                                <div
                                  key={doctor.id}
                                  className="bg-white rounded-lg p-5 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer border border-gray-100 group"
                                >
                                  <div className="text-center mb-4">
                                    <div className="relative mb-3">
                                      <img
                                        src={
                                          doctor.image ||
                                          doctor.imageUrl ||
                                          "https://via.placeholder.com/80"
                                        }
                                        alt={doctor.name}
                                        className="w-20 h-20 rounded-full mx-auto object-cover border-3 border-teal-100 group-hover:border-teal-300 transition-colors duration-300"
                                      />
                                      <div className="absolute -bottom-1 -right-1 bg-teal-500 text-white rounded-full p-1">
                                        <Award className="w-3 h-3" />
                                      </div>
                                    </div>

                                    <h3 className="font-bold text-lg text-gray-900 mb-1">
                                      {doctor.name}
                                    </h3>
                                    <p className="text-teal-600 font-semibold mb-1">
                                      {doctor.specialization || specialty.name}
                                    </p>
                                    <p className="text-gray-500 text-sm mb-2">
                                      {doctor.qualifications || "MD, MBBS"}
                                    </p>
                                  </div>

                                  <div className="grid grid-cols-2 gap-3 mb-4">
                                    <div className="bg-teal-50 rounded-lg p-3 text-center">
                                      <div className="text-teal-600 font-bold text-sm">
                                        {doctor.experience || "15+ years"}
                                      </div>
                                      <div className="text-gray-500 text-xs">
                                        Experience
                                      </div>
                                    </div>
                                    <div className="bg-blue-50 rounded-lg p-3 text-center">
                                      <div className="text-blue-600 font-bold text-sm">
                                        {doctor.patientsTreated || "5000+"}
                                      </div>
                                      <div className="text-gray-500 text-xs">
                                        Patients
                                      </div>
                                    </div>
                                  </div>

                                  <div className="flex items-center justify-center mb-4">
                                    <div className="flex">
                                      {[...Array(5)].map((_, i) => (
                                        <Star
                                          key={i}
                                          className={`w-4 h-4 ${
                                            i < Math.floor(doctor.rating || 4.9)
                                              ? "text-yellow-400 fill-current"
                                              : "text-gray-300"
                                          }`}
                                        />
                                      ))}
                                    </div>
                                    <span className="font-bold text-gray-900 ml-1 text-sm">
                                      {doctor.rating || 4.9}
                                    </span>
                                    <span className="text-gray-500 text-sm ml-1">
                                      ({doctor.reviews || 250})
                                    </span>
                                  </div>

                                  <button
                                    className="w-full bg-gradient-to-r from-teal-600 to-blue-600 text-white py-3 rounded-lg hover:from-teal-700 hover:to-blue-700 transition-all duration-300 font-semibold shadow-md hover:shadow-lg"
                                    onClick={() =>
                                      window.open(
                                        `https://wa.me/${hospital.phone.replace(
                                          /\D/g,
                                          ""
                                        )}?text=Hi, I'd like to book an appointment with ${
                                          doctor.name
                                        } for ${specialty.name} consultation.`,
                                        "_blank"
                                      )
                                    }
                                  >
                                    Book Appointment
                                  </button>
                                </div>
                              ))}
                          </div>
                        </div>
                      )
                    )}
                  </div>
                </div>

                {/* Slide Indicators */}
                {totalDoctorSlides > 1 && (
                  <div className="flex justify-center mt-6 space-x-2">
                    {Array.from({ length: totalDoctorSlides }).map(
                      (_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentDoctorSlide(index)}
                          className={`w-2 h-2 rounded-full transition-all duration-300 ${
                            index === currentDoctorSlide
                              ? "bg-teal-600 scale-110"
                              : "bg-gray-300 hover:bg-gray-400"
                          }`}
                        />
                      )
                    )}
                  </div>
                )}
              </div>
            )}

            {/* Patient Testimonials */}
            {testimonials.length > 0 && (
              <div className="bg-gradient-to-br from-teal-50 to-blue-50 rounded-2xl shadow-lg p-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">
                      Patient Success Stories
                    </h2>
                    <p className="text-gray-600">
                      Real experiences from our satisfied patients
                    </p>
                  </div>

                  {totalTestimonialSlides > 1 && (
                    <div className="flex space-x-2 mt-4 sm:mt-0">
                      <button
                        onClick={prevTestimonialSlide}
                        className="bg-white hover:bg-gray-50 rounded-full p-2 transition-colors border border-gray-200 shadow-md"
                        disabled={currentTestimonialSlide === 0}
                      >
                        <ChevronLeft size={16} className="text-teal-600" />
                      </button>
                      <button
                        onClick={nextTestimonialSlide}
                        className="bg-white hover:bg-gray-50 rounded-full p-2 transition-colors border border-gray-200 shadow-md"
                        disabled={
                          currentTestimonialSlide === totalTestimonialSlides - 1
                        }
                      >
                        <ChevronRight size={16} className="text-teal-600" />
                      </button>
                    </div>
                  )}
                </div>

                <div className="relative overflow-hidden">
                  <div
                    className="flex transition-transform duration-500 ease-in-out"
                    style={{
                      transform: `translateX(-${
                        currentTestimonialSlide * 100
                      }%)`,
                    }}
                  >
                    {Array.from({ length: totalTestimonialSlides }).map(
                      (_, slideIndex) => (
                        <div key={slideIndex} className="w-full flex-shrink-0">
                          <div
                            className={`grid gap-6 ${getTestimonialGridCols()}`}
                          >
                            {testimonials
                              .slice(
                                slideIndex * testimonialsPerSlide,
                                (slideIndex + 1) * testimonialsPerSlide
                              )
                              .map((testimonial) => (
                                <div
                                  key={testimonial.id}
                                  className="bg-white rounded-xl p-5 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer border border-gray-100 group relative"
                                >
                                  <div className="absolute top-4 right-4 text-teal-200 group-hover:text-teal-300 transition-colors duration-300">
                                    <Quote className="w-6 h-6" />
                                  </div>

                                  <div className="flex items-start space-x-3 mb-4">
                                    <div className="relative">
                                      <img
                                        src={
                                          testimonial.image ||
                                          "https://via.placeholder.com/56"
                                        }
                                        alt={testimonial.patientName}
                                        className="w-14 h-14 rounded-full object-cover border-2 border-teal-100 group-hover:border-teal-300 transition-colors duration-300"
                                      />
                                    </div>

                                    <div className="flex-1">
                                      <h4 className="font-bold text-lg text-gray-900 mb-1">
                                        {testimonial.patientName}
                                      </h4>
                                      <p className="text-gray-600 mb-2 text-sm">
                                        {testimonial.age &&
                                          `Age ${testimonial.age}, `}
                                        {testimonial.country ||
                                          testimonial.patientCountry ||
                                          "International Patient"}
                                      </p>
                                    </div>

                                    <div className="flex flex-col items-end">
                                      <div className="flex mb-1">
                                        {[
                                          ...Array(testimonial.rating || 5),
                                        ].map((_, i) => (
                                          <Star
                                            key={i}
                                            className="w-4 h-4 text-yellow-400 fill-current"
                                          />
                                        ))}
                                      </div>
                                      <span className="font-bold text-gray-700 text-sm">
                                        {testimonial.rating || 5}/5
                                      </span>
                                    </div>
                                  </div>

                                  <blockquote className="text-gray-700 leading-relaxed mb-4 italic text-sm">
                                    "
                                    {testimonial.story ||
                                      testimonial.comment ||
                                      "Excellent care and treatment. Highly recommended!"}
                                    "
                                  </blockquote>

                                  <div className="border-t border-gray-100 pt-3">
                                    {testimonial.treatment && (
                                      <div className="text-sm text-gray-600 mb-2">
                                        <span className="font-semibold">
                                          Treatment:
                                        </span>{" "}
                                        {testimonial.treatment}
                                      </div>
                                    )}
                                    <div className="mt-3 text-center">
                                      <span className="bg-gray-100 px-3 py-1 rounded-full text-xs font-medium text-gray-600">
                                        {testimonial.date ||
                                          testimonial.treatmentDate ||
                                          "Recent Patient"}
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

                {/* Slide Indicators */}
                {totalTestimonialSlides > 1 && (
                  <div className="flex justify-center mt-6 space-x-2">
                    {Array.from({ length: totalTestimonialSlides }).map(
                      (_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentTestimonialSlide(index)}
                          className={`w-2 h-2 rounded-full transition-all duration-300 ${
                            index === currentTestimonialSlide
                              ? "bg-teal-600 scale-110"
                              : "bg-gray-300 hover:bg-gray-400"
                          }`}
                        />
                      )
                    )}
                  </div>
                )}
              </div>
            )}

            {/* Know Before You Go */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Know Before You Go
              </h2>

              <div className="space-y-6">
                <div className="bg-teal-50 rounded-xl p-5 border border-teal-100">
                  <h3 className="font-bold text-teal-800 mb-3 flex items-center">
                    <Shield className="w-5 h-5 mr-2" />
                    Medical Travel Insurance
                  </h3>
                  <p className="text-teal-700 text-sm mb-3">
                    Advanced treatments require comprehensive travel insurance
                    covering surgical procedures and emergency medical
                    evacuation.
                  </p>
                  <button className="text-teal-600 text-sm font-semibold hover:underline">
                    Get Travel Insurance
                  </button>
                </div>

                <div className="bg-gray-50 rounded-xl p-5 border border-gray-200">
                  <h3 className="font-bold text-gray-800 mb-3">
                    Important Guidelines
                  </h3>
                  <ul className="space-y-2 text-gray-700 text-sm">
                    <li>
                      • Patients must arrive at least 1 day before treatment for
                      pre-assessment
                    </li>
                    <li>• Bring all medical records and diagnostic reports</li>
                    <li>
                      • International patients require valid passport and
                      medical visa
                    </li>
                    <li>
                      • Companion/caregiver accommodation can be arranged at
                      discounted rates
                    </li>
                    <li>
                      • Post-treatment follow-up and supportive care is
                      mandatory
                    </li>
                  </ul>
                </div>

                <div className="bg-amber-50 rounded-xl p-5 border border-amber-200">
                  <h3 className="font-bold text-amber-800 mb-3">
                    Payment & Cancellation Policy
                  </h3>
                  <div className="text-amber-700 text-sm space-y-2">
                    <p>
                      • For treatments scheduled within 30 days, full payment is
                      required
                    </p>
                    <p>
                      • For treatments beyond 30 days, 25% advance payment to
                      confirm booking
                    </p>
                    <p>
                      • Cancellations 15+ days before treatment: 80% refund
                      (excluding booking fee)
                    </p>
                    <p>• Cancellations within 14 days: Non-refundable</p>
                    <p>
                      • Emergency situations and medical complications
                      considered case-by-case
                    </p>
                  </div>
                </div>

                <div className="bg-blue-50 rounded-xl p-5 border border-blue-200">
                  <h3 className="font-bold text-blue-800 mb-3">
                    Why Choose MedCasts with {hospital.name}
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4 text-blue-700 text-sm">
                    <div>
                      <p>✓ Best price guaranteed</p>
                      <p>✓ No hidden booking fees</p>
                      <p>✓ 100% financial protection</p>
                    </div>
                    <div>
                      <p>✓ 24/7 patient support</p>
                      <p>✓ 4.8/5 rating from 5,000+ patients</p>
                      <p>✓ Certified medical tourism partner</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Fixed Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Main Booking Card */}
              <div className="bg-white rounded-2xl shadow-lg p-5 border border-gray-100">
                <div className="text-center mb-5">
                  <div className="text-sm text-gray-500 mb-1">
                    Starting from
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-1">
                    {startingPrice}
                  </div>
                  <div className="text-sm text-gray-500">
                    Consultation from $40
                  </div>
                </div>

                <div className="space-y-3 mb-5">
                  <button
                    className="w-full bg-teal-600 text-white py-3 rounded-xl font-bold hover:bg-teal-700 transition duration-200 shadow-lg hover:shadow-xl"
                    onClick={() =>
                      window.open(
                        `https://wa.me/${hospital.phone.replace(
                          /\D/g,
                          ""
                        )}?text=Hi, I want to book an appointment for ${
                          specialty.name
                        } consultation at ${hospital.name}.`,
                        "_blank"
                      )
                    }
                  >
                    Book Consultation
                  </button>
                  <button
                    className="w-full border-2 border-gray-300 text-gray-700 py-3 rounded-xl font-bold hover:bg-gray-50 transition duration-200"
                    onClick={() =>
                      window.open(
                        `https://wa.me/${hospital.phone.replace(
                          /\D/g,
                          ""
                        )}?text=Hi, I need a cost estimate for ${
                          specialty.name
                        } treatment at ${hospital.name}.`,
                        "_blank"
                      )
                    }
                  >
                    Get Cost Estimate
                  </button>
                </div>

                <div className="text-center text-sm text-gray-600 mb-4 bg-orange-50 p-3 rounded-lg border border-orange-200">
                  🔥 <strong>14+ other people</strong> are considering this
                  treatment right now
                </div>

                <div className="space-y-3 mb-5">
                  <div className="bg-teal-50 p-3 rounded-lg border border-teal-200">
                    <div className="flex items-center text-sm text-teal-800">
                      <CheckCircle className="w-4 h-4 text-teal-600 mr-2 flex-shrink-0" />
                      <span className="font-medium">
                        Insurance coverage available
                      </span>
                    </div>
                  </div>
                  <div className="bg-teal-50 p-3 rounded-lg border border-teal-200">
                    <div className="flex items-center text-sm text-teal-800">
                      <CheckCircle className="w-4 h-4 text-teal-600 mr-2 flex-shrink-0" />
                      <span className="font-medium">
                        EMI options starting $160/month
                      </span>
                    </div>
                  </div>
                  <div className="bg-teal-50 p-3 rounded-lg border border-teal-200">
                    <div className="flex items-center text-sm text-teal-800">
                      <CheckCircle className="w-4 h-4 text-teal-600 mr-2 flex-shrink-0" />
                      <span className="font-medium">
                        Free consultation available
                      </span>
                    </div>
                  </div>
                </div>

                <hr className="my-5 border-gray-200" />

                <div className="space-y-3">
                  <h3 className="font-bold text-gray-900 mb-3">
                    Quick Contact
                  </h3>
                  <div className="flex items-center text-sm text-gray-600 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                    <Phone className="w-4 h-4 mr-3 text-teal-600" />
                    <span className="font-medium">{hospital.phone}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                    <Mail className="w-4 h-4 mr-3 text-teal-600" />
                    <span className="font-medium">{hospital.email}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                    <MapPin className="w-4 h-4 mr-3 text-teal-600" />
                    <span className="font-medium">
                      {hospital.city}, {hospital.state}
                    </span>
                  </div>
                </div>
              </div>

              {/* Emergency Contact Card */}
              <div className="bg-gradient-to-br from-red-50 to-red-100 border-2 border-red-200 rounded-2xl p-5">
                <h3 className="font-bold text-red-800 mb-3 flex items-center">
                  <span className="text-lg mr-2">🚨</span>
                  Emergency Care
                </h3>
                <p className="text-sm text-red-700 mb-4 leading-relaxed">
                  24/7 emergency services with immediate response team and
                  comprehensive care
                </p>
                <button
                  className="w-full bg-red-600 text-white py-3 px-4 rounded-xl font-bold text-xs hover:bg-red-700 transition duration-200 shadow-lg hover:shadow-xl"
                  onClick={() => window.open(`tel:${hospital.phone}`, "_blank")}
                >
                  Emergency: {hospital.phone}
                </button>
              </div>

              {/* Additional Info Card */}
              <div className="bg-gradient-to-br from-teal-50 to-blue-50 border border-teal-200 rounded-2xl p-5">
                <h3 className="font-bold text-gray-900 mb-3 flex items-center">
                  <span className="text-lg mr-2">ℹ️</span>
                  Why Choose Us
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center text-gray-700">
                    <div className="w-2 h-2 bg-teal-500 rounded-full mr-3"></div>
                    <span>Most Affordable Care</span>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <div className="w-2 h-2 bg-teal-500 rounded-full mr-3"></div>
                    <span>Advanced Technology</span>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <div className="w-2 h-2 bg-teal-500 rounded-full mr-3"></div>
                    <span>Expert Medical Team</span>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <div className="w-2 h-2 bg-teal-500 rounded-full mr-3"></div>
                    <span>JCI Accredited Hospital</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default HospitalSpecialtyPage;
