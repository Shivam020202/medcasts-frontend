import React, { useState, useEffect } from "react";
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
  duration?: string;
  surgeons?: string;
  successRate?: string;
  treatments?: string[];
  services?: string[];
  features?: string[];
  isTopRated?: boolean;
}

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

interface Department {
  name: string;
  active: boolean;
  route: string;
}

const PAGE_SIZE = 3;

const OrthopaedicHospitals = () => {
  const [selectedDepartment, setSelectedDepartment] = useState("Orthopaedics");
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
    "Unilateral THR",
    "Bilateral THR",
    "Bilateral TKR",
    "Unilateral TKR",
    "Key hole surgery to repair ligaments",
    "Comal Tunnal Dolands",
  ];

  const orthopaedicHospitals: Hospital[] = [
    {
      id: 1,
      name: "Artemis Hospital",
      location: "Gurugram",
      image: "/images/Artimes-hospital.png",
      mapEmbedUrl:
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d172673.23096454516!2d76.97632531403718!3d28.49025518723343!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d1883aaaaaaab%3A0x404085140375fa28!2sArtemis%20Hospital%20Gurgaon!5e0!3m2!1sen!2sin!4v1755680098964!5m2!1sen!2sin",
      airportDistance: "30 min",
      description:
        "Leading orthopaedic center with state-of-the-art robotic surgery and world-class joint replacement expertise",
      rating: 4.8,
      reviews: 1450,
      specialties: ["Joint Replacement", "Spine Surgery", "Sports Medicine"],
      accreditation: "JCI Accredited",
      procedures: [
        { name: "Unilateral THR", price: 4200, priceRange: "4200-5500" },
        { name: "Bilateral THR", price: 8000, priceRange: "8000-10000" },
        { name: "Unilateral TKR", price: 3800, priceRange: "3800-5000" },
        { name: "Bilateral TKR", price: 6200, priceRange: "6200-7500" },
      ],

      priceFrom: 3800,
      priceTo: 10000,
      priceFromText: "$3,800",
      priceToText: "$10,000",
      duration: "5-14 days",
      surgeons: "20+ Expert Surgeons",
      successRate: "99.1%",
      treatments: ["Joint Replacement", "Spine Surgery", "Sports Medicine"],
      services: [
        "JCI Accredited",
        "Robotic Surgery",
        "24/7 Emergency Care",
        "International Patient Services",
        "Unilateral THR",
        "Bilateral THR",
        "Unilateral TKR",
        "Bilateral TKR",
      ],
      features: [
        "Robotic Surgery",
        "24/7 Care",
        "International Standards",
        "Premium Care",
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
        "Multi-specialty medical institute with comprehensive orthopaedic care and advanced surgical facilities",
      rating: 4.7,
      reviews: 2100,
      specialties: [
        "Orthopedic Oncology",
        "Pediatric Orthopedics",
        "Trauma Surgery",
      ],
      accreditation: "JCI Accredited",
      priceFrom: 4500,
      priceTo: 15000,
      priceFromText: "$4,500",
      priceToText: "$15,000",
      duration: "4-12 days",
      surgeons: "25+ Specialists",
      successRate: "99.2%",
      treatments: [
        "Orthopedic Oncology",
        "Trauma Surgery",
        "Joint Replacement",
      ],
      services: [
        "JCI Accredited",
        "Advanced Imaging",
        "International Patient Services",
        "Key hole surgery to repair ligaments",
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
        "Pioneer in robotic orthopaedic surgery with cutting-edge technology and world-renowned specialists",
      rating: 4.9,
      reviews: 1800,
      specialties: [
        "Robotic Surgery",
        "Minimally Invasive Procedures",
        "Complex Spine",
      ],
      accreditation: "NABH Accredited",
      priceFrom: 3500,
      priceTo: 11000,
      priceFromText: "$3,500",
      priceToText: "$11,000",
      duration: "6-10 days",
      surgeons: "20+ Orthopedists",
      successRate: "99.1%",
      treatments: [
        "Minimally Invasive Surgery",
        "Spine Surgery",
        "Joint Replacement",
      ],
      services: [
        "NABH Accredited",
        "Robotic Surgery",
        "Physiotherapy Center",
        "Comal Tunnal Dolands",
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
        "Excellence in joint replacement surgery with personalized care and advanced rehabilitation programs",
      rating: 4.5,
      reviews: 1600,
      specialties: ["Knee Replacement", "Hip Surgery", "Arthroscopy"],
      accreditation: "JCI Accredited",
      procedures: [
        { name: "Unilateral THR", price: 5270, priceRange: "5270-6500" },
        { name: "Bilateral THR", price: 8100, priceRange: "8100-10000" },
        { name: "Unilateral TKR", price: 5100, priceRange: "5100-6200" },
        { name: "Bilateral TKR", price: 7200, priceRange: "7200-8500" },
      ],

      priceFrom: 5100,
      priceTo: 10000,
      priceFromText: "$5,100",
      priceToText: "$10,000",
      duration: "7-15 days",
      surgeons: "18+ Surgeons",
      successRate: "98.5%",
      treatments: ["Joint Replacement", "Sports Medicine", "Trauma Surgery"],
      services: [
        "JCI Accredited",
        "24/7 Emergency Care",
        "International Patient Services",
        "Bilateral THR",
        "Bilateral TKR",
      ],
      features: ["Modern Equipment", "Personalized Care", "Quick Discharge"],
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
        "Specialized orthopaedic oncology center with comprehensive bone tumor treatment and rehabilitation",
      rating: 4.6,
      reviews: 1150,
      specialties: [
        "Bone Tumor Surgery",
        "Deformity Correction",
        "Hand Surgery",
      ],
      accreditation: "NABH Accredited",
      procedures: [
        { name: "Unilateral THR", price: 5500, priceRange: "5500-6800" },
        { name: "Bilateral THR", price: 8500, priceRange: "8500-10200" },
        { name: "Unilateral TKR", price: 4500, priceRange: "4500-5500" },
        { name: "Bilateral TKR", price: 7500, priceRange: "7500-8800" },
      ],

      priceFrom: 4500,
      priceTo: 10200,
      priceFromText: "$4,500",
      priceToText: "$10,200",
      duration: "5-12 days",
      surgeons: "15+ Specialists",
      successRate: "98.2%",
      treatments: [
        "Orthopedic Oncology",
        "Trauma Surgery",
        "Joint Replacement",
      ],
      services: [
        "NABH Accredited",
        "Advanced Imaging",
        "Physiotherapy Center",
        "Unilateral THR",
        "Unilateral TKR",
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
        "Affordable excellence in orthopaedic care with experienced surgeons and comprehensive rehabilitation",
      rating: 4.3,
      reviews: 890,
      specialties: [
        "Fracture Treatment",
        "Joint Reconstruction",
        "Physiotherapy",
      ],
      accreditation: "NABH Accredited",
      priceFrom: 2800,
      priceTo: 7200,
      priceFromText: "$2,800",
      priceToText: "$7,200",
      duration: "6-10 days",
      surgeons: "12+ Orthopedists",
      successRate: "97.8%",
      treatments: ["Trauma Surgery", "Joint Replacement", "Sports Medicine"],
      services: [
        "NABH Accredited",
        "Physiotherapy Center",
        "24/7 Emergency Care",
        "Key hole surgery to repair ligaments",
      ],
      features: ["Affordable Care", "Quality Treatment", "Experienced Team"],
    },
  ];

  // Updated doctors data with the specific doctors you provided
  const doctors = [
    {
      name: "Dr. IPS Oberoi",
      specialty: "Joint Replacement Surgeon",
      image: "/images/dr-dr-i-p-s-oberoi.jpg",
      rating: 4.9,
      reviews: 245,
      experience: "22+ years",
      patientsTreated: "3,500+",
      whatsappNumber: "+919643452714",
    },
    {
      name: "Dr. Ravi Sauhta",
      specialty: "Joint Replacement Surgeon",
      image: "/images/dr-dr-prof-ravi-sauhta.jpg",
      rating: 4.8,
      reviews: 189,
      experience: "18+ years",
      patientsTreated: "2,800+",
      whatsappNumber: "+919643452714",
    },
    {
      name: "Dr. Sanjay Sarup",
      specialty: "Paediatric Orthopaedic ",
      image: "/images/dr-dr-sanjay-sarup.jpg",
      rating: 4.7,
      reviews: 167,
      experience: "20+ years",
      patientsTreated: "2,200+",
      whatsappNumber: "+919643452714",
    },

    {
      name: "Dr. Devendra Yadav",
      specialty: "Orthopaedic Surgeon",
      image: "/images/dr-dr-prof-ravi-sauhta.jpg",
      rating: 4.6,
      reviews: 145,
      experience: "16+ years",
      patientsTreated: "2,500+",
      whatsappNumber: "+919643452714",
    },
  ];

  // Orthopedic patient stories data for testimonials
  const orthopaedicPatientStories = [
    {
      id: 1,
      name: "James Mitchell",
      age: 52,
      country: "Australia",
      treatment: "Joint Replacement",
      procedure: "Bilateral Knee Replacement",
      rating: 5,
      date: "Dec 10, 2024",
      clinic: "Artemis Hospital",
      location: "Gurgaon, India",
      story:
        "I was a marathon runner until arthritis destroyed both my knees. Walking became painful, and I couldn't climb stairs. Australian doctors quoted $120,000 for bilateral knee replacement with a 6-month waiting list. Through Medcasts, I found Dr. IPS Oberoi at Artemis Hospital. The robotic-assisted surgery was performed with incredible precision. Within 2 weeks, I was walking without pain. After 3 months of physiotherapy, I'm back to jogging. The care team was exceptional - they understood my athletic goals and tailored my recovery accordingly. Today, I'm planning my return to competitive running. The cost was 80% less than Australia, and the quality exceeded my expectations.",
      beforeAfter: true,
      image: "/images/James-Mitchell.png",
      recoveryTime: "8 weeks",
      savings: "AUD 95,000",
      activeTime: "Active 2 hours ago",
    },
    {
      id: 2,
      name: "Maria Santos",
      age: 38,
      country: "Brazil",
      treatment: "Spine Surgery",
      procedure: "Lumbar Spinal Fusion",
      rating: 5,
      date: "Nov 25, 2024",
      clinic: "Artemis Hospital",
      location: "Gurgaon, India",
      story:
        "A herniated disc left me bedridden for months. Brazilian surgeons said the operation was too risky, and I might be paralyzed. My family researched globally and found Dr. Sanjay Sarup at Artemis Hospital through Medcasts. Using advanced microsurgery techniques, he performed L4-L5 spinal fusion with minimal invasion. The precision was remarkable - no damage to surrounding nerves. I walked the next day after surgery! The physiotherapy team designed a specialized program for my recovery. Six months later, I'm back to my job as a dance instructor, pain-free and stronger than ever. Artemis gave me my life back when everyone else said it was impossible.",
      beforeAfter: true,
      image: "/images/Maria-Santos.png",
      recoveryTime: "12 weeks",
      savings: "BRL 180,000",
      activeTime: "Active 4 hours ago",
    },
    {
      id: 3,
      name: "Ahmed Al-Rashid",
      age: 29,
      country: "UAE",
      treatment: "Sports Medicine",
      procedure: "ACL Reconstruction",
      rating: 5,
      date: "Oct 30, 2024",
      clinic: "Artemis Hospital",
      location: "Gurgaon, India",
      story:
        "I tore my ACL during a football match in Dubai. Local surgeons said I'd never play professional football again. My career seemed over at 29. Medcasts connected me with Dr. Sandeep Chauhan at Artemis Hospital, who specializes in sports injuries. Using the latest hamstring graft technique and arthroscopic surgery, he reconstructed my ACL perfectly. The sports medicine team understood my athletic demands and created an intensive rehabilitation program. Today, just 8 months later, I'm back playing professional football and even stronger than before. The precision of the surgery and the rehabilitation program exceeded international standards. My teammates are amazed at my recovery speed.",
      beforeAfter: true,
      image: "/images/Ahmed-Al-Rashid.png",
      recoveryTime: "16 weeks",
      savings: "AED 45,000",
      activeTime: "Active 1 hour ago",
    },
    {
      id: 4,
      name: "Susan Thompson",
      age: 67,
      country: "UK",
      treatment: "Hip Replacement",
      procedure: "Total Hip Replacement",
      rating: 5,
      date: "Sep 15, 2024",
      clinic: "Artemis Hospital",
      location: "Gurgaon, India",
      story:
        "Severe arthritis in my hip made daily activities unbearable. NHS waiting time was 18 months, and private treatment in UK cost £35,000. My daughter found Artemis Hospital online, and we consulted Dr. Ravi Sauhta. The ceramic-on-ceramic hip replacement surgery was performed with robotic assistance for perfect positioning. What impressed me most was the post-operative care - nurses were available 24/7, and physiotherapy started immediately. Within 6 weeks, I was walking better than I had in years. The infection control and cleanliness standards exceeded many UK hospitals I've seen. Nine months later, I'm hiking again and living independently. The cost was fraction of UK prices with superior outcomes.",
      beforeAfter: true,
      image: "/images/Susan-Thompson.png",
      recoveryTime: "10 weeks",
      savings: "£28,000",
      activeTime: "Active 6 hours ago",
    },
    {
      id: 5,
      name: "Michael Chen",
      age: 34,
      country: "Canada",
      treatment: "Complex Orthopedic",
      procedure: "Limb Lengthening Surgery",
      rating: 5,
      date: "Aug 20, 2024",
      clinic: "Artemis Hospital",
      location: "Gurgaon, India",
      story:
        "I was born with a 6-inch leg length discrepancy that affected my entire life. Canadian surgeons said the procedure was too complex and risky. After extensive research, my family found Dr. Devendra Yadav at Artemis Hospital. The limb lengthening surgery using the Ilizarov method was performed flawlessly over 8 months. The precision in monitoring bone growth and preventing complications was exceptional. The orthopedic team's expertise in complex deformity corrections is world-class. Throughout the lengthy treatment, the staff provided emotional support along with medical care. Today, both my legs are equal length, and I'm walking normally for the first time in my life. This surgery changed everything - my confidence, career prospects, and quality of life.",
      beforeAfter: true,
      image: "/images/Michael-Chen.png",
      recoveryTime: "32 weeks",
      savings: "CAD 85,000",
      activeTime: "Active 1 day ago",
    },
    {
      id: 6,
      name: "Priya Sharma",
      age: 45,
      country: "Singapore",
      treatment: "Pediatric Orthopedic",
      procedure: "Scoliosis Correction (for daughter)",
      rating: 5,
      date: "Jul 12, 2024",
      clinic: "Artemis Hospital",
      location: "Gurgaon, India",
      story:
        "My 14-year-old daughter developed severe scoliosis with a 65-degree spinal curve. Singapore doctors recommended immediate surgery costing S$150,000. We consulted Dr. Sunil Marwah at Artemis Hospital, who specializes in pediatric spinal deformities. The spinal fusion surgery using titanium rods corrected her spine to near-normal alignment. What made the difference was the pediatric team's approach - they made my daughter comfortable and explained everything age-appropriately. The surgery lasted 6 hours, and the precision was remarkable. Recovery was faster than expected with excellent physiotherapy. Today, my daughter stands tall and confident, participating in all school activities. The psychological impact of the correction has been as important as the physical healing.",
      beforeAfter: true,
      image: "/images/Priya-Sharma.png",
      recoveryTime: "14 weeks",
      savings: "SGD 120,000",
      activeTime: "Active 3 days ago",
    },
  ];

  const orthoTreatmentTags = [
    "All",
    "Joint Replacement",
    "Spine Surgery",
    "Sports Medicine",
    "Hip Replacement",
    "Complex Orthopedic",
    "Pediatric Orthopedic",
  ];

  // Filter and sort logic - Artemis Hospital first
  const filteredHospitals = orthopaedicHospitals.filter((hospital) => {
    const serviceMatch =
      selectedServices.length === 0 ||
      selectedServices.some((service) => hospital.services?.includes(service));
    return serviceMatch;
  });

  const sortedHospitals = [...filteredHospitals].sort((a, b) => {
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

  // const handleQuoteSubmit = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   console.log('Quote form submitted:', formData);
  //   closeQuoteForm();
  //   // Add your form submission logic here
  // };

  // Testimonials filtering
  const filteredPatients = orthopaedicPatientStories.filter((patient) => {
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
    setSelectedServices((prev) =>
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
      if (department.active && department.name !== "Orthopaedics") {
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
      `Hello! I'm interested in Orthopaedic treatment services. Please help me book an appointment and provide more information about the procedures.`
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
                Best Orthopaedic Doctors
              </h2>
              <p className="text-teal-700">
                Meet our expert orthopedic specialists with years of experience
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
              #1 Destination for Orthopaedic Excellence
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
              Recover Faster with World-Class Orthopaedic Care
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
                (1,800 reviews)
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
                  <span className="font-bold text-green-700">60-80%</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                  <div className="flex items-center gap-2">
                    <Award size={16} className="text-blue-600" />
                    <span className="text-gray-800 font-medium">
                      Success Rate
                    </span>
                  </div>
                  <span className="font-bold text-blue-700">99%+</span>
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
                        <button
                          onClick={() => {
                            if (hospital.slug || hospital.name) {
                              const slug =
                                hospital.slug ||
                                hospital.name
                                  .toLowerCase()
                                  .replace(/\s+/g, "-");
                              window.location.href = `/hospital/${slug}/orthopedics`;
                            } else if (
                              hospital.name === "Medanta – The Medicity"
                            ) {
                              window.location.href = "/medanta-ortho";
                            } else if (
                              hospital.name === "Indraprastha Apollo Hospital"
                            ) {
                              window.location.href = "/apollo-ortho";
                            } else if (
                              hospital.name === "Max Super Speciality Hospital"
                            ) {
                              window.location.href = "/max-ortho";
                            } else if (hospital.name === "Amrita Hospital") {
                              window.location.href = "/amrita-ortho";
                            } else if (hospital.name === "Sarvodaya Hospital") {
                              window.location.href = "/sarvodaya-ortho";
                            }
                          }}
                          className="flex-1 lg:flex-none bg-gradient-to-r from-teal-600 to-teal-700 text-white px-4 py-2 rounded-lg hover:from-teal-700 hover:to-teal-800 transition font-semibold flex items-center justify-center gap-2 text-sm"
                        >
                          View Details
                          <ChevronRight size={14} />
                        </button>
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
                  Get world-class treatment in 3 simple steps
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
                      Upload medical reports securely
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
                      Expert review of your case
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
                      Get world-class treatment
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

        {/* ORTHOPEDIC TESTIMONIALS SECTION - INTEGRATED DIRECTLY */}
        <section className="py-16 bg-gradient-to-br from-teal-50 via-white to-emerald-100">
          <div className="max-w-7xl mx-auto px-4">
            {/* Header */}
            <div className="mb-12">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
                <div className="mb-6 lg:mb-0">
                  <h2 className="text-4xl font-bold text-gray-900 mb-4">
                    Orthopedic Success Stories
                  </h2>
                  <p className="text-lg text-teal-700 max-w-2xl">
                    Real patients sharing their transformative journeys from
                    pain to mobility. Discover how advanced orthopedic care
                    restored their active lives.
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
              {orthoTreatmentTags.map((tag) => (
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
                  <div className="flex items-center justify-between p-6 border-b border-teal-100 bg-gradient-to-r from-teal-50 to-emerald-50">
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
                      <div className="bg-gradient-to-br from-teal-50 to-emerald-50 rounded-xl p-4 border border-teal-100">
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

        {/* Procedure Pricing Section - Updated with new procedures */}
        <div className="mt-16 bg-white rounded-3xl p-8">
          <div className="text-center mb-8">
            <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
              Orthopaedic Procedure Pricing
            </h3>
            <p className="text-gray-600 text-lg">
              Transparent pricing for major orthopaedic procedures
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6">
              <h4 className="font-bold text-gray-900 mb-3 text-lg">
                Unilateral THR
              </h4>
              <div className="text-2xl font-bold text-green-600 mb-2">
                $4,200
              </div>
              <div className="text-sm text-gray-600">Starting from</div>
              <div className="text-xs text-gray-500 mt-2">
                Range: $4,200 - $6,800
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6">
              <h4 className="font-bold text-gray-900 mb-3 text-lg">
                Bilateral THR
              </h4>
              <div className="text-2xl font-bold text-blue-600 mb-2">
                $8,000
              </div>
              <div className="text-sm text-gray-600">Starting from</div>
              <div className="text-xs text-gray-500 mt-2">
                Range: $8,000 - $12,000
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-violet-50 rounded-xl p-6">
              <h4 className="font-bold text-gray-900 mb-3 text-lg">
                Unilateral TKR
              </h4>
              <div className="text-2xl font-bold text-purple-600 mb-2">
                $3,800
              </div>
              <div className="text-sm text-gray-600">Starting from</div>
              <div className="text-xs text-gray-500 mt-2">
                Range: $3,800 - $5,500
              </div>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-6">
              <h4 className="font-bold text-gray-900 mb-3 text-lg">
                Bilateral TKR
              </h4>
              <div className="text-2xl font-bold text-orange-600 mb-2">
                $6,200
              </div>
              <div className="text-sm text-gray-600">Starting from</div>
              <div className="text-xs text-gray-500 mt-2">
                Range: $6,200 - $8,800
              </div>
            </div>

            <div className="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-xl p-6">
              <h4 className="font-bold text-gray-900 mb-3 text-lg">
                Key hole surgery
              </h4>
              <div className="text-2xl font-bold text-teal-600 mb-2">
                $2,500
              </div>
              <div className="text-sm text-gray-600">Starting from</div>
              <div className="text-xs text-gray-500 mt-2">
                Range: $2,500 - $4,000
              </div>
            </div>

            <div className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-xl p-6">
              <h4 className="font-bold text-gray-900 mb-3 text-lg">
                Comal Tunnal Dolands
              </h4>
              <div className="text-2xl font-bold text-pink-600 mb-2">
                $1,800
              </div>
              <div className="text-sm text-gray-600">Starting from</div>
              <div className="text-xs text-gray-500 mt-2">
                Range: $1,800 - $3,200
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
        <div className="mt-16 text-center bg-gradient-to-br from-teal-600 via-teal-500 to-emerald-600 rounded-3xl p-12 text-white relative overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute top-8 left-8 w-16 h-16 bg-white rounded-full opacity-10 animate-pulse"></div>
            <div className="absolute bottom-8 right-8 w-12 h-12 bg-white rounded-full opacity-15 animate-pulse delay-1000"></div>
            <div className="absolute top-1/2 right-12 w-8 h-8 bg-white rounded-full opacity-20 animate-bounce"></div>
          </div>

          <div className="relative z-10">
            <h3 className="text-2xl lg:text-3xl font-bold mb-4">
              Ready to Start Your Treatment Journey?
            </h3>
            <p className="text-teal-100 mb-8 text-lg max-w-2xl mx-auto">
              Get personalized treatment recommendations, cost estimates, and
              connect with our medical experts for a free consultation
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

export default OrthopaedicHospitals;
