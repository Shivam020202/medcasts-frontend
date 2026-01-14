// components/HelpCenter.tsx
import React, { useState } from 'react';
import { Search, ChevronDown, ChevronRight, Phone, MessageCircle, Mail, Clock } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const HelpCenter: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const faqCategories = [
    {
      title: "Getting Started",
      faqs: [
        {
          question: "How do I find the right doctor for my condition?",
          answer: "Our platform connects you with specialized doctors based on your medical needs. Use our 'Find Doctors' section to browse by specialty, location, or hospital. You can also contact our medical coordinators at +919643452714 for personalized recommendations."
        },
        {
          question: "How do I book an appointment?",
          answer: "You can book appointments directly through WhatsApp by clicking the 'Book on WhatsApp' button next to any doctor's profile. Our team will coordinate with the hospital and confirm your appointment details."
        },
        {
          question: "What information do I need to provide?",
          answer: "Please provide your full name, phone number, email, medical condition details, preferred appointment date, and any relevant medical history. This helps us arrange the best possible care for you."
        }
      ]
    },
    {
      title: "Medical Services",
      faqs: [
        {
          question: "What medical specialties do you cover?",
          answer: "We offer comprehensive medical services including Orthopedics, Oncology, Cardiac Surgery, BMT (Bone Marrow Transplant), Neuro Spine Surgery, and GI Surgery across top hospitals in India."
        },
        {
          question: "Do you provide emergency medical assistance?",
          answer: "Yes, we provide 24/7 emergency medical consultation. For urgent medical needs, contact us immediately at +919643452714 or use our WhatsApp emergency service."
        },
        {
          question: "Can international patients use your services?",
          answer: "Absolutely! We specialize in medical tourism and assist international patients with treatment planning, hospital coordination, visa assistance, and travel arrangements."
        }
      ]
    },
    {
      title: "Costs & Insurance",
      faqs: [
        {
          question: "How much do treatments cost?",
          answer: "Treatment costs vary depending on the procedure, hospital, and complexity. We provide transparent pricing and detailed cost estimates before treatment. Contact us for personalized cost information."
        },
        {
          question: "Do you accept insurance?",
          answer: "We work with various insurance providers. Please contact us with your insurance details, and we'll help verify coverage and coordinate with your insurance company."
        },
        {
          question: "Are there financing options available?",
          answer: "Yes, we can help arrange financing options and payment plans for medical treatments. Our financial coordinators will work with you to find suitable payment solutions."
        }
      ]
    },
    {
      title: "Hospital & Travel",
      faqs: [
        {
          question: "Which hospitals do you work with?",
          answer: "We partner with top-tier hospitals including Artemis Hospital, Medanta, Apollo, Max Healthcare, Amrita Hospital, and Sarvodaya Hospital across major cities in India."
        },
        {
          question: "Do you provide travel assistance?",
          answer: "Yes, we offer comprehensive travel assistance including airport transfers, accommodation arrangements, local transportation, and companion support for international patients."
        },
        {
          question: "What about accommodation for patients and families?",
          answer: "We can arrange comfortable accommodation near the hospital for patients and their families, including guest houses, hotels, and service apartments based on your budget and preferences."
        }
      ]
    }
  ];

  const quickActions = [
    {
      title: "Contact Support",
      description: "Speak with our medical coordinators",
      icon: Phone,
      action: "tel:+919643452714",
      color: "bg-teal-600 hover:bg-teal-700"
    },
    {
      title: "WhatsApp Chat",
      description: "Get instant help via WhatsApp",
      icon: MessageCircle,
      action: "https://wa.me/919643452714",
      color: "bg-green-600 hover:bg-green-700"
    },
    {
      title: "Email Support",
      description: "Send us a detailed inquiry",
      icon: Mail,
      action: "mailto:info@medcasts.com",
      color: "bg-blue-600 hover:bg-blue-700"
    }
  ];

  const filteredFAQs = faqCategories.map(category => ({
    ...category,
    faqs: category.faqs.filter(faq => 
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(category => category.faqs.length > 0);

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  const handleQuickAction = (action: string) => {
    if (action.startsWith('http')) {
      window.open(action, '_blank');
    } else {
      window.location.href = action;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-teal-600 to-teal-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Help Center</h1>
            <p className="text-xl text-teal-100 max-w-3xl mx-auto mb-8">
              Find answers to frequently asked questions and get the support you need for your medical journey.
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto relative">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search for help articles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 rounded-xl text-gray-900 border-0 focus:ring-2 focus:ring-white focus:ring-opacity-50 text-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">Need Immediate Help?</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {quickActions.map((action, index) => (
              <button
                key={index}
                onClick={() => handleQuickAction(action.action)}
                className={`${action.color} text-white p-6 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg`}
              >
                <action.icon className="w-8 h-8 mx-auto mb-3" />
                <h3 className="text-xl font-semibold mb-2">{action.title}</h3>
                <p className="text-white/90">{action.description}</p>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Frequently Asked Questions</h2>
          
          {filteredFAQs.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">No results found for "{searchTerm}". Please try a different search term.</p>
            </div>
          ) : (
            <div className="space-y-8">
              {filteredFAQs.map((category, categoryIndex) => (
                <div key={categoryIndex} className="bg-white rounded-xl shadow-lg p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6 text-teal-600">{category.title}</h3>
                  <div className="space-y-4">
                    {category.faqs.map((faq, faqIndex) => {
                      const globalIndex = categoryIndex * 100 + faqIndex;
                      return (
                        <div key={faqIndex} className="border border-gray-200 rounded-lg">
                          <button
                            onClick={() => toggleFAQ(globalIndex)}
                            className="w-full text-left p-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
                          >
                            <span className="font-semibold text-gray-900 pr-4">{faq.question}</span>
                            {openFAQ === globalIndex ? (
                              <ChevronDown className="w-5 h-5 text-teal-600 flex-shrink-0" />
                            ) : (
                              <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0" />
                            )}
                          </button>
                          {openFAQ === globalIndex && (
                            <div className="p-4 pt-0 border-t border-gray-200">
                              <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Contact Support Section */}
      <section className="py-12 bg-teal-600 text-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Still Need Help?</h2>
          <p className="text-xl text-teal-100 mb-8">
            Our medical experts are available 24/7 to assist you with any questions or concerns.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:+919643452714"
              className="bg-white text-teal-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center justify-center space-x-2"
            >
              <Phone className="w-5 h-5" />
              <span>Call Support: +919643452714</span>
            </a>
            <a
              href="https://wa.me/919643452714?text=I need help with medical services"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-600 transition-colors inline-flex items-center justify-center space-x-2"
            >
              <MessageCircle className="w-5 h-5" />
              <span>WhatsApp Support</span>
            </a>
          </div>
          
          {/* Support Hours */}
          <div className="mt-8 bg-teal-700 rounded-lg p-6 max-w-md mx-auto">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <Clock className="w-5 h-5" />
              <h3 className="font-semibold">Support Hours</h3>
            </div>
            <p className="text-teal-100">Monday - Friday: 9:00 AM - 6:00 PM</p>
            <p className="text-teal-100">Weekend: 10:00 AM - 4:00 PM</p>
            <p className="text-sm text-teal-200 mt-2">Emergency support available 24/7</p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default HelpCenter;