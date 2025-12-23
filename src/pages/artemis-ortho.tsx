import React, { useState, useEffect } from 'react';
import { Star, MapPin, Phone, Mail, Calendar, Award, CheckCircle, ChevronDown, ChevronUp, ChevronLeft, ChevronRight, Quote, Clock, Plane, Car, Shield } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const ArtemisOrthoService = () => {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const treatments = [
  {
    name: "Unilateral Total Hip Replacement (THR)",
    cost: "$4,200 - $5,500",
    description: "Single hip joint replacement with ceramic-on-ceramic technology",
    duration: "2-3 hours",
    stay: "3-4 days"
  },
  {
    name: "Bilateral Total Hip Replacement (THR)",
    cost: "$8,000 - $10,000",
    description: "Both hip joints replacement performed in stages",
    duration: "4-5 hours",
    stay: "5-7 days"
  },
  {
    name: "Unilateral Total Knee Replacement (TKR)",
    cost: "$3,800 - $5,000",
    description: "Single knee joint replacement with robotic assistance",
    duration: "1-2 hours",
    stay: "3-4 days"
  },
  {
    name: "Bilateral Total Knee Replacement (TKR)",
    cost: "$7,500 - $9,800",
    description: "Both knee joints replacement with advanced techniques",
    duration: "3-4 hours",
    stay: "5-6 days"
  },
  {
    name: "Arthroscopic Surgery",
    cost: "$2,500 - $4,000",
    description: "Minimally invasive joint surgery for sports injuries",
    duration: "30-90 minutes",
    stay: "1-2 days"
  },
  {
    name: "Complex Spine Surgery",
    cost: "$6,500 - $12,000",
    description: "Advanced spinal fusion and deformity correction",
    duration: "3-6 hours",
    stay: "4-7 days"
  },
  {
    name: "Sports Medicine & ACL Reconstruction",
    cost: "$3,000 - $5,500",
    description: "Complete ACL reconstruction with rehabilitation",
    duration: "1-2 hours",
    stay: "1-2 days"
  },
  {
    name: "Limb Lengthening Surgery",
    cost: "$8,500 - $15,000",
    description: "Complex deformity correction using Ilizarov method",
    duration: "2-4 hours",
    stay: "7-10 days"
  }];


  const doctors = [
      {
          name: "Dr. IPS Oberoi",
          specialization: "Joint Replacement Surgeon",
          experience: "22+ years",
          patientsTreated: "3,500+",
          rating: "4.9",
          reviews: "245",
          image: "/images/dr-dr-i-p-s-oberoi.jpg",
          qualifications: "MBBS, MS Ortho, Fellowship Joint Replacement",
          expertise: [
              "Hip Replacement",
              "Knee Replacement",
              "Revision Surgery",
          ],
      },
      {
          name: "Dr. Hitesg Garg ",
          specialization: "Orthopedic Surgeon",
          experience: "18+ years",
          patientsTreated: "2,800+",
          rating: "4.8",
          reviews: "189",
          image: "/images/dr-dr-hitesh-garg.jpg",
          qualifications: "MBBS, MS Ortho, Fellowship Sports Medicine",
          expertise: ["Sports Medicine", "Arthroscopy", "ACL Reconstruction"],
      },
      {
          name: "Dr. Sanjay Sarup ",
          specialization: "Orthopaedics",
          experience: "20+ years",
          patientsTreated: "2,200+",
          rating: "4.9",
          reviews: "167",
          image: "/images/dr-dr-sanjay-sarup.jpg",
          qualifications: "MBBS, MS Ortho, MCh Spine Surgery",
          expertise: [
              "Spinal Fusion",
              "Disc Surgery",
              "Minimally Invasive Spine",
          ],
      },
      {
          name: "Dr. Ramkinkar Jha",
          specialization: "Orthopaedics",
          experience: "15+ years",
          patientsTreated: "1,800+",
          rating: "4.7",
          reviews: "134",
          image: "/images/dr-dr-ramkinkar-jha.jpg",
          qualifications: "MBBS, McH Ortho",
          expertise: ["Brain Surgery", "Spine Surgery", "Neuro Trauma"],
      },
  ];


  const testimonials = [
  {
    name: "Mrs. Sunita Gupta",
    age: 58,
    country: "India",
    treatment: "Total Knee Replacement",
    rating: 5,
    story: "Dr. IPS Oberoi performed my bilateral knee replacement with such precision. I was walking within 2 days! The nursing staff was incredibly caring and the physiotherapy team helped me regain full mobility. Six months later, I'm pain-free and can climb stairs easily.",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=100&h=100&fit=crop&crop=face",
    date: "Dec 2024",
    doctor: "Dr. IPS Oberoi"
  },
  {
    name: "Mr. James Wilson",
    age: 34,
    country: "Canada",
    treatment: "ACL Reconstruction",
    rating: 5,
    story: "As a professional athlete, I needed the best care for my torn ACL. The sports medicine team at Artemis was exceptional. Dr. Rajiv Yadav used the latest arthroscopic techniques and I was back to competitive sports in 4 months. The cost was 60% less than what I would pay in Canada.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    date: "Nov 2024",
    doctor: "Dr. Rajiv Yadav"
  },
  {
    name: "Ms. Sarah Ahmed",
    age: 42,
    country: "UAE",
    treatment: "Spinal Fusion Surgery",
    rating: 5,
    story: "I suffered from chronic back pain for years. Dr. Dheeraj Batheja performed a complex spinal fusion surgery using robotic assistance. The precision was remarkable and my recovery was faster than expected. I'm now completely pain-free and back to my active lifestyle.",
    image: "https://images.unsplash.com/photo-1708962188322-0e9a5e40c101?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3MTg3MTl8MHwxfHNlYXJjaHwxfHxBJTIwY3JvcHBlZCUyMGltYWdlJTIwb2YlMjBhJTIwcGVyc29uJTJDJTIwZm9jdXNpbmclMjBvbiUyMHRoZWlyJTIwZmFjZSUyQyUyMHdpdGglMjBhJTIwbmF0dXJhbCUyMGJhY2tncm91bmQufGVufDB8fHx8MTc1NzUxODg2MXww&ixlib=rb-4.1.0&q=80&w=200$w=100",
    date: "Oct 2024",
    doctor: "Dr. Dheeraj Batheja"
  },
  {
    name: "Mr. David Thompson",
    age: 67,
    country: "Australia",
    treatment: "Hip Replacement",
    rating: 5,
    story: "The ceramic-on-ceramic hip replacement by Dr. Vandana Soni has given me a new lease on life. The hospital facilities are world-class and the international patient services made everything seamless. I'm now walking 5km daily without any discomfort.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    date: "Sep 2024",
    doctor: "Dr. Vandana Soni"
  },
  {
    name: "Mrs. Fatima Al-Zahra",
    age: 51,
    country: "Qatar",
    treatment: "Complex Spine Surgery",
    rating: 5,
    story: "I had multiple herniated discs and was told I needed complex surgery. Dr. Aditya Gupta's expertise in neurosurgery combined with the orthopedic team's support resulted in a perfect outcome. The minimally invasive approach meant faster recovery and minimal scarring.",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
    date: "Aug 2024",
    doctor: "Dr. Aditya Gupta"
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
                                      Orthopaedic Care
                                  </span>
                              </h1>
                              <p className="text-base sm:text-lg text-gray-600 mb-4 leading-relaxed max-w-3xl">
                                  Advanced joint replacement, spine surgery, and
                                  sports medicine with robotic precision and
                                  compassionate care.
                              </p>
                          </div>

                          {/* Image Grid */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                              <div className="relative group overflow-hidden rounded-xl shadow-lg">
                                  <img
                                      src="\images\Artimes-hospital.png"
                                      alt="Artemis Hospital - Advanced Orthopaedic Care"
                                      className="w-full h-48 sm:h-56 object-cover group-hover:scale-105 transition-transform duration-500"
                                  />

                                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                                  <div className="absolute top-4 left-4 bg-teal-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                                      🏆 JCI Accredited
                                  </div>
                                  <div className="absolute bottom-4 left-4 text-white">
                                      <h3 className="font-bold text-lg">
                                          Artemis Hospital
                                      </h3>
                                      <p className="text-sm opacity-90">
                                          Leading Orthopaedic Center
                                      </p>
                                  </div>
                              </div>

                              <div className="grid grid-rows-2 gap-4">
                                  <div className="relative group overflow-hidden rounded-xl shadow-lg">
                                      <img
                                          src="\images\Artemis Hospital\Robotic-Surgery.png"
                                          alt="Robotic Surgery Equipment"
                                          className="w-full h-24 sm:h-28 object-cover group-hover:scale-105 transition-transform duration-500"
                                      />

                                      <div className="absolute inset-0 bg-gradient-to-r from-teal-600/80 to-transparent flex items-center">
                                          <div className="text-white p-4">
                                              <h4 className="font-bold text-sm">
                                                  🤖 Robotic Surgery
                                              </h4>
                                              <p className="text-xs opacity-90">
                                                  Precision Technology
                                              </p>
                                          </div>
                                      </div>
                                  </div>
                                  <div className="relative group overflow-hidden rounded-xl shadow-lg">
                                      <img
                                          src="\images\Artemis Hospital\Premium-Care.png"
                                          alt="State-of-art Recovery Room"
                                          className="w-full h-28 sm:h-32 object-cover group-hover:scale-105 transition-transform duration-500"
                                      />

                                      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/80 to-transparent flex items-center">
                                          <div className="text-white p-4">
                                              <h4 className="font-bold text-sm">
                                                  🏥 Premium Care
                                              </h4>
                                              <p className="text-xs opacity-90">
                                                  Luxury Recovery Suites
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
                                      Latest Technology
                                  </div>
                              </div>
                              <div className="bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition-shadow border border-teal-100">
                                  <div className="text-2xl mb-2">👨‍⚕️</div>
                                  <div className="text-sm font-bold text-gray-900 mb-1">
                                      20+ Experts
                                  </div>
                                  <div className="text-xs text-gray-600">
                                      Specialist Surgeons
                                  </div>
                              </div>
                              <div className="bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition-shadow border border-teal-100">
                                  <div className="text-2xl mb-2">📊</div>
                                  <div className="text-sm font-bold text-gray-900 mb-1">
                                      99.1% Success
                                  </div>
                                  <div className="text-xs text-gray-600">
                                      Treatment Rate
                                  </div>
                              </div>
                              <div className="bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition-shadow border border-teal-100">
                                  <div className="text-2xl mb-2">🏆</div>
                                  <div className="text-sm font-bold text-gray-900 mb-1">
                                      JCI Certified
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
                                              Free Airport Transfer
                                          </div>
                                          <div className="text-sm text-gray-600">
                                              Complimentary pickup & drop
                                              service
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
                                              Sector 51, Gurugram - Medical Hub
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
                                          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d23361.549068086817!2d77.0686233386212!3d28.431207820757177!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d1883aaaaaaab%3A0x404085140375fa28!2sArtemis%20Hospital%20Gurgaon!5e0!3m2!1sen!2sin!4v1756985738009!5m2!1sen!2sin"
                                          width="100%"
                                          height="220"
                                          style={{ border: 0 }}
                                          loading="lazy"
                                          referrerPolicy="no-referrer-when-downgrade"
                                          className="rounded-lg"></iframe>
                                  </div>
                                  <div className="mt-3 text-center">
                                      <a
                                          href="https://maps.google.com/?cid=462583748879313448"
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
                                  Our Orthopaedics Department offers
                                  comprehensive care for all bone, joint, and
                                  musculoskeletal conditions. With
                                  state-of-the-art technology and experienced
                                  specialists, we provide both surgical and
                                  non-surgical treatments tailored to each
                                  patient's needs.
                              </p>
                              <p>
                                  From complex joint replacements to minimally
                                  invasive procedures, our team ensures the
                                  highest standard of care with faster recovery
                                  times and optimal outcomes.
                              </p>
                          </div>
                      </div>

                      {/* Treatment Plans */}
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

                      {/* Enhanced Treatments & Costs */}
                      <div className="bg-white rounded-2xl shadow-lg p-6">
                          <h2 className="text-2xl font-bold text-gray-900 mb-6">
                              Treatment Plans
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
                                                  `https://wa.me/911142111111?text=Hi, I'd like to know more about ${treatment.name} at Medanta Hospital.`,
                                                  "_blank"
                                              )
                                          }>
                                          Get Quote
                                      </button>
                                  </div>
                              ))}
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
                                      <li>• Comprehensive health check-up</li>
                                      <li>• Blood tests and imaging</li>
                                      <li>• Anesthesia consultation</li>
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
                                      <li>• Operation theater charges</li>
                                      <li>• Surgeon & anesthetist fees</li>
                                      <li>• Hospital bed (AC room)</li>
                                      <li>• Nursing care 24/7</li>
                                  </ul>
                              </div>

                              <div className="bg-teal-50 rounded-xl p-5 border border-teal-100">
                                  <div className="flex items-center mb-3">
                                      <CheckCircle className="w-5 h-5 text-teal-500 mr-2" />
                                      <span className="font-bold text-teal-800">
                                          Post-operative Support
                                      </span>
                                  </div>
                                  <ul className="text-teal-700 space-y-2 text-sm">
                                      <li>• Physiotherapy sessions</li>
                                      <li>• Follow-up consultations</li>
                                      <li>• Medication guidance</li>
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
                                                                      `https://wa.me/911142111111?text=Hi, I'd like to book an appointment with ${doctor.name} for orthopedic consultation.`,
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
                                      Orthopedic treatment requires adequate
                                      travel insurance covering medical
                                      procedures, personal accidents, including
                                      repatriation costs and emergency
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
                                      Why Choose MedCasts with Artemis
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
                                      $3,800
                                  </div>
                                  <div className="text-sm text-gray-500">
                                      Consultation from $50
                                  </div>
                              </div>

                              <div className="space-y-3 mb-5">
                                  <button
                                      className="w-full bg-teal-600 text-white py-3 rounded-xl font-bold hover:bg-teal-700 transition duration-200 shadow-lg hover:shadow-xl"
                                      onClick={() =>
                                          window.open(
                                              "https://wa.me/911142111111?text=Hi, I would like to book an orthopedic consultation appointment.",
                                              "_blank"
                                          )
                                      }>
                                      Book Appointment
                                  </button>
                                  <button
                                      className="w-full border-2 border-gray-300 text-gray-700 py-3 rounded-xl font-bold hover:bg-gray-50 transition duration-200"
                                      onClick={() =>
                                          window.open(
                                              "https://wa.me/911142111111?text=Hi, I need a cost estimate for orthopedic treatment.",
                                              "_blank"
                                          )
                                      }>
                                      Get Cost Estimate
                                  </button>
                              </div>

                              <div className="text-center text-sm text-gray-600 mb-4 bg-orange-50 p-3 rounded-lg border border-orange-200">
                                  🔥 <strong>2+ other people</strong> are
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
                                              EMI options starting $200/month
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
                                          +91 11 4211 1111
                                      </span>
                                  </div>
                                  <div className="flex items-center text-sm text-gray-600 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                                      <Mail className="w-4 h-4 mr-3 text-teal-600" />
                                      <span className="font-medium">
                                          ortho@artemishospitals.com
                                      </span>
                                  </div>
                                  <div className="flex items-center text-sm text-gray-600 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                                      <MapPin className="w-4 h-4 mr-3 text-teal-600" />
                                      <span className="font-medium">
                                          Sector 51, Gurugram, Haryana
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
                                  24/7 emergency orthopedic services available
                                  with immediate response team
                              </p>
                              <button
                                  className="w-full bg-red-600 text-white py-3 px-4 rounded-xl font-bold hover:bg-red-700 transition duration-200 shadow-lg hover:shadow-xl"
                                  onClick={() =>
                                      window.open("tel:+911142110000", "_blank")
                                  }>
                                  Emergency: +91 11 4211 0000
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
                                      <span>JCI Accredited Hospital</span>
                                  </div>
                                  <div className="flex items-center text-gray-700">
                                      <div className="w-2 h-2 bg-teal-500 rounded-full mr-3"></div>
                                      <span>99.1% Success Rate</span>
                                  </div>
                                  <div className="flex items-center text-gray-700">
                                      <div className="w-2 h-2 bg-teal-500 rounded-full mr-3"></div>
                                      <span>Robotic Surgery Available</span>
                                  </div>
                                  <div className="flex items-center text-gray-700">
                                      <div className="w-2 h-2 bg-teal-500 rounded-full mr-3"></div>
                                      <span>
                                          International Patient Services
                                      </span>
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

export default ArtemisOrthoService;