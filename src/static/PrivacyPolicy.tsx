// components/PrivacyPolicy.tsx
import React from 'react';
import { Shield, Lock, Eye, FileText, Phone, MessageCircle, Calendar, Database } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const PrivacyPolicy: React.FC = () => {
  const privacySections = [
    {
      title: "Information We Collect",
      icon: Database,
      color: "bg-blue-100 text-blue-600",
      content: [
        {
          subtitle: "Personal Information",
          details: [
            "Name, email address, phone number, and contact information",
            "Medical history, symptoms, and health-related information",
            "Insurance information and payment details",
            "Emergency contact information",
            "Demographic information (age, gender, location)"
          ]
        },
        {
          subtitle: "Technical Information",
          details: [
            "IP address, browser type, and device information",
            "Website usage patterns and page views",
            "Cookies and similar tracking technologies",
            "Communication logs and timestamps"
          ]
        }
      ]
    },
    {
      title: "How We Use Your Information",
      icon: FileText,
      color: "bg-green-100 text-green-600",
      content: [
        {
          subtitle: "Medical Services",
          details: [
            "Coordinating medical appointments and treatments",
            "Sharing relevant medical information with healthcare providers",
            "Providing medical consultation and advice",
            "Following up on treatment progress and outcomes"
          ]
        },
        {
          subtitle: "Communication & Support",
          details: [
            "Responding to your inquiries and providing customer support",
            "Sending appointment confirmations and reminders",
            "Providing updates about our services and healthcare information",
            "Emergency communication when necessary"
          ]
        }
      ]
    },
    {
      title: "Information Sharing & Security",
      icon: Lock,
      color: "bg-purple-100 text-purple-600",
      content: [
        {
          subtitle: "Who We Share With",
          details: [
            "Healthcare providers and hospitals involved in your care",
            "Insurance companies for coverage verification and claims",
            "Legal authorities when required by law",
            "Trusted service providers who assist in delivering our services"
          ]
        },
        {
          subtitle: "Security Measures",
          details: [
            "Data encryption during transmission and storage",
            "Access controls and authentication systems",
            "Regular security audits and vulnerability assessments",
            "Staff training on privacy and data protection"
          ]
        }
      ]
    },
    {
      title: "Your Rights & Choices",
      icon: Eye,
      color: "bg-teal-100 text-teal-600",
      content: [
        {
          subtitle: "Data Access & Control",
          details: [
            "Request access to your personal information",
            "Correct or update inaccurate information",
            "Request deletion of your data (subject to legal requirements)",
            "Opt-out of marketing communications"
          ]
        },
        {
          subtitle: "Medical Records",
          details: [
            "Access your medical records and treatment history",
            "Request copies of your medical information",
            "Control who can access your medical data",
            "Withdraw consent for data processing (where applicable)"
          ]
        }
      ]
    }
  ];

  const keyPolicies = [
    {
      title: "Data Retention",
      icon: Calendar,
      description: "We retain your personal and medical information for as long as necessary to provide services, comply with legal obligations, and maintain medical records as required by healthcare regulations."
    },
    {
      title: "Children's Privacy",
      icon: Shield,
      description: "We take special care to protect the privacy of minors. Parental consent is required for children under 18, and we follow additional safeguards for pediatric patient information."
    },
    {
      title: "International Transfers",
      icon: Lock,
      description: "If you are an international patient, your information may be transferred across borders for treatment coordination. We ensure appropriate safeguards are in place for such transfers."
    },
    {
      title: "Cookies & Tracking",
      icon: Eye,
      description: "We use cookies to improve website functionality and user experience. You can control cookie settings through your browser preferences."
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-teal-600 to-teal-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <Shield className="w-16 h-16 text-teal-100" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Privacy Policy</h1>
            <p className="text-xl text-teal-100 max-w-3xl mx-auto">
              We are committed to protecting your privacy and maintaining the confidentiality 
              of your personal and medical information.
            </p>
            <div className="mt-8 bg-teal-700 rounded-lg p-4 max-w-md mx-auto">
              <p className="text-sm text-teal-100">
                Last Updated: January 2025 | Effective Date: January 1, 2025
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Commitment to Your Privacy</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              At Medcasts, we understand that your health information is highly personal and sensitive. 
              This Privacy Policy explains how we collect, use, protect, and share your information when 
              you use our medical services and website.
            </p>
            <p className="text-gray-700 leading-relaxed">
              We comply with applicable healthcare privacy laws, including HIPAA (where applicable), 
              and follow international best practices for medical data protection. Your trust is essential 
              to our mission of providing quality healthcare services.
            </p>
          </div>
        </div>
      </section>

      {/* Privacy Sections */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Privacy Protection Details</h2>
          
          <div className="space-y-8">
            {privacySections.map((section, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-8">
                <div className="flex items-center mb-6">
                  <div className={`p-3 rounded-lg ${section.color} mr-4`}>
                    <section.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">{section.title}</h3>
                </div>
                
                <div className="grid lg:grid-cols-2 gap-8">
                  {section.content.map((item, itemIndex) => (
                    <div key={itemIndex}>
                      <h4 className="text-lg font-semibold text-gray-800 mb-4">{item.subtitle}</h4>
                      <ul className="space-y-2">
                        {item.details.map((detail, detailIndex) => (
                          <li key={detailIndex} className="flex items-start space-x-2">
                            <div className="w-2 h-2 bg-teal-500 rounded-full mt-2 flex-shrink-0"></div>
                            <span className="text-gray-700 leading-relaxed">{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Policies */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Key Privacy Policies</h2>
          
          <div className="grid lg:grid-cols-2 gap-8">
            {keyPolicies.map((policy, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center mb-4">
                  <div className="bg-teal-100 p-3 rounded-lg mr-4">
                    <policy.icon className="w-6 h-6 text-teal-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">{policy.title}</h3>
                </div>
                <p className="text-gray-700 leading-relaxed">{policy.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact for Privacy */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-white rounded-xl shadow-lg p-8 border-2 border-teal-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Exercise Your Privacy Rights</h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">How to Contact Us</h3>
                <p className="text-gray-700 mb-4">
                  If you have questions about this Privacy Policy or want to exercise your privacy rights, 
                  please contact our Privacy Officer:
                </p>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Phone className="w-5 h-5 text-teal-600" />
                    <span className="text-gray-700">+919643452714</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <MessageCircle className="w-5 h-5 text-teal-600" />
                    <span className="text-gray-700">WhatsApp Privacy Inquiries</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <FileText className="w-5 h-5 text-teal-600" />
                    <span className="text-gray-700">privacy@medcasts.com</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Response Timeline</h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-teal-500 rounded-full mt-2"></div>
                    <span>Privacy inquiries: Within 24 hours</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-teal-500 rounded-full mt-2"></div>
                    <span>Data access requests: Within 7 business days</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-teal-500 rounded-full mt-2"></div>
                    <span>Data correction requests: Within 5 business days</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-teal-500 rounded-full mt-2"></div>
                    <span>Urgent privacy concerns: Immediate response</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Policy Updates */}
      <section className="py-12 bg-teal-600 text-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Policy Updates</h2>
          <p className="text-xl text-teal-100 mb-6">
            We may update this Privacy Policy from time to time to reflect changes in our practices or applicable laws.
          </p>
          <div className="bg-teal-700 rounded-lg p-6 max-w-2xl mx-auto">
            <p className="text-teal-100 mb-4">
              We will notify you of significant changes by:
            </p>
            <ul className="text-left space-y-2 text-teal-100">
              <li>• Posting notices on our website</li>
              <li>• Sending email notifications to registered users</li>
              <li>• WhatsApp notifications for important changes</li>
              <li>• Direct communication for material changes affecting your rights</li>
            </ul>
          </div>
          
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:+919643452714"
              className="bg-white text-teal-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center justify-center space-x-2"
            >
              <Phone className="w-5 h-5" />
              <span>Privacy Questions: +919643452714</span>
            </a>
            <a
              href="https://wa.me/919643452714?text=I have a question about the Privacy Policy"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-600 transition-colors inline-flex items-center justify-center space-x-2"
            >
              <MessageCircle className="w-5 h-5" />
              <span>WhatsApp Privacy Team</span>
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default PrivacyPolicy;