import React, { useState, useEffect, useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import {
  Star,
  MapPin,
  Clock,
  DollarSign,
  Users,
  Award,
  ChevronRight,
  ChevronLeft,
  Phone,
  Shield,
  TrendingUp,
  Globe,
  ChevronDown,
  ChevronsLeft,
  ChevronsRight,
  Loader2,
  AlertCircle,
  Activity,
  Plane,
  Zap,
  X,
  MessageCircle,
} from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  "https://medcasts-backend.onrender.com/api";

// Interfaces
interface PatientStory {
  id: number;
  image: string;
  name: string;
  age: number;
  country: string;
  rating: number;
  clinic: string;
  location: string;
  procedure: string;
  date: string;
  recoveryTime: string;
  savings: string;
  story: string;
  treatment: string;
  beforeAfter: boolean;
  activeTime?: string;
}

interface Treatment {
  id: number;
  name: string;
  slug: string;
  cost: string; // e.g. "$4,900 - $6,300"
  description?: string;
  duration?: string;
  stay?: string;
  successRate?: number;
  procedureType?: string;
  isPopular?: boolean;
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
  reviews?: number; // API might not return this yet, use fake/random if needed or 0
  description?: string;
  image?: string;
  mapEmbedUrl?: string; // Add if available or generate generic
  accreditation?: string;
  treatments?: Treatment[];
  features?: string[]; // Add if available
  airportDistance?: string; // Add if available
  surgeons?: string | number; // Add if available
}

interface Doctor {
  id: number;
  name: string;
  specialty: string; // Or specialized field from API
  image: string;
  rating: number;
  reviews: number;
  experience: string;
  patientsTreated: string;
  whatsappNumber?: string;
  specialtyId?: number;
}

interface Specialty {
  id: number;
  name: string;
  slug: string;
  description?: string;
  icon?: string;
  imageUrl?: string;
}

interface ApiResponse {
  success: boolean;
  data: {
    specialty: Specialty;
    hospitals: Hospital[];
    count: number;
  };
}

// Navigation Data (Static for now, could be dynamic later)
const departments = [
  { name: "Oncology", route: "/oncology-service", active: true },
  { name: "Cardiology", route: "/cardiac", active: true },
  { name: "BMT", route: "/bmt", active: true },
  { name: "Neuro Spine", route: "/neuro-spine", active: true },
  { name: "GI Surgery", route: "/gi-surgery", active: true },
  { name: "Orthopaedics", route: "/orthopaedic", active: true },
  { name: "Pediatric Cardiac", route: "#", active: false },
];

const PAGE_SIZE = 3;

const SpecialtyListingPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();

  // Data State
  const [specialty, setSpecialty] = useState<Specialty | null>(null);
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [testimonials, setTestimonials] = useState<PatientStory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // UI State
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("Most Popular");
  const [departmentDropdown, setDepartmentDropdown] = useState(false);
  const [page, setPage] = useState(1);
  const [showQuoteForm, setShowQuoteForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    country: "",
    phone: "",
  });

  // Testimonials UI State
  const [currentTestimonialSlide, setCurrentTestimonialSlide] = useState(0);
  const [testimonialCardsPerSlide, setTestimonialCardsPerSlide] = useState(4);
  const [selectedPatient, setSelectedPatient] = useState<PatientStory | null>(
    null
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter] = useState("All");

  // Derived Data
  const availableTreatments = useMemo(() => {
    const treatmentsSet = new Set<string>();
    hospitals.forEach((h) => {
      h.treatments?.forEach((t) => treatmentsSet.add(t.name));
    });
    return Array.from(treatmentsSet).sort();
  }, [hospitals]);

  const pricingSummary = useMemo(() => {
    // Generate pricing cards from treatments found in hospitals
    const summary = new Map<
      string,
      { min: number; max: number; minStr: string; maxStr: string }
    >();

    hospitals.forEach((h) => {
      h.treatments?.forEach((t) => {
        if (!summary.has(t.name)) {
          // Attempt to parse string "$4,900 - $6,300"
          // This is a naive parser for demo purposes
          const prices = t.cost
            .replace(/[$,]/g, "")
            .split("-")
            .map((s) => parseFloat(s.trim()));
          if (prices.length > 0 && !isNaN(prices[0])) {
            const min = prices[0];
            const max = prices.length > 1 ? prices[1] : prices[0];
            summary.set(t.name, {
              min,
              max,
              minStr: `$${min.toLocaleString()}`,
              maxStr: `$${max.toLocaleString()}`,
            });
          }
        }
      });
    });
    // Return top 6 treatments
    return Array.from(summary.entries()).slice(0, 6);
  }, [hospitals]);

  // Filtered Testimonials
  const filteredTestimonials = useMemo(() => {
    return testimonials.filter((patient) => {
      const search = searchTerm.toLowerCase();
      const matchesSearch =
        patient.name.toLowerCase().includes(search) ||
        patient.country.toLowerCase().includes(search) ||
        patient.location.toLowerCase().includes(search) ||
        patient.procedure.toLowerCase().includes(search);
      // For now, assuming "treatment" field aligns with filter or we just use All
      const matchesFilter =
        activeFilter === "All" || patient.treatment === activeFilter;
      return matchesSearch && matchesFilter;
    });
  }, [testimonials, searchTerm, activeFilter]);

  useEffect(() => {
    const fetchData = async () => {
      if (!slug) return;
      try {
        setLoading(true);
        const response = await fetch(
          `${API_BASE_URL}/specialties/${slug}/hospitals`
        );
        if (!response.ok) throw new Error("Failed to fetch data");
        const result: ApiResponse = await response.json();
        if (result.success && result.data) {
          setSpecialty(result.data.specialty);
          // Enrich hospital data with defaults if missing
          const enrichedHospitals = result.data.hospitals.map((h) => ({
            ...h,
            reviews: h.reviews || Math.floor(Math.random() * 1000) + 500, // Mock reviews
            image: h.image || "/images/default-hospital.jpg",
            mapEmbedUrl:
              h.mapEmbedUrl ||
              "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3504.9640329981867!2d77.28065237580833!3d28.54080077571503!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce6ad13eaaa99%3A0x3bc07ad476bc6d77!2sIndraprastha%20Apollo%20Hospital!5e0!3m2!1sen!2sin!4v1756991461879!5m2!1sen!2sin", // Generic map
            airportDistance: "30-60 min", // Placeholder
            surgeons: "10+ Specialists", // Placeholder
            features: ["International Patient Services", "24/7 Care"],
            description:
              h.description ||
              `Use world-class facilities and ${result.data.specialty.name} treatments at ${h.name}.`,
          }));
          setHospitals(enrichedHospitals);

          // Fetch Doctors for this specialty
          try {
            const doctorsResponse = await fetch(
              `${API_BASE_URL}/doctors?specialtyId=${result.data.specialty.id}&isActive=true&limit=20`
            );
            const doctorsData = await doctorsResponse.json();
            if (doctorsData.success && doctorsData.data.doctors) {
              const mappedDoctors = doctorsData.data.doctors.map((d: any) => ({
                id: d.id,
                name: d.name,
                specialty: d.specialization || result.data.specialty.name,
                image: d.image || "/images/default-doctor.jpg",
                rating: d.rating || 4.8,
                reviews: d.reviews || Math.floor(Math.random() * 200) + 50,
                experience: d.experience || "10+ years",
                patientsTreated: d.patientsTreated || "1000+",
                whatsappNumber: d.phone || "919643452714",
              }));
              setDoctors(mappedDoctors);
            }
          } catch (docErr) {
            console.error("Failed to fetch doctors", docErr);
          }

          // Generate dynamic testimonials based on specialty
          const mockTestimonials: PatientStory[] = Array.from({
            length: 6,
          }).map((_, i) => ({
            id: i + 1,
            image: [
              "/images/catherine.png",
              "/images/James-Mitchell.png",
              "/images/Maria-Santos.png",
              "/images/Michael-Chen.png",
              "/images/Robert-Thompson(Canada).png",
              "/images/catherine.png",
            ][i % 6],
            name: [
              "Sarah Johnson",
              "Robert Chen",
              "Maria Garcia",
              "David Mitchell",
              "Grace Wanjiku",
              "James Wilson",
            ][i],
            age: 40 + i * 5,
            country: [
              "Canada",
              "Australia",
              "USA",
              "UK",
              "Kenya",
              "New Zealand",
            ][i],
            rating: 5,
            clinic:
              enrichedHospitals[i % enrichedHospitals.length]?.name ||
              "Medanta Hospital",
            location: "India",
            procedure: `${result.data.specialty.name} Treatment`,
            date: "2024-01-" + (10 + i),
            recoveryTime: i + 2 + " weeks",
            savings: "USD " + (10000 + i * 5000),
            story: `I was diagnosed with severe condition and needed ${result.data.specialty.name} care. The treatment in India was affordable and world-class. I am now fully recovered.`,
            treatment: result.data.specialty.name,
            beforeAfter: true,
            activeTime: "Active " + (i + 1) + " hours ago",
          }));
          setTestimonials(mockTestimonials);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error loading data");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [slug]);

  // Filter & Sort Logic
  const filteredHospitals = useMemo(() => {
    return hospitals.filter((h) => {
      if (selectedServices.length === 0) return true;
      // Check if hospital has *any* of the selected treatments
      return h.treatments?.some((t) => selectedServices.includes(t.name));
    });
  }, [hospitals, selectedServices]);

  const sortedHospitals = useMemo(() => {
    const list = [...filteredHospitals];
    if (sortBy === "Price: Low to High") {
      // Basic sort by first treatment cost
      list.sort((a, b) => {
        const costA = parseFloat(
          a.treatments?.[0]?.cost.replace(/[$,]/g, "") || "0"
        );
        const costB = parseFloat(
          b.treatments?.[0]?.cost.replace(/[$,]/g, "") || "0"
        );
        return costA - costB;
      });
    } else if (sortBy === "Price: High to Low") {
      list.sort((a, b) => {
        const costA = parseFloat(
          a.treatments?.[0]?.cost.replace(/[$,]/g, "") || "0"
        );
        const costB = parseFloat(
          b.treatments?.[0]?.cost.replace(/[$,]/g, "") || "0"
        );
        return costB - costA;
      });
    } else if (sortBy === "Highest Rated") {
      list.sort((a, b) => b.rating - a.rating);
    }
    // Default: Most Popular (keep original order / random)
    return list;
  }, [filteredHospitals, sortBy]);

  // Pagination
  const totalPages = Math.ceil(sortedHospitals.length / PAGE_SIZE);
  const paginatedHospitals = sortedHospitals.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE
  );

  // Handlers
  const handleServiceToggle = (service: string) => {
    setSelectedServices((prev) =>
      prev.includes(service)
        ? prev.filter((s) => s !== service)
        : [...prev, service]
    );
    setPage(1);
  };

  const openQuoteForm = () => setShowQuoteForm(true);
  const closeQuoteForm = () => setShowQuoteForm(false);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Click outside listener
  useEffect(() => {
    const closeDropdowns = () => {
      setDepartmentDropdown(false);
    };
    window.addEventListener("click", closeDropdowns);
    return () => window.removeEventListener("click", closeDropdowns);
  }, []);

  // Testimonials handlers
  const nextTestimonialSlide = () => {
    // Total slides based on current visible cards
    const totalTestimonialSlides = Math.max(
      1,
      Math.ceil(filteredTestimonials.length / testimonialCardsPerSlide)
    );
    setCurrentTestimonialSlide((prev) => {
      const next = prev + 1;
      return next >= totalTestimonialSlides ? 0 : next;
    });
  };

  const prevTestimonialSlide = () => {
    const totalTestimonialSlides = Math.max(
      1,
      Math.ceil(filteredTestimonials.length / testimonialCardsPerSlide)
    );
    setCurrentTestimonialSlide((prev) => {
      const previous = prev - 1;
      return previous < 0 ? totalTestimonialSlides - 1 : previous;
    });
  };

  const openModal = (patient: PatientStory) => {
    setSelectedPatient(patient);
  };

  const closeModal = () => {
    setSelectedPatient(null);
  };

  const getTestimonialGridCols = () => {
    switch (testimonialCardsPerSlide) {
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

  // Testimonials responsive effect
  useEffect(() => {
    const updateTestimonialCardsPerSlide = () => {
      if (window.innerWidth < 768) {
        setTestimonialCardsPerSlide(1);
      } else if (window.innerWidth < 1024) {
        setTestimonialCardsPerSlide(2);
      } else if (window.innerWidth < 1280) {
        setTestimonialCardsPerSlide(3);
      } else {
        setTestimonialCardsPerSlide(4);
      }
      setCurrentTestimonialSlide(0);
    };

    updateTestimonialCardsPerSlide();
    window.addEventListener("resize", updateTestimonialCardsPerSlide);
    return () =>
      window.removeEventListener("resize", updateTestimonialCardsPerSlide);
  }, []);

  const PopularDoctors = () => {
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

    if (doctors.length === 0) return null;

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

    const handleBookAppointment = (doctor: Doctor) => {
      const message = encodeURIComponent(
        `Hello! I would like to book an appointment with ${doctor.name} (${doctor.specialty}). Please let me know the available slots.`
      );
      const whatsappUrl = `https://wa.me/${doctor.whatsappNumber}?text=${message}`;
      window.open(whatsappUrl, "_blank");
    };

    return (
      <section className="py-12 bg-gradient-to-br from-teal-50 to-cyan-50 rounded-3xl mt-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col items-center text-center mb-12 md:flex-row md:justify-between md:items-center md:text-left">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                Best {specialty?.name} Specialists
              </h2>
              <p className="text-teal-700">
                Meet our expert doctors with years of experience
              </p>
            </div>

            {/* Navigation Arrows */}
            {totalSlides > 1 && (
              <div className="flex space-x-2 mt-4 md:mt-0">
                <button
                  onClick={prevSlide}
                  className="bg-white rounded-full p-2 shadow-lg hover:shadow-xl transition-all duration-300 border border-teal-200 disabled:opacity-50 disabled:cursor-not-allowed hover:border-teal-300"
                  disabled={currentSlide === 0}
                >
                  <ChevronLeft size={20} className="text-teal-600" />
                </button>

                <button
                  onClick={nextSlide}
                  className="bg-white rounded-full p-2 shadow-lg hover:shadow-xl transition-all duration-300 border border-teal-200 disabled:opacity-50 disabled:cursor-not-allowed hover:border-teal-300"
                  disabled={currentSlide === totalSlides - 1}
                >
                  <ChevronRight size={20} className="text-teal-600" />
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
                            className="bg-white rounded-2xl shadow-sm p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer text-center border border-teal-100 hover:border-teal-200"
                          >
                            <div className="relative mb-4">
                              <img
                                src={doctor.image}
                                alt={doctor.name}
                                className="w-20 h-20 rounded-full mx-auto object-cover border-2 border-teal-200 hover:border-teal-300 transition-colors"
                              />
                            </div>
                            <h3 className="font-bold text-lg text-gray-900 mb-2 hover:text-teal-700 transition-colors">
                              {doctor.name}
                            </h3>
                            <p className="text-teal-600 text-sm font-medium mb-2">
                              {doctor.specialty}
                            </p>

                            {/* Experience and Patients Treated */}
                            <div className="grid grid-cols-2 gap-2 mb-3">
                              <div className="bg-teal-50 rounded-lg p-2 border border-teal-100">
                                <div className="text-xs text-teal-600 uppercase tracking-wide font-semibold">
                                  Experience
                                </div>
                                <div className="text-gray-900 font-medium text-sm">
                                  {doctor.experience}
                                </div>
                              </div>
                              <div className="bg-teal-50 rounded-lg p-2 border border-teal-100">
                                <div className="text-xs text-teal-600 uppercase tracking-wide font-semibold">
                                  Patients
                                </div>
                                <div className="text-gray-900 font-medium text-sm">
                                  {doctor.patientsTreated}
                                </div>
                              </div>
                            </div>

                            {/* Rating */}
                            <div className="flex items-center justify-center space-x-1 mb-4">
                              <div className="flex">
                                {[...Array(Math.floor(doctor.rating))].map(
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
                                ({doctor.reviews} reviews)
                              </span>
                            </div>

                            {/* Book Appointment Button */}
                            <button
                              onClick={() => handleBookAppointment(doctor)}
                              className="w-full bg-gradient-to-r from-teal-600 to-teal-700 text-white py-2 rounded-lg hover:from-teal-700 hover:to-teal-800 transition-all font-semibold flex items-center justify-center gap-2 shadow-sm hover:shadow-md"
                            >
                              <MessageCircle size={16} />
                              Book on WhatsApp
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

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 className="w-12 h-12 animate-spin text-teal-600" />
      </div>
    );
  }

  if (error || !specialty) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-16 text-center">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800">
            Specialty Not Found
          </h2>
          <Link to="/" className="text-teal-600 hover:underline mt-4 block">
            Return Home
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <Header />

      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-teal-700 via-teal-600 to-teal-500 py-8 lg:py-12 overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-5"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <div className="inline-flex items-center bg-white bg-opacity-20 text-white px-4 py-2 rounded-full text-sm font-medium mb-4 backdrop-blur-sm">
              <Activity size={16} className="mr-2" />
              #1 Destination for {specialty.name} Care
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
              World-Class {specialty.name} Treatment
              <span className="block bg-gradient-to-r from-teal-100 to-cyan-200 bg-clip-text text-transparent">
                in India
              </span>
            </h1>

            <div className="flex items-center justify-center mb-6 text-white">
              <span className="text-2xl font-bold mr-3">4.8</span>
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={20}
                    className="text-yellow-400 fill-current"
                  />
                ))}
              </div>
              <span className="ml-3 text-teal-100 font-medium">
                (2,400+ reviews)
              </span>
            </div>

            <button
              onClick={openQuoteForm}
              className="bg-white text-teal-700 px-6 py-3 rounded-xl hover:bg-teal-50 transition font-semibold"
            >
              Get a Free Consultation
            </button>
          </div>
        </div>
      </div>

      {/* Main Body */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Mobile Filters */}
        <div className="lg:hidden mb-6">
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <h3 className="font-bold text-lg mb-4 flex items-center">
              <Shield size={20} className="mr-2 text-green-600" /> Filters
            </h3>
            {/* Dept Dropdown */}
            <div
              className="mb-4 relative z-20"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => {
                  setDepartmentDropdown(!departmentDropdown);
                }}
                className="w-full flex justify-between items-center px-3 py-2 rounded-lg bg-gray-100 text-left"
              >
                <span>
                  <Shield size={16} className="inline mr-2 text-green-600" />
                  {departments.find((d) => d.route.includes(slug || ""))
                    ?.name || "Departments"}
                </span>
                <ChevronDown
                  size={16}
                  className={`${
                    departmentDropdown ? "rotate-180" : ""
                  } transition-transform`}
                />
              </button>
              {departmentDropdown && (
                <div className="absolute left-0 right-0 mt-2 bg-white border border-gray-100 rounded-lg shadow-lg z-30">
                  {departments.map((dept) => (
                    <Link
                      key={dept.name}
                      to={dept.route}
                      className="block px-4 py-2 hover:bg-gray-50 text-gray-700"
                    >
                      {dept.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="hidden lg:flex w-full lg:w-80 order-2 lg:order-1 flex-col gap-4">
            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
              <h3 className="font-bold text-lg mb-4 flex items-center">
                <Shield size={20} className="mr-2 text-green-600" /> Filters
              </h3>
              {/* Departments */}
              <div className="mb-4">
                <p className="text-xs font-semibold text-gray-400 uppercase mb-2">
                  Departments
                </p>
                <div className="space-y-1">
                  {departments.map((dept) => (
                    <Link
                      key={dept.name}
                      to={dept.route}
                      className={`block px-3 py-2 rounded-lg transition-colors ${
                        dept.route.includes(slug || "")
                          ? "bg-teal-50 text-teal-700 font-medium"
                          : "text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      {dept.name}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Services Filter */}
              {availableTreatments.length > 0 && (
                <div className="mb-4">
                  <p className="text-xs font-semibold text-gray-400 uppercase mb-2">
                    Procedures
                  </p>
                  <div className="max-h-60 overflow-y-auto space-y-1 pr-2">
                    {availableTreatments.map((service) => (
                      <label
                        key={service}
                        className="flex items-center px-2 py-1.5 cursor-pointer hover:bg-gray-50 rounded"
                      >
                        <input
                          type="checkbox"
                          className="mr-2 h-4 w-4 accent-teal-600"
                          checked={selectedServices.includes(service)}
                          onChange={() => handleServiceToggle(service)}
                        />
                        <span className="text-sm text-gray-700">{service}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {/* Sort */}
              <div>
                <p className="text-xs font-semibold text-gray-400 uppercase mb-2">
                  Sort By
                </p>
                <select
                  className="w-full px-3 py-2 rounded-lg bg-gray-50 border border-gray-200 text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="Most Popular">Most Popular</option>
                  <option value="Price: Low to High">Price: Low to High</option>
                  <option value="Price: High to Low">Price: High to Low</option>
                  <option value="Highest Rated">Highest Rated</option>
                </select>
              </div>
            </div>

            {/* Why Choose Block */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-100">
              <h4 className="font-semibold text-gray-900 flex items-center text-lg mb-4">
                <Globe size={18} className="mr-2 text-green-600" /> Why India?
              </h4>
              <div className="space-y-3">
                <div className="flex justify-between p-3 bg-white rounded-lg shadow-sm">
                  <div className="flex items-center gap-2 text-sm text-gray-800">
                    <DollarSign size={16} className="text-green-600" /> Cost
                    Savings
                  </div>
                  <span className="font-bold text-green-700 text-sm">
                    70-85%
                  </span>
                </div>
                <div className="flex justify-between p-3 bg-white rounded-lg shadow-sm">
                  <div className="flex items-center gap-2 text-sm text-gray-800">
                    <Award size={16} className="text-blue-600" /> Success Rate
                  </div>
                  <span className="font-bold text-blue-700 text-sm">90%+</span>
                </div>
                <div className="flex justify-between p-3 bg-white rounded-lg shadow-sm">
                  <div className="flex items-center gap-2 text-sm text-gray-800">
                    <Clock size={16} className="text-purple-600" /> Wait Time
                  </div>
                  <span className="font-bold text-purple-700 text-sm">
                    ~0 days
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Main List */}
          <div className="flex-1 order-1 lg:order-2">
            <div className="space-y-6">
              {paginatedHospitals.map((hospital) => {
                const startPrice = hospital.treatments?.[0]?.cost.split("-")[0];
                return (
                  <div
                    key={hospital.id}
                    className="bg-white rounded-2xl transition-all duration-300 group relative flex flex-col lg:flex-row overflow-hidden shadow-sm hover:shadow-lg border border-gray-100 hover:border-teal-100"
                  >
                    {/* Badge */}
                    {hospital.rating > 4.5 && (
                      <div className="absolute top-0 right-0 bg-gradient-to-l from-teal-600 to-teal-500 text-white px-4 py-2 rounded-bl-lg font-semibold text-xs flex items-center z-10">
                        <Award size={14} className="mr-1" /> Top Rated
                      </div>
                    )}

                    {/* Left Column: Image/Map */}
                    <div className="w-full lg:w-72 flex-shrink-0 p-6 flex flex-col items-center">
                      <div className="w-full h-36 bg-gray-100 rounded-xl overflow-hidden mb-4">
                        <img
                          src={hospital.image}
                          alt={hospital.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      {/* Fake Map */}
                      <div className="w-full h-36 bg-gray-100 rounded-xl overflow-hidden flex items-center justify-center mb-3">
                        <iframe
                          src={hospital.mapEmbedUrl}
                          width="100%"
                          height="100%"
                          style={{ border: 0 }}
                          title="map"
                          loading="lazy"
                        />
                      </div>
                      <div className="flex items-center gap-2 text-teal-600 bg-teal-50 px-3 py-1 rounded-lg w-full justify-center">
                        <Plane size={14} />
                        <span className="text-xs font-semibold">
                          {hospital.airportDistance}
                        </span>
                      </div>
                    </div>

                    {/* Right Column: Info */}
                    <div className="flex-1 flex flex-col p-6 lg:p-8 justify-between">
                      <div>
                        {/* Title Row */}
                        <div className="flex flex-col lg:flex-row justify-between items-start mb-3 gap-2">
                          <div>
                            <h3 className="text-xl lg:text-2xl font-bold text-gray-900 group-hover:text-teal-600 transition-colors">
                              {hospital.name}
                            </h3>
                            <div className="flex items-center gap-3 text-gray-500 text-sm mt-1">
                              <span className="flex items-center gap-1">
                                <MapPin size={14} className="text-teal-500" />
                                {hospital.city}, {hospital.country}
                              </span>
                              {hospital.accreditation && (
                                <span className="bg-teal-50 text-teal-700 px-2 py-0.5 rounded text-xs font-semibold">
                                  {hospital.accreditation}
                                </span>
                              )}
                            </div>
                          </div>
                          {/* Price Display */}
                          {startPrice && (
                            <div className="text-right">
                              <div className="text-xl lg:text-2xl font-bold text-teal-600">
                                {startPrice}
                              </div>
                              <div className="text-xs text-gray-400">
                                Starting from
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Ratings */}
                        <div className="flex items-center gap-4 mb-4">
                          <div className="flex items-center gap-1">
                            <Star
                              className="fill-yellow-400 text-yellow-400"
                              size={16}
                            />
                            <span className="font-bold text-gray-900">
                              {hospital.rating}
                            </span>
                            <span className="text-gray-500 text-sm">
                              ({hospital.reviews})
                            </span>
                          </div>
                          <div className="flex items-center gap-1 text-green-600 text-sm font-medium">
                            <TrendingUp size={14} /> 95% Success Rate
                          </div>
                        </div>

                        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                          {hospital.description}
                        </p>

                        {/* Features Tags */}
                        <div className="flex flex-wrap gap-2 mb-4">
                          {hospital.features?.map((f) => (
                            <span
                              key={f}
                              className="px-2 py-1 bg-gray-50 text-gray-600 text-xs rounded border border-gray-100"
                            >
                              {f}
                            </span>
                          ))}
                          {hospital.treatments?.slice(0, 2).map((t) => (
                            <span
                              key={t.name}
                              className="px-2 py-1 bg-blue-50 text-blue-600 text-xs rounded border border-blue-100"
                            >
                              {t.name}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Footer Actions */}
                      <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-50 mt-auto">
                        <button
                          onClick={openQuoteForm}
                          className="flex-1 px-4 py-2 border border-teal-600 text-teal-600 rounded-lg font-semibold hover:bg-teal-50 transition flex justify-center items-center gap-2"
                        >
                          <Phone size={16} /> Contact
                        </button>
                        <Link
                          to={`/hospital/${hospital.slug}/${slug}`}
                          className="flex-1 px-4 py-2 bg-teal-600 text-white rounded-lg font-semibold hover:bg-teal-700 transition flex justify-center items-center gap-2"
                        >
                          View Details <ChevronRight size={16} />
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-8">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="p-2 rounded-lg border border-gray-200 disabled:opacity-50 hover:bg-gray-50"
                >
                  <ChevronsLeft size={20} className="text-gray-600" />
                </button>
                <div className="text-sm font-medium text-gray-600">
                  Page {page} of {totalPages}
                </div>
                <button
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="p-2 rounded-lg border border-gray-200 disabled:opacity-50 hover:bg-gray-50"
                >
                  <ChevronsRight size={20} className="text-gray-600" />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Popular Doctors Section */}
        <PopularDoctors />

        {/* How It Works Section */}
        <section className="py-12">
          <div className="bg-gradient-to-br from-teal-700 via-teal-600 to-teal-500 rounded-3xl p-8 text-white relative overflow-hidden max-h-[450px]">
            {/* Background decorations */}
            <div className="absolute top-4 right-4 w-12 h-12 bg-white bg-opacity-10 rounded-full animate-pulse"></div>
            <div className="absolute bottom-4 left-4 w-8 h-8 bg-white bg-opacity-10 rounded-full animate-pulse delay-1000"></div>

            <div className="relative z-10 h-full flex flex-col justify-between">
              {/* Header */}
              <div className="text-center mb-6">
                <h2 className="text-2xl lg:text-3xl font-bold mb-2">
                  How {specialty.name} Treatment Works
                </h2>
                <p className="text-teal-100 text-sm">
                  Get world-class care in 3 simple steps
                </p>
              </div>

              {/* 3-Step Process with Gradient Icons */}
              <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
                {/* Step 1 */}
                <div className="flex flex-col md:flex-row items-center text-center md:text-left flex-1">
                  <div className="bg-gradient-to-br from-white to-teal-50 text-teal-700 rounded-full w-14 h-14 flex items-center justify-center mb-3 md:mb-0 md:mr-4 shadow-lg flex-shrink-0 hover:shadow-xl transition-all duration-300 hover:scale-110">
                    <Shield size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">
                      Share Medical Reports
                    </h3>
                    <p className="text-teal-100 text-sm leading-tight">
                      Upload medical history securely
                    </p>
                  </div>
                </div>

                {/* Animated Arrow */}
                <div className="hidden md:block px-2">
                  <ChevronRight
                    size={20}
                    className="text-white opacity-70 animate-pulse"
                  />
                </div>

                {/* Step 2 */}
                <div className="flex flex-col md:flex-row items-center text-center md:text-left flex-1">
                  <div className="bg-gradient-to-br from-white to-teal-50 text-teal-700 rounded-full w-14 h-14 flex items-center justify-center mb-3 md:mb-0 md:mr-4 shadow-lg flex-shrink-0 hover:shadow-xl transition-all duration-300 hover:scale-110">
                    <Users size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">
                      Expert Consultation
                    </h3>
                    <p className="text-teal-100 text-sm leading-tight">
                      Specialist review & treatment plan
                    </p>
                  </div>
                </div>

                {/* Animated Arrow */}
                <div className="hidden md:block px-2">
                  <ChevronRight
                    size={20}
                    className="text-white opacity-70 animate-pulse"
                  />
                </div>

                {/* Step 3 */}
                <div className="flex flex-col md:flex-row items-center text-center md:text-left flex-1">
                  <div className="bg-gradient-to-br from-white to-teal-50 text-teal-700 rounded-full w-14 h-14 flex items-center justify-center mb-3 md:mb-0 md:mr-4 shadow-lg flex-shrink-0 hover:shadow-xl transition-all duration-300 hover:scale-110">
                    <Zap size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">Start Treatment</h3>
                    <p className="text-teal-100 text-sm leading-tight">
                      Begin your journey to recovery
                    </p>
                  </div>
                </div>
              </div>

              {/* Enhanced CTA Button */}
              <div className="text-center">
                <button
                  onClick={openQuoteForm}
                  className="bg-white text-teal-700 font-bold px-8 py-3 rounded-xl hover:bg-teal-50 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 border-2 border-transparent hover:border-teal-200"
                >
                  Book Free Consultation
                </button>
                <p className="text-teal-100 text-xs mt-2 opacity-90">
                  No obligation • Quick response within 24 hours
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        {testimonials.length > 0 && (
          <section className="py-16 bg-gradient-to-br from-teal-50 via-white to-cyan-100 rounded-3xl mt-8">
            <div className="max-w-7xl mx-auto px-4">
              {/* Header */}
              <div className="mb-12">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
                  <div className="mb-6 lg:mb-0">
                    <h2 className="text-4xl font-bold text-gray-900 mb-4">
                      Patient Success Stories
                    </h2>
                    <p className="text-lg text-teal-700 max-w-2xl">
                      Real patients sharing their successful {specialty.name}{" "}
                      treatment journeys.
                    </p>
                  </div>

                  {/* Search Bar */}
                  <div className="flex flex-col sm:flex-row gap-4 items-center lg:flex-shrink-0">
                    <div className="w-full sm:w-80">
                      <input
                        type="text"
                        placeholder="Search stories..."
                        className="w-full px-4 py-3 border border-teal-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Slider */}
              <div className="relative">
                {/* Navigation Arrows */}
                <div className="absolute right-0 -top-20 md:-top-24 flex gap-2">
                  <button
                    onClick={prevTestimonialSlide}
                    className="bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 border border-teal-300 hover:bg-teal-50"
                  >
                    <ChevronLeft size={20} className="text-teal-700" />
                  </button>

                  <button
                    onClick={nextTestimonialSlide}
                    className="bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 border border-teal-300 hover:bg-teal-50"
                  >
                    <ChevronRight size={20} className="text-teal-700" />
                  </button>
                </div>

                {/* Slider Container */}
                <div className="overflow-hidden rounded-2xl">
                  <div
                    className="flex transition-transform duration-500 ease-in-out"
                    style={{
                      transform: `translateX(-${
                        currentTestimonialSlide * 100
                      }%)`,
                    }}
                  >
                    {Array.from({
                      length:
                        Math.ceil(
                          filteredTestimonials.length / testimonialCardsPerSlide
                        ) || 1,
                    }).map((_, slideIndex) => {
                      const startIndex = slideIndex * testimonialCardsPerSlide;
                      const endIndex = Math.min(
                        startIndex + testimonialCardsPerSlide,
                        filteredTestimonials.length
                      );
                      const slidePatients = filteredTestimonials.slice(
                        startIndex,
                        endIndex
                      );

                      return (
                        <div key={slideIndex} className="w-full flex-shrink-0">
                          <div
                            className={`grid gap-6 ${getTestimonialGridCols()} px-2`}
                          >
                            {slidePatients.map((patient) => (
                              <div
                                key={patient.id}
                                className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer group border border-teal-200 hover:border-teal-300"
                                onClick={() => openModal(patient)}
                              >
                                {/* Patient Image */}
                                <div className="relative h-48 overflow-hidden">
                                  <img
                                    src={patient.image}
                                    alt={patient.name}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                  />

                                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent group-hover:from-black/30 transition-all duration-300"></div>
                                  <div className="absolute bottom-3 left-3 bg-white bg-opacity-95 rounded-full px-3 py-1 backdrop-blur-sm">
                                    <span className="text-xs text-teal-700 flex items-center">
                                      <div className="w-2 h-2 bg-teal-500 rounded-full mr-2 animate-pulse"></div>
                                      {patient.activeTime}
                                    </span>
                                  </div>
                                </div>

                                {/* Card Content */}
                                <div className="p-6">
                                  <div className="flex items-center justify-between mb-3">
                                    <h3 className="font-bold text-lg text-gray-900 group-hover:text-teal-600 transition-colors">
                                      {patient.name}
                                    </h3>
                                    <div className="flex items-center">
                                      {[...Array(patient.rating)].map(
                                        (_, i) => (
                                          <Star
                                            key={i}
                                            size={14}
                                            className="text-yellow-400 fill-current"
                                          />
                                        )
                                      )}
                                    </div>
                                  </div>

                                  <p className="text-sm text-teal-700 mb-3 line-clamp-3 leading-relaxed">
                                    {patient.story.substring(0, 140)}...
                                  </p>

                                  {/* Footer */}
                                  <div className="flex items-center justify-between pt-4 border-t border-teal-100">
                                    <div>
                                      <div className="text-sm font-medium text-gray-900 flex items-center">
                                        <MapPin
                                          size={12}
                                          className="text-teal-500 mr-1"
                                        />
                                        {patient.country}
                                      </div>
                                    </div>
                                    <button className="text-teal-600 text-sm font-semibold hover:text-teal-700 transition-colors bg-teal-50 hover:bg-teal-100 px-3 py-1 rounded-lg">
                                      Read Story
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
              </div>

              {/* Modal */}
              {selectedPatient && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                  <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
                    {/* Modal Header */}
                    <div className="flex items-center justify-between p-6 border-b border-teal-100 bg-gradient-to-r from-teal-50 to-cyan-50">
                      <div className="flex items-center space-x-4">
                        <img
                          src={selectedPatient.image}
                          alt={selectedPatient.name}
                          className="w-16 h-16 rounded-full object-cover border-3 border-white shadow-md"
                        />

                        <div>
                          <h3 className="text-xl font-bold text-gray-900">
                            {selectedPatient.name}
                          </h3>
                          <p className="text-sm text-teal-700">
                            Age {selectedPatient.age} •{" "}
                            {selectedPatient.country}
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={closeModal}
                        className="p-2 hover:bg-white hover:bg-opacity-50 rounded-full transition-colors"
                      >
                        <X size={20} className="text-teal-700" />
                      </button>
                    </div>

                    {/* Modal Content */}
                    <div className="p-6">
                      {/* Info Grid */}
                      <div className="grid grid-cols-2 gap-4 mb-6">
                        <div className="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-xl p-4 border border-teal-100">
                          <div className="flex items-center mb-2">
                            <MapPin size={16} className="text-teal-600 mr-2" />
                            <span className="text-sm font-semibold text-gray-900">
                              Location
                            </span>
                          </div>
                          <p className="text-sm font-medium text-gray-700">
                            {selectedPatient.clinic}
                          </p>
                        </div>

                        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-100">
                          <div className="flex items-center mb-2">
                            <Activity
                              size={16}
                              className="text-blue-600 mr-2"
                            />
                            <span className="text-sm font-semibold text-gray-900">
                              Procedure
                            </span>
                          </div>
                          <p className="text-sm font-medium text-gray-700">
                            {selectedPatient.procedure}
                          </p>
                        </div>

                        <div className="bg-gradient-to-br from-purple-50 to-violet-50 rounded-xl p-4 border border-purple-100">
                          <div className="flex items-center mb-2">
                            <Clock size={16} className="text-purple-600 mr-2" />
                            <span className="text-sm font-semibold text-gray-900">
                              Recovery
                            </span>
                          </div>
                          <p className="text-sm text-teal-600 font-bold">
                            {selectedPatient.recoveryTime}
                          </p>
                        </div>

                        <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-4 border border-orange-100">
                          <div className="flex items-center mb-2">
                            <DollarSign
                              size={16}
                              className="text-orange-600 mr-2"
                            />
                            <span className="text-sm font-semibold text-gray-900">
                              Savings
                            </span>
                          </div>
                          <p className="text-sm text-teal-600 font-bold">
                            {selectedPatient.savings}
                          </p>
                        </div>
                      </div>

                      {/* Story */}
                      <div className="mb-6">
                        <h4 className="font-bold mb-2">My Journey</h4>
                        <p className="text-gray-700 leading-relaxed">
                          {selectedPatient.story}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </section>
        )}

        {/* Dynamic Pricing Section */}
        {pricingSummary.length > 0 && (
          <div className="mt-16 bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                {specialty.name} Treatment Pricing
              </h3>
              <p className="text-gray-500">
                Estimated costs for common procedures
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {pricingSummary.map(([name, prices], idx) => (
                <div
                  key={name}
                  className={`rounded-xl p-6 bg-gradient-to-br ${
                    idx % 3 === 0
                      ? "from-teal-50 to-cyan-50"
                      : idx % 3 === 1
                      ? "from-blue-50 to-indigo-50"
                      : "from-purple-50 to-pink-50"
                  }`}
                >
                  <h4 className="font-bold text-gray-900 mb-2 text-lg">
                    {name}
                  </h4>
                  <div className="text-2xl font-bold text-teal-700 mb-1">
                    {prices.minStr}
                  </div>
                  <div className="text-xs text-gray-500">
                    Range: {prices.minStr} - {prices.maxStr}
                  </div>
                </div>
              ))}
            </div>
            <p className="text-center text-xs text-gray-400 mt-6">
              *Prices vary based on hospital and complexity.
            </p>
          </div>
        )}

        {/* Enhanced CTA Section */}
        <div className="mt-16 text-center bg-gradient-to-br from-teal-600 via-teal-500 to-cyan-600 rounded-3xl p-12 text-white relative overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute top-8 left-8 w-16 h-16 bg-white rounded-full opacity-10 animate-pulse"></div>
            <div className="absolute bottom-8 right-8 w-12 h-12 bg-white rounded-full opacity-15 animate-pulse delay-1000"></div>
            <div className="absolute top-1/2 right-12 w-8 h-8 bg-white rounded-full opacity-20 animate-bounce"></div>
          </div>

          <div className="relative z-10">
            <h3 className="text-2xl lg:text-3xl font-bold mb-4">
              Ready to Begin Your {specialty.name} Treatment Journey?
            </h3>
            <p className="text-teal-100 mb-8 text-lg max-w-2xl mx-auto">
              Get personalized {specialty.name} treatment plans, cost estimates,
              and connect with leading specialists for a free consultation
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={openQuoteForm}
                className="bg-white text-teal-600 px-8 py-4 rounded-xl hover:bg-teal-50 transition font-semibold text-lg"
              >
                Get Free Consultation
              </button>
              <Link
                to="/contact"
                className="border-2 border-white text-white px-8 py-4 rounded-xl hover:bg-white hover:text-teal-600 transition font-semibold text-lg flex items-center justify-center"
              >
                Book an Appointment
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Quote Form */}
      {showQuoteForm && (
        <div
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
          onClick={closeQuoteForm}
        >
          <div
            className="bg-white rounded-2xl p-8 max-w-md w-full relative shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeQuoteForm}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <X size={24} />
            </button>
            <h3 className="text-2xl font-bold text-teal-800 mb-2 text-center">
              Get a Quote
            </h3>
            <p className="text-gray-500 text-center mb-6 text-sm">
              We will contact you within 24 hours
            </p>
            <form className="space-y-4">
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:border-teal-500"
                value={formData.name}
                onChange={handleInputChange}
              />
              <input
                type="text"
                name="country"
                placeholder="Country"
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:border-teal-500"
                value={formData.country}
                onChange={handleInputChange}
              />
              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:border-teal-500"
                value={formData.phone}
                onChange={handleInputChange}
              />
              <button className="w-full bg-teal-600 text-white py-3 rounded-lg font-bold hover:bg-teal-700 transition">
                Submit Request
              </button>
            </form>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default SpecialtyListingPage;
