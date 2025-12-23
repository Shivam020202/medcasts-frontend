import React, { useState, useEffect } from 'react';
import { Star, MapPin, Phone, Mail, Calendar, Users, Award, CheckCircle, ChevronDown, ChevronUp, ChevronLeft, ChevronRight, Quote, Clock, Plane, Car, Shield } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const MaxCardiacService = () => {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const treatments = [
  {
    name: "Coronary Angioplasty",
    cost: "$6,200 - $9,000",
    description: "Advanced minimally invasive procedure to open blocked coronary arteries using premium balloon catheter and high-quality stent placement",
    duration: "2-3 hours",
    stay: "2-3 days"
  },
  {
    name: "Bypass Surgery (CABG)",
    cost: "$11,000 - $16,500",
    description: "Premium surgical procedure to create new pathways around blocked coronary arteries using advanced grafts and modern techniques",
    duration: "4-6 hours",
    stay: "7-10 days"
  },
  {
    name: "Heart Valve Replacement",
    cost: "$13,500 - $20,000",
    description: "Advanced surgical replacement of damaged heart valves with premium mechanical or biological prosthetic valves",
    duration: "3-5 hours",
    stay: "7-12 days"
  },
  {
    name: "Pacemaker Implantation",
    cost: "$8,000 - $11,200",
    description: "Implantation of advanced electronic device to regulate heart rhythm and treat complex arrhythmias with modern features",
    duration: "1-2 hours",
    stay: "1-2 days"
  },
  {
    name: "Atrial Septal Defect Closure",
    cost: "$7,200 - $10,500",
    description: "Advanced minimally invasive closure of hole in heart wall between upper chambers using premium devices",
    duration: "2-3 hours",
    stay: "2-3 days"
  },
  {
    name: "Mitral Valve Repair",
    cost: "$12,000 - $17,500",
    description: "Premium surgical repair of mitral valve to restore optimal blood flow function using advanced techniques",
    duration: "3-4 hours",
    stay: "6-8 days"
  },
  {
    name: "Aortic Valve Replacement",
    cost: "$14,500 - $21,500",
    description: "Advanced replacement of diseased aortic valve with premium prosthetic valve using modern surgical methods",
    duration: "3-5 hours",
    stay: "8-12 days"
  },
  {
    name: "Cardiac Catheterization",
    cost: "$3,800 - $5,800",
    description: "Advanced diagnostic procedure to examine heart function and blood vessels using premium imaging technology",
    duration: "1-2 hours",
    stay: "1 day"
  }];


  const doctors = [
      {
          name: "Dr. Rajneesh Malhotra",
          specialization: "Chief Cardiac Surgeon",
          experience: "24+ years",
          patientsTreated: "5,200+",
          rating: "4.9",
          reviews: "378",
          image: "/images/max/small_Dr_Rajneesh_Malhotra_2_a43f0d88cb.jpg",
          qualifications: "MBBS, MS, MCh Cardiothoracic Surgery",
          expertise: [
              "Complex Cardiac Surgery",
              "Valve Surgery",
              "Coronary Surgery",
          ],
      },
      {
          name: "Dr. Ganesh Kumar Mani",
          specialization: "Senior Interventional Cardiologist",
          experience: "19+ years",
          patientsTreated: "4,100+",
          rating: "4.8",
          reviews: "294",
          image: "/images/max/small_Dr_G_K_Mani_b87d18216c.jpeg",
          qualifications: "MBBS, MD, DM Interventional Cardiology",
          expertise: [
              "Coronary Interventions",
              "Complex Angioplasty",
              "Structural Heart Disease",
          ],
      },
      {
          name: "Dr. Vijay Kohli",
          specialization: "Pediatric Cardiologist",
          experience: "17+ years",
          patientsTreated: "3,400+",
          rating: "4.7",
          reviews: "221",
          image: "/images/max/small_DSC_06104_f788b0dbf5.jpeg",
          qualifications: "MBBS, MD, DM Pediatric Cardiology",
          expertise: [
              "Congenital Heart Disease",
              "Pediatric Interventions",
              "Fetal Cardiology",
          ],
      },
      {
          name: "Dr. Ramji Mehrotra",
          specialization: "Cardiac Electrophysiologist",
          experience: "18+ years",
          patientsTreated: "3,800+",
          rating: "4.8",
          reviews: "256",
          image: "/images/max/Dr_Ramji_blk_6bff22d302.jpg",
          qualifications: "MBBS, MD, DM Cardiac Electrophysiology",
          expertise: [
              "Arrhythmia Treatment",
              "Device Implantation",
              "Ablation Procedures",
          ],
      }

  ];


  const testimonials = [
  {
    name: "Robert Smith",
    age: 56,
    country: "USA",
    treatment: "Coronary Angioplasty",
    rating: 5,
    story: "Outstanding cardiac care at Max Hospital. The angioplasty procedure was performed with great precision and the medical team was exceptional. The quality of care and modern facilities exceeded my expectations.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    date: "Dec 2024",
    doctor: "Dr. Meena Kumari"
  },
  {
    name: "Maria Garcia",
    age: 49,
    country: "Mexico",
    treatment: "Heart Valve Replacement",
    rating: 5,
    story: "Excellent surgical expertise and comprehensive care at Max Hospital. The valve replacement surgery was successful and recovery was smooth with great support. The nursing staff was incredibly caring throughout my stay.",
    image: "https://images.unsplash.com/photo-1576099374988-92c106eab519?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3MTg3MTl8MHwxfHNlYXJjaHwxfHxBJTIwY3JvcHBlZCUyMGltYWdlJTIwb2YlMjBhJTIwcGVyc29uJTI3cyUyMGZhY2UlMkMlMjBmb2N1c2luZyUyMG9uJTIwdGhlaXIlMjBmZWF0dXJlcy58ZW58MHx8fHwxNzU3NTk1MTczfDA&ixlib=rb-4.1.0&q=80&w=200$w=100",
    date: "Nov 2024",
    doctor: "Dr. Sandeep Attawar"
  },
  {
    name: "David Wilson",
    age: 63,
    country: "Australia",
    treatment: "Bypass Surgery",
    rating: 5,
    story: "World-class cardiac surgery center with excellent facilities. The CABG procedure was performed with great skill and exceptional post-operative care. Dr. Attawar's expertise is truly remarkable.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    date: "Oct 2024",
    doctor: "Dr. Sandeep Attawar"
  },
  {
    name: "Sophie Chen",
    age: 2,
    country: "Canada",
    treatment: "Pediatric Heart Surgery",
    rating: 5,
    story: "Dr. Vivek Kumar performed life-saving congenital heart surgery on our daughter with incredible skill and compassion. The pediatric cardiac team at Max Hospital provided exceptional care for our family.",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=100&h=100&fit=crop&crop=face",
    date: "Sep 2024",
    doctor: "Dr. Vivek Kumar"
  },
  {
    name: "James Thompson",
    age: 58,
    country: "UK",
    treatment: "Arrhythmia Treatment",
    rating: 5,
    story: "Dr. Rajesh Sharma's expertise in cardiac electrophysiology was remarkable. The arrhythmia treatment was performed flawlessly and the follow-up care at Max Hospital was comprehensive and professional.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    date: "Aug 2024",
    doctor: "Dr. Rajesh Sharma"
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
                                  Cardiac Care
                              </span>
                          </div>

                          <div className="mb-6">
                              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 leading-tight">
                                  Leading{" "}
                                  <span className="text-teal-600">
                                      Advanced Cardiac Care
                                  </span>
                              </h1>
                              <p className="text-base sm:text-lg text-gray-600 mb-4 leading-relaxed max-w-3xl">
                                  Leading multi-specialty hospital with
                                  state-of-the-art cardiac care, experienced
                                  specialists, and comprehensive heart treatment
                                  services.
                              </p>
                          </div>

                          {/* Image Grid */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                              <div className="relative group overflow-hidden rounded-xl shadow-lg">
                                  <img
                                      src="\images\Max-hospital.png"
                                      alt="Max Hospital - Advanced Cardiac Care"
                                      className="w-full h-48 sm:h-56 object-cover group-hover:scale-105 transition-transform duration-500"
                                  />

                                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                                  <div className="absolute top-4 left-4 bg-teal-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                                      ❤️ Cardiac Excellence
                                  </div>
                                  <div className="absolute bottom-4 left-4 text-white">
                                      <h3 className="font-bold text-lg">
                                          Max Hospital
                                      </h3>
                                      <p className="text-sm opacity-90">
                                          Leading Heart Care
                                      </p>
                                  </div>
                              </div>

                              <div className="grid grid-rows-2 gap-4">
                                  <div className="relative group overflow-hidden rounded-xl shadow-lg">
                                      <img
                                          src="https://images.unsplash.com/photo-1669930605340-801a0be1f5a3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3MTg3MTl8MHwxfHNlYXJjaHwxfHxBJTIwY3JvcHBlZCUyMGltYWdlJTIwb2YlMjBhJTIwbW9kZXJuJTIwbWVkaWNhbCUyMGZhY2lsaXR5JTIwb3IlMjBlcXVpcG1lbnQlMkMlMjBmb2N1c2luZyUyMG9uJTIwaXRzJTIwZmVhdHVyZXMufGVufDB8fHx8MTc1NzU5NTI3OHww&ixlib=rb-4.1.0&q=80&w=200$w=400"
                                          alt="Advanced Cardiac Technology"
                                          className="w-full h-24 sm:h-28 object-cover group-hover:scale-105 transition-transform duration-500"
                                      />

                                      <div className="absolute inset-0 bg-gradient-to-r from-teal-600/80 to-transparent flex items-center">
                                          <div className="text-white p-4">
                                              <h4 className="font-bold text-sm">
                                                  🔬 Advanced Technology
                                              </h4>
                                              <p className="text-xs opacity-90">
                                                  State-of-Art Equipment
                                              </p>
                                          </div>
                                      </div>
                                  </div>
                                  <div className="relative group overflow-hidden rounded-xl shadow-lg">
                                      <img
                                          src="\images\ortho\Multi-Specialty.png"
                                          alt="Experienced Cardiac Team"
                                          className="w-full h-28 sm:h-32 object-cover group-hover:scale-105 transition-transform duration-500"
                                      />

                                      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/80 to-transparent flex items-center">
                                          <div className="text-white p-4">
                                              <h4 className="font-bold text-sm">
                                                  👨‍⚕️ Expert Team
                                              </h4>
                                              <p className="text-xs opacity-90">
                                                  Experienced Specialists
                                              </p>
                                          </div>
                                      </div>
                                  </div>
                              </div>
                          </div>

                          {/* Features Grid */}
                          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                              <div className="bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition-shadow border border-teal-100">
                                  <div className="text-2xl mb-2">❤️</div>
                                  <div className="text-sm font-bold text-gray-900 mb-1">
                                      Cardiac Excellence
                                  </div>
                                  <div className="text-xs text-gray-600">
                                      Advanced Heart Care
                                  </div>
                              </div>
                              <div className="bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition-shadow border border-teal-100">
                                  <div className="text-2xl mb-2">🔬</div>
                                  <div className="text-sm font-bold text-gray-900 mb-1">
                                      Advanced Technology
                                  </div>
                                  <div className="text-xs text-gray-600">
                                      Modern Equipment
                                  </div>
                              </div>
                              <div className="bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition-shadow border border-teal-100">
                                  <div className="text-2xl mb-2">👨‍⚕️</div>
                                  <div className="text-sm font-bold text-gray-900 mb-1">
                                      Expert Team
                                  </div>
                                  <div className="text-xs text-gray-600">
                                      Experienced Doctors
                                  </div>
                              </div>
                              <div className="bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition-shadow border border-teal-100">
                                  <div className="text-2xl mb-2">🏆</div>
                                  <div className="text-sm font-bold text-gray-900 mb-1">
                                      NABH Accredited
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
                                              25 minutes from Delhi Airport
                                          </div>
                                          <div className="text-sm text-gray-600">
                                              IGI Airport (DEL) - Direct
                                              connectivity
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
                                              Saket Metro Station
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
                                              Saket, New Delhi
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
                                          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3505.404836479848!2d77.20941967564929!3d28.527548975722187!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce1f427d4c5fb%3A0x582d47bbf4970bc1!2sMax%20Super%20Speciality%20Hospital%2C%20Saket%20(Max%20Saket)!5e0!3m2!1sen!2sin!4v1757500121695!5m2!1sen!2sin"
                                          width="100%"
                                          height="200"
                                          style={{ border: 0 }}
                                          allowFullScreen=""
                                          loading="lazy"
                                          referrerPolicy="no-referrer-when-downgrade"
                                          className="rounded-lg"></iframe>
                                  </div>
                                  <div className="mt-3 text-center">
                                      <a
                                          href="https://maps.google.com/?cid=462583748879313449"
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
                                  Max Healthcare is one of India's leading
                                  private healthcare providers with a strong
                                  presence across the National Capital Region.
                                  Our Institute of Heart & Vascular Sciences is
                                  equipped with advanced technology and modern
                                  cardiac catheterization labs.
                              </p>
                              <p>
                                  Our team of experienced cardiac specialists
                                  provides world-class treatment with
                                  state-of-the-art equipment, comprehensive care
                                  protocols, and personalized treatment plans
                                  for optimal patient outcomes.
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
                                          Comprehensive cardiac evaluation,
                                          advanced imaging studies, and
                                          personalized treatment planning with
                                          modern diagnostic facilities.
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
                                              Cardiac Treatment
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
                                          Advanced cardiac procedures including
                                          angioplasty, bypass surgery, valve
                                          repairs, and minimally invasive
                                          interventions.
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
                                              Recovery & Rehabilitation
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
                                          Comprehensive cardiac rehabilitation,
                                          lifestyle counseling, and recovery
                                          programs with advanced monitoring
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
                                                  Procedure Duration
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
                                                  `https://wa.me/911126515050?text=Hi, I'd like to know more about ${treatment.name} at Max Hospital.`,
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
                                      • Costs may vary based on individual case
                                      complexity and procedure requirements
                                  </li>
                                  <li>
                                      • Prices include surgeon fees, hospital
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
                                          Pre-operative Care
                                      </span>
                                  </div>
                                  <ul className="text-teal-700 space-y-2 text-sm">
                                      <li>
                                          • Comprehensive cardiac evaluation
                                      </li>
                                      <li>• Advanced imaging studies</li>
                                      <li>• Expert consultation</li>
                                      <li>• Pre-surgical counseling</li>
                                  </ul>
                              </div>

                              <div className="bg-teal-50 rounded-xl p-5 border border-teal-100">
                                  <div className="flex items-center mb-3">
                                      <CheckCircle className="w-5 h-5 text-teal-500 mr-2" />
                                      <span className="font-bold text-teal-800">
                                          Surgery & Hospital Stay
                                      </span>
                                  </div>
                                  <ul className="text-teal-700 space-y-2 text-sm">
                                      <li>• Advanced cardiac procedures</li>
                                      <li>• Specialist surgeon fees</li>
                                      <li>• ICU & hospital bed (AC room)</li>
                                      <li>• Nursing care 24/7</li>
                                  </ul>
                              </div>

                              <div className="bg-teal-50 rounded-xl p-5 border border-teal-100">
                                  <div className="flex items-center mb-3">
                                      <CheckCircle className="w-5 h-5 text-teal-500 mr-2" />
                                      <span className="font-bold text-teal-800">
                                          Post-operative Care
                                      </span>
                                  </div>
                                  <ul className="text-teal-700 space-y-2 text-sm">
                                      <li>• Cardiac rehabilitation</li>
                                      <li>• Follow-up consultations</li>
                                      <li>
                                          • Medications & lifestyle counseling
                                      </li>
                                      <li>• Recovery monitoring</li>
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
                                      Experienced cardiac specialists with
                                      proven expertise
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
                                                                      `https://wa.me/911126515050?text=Hi, I'd like to book an appointment with ${doctor.name} for cardiac consultation.`,
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
                                      Real experiences from our satisfied
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
                                                                          Procedure:
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
                                      Advanced cardiac procedures require
                                      comprehensive travel insurance covering
                                      surgical procedures, emergency
                                      interventions, and medical evacuation.
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
                                          • Patients must arrive at least 2 days
                                          before procedure for pre-assessment
                                      </li>
                                      <li>
                                          • Bring all medical records, ECGs, and
                                          previous cardiac reports
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
                                          • Post-procedure cardiac
                                          rehabilitation is essential for
                                          optimal recovery
                                      </li>
                                  </ul>
                              </div>

                              <div className="bg-amber-50 rounded-xl p-5 border border-amber-200">
                                  <h3 className="font-bold text-amber-800 mb-3">
                                      Payment & Cancellation Policy
                                  </h3>
                                  <div className="text-amber-700 text-sm space-y-2">
                                      <p>
                                          • For procedures scheduled within 30
                                          days, full payment is required
                                      </p>
                                      <p>
                                          • For procedures beyond 30 days, 30%
                                          advance payment to confirm booking
                                      </p>
                                      <p>
                                          • Cancellations 15+ days before
                                          procedure: 75% refund (excluding
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
                                      Why Choose MedCasts with Max
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
                                              ✓ 4.8/5 rating from 5,000+
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
                                      $4,400
                                  </div>
                                  <div className="text-sm text-gray-500">
                                      Consultation from $60
                                  </div>
                              </div>

                              <div className="space-y-3 mb-5">
                                  <button
                                      className="w-full bg-teal-600 text-white py-3 rounded-xl font-bold hover:bg-teal-700 transition duration-200 shadow-lg hover:shadow-xl"
                                      onClick={() =>
                                          window.open(
                                              "https://wa.me/911126515050?text=Hi, I want to book an appointment for cardiac consultation at Max Hospital.",
                                              "_blank"
                                          )
                                      }>
                                      Book Consultation
                                  </button>
                                  <button
                                      className="w-full border-2 border-gray-300 text-gray-700 py-3 rounded-xl font-bold hover:bg-gray-50 transition duration-200"
                                      onClick={() =>
                                          window.open(
                                              "https://wa.me/911126515050?text=Hi, I need a cost estimate for cardiac treatment at Max Hospital.",
                                              "_blank"
                                          )
                                      }>
                                      Get Cost Estimate
                                  </button>
                              </div>

                              <div className="text-center text-sm text-gray-600 mb-4 bg-orange-50 p-3 rounded-lg border border-orange-200">
                                  🔥 <strong>16+ other people</strong> are
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
                                              EMI options starting $230/month
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
                                          +91-11-26515050
                                      </span>
                                  </div>
                                  <div className="flex items-center text-sm text-gray-600 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                                      <Mail className="w-4 h-4 mr-3 text-teal-600" />
                                      <span className="font-medium">
                                          cardiac@maxhealthcare.com
                                      </span>
                                  </div>
                                  <div className="flex items-center text-sm text-gray-600 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                                      <MapPin className="w-4 h-4 mr-3 text-teal-600" />
                                      <span className="font-medium">
                                          Saket, New Delhi
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
                                  24/7 emergency cardiac services with immediate
                                  response team and advanced cardiac life
                                  support
                              </p>
                              <button
                                  className="w-full bg-red-600 text-white py-3 px-4 rounded-xl font-bold hover:bg-red-700 transition duration-200 shadow-lg hover:shadow-xl"
                                  onClick={() =>
                                      window.open("tel:+911126515050", "_blank")
                                  }>
                                  Emergency: +91-11-26515050
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
                                      <span>Leading Healthcare Provider</span>
                                  </div>
                                  <div className="flex items-center text-gray-700">
                                      <div className="w-2 h-2 bg-teal-500 rounded-full mr-3"></div>
                                      <span>NABH Accredited Quality</span>
                                  </div>
                                  <div className="flex items-center text-gray-700">
                                      <div className="w-2 h-2 bg-teal-500 rounded-full mr-3"></div>
                                      <span>Advanced Cardiac Technology</span>
                                  </div>
                                  <div className="flex items-center text-gray-700">
                                      <div className="w-2 h-2 bg-teal-500 rounded-full mr-3"></div>
                                      <span>Experienced Specialists</span>
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

export default MaxCardiacService;