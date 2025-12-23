import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
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
  Sparkles,
  TrendingUp,
  Globe,
  ChevronDown,
  ChevronsLeft,
  ChevronsRight,
  Plane,
  MessageCircle,
  X,
  Activity,
  Search,
} from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const PAGE_SIZE = 3;

const NeuroSpineServicePage = () => {
  const [selectedDepartment, setSelectedDepartment] = useState("Neuro Spine");
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("Most Popular");
  const [departmentDropdown, setDepartmentDropdown] = useState(false);
  const [servicesDropdown, setServicesDropdown] = useState(false);
  const [page, setPage] = useState(1);

  // Testimonials state
  const [currentTestimonialSlide, setCurrentTestimonialSlide] = useState(0);
  const [testimonialCardsPerSlide, setTestimonialCardsPerSlide] = useState(4);
  const [selectedPatient, setSelectedPatient] = useState<PatientStory | null>(
    null
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const [showQuoteForm, setShowQuoteForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    country: "",
    phone: "",
  });

  interface Doctor {
    name: string;
    specialty: string;
    image: string;
    rating: number;
    reviews: number;
    experience: string;
    patientsTreated: string;
    whatsappNumber: string;
  }

  interface PatientStory {
    id: number;
    name: string;
    age: number;
    country: string;
    treatment: string;
    procedure: string;
    rating: number;
    date: string;
    clinic: string;
    location: string;
    story: string;
    image: string;
    recoveryTime: string;
    savings: string;
    activeTime: string;
  }

  interface Department {
    name: string;
    active: boolean;
    route: string;
  }

  interface Hospital {
    id: number;
    name: string;
    slug?: string;
    location: string;
    image: string;
    mapEmbedUrl: string;
    airportDistance: string;
    description: string;
    rating: number;
    reviews: number;
    specialties: string[];
    accreditation: string;
    procedures?: Array<{ name: string; price: number; priceRange: string }>;
    priceFrom: number;
    priceTo: number;
    priceFromText: string;
    priceToText: string;
    duration: string;
    surgeons: string;
    successRate: string;
    treatments: string[];
    services?: string[];
    features?: string[];
    isTopRated?: boolean;
  }

  const departments = [
    { name: "Orthopaedics", route: "/orthopaedic", active: true },
    { name: "Oncology", route: "/oncology-service", active: true },
    { name: "BMT", route: "/bmt", active: true },
    { name: "Neuro Spine", route: "/neuro-spine", active: true },
    { name: "GI Surgery", route: "/gi-surgery", active: true },
    { name: "Cardiac Surgery", route: "/cardiac", active: true },
    { name: "Pediatric Cardiac", route: "/pediatric-cardiac", active: false },
  ];

  const additionalServices = [
    "Single Level Decompression",
    "Fusion Surgery",
    "Cranioplasty",
    "Craniotomy",
    "Cervical Discectomy",
    "Epilepsy Surgery",
    "Deep Brain Stimulation",
    "Baclofen Pump",
    "VP Shunt",
    "NABH Accredited",
    "JCI Accredited",
  ];

  const neuroSpineHospitals: Hospital[] = [
    {
      id: 1,
      name: "Artemis Hospital",
      location: "Gurugram",
      image: "/images/Artimes-hospital.png",
      mapEmbedUrl:
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d172673.23096454516!2d76.97632531403718!3d28.49025518723343!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d1883aaaaaaab%3A0x404085140375fa28!2sArtemis%20Hospital%20Gurgaon!5e0!3m2!1sen!2sin!4v1755680098964!5m2!1sen!2sin",
      airportDistance: "30 min",
      description:
        "Leading neuro spine center with advanced neurosurgical expertise and cutting-edge brain and spine treatments",
      rating: 4.9,
      reviews: 1650,
      specialties: ["Brain Surgery", "Spine Surgery", "DBS Treatment"],
      accreditation: "JCI Accredited",
      procedures: [
        {
          name: "Single Level Decompression",
          price: 5500,
          priceRange: "5500-6500",
        },
        { name: "Cranioplasty", price: 7500, priceRange: "7500-8000" },
        { name: "Craniotomy", price: 6500, priceRange: "6500" },
        {
          name: "DBS (Deep Brain Stimulation)",
          price: 20000,
          priceRange: "20000-35000",
        },
      ],

      priceFrom: 5500,
      priceTo: 35000,
      priceFromText: "$5,500",
      priceToText: "$35,000",
      duration: "3-21 days",
      surgeons: "15+ Expert Neurosurgeons",
      successRate: "98.8%",
      treatments: ["Brain Surgery", "Spine Surgery", "Epilepsy Surgery"],
      services: [
        "JCI Accredited",
        "Advanced Neuro ICU",
        "24/7 Emergency Care",
        "International Patient Services",
        "Single Level Decompression",
        "Cranioplasty",
        "Deep Brain Stimulation",
        "VP Shunt",
      ],
      features: [
        "Advanced Neurosurgery",
        "24/7 Neuro ICU",
        "International Standards",
        "Expert Care",
      ],
      isTopRated: true,
    },
    {
      id: 2,
      name: "Medanta – The Medicity",
      location: "Gurugram",
      image: "/images/Medanta hospital.png",
      mapEmbedUrl:
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d25100.674650325403!2d77.04207290095964!3d28.43925289094894!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d186ec89f751b%3A0xdc2ab32fc4675cac!2sMedanta%20-%20The%20Medicity%2C%20Gurugram!5e0!3m2!1sen!2sin!4v1756989645357!5m2!1sen!2sin",
      airportDistance: "45 min",
      description:
        "Multi-specialty neuro institute with comprehensive brain and spine care and world-class surgical facilities",
      rating: 4.8,
      reviews: 2200,
      specialties: [
        "Complex Spine Surgery",
        "Pediatric Neurosurgery",
        "Skull Base Surgery",
      ],
      accreditation: "JCI Accredited",
      priceFrom: 6500,
      priceTo: 25000,
      priceFromText: "$6,500",
      priceToText: "$25,000",
      duration: "4-14 days",
      surgeons: "20+ Neurosurgeons",
      successRate: "98.5%",
      treatments: [
        "Complex Spine Surgery",
        "Brain Tumor Surgery",
        "Epilepsy Surgery",
      ],
      services: [
        "JCI Accredited",
        "Advanced Imaging",
        "International Patient Services",
        "Craniotomy",
        "Epilepsy Surgery",
        "Baclofen Pump",
      ],
      features: ["Advanced Technology", "Minimal Invasive", "Quick Recovery"],
    },
    {
      id: 3,
      name: "Indraprastha Apollo Hospital",
      location: "Delhi",
      image: "/images/Apollo-hospital.png",
      mapEmbedUrl:
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3504.9640329981867!2d77.28065237580833!3d28.54080077571503!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce6ad13eaaa99%3A0x3bc07ad476bc6d77!2sIndraprastha%20Apollo%20Hospital!5e0!3m2!1sen!2sin!4v1756991461879!5m2!1sen!2sin",
      airportDistance: "35 min",
      description:
        "Pioneer in neurosurgery with cutting-edge technology and world-renowned neurosurgical specialists",
      rating: 4.9,
      reviews: 1900,
      specialties: [
        "Robotic Neurosurgery",
        "Minimally Invasive Spine",
        "Gamma Knife",
      ],
      accreditation: "NABH Accredited",
      priceFrom: 7500,
      priceTo: 30000,
      priceFromText: "$7,500",
      priceToText: "$30,000",
      duration: "5-12 days",
      surgeons: "18+ Neurosurgeons",
      successRate: "98.9%",
      treatments: [
        "Minimally Invasive Surgery",
        "Brain Surgery",
        "Spine Surgery",
      ],
      services: [
        "NABH Accredited",
        "Gamma Knife Center",
        "Neuro Rehabilitation",
        "Cervical Discectomy",
        "VP Shunt",
      ],
      features: ["Robotic Technology", "Expert Care", "Modern Facility"],
    },
    {
      id: 4,
      name: "Max Super Speciality Hospital",
      location: "Saket",
      image: "/images/Max-hospital.png",
      mapEmbedUrl:
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3505.404836479848!2d77.20941967564929!3d28.527548975722187!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce1f427d4c5fb%3A0x582d47bbf4970bc1!2sMax%20Super%20Speciality%20Hospital%2C%20Saket%20(Max%20Saket)!5e0!3m2!1sen!2sin!4v1757500121695!5m2!1sen!2sin",
      airportDistance: "40 min",
      description:
        "Excellence in neurosurgery with personalized care and advanced neuro rehabilitation programs",
      rating: 4.7,
      reviews: 1700,
      specialties: [
        "Spine Surgery",
        "Brain Tumor Surgery",
        "Neurovascular Surgery",
      ],
      accreditation: "JCI Accredited",
      procedures: [
        {
          name: "Anterior Cervical Discectomy",
          price: 5500,
          priceRange: "5500-6500",
        },
        { name: "Epilepsy Surgery", price: 7500, priceRange: "7500" },
        { name: "Baclofen Pump", price: 15000, priceRange: "15000" },
        { name: "VP Shunt", price: 7500, priceRange: "7500" },
      ],

      priceFrom: 5500,
      priceTo: 15000,
      priceFromText: "$5,500",
      priceToText: "$15,000",
      duration: "4-10 days",
      surgeons: "15+ Neurosurgeons",
      successRate: "98.2%",
      treatments: ["Spine Surgery", "Brain Tumor Surgery", "Neuro Oncology"],
      services: [
        "JCI Accredited",
        "24/7 Emergency Care",
        "International Patient Services",
        "Fusion Surgery",
        "Epilepsy Surgery",
      ],
      features: ["Modern Equipment", "Personalized Care", "Quick Recovery"],
    },
    {
      id: 5,
      name: "Amrita Hospital",
      location: "Faridabad",
      image: "/images/amrita.jpeg",
      mapEmbedUrl:
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3508.7784121413547!2d77.35148897564575!3d28.425942375778142!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cdd15b0ae71a1%3A0x2e8e748a95efc0e7!2sAmrita%20Hospital%20Faridabad!5e0!3m2!1sen!2sin!4v1757500226901!5m2!1sen!2sin",
      airportDistance: "50 min",
      description:
        "Specialized neurosurgery center with comprehensive brain and spine treatment and rehabilitation",
      rating: 4.6,
      reviews: 1200,
      specialties: [
        "Complex Spine Surgery",
        "Pediatric Neurosurgery",
        "Neuro Oncology",
      ],
      accreditation: "NABH Accredited",
      priceFrom: 6500,
      priceTo: 20000,
      priceFromText: "$6,500",
      priceToText: "$20,000",
      duration: "3-12 days",
      surgeons: "12+ Neurosurgeons",
      successRate: "97.9%",
      treatments: ["Complex Spine Surgery", "Brain Surgery", "Neuro Oncology"],
      services: [
        "NABH Accredited",
        "Advanced Imaging",
        "Neuro Rehabilitation",
        "Single Level Decompression",
        "Craniotomy",
      ],
      features: ["Specialized Care", "Expert Team", "Modern Technology"],
    },
    {
      id: 6,
      name: "Sarvodaya Hospital",
      location: "Faridabad",
      image: "/images/sarvodaya.jpeg",
      mapEmbedUrl:
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7021.421579636364!2d77.32701639357907!3d28.36759210000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cdc86f7e855a9%3A0xdcdcb7b847e735dc!2sSarvodaya%20Hospital%2C%20Sec%208%20Faridabad!5e0!3m2!1sen!2sin!4v1757500343525!5m2!1sen!2sin",
      airportDistance: "55 min",
      description:
        "Affordable excellence in neurosurgical care with experienced surgeons and comprehensive rehabilitation",
      rating: 4.4,
      reviews: 950,
      specialties: ["Spine Surgery", "Brain Surgery", "Neuro Trauma"],
      accreditation: "NABH Accredited",
      priceFrom: 5500,
      priceTo: 12000,
      priceFromText: "$5,500",
      priceToText: "$12,000",
      duration: "4-8 days",
      surgeons: "10+ Neurosurgeons",
      successRate: "97.5%",
      treatments: ["Spine Surgery", "Brain Surgery", "Neuro Trauma"],
      services: [
        "NABH Accredited",
        "Neuro Rehabilitation",
        "24/7 Emergency Care",
        "Cervical Discectomy",
        "Fusion Surgery",
      ],
      features: ["Affordable Care", "Quality Treatment", "Experienced Team"],
    },
  ];

  // Doctors data
  const doctors = [
    {
      name: "Dr. Aditya Gupta",
      specialty: "Neurosurgeon & Spine Specialist",
      image: "/images/dr-dr-aditya-gupta.jpg",
      rating: 4.9,
      reviews: 285,
      experience: "25+ years",
      patientsTreated: "2,500+",
      whatsappNumber: "+919643452714",
    },
    {
      name: "Dr. Pawan Goyal",
      specialty: "Brain & Spine Surgeon",
      image: "/images/dr-dr-pawan-goyal.jpg",
      rating: 4.8,
      reviews: 245,
      experience: "22+ years",
      patientsTreated: "2,100+",
      whatsappNumber: "+919643452714",
    },
    {
      name: "Dr. S.K Rajan",
      specialty: "Neurosurgeon",
      image: "/images/dr-dr-sk-rajan.jpg",
      rating: 4.9,
      reviews: 198,
      experience: "20+ years",
      patientsTreated: "1,900+",
      whatsappNumber: "+919643452714",
    },
    {
      name: "Dr. Sanjeev Srivastava",
      specialty: "Pediatric Neurosurgeon",
      image: "/images/dr-dr-sanjeev-srivastava.jpg",
      rating: 4.7,
      reviews: 203,
      experience: "18+ years",
      patientsTreated: "1,600+",
      whatsappNumber: "+919643452714",
    },
    {
      name: "Dr. Anuvrat Sinha",
      specialty: "Spine Surgeon",
      image: "/images/dr-dr-anuvrat-sinha.jpg",
      rating: 4.6,
      reviews: 175,
      experience: "16+ years",
      patientsTreated: "1,800+",
      whatsappNumber: "+919643452714",
    },
  ];

  // Patient stories data
  const neuroSpinePatientStories = [
    {
      id: 1,
      name: "David Wilson",
      age: 45,
      country: "USA",
      treatment: "Brain Surgery",
      procedure: "Brain Tumor Removal",
      rating: 5,
      date: "Dec 05, 2024",
      clinic: "Artemis Hospital",
      location: "Gurgaon, India",
      story:
        "I was diagnosed with a brain tumor that was affecting my vision and speech. American doctors quoted $180,000 for the surgery with a 3-month wait. Through Medcasts, I found Dr. Sandeep Vaishya at Artemis Hospital. The advanced imaging and surgical planning were exceptional. Using microsurgery techniques, the tumor was completely removed without any damage to surrounding brain tissue. The post-operative care in the neuro ICU was world-class. Today, 6 months later, I'm completely recovered with normal vision and speech.",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      recoveryTime: "8 weeks",
      savings: "USD 140,000",
      activeTime: "Active 3 hours ago",
    },
    {
      id: 2,
      name: "Emma Thompson",
      age: 38,
      country: "UK",
      treatment: "Spine Surgery",
      procedure: "Single Level Decompression",
      rating: 5,
      date: "Nov 20, 2024",
      clinic: "Max Hospital",
      location: "Saket, India",
      story:
        "Chronic back pain from a herniated disc made my life unbearable. UK NHS had an 18-month waiting list, and private treatment cost £45,000. My research led me to Dr. Anil Kansal at Max Hospital through Medcasts. The single-level decompression surgery was performed with precision using minimally invasive techniques. The recovery was faster than expected with excellent physiotherapy support. Within 6 weeks, I was pain-free and back to my active lifestyle. The cost was 85% less than UK with superior outcomes.",
      image:
        "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=150&h=150&fit=crop&crop=face",
      recoveryTime: "6 weeks",
      savings: "£38,000",
      activeTime: "Active 2 hours ago",
    },
  ];

  const neuroSpineTreatmentTags = [
    "All",
    "Brain Surgery",
    "Spine Surgery",
    "Epilepsy Surgery",
    "DBS Treatment",
    "Pediatric Neurosurgery",
  ];

  // Filter and sort logic
  const filteredHospitals = neuroSpineHospitals.filter((hospital) => {
    const serviceMatch =
      selectedServices.length === 0 ||
      selectedServices.some((service) => hospital.services?.includes(service));
    return serviceMatch;
  });

  const sortedHospitals = [...filteredHospitals].sort((a, b) => {
    if (a.name === "Artemis Hospital") return -1;
    if (b.name === "Artemis Hospital") return 1;
    switch (sortBy) {
      case "Price: Low to High":
        return (
          parseInt(a.priceFromText.replace(/[$,]/g, "")) -
          parseInt(b.priceFromText.replace(/[$,]/g, ""))
        );
      case "Price: High to Low":
        return (
          parseInt(b.priceFromText.replace(/[$,]/g, "")) -
          parseInt(a.priceFromText.replace(/[$,]/g, ""))
        );
      case "Highest Rated":
        return b.rating - a.rating;
      default:
        return b.reviews - a.reviews;
    }
  });

  // Testimonials filtering
  const filteredPatients = neuroSpinePatientStories.filter((patient) => {
    const search = searchTerm.toLowerCase();
    const matchesSearch =
      patient.name.toLowerCase().includes(search) ||
      patient.country.toLowerCase().includes(search) ||
      patient.location.toLowerCase().includes(search) ||
      patient.procedure.toLowerCase().includes(search);
    const matchesFilter =
      activeFilter === "All" || patient.treatment === activeFilter;
    return matchesSearch && matchesFilter;
  });

  // Pagination logic
  const totalPages = Math.ceil(sortedHospitals.length / PAGE_SIZE);
  const paginatedHospitals = sortedHospitals.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE
  );

  // Testimonials pagination
  const totalTestimonialSlides = Math.max(
    1,
    Math.ceil(filteredPatients.length / testimonialCardsPerSlide)
  );

  // Handlers
  const handleServiceToggle = (service: string) => {
    setSelectedServices((prev: string[]) =>
      prev.includes(service)
        ? prev.filter((s) => s !== service)
        : [...prev, service]
    );
    setPage(1);
  };

  const handleDepartmentChange = (department: Department) => {
    if (department.name !== selectedDepartment) {
      setSelectedDepartment(department.name);
      setPage(1);

      // Navigate only if it's an active department and not the current page
      if (department.active && department.name !== "Neuro Spine") {
        window.location.href = department.route;
      } else if (!department.active) {
        alert(`${department.name} page is coming soon!`);
      }
    }
  };

  const openQuoteForm = () => setShowQuoteForm(true);
  const closeQuoteForm = () => {
    setShowQuoteForm(false);
    setFormData({ name: "", country: "", phone: "" });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // const handleQuoteSubmit = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   console.log('Quote form submitted:', formData);
  //   closeQuoteForm();
  // };

  // WhatsApp booking handler
  const handleBookAppointment = (doctor: Doctor) => {
    const message = encodeURIComponent(
      `Hello! I would like to book an appointment with ${doctor.name} (${doctor.specialty}). Please let me know the available slots.`
    );
    const whatsappUrl = `https://wa.me/${doctor.whatsappNumber}?text=${message}`;
    window.open(whatsappUrl, "_blank");
  };

  // General WhatsApp booking for treatment guide
  const handleGeneralBooking = () => {
    const message = encodeURIComponent(
      `Hello! I'm interested in Neuro Spine treatment services. Please help me book an appointment and provide more information about the procedures.`
    );
    const whatsappUrl = `https://wa.me/919643452714?text=${message}`;
    window.open(whatsappUrl, "_blank");
  };

  // Testimonials handlers
  const nextTestimonialSlide = () => {
    setCurrentTestimonialSlide((prev) => {
      const next = prev + 1;
      return next >= totalTestimonialSlides ? 0 : next;
    });
  };

  const prevTestimonialSlide = () => {
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

  // Close dropdowns on outside click
  React.useEffect(() => {
    const closeDropdowns = () => {
      setDepartmentDropdown(false);
      setServicesDropdown(false);
    };
    window.addEventListener("click", closeDropdowns);
    return () => window.removeEventListener("click", closeDropdowns);
  }, []);

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

  // Popular Doctors Slider Component
  const PopularDoctors = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [cardsPerSlide, setCardsPerSlide] = useState(4);

    // Responsive cards per slide
    useEffect(() => {
      const updateCardsPerSlide = () => {
        if (window.innerWidth < 768) {
          setCardsPerSlide(1);
        } else if (window.innerWidth < 1024) {
          setCardsPerSlide(2);
        } else {
          setCardsPerSlide(4);
        }
        setCurrentSlide(0);
      };

      updateCardsPerSlide();
      window.addEventListener("resize", updateCardsPerSlide);
      return () => window.removeEventListener("resize", updateCardsPerSlide);
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

    return (
      <section className="py-12 bg-gradient-to-br from-teal-50 to-cyan-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col items-center text-center mb-12 md:flex-row md:justify-between md:items-center md:text-left">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                Best Neuro Spine Doctors
              </h2>
              <p className="text-teal-700">
                Meet our expert neurosurgeons with years of experience
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
                            key={doctor.name}
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

                            {/* Book Appointment Button with WhatsApp Icon */}
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <Header />

      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-teal-700 via-teal-600 to-teal-500 py-8 lg:py-12 overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-5"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <div className="inline-flex items-center bg-white bg-opacity-20 text-white px-4 py-2 rounded-full text-sm font-medium mb-4 backdrop-blur-sm">
              <Sparkles size={16} className="mr-2" />
              #1 Destination for Neuro Spine Excellence
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
              Advanced Neuro Spine Care
              <span className="block bg-gradient-to-r from-teal-100 to-cyan-200 bg-clip-text text-transparent">
                in India
              </span>
            </h1>

            {/* Star Rating Section */}
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
                (1,650 reviews)
              </span>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={openQuoteForm}
                className="bg-white text-teal-700 px-6 py-3 rounded-xl hover:bg-teal-50 transition font-semibold"
              >
                Get a Free Medical Opinion
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Mobile Filters - Above cards on mobile */}
        <div className="lg:hidden mb-6">
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <h3 className="font-bold text-lg mb-4 flex items-center">
              <Shield size={20} className="mr-2 text-teal-600" />
              Filters
            </h3>
            {/* Department Dropdown */}
            <div
              className="mb-4 relative z-20"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => {
                  setDepartmentDropdown((v) => !v);
                  setServicesDropdown(false);
                }}
                className="w-full flex justify-between items-center px-3 py-2 rounded-lg bg-gray-100 text-left font-medium text-gray-700"
              >
                <span>
                  <Shield size={16} className="inline mr-2 text-teal-600" />
                  {selectedDepartment || "Select Department"}
                </span>
                <ChevronDown
                  size={16}
                  className={`${
                    departmentDropdown ? "rotate-180" : ""
                  } transition-transform`}
                />
              </button>
              {departmentDropdown && (
                <div className="absolute left-0 right-0 mt-2 bg-white border border-gray-100 rounded-lg shadow-lg z-30 text-gray-700">
                  {departments.map((department) => (
                    <button
                      key={department.name}
                      className={`block w-full px-4 py-2 text-left hover:bg-gray-50 ${
                        selectedDepartment === department.name
                          ? "bg-teal-50 font-semibold text-teal-700"
                          : ""
                      }`}
                      onClick={() => {
                        handleDepartmentChange(department);
                        setDepartmentDropdown(false);
                      }}
                    >
                      {department.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
            {/* Services Dropdown */}
            <div
              className="mb-4 relative z-10"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => {
                  setServicesDropdown((v) => !v);
                  setDepartmentDropdown(false);
                }}
                className="w-full flex justify-between items-center px-3 py-2 rounded-lg bg-gray-100 text-left font-medium text-gray-700"
              >
                <span>
                  <Globe size={16} className="inline mr-2 text-teal-600" />
                  {selectedServices.length === 0
                    ? "Select Services"
                    : `${selectedServices.length} Selected`}
                </span>
                <ChevronDown
                  size={16}
                  className={`${
                    servicesDropdown ? "rotate-180" : ""
                  } transition-transform`}
                />
              </button>
              {servicesDropdown && (
                <div className="absolute left-0 right-0 mt-2 bg-white border border-gray-100 rounded-lg shadow-lg z-20 max-h-52 overflow-y-auto text-gray-700">
                  {additionalServices.map((service) => (
                    <label
                      key={service}
                      className="flex items-center px-4 py-2 cursor-pointer hover:bg-gray-50"
                    >
                      <input
                        type="checkbox"
                        className="mr-2 h-4 w-4 accent-teal-600"
                        checked={selectedServices.includes(service)}
                        onChange={() => handleServiceToggle(service)}
                      />

                      {service}
                    </label>
                  ))}
                </div>
              )}
            </div>
            {/* Sort Dropdown */}
            <div>
              <select
                className="w-full px-3 py-2 rounded-lg bg-gray-100 text-gray-700 font-medium"
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
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Desktop Sidebar - Filters + Why Choose */}
          <div className="hidden lg:flex w-full lg:w-80 order-2 lg:order-1 flex-col gap-4">
            {/* Filters */}
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <h3 className="font-bold text-lg mb-4 flex items-center">
                <Shield size={20} className="mr-2 text-teal-600" />
                Filters
              </h3>
              {/* Department Dropdown */}
              <div
                className="mb-4 relative z-20"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => {
                    setDepartmentDropdown((v) => !v);
                    setServicesDropdown(false);
                  }}
                  className="w-full flex justify-between items-center px-3 py-2 rounded-lg bg-gray-100 text-left font-medium text-gray-700"
                >
                  <span>
                    <Shield size={16} className="inline mr-2 text-teal-600" />
                    {selectedDepartment || "Select Department"}
                  </span>
                  <ChevronDown
                    size={16}
                    className={`${
                      departmentDropdown ? "rotate-180" : ""
                    } transition-transform`}
                  />
                </button>
                {departmentDropdown && (
                  <div className="absolute left-0 right-0 mt-2 bg-white border border-gray-100 rounded-lg shadow-lg z-30 text-gray-700">
                    {departments.map((department) => (
                      <button
                        key={department.name}
                        className={`block w-full px-4 py-2 text-left hover:bg-gray-50 ${
                          selectedDepartment === department.name
                            ? "bg-teal-50 font-semibold text-teal-700"
                            : ""
                        }`}
                        onClick={() => {
                          handleDepartmentChange(department);
                          setDepartmentDropdown(false);
                        }}
                      >
                        {department.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              {/* Services Dropdown */}
              <div
                className="mb-4 relative z-10"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => {
                    setServicesDropdown((v) => !v);
                    setDepartmentDropdown(false);
                  }}
                  className="w-full flex justify-between items-center px-3 py-2 rounded-lg bg-gray-100 text-left font-medium text-gray-700"
                >
                  <span>
                    <Globe size={16} className="inline mr-2 text-teal-600" />
                    {selectedServices.length === 0
                      ? "Select Services"
                      : `${selectedServices.length} Selected`}
                  </span>
                  <ChevronDown
                    size={16}
                    className={`${
                      servicesDropdown ? "rotate-180" : ""
                    } transition-transform`}
                  />
                </button>
                {servicesDropdown && (
                  <div className="absolute left-0 right-0 mt-2 bg-white border border-gray-100 rounded-lg shadow-lg z-20 max-h-52 overflow-y-auto text-gray-700">
                    {additionalServices.map((service) => (
                      <label
                        key={service}
                        className="flex items-center px-4 py-2 cursor-pointer hover:bg-gray-50"
                      >
                        <input
                          type="checkbox"
                          className="mr-2 h-4 w-4 accent-teal-600"
                          checked={selectedServices.includes(service)}
                          onChange={() => handleServiceToggle(service)}
                        />

                        {service}
                      </label>
                    ))}
                  </div>
                )}
              </div>
              {/* Sort Dropdown */}
              <div>
                <select
                  className="w-full px-3 py-2 rounded-lg bg-gray-100 text-gray-700 font-medium"
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

            {/* Why Choose India Section */}
            <div className="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-xl p-6">
              <h4 className="font-semibold text-gray-900 flex items-center text-lg mb-4">
                <Globe size={18} className="mr-2 text-teal-600" />
                Why Choose India for Neuro Spine?
              </h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                  <div className="flex items-center gap-2">
                    <DollarSign size={16} className="text-green-600" />
                    <span className="text-gray-800 font-medium">
                      Cost Savings
                    </span>
                  </div>
                  <span className="font-bold text-green-700">80-90%</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                  <div className="flex items-center gap-2">
                    <Award size={16} className="text-blue-600" />
                    <span className="text-gray-800 font-medium">
                      Success Rate
                    </span>
                  </div>
                  <span className="font-bold text-blue-700">98%+</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                  <div className="flex items-center gap-2">
                    <Clock size={16} className="text-purple-600" />
                    <span className="text-gray-800 font-medium">Wait Time</span>
                  </div>
                  <span className="font-bold text-purple-700">1-2 weeks</span>
                </div>
              </div>
            </div>
          </div>

          {/* Hospital Cards */}
          <div className="w-full lg:flex-1 order-1 lg:order-2">
            <div className="space-y-6">
              {paginatedHospitals.map((hospital) => (
                <div
                  key={hospital.id}
                  className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 overflow-hidden"
                >
                  {hospital.isTopRated && (
                    <div className="absolute top-0 right-0 bg-gradient-to-l from-teal-600 to-teal-500 text-white px-4 py-2 rounded-bl-lg font-semibold text-sm flex items-center z-10">
                      <Award size={14} className="mr-1" />
                      Top Rated
                    </div>
                  )}

                  <div className="flex flex-col lg:flex-row">
                    {/* Image and Map */}
                    <div className="w-full lg:w-72 p-6 flex flex-col">
                      <div className="w-full h-36 bg-gray-100 rounded-xl overflow-hidden mb-4">
                        <img
                          src={hospital.image}
                          alt={hospital.name}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                        />
                      </div>

                      <div className="w-full h-36 bg-gray-100 rounded-xl overflow-hidden mb-3">
                        <iframe
                          src={hospital.mapEmbedUrl}
                          width="100%"
                          height="100%"
                          style={{
                            border: 0,
                            borderRadius: "12px",
                          }}
                          loading="lazy"
                          referrerPolicy="no-referrer-when-downgrade"
                          title={`${hospital.name} Location`}
                        />
                      </div>

                      <div className="flex items-center gap-2 text-teal-600 bg-teal-50 px-3 py-1 rounded-lg">
                        <Plane size={14} />
                        <span className="text-sm font-medium">
                          {hospital.airportDistance} from airport
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 p-6 lg:p-8 flex flex-col justify-between">
                      <div>
                        <div className="flex flex-col lg:flex-row justify-between items-start mb-3 gap-2">
                          <div className="flex-1">
                            <h3 className="text-xl lg:text-2xl font-bold text-gray-900 hover:text-teal-600 mb-2 transition-colors">
                              {hospital.name}
                            </h3>
                            <div className="flex flex-wrap items-center gap-3 text-gray-600 mb-2">
                              <div className="flex items-center gap-1">
                                <MapPin size={16} className="text-teal-600" />

                                <span className="font-medium">
                                  {hospital.location}
                                </span>
                              </div>
                              <span className="bg-gradient-to-r from-teal-100 to-cyan-100 text-teal-800 px-3 py-1 rounded-full text-sm font-medium">
                                {hospital.accreditation}
                              </span>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-xl lg:text-2xl font-bold bg-gradient-to-r from-teal-600 to-teal-700 bg-clip-text text-transparent">
                              {hospital.priceFromText}
                            </div>
                            <div className="text-sm text-gray-500">
                              Starting from
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-wrap items-center gap-4 mb-3">
                          <div className="flex items-center gap-1">
                            <Star
                              className="fill-yellow-400 text-yellow-400"
                              size={16}
                            />

                            <span className="font-bold text-gray-900">
                              {hospital.rating}
                            </span>
                            <span className="text-gray-500 text-sm">
                              ({hospital.reviews} reviews)
                            </span>
                          </div>
                          <div className="flex items-center gap-1 text-teal-600">
                            <TrendingUp size={14} />
                            <span className="font-semibold text-sm">
                              {hospital.successRate} Success Rate
                            </span>
                          </div>
                        </div>

                        <p className="text-gray-600 mb-3 leading-relaxed text-sm">
                          {hospital.description}
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 mb-3">
                          <div className="bg-teal-50 rounded-lg p-2 border border-teal-100">
                            <div className="text-xs text-teal-600 uppercase tracking-wide font-semibold">
                              Duration
                            </div>
                            <div className="text-gray-900 font-medium text-sm flex items-center gap-1">
                              <Clock size={12} className="text-teal-600" />

                              {hospital.duration}
                            </div>
                          </div>
                          <div className="bg-teal-50 rounded-lg p-2 border border-teal-100">
                            <div className="text-xs text-teal-600 uppercase tracking-wide font-semibold">
                              Surgeons
                            </div>
                            <div className="text-gray-900 font-medium text-sm flex items-center gap-1">
                              <Users size={12} className="text-teal-600" />

                              {hospital.surgeons}
                            </div>
                          </div>
                          <div className="bg-teal-50 rounded-lg p-2 sm:col-span-2 lg:col-span-1 border border-teal-100">
                            <div className="text-xs text-teal-600 uppercase tracking-wide font-semibold">
                              Specialties
                            </div>
                            <div className="text-gray-900 font-medium text-sm">
                              {hospital.specialties.slice(0, 2).join(", ")}
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-2 mb-4">
                          {hospital.features?.map((feature) => (
                            <span
                              key={feature}
                              className="px-2 py-1 bg-gradient-to-r from-teal-100 to-cyan-100 text-teal-800 text-xs rounded-full font-medium border border-teal-200"
                            >
                              {feature}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-3 mt-auto pt-3 border-t border-gray-100">
                        <div className="text-sm text-gray-500">
                          Complete package: {hospital.priceFromText} -{" "}
                          {hospital.priceToText}
                        </div>
                        <div className="flex flex-col sm:flex-row gap-2 w-full lg:w-auto">
                          <button className="flex-1 lg:flex-none border border-teal-600 text-teal-600 px-4 py-2 rounded-lg hover:bg-teal-50 transition font-semibold flex items-center justify-center gap-2 text-sm">
                            <Phone size={14} />
                            Contact
                          </button>
                          <Link
                            to={`/hospital/${
                              hospital.slug ||
                              hospital.name.toLowerCase().replace(/\s+/g, "-")
                            }/neurology`}
                            className="flex-1 lg:flex-none bg-gradient-to-r from-teal-600 to-teal-700 text-white px-4 py-2 rounded-lg hover:from-teal-700 hover:to-teal-800 transition font-semibold flex items-center justify-center gap-2 text-sm"
                          >
                            View Details
                            <ChevronRight size={14} />
                          </Link>
                        </div>
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
                  className="px-3 py-2 rounded-lg text-teal-700 bg-teal-50 font-semibold disabled:opacity-50 hover:bg-teal-100 transition-colors"
                  onClick={() => setPage(page - 1)}
                  disabled={page === 1}
                >
                  <ChevronsLeft size={16} className="inline" /> Prev
                </button>
                {Array.from({ length: totalPages }).map((_, idx) => (
                  <button
                    className={`px-3 py-2 rounded text-sm font-semibold transition-colors ${
                      page === idx + 1
                        ? "bg-teal-600 text-white shadow-sm"
                        : "bg-white text-teal-700 border border-teal-200 hover:bg-teal-50"
                    }`}
                    key={idx}
                    onClick={() => setPage(idx + 1)}
                  >
                    {idx + 1}
                  </button>
                ))}
                <button
                  className="px-3 py-2 rounded-lg text-teal-700 bg-teal-50 font-semibold disabled:opacity-50 hover:bg-teal-100 transition-colors"
                  onClick={() => setPage(page + 1)}
                  disabled={page === totalPages}
                >
                  Next <ChevronsRight size={16} className="inline" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Popular Doctors Section */}
      <PopularDoctors />

      {/* How It Works Section */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-teal-700 via-teal-600 to-teal-500 rounded-3xl p-8 text-white relative overflow-hidden">
            <div className="absolute top-4 right-4 w-12 h-12 bg-white bg-opacity-10 rounded-full animate-pulse"></div>
            <div className="absolute bottom-4 left-4 w-8 h-8 bg-white bg-opacity-10 rounded-full animate-pulse delay-1000"></div>

            <div className="relative z-10">
              <div className="text-center mb-6">
                <h2 className="text-2xl lg:text-3xl font-bold mb-2">
                  How It Works
                </h2>
                <p className="text-teal-100 text-sm">
                  Get world-class neuro spine treatment in 3 simple steps
                </p>
              </div>

              <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
                <div className="flex flex-col items-center text-center group">
                  <div className="w-16 h-16 bg-gradient-to-br from-white to-teal-100 rounded-full flex items-center justify-center mb-3 shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <MessageCircle size={28} className="text-teal-600" />
                  </div>
                  <h3 className="font-bold text-lg mb-1">Share Your Reports</h3>
                  <p className="text-teal-100 text-sm max-w-xs">
                    Upload your medical reports and get expert consultation
                  </p>
                </div>

                <div className="hidden md:block text-white opacity-60">
                  <ChevronRight size={24} />
                </div>

                <div className="flex flex-col items-center text-center group">
                  <div className="w-16 h-16 bg-gradient-to-br from-white to-teal-100 rounded-full flex items-center justify-center mb-3 shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <Activity size={28} className="text-teal-600" />
                  </div>
                  <h3 className="font-bold text-lg mb-1">Get Treatment Plan</h3>
                  <p className="text-teal-100 text-sm max-w-xs">
                    Receive personalized neuro spine treatment plan from
                    specialists
                  </p>
                </div>

                <div className="hidden md:block text-white opacity-60">
                  <ChevronRight size={24} />
                </div>

                <div className="flex flex-col items-center text-center group">
                  <div className="w-16 h-16 bg-gradient-to-br from-white to-teal-100 rounded-full flex items-center justify-center mb-3 shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <Plane size={28} className="text-teal-600" />
                  </div>
                  <h3 className="font-bold text-lg mb-1">Start Your Journey</h3>
                  <p className="text-teal-100 text-sm max-w-xs">
                    Travel to India and begin your transformation
                  </p>
                </div>
              </div>

              <div className="text-center">
                <button className="bg-white text-teal-700 px-8 py-3 rounded-full font-bold hover:bg-teal-50 transition-colors shadow-lg hover:shadow-xl transform hover:scale-105 duration-300">
                  Start Your Neuro Spine Journey
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Patient Stories Section */}
      <section className="py-16 bg-gradient-to-br from-teal-50 to-cyan-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Real{" "}
              <span className="text-teal-600">Neuro Spine Success Stories</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Discover how our patients transformed their lives through
              world-class neuro spine treatment in India
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <div className="flex-1 relative">
              <Search
                size={20}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              />

              <input
                type="text"
                placeholder="Search by name, country, or procedure..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              {neuroSpineTreatmentTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setActiveFilter(tag)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    activeFilter === tag
                      ? "bg-teal-600 text-white shadow-md"
                      : "bg-white text-gray-600 hover:bg-teal-50 hover:text-teal-700 border border-gray-200"
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          <div className="relative overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(-${currentTestimonialSlide * 100}%)`,
              }}
            >
              {Array.from({ length: totalTestimonialSlides }).map(
                (_, slideIndex) => (
                  <div key={slideIndex} className="w-full flex-shrink-0">
                    <div className={`grid gap-6 ${getTestimonialGridCols()}`}>
                      {filteredPatients
                        .slice(
                          slideIndex * testimonialCardsPerSlide,
                          (slideIndex + 1) * testimonialCardsPerSlide
                        )
                        .map((patient) => (
                          <div
                            key={patient.id}
                            className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer border border-teal-100 hover:border-teal-200 group"
                            onClick={() => openModal(patient)}
                          >
                            <div className="flex items-start justify-between mb-4">
                              <div className="flex items-center space-x-3">
                                <img
                                  src={patient.image}
                                  alt={patient.name}
                                  className="w-12 h-12 rounded-full object-cover border-2 border-teal-200"
                                />

                                <div>
                                  <h4 className="font-bold text-gray-900 group-hover:text-teal-700 transition-colors">
                                    {patient.name}
                                  </h4>
                                  <p className="text-sm text-gray-600">
                                    {patient.age} years • {patient.country}
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-center space-x-1">
                                {[...Array(patient.rating)].map((_, i) => (
                                  <Star
                                    key={i}
                                    size={14}
                                    className="text-yellow-400 fill-current"
                                  />
                                ))}
                              </div>
                            </div>

                            <div className="mb-4">
                              <div className="inline-flex items-center bg-teal-50 text-teal-700 px-3 py-1 rounded-full text-sm font-medium mb-2">
                                <Activity size={14} className="mr-1" />
                                {patient.treatment}
                              </div>
                              <p className="text-gray-700 text-sm leading-relaxed line-clamp-3">
                                {patient.story.substring(0, 150)}...
                              </p>
                            </div>

                            <div className="grid grid-cols-2 gap-3 mb-4">
                              <div className="bg-green-50 rounded-lg p-2 border border-green-100">
                                <div className="text-xs text-green-600 uppercase tracking-wide font-semibold">
                                  Recovery
                                </div>
                                <div className="text-gray-900 font-medium text-sm">
                                  {patient.recoveryTime}
                                </div>
                              </div>
                              <div className="bg-blue-50 rounded-lg p-2 border border-blue-100">
                                <div className="text-xs text-blue-600 uppercase tracking-wide font-semibold">
                                  Savings
                                </div>
                                <div className="text-gray-900 font-medium text-sm">
                                  {patient.savings}
                                </div>
                              </div>
                            </div>

                            <div className="flex items-center justify-between">
                              <div className="flex items-center text-xs text-gray-500">
                                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                                {patient.activeTime}
                              </div>
                              <button className="text-teal-600 hover:text-teal-700 font-medium text-sm group-hover:underline">
                                Read Full Story →
                              </button>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                )
              )}
            </div>
          </div>

          {totalTestimonialSlides > 1 && (
            <div className="flex justify-center gap-4 mt-8">
              <button
                onClick={prevTestimonialSlide}
                className="p-3 rounded-full bg-white shadow-lg hover:shadow-xl transition-all duration-300 border border-teal-100 hover:border-teal-200 group"
              >
                <ChevronLeft
                  size={20}
                  className="text-teal-600 group-hover:text-teal-700"
                />
              </button>
              <button
                onClick={nextTestimonialSlide}
                className="p-3 rounded-full bg-white shadow-lg hover:shadow-xl transition-all duration-300 border border-teal-100 hover:border-teal-200 group"
              >
                <ChevronRight
                  size={20}
                  className="text-teal-600 group-hover:text-teal-700"
                />
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Patient Story Modal */}
      {selectedPatient && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={closeModal}
        >
          <div
            className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto relative shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors z-10"
            >
              <X size={24} />
            </button>

            <div className="p-8">
              <div className="flex items-start space-x-6 mb-6">
                <img
                  src={selectedPatient.image}
                  alt={selectedPatient.name}
                  className="w-20 h-20 rounded-full object-cover border-4 border-teal-200"
                />

                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {selectedPatient.name}
                  </h3>
                  <p className="text-gray-600 mb-2">
                    {selectedPatient.age} years old • {selectedPatient.country}
                  </p>
                  <div className="flex items-center space-x-4 mb-2">
                    <div className="flex items-center space-x-1">
                      {[...Array(selectedPatient.rating)].map((_, i) => (
                        <Star
                          key={i}
                          size={16}
                          className="text-yellow-400 fill-current"
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-500">
                      {selectedPatient.date}
                    </span>
                  </div>
                  <div className="inline-flex items-center bg-teal-50 text-teal-700 px-3 py-1 rounded-full text-sm font-medium">
                    <Activity size={14} className="mr-1" />
                    {selectedPatient.treatment}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-teal-50 rounded-xl p-4 border border-teal-100">
                  <div className="text-sm text-teal-600 uppercase tracking-wide font-semibold mb-1">
                    Procedure
                  </div>
                  <div className="text-gray-900 font-medium">
                    {selectedPatient.procedure}
                  </div>
                </div>
                <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
                  <div className="text-sm text-blue-600 uppercase tracking-wide font-semibold mb-1">
                    Hospital
                  </div>
                  <div className="text-gray-900 font-medium">
                    {selectedPatient.clinic}
                  </div>
                  <div className="text-sm text-gray-600">
                    {selectedPatient.location}
                  </div>
                </div>
                <div className="bg-green-50 rounded-xl p-4 border border-green-100">
                  <div className="text-sm text-green-600 uppercase tracking-wide font-semibold mb-1">
                    Total Savings
                  </div>
                  <div className="text-gray-900 font-medium">
                    {selectedPatient.savings}
                  </div>
                </div>
              </div>

              <div className="prose max-w-none">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">
                  Patient's Journey
                </h4>
                <p className="text-gray-700 leading-relaxed">
                  {selectedPatient.story}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Procedure Pricing Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white rounded-3xl p-8 shadow-sm">
          <div className="text-center mb-8">
            <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
              Neuro Spine Procedure Pricing
            </h3>
            <p className="text-gray-600 text-lg">
              Transparent pricing for major neuro spine procedures
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-100">
              <h4 className="font-bold text-gray-900 mb-3 text-lg">
                Single Level Decompression
              </h4>
              <div className="text-2xl font-bold text-green-600 mb-2">
                $5,500
              </div>
              <div className="text-sm text-gray-600">Starting from</div>
              <div className="text-xs text-gray-500 mt-2">
                Range: $5,500 - $6,500
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100">
              <h4 className="font-bold text-gray-900 mb-3 text-lg">
                Cranioplasty
              </h4>
              <div className="text-2xl font-bold text-blue-600 mb-2">
                $7,500
              </div>
              <div className="text-sm text-gray-600">Starting from</div>
              <div className="text-xs text-gray-500 mt-2">
                Range: $7,500 - $8,000
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-violet-50 rounded-xl p-6 border border-purple-100">
              <h4 className="font-bold text-gray-900 mb-3 text-lg">
                Deep Brain Stimulation
              </h4>
              <div className="text-2xl font-bold text-purple-600 mb-2">
                $20,000
              </div>
              <div className="text-sm text-gray-600">Starting from</div>
              <div className="text-xs text-gray-500 mt-2">
                Range: $20,000 - $35,000
              </div>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl p-6 border border-orange-100">
              <h4 className="font-bold text-gray-900 mb-3 text-lg">
                Craniotomy
              </h4>
              <div className="text-2xl font-bold text-orange-600 mb-2">
                $6,500
              </div>
              <div className="text-sm text-gray-600">Fixed price</div>
            </div>

            <div className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-xl p-6 border border-pink-100">
              <h4 className="font-bold text-gray-900 mb-3 text-lg">
                Epilepsy Surgery
              </h4>
              <div className="text-2xl font-bold text-pink-600 mb-2">
                $7,500
              </div>
              <div className="text-sm text-gray-600">Fixed price</div>
            </div>

            <div className="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-xl p-6 border border-teal-100">
              <h4 className="font-bold text-gray-900 mb-3 text-lg">
                VP Shunt Placement
              </h4>
              <div className="text-2xl font-bold text-teal-600 mb-2">
                $7,500
              </div>
              <div className="text-sm text-gray-600">Fixed price</div>
            </div>
          </div>

          <div className="text-center mt-6">
            <p className="text-sm text-gray-500">
              *Prices may vary based on hospital, complexity, and additional
              services required
            </p>
          </div>
        </div>

        {/* Enhanced CTA Section */}
        <div className="mt-16 text-center bg-gradient-to-br from-teal-600 via-teal-500 to-emerald-600 rounded-3xl p-12 text-white relative overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute top-8 left-8 w-16 h-16 bg-white rounded-full opacity-10 animate-pulse"></div>
            <div className="absolute bottom-8 right-8 w-12 h-12 bg-white rounded-full opacity-15 animate-pulse delay-1000"></div>
            <div className="absolute top-1/2 right-12 w-8 h-8 bg-white rounded-full opacity-20 animate-bounce"></div>
          </div>

          <div className="relative z-10">
            <h3 className="text-2xl lg:text-3xl font-bold mb-4">
              Ready to Start Your Neuro Spine Journey?
            </h3>
            <p className="text-teal-100 mb-8 text-lg max-w-2xl mx-auto">
              Get personalized treatment recommendations, cost estimates, and
              connect with our neuro spine experts for a free consultation
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={openQuoteForm}
                className="bg-white text-teal-600 px-8 py-4 rounded-xl hover:bg-teal-50 transition font-semibold text-lg"
              >
                Get Free Medical Opinion
              </button>
              <button
                onClick={handleGeneralBooking}
                className="border-2 border-white text-white px-8 py-4 rounded-xl hover:bg-white hover:text-teal-600 transition font-semibold text-lg"
              >
                Book an Appointment
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Quote Form Modal */}
      {showQuoteForm && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={closeQuoteForm}
        >
          <div
            className="bg-white rounded-3xl p-8 max-w-md w-full relative shadow-2xl transform transition-all"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeQuoteForm}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X size={24} />
            </button>

            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-teal-700 mb-2">
                Get a Free Neuro Spine Quote
              </h3>
              <p className="text-gray-600">
                Fill out the form below and we'll get back to you within 24
                hours
              </p>
            </div>

            <form
              acceptCharset="UTF-8"
              action="https://app.formester.com/forms/fpPm6BIEb/submissions"
              method="POST"
              className="space-y-4"
            >
              <div>
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full border border-teal-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                  required
                />
              </div>

              <div>
                <input
                  type="text"
                  name="country"
                  placeholder="Country"
                  value={formData.country}
                  onChange={handleInputChange}
                  className="w-full border border-teal-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                  required
                />
              </div>

              <div>
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full border border-teal-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-teal-700 text-white py-3 rounded-xl font-semibold hover:bg-teal-800 transition-colors text-lg"
              >
                Submit Request
              </button>
            </form>

            <div className="mt-6 pt-4 border-t border-gray-100">
              <p className="text-xs text-gray-500 text-center flex items-center justify-center">
                <span className="inline-block w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                Your information is 100% confidential
              </p>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default NeuroSpineServicePage;
