import React, { useState, useEffect } from 'react';
import { Star, MapPin, Phone, Mail, Calendar, Users, Award, CheckCircle, ChevronDown, ChevronUp, ChevronLeft, ChevronRight, Quote, Clock, Plane, Car, Shield } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const MaxOrthoService = () => {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const treatments = [
  {
    name: "Unilateral Total Hip Replacement (THR)",
    cost: "$5,000 - $6,400",
    description: "Single hip joint replacement with ceramic-on-ceramic technology",
    duration: "2-3 hours",
    stay: "3-4 days"
  },
  {
    name: "Bilateral Total Hip Replacement (THR)",
    cost: "$9,400 - $12,200",
    description: "Both hip joints replacement performed in stages",
    duration: "4-5 hours",
    stay: "5-7 days"
  },
  {
    name: "Unilateral Total Knee Replacement (TKR)",
    cost: "$4,500 - $5,900",
    description: "Single knee joint replacement with robotic assistance",
    duration: "1-2 hours",
    stay: "3-4 days"
  },
  {
    name: "Bilateral Total Knee Replacement (TKR)",
    cost: "$8,900 - $11,800",
    description: "Both knee joints replacement with advanced techniques",
    duration: "3-4 hours",
    stay: "5-6 days"
  },
  {
    name: "Arthroscopic Surgery",
    cost: "$3,000 - $4,700",
    description: "Minimally invasive joint surgery for sports injuries",
    duration: "30-90 minutes",
    stay: "1-2 days"
  },
  {
    name: "Complex Spine Surgery",
    cost: "$7,800 - $14,500",
    description: "Advanced spinal fusion and deformity correction",
    duration: "3-6 hours",
    stay: "4-7 days"
  },
  {
    name: "Sports Medicine & ACL Reconstruction",
    cost: "$3,600 - $6,500",
    description: "Complete ACL reconstruction with rehabilitation",
    duration: "1-2 hours",
    stay: "1-2 days"
  },
  {
    name: "Limb Lengthening Surgery",
    cost: "$10,000 - $18,000",
    description: "Complex deformity correction using Ilizarov method",
    duration: "2-4 hours",
    stay: "7-10 days"
  }];


  const doctors = [
      {
          name: "Dr. S.K.S. Marya",
          specialization: "Group Chairman & Chief Surgeon - Orthopaedics",
          experience: "40+ years",
          patientsTreated: "15,000+",
          rating: "4.9",
          reviews: "285+",
          image: "/images/small_sks_marya_6b4c17da24.png",
          qualifications:
              "MBBS, MS (Ortho), M.Ch. (Ortho), DNB, FRCS (England)",
          expertise: [
              "Total Knee Replacement",
              "Total Hip Replacement",
              "Robotic Joint Surgery",
              "Computer-Assisted Surgery",
              "Bilateral Joint Replacement",
              "Revision Surgery",
          ],
          designation:
              "Group Chairman & Chief Surgeon - Orthopaedics, Joints and Robotic Surgery, and Chief Advisor to Max Healthcare Institute Limited",
          hospital: "Max Healthcare",
      },
      {
          name: "Dr. Ramneek Mahajan",
          specialization: "Chairman - Orthopaedics & Joint Replacement",
          experience: "26+ years",
          patientsTreated: "4,500+",
          rating: "4.8",
          reviews: "195+",
          image: "/images/medium_Dr_Ramneek_Mahajan_f8682aed23.jpeg",
          qualifications: "MBBS, MS (Ortho), Fellowship in Joint Replacement",
          expertise: [
              "Robotic Joint Replacement",
              "Primary Joint Surgery",
              "Revision Arthroplasty",
              "Computer Navigation Surgery",
          ],
          designation:
              "Chairman - Orthopaedics, Joint Replacement & Chief Robotic Joint Replacement",
          hospital: "Max Healthcare",
      },
      {
          name: "Dr. H.N. Bajaj",
          specialization: "Principal Director & Head - Spine Surgery",
          experience: "39+ years",
          patientsTreated: "5,200+",
          rating: "4.7",
          reviews: "168+",
          image: "/images/medium_bajaj_2083_9bd30ff27c.png",
          qualifications: "MBBS, MS (Ortho), Fellowship in Spine Surgery",
          expertise: [
              "Complex Spine Surgery",
              "Spinal Deformity Correction",
              "Minimally Invasive Spine Surgery",
              "Cervical & Lumbar Surgery",
          ],
          designation:
              "Principal Director (Orthopaedics) & Head (Spine Surgery)",
          hospital: "Max Healthcare",
      },
      {
          name: "Dr. Vikas Gupta",
          specialization: "Senior Director - Hand, Wrist & Upper Limb Surgery",
          experience: "30+ years",
          patientsTreated: "3,800+",
          rating: "4.6",
          reviews: "142+",
          image: "/images/small_DSC_08308_86c7214c6d.png",
          qualifications: "MBBS, MS (Ortho), Fellowship in Hand Surgery",
          expertise: [
              "Hand & Wrist Surgery",
              "Elbow Surgery",
              "Shoulder Surgery",
              "Microsurgery",
              "Nerve Reconstruction",
          ],
          designation:
              "Senior Director - Max Institute of Musculoskeletal Sciences and Orthopaedics. Hand and Wrist, Elbow, Shoulder Specialist",
          hospital: "Max Healthcare",
      },
      {
          name: "Dr. Harshavardhan Hegde",
          specialization: "Senior Director - Spine Surgery",
          experience: "39+ years",
          patientsTreated: "4,800+",
          rating: "4.8",
          reviews: "178+",
          image: "/images/harsh-vardhan.jpg",
          qualifications: "MBBS, MS (Ortho), Fellowship in Spine Surgery",
          expertise: [
              "Spinal Tumor Surgery",
              "Complex Spinal Deformity",
              "Minimally Invasive Techniques",
              "Robotic Spine Surgery",
          ],
          designation:
              "Senior Director - Orthopaedics & Joint Replacement, Spine Surgery",
          hospital: "Max Healthcare",
      },
  ];




  const testimonials = [
  {
    name: "Mr. Suresh Gupta",
    age: 62,
    country: "India",
    treatment: "Hip Replacement Surgery",
    rating: 5,
    story: "Dr. H.N Bajaj performed my hip replacement at Max Hospital with exceptional skill. The computer-assisted surgery was precise and my recovery was remarkable. The nursing staff provided excellent care and the rehabilitation program was comprehensive.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    date: "Dec 2024",
    doctor: "Dr. H.N Bajaj"
  },
  {
    name: "Ms. Jennifer Lee",
    age: 28,
    country: "Singapore",
    treatment: "Trauma Surgery",
    rating: 5,
    story: "After a serious accident, Dr. Priya Jaisingh saved my leg with expert trauma surgery at Max Hospital. The emergency response was immediate and the surgical outcome was excellent. I'm grateful for the world-class trauma care I received.",
    image: "https://images.unsplash.com/photo-1742234857006-ceaba909665c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3MTg3MTl8MHwxfHNlYXJjaHwxfHxBJTIwY3JvcHBlZCUyMGltYWdlJTIwb2YlMjBhJTIwcGVyc29uJTI3cyUyMGZhY2UlMkMlMjBmb2N1c2luZyUyMG9uJTIwdGhlJTIwZmFjaWFsJTIwZmVhdHVyZXMufGVufDB8fHx8MTc1NzUxODkxNnww&ixlib=rb-4.1.0&q=80&w=200$w=100",
    date: "Nov 2024",
    doctor: "Dr. Priya Jaisingh"
  },
  {
    name: "Mr. Robert Brown",
    age: 52,
    country: "USA",
    treatment: "Spine Surgery",
    rating: 5,
    story: "Dr. Harshavardhan Hegde performed complex spine surgery using neuro-navigation technology. The precision was incredible and my chronic back pain is completely gone. Max Hospital's spine center is truly world-class.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    date: "Oct 2024",
    doctor: "Dr. Harshavardhan Hegde"
  },
  {
    name: "Mrs. Anita Sharma",
    age: 45,
    country: "UAE",
    treatment: "Knee Arthroscopy",
    rating: 5,
    story: "Dr. Amit Bhargava performed arthroscopic knee surgery with minimal invasion. The recovery was faster than expected and I'm back to my active lifestyle. The international patient services at Max were outstanding.",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=100&h=100&fit=crop&crop=face",
    date: "Sep 2024",
    doctor: "Dr. Amit Bhargava"
  },
  {
    name: "Dr. Ramneek Mahajan",
    age: 56,
    country: "UK",
    treatment: "Computer-Assisted Surgery",
    rating: 5,
    story: "Dr. Ramneek Mahajan used computer navigation for my complex joint replacement. The precision technology and personalized care at Max Hospital exceeded all expectations. I'm amazed by the advanced surgical capabilities and excellent outcomes.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    date: "Aug 2024",
    doctor: "Dr. Ramneek Mahajan"
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
                                  Orthopaedics
                              </span>
                          </div>

                          <div className="mb-6">
                              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 leading-tight">
                                  World-Class{" "}
                                  <span className="text-teal-600">
                                      Computer-Assisted Surgery
                                  </span>
                              </h1>
                              <p className="text-base sm:text-lg text-gray-600 mb-4 leading-relaxed max-w-3xl">
                                  Advanced joint replacement, trauma care, and
                                  spine surgery with computer-assisted precision
                                  technology.
                              </p>
                          </div>

                          {/* Image Grid */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                              <div className="relative group overflow-hidden rounded-xl shadow-lg">
                                  <img
                                      src="\images\Max-hospital.png"
                                      alt="Max Super Speciality Hospital - Advanced Orthopaedic Care"
                                      className="w-full h-48 sm:h-56 object-cover group-hover:scale-105 transition-transform duration-500"
                                  />

                                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                                  <div className="absolute top-4 left-4 bg-teal-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                                      💻 Computer Assisted
                                  </div>
                                  <div className="absolute bottom-4 left-4 text-white">
                                      <h3 className="font-bold text-lg">
                                          Max Super Speciality
                                      </h3>
                                      <p className="text-sm opacity-90">
                                          Advanced Orthopedic Center
                                      </p>
                                  </div>
                              </div>

                              <div className="grid grid-rows-2 gap-4">
                                  <div className="relative group overflow-hidden rounded-xl shadow-lg">
                                      <img
                                          src="\images\ortho\Computer-Assisted.png"
                                          alt="Computer Assisted Surgery"
                                          className="w-full h-24 sm:h-28 object-cover group-hover:scale-105 transition-transform duration-500"
                                      />

                                      <div className="absolute inset-0 bg-gradient-to-r from-teal-600/80 to-transparent flex items-center">
                                          <div className="text-white p-4">
                                              <h4 className="font-bold text-sm">
                                                  💻 Computer Assisted
                                              </h4>
                                              <p className="text-xs opacity-90">
                                                  Precision Surgery
                                              </p>
                                          </div>
                                      </div>
                                  </div>
                                  <div className="relative group overflow-hidden rounded-xl shadow-lg">
                                      <img
                                          src="\images\ortho\Trauma-Care.png"
                                          alt="Trauma Care"
                                          className="w-full h-28 sm:h-32 object-cover group-hover:scale-105 transition-transform duration-500"
                                      />

                                      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/80 to-transparent flex items-center">
                                          <div className="text-white p-4">
                                              <h4 className="font-bold text-sm">
                                                  🚑 Trauma Care
                                              </h4>
                                              <p className="text-xs opacity-90">
                                                  Emergency Excellence
                                              </p>
                                          </div>
                                      </div>
                                  </div>
                              </div>
                          </div>

                          {/* Features Grid */}
                          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                              <div className="bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition-shadow border border-teal-100">
                                  <div className="text-2xl mb-2">💻</div>
                                  <div className="text-sm font-bold text-gray-900 mb-1">
                                      Computer Assisted
                                  </div>
                                  <div className="text-xs text-gray-600">
                                      Precision Surgery
                                  </div>
                              </div>
                              <div className="bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition-shadow border border-teal-100">
                                  <div className="text-2xl mb-2">🚑</div>
                                  <div className="text-sm font-bold text-gray-900 mb-1">
                                      Trauma Care
                                  </div>
                                  <div className="text-xs text-gray-600">
                                      Emergency Excellence
                                  </div>
                              </div>
                              <div className="bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition-shadow border border-teal-100">
                                  <div className="text-2xl mb-2">🦴</div>
                                  <div className="text-sm font-bold text-gray-900 mb-1">
                                      Spine Surgery
                                  </div>
                                  <div className="text-xs text-gray-600">
                                      Neuro-navigation
                                  </div>
                              </div>
                              <div className="bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition-shadow border border-teal-100">
                                  <div className="text-2xl mb-2">🏆</div>
                                  <div className="text-sm font-bold text-gray-900 mb-1">
                                      JCI Accredited
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
                                          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3505.4029508292733!2d77.20939347580789!3d28.527605675722253!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce1f427d4c5fb%3A0x582d47bbf4970bc1!2sMax%20Super%20Speciality%20Hospital%2C%20Saket%20(Max%20Saket)!5e0!3m2!1sen!2sin!4v1757592265691!5m2!1sen!2sin"
                                          width="100%"
                                          height="220"
                                          style={{ border: 0 }}
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
                                  Max Super Speciality Hospital's Orthopaedics
                                  Department is renowned for computer-assisted
                                  surgery, trauma care, and comprehensive joint
                                  replacement services with cutting-edge
                                  technology.
                              </p>
                              <p>
                                  Our specialized teams in joint replacement,
                                  spine surgery, and trauma care provide
                                  world-class treatment with precision
                                  instruments and advanced rehabilitation
                                  programs.
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
                                          Initial consultation with specialist
                                          doctor, X-rays, MRI if required, and
                                          treatment plan discussion.
                                      </div>
                                  )}
                              </div>

                              <div className="border border-gray-200 rounded-xl overflow-hidden">
                                  <button
                                      onClick={() => toggleSection("surgery")}
                                      className="w-full p-5 text-left flex items-center justify-between hover:bg-gray-50 transition-colors">
                                      <div className="flex items-center">
                                          <div className="w-3 h-3 bg-teal-500 rounded-full mr-4"></div>
                                          <span className="font-semibold text-lg">
                                              Surgical Treatment
                                          </span>
                                      </div>
                                      {expandedSection === "surgery" ? (
                                          <ChevronUp className="w-5 h-5" />
                                      ) : (
                                          <ChevronDown className="w-5 h-5" />
                                      )}
                                  </button>
                                  {expandedSection === "surgery" && (
                                      <div className="px-5 pb-5 text-gray-600 leading-relaxed">
                                          Advanced surgical procedures including
                                          joint replacement, arthroscopy, and
                                          spine surgery with modern techniques.
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
                                          Comprehensive physiotherapy,
                                          post-operative care, and
                                          rehabilitation programs for optimal
                                          recovery.
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
                                                  Surgery Duration
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
                                                  `https://wa.me/911129851000?text=Hi, I'd like to know more about ${treatment.name} at Max Super Speciality Hospital.`,
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
                                      complexity and room category
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
                                      <li>• Comprehensive health assessment</li>
                                      <li>• Advanced imaging studies</li>
                                      <li>• Computer-assisted planning</li>
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
                                      <li>
                                          • Computer-assisted operation theater
                                      </li>
                                      <li>• Surgeon & anesthetist fees</li>
                                      <li>• Hospital bed (AC room)</li>
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
                                      <li>• Comprehensive rehabilitation</li>
                                      <li>• Follow-up consultations</li>
                                      <li>• Medications & dressings</li>
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
                                      World-class orthopedic specialists with
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
                                                                      `https://wa.me/911129851000?text=Hi, I'd like to book an appointment with ${doctor.name} for orthopedic consultation.`,
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
                                      Computer-assisted orthopedic procedures
                                      require comprehensive travel insurance
                                      covering advanced surgical procedures,
                                      personal accidents, and emergency medical
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
                                          • Patients must arrive at least 1 day
                                          before surgery for pre-operative
                                          assessments
                                      </li>
                                      <li>
                                          • Bring all medical records, previous
                                          X-rays, and MRI reports
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
                                          • Post-surgery physiotherapy is
                                          mandatory for optimal recovery
                                      </li>
                                  </ul>
                              </div>

                              <div className="bg-amber-50 rounded-xl p-5 border border-amber-200">
                                  <h3 className="font-bold text-amber-800 mb-3">
                                      Payment & Cancellation Policy
                                  </h3>
                                  <div className="text-amber-700 text-sm space-y-2">
                                      <p>
                                          • For surgeries scheduled within 30
                                          days, full payment is required
                                      </p>
                                      <p>
                                          • For surgeries beyond 30 days, 25%
                                          advance payment to confirm booking
                                      </p>
                                      <p>
                                          • Cancellations 15+ days before
                                          surgery: 80% refund (excluding booking
                                          fee)
                                      </p>
                                      <p>
                                          • Cancellations within 14 days:
                                          Non-refundable
                                      </p>
                                      <p>
                                          • Emergency situations considered
                                          case-by-case
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
                                      $4,500
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
                                              "https://wa.me/911129851000?text=Hi, I want to book an appointment for orthopedic consultation at Max Super Speciality Hospital.",
                                              "_blank"
                                          )
                                      }>
                                      Book Consultation
                                  </button>
                                  <button
                                      className="w-full border-2 border-gray-300 text-gray-700 py-3 rounded-xl font-bold hover:bg-gray-50 transition duration-200"
                                      onClick={() =>
                                          window.open(
                                              "https://wa.me/911129851000?text=Hi, I need a cost estimate for orthopedic treatment at Max Super Speciality Hospital.",
                                              "_blank"
                                          )
                                      }>
                                      Get Cost Estimate
                                  </button>
                              </div>

                              <div className="text-center text-sm text-gray-600 mb-4 bg-orange-50 p-3 rounded-lg border border-orange-200">
                                  🔥 <strong>4+ other people</strong> are
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
                                              EMI options starting $250/month
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
                                          +91 11 2985 1000
                                      </span>
                                  </div>
                                  <div className="flex items-center text-sm text-gray-600 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                                      <Mail className="w-4 h-4 mr-3 text-teal-600" />
                                      <span className="font-medium">
                                          ortho@maxhealthcare.com
                                      </span>
                                  </div>
                                  <div className="flex items-center text-sm text-gray-600 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                                      <MapPin className="w-4 h-4 mr-3 text-teal-600" />
                                      <span className="font-medium">
                                          Shalimar Bagh, New Delhi
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
                                  24/7 emergency orthopedic services with
                                  computer-assisted surgery capabilities and
                                  immediate trauma response team
                              </p>
                              <button
                                  className="w-full bg-red-600 text-white py-3 px-4 rounded-xl font-bold hover:bg-red-700 transition duration-200 shadow-lg hover:shadow-xl"
                                  onClick={() =>
                                      window.open("tel:+911129851000", "_blank")
                                  }>
                                  Emergency: +91 11 2985 1000
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
                                      <span>Computer-Assisted Surgery</span>
                                  </div>
                                  <div className="flex items-center text-gray-700">
                                      <div className="w-2 h-2 bg-teal-500 rounded-full mr-3"></div>
                                      <span>Trauma Care Excellence</span>
                                  </div>
                                  <div className="flex items-center text-gray-700">
                                      <div className="w-2 h-2 bg-teal-500 rounded-full mr-3"></div>
                                      <span>Advanced Spine Surgery</span>
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

export default MaxOrthoService;