// components/HeroSection.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Phone, CheckCircle } from 'lucide-react';
import { medicalImages } from '../data/constants';

const HeroSection: React.FC = () => {
  const navigate = useNavigate();

  const handleContactClick = () => {
    navigate('/contact');
  };

  const handleWhatsAppClick = () => {
    window.open('https://wa.me/1234567890', '_blank');
  };

  return (
    <section className="py-8 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-emerald-50/30 to-transparent -z-10"></div>
      
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <div>
            {/* Main Heading */}
            <h1 className="text-5xl font-bold text-gray-900 mb-1 mt-2 leading-tight">
              Find top{' '}
              <span className="relative inline-block group ">
                clinics
                <span className="absolute left-0 bottom-0.5 h-1 bg-teal-500 w-full transition-all duration-300"></span>
              </span>{' '}
              &{' '}
              <span className="relative inline-block group ">
                doctors
                <span className="absolute left-0 bottom-0.5 h-1 bg-teal-500 w-full transition-all duration-300"></span>
              </span>{' '}
              across
              <span className="text-teal-600"> 50+ countries</span>
            </h1>
            
            {/* Subtitle */}
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              Access world-class medical care at affordable prices. Compare treatments, 
              read verified reviews, and book appointments with top-rated specialists.
            </p>

            {/* Key Benefits */}
            <div className="grid grid-cols-2  mb-6 max-w-md" >
              <div className="flex items-start space-x-3 px-2">
                <CheckCircle className="text-emerald-600 flex-shrink-0 mt-1" size={20} />
                <div>
                  <p className="font-semibold text-gray-900">Verified Doctors</p>
                  <p className="text-sm text-gray-600">Board-certified specialists</p>
                </div>
              </div>
              <div className="flex items-start space-x-3 px-2">
                <CheckCircle className="text-emerald-600 flex-shrink-0 mt-1" size={20} />
                <div>
                  <p className="font-semibold text-gray-900">Best Prices</p>
                  <p className="text-sm text-gray-600">Up to 70% savings</p>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 mb-6">
              <button
                onClick={handleContactClick}
                className="flex items-center space-x-2 bg-white border-2 border-teal-600 text-teal-700 px-6 py-3 rounded-xl hover:bg-teal-50 transition-all duration-300 font-semibold shadow-md hover:shadow-lg group">
                <Phone size={20} className="group-hover:rotate-12 transition-transform" />
                <span>Talk to Expert</span>
              </button>
              
              <button
                onClick={handleWhatsAppClick}
                className="flex items-center space-x-2 bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-xl hover:from-green-600 hover:to-green-700 transition-all duration-300 font-semibold shadow-md hover:shadow-lg group">
                <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fillRule="evenodd" clipRule="evenodd" d="M3.50002 12C3.50002 7.30558 7.3056 3.5 12 3.5C16.6944 3.5 20.5 7.30558 20.5 12C20.5 16.6944 16.6944 20.5 12 20.5C10.3278 20.5 8.77127 20.0182 7.45798 19.1861C7.21357 19.0313 6.91408 18.9899 6.63684 19.0726L3.75769 19.9319L4.84173 17.3953C4.96986 17.0955 4.94379 16.7521 4.77187 16.4751C3.9657 15.176 3.50002 13.6439 3.50002 12ZM12 1.5C6.20103 1.5 1.50002 6.20101 1.50002 12C1.50002 13.8381 1.97316 15.5683 2.80465 17.0727L1.08047 21.107C0.928048 21.4637 0.99561 21.8763 1.25382 22.1657C1.51203 22.4552 1.91432 22.5692 2.28599 22.4582L6.78541 21.1155C8.32245 21.9965 10.1037 22.5 12 22.5C17.799 22.5 22.5 17.799 22.5 12C22.5 6.20101 17.799 1.5 12 1.5ZM14.2925 14.1824L12.9783 15.1081C12.3628 14.7575 11.6823 14.2681 10.9997 13.5855C10.2901 12.8759 9.76402 12.1433 9.37612 11.4713L10.2113 10.7624C10.5697 10.4582 10.6678 9.94533 10.447 9.53028L9.38284 7.53028C9.23954 7.26097 8.98116 7.0718 8.68115 7.01654C8.38113 6.96129 8.07231 7.046 7.84247 7.24659L7.52696 7.52195C6.76823 8.18414 6.3195 9.2723 6.69141 10.3741C7.07698 11.5163 7.89983 13.314 9.58552 14.9997C11.3991 16.8133 13.2413 17.5275 14.3186 17.8049C15.1866 18.0283 16.008 17.7288 16.5868 17.2572L17.1783 16.7752C17.4313 16.5691 17.5678 16.2524 17.544 15.9269C17.5201 15.6014 17.3389 15.308 17.0585 15.1409L15.3802 14.1409C15.0412 13.939 14.6152 13.9552 14.2925 14.1824Z" fill="#ffffff"></path> </g></svg>
                <span>WhatsApp Us</span>
              </button>
            </div>
           
          </div>
          
          {/* Right Column - Images */}
          <div className="grid grid-cols-2 gap-4">
            {medicalImages.map((image, i) =>
            <div 
              key={i} 
              className="relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 group"
              style={{
                animationDelay: `${i * 100}ms`,
                animation: 'fadeInUp 0.6s ease-out forwards'
              }}>
                <img
                  src={image}
                  alt={`Medical facility ${i + 1}`}
                  className="w-full h-52 object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent group-hover:from-black/30 transition-all duration-300"></div>
                
                {/* Image overlay badge */}
                {i === 0 && (
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                    <p className="text-xs font-semibold text-emerald-700">Top Rated</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>);
};

export default HeroSection;