// components/SafetyGuidelines.tsx
import React from 'react';
import { Shield, CheckCircle, AlertTriangle, Phone, MessageCircle, Heart, Users, FileText, Lock } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const SafetyGuidelines: React.FC = () => {
  const safetyCategories = [
    {
      title: "Patient Safety Standards",
      icon: Heart,
      color: "bg-red-100 text-red-600",
      guidelines: [
        "All partner hospitals are accredited by national and international healthcare organizations",
        "Regular safety audits and quality assessments are conducted at all facilities",
        "Infection control protocols strictly followed as per international standards",
        "Emergency response teams available 24/7 at all partner hospitals",
        "Patient safety incidents are tracked, reported, and addressed immediately",
        "Regular staff training on patient safety protocols and best practices"
      ]
    },
    {
      title: "Medical Information Security",
      icon: Lock,
      color: "bg-blue-100 text-blue-600",
      guidelines: [
        "All patient data is encrypted and stored securely according to healthcare data protection standards",
        "Access to medical records is strictly controlled and monitored",
        "Patient consent is required before sharing any medical information",
        "Regular security audits ensure compliance with data protection regulations",
        "Secure communication channels used for all medical consultations",
        "Patient privacy rights are respected and protected at all times"
      ]
    },
    {
      title: "Treatment Protocol Safety",
      icon: Shield,
      color: "bg-green-100 text-green-600",
      guidelines: [
        "All treatments follow evidence-based medical protocols and guidelines",
        "Multiple medical opinions sought for complex cases when necessary",
        "Pre-treatment assessments conducted to ensure patient suitability",
        "Regular monitoring during treatment to track progress and safety",
        "Post-treatment follow-up care planned and coordinated",
        "Clear communication of treatment risks and benefits to patients"
      ]
    },
    {
      title: "Staff Qualifications & Training",
      icon: Users,
      color: "bg-purple-100 text-purple-600",
      guidelines: [
        "All medical professionals are licensed and board-certified specialists",
        "Continuous medical education requirements maintained by all staff",
        "Regular competency assessments and performance evaluations",
        "Specialized training in latest medical technologies and procedures",
        "Cultural sensitivity training for international patient care",
        "Emergency response and patient safety training updated regularly"
      ]
    }
  ];

  const emergencyProcedures = [
    {
      title: "Medical Emergency Response",
      steps: [
        "Immediate assessment of patient condition",
        "Activation of emergency medical team",
        "Stabilization and life support measures",
        "Transfer to appropriate specialized care unit",
        "Family notification and support services",
        "Documentation and follow-up care planning"
      ]
    },
    {
      title: "Infection Control Measures",
      steps: [
        "Hand hygiene protocols strictly enforced",
        "Personal protective equipment used appropriately",
        "Isolation procedures for infectious conditions",
        "Regular disinfection of all medical equipment",
        "Air quality monitoring and filtration systems",
        "Waste disposal following hazardous material protocols"
      ]
    }
  ];

  const patientRights = [
    "Right to receive safe, quality medical care",
    "Right to informed consent for all treatments",
    "Right to privacy and confidentiality",
    "Right to access medical records",
    "Right to seek second medical opinions",
    "Right to refuse treatment",
    "Right to file complaints and grievances",
    "Right to receive clear information about costs",
    "Right to cultural and religious considerations",
    "Right to have a support person present"
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
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Safety Guidelines</h1>
            <p className="text-xl text-teal-100 max-w-3xl mx-auto">
              Your safety is our top priority. Learn about our comprehensive safety protocols, 
              quality standards, and patient protection measures.
            </p>
          </div>
        </div>
      </section>

      {/* Safety Categories */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Our Safety Standards</h2>
          
          <div className="grid lg:grid-cols-2 gap-8">
            {safetyCategories.map((category, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-8">
                <div className="flex items-center mb-6">
                  <div className={`p-3 rounded-lg ${category.color} mr-4`}>
                    <category.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">{category.title}</h3>
                </div>
                
                <ul className="space-y-4">
                  {category.guidelines.map((guideline, guidelineIndex) => (
                    <li key={guidelineIndex} className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700 leading-relaxed">{guideline}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Emergency Procedures */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Emergency Procedures</h2>
          
          <div className="grid lg:grid-cols-2 gap-8">
            {emergencyProcedures.map((procedure, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-8 border-l-4 border-red-500">
                <div className="flex items-center mb-6">
                  <AlertTriangle className="w-6 h-6 text-red-500 mr-3" />
                  <h3 className="text-2xl font-bold text-gray-900">{procedure.title}</h3>
                </div>
                
                <ol className="space-y-3">
                  {procedure.steps.map((step, stepIndex) => (
                    <li key={stepIndex} className="flex items-start space-x-3">
                      <span className="bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold flex-shrink-0 mt-0.5">
                        {stepIndex + 1}
                      </span>
                      <span className="text-gray-700 leading-relaxed">{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Patient Rights */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Patient Rights & Responsibilities</h2>
          
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="flex items-center mb-6">
              <FileText className="w-6 h-6 text-teal-600 mr-3" />
              <h3 className="text-2xl font-bold text-gray-900">Your Rights as a Patient</h3>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
              {patientRights.map((right, index) => (
                <div key={index} className="flex items-start space-x-3 p-4 rounded-lg hover:bg-gray-50 transition-colors">
                  <CheckCircle className="w-5 h-5 text-teal-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">{right}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Quality Assurance */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Quality Assurance</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-teal-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-teal-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Accreditation</h3>
              <p className="text-gray-600">
                All partner hospitals maintain national and international healthcare accreditations, 
                ensuring the highest standards of medical care.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Expert Team</h3>
              <p className="text-gray-600">
                Our medical professionals are board-certified specialists with extensive experience 
                in their respective fields.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Continuous Monitoring</h3>
              <p className="text-gray-600">
                We continuously monitor patient outcomes, safety metrics, and quality indicators 
                to ensure optimal care delivery.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Emergency Contact */}
      <section className="py-12 bg-teal-600 text-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Safety Concerns or Emergency?</h2>
          <p className="text-xl text-teal-100 mb-8">
            If you have any safety concerns or need immediate medical assistance, contact us immediately.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:+919643452714"
              className="bg-red-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-red-600 transition-colors inline-flex items-center justify-center space-x-2"
            >
              <Phone className="w-5 h-5" />
              <span>Emergency: +919643452714</span>
            </a>
            <a
              href="https://wa.me/919643452714?text=I have a safety concern that needs immediate attention"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-teal-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center justify-center space-x-2"
            >
              <MessageCircle className="w-5 h-5" />
              <span>Report Safety Concern</span>
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default SafetyGuidelines;