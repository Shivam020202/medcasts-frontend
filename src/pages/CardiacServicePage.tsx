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
  Heart,
  Sparkles,
  TrendingUp,
  Globe,
  ChevronDown,
  ChevronsLeft,
  ChevronsRight,
  Plane,
  MessageCircle,
  X,
  Calendar,
} from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const PAGE_SIZE = 3;

const CardiacServicePage = () => {
  const [selectedDepartment, setSelectedDepartment] =
    useState<string>("Cardiology");
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<string>("Most Popular");
  const [departmentDropdown, setDepartmentDropdown] = useState<boolean>(false);
  const [servicesDropdown, setServicesDropdown] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);

  // Testimonials state
  const [currentTestimonialSlide, setCurrentTestimonialSlide] =
    useState<number>(0);
  const [testimonialCardsPerSlide, setTestimonialCardsPerSlide] =
    useState<number>(4);
  const [selectedPatient, setSelectedPatient] = useState<PatientStory | null>(
    null
  );
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [activeFilter, setActiveFilter] = useState<string>("All");
  const [showQuoteForm, setShowQuoteForm] = useState<boolean>(false);
  const [formData, setFormData] = useState<{
    name: string;
    country: string;
    phone: string;
  }>({
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
    beforeAfter?: boolean;
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

  interface Department {
    name: string;
    active: boolean;
    route: string;
  }

  const departments = [
    { name: "Cardiology", route: "/cardiac", active: true },
    { name: "Oncology", route: "/oncology-service", active: true },
    { name: "BMT", route: "/bmt", active: true },
    { name: "Neuro Spine", route: "/neuro-spine", active: true },
    { name: "GI Surgery", route: "/gi-surgery", active: true },
    { name: "Orthopaedics", route: "/orthopaedic", active: true },
    { name: "Pediatric Cardiac", route: "/pediatric-cardiac", active: false },
  ];

  const additionalServices = [
    "CABG Surgery",
    "Angioplasty",
    "Valve Replacement",
    "Pacemaker Implantation",
    "Heart Catheterization",
    "Bypass Surgery",
  ];

  const cardiacHospitals: Hospital[] = [
    {
      id: 1,
      name: "Artemis Hospital",
      location: "Gurugram",
      image: "/images/Artimes-hospital.png",
      mapEmbedUrl:
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d172673.23096454516!2d76.97632531403718!3d28.49025518723343!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d1883aaaaaaab%3A0x404085140375fa28!2sArtemis%20Hospital%20Gurgaon!5e0!3m2!1sen!2sin!4v1755680098964!5m2!1sen!2sin",
      airportDistance: "30 min",
      description:
        "Leading cardiac center with state-of-the-art catheterization labs and expert cardiovascular surgeons",
      rating: 4.8,
      reviews: 1450,
      specialties: [
        "Interventional Cardiology",
        "Cardiac Surgery",
        "Electrophysiology",
      ],
      accreditation: "JCI Accredited",
      procedures: [
        { name: "CABG Surgery", price: 5200, priceRange: "5200-7500" },
        { name: "Angioplasty", price: 3500, priceRange: "3500-5000" },
        {
          name: "Valve Replacement",
          price: 6500,
          priceRange: "6500-8500",
        },
        {
          name: "Pacemaker Implantation",
          price: 4500,
          priceRange: "4500-6000",
        },
      ],

      priceFrom: 3500,
      priceTo: 8500,
      priceFromText: "$3,500",
      priceToText: "$8,500",
      duration: "3-14 days",
      surgeons: "15+ Cardiac Surgeons",
      successRate: "98.5%",
      treatments: ["Heart Surgery", "Vascular Surgery", "Thoracic Surgery"],
      services: [
        "JCI Accredited",
        "Advanced ICU",
        "24/7 Emergency Care",
        "International Patient Services",
        "Heart Transplant",
        "Robotic Surgery",
        "Minimally Invasive Surgery",
        "Cardiac Rehab",
      ],
      features: [
        "Advanced Technology",
        "Experienced Team",
        "International Standards",
        "Affordable Care",
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
        "World-class Heart Institute offering comprehensive cardiac care with highest success rates",
      rating: 4.9,
      reviews: 2100,
      specialties: [
        "Complex Cardiac Surgery",
        "Pediatric Cardiology",
        "Heart Transplant",
      ],
      accreditation: "JCI Accredited",
      priceFrom: 4000,
      priceTo: 12000,
      priceFromText: "$4,000",
      priceToText: "$12,000",
      duration: "5-21 days",
      surgeons: "20+ Cardiac Surgeons",
      successRate: "99.1%",
      treatments: ["Heart Transplant", "Robotic Heart Surgery", "TAVR"],
      services: [
        "JCI Accredited",
        "Hybrid Cath Lab",
        "Dedicated Cardiac ICU",
        "International Patient Services",
        "ECMO Support",
        "LVAD",
      ],
      features: ["World Class Facility", "Top Surgeons", "Latest Technology"],
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
        "Pioneer in cardiac care with a legacy of excellence and advanced robotic heart surgery program",
      rating: 4.8,
      reviews: 1800,
      specialties: [
        "Robotic Heart Surgery",
        "Preventive Cardiology",
        "Interventional Cardiology",
      ],
      accreditation: "NABH Accredited",
      priceFrom: 4500,
      priceTo: 10000,
      priceFromText: "$4,500",
      priceToText: "$10,000",
      duration: "4-15 days",
      surgeons: "18+ Cardiac Surgeons",
      successRate: "98.8%",
      treatments: ["Robotic Surgery", "Bypass Surgery", "Valve Repair"],
      services: [
        "NABH Accredited",
        "Robotic System",
        "Cardiac Rehabilitation",
        "24/7 Cath Lab",
        "Telemedicine",
      ],
      features: ["Pioneering Care", "Robotic Expertise", "Holistic Approach"],
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
        "Center of Excellence for Cardiac Sciences with focus on minimally invasive cardiac surgery",
      rating: 4.7,
      reviews: 1600,
      specialties: [
        "Minimally Invasive Surgery",
        "Heart Failure Clinic",
        "Electrophysiology",
      ],
      accreditation: "JCI Accredited",
      procedures: [
        { name: "MICS CABG", price: 6000, priceRange: "6000-7500" },
        {
          name: "Valve Replacement",
          price: 7000,
          priceRange: "7000-9000",
        },
        {
          name: "Pacemaker",
          price: 5000,
          priceRange: "5000-6500",
        },
        {
          name: "Angioplasty",
          price: 4000,
          priceRange: "4000-5500",
        },
      ],

      priceFrom: 4000,
      priceTo: 9000,
      priceFromText: "$4,000",
      priceToText: "$9,000",
      duration: "3-12 days",
      surgeons: "16+ Cardiac Surgeons",
      successRate: "98.2%",
      treatments: ["MICS", "Heart Failure Treatment", "Arrhythmia Management"],
      services: [
        "JCI Accredited",
        "Advanced Cardiac ICU",
        "International Patient Services",
        "Heart Failure Clinic",
        "Pacemaker Clinic",
      ],
      features: ["Minimally Invasive", "Patient Centric", "Advanced Tech"],
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
        "Comprehensive Cardiac Centre offering advanced pediatric and adult cardiac care",
      rating: 4.6,
      reviews: 1100,
      specialties: [
        "Pediatric Cardiology",
        "Adult Cardiac Surgery",
        "Heart Transplant",
      ],
      accreditation: "NABH Accredited",
      priceFrom: 3500,
      priceTo: 15000,
      priceFromText: "$3,500",
      priceToText: "$15,000",
      duration: "3-14 days",
      surgeons: "12+ Cardiac Surgeons",
      successRate: "97.8%",
      treatments: [
        "Congenital Heart Defects",
        "Valve Surgery",
        "Coronary Artery Disease",
      ],
      services: [
        "NABH Accredited",
        "Pediatric ICU",
        "Adult Cardiac ICU",
        "Fetal Cardiology",
        "Cardiac Imaging",
      ],
      features: ["Comprehensive Care", "Expert Team", "Modern Facility"],
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
        "Affordable advanced cardiac care with focus on interventional cardiology and cardiac surgery",
      rating: 4.5,
      reviews: 950,
      specialties: [
        "Interventional Cardiology",
        "Cardiac Surgery",
        "Electrophysiology",
      ],
      accreditation: "NABH Accredited",
      priceFrom: 3000,
      priceTo: 8000,
      priceFromText: "$3,000",
      priceToText: "$8,000",
      duration: "3-10 days",
      surgeons: "10+ Cardiac Surgeons",
      successRate: "97.5%",
      treatments: ["Angioplasty", "Pacemaker", "Bypass Surgery"],
      services: [
        "NABH Accredited",
        "24/7 Cardiac Emergency",
        "Cath Lab",
        "Non-Invasive Cardiology",
        "Cardiac ICU",
      ],
      features: ["Affordable Care", "Experienced Team", "Quality Treatment"],
    },
  ];

  // Doctors data
  const doctors: Doctor[] = [
    {
      name: "Dr. Naresh Trehan",
      specialty: "Cardiothoracic Surgeon",
      image: "/images/dr-dr-naresh-trehan.jpg",
      rating: 4.9,
      reviews: 350,
      experience: "40+ years",
      patientsTreated: "10,000+",
      whatsappNumber: "+919643452714",
    },
    {
      name: "Dr. Ashok Seth",
      specialty: "Interventional Cardiologist",
      image: "/images/dr-dr-ashok-seth.jpg",
      rating: 4.9,
      reviews: 310,
      experience: "35+ years",
      patientsTreated: "8,000+",
      whatsappNumber: "+919643452714",
    },
    {
      name: "Dr. Balbir Singh",
      specialty: "Cardiologist",
      image: "/images/dr-dr-balbir-singh.jpg",
      rating: 4.8,
      reviews: 280,
      experience: "30+ years",
      patientsTreated: "6,000+",
      whatsappNumber: "+919643452714",
    },
    {
      name: "Dr. Z.S. Meharwal",
      specialty: "Cardiac Surgeon",
      image: "/images/dr-dr-zs-meharwal.jpg",
      rating: 4.8,
      reviews: 260,
      experience: "25+ years",
      patientsTreated: "5,000+",
      whatsappNumber: "+919643452714",
    },
    {
      name: "Dr. Y.K. Mishra",
      specialty: "Cardiac Surgeon",
      image: "/images/dr-dr-yk-mishra.jpg",
      rating: 4.7,
      reviews: 240,
      experience: "30+ years",
      patientsTreated: "7,000+",
      whatsappNumber: "+919643452714",
    },
  ];

  // Patient stories data
  const cardiacPatientStories: PatientStory[] = [
    {
      id: 1,
      name: "John Smith",
      age: 55,
      country: "USA",
      treatment: "Heart Surgery",
      procedure: "CABG (Bypass Surgery)",
      rating: 5,
      date: "Dec 12, 2024",
      clinic: "Medanta Hospital",
      location: "Gurgaon, India",
      story:
        "I was diagnosed with severe coronary artery disease and needed a triple bypass. The cost in the US was overwhelming. Medcasts connected me with Dr. Naresh Trehan at Medanta. The facility is world-class, better than many US hospitals. The surgery was successful, and the nursing care was exceptional. I saved over $100,000 and received top-notch care. I'm back to hiking and enjoying life with my grandkids.",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      recoveryTime: "8 weeks",
      savings: "USD 100,000",
      activeTime: "Active 2 hours ago",
    },
    {
      id: 2,
      name: "Maria Garcia",
      age: 62,
      country: "Spain",
      treatment: "Valve Replacement",
      procedure: "TAVR",
      rating: 5,
      date: "Nov 28, 2024",
      clinic: "Apollo Hospital",
      location: "Delhi, India",
      story:
        "I needed a valve replacement but was considered high risk for open-heart surgery. Dr. Ashok Seth at Apollo Hospital performed a TAVR procedure. It was minimally invasive, and I was discharged in 3 days! The cost was a fraction of what it would be in Europe. The Medcasts team handled all the logistics, making the trip stress-free. I am forever grateful for their expertise and kindness.",
      image:
        "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=150&h=150&fit=crop&crop=face",
      recoveryTime: "2 weeks",
      savings: "EUR 25,000",
      activeTime: "Active 1 day ago",
    },
  ];

  const cardiacTreatmentTags = [
    "All",
    "Cardiac Surgery",
    "Interventional Cardiology",
    "Electrophysiology",
    "Pediatric Cardiac",
  ];

  // Filter and sort logic - Artemis Hospital first
  const filteredHospitals = cardiacHospitals.filter((hospital: any) => {
    const serviceMatch =
      selectedServices.length === 0 ||
      selectedServices.some((service) => hospital.services?.includes(service));
    return serviceMatch;
  });

  const sortedHospitals = [...filteredHospitals].sort((a: any, b: any) => {
    // Always put Artemis Hospital first
    if (a.name === "Artemis Hospital") return -1;
    if (b.name === "Artemis Hospital") return 1;

    switch (sortBy) {
      case "Price: Low to High":
        return a.priceFrom - b.priceFrom;
      case "Price: High to Low":
        return b.priceFrom - a.priceFrom;
      case "Highest Rated":
        return b.rating - a.rating;
      default:
        return b.reviews - a.reviews;
    }
  });

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

  // const handleQuoteSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   console.log('Quote form submitted:', formData);
  //   closeQuoteForm();
  //   // Add your form submission logic here
  // };

  // Testimonials filtering
  const filteredPatients = cardiacPatientStories.filter((patient) => {
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
      if (department.active && department.name !== "Cardiology") {
        window.location.href = department.route;
      } else if (!department.active) {
        alert(`${department.name} page is coming soon!`);
      }
    }
  };

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
      `Hello! I'm interested in Cardiac treatment services. Please help me book an appointment and provide more information about the procedures.`
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
                Best Cardiac Doctors
              </h2>
              <p className="text-teal-700">
                Meet our expert cardiologists with years of experience
              </p>
            </div>

            {/* Navigation Arrows - Updated to teal theme */}
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

                            {/* Experience and Patients Treated - Updated to teal theme */}
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

                            {/* Book Appointment Button with WhatsApp Icon - Updated to teal */}
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

      {/* Hero Section - Complete with Teal Background and Star Rating */}
      <div className="relative bg-gradient-to-br from-teal-700 via-teal-600 to-teal-500 py-8 lg:py-12 overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-5"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <div className="inline-flex items-center bg-white bg-opacity-20 text-white px-4 py-2 rounded-full text-sm font-medium mb-4 backdrop-blur-sm">
              <Sparkles size={16} className="mr-2" />
              #1 Destination for Cardiac Excellence
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
              Recover Faster with World-Class Cardiac Care
              <span className="block bg-gradient-to-r from-teal-100 to-cyan-200 bg-clip-text text-transparent">
                in India
              </span>
            </h1>

            {/* Star Rating Section */}
            <div className="flex items-center justify-center mb-6 text-white">
              <span className="text-2xl font-bold mr-3">4.9</span>
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
                (2,100 reviews)
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

      {/* Body */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 ">
        {/* Mobile Filters - Above cards on mobile */}
        <div className="lg:hidden mb-6">
          <div className="bg-white rounded-xl p-4">
            <h3 className="font-bold text-lg mb-4 flex items-center">
              <Shield size={20} className="mr-2 text-green-600" />
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
                  <Shield size={16} className="inline mr-2 text-green-600" />
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
                          ? "bg-green-50 font-semibold text-green-700"
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
                  <Globe size={16} className="inline mr-2 text-green-600" />
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
                        className="mr-2 h-4 w-4 accent-green-600"
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
            <div className="bg-white rounded-xl p-4">
              <h3 className="font-bold text-lg mb-4 flex items-center">
                <Shield size={20} className="mr-2 text-green-600" />
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
                    <Shield size={16} className="inline mr-2 text-green-600" />
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
                            ? "bg-green-50 font-semibold text-green-700"
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
                    <Globe size={16} className="inline mr-2 text-green-600" />
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
                          className="mr-2 h-4 w-4 accent-green-600"
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
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6">
              <h4 className="font-semibold text-gray-900 flex items-center text-lg mb-4">
                <Globe size={18} className="mr-2 text-green-600" />
                Why Choose India?
              </h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                  <div className="flex items-center gap-2">
                    <DollarSign size={16} className="text-green-600" />
                    <span className="text-gray-800 font-medium">
                      Cost Savings
                    </span>
                  </div>
                  <span className="font-bold text-green-700">70-85%</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                  <div className="flex items-center gap-2">
                    <Award size={16} className="text-blue-600" />
                    <span className="text-gray-800 font-medium">
                      Success Rate
                    </span>
                  </div>
                  <span className="font-bold text-blue-700">98.7%+</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                  <div className="flex items-center gap-2">
                    <Clock size={16} className="text-purple-600" />
                    <span className="text-gray-800 font-medium">Wait Time</span>
                  </div>
                  <span className="font-bold text-purple-700">1-2 weeks</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                  <div className="flex items-center gap-2">
                    <Heart size={16} className="text-orange-500" />
                    <span className="text-gray-800 font-medium">Support</span>
                  </div>
                  <span className="font-bold text-orange-700">24/7</span>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content - Card List + Pagination */}
          <div className="flex-1 order-1 lg:order-2">
            {/* Cards List - with teal color theme */}
            <div className="space-y-6">
              {paginatedHospitals.map((hospital) => (
                <div
                  key={hospital.id}
                  className="bg-white rounded-2xl transition-all duration-300 group relative flex flex-col lg:flex-row overflow-hidden shadow-sm hover:shadow-lg border border-gray-100"
                  style={{ border: "1px solid #e5e7eb" }}
                >
                  {hospital.isTopRated && (
                    <div className="absolute top-0 right-0 bg-gradient-to-l from-teal-600 to-teal-500 text-white px-4 py-2 rounded-bl-lg font-semibold text-sm flex items-center z-10">
                      <Award size={14} className="mr-1" />
                      Top Rated
                    </div>
                  )}

                  {/* Image and Map Section - with airport distance */}
                  <div className="w-full lg:w-72 flex-shrink-0 p-6 flex flex-col items-center justify-center">
                    {/* Main Image */}
                    <div className="w-full h-36 bg-gray-100 rounded-xl overflow-hidden mb-4 flex items-center justify-center">
                      <img
                        src={hospital.image}
                        alt={hospital.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 rounded-xl"
                      />
                    </div>

                    {/* Google Maps Embedded */}
                    <div className="w-full h-36 bg-gray-100 rounded-xl overflow-hidden flex items-center justify-center mb-3">
                      <iframe
                        src={hospital.mapEmbedUrl}
                        width="100%"
                        height="100%"
                        style={{
                          border: 0,
                          borderRadius: "12px",
                          minHeight: "144px",
                        }}
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title={`${hospital.name} Location`}
                      />
                    </div>

                    {/* Airport Distance */}
                    <div className="flex items-center gap-2 text-teal-600 bg-teal-50 px-3 py-1 rounded-lg">
                      <Plane size={14} />
                      <span className="text-sm font-medium">
                        {hospital.airportDistance} from airport
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 flex flex-col p-6 lg:p-8 justify-between">
                    <div>
                      <div className="flex flex-col lg:flex-row justify-between items-start mb-3 gap-2">
                        <div className="flex-1 min-w-0">
                          <h3 className="text-xl lg:text-2xl font-bold text-gray-900 group-hover:text-teal-600 mb-2">
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

                      {/* Rating and Success Rate */}
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

                      {/* Description */}
                      <p className="text-gray-600 mb-3 leading-relaxed text-sm">
                        {hospital.description}
                      </p>

                      {/* Key Stats Grid */}
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

                      {/* Features */}
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

                    {/* Actions */}
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
                          to={
                            `/hospital/${
                              hospital.slug ||
                              hospital.name.toLowerCase().replace(/\s+/g, "-")
                            }/cardiac-surgery` ||
                            hospital.name === "Medanta – The Medicity"
                              ? "/medanta-cardiac"
                              : hospital.name === "Indraprastha Apollo Hospital"
                              ? "/apollo-cardiac"
                              : hospital.name ===
                                "Max Super Speciality Hospital"
                              ? "/max-cardiac"
                              : hospital.name === "Amrita Hospital"
                              ? "/amrita-cardiac"
                              : hospital.name === "Sarvodaya Hospital"
                              ? "/sarvodaya-cardiac"
                              : "#"
                          }
                          className="flex-1 lg:flex-none bg-gradient-to-r from-teal-600 to-teal-700 text-white px-4 py-2 rounded-lg hover:from-teal-700 hover:to-teal-800 transition font-semibold flex items-center justify-center gap-2 text-sm"
                        >
                          View Details
                          <ChevronRight size={14} />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination - Updated with teal theme */}
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

        {/* Popular Doctors Section */}
        <PopularDoctors />

        {/* How It Works Section - Premium Gradient Icon Version */}
        <section className="py-12">
          <div className="bg-gradient-to-br from-teal-700 via-teal-600 to-teal-500 rounded-3xl p-8 text-white relative overflow-hidden max-h-[450px]">
            {/* Background decorations */}
            <div className="absolute top-4 right-4 w-12 h-12 bg-white bg-opacity-10 rounded-full animate-pulse"></div>
            <div className="absolute bottom-4 left-4 w-8 h-8 bg-white bg-opacity-10 rounded-full animate-pulse delay-1000"></div>

            <div className="relative z-10 h-full flex flex-col justify-between">
              {/* Header */}
              <div className="text-center mb-6">
                <h2 className="text-2xl lg:text-3xl font-bold mb-2">
                  How It Works
                </h2>
                <p className="text-teal-100 text-sm">
                  Get world-class cardiac treatment in 3 simple steps
                </p>
              </div>

              {/* 3-Step Process with Gradient Icons */}
              <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
                {/* Step 1 - Report Icon with Gradient */}
                <div className="flex flex-col md:flex-row items-center text-center md:text-left flex-1">
                  <div className="bg-gradient-to-br from-white to-teal-50 text-teal-700 rounded-full w-14 h-14 flex items-center justify-center mb-3 md:mb-0 md:mr-4 shadow-lg flex-shrink-0 hover:shadow-xl transition-all duration-300 hover:scale-110">
                    <Shield size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">Share Reports</h3>
                    <p className="text-teal-100 text-sm leading-tight">
                      Upload cardiac reports securely
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

                {/* Step 2 - Consultation Icon with Gradient */}
                <div className="flex flex-col md:flex-row items-center text-center md:text-left flex-1">
                  <div className="bg-gradient-to-br from-white to-teal-50 text-teal-700 rounded-full w-14 h-14 flex items-center justify-center mb-3 md:mb-0 md:mr-4 shadow-lg flex-shrink-0 hover:shadow-xl transition-all duration-300 hover:scale-110">
                    <Users size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">Get Consultation</h3>
                    <p className="text-teal-100 text-sm leading-tight">
                      Expert cardiac review
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

                {/* Step 3 - Airplane Icon with Gradient */}
                <div className="flex flex-col md:flex-row items-center text-center md:text-left flex-1">
                  <div className="bg-gradient-to-br from-white to-teal-50 text-teal-700 rounded-full w-14 h-14 flex items-center justify-center mb-3 md:mb-0 md:mr-4 shadow-lg flex-shrink-0 hover:shadow-xl transition-all duration-300 hover:scale-110">
                    <Plane size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">Travel & Treat</h3>
                    <p className="text-teal-100 text-sm leading-tight">
                      Get world-class cardiac care
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

        {/* CARDIAC TESTIMONIALS SECTION - INTEGRATED DIRECTLY */}
        <section className="py-16 bg-gradient-to-br from-teal-50 via-white to-cyan-100">
          <div className="max-w-7xl mx-auto px-4">
            {/* Header */}
            <div className="mb-12">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
                <div className="mb-6 lg:mb-0">
                  <h2 className="text-4xl font-bold text-gray-900 mb-4">
                    Cardiac Success Stories
                  </h2>
                  <p className="text-lg text-teal-700 max-w-2xl">
                    Real patients sharing their transformative cardiac treatment
                    journeys. Discover how advanced heart surgery restored their
                    healthy lives.
                  </p>
                </div>

                {/* Search Bar */}
                <div className="flex flex-col sm:flex-row gap-4 items-center lg:flex-shrink-0">
                  <div className="w-full sm:w-80">
                    <input
                      type="text"
                      placeholder="Search by patient, procedure, or country"
                      className="w-full px-4 py-3 border border-teal-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <button className="bg-teal-600 text-white px-6 py-3 rounded-xl hover:bg-teal-700 transition-colors font-semibold whitespace-nowrap">
                    Search Stories
                  </button>
                </div>
              </div>
            </div>

            {/* Treatment Filter Tags */}
            <div className="flex flex-wrap gap-3 mb-8">
              {cardiacTreatmentTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => {
                    setActiveFilter(tag);
                    setCurrentTestimonialSlide(0);
                  }}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    activeFilter === tag
                      ? "bg-teal-600 text-white shadow-md"
                      : "bg-white text-teal-700 hover:bg-teal-50 border border-teal-300 hover:shadow-sm"
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>

            {/* Navigation and Slider */}
            <div className="relative">
              {/* Navigation Arrows */}
              {totalTestimonialSlides > 1 && (
                <>
                  <button
                    onClick={prevTestimonialSlide}
                    className="absolute right-16 -top-2 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 border border-teal-300 z-10 hover:bg-teal-50"
                    aria-label="Previous slide"
                  >
                    <ChevronLeft size={20} className="text-teal-700" />
                  </button>

                  <button
                    onClick={nextTestimonialSlide}
                    className="absolute right-2 -top-2 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 border border-teal-300 z-10 hover:bg-teal-50"
                    aria-label="Next slide"
                  >
                    <ChevronRight size={20} className="text-teal-700" />
                  </button>
                </>
              )}

              {/* Slider Container */}
              <div className="overflow-hidden rounded-2xl">
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
                      const endIndex = Math.min(
                        startIndex + testimonialCardsPerSlide,
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
                          style={{ width: `${100 / totalTestimonialSlides}%` }}
                        >
                          <div
                            className={`grid gap-6 ${getTestimonialGridCols()} px-2`}
                          >
                            {slidePatients.map((patient: any) => (
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
                                      {(patient as any).activeTime}
                                    </span>
                                  </div>
                                  <div className="absolute top-3 right-3 bg-teal-600 text-white rounded-full px-2 py-1">
                                    <span className="text-xs font-medium">
                                      ✓ Verified
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
                                      <div className="flex">
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
                                  </div>

                                  <p className="text-sm text-teal-700 mb-3 line-clamp-3 leading-relaxed">
                                    {patient.story.substring(0, 140)}...
                                  </p>

                                  {/* Treatment Info */}
                                  <div className="flex flex-wrap gap-2 mb-4">
                                    <span className="text-xs bg-teal-50 text-teal-700 px-3 py-1 rounded-full font-medium border border-teal-200">
                                      {patient.procedure}
                                    </span>
                                    <span className="text-xs bg-blue-50 text-blue-600 px-3 py-1 rounded-full font-medium">
                                      {patient.recoveryTime}
                                    </span>
                                  </div>

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
                                      <div className="text-xs text-teal-600">
                                        {patient.clinic}
                                      </div>
                                    </div>
                                    <button
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        openModal(patient);
                                      }}
                                      className="text-teal-600 text-sm font-semibold hover:text-teal-700 transition-colors bg-teal-50 hover:bg-teal-100 px-3 py-1 rounded-lg"
                                    >
                                      Read Full Story
                                    </button>
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

              {/* Slide Indicators */}
              {totalTestimonialSlides > 1 && (
                <div className="flex justify-center mt-8 space-x-2">
                  {Array.from({ length: totalTestimonialSlides }).map(
                    (_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentTestimonialSlide(index)}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${
                          index === currentTestimonialSlide
                            ? "bg-teal-600 scale-110 shadow-sm"
                            : "bg-gray-300 hover:bg-gray-400"
                        }`}
                        aria-label={`Go to slide ${index + 1}`}
                      />
                    )
                  )}
                </div>
              )}
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
                          <span className="text-xs text-teal-600 ml-2 font-medium">
                            ✓ Verified Patient
                          </span>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={closeModal}
                      className="p-2 hover:bg-white hover:bg-opacity-50 rounded-full transition-colors"
                      aria-label="Close modal"
                    >
                      <X size={20} className="text-teal-700" />
                    </button>
                  </div>

                  {/* Modal Content */}
                  <div className="p-6">
                    {/* Treatment Info Grid */}
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-xl p-4 border border-teal-100">
                        <div className="flex items-center mb-2">
                          <MapPin size={16} className="text-teal-600 mr-2" />
                          <span className="text-sm font-semibold text-gray-900">
                            Treatment Location
                          </span>
                        </div>
                        <p className="text-sm font-medium text-gray-700">
                          {selectedPatient.clinic}
                        </p>
                        <p className="text-xs text-teal-600">
                          {selectedPatient.location}
                        </p>
                      </div>

                      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-100">
                        <div className="flex items-center mb-2">
                          <Calendar size={16} className="text-blue-600 mr-2" />
                          <span className="text-sm font-semibold text-gray-900">
                            Procedure
                          </span>
                        </div>
                        <p className="text-sm font-medium text-gray-700">
                          {selectedPatient.procedure}
                        </p>
                        <p className="text-xs text-gray-500">
                          {selectedPatient.date}
                        </p>
                      </div>

                      <div className="bg-gradient-to-br from-purple-50 to-violet-50 rounded-xl p-4 border border-purple-100">
                        <div className="flex items-center mb-2">
                          <Clock size={16} className="text-purple-600 mr-2" />
                          <span className="text-sm font-semibold text-gray-900">
                            Recovery Time
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

                    {/* Full Story */}
                    <div className="mb-6">
                      <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                        <div className="w-1 h-6 bg-teal-600 rounded-full mr-3"></div>
                        Complete Recovery Journey
                      </h4>
                      <div className="bg-gray-50 rounded-xl p-6 border-l-4 border-teal-500">
                        <p className="text-gray-700 leading-relaxed text-base">
                          {selectedPatient.story}
                        </p>
                      </div>
                    </div>

                    {/* Treatment Badges */}
                    <div className="flex items-center justify-between">
                      <span className="inline-block px-4 py-2 rounded-full text-sm font-semibold bg-teal-100 text-teal-800 border border-teal-200">
                        {selectedPatient.treatment}
                      </span>
                      {selectedPatient.beforeAfter && (
                        <span className="text-xs bg-blue-50 text-blue-700 px-3 py-1 rounded-full font-medium border border-blue-200">
                          Before/After Photos Available
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Procedure Pricing Section - Updated with cardiac procedures */}
        <div className="mt-16 bg-white rounded-3xl p-8">
          <div className="text-center mb-8">
            <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
              Cardiac Procedure Pricing
            </h3>
            <p className="text-gray-600 text-lg">
              Transparent pricing for major cardiac procedures
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6">
              <h4 className="font-bold text-gray-900 mb-3 text-lg">
                CABG Surgery
              </h4>
              <div className="text-2xl font-bold text-green-600 mb-2">
                $5,200
              </div>
              <div className="text-sm text-gray-600">Starting from</div>
              <div className="text-xs text-gray-500 mt-2">
                Range: $5,200 - $8,500
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6">
              <h4 className="font-bold text-gray-900 mb-3 text-lg">
                Angioplasty
              </h4>
              <div className="text-2xl font-bold text-blue-600 mb-2">
                $3,500
              </div>
              <div className="text-sm text-gray-600">Starting from</div>
              <div className="text-xs text-gray-500 mt-2">
                Range: $3,500 - $6,200
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-violet-50 rounded-xl p-6">
              <h4 className="font-bold text-gray-900 mb-3 text-lg">
                Valve Replacement
              </h4>
              <div className="text-2xl font-bold text-purple-600 mb-2">
                $6,800
              </div>
              <div className="text-sm text-gray-600">Starting from</div>
              <div className="text-xs text-gray-500 mt-2">
                Range: $6,800 - $10,500
              </div>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-6">
              <h4 className="font-bold text-gray-900 mb-3 text-lg">
                Pacemaker Implantation
              </h4>
              <div className="text-2xl font-bold text-orange-600 mb-2">
                $4,500
              </div>
              <div className="text-sm text-gray-600">Starting from</div>
              <div className="text-xs text-gray-500 mt-2">
                Range: $4,500 - $7,500
              </div>
            </div>

            <div className="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-xl p-6">
              <h4 className="font-bold text-gray-900 mb-3 text-lg">
                Heart Catheterization
              </h4>
              <div className="text-2xl font-bold text-teal-600 mb-2">
                $1,800
              </div>
              <div className="text-sm text-gray-600">Starting from</div>
              <div className="text-xs text-gray-500 mt-2">
                Range: $1,800 - $3,500
              </div>
            </div>

            <div className="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-xl p-6">
              <h4 className="font-bold text-gray-900 mb-3 text-lg">
                Bypass Surgery
              </h4>
              <div className="text-2xl font-bold text-teal-600 mb-2">
                $5,500
              </div>
              <div className="text-sm text-gray-600">Starting from</div>
              <div className="text-xs text-gray-500 mt-2">
                Range: $5,500 - $9,200
              </div>
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
        <div className="mt-16 text-center bg-gradient-to-br from-teal-600 via-teal-500 to-cyan-600 rounded-3xl p-12 text-white relative overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute top-8 left-8 w-16 h-16 bg-white rounded-full opacity-10 animate-pulse"></div>
            <div className="absolute bottom-8 right-8 w-12 h-12 bg-white rounded-full opacity-15 animate-pulse delay-1000"></div>
            <div className="absolute top-1/2 right-12 w-8 h-8 bg-white rounded-full opacity-20 animate-bounce"></div>
          </div>

          <div className="relative z-10">
            <h3 className="text-2xl lg:text-3xl font-bold mb-4">
              Ready to Start Your Cardiac Treatment Journey?
            </h3>
            <p className="text-teal-100 mb-8 text-lg max-w-2xl mx-auto">
              Get personalized cardiac treatment recommendations, cost
              estimates, and connect with our cardiac experts for a free
              consultation
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
            {/* Close button */}
            <button
              onClick={closeQuoteForm}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Close form"
            >
              <X size={24} />
            </button>

            {/* Form Header */}
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-teal-700 mb-2">
                Get a Quote
              </h3>
              <p className="text-gray-600">
                Fill out the form below and we'll get back to you within 24
                hours
              </p>
            </div>

            {/* Form */}
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

            {/* Confidentiality Note */}
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

export default CardiacServicePage;
