import React, { useState, useEffect } from 'react';
import { Star, MapPin, Phone, Mail, Calendar, Users, Award, CheckCircle, ChevronDown, ChevronUp, ChevronLeft, ChevronRight, Quote, Clock, Plane, Car, Shield } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const ApolloNeuroSpineService = () => {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const treatments = [
  {
    name: "Minimally Invasive Spine Surgery",
    cost: "$8,000 - $13,000",
    description: "Advanced techniques for spine conditions with smaller incisions, less pain, and faster recovery",
    duration: "2-4 hours",
    stay: "3-5 days"
  },
  {
    name: "Cervical Disc Replacement",
    cost: "$9,500 - $15,000",
    description: "Artificial disc replacement to maintain motion and reduce adjacent segment degeneration",
    duration: "2-3 hours",
    stay: "2-4 days"
  },
  {
    name: "Lumbar Fusion Surgery",
    cost: "$12,000 - $19,000",
    description: "Stabilization of the lumbar spine for conditions like spondylolisthesis and degenerative disc disease",
    duration: "3-5 hours",
    stay: "5-7 days"
  },
  {
    name: "Spinal Deformity Correction",
    cost: "$15,000 - $27,000",
    description: "Complex procedures for scoliosis, kyphosis, and other spinal deformities",
    duration: "4-8 hours",
    stay: "7-10 days"
  },
  {
    name: "Brain Tumor Surgery",
    cost: "$14,000 - $24,000",
    description: "Precision removal of brain tumors using advanced navigation and intraoperative monitoring",
    duration: "4-6 hours",
    stay: "7-10 days"
  },
  {
    name: "Epilepsy Surgery",
    cost: "$16,000 - $26,000",
    description: "Surgical interventions for drug-resistant epilepsy to reduce or eliminate seizures",
    duration: "4-8 hours",
    stay: "7-14 days"
  },
  {
    name: "Endovascular Neurosurgery",
    cost: "$10,000 - $18,000",
    description: "Minimally invasive treatment for aneurysms, AVMs, and other vascular conditions",
    duration: "2-4 hours",
    stay: "3-7 days"
  },
  {
    name: "Deep Brain Stimulation",
    cost: "$20,000 - $30,000",
    description: "Implantation of electrodes for treatment of Parkinson's disease, essential tremor, and dystonia",
    duration: "4-6 hours",
    stay: "5-7 days"
  }];


  const doctors = [
      {
          name: "Dr. Swarupa Bansode",
          specialization: "Senior Consultant, Neurology",
          experience: "30+ years",
          patientsTreated: "14,000+",
          rating: "4.9",
          reviews: "410",
          image: "/images/apollo/Dr_Swarupa_a294d61429.jpg",
          qualifications:
              "MBBS, MD (Medicine), DM (Neurology), Fellowship (UK)",
          expertise: ["Stroke Management", "Epilepsy", "Movement Disorders"],
      },
      {
          name: "Dr. Puja Kapoor",
          specialization: "Senior Consultant, Neurology",
          experience: "35+ years",
          patientsTreated: "16,000+",
          rating: "4.9",
          reviews: "430",
          image: "/images/apollo/DR_PUJA_KAPOOR_42082d084e.jpg",
          qualifications: "MBBS, MD (Medicine), DM (Neurology)",
          expertise: ["Neuro-rehabilitation", "Stroke", "Parkinson's Disease"],
      },
      {
          name: "Dr. Rajender Singla",
          specialization: "Senior Consultant, Neurosurgery",
          experience: "25+ years",
          patientsTreated: "9,000+",
          rating: "4.8",
          reviews: "350",
          image: "/images/apollo/DR_RAJENDER_SINGLA_987e824262.png",
          qualifications: "MBBS, MS, MCh (Neurosurgery), Fellowship (USA)",
          expertise: ["Brain Tumors", "Spine Surgery", "Neurotrauma"],
      },
      {
          name: "Dr. Ritu Jha",
          specialization: "Senior Consultant, Spine Surgery",
          experience: "20+ years",
          patientsTreated: "7,500+",
          rating: "4.8",
          reviews: "320",
          image: "/images/apollo/Dr_Ritu_Jha_5df153993f.jpg",
          qualifications: "MBBS, MS (Ortho), Fellowship in Spine Surgery (USA)",
          expertise: [
              "Minimally Invasive Spine Surgery",
              "Spinal Deformities",
              "Spinal Trauma",
          ],
      },
  ];


  const testimonials = [
  {
    name: "Robert Miller",
    age: 62,
    country: "USA",
    treatment: "Minimally Invasive Spine Surgery for Lumbar Stenosis",
    rating: 5,
    story: "I had been suffering from severe back pain and sciatica for over two years. After multiple failed treatments in the US, I was recommended surgery, but the cost was prohibitive. Dr. Arun Saroha performed minimally invasive decompression surgery that transformed my life.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    date: "Dec 2024",
    doctor: "Dr. Arun Saroha"
  },
  {
    name: "Emma Thompson",
    age: 45,
    country: "UK",
    treatment: "Brain Tumor Surgery",
    rating: 5,
    story: "When I was diagnosed with a meningioma, I was devastated. The waiting time for surgery in the UK was long. Dr. Pranav Kumar performed the surgery with advanced neuronavigation technology, and the tumor was completely removed without complications.",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face",
    date: "Nov 2024",
    doctor: "Dr. Pranav Kumar"
  },
  {
    name: "Ahmed Al-Mansour",
    age: 68,
    country: "Saudi Arabia",
    treatment: "Deep Brain Stimulation for Parkinson's Disease",
    rating: 5,
    story: "After living with Parkinson's disease for 12 years, my medication was becoming less effective. Dr. Vinit Suri and his team performed Deep Brain Stimulation with precision. The improvement in my symptoms has been remarkable.",
    image: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=100&h=100&fit=crop&crop=face",
    date: "Oct 2024",
    doctor: "Dr. Vinit Suri"
  },
  {
    name: "Sophia Chen",
    age: 34,
    country: "Singapore",
    treatment: "Endovascular Coiling for Brain Aneurysm",
    rating: 5,
    story: "I was diagnosed with a brain aneurysm during a routine health check-up. Dr. Mukesh Sharma performed coiling of my aneurysm through a small incision - no open brain surgery needed! I was amazed at how quickly I recovered.",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop&crop=face",
    date: "Sep 2024",
    doctor: "Dr. Mukesh Sharma"
  },
  {
    name: "David Wilson",
    age: 56,
    country: "Australia",
    treatment: "Cervical Disc Replacement",
    rating: 5,
    story: "I had been suffering from severe neck pain and arm weakness due to cervical disc herniation. Dr. Arun Saroha recommended artificial disc replacement instead of fusion to maintain motion. The surgery was performed with precision.",
    image: "https://images.unsplash.com/photo-1552058544-f2b08422138a?w=100&h=100&fit=crop&crop=face",
    date: "Aug 2024",
    doctor: "Dr. Arun Saroha"
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
                                  Neuro Spine
                              </span>
                          </div>

                          <div className="mb-6">
                              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 leading-tight">
                                  Institute of{" "}
                                  <span className="text-teal-600">
                                      Neurosciences Excellence
                                  </span>
                              </h1>
                              <p className="text-base sm:text-lg text-gray-600 mb-4 leading-relaxed max-w-3xl">
                                  Comprehensive neurological and spine care with
                                  cutting-edge technology and internationally
                                  trained specialists at affordable costs.
                              </p>
                          </div>

                          {/* Image Grid */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                              <div className="relative group overflow-hidden rounded-xl shadow-lg">
                                  <img
                                      src="\images\Apollo-hospital.png"
                                      alt="Apollo Hospital - Institute of Neurosciences Excellence"
                                      className="w-full h-48 sm:h-56 object-cover group-hover:scale-105 transition-transform duration-500"
                                  />

                                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                                  <div className="absolute top-4 left-4 bg-teal-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                                      🧠 Neuro Excellence
                                  </div>
                                  <div className="absolute bottom-4 left-4 text-white">
                                      <h3 className="font-bold text-lg">
                                          Apollo Hospital
                                      </h3>
                                      <p className="text-sm opacity-90">
                                          Institute of Neurosciences
                                      </p>
                                  </div>
                              </div>

                              <div className="grid grid-rows-2 gap-4">
                                  <div className="relative group overflow-hidden rounded-xl shadow-lg">
                                      <img
                                          src="https://images.unsplash.com/photo-1669930605340-801a0be1f5a3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3MTg3MTl8MHwxfHNlYXJjaHwxfHxBbiUyMGltYWdlJTIwc2hvd2Nhc2luZyUyMGFkdmFuY2VkJTIwbmV1cm9zdXJnZXJ5JTIwZXF1aXBtZW50LnxlbnwwfHx8fDE3NTc1OTUyNzF8MA&ixlib=rb-4.1.0&q=80&w=200$w=400"
                                          alt="Advanced Neurosurgery Equipment"
                                          className="w-full h-24 sm:h-28 object-cover group-hover:scale-105 transition-transform duration-500"
                                      />

                                      <div className="absolute inset-0 bg-gradient-to-r from-teal-600/80 to-transparent flex items-center">
                                          <div className="text-white p-4">
                                              <h4 className="font-bold text-sm">
                                                  🔬 Advanced Technology
                                              </h4>
                                              <p className="text-xs opacity-90">
                                                  Minimally Invasive
                                              </p>
                                          </div>
                                      </div>
                                  </div>
                                  <div className="relative group overflow-hidden rounded-xl shadow-lg">
                                      <img
                                          src="\images\ortho\Computer-Assisted.png"
                                          alt="World-Class Neuro Specialists"
                                          className="w-full h-28 sm:h-32 object-cover group-hover:scale-105 transition-transform duration-500"
                                      />

                                      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/80 to-transparent flex items-center">
                                          <div className="text-white p-4">
                                              <h4 className="font-bold text-sm">
                                                  👨‍⚕️ Expert Team
                                              </h4>
                                              <p className="text-xs opacity-90">
                                                  International Specialists
                                              </p>
                                          </div>
                                      </div>
                                  </div>
                              </div>
                          </div>

                          {/* Features Grid */}
                          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                              <div className="bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition-shadow border border-teal-100">
                                  <div className="text-2xl mb-2">🧠</div>
                                  <div className="text-sm font-bold text-gray-900 mb-1">
                                      Brain Surgery
                                  </div>
                                  <div className="text-xs text-gray-600">
                                      Advanced Procedures
                                  </div>
                              </div>
                              <div className="bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition-shadow border border-teal-100">
                                  <div className="text-2xl mb-2">🦴</div>
                                  <div className="text-sm font-bold text-gray-900 mb-1">
                                      Spine Surgery
                                  </div>
                                  <div className="text-xs text-gray-600">
                                      Minimally Invasive
                                  </div>
                              </div>
                              <div className="bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition-shadow border border-teal-100">
                                  <div className="text-2xl mb-2">📊</div>
                                  <div className="text-sm font-bold text-gray-900 mb-1">
                                      96% Success
                                  </div>
                                  <div className="text-xs text-gray-600">
                                      Proven Results
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
                                              15 minutes from Delhi Airport
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
                                              Sarita Vihar Metro
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
                                              Sarita Vihar, New Delhi
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
                                          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3504.9640329981867!2d77.28065237580833!3d28.54080077571503!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce6ad13eaaa99%3A0x3bc07ad476bc6d77!2sIndraprastha%20Apollo%20Hospital!5e0!3m2!1sen!2sin!4v1756991461879!5m2!1sen!2sin"
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
                                  Apollo Institute of Neurosciences offers
                                  comprehensive neurological and spine care with
                                  cutting-edge technology and internationally
                                  trained specialists providing world-class
                                  treatment at affordable costs.
                              </p>
                              <p>
                                  Our department is equipped with the latest
                                  technology including intraoperative
                                  neuronavigation, neuromonitoring, and advanced
                                  imaging, allowing our internationally trained
                                  specialists to perform both routine and
                                  complex neurological procedures with excellent
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
                                          Comprehensive neurological evaluation,
                                          advanced imaging studies, and
                                          multidisciplinary treatment planning
                                          with world-class expertise.
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
                                              Neuro Spine Surgery
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
                                          Advanced neurosurgical and spine
                                          procedures including minimally
                                          invasive, robotic, and complex
                                          surgeries with cutting-edge
                                          technology.
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
                                          Comprehensive post-operative care,
                                          neuro-rehabilitation programs, and
                                          telemedicine follow-up with advanced
                                          monitoring systems.
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
                                                  `https://wa.me/919811456789?text=Hi, I'd like to know more about ${treatment.name} at Apollo Hospital.`,
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
                                      • Comprehensive neurospine care with
                                      cutting-edge technology and international
                                      expertise
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
                                          Pre-operative Care
                                      </span>
                                  </div>
                                  <ul className="text-teal-700 space-y-2 text-sm">
                                      <li>
                                          • Comprehensive neurological
                                          evaluation
                                      </li>
                                      <li>• Advanced imaging studies</li>
                                      <li>• Multidisciplinary consultation</li>
                                      <li>• Pre-surgical optimization</li>
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
                                          • Advanced neurosurgical procedures
                                      </li>
                                      <li>• Specialist surgeon fees</li>
                                      <li>
                                          • ICU & hospital bed (premium room)
                                      </li>
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
                                      <li>• Neuro-rehabilitation</li>
                                      <li>• Follow-up consultations</li>
                                      <li>• Medications & physiotherapy</li>
                                      <li>• Telemedicine monitoring</li>
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
                                      Internationally trained neurospine
                                      specialists with proven expertise
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
                                                                      className="w-20 h-20 rounded-full mx-auto object-contain border-3 border-teal-100 group-hover:border-teal-300 transition-colors duration-300"
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
                                                                      `https://wa.me/919811456789?text=Hi, I'd like to book an appointment with ${doctor.name} for neurospine consultation.`,
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
                                      Advanced neurospine procedures require
                                      comprehensive travel insurance covering
                                      surgical procedures, complications, and
                                      emergency medical evacuation.
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
                                          before surgery for pre-assessment
                                      </li>
                                      <li>
                                          • Bring all medical records, imaging
                                          studies, and previous surgical reports
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
                                          • Post-operative recovery and
                                          neuro-rehabilitation is essential
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
                                          • For surgeries beyond 30 days, 30%
                                          advance payment to confirm booking
                                      </p>
                                      <p>
                                          • Cancellations 15+ days before
                                          surgery: 75% refund (excluding booking
                                          fee)
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
                                      Why Choose MedCasts with Apollo
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
                                      $8,000
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
                                              "https://wa.me/919811456789?text=Hi, I want to book an appointment for neurospine consultation at Apollo Hospital.",
                                              "_blank"
                                          )
                                      }>
                                      Book Consultation
                                  </button>
                                  <button
                                      className="w-full border-2 border-gray-300 text-gray-700 py-3 rounded-xl font-bold hover:bg-gray-50 transition duration-200"
                                      onClick={() =>
                                          window.open(
                                              "https://wa.me/919811456789?text=Hi, I need a cost estimate for neurospine surgery at Apollo Hospital.",
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
                                              EMI options starting $400/month
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
                                          +91-98114-56789
                                      </span>
                                  </div>
                                  <div className="flex items-center text-sm text-gray-600 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                                      <Mail className="w-4 h-4 mr-3 text-teal-600" />
                                      <span className="font-medium">
                                          neurospine@apollohospitals.com
                                      </span>
                                  </div>
                                  <div className="flex items-center text-sm text-gray-600 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                                      <MapPin className="w-4 h-4 mr-3 text-teal-600" />
                                      <span className="font-medium">
                                          Sarita Vihar, New Delhi
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
                                  24/7 emergency neurospine services with
                                  immediate response team and comprehensive
                                  neurological care
                              </p>
                              <button
                                  className="w-full bg-red-600 text-white py-3 px-4 rounded-xl font-bold hover:bg-red-700 transition duration-200 shadow-lg hover:shadow-xl"
                                  onClick={() =>
                                      window.open("tel:+919811456789", "_blank")
                                  }>
                                  Emergency: +91-98114-56789
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
                                      <span>World-Class Neurospine Care</span>
                                  </div>
                                  <div className="flex items-center text-gray-700">
                                      <div className="w-2 h-2 bg-teal-500 rounded-full mr-3"></div>
                                      <span>Cutting-edge Technology</span>
                                  </div>
                                  <div className="flex items-center text-gray-700">
                                      <div className="w-2 h-2 bg-teal-500 rounded-full mr-3"></div>
                                      <span>International Specialists</span>
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

export default ApolloNeuroSpineService;