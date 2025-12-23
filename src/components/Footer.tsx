// components/Footer.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin, 
  ChevronRight,
  Heart,
  Shield,
  Award
} from 'lucide-react';

const Footer: React.FC = () => {
  const navigate = useNavigate();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  };

  return (
    <footer className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-teal-500/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl"></div>
      
      <div className="relative max-w-7xl mx-auto px-4">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
            {/* Company Info */}
            <div className="lg:col-span-1">
              <div className="mb-6">
                <img
                  src="\home-image\light-logo.png"
                  alt="Medcasts Logo"
                  className="h-16 mb-4"
                />
                {/* <div className="h-1 w-16 bg-gradient-to-r from-teal-500 to-emerald-500 rounded-full"></div> */}
              </div>

              <p className="text-gray-400 leading-relaxed mb-6">
                Connecting patients with world-class medical care across the globe. Your health, our priority.
              </p>

              {/* Trust Badges */}
              <div className="flex flex-wrap gap-3 mb-6">
                <div className="flex items-center space-x-2 bg-gray-800/50 border border-gray-700 rounded-lg px-3 py-2">
                  <Shield size={16} className="text-teal-400" />
                  <span className="text-xs text-gray-300">Verified</span>
                </div>
                <div className="flex items-center space-x-2 bg-gray-800/50 border border-gray-700 rounded-lg px-3 py-2">
                  <Award size={16} className="text-teal-400" />
                  <span className="text-xs text-gray-300">Trusted</span>
                </div>
              </div>

              {/* Social Links */}
              <div className="flex space-x-3">
                <a 
                  href="#" 
                  className="w-10 h-10 bg-gray-800 hover:bg-gradient-to-br hover:from-teal-500 hover:to-emerald-500 rounded-lg flex items-center justify-center transition-all duration-300 group border border-gray-700 hover:border-transparent">
                  <Facebook size={18} className="text-gray-400 group-hover:text-white transition-colors" />
                </a>
                <a 
                  href="#" 
                  className="w-10 h-10 bg-gray-800 hover:bg-gradient-to-br hover:from-teal-500 hover:to-emerald-500 rounded-lg flex items-center justify-center transition-all duration-300 group border border-gray-700 hover:border-transparent">
                  <Twitter size={18} className="text-gray-400 group-hover:text-white transition-colors" />
                </a>
                <a 
                  href="#" 
                  className="w-10 h-10 bg-gray-800 hover:bg-gradient-to-br hover:from-teal-500 hover:to-emerald-500 rounded-lg flex items-center justify-center transition-all duration-300 group border border-gray-700 hover:border-transparent">
                  <Instagram size={18} className="text-gray-400 group-hover:text-white transition-colors" />
                </a>
                <a 
                  href="#" 
                  className="w-10 h-10 bg-gray-800 hover:bg-gradient-to-br hover:from-teal-500 hover:to-emerald-500 rounded-lg flex items-center justify-center transition-all duration-300 group border border-gray-700 hover:border-transparent">
                  <Linkedin size={18} className="text-gray-400 group-hover:text-white transition-colors" />
                </a>
              </div>
            </div>

            {/* For Patients */}
            <div>
              <h4 className="font-bold text-lg mb-6 text-white flex items-center">
                <span className="w-1 h-6 bg-gradient-to-b from-teal-500 to-emerald-500 rounded-full mr-3"></span>
                For Patients
              </h4>
              <ul className="space-y-3">
                <li>
                  <button
                    onClick={() => scrollToSection('hospitals')}
                    className="group flex items-center text-gray-400 hover:text-teal-400 transition-all duration-300">
                    <ChevronRight size={16} className="mr-2 transform group-hover:translate-x-1 transition-transform" />
                    Find Hospitals
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection('doctors')}
                    className="group flex items-center text-gray-400 hover:text-teal-400 transition-all duration-300">
                    <ChevronRight size={16} className="mr-2 transform group-hover:translate-x-1 transition-transform" />
                    Find Doctors
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigate('/')}
                    className="group flex items-center text-gray-400 hover:text-teal-400 transition-all duration-300">
                    <ChevronRight size={16} className="mr-2 transform group-hover:translate-x-1 transition-transform" />
                    Popular Procedures
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigate('/')}
                    className="group flex items-center text-gray-400 hover:text-teal-400 transition-all duration-300">
                    <ChevronRight size={16} className="mr-2 transform group-hover:translate-x-1 transition-transform" />
                    Treatment Costs
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigate('/')}
                    className="group flex items-center text-gray-400 hover:text-teal-400 transition-all duration-300">
                    <ChevronRight size={16} className="mr-2 transform group-hover:translate-x-1 transition-transform" />
                    Patient Stories
                  </button>
                </li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h4 className="font-bold text-lg mb-6 text-white flex items-center">
                <span className="w-1 h-6 bg-gradient-to-b from-teal-500 to-emerald-500 rounded-full mr-3"></span>
                Support
              </h4>
              <ul className="space-y-3">
                <li>
                  <button
                    onClick={() => navigate('/contact')}
                    className="group flex items-center text-gray-400 hover:text-teal-400 transition-all duration-300">
                    <ChevronRight size={16} className="mr-2 transform group-hover:translate-x-1 transition-transform" />
                    Contact Us
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigate('/help-center')}
                    className="group flex items-center text-gray-400 hover:text-teal-400 transition-all duration-300">
                    <ChevronRight size={16} className="mr-2 transform group-hover:translate-x-1 transition-transform" />
                    Help Center
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigate('/safety-guidelines')}
                    className="group flex items-center text-gray-400 hover:text-teal-400 transition-all duration-300">
                    <ChevronRight size={16} className="mr-2 transform group-hover:translate-x-1 transition-transform" />
                    Safety Guidelines
                  </button>
                </li>
                <li>
                  <a
                    href="https://wa.me/919643452714"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center text-gray-400 hover:text-teal-400 transition-all duration-300">
                    <ChevronRight size={16} className="mr-2 transform group-hover:translate-x-1 transition-transform" />
                    Emergency Support
                  </a>
                </li>
                <li>
                  <button
                    onClick={() => navigate('/privacy-policy')}
                    className="group flex items-center text-gray-400 hover:text-teal-400 transition-all duration-300">
                    <ChevronRight size={16} className="mr-2 transform group-hover:translate-x-1 transition-transform" />
                    Privacy Policy
                  </button>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="font-bold text-lg mb-6 text-white flex items-center">
                <span className="w-1 h-6 bg-gradient-to-b from-teal-500 to-emerald-500 rounded-full mr-3"></span>
                Get in Touch
              </h4>
              <ul className="space-y-4">
                <li>
                  <a 
                    href="https://wa.me/919643452714"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-start space-x-3 text-gray-400 hover:text-teal-400 transition-colors">
                    <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-teal-500/10 transition-colors border border-gray-700">
                      <Phone size={18} className="text-teal-400" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">WhatsApp</p>
                      <p className="font-medium">+91 964 345 2714</p>
                    </div>
                  </a>
                </li>
                <li>
                  <a 
                    href="mailto:info@medcasts.com"
                    className="group flex items-start space-x-3 text-gray-400 hover:text-teal-400 transition-colors">
                    <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-teal-500/10 transition-colors border border-gray-700">
                      <Mail size={18} className="text-teal-400" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Email</p>
                      <p className="font-medium">info@medcasts.com</p>
                    </div>
                  </a>
                </li>
                <li>
                  <div className="flex items-start space-x-3 text-gray-400">
                    <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center flex-shrink-0 border border-gray-700">
                      <MapPin size={18} className="text-teal-400" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Location</p>
                      <p className="font-medium">New Delhi, India</p>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800/50 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-gray-400 text-sm text-center md:text-left">
              <span>&copy; 2025 Medcasts. All rights reserved.</span>
            </div>
            
            <div className="flex items-center gap-4 text-sm flex-wrap justify-center">
              <button
                onClick={() => navigate('/privacy-policy')}
                className="text-gray-400 hover:text-teal-400 transition-colors whitespace-nowrap">
                Privacy Policy
              </button>
              <span className="text-gray-700">•</span>
              <button
                onClick={() => navigate('/terms')}
                className="text-gray-400 hover:text-teal-400 transition-colors whitespace-nowrap">
                Terms of Service
              </button>
              <span className="text-gray-700">•</span>
              <button
                onClick={() => navigate('/cookies')}
                className="text-gray-400 hover:text-teal-400 transition-colors whitespace-nowrap">
                Cookies
              </button>
            </div>
          </div>
          
          {/* Made with love message - separate row */}
          <div className="mt-4 text-center">
            <span className="text-gray-400 text-sm inline-flex items-center gap-1">
              Made with <Heart size={14} className="text-red-500 fill-current" /> for better healthcare
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;