// components/MedicalHeroSection.tsx
import React from 'react';
import { ArrowRight, CheckCircle } from 'lucide-react';

const MedicalHeroSection: React.FC = () => {
  return (
      <section className="hidden lg:block pb-12">
          <div className="max-w-7xl mx-auto px-4">
              <div className="grid grid-cols-4 gap-6 items-stretch">
                  {/* Main Doctor/Hospital Image with Text Overlay */}
                  <div className="col-span-2 relative rounded-3xl overflow-hidden h-[500px] group">
                      <div
                          className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-700 group-hover:scale-105"
                          style={{
                              backgroundImage:
                                  'url("/home-image/artemis-hospital.jpg")',
                          }}></div>
                      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent"></div>

                      {/* Text Overlay on Hospital Image */}
                      <div className="relative h-full flex flex-col justify-center px-8 text-white">
                          <h1 className="text-4xl font-bold leading-tight mb-4 transform transition-transform duration-500 group-hover:translate-x-2">
                              Connect with leading
                              <br />
                              specialists worldwide
                          </h1>

                          <p className="text-lg mb-6 opacity-90 transform transition-all duration-500 group-hover:translate-x-2">
                              Choose from thousands of trusted doctors at
                              affordable rates. Book your online consultation
                              today.
                          </p>

                          <div className="flex items-center transform transition-all duration-500 group-hover:translate-x-2">
                              <div className="bg-yellow-400 text-gray-900 px-4 py-2 rounded-full flex items-center space-x-2 font-semibold hover:bg-yellow-300 transition-colors">
                                  <CheckCircle size={18} />
                                  <span>Verified</span>
                              </div>
                          </div>
                      </div>
                  </div>

                  {/* Right Side Cards Column */}
                  <div className="col-span-2 space-y-6 h-[500px] flex flex-col">
                      {/* Before & After Pictures Card */}
                      <div className="relative rounded-3xl overflow-hidden flex-1 cursor-pointer group border-2 border-transparent hover:border-teal-400 transition-all duration-300">
                          <div
                              className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-700 group-hover:scale-110"
                              style={{
                                  backgroundImage:
                                      'url("https://images.pexels.com/photos/668300/pexels-photo-668300.jpeg?auto=compress&cs=tinysrgb&w=600")',
                              }}></div>
                          <div className="absolute inset-0 bg-gradient-to-br from-teal-50/95 via-white/90 to-emerald-50/95 backdrop-blur-sm group-hover:from-teal-100/95 group-hover:via-white/95 group-hover:to-emerald-100/95 transition-all duration-500"></div>
                          <div className="relative  h-full flex items-center justify-between px-6">
                              <div className="flex items-center space-x-3">
                                  <div className="w-14 h-14 rounded-full overflow-hidden ring-2 ring-teal-200 group-hover:ring-4 group-hover:ring-teal-400 transition-all duration-300 transform group-hover:scale-110">
                                      <img
                                          src="https://images.pexels.com/photos/3845810/pexels-photo-3845810.jpeg?auto=compress&cs=tinysrgb&w=150"
                                          alt="Emergency Care"
                                          className="w-full h-full object-cover"
                                      />
                                  </div>
                                  <h3 className="font-bold text-gray-900 text-xl group-hover:text-teal-700 transition-colors duration-300">
                                      Before & After pictures
                                  </h3>
                              </div>
                              <div className="bg-teal-100 group-hover:bg-teal-500 p-2 rounded-full transition-all duration-300 transform group-hover:scale-110">
                                  <ArrowRight
                                      size={24}
                                      className="text-teal-700 group-hover:text-white group-hover:translate-x-1 transition-all duration-300"
                                  />
                              </div>
                          </div>
                      </div>

                      {/* Patient Stories Card */}
                      <div className="relative rounded-3xl overflow-hidden flex-1 cursor-pointer group border-2 border-transparent hover:border-emerald-400 transition-all duration-300">
                          <div
                              className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-700 group-hover:scale-110"
                              style={{
                                  backgroundImage:
                                      'url("https://images.pexels.com/photos/4021775/pexels-photo-4021775.jpeg?auto=compress&cs=tinysrgb&w=600")',
                              }}></div>
                          <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/95 via-white/90 to-teal-50/95 backdrop-blur-sm group-hover:from-emerald-100/95 group-hover:via-white/95 group-hover:to-teal-100/95 transition-all duration-500"></div>
                          <div className="relative h-full flex items-center justify-between px-6">
                              <div className="flex items-center space-x-4">
                                  <div className="flex -space-x-2 transform group-hover:scale-105 transition-transform duration-300">
                                      {[
                                          "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100",
                                          "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100",
                                          "https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=100",
                                          "https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=100",
                                          "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=100",
                                      ].map((src, index) => (
                                          <div
                                              key={index}
                                              className="w-10 h-10 rounded-full border-3 border-white overflow-hidden ring-2 ring-emerald-200 group-hover:ring-emerald-400 transition-all duration-300"
                                              style={{
                                                  transitionDelay: `${index * 50}ms`
                                              }}>
                                              <img
                                                  src={src}
                                                  alt={`Patient ${index + 1}`}
                                                  className="w-full h-full object-cover"
                                              />
                                          </div>
                                      ))}
                                  </div>
                                  <h3 className="font-bold text-gray-900 text-xl group-hover:text-emerald-700 transition-colors duration-300">
                                      Medcasts patient stories
                                  </h3>
                              </div>
                              <div className="bg-emerald-100 group-hover:bg-emerald-500 p-2 rounded-full transition-all duration-300 transform group-hover:scale-110">
                                  <ArrowRight
                                      size={24}
                                      className="text-emerald-700 group-hover:text-white group-hover:translate-x-1 transition-all duration-300"
                                  />
                              </div>
                          </div>
                      </div>

                      {/* Medical Blog Card */}
                      <div className="relative rounded-3xl overflow-hidden flex-1 cursor-pointer group border-2 border-transparent hover:border-blue-400 transition-all duration-300">
                          <div
                              className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-700 group-hover:scale-110"
                              style={{
                                  backgroundImage:
                                      'url("https://images.pexels.com/photos/236380/pexels-photo-236380.jpeg?auto=compress&cs=tinysrgb&w=600")',
                              }}></div>
                          <div className="absolute inset-0 bg-gradient-to-br from-blue-50/95 via-white/90 to-indigo-50/95 backdrop-blur-sm group-hover:from-blue-100/95 group-hover:via-white/95 group-hover:to-indigo-100/95 transition-all duration-500"></div>
                          <div className="relative h-full flex items-center justify-between px-6">
                              <div className="flex items-center space-x-3">
                                  <div className="w-14 h-14 rounded-xl overflow-hidden ring-2 ring-blue-200 group-hover:ring-4 group-hover:ring-blue-400 transition-all duration-300 transform group-hover:scale-110 group-hover:rotate-3">
                                      <img
                                          src="https://images.pexels.com/photos/40568/medical-appointment-doctor-healthcare-40568.jpeg?auto=compress&cs=tinysrgb&w=150"
                                          alt="Medical Blog"
                                          className="w-full h-full object-cover"
                                      />
                                  </div>
                                  <h3 className="font-bold text-gray-900 text-xl group-hover:text-blue-700 transition-colors duration-300">
                                      Medical Blog
                                  </h3>
                              </div>
                              <div className="bg-blue-100 group-hover:bg-blue-500 p-2 rounded-full transition-all duration-300 transform group-hover:scale-110">
                                  <ArrowRight
                                      size={24}
                                      className="text-blue-700 group-hover:text-white group-hover:translate-x-1 transition-all duration-300"
                                  />
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </section>
  );

};

export default MedicalHeroSection;