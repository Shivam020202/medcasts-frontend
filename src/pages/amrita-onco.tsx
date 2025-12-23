import React, { useState, useEffect } from 'react';
import { Star, MapPin, Phone, Mail, Calendar, Users, Award, CheckCircle, ChevronDown, ChevronUp, ChevronLeft, ChevronRight, Quote, Clock, Plane, Car, Shield, Heart } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const AmritaOncologyService = () => {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const treatments = [
  {
    name: "Chemotherapy",
    cost: "$1,200 - $3,500",
    description: "Advanced chemotherapy treatment using targeted drugs to destroy cancer cells with minimal side effects",
    duration: "3-6 hours per session",
    stay: "Outpatient/1 day"
  },
  {
    name: "Radiation Therapy",
    cost: "$2,800 - $6,500",
    description: "Precision radiation therapy using advanced LINAC technology to target cancer cells accurately",
    duration: "15-30 minutes per session",
    stay: "Outpatient"
  },
  {
    name: "Surgical Oncology",
    cost: "$4,500 - $15,000",
    description: "Comprehensive cancer surgery including minimally invasive and robotic surgical procedures",
    duration: "2-8 hours",
    stay: "3-7 days"
  },
  {
    name: "Immunotherapy",
    cost: "$3,800 - $8,500",
    description: "Advanced immunotherapy treatments to boost the body's immune system to fight cancer",
    duration: "2-4 hours per session",
    stay: "Outpatient/1 day"
  },
  {
    name: "Bone Marrow Transplant",
    cost: "$12,000 - $25,000",
    description: "Autologous and allogeneic bone marrow transplantation for blood cancers and disorders",
    duration: "3-6 hours",
    stay: "3-4 weeks"
  },
  {
    name: "Targeted Therapy",
    cost: "$2,200 - $6,800",
    description: "Precision medicine targeting specific cancer genes and proteins with minimal side effects",
    duration: "1-3 hours per session",
    stay: "Outpatient"
  },
  {
    name: "Stereotactic Radiosurgery",
    cost: "$5,500 - $12,000",
    description: "High-precision radiation therapy for brain tumors and metastases using advanced technology",
    duration: "1-4 hours",
    stay: "Outpatient/1 day"
  },
  {
    name: "Palliative Care",
    cost: "$800 - $2,500",
    description: "Comprehensive supportive care to improve quality of life for cancer patients",
    duration: "Ongoing",
    stay: "Outpatient"
  }];


  const doctors = [
      {
          name: "Dr. Bhaskar Viswanathan",
          specialization: "Program Head - Hematology & BMT",
          experience: "25+ years",
          patientsTreated: "5,000+",
          rating: "4.9",
          reviews: "189+",
          image: "/images/amrita/dr-bhaskar.webp",
          qualifications:
              "MBBS, MD (Internal Medicine), DM (Clinical Hematology)",
          expertise: [
              "Myeloid Cancers",
              "Blood and Marrow Transplantation (BMT)",
              "Cellular Therapy",
              "Myelomas & Amyloid",
              "Plasma Cell Dyscrasia",
              "Bone Marrow Failures",
              "Hemoglobinopathies",
              "Coagulation Disorders",
              "Benign Blood Disorders",
              "Pediatric Hematology",
          ],

          hospital: "Amrita Hospital, Faridabad",
          programFocus:
              "Myeloid Cancers, BMT/Cellular therapy, Myelomas, Amyloid/Plasma cell dyscrasia, Bone marrow failures, Hemoglobinopathies, Coagulation and other benign blood disorders of adult and childhood",
      },
      {
          name: "Dr. Neha Kumar",
          specialization: "Program Head - Lymphoid Malignancies & BMT",
          experience: "18+ years",
          patientsTreated: "3,200+",
          rating: "4.8",
          reviews: "142+",
          image: "/images/amrita/dr-neha-kumar-amrita-hospital-faridabad.webp",
          qualifications:
              "MBBS, MD, DM, Visiting Physician Fellowship in BMT/Cellular Therapy",
          expertise: [
              "Lymphoid Leukemias (ALL, CLL)",
              "Lymphomas",
              "BMT/CAR T/Cellular Therapy",
              "Haploidentical Transplants",
              "Thoracic & Gynecological Oncology",
              "Sarcoma",
              "Melanoma",
              "Childhood Cancers",
          ],

          hospital: "Amrita Hospital, Faridabad",
          programFocus:
              "Lymphoid leukemias (ALL, CLL), Lymphomas, BMT/CAR T/Cellular therapy/Haploidentical transplants, Thoracic and Gyne oncology, Sarcoma, Melanoma, Childhood cancers",
      },
      {
          name: "Dr. Prashant Mehta",
          specialization: "Program Head - Solid Tumors & Medical Oncology",
          experience: "15+ years",
          patientsTreated: "2,800+",
          rating: "4.7",
          reviews: "128+",
          image: "/images/amrita/dr-prashant.webp",
          qualifications: "MBBS, MD (Medicine), DM (Medical Oncology)",
          expertise: [
              "Head & Neck Cancer",
              "Neuro-oncology",
              "Breast Cancer",
              "Gastrointestinal Cancers",
              "Hepatobiliary Cancer",
              "Genitourinary Tract Cancers",
          ],

          hospital: "Amrita Hospital, Faridabad",
          programFocus:
              "Head & Neck Cancer, Neuro-oncology, Breast Cancer, Gastrointestinal Cancers, Hepatobiliary Cancer, and Genitourinary tract Cancers",
      },
      {
          name: "Dr. Pravas Chandra Mishra",
          specialization: "Assistant Professor - Palliative Care",
          experience: "12+ years",
          patientsTreated: "1,500+",
          rating: "4.6",
          reviews: "89+",
          image: "/images/amrita/dr-pravas-amritahospitals-faridabad.webp",
          qualifications:
              "MBBS, Diplomate Internal Medicine (American Board), Diplomate Palliative Care",
          expertise: [
              "Palliative Care",
              "Pain Management",
              "End-of-Life Care",
              "Supportive Oncology",
              "Symptom Management",
          ],

          hospital: "Amrita Hospital, Faridabad",
          programFocus:
              "Palliative Care and Pain Management for Cancer Patients",
      },
  ];




  const testimonials = [
  {
    name: "Sarah Mitchell",
    age: 54,
    country: "United Kingdom",
    treatment: "Breast Cancer Surgery & Chemotherapy",
    rating: 5,
    story: "Exceptional cancer care at Amrita Hospital. Dr. Suresh Raghavan and his team provided comprehensive treatment with advanced chemotherapy protocols. The multidisciplinary approach was outstanding.",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
    date: "Dec 2024",
    doctor: "Dr. Suresh Raghavan"
  },
  {
    name: "James Wilson",
    age: 62,
    country: "Australia",
    treatment: "Colon Cancer Surgery",
    rating: 5,
    story: "World-class surgical oncology care at Amrita Hospital. Dr. Ravi Kannan performed minimally invasive colon cancer surgery with excellent results. The care team was exceptional throughout.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
    date: "Nov 2024",
    doctor: "Dr. Ravi Kannan"
  },
  {
    name: "Maria Santos",
    age: 48,
    country: "Philippines",
    treatment: "Brain Tumor Radiosurgery",
    rating: 5,
    story: "Outstanding precision radiation therapy at Amrita Hospital. Dr. Priya Nair used advanced stereotactic radiosurgery for my brain tumor with remarkable precision and care.",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face",
    date: "Oct 2024",
    doctor: "Dr. Priya Nair"
  },
  {
    name: "Ahmed Al-Rahman",
    age: 41,
    country: "UAE",
    treatment: "Leukemia Treatment & BMT",
    rating: 5,
    story: "Excellent blood cancer treatment at Amrita Hospital. Dr. Ajith Kumar provided comprehensive leukemia treatment and bone marrow transplant with exceptional expertise and compassionate care.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    date: "Sep 2024",
    doctor: "Dr. Ajith Kumar"
  },
  {
    name: "Elena Petrova",
    age: 39,
    country: "Russia",
    treatment: "Ovarian Cancer Surgery",
    rating: 5,
    story: "Exceptional gynecologic oncology care at Amrita Hospital. Dr. Meera Sathyan performed robotic ovarian cancer surgery with outstanding skill. The comprehensive care was remarkable.",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=100&h=100&fit=crop&crop=face",
    date: "Aug 2024",
    doctor: "Dr. Meera Sathyan"
  }];


  // Slider state management
  const [currentDoctorSlide, setCurrentDoctorSlide] = useState(0);
  const [currentTestimonialSlide, setCurrentTestimonialSlide] = useState(0);
  const [doctorsPerSlide, setDoctorsPerSlide] = useState(3);
  const [testimonialsPerSlide, setTestimonialsPerSlide] = useState(2);

  // Responsive slider configuration
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
    window.addEventListener('resize', updateSlidesPerView);
    return () => window.removeEventListener('resize', updateSlidesPerView);
  }, []);

  const totalDoctorSlides = Math.ceil(doctors.length / doctorsPerSlide);
  const totalTestimonialSlides = Math.ceil(testimonials.length / testimonialsPerSlide);

  const nextDoctorSlide = () => {
    setCurrentDoctorSlide((prev) => (prev + 1) % totalDoctorSlides);
  };

  const prevDoctorSlide = () => {
    setCurrentDoctorSlide((prev) => (prev - 1 + totalDoctorSlides) % totalDoctorSlides);
  };

  const nextTestimonialSlide = () => {
    setCurrentTestimonialSlide((prev) => (prev + 1) % totalTestimonialSlides);
  };

  const prevTestimonialSlide = () => {
    setCurrentTestimonialSlide((prev) => (prev - 1 + totalTestimonialSlides) % totalTestimonialSlides);
  };

  const getDoctorGridCols = () => {
    if (doctorsPerSlide === 1) return 'grid-cols-1';
    if (doctorsPerSlide === 2) return 'grid-cols-1 md:grid-cols-2';
    return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3';
  };

  const getTestimonialGridCols = () => {
    if (testimonialsPerSlide === 1) return 'grid-cols-1';
    return 'grid-cols-1 lg:grid-cols-2';
  };

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
                              <span className="hover:text-teal-600 cursor-pointer">
                                  Home
                              </span>
                              <ChevronRight className="w-4 h-4" />
                              <span className="hover:text-teal-600 cursor-pointer">
                                  Specialties
                              </span>
                              <ChevronRight className="w-4 h-4" />
                              <span className="text-teal-600 font-medium">
                                  Oncology
                              </span>
                          </div>

                          <div className="mb-6">
                              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 leading-tight">
                                  Cancer Care Center of{" "}
                                  <span className="text-teal-600">
                                      Excellence
                                  </span>
                              </h1>
                              <p className="text-base sm:text-lg text-gray-600 mb-4 leading-relaxed max-w-3xl">
                                  Advanced comprehensive cancer care with
                                  cutting-edge technology, precision medicine,
                                  and experienced specialists at affordable
                                  costs.
                              </p>
                          </div>

                          {/* Image Grid */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                              <div className="relative group overflow-hidden rounded-xl shadow-lg">
                                  <img
                                      src="\images\amrita.jpeg"
                                      alt="Amrita Hospital - Cancer Care Center of Excellence"
                                      className="w-full h-48 sm:h-56 object-cover group-hover:scale-105 transition-transform duration-500"
                                  />

                                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                                  <div className="absolute top-4 left-4 bg-teal-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                                      🎗️ Cancer Excellence
                                  </div>
                                  <div className="absolute bottom-4 left-4 text-white">
                                      <h3 className="font-bold text-lg">
                                          Amrita Hospital
                                      </h3>
                                      <p className="text-sm opacity-90">
                                          Cancer Care Center of Excellence
                                      </p>
                                  </div>
                              </div>

                              <div className="grid grid-rows-2 gap-4">
                                  <div className="relative group overflow-hidden rounded-xl shadow-lg">
                                      <img
                                          src="\images\ortho\Advanced-Imaging.png"
                                          alt="Advanced Cancer Treatment Equipment"
                                          className="w-full h-24 sm:h-28 object-cover group-hover:scale-105 transition-transform duration-500"
                                      />

                                      <div className="absolute inset-0 bg-gradient-to-r from-teal-600/80 to-transparent flex items-center">
                                          <div className="text-white p-4">
                                              <h4 className="font-bold text-sm">
                                                  🔬 Advanced Technology
                                              </h4>
                                              <p className="text-xs opacity-90">
                                                  Precision Medicine
                                              </p>
                                          </div>
                                      </div>
                                  </div>
                                  <div className="relative group overflow-hidden rounded-xl shadow-lg">
                                      <img
                                          src="\images\ortho\Advanced-Tech.png"
                                          alt="World-Class Cancer Specialists"
                                          className="w-full h-28 sm:h-32 object-cover group-hover:scale-105 transition-transform duration-500"
                                      />

                                      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/80 to-transparent flex items-center">
                                          <div className="text-white p-4">
                                              <h4 className="font-bold text-sm">
                                                  👨‍⚕️ Expert Team
                                              </h4>
                                              <p className="text-xs opacity-90">
                                                  Cancer Specialists
                                              </p>
                                          </div>
                                      </div>
                                  </div>
                              </div>
                          </div>

                          {/* Features Grid */}
                          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                              <div className="bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition-shadow border border-teal-100">
                                  <div className="text-2xl mb-2">🎗️</div>
                                  <div className="text-sm font-bold text-gray-900 mb-1">
                                      Cancer Care
                                  </div>
                                  <div className="text-xs text-gray-600">
                                      Comprehensive Treatment
                                  </div>
                              </div>
                              <div className="bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition-shadow border border-teal-100">
                                  <div className="text-2xl mb-2">⚡</div>
                                  <div className="text-sm font-bold text-gray-900 mb-1">
                                      Precision Medicine
                                  </div>
                                  <div className="text-xs text-gray-600">
                                      Targeted Therapy
                                  </div>
                              </div>
                              <div className="bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition-shadow border border-teal-100">
                                  <div className="text-2xl mb-2">📊</div>
                                  <div className="text-sm font-bold text-gray-900 mb-1">
                                      92% Success
                                  </div>
                                  <div className="text-xs text-gray-600">
                                      Proven Results
                                  </div>
                              </div>
                              <div className="bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition-shadow border border-teal-100">
                                  <div className="text-2xl mb-2">🏆</div>
                                  <div className="text-sm font-bold text-gray-900 mb-1">
                                      NABL Accredited
                                  </div>
                                  <div className="text-xs text-gray-600">
                                      Quality Standards
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
                                              40 minutes from Delhi Airport
                                          </div>
                                          <div className="text-sm text-gray-600">
                                              IGI Airport - 40 km distance
                                          </div>
                                      </div>
                                  </div>

                                  <div className="flex items-center p-4 bg-teal-50 rounded-lg border border-teal-100">
                                      <Car className="w-6 h-6 text-teal-600 mr-3" />
                                      <div>
                                          <div className="font-semibold text-gray-900">
                                              Highway Access
                                          </div>
                                          <div className="text-sm text-gray-600">
                                              NH-19 & Delhi-Mumbai Expressway
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
                                              Sector 88, Faridabad, Haryana
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
                                          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3508.7784121413547!2d77.35148897564575!3d28.425942375778142!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cdd15b0ae71a1%3A0x2e8e748a95efc0e7!2sAmrita%20Hospital%20Faridabad!5e0!3m2!1sen!2sin!4v1757500226901!5m2!1sen!2sin"
                                          width="100%"
                                          height="210"
                                          style={{ border: 0 }}
                                          allowFullScreen=""
                                          loading="lazy"
                                          referrerPolicy="no-referrer-when-downgrade"
                                          className="rounded-lg"></iframe>
                                  </div>
                                  <div className="mt-3 text-center">
                                      <a
                                          href="https://maps.google.com/?q=Amrita+Hospital+Faridabad+Sector+88"
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          className="text-teal-600 text-sm font-medium hover:underline">
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
                                  Amrita Hospital Cancer Care Center of
                                  Excellence offers advanced comprehensive
                                  cancer care with cutting-edge technology,
                                  precision medicine, and experienced
                                  specialists providing world-class treatment at
                                  affordable costs.
                              </p>
                              <p>
                                  Our cancer center is equipped with
                                  state-of-the-art facilities including advanced
                                  LINAC systems, robotic surgery platforms, and
                                  comprehensive diagnostic imaging, allowing our
                                  experienced oncologists to provide
                                  personalized cancer treatment with excellent
                                  outcomes.
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
                                      onClick={() =>
                                          toggleSection("consultation")
                                      }
                                      className="w-full p-5 text-left flex items-center justify-between hover:bg-gray-50 transition-colors">
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
                                          Comprehensive cancer evaluation,
                                          advanced imaging studies, tumor board
                                          discussions, and personalized
                                          treatment planning with experienced
                                          specialists.
                                      </div>
                                  )}
                              </div>

                              <div className="border border-gray-200 rounded-xl overflow-hidden">
                                  <button
                                      onClick={() => toggleSection("treatment")}
                                      className="w-full p-5 text-left flex items-center justify-between hover:bg-gray-50 transition-colors">
                                      <div className="flex items-center">
                                          <div className="w-3 h-3 bg-teal-500 rounded-full mr-4"></div>
                                          <span className="font-semibold text-lg">
                                              Cancer Treatment
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
                                          Advanced cancer treatments including
                                          chemotherapy, radiation therapy,
                                          surgical oncology, and precision
                                          medicine with cutting-edge technology.
                                      </div>
                                  )}
                              </div>

                              <div className="border border-gray-200 rounded-xl overflow-hidden">
                                  <button
                                      onClick={() => toggleSection("recovery")}
                                      className="w-full p-5 text-left flex items-center justify-between hover:bg-gray-50 transition-colors">
                                      <div className="flex items-center">
                                          <div className="w-3 h-3 bg-teal-500 rounded-full mr-4"></div>
                                          <span className="font-semibold text-lg">
                                              Recovery & Follow-up
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
                                          Comprehensive post-treatment care,
                                          survivorship programs, and long-term
                                          follow-up care with monitoring
                                          systems.
                                      </div>
                                  )}
                              </div>
                          </div>
                      </div>

                      {/* Treatment Plans - Updated Section with Teal Colors */}
                      <div className="bg-white rounded-2xl shadow-lg p-6">
                          <h2 className="text-2xl font-bold text-gray-900 mb-6">
                              Treatments & Pricing
                          </h2>

                          <div className="space-y-4">
                              {treatments.map((treatment, index) => (
                                  <div
                                      key={index}
                                      className="bg-gradient-to-r from-white to-teal-50 border border-teal-200 rounded-xl p-4 hover:shadow-md transition-all duration-300">
                                      <div className="flex justify-between items-start mb-2">
                                          <h3 className="font-bold text-base text-gray-900 leading-tight">
                                              {treatment.name}
                                          </h3>
                                          <div className="text-right">
                                              <div className="text-lg font-bold text-teal-600">
                                                  {treatment.cost}
                                              </div>
                                          </div>
                                      </div>

                                      <p className="text-gray-600 mb-3 leading-relaxed text-sm">
                                          {treatment.description}
                                      </p>

                                      <div className="grid grid-cols-2 gap-2 mb-3">
                                          <div className="bg-teal-50 rounded-lg p-2 text-center border border-teal-100">
                                              <div className="text-teal-600 font-semibold text-xs">
                                                  {treatment.duration}
                                              </div>
                                              <div className="text-gray-500 text-xs">
                                                  Treatment Duration
                                              </div>
                                          </div>
                                          <div className="bg-teal-50 rounded-lg p-2 text-center border border-teal-100">
                                              <div className="text-teal-600 font-semibold text-xs">
                                                  {treatment.stay}
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
                                                  `https://wa.me/919895267000?text=Hi, I'd like to know more about ${treatment.name} at Amrita Hospital.`,
                                                  "_blank"
                                              )
                                          }>
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
                                      • Advanced cancer care with cutting-edge
                                      technology and precision medicine
                                  </li>
                                  <li>
                                      • Prices include specialist fees, hospital
                                      charges, and basic medications
                                  </li>
                                  <li>
                                      • Insurance coverage and EMI options
                                      available
                                  </li>
                                  <li>
                                      • Free consultation for treatment planning
                                  </li>
                              </ul>
                          </div>
                      </div>

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
                                      <li>• Comprehensive cancer evaluation</li>
                                      <li>• Advanced imaging & staging</li>
                                      <li>• Tumor board discussion</li>
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
                                      <li>• Advanced cancer treatments</li>
                                      <li>• Specialist fees</li>
                                      <li>• Hospital bed & nursing care</li>
                                      <li>• 24/7 monitoring</li>
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
                                      <li>• Recovery monitoring</li>
                                      <li>• Follow-up consultations</li>
                                      <li>• Survivorship programs</li>
                                      <li>• Ongoing support</li>
                                  </ul>
                              </div>
                          </div>
                      </div>

                      {/* Enhanced Our Expert Doctors */}
                      <div className="bg-gradient-to-br from-white to-teal-50 rounded-2xl shadow-lg p-6">
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
                              <div>
                                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                                      Meet Our Expert Doctors
                                  </h2>
                                  <p className="text-gray-600">
                                      Experienced cancer specialists with proven
                                      expertise
                                  </p>
                              </div>

                              {totalDoctorSlides > 1 && (
                                  <div className="flex space-x-2 mt-4 sm:mt-0">
                                      <button
                                          onClick={prevDoctorSlide}
                                          className="bg-teal-100 hover:bg-teal-200 rounded-full p-2 transition-colors border border-teal-200"
                                          disabled={currentDoctorSlide === 0}>
                                          <ChevronLeft
                                              size={20}
                                              className="text-teal-600"
                                          />
                                      </button>
                                      <button
                                          onClick={nextDoctorSlide}
                                          className="bg-teal-100 hover:bg-teal-200 rounded-full p-2 transition-colors border border-teal-200"
                                          disabled={
                                              currentDoctorSlide ===
                                              totalDoctorSlides - 1
                                          }>
                                          <ChevronRight
                                              size={20}
                                              className="text-teal-600"
                                          />
                                      </button>
                                  </div>
                              )}
                          </div>

                          <div className="relative overflow-hidden">
                              <div
                                  className="flex transition-transform duration-500 ease-in-out"
                                  style={{
                                      transform: `translateX(-${
                                          currentDoctorSlide * 100
                                      }%)`,
                                  }}>
                                  {Array.from({
                                      length: totalDoctorSlides,
                                  }).map((_, slideIndex) => (
                                      <div
                                          key={slideIndex}
                                          className="w-full flex-shrink-0">
                                          <div
                                              className={`grid gap-6 ${getDoctorGridCols()}`}>
                                              {doctors
                                                  .slice(
                                                      slideIndex *
                                                          doctorsPerSlide,
                                                      (slideIndex + 1) *
                                                          doctorsPerSlide
                                                  )
                                                  .map((doctor, index) => (
                                                      <div
                                                          key={index}
                                                          className="bg-white rounded-lg p-5 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer border border-gray-100 group">
                                                          <div className="text-center mb-4">
                                                              <div className="relative mb-3">
                                                                  <img
                                                                      src={
                                                                          doctor.image
                                                                      }
                                                                      alt={
                                                                          doctor.name
                                                                      }
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
                                                                  {
                                                                      doctor.specialization
                                                                  }
                                                              </p>
                                                              <p className="text-gray-500 text-sm mb-2">
                                                                  {
                                                                      doctor.qualifications
                                                                  }
                                                              </p>
                                                          </div>

                                                          <div className="grid grid-cols-2 gap-3 mb-4">
                                                              <div className="bg-teal-50 rounded-lg p-3 text-center">
                                                                  <div className="text-teal-600 font-bold text-sm">
                                                                      {
                                                                          doctor.experience
                                                                      }
                                                                  </div>
                                                                  <div className="text-gray-500 text-xs">
                                                                      Experience
                                                                  </div>
                                                              </div>
                                                              <div className="bg-blue-50 rounded-lg p-3 text-center">
                                                                  <div className="text-blue-600 font-bold text-sm">
                                                                      {
                                                                          doctor.patientsTreated
                                                                      }
                                                                  </div>
                                                                  <div className="text-gray-500 text-xs">
                                                                      Patients
                                                                  </div>
                                                              </div>
                                                          </div>

                                                          <div className="flex items-center justify-center mb-4">
                                                              <div className="flex">
                                                                  {[
                                                                      ...Array(
                                                                          Math.floor(
                                                                              parseFloat(
                                                                                  doctor.rating
                                                                              )
                                                                          )
                                                                      ),
                                                                  ].map(
                                                                      (
                                                                          _,
                                                                          i
                                                                      ) => (
                                                                          <Star
                                                                              key={
                                                                                  i
                                                                              }
                                                                              className="w-4 h-4 text-yellow-400 fill-current"
                                                                          />
                                                                      )
                                                                  )}
                                                              </div>
                                                              <span className="font-bold text-gray-900 ml-1 text-sm">
                                                                  {
                                                                      doctor.rating
                                                                  }
                                                              </span>
                                                              <span className="text-gray-500 text-sm ml-1">
                                                                  (
                                                                  {
                                                                      doctor.reviews
                                                                  }
                                                                  )
                                                              </span>
                                                          </div>

                                                          <button
                                                              className="w-full bg-gradient-to-r from-teal-600 to-blue-600 text-white py-3 rounded-lg hover:from-teal-700 hover:to-blue-700 transition-all duration-300 font-semibold shadow-md hover:shadow-lg"
                                                              onClick={() =>
                                                                  window.open(
                                                                      `https://wa.me/919895267000?text=Hi, I'd like to book an appointment with ${doctor.name} for cancer consultation.`,
                                                                      "_blank"
                                                                  )
                                                              }>
                                                              Book Appointment
                                                          </button>
                                                      </div>
                                                  ))}
                                          </div>
                                      </div>
                                  ))}
                              </div>
                          </div>

                          {/* Slide Indicators */}
                          {totalDoctorSlides > 1 && (
                              <div className="flex justify-center mt-6 space-x-2">
                                  {Array.from({
                                      length: totalDoctorSlides,
                                  }).map((_, index) => (
                                      <button
                                          key={index}
                                          onClick={() =>
                                              setCurrentDoctorSlide(index)
                                          }
                                          className={`w-2 h-2 rounded-full transition-all duration-300 ${
                                              index === currentDoctorSlide
                                                  ? "bg-teal-600 scale-110"
                                                  : "bg-gray-300 hover:bg-gray-400"
                                          }`}
                                      />
                                  ))}
                              </div>
                          )}
                      </div>

                      {/* Patient Testimonials */}
                      <div className="bg-gradient-to-br from-teal-50 to-blue-50 rounded-2xl shadow-lg p-6">
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
                              <div>
                                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                                      Patient Success Stories
                                  </h2>
                                  <p className="text-gray-600">
                                      Real experiences from our international
                                      patients
                                  </p>
                              </div>

                              {totalTestimonialSlides > 1 && (
                                  <div className="flex space-x-2 mt-4 sm:mt-0">
                                      <button
                                          onClick={prevTestimonialSlide}
                                          className="bg-white hover:bg-gray-50 rounded-full p-2 transition-colors border border-gray-200 shadow-md"
                                          disabled={
                                              currentTestimonialSlide === 0
                                          }>
                                          <ChevronLeft
                                              size={16}
                                              className="text-teal-600"
                                          />
                                      </button>
                                      <button
                                          onClick={nextTestimonialSlide}
                                          className="bg-white hover:bg-gray-50 rounded-full p-2 transition-colors border border-gray-200 shadow-md"
                                          disabled={
                                              currentTestimonialSlide ===
                                              totalTestimonialSlides - 1
                                          }>
                                          <ChevronRight
                                              size={16}
                                              className="text-teal-600"
                                          />
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
                                  }}>
                                  {Array.from({
                                      length: totalTestimonialSlides,
                                  }).map((_, slideIndex) => (
                                      <div
                                          key={slideIndex}
                                          className="w-full flex-shrink-0">
                                          <div
                                              className={`grid gap-6 ${getTestimonialGridCols()}`}>
                                              {testimonials
                                                  .slice(
                                                      slideIndex *
                                                          testimonialsPerSlide,
                                                      (slideIndex + 1) *
                                                          testimonialsPerSlide
                                                  )
                                                  .map((testimonial, index) => (
                                                      <div
                                                          key={index}
                                                          className="bg-white rounded-xl p-5 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer border border-gray-100 group relative">
                                                          <div className="absolute top-4 right-4 text-teal-200 group-hover:text-teal-300 transition-colors duration-300">
                                                              <Quote className="w-6 h-6" />
                                                          </div>

                                                          <div className="flex items-start space-x-3 mb-4">
                                                              <div className="relative">
                                                                  <img
                                                                      src={
                                                                          testimonial.image
                                                                      }
                                                                      alt={
                                                                          testimonial.name
                                                                      }
                                                                      className="w-14 h-14 rounded-full object-cover border-2 border-teal-100 group-hover:border-teal-300 transition-colors duration-300"
                                                                  />
                                                              </div>

                                                              <div className="flex-1">
                                                                  <h4 className="font-bold text-lg text-gray-900 mb-1">
                                                                      {
                                                                          testimonial.name
                                                                      }
                                                                  </h4>
                                                                  <p className="text-gray-600 mb-2 text-sm">
                                                                      {
                                                                          testimonial.age
                                                                      }{" "}
                                                                      years,{" "}
                                                                      {
                                                                          testimonial.country
                                                                      }
                                                                  </p>
                                                                  <p className="text-teal-600 font-semibold bg-teal-50 px-3 py-1 rounded-full inline-block text-sm">
                                                                      {
                                                                          testimonial.treatment
                                                                      }
                                                                  </p>
                                                              </div>

                                                              <div className="flex flex-col items-end">
                                                                  <div className="flex mb-1">
                                                                      {[
                                                                          ...Array(
                                                                              testimonial.rating
                                                                          ),
                                                                      ].map(
                                                                          (
                                                                              _,
                                                                              i
                                                                          ) => (
                                                                              <Star
                                                                                  key={
                                                                                      i
                                                                                  }
                                                                                  className="w-4 h-4 text-yellow-400 fill-current"
                                                                              />
                                                                          )
                                                                      )}
                                                                  </div>
                                                                  <span className="font-bold text-gray-700 text-sm">
                                                                      {
                                                                          testimonial.rating
                                                                      }
                                                                      /5
                                                                  </span>
                                                              </div>
                                                          </div>

                                                          <blockquote className="text-gray-700 leading-relaxed mb-4 italic text-sm">
                                                              "
                                                              {
                                                                  testimonial.story
                                                              }
                                                              "
                                                          </blockquote>

                                                          <div className="border-t border-gray-100 pt-3">
                                                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                                                  <div className="bg-gray-50 rounded-lg p-3">
                                                                      <span className="text-gray-500 font-medium text-xs">
                                                                          Treatment:
                                                                      </span>
                                                                      <p className="font-bold text-gray-700 text-sm">
                                                                          {
                                                                              testimonial.treatment
                                                                          }
                                                                      </p>
                                                                  </div>
                                                                  <div className="bg-gray-50 rounded-lg p-3">
                                                                      <span className="text-gray-500 font-medium text-xs">
                                                                          Doctor:
                                                                      </span>
                                                                      <p className="font-bold text-gray-700 text-sm">
                                                                          {
                                                                              testimonial.doctor
                                                                          }
                                                                      </p>
                                                                  </div>
                                                              </div>
                                                              <div className="mt-3 text-center">
                                                                  <span className="bg-gray-100 px-3 py-1 rounded-full text-xs font-medium text-gray-600">
                                                                      {
                                                                          testimonial.date
                                                                      }
                                                                  </span>
                                                              </div>
                                                          </div>
                                                      </div>
                                                  ))}
                                          </div>
                                      </div>
                                  ))}
                              </div>
                          </div>

                          {/* Slide Indicators */}
                          {totalTestimonialSlides > 1 && (
                              <div className="flex justify-center mt-6 space-x-2">
                                  {Array.from({
                                      length: totalTestimonialSlides,
                                  }).map((_, index) => (
                                      <button
                                          key={index}
                                          onClick={() =>
                                              setCurrentTestimonialSlide(index)
                                          }
                                          className={`w-2 h-2 rounded-full transition-all duration-300 ${
                                              index === currentTestimonialSlide
                                                  ? "bg-teal-600 scale-110"
                                                  : "bg-gray-300 hover:bg-gray-400"
                                          }`}
                                      />
                                  ))}
                              </div>
                          )}
                      </div>

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
                                      Advanced cancer treatments require
                                      comprehensive travel insurance covering
                                      treatments, complications, and emergency
                                      medical evacuation.
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
                                          • Patients must arrive at least 3 days
                                          before treatment for evaluation
                                      </li>
                                      <li>
                                          • Bring all medical records, biopsy
                                          reports, and imaging studies
                                      </li>
                                      <li>
                                          • International patients require valid
                                          passport and medical visa
                                      </li>
                                      <li>
                                          • Companion/caregiver accommodation
                                          can be arranged at discounted rates
                                      </li>
                                      <li>
                                          • Cancer treatments may require
                                          extended stays for multiple cycles
                                      </li>
                                  </ul>
                              </div>

                              <div className="bg-amber-50 rounded-xl p-5 border border-amber-200">
                                  <h3 className="font-bold text-amber-800 mb-3">
                                      Payment & Cancellation Policy
                                  </h3>
                                  <div className="text-amber-700 text-sm space-y-2">
                                      <p>
                                          • For treatments scheduled within 30
                                          days, full payment is required
                                      </p>
                                      <p>
                                          • For treatments beyond 30 days, 30%
                                          advance payment to confirm booking
                                      </p>
                                      <p>
                                          • Cancellations 15+ days before
                                          treatment: 75% refund (excluding
                                          booking fee)
                                      </p>
                                      <p>
                                          • Cancellations within 14 days:
                                          Non-refundable
                                      </p>
                                      <p>
                                          • Emergency situations and medical
                                          complications considered case-by-case
                                      </p>
                                  </div>
                              </div>

                              <div className="bg-blue-50 rounded-xl p-5 border border-blue-200">
                                  <h3 className="font-bold text-blue-800 mb-3">
                                      Why Choose MedCasts with Amrita
                                  </h3>
                                  <div className="grid md:grid-cols-2 gap-4 text-blue-700 text-sm">
                                      <div>
                                          <p>✓ Best price guaranteed</p>
                                          <p>✓ No hidden booking fees</p>
                                          <p>✓ 100% financial protection</p>
                                      </div>
                                      <div>
                                          <p>✓ 24/7 patient support</p>
                                          <p>
                                              ✓ 4.8/5 rating from 6,500+
                                              patients
                                          </p>
                                          <p>
                                              ✓ Certified medical tourism
                                              partner
                                          </p>
                                      </div>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>

                  {/* Enhanced Fixed Sidebar */}
                  <div className="lg:col-span-1">
                      <div className="sticky top-8 space-y-6">
                          {/* Main Booking Card */}
                          <div className="bg-white rounded-2xl shadow-lg p-5 border border-gray-100">
                              <div className="text-center mb-5">
                                  <div className="text-sm text-gray-500 mb-1">
                                      Starting from
                                  </div>
                                  <div className="text-3xl font-bold text-gray-900 mb-1">
                                      $800
                                  </div>
                                  <div className="text-sm text-gray-500">
                                      Consultation from $80
                                  </div>
                              </div>

                              <div className="space-y-3 mb-5">
                                  <button
                                      className="w-full bg-teal-600 text-white py-3 rounded-xl font-bold hover:bg-teal-700 transition duration-200 shadow-lg hover:shadow-xl"
                                      onClick={() =>
                                          window.open(
                                              "https://wa.me/919895267000?text=Hi, I want to book an appointment for cancer consultation at Amrita Hospital.",
                                              "_blank"
                                          )
                                      }>
                                      Book Consultation
                                  </button>
                                  <button
                                      className="w-full border-2 border-gray-300 text-gray-700 py-3 rounded-xl font-bold hover:bg-gray-50 transition duration-200"
                                      onClick={() =>
                                          window.open(
                                              "https://wa.me/919895267000?text=Hi, I need a cost estimate for cancer treatment at Amrita Hospital.",
                                              "_blank"
                                          )
                                      }>
                                      Get Cost Estimate
                                  </button>
                              </div>

                              <div className="text-center text-sm text-gray-600 mb-4 bg-orange-50 p-3 rounded-lg border border-orange-200">
                                  🔥 <strong>22+ other people</strong> are
                                  considering this treatment right now
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
                                              EMI options starting $40/month
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
                                      <span className="font-medium">
                                          +91-98952-67000
                                      </span>
                                  </div>
                                  <div className="flex items-center text-sm text-gray-600 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                                      <Mail className="w-4 h-4 mr-3 text-teal-600" />
                                      <span className="font-medium">
                                          oncology@amrita.edu
                                      </span>
                                  </div>
                                  <div className="flex items-center text-sm text-gray-600 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                                      <MapPin className="w-4 h-4 mr-3 text-teal-600" />
                                      <span className="font-medium">
                                          Kochi, Kerala
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
                                  24/7 emergency cancer services with immediate
                                  response team and comprehensive oncology care
                              </p>
                              <button
                                  className="w-full bg-red-600 text-white py-3 px-4 rounded-xl font-bold hover:bg-red-700 transition duration-200 shadow-lg hover:shadow-xl"
                                  onClick={() =>
                                      window.open("tel:+919895267000", "_blank")
                                  }>
                                  Emergency: +91-98952-67000
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
                                      <span>Advanced Cancer Care</span>
                                  </div>
                                  <div className="flex items-center text-gray-700">
                                      <div className="w-2 h-2 bg-teal-500 rounded-full mr-3"></div>
                                      <span>Precision Medicine</span>
                                  </div>
                                  <div className="flex items-center text-gray-700">
                                      <div className="w-2 h-2 bg-teal-500 rounded-full mr-3"></div>
                                      <span>Expert Oncologists</span>
                                  </div>
                                  <div className="flex items-center text-gray-700">
                                      <div className="w-2 h-2 bg-teal-500 rounded-full mr-3"></div>
                                      <span>NABL Accredited Hospital</span>
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

export default AmritaOncologyService;