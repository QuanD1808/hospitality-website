"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext'; // Import useAuth
import { LogOut } from 'lucide-react'; // Import icon

export type HomePageProps = {}

export function HomePage(props: HomePageProps) {
  const router = useRouter();
  const { isAuthenticated, user, logout } = useAuth(); // Lấy trạng thái auth
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Navigation handlers
  const handleLoginClick = () => {
    router.push('/login');
  };
  
  const handleContactClick = () => {
    router.push('/contact');
  };
  
  const handleServicesClick = () => {
    router.push('/services');
  };
  
  const handleAboutUsClick = () => {
    router.push('/about');
  };
  
  const handleHomeClick = () => {
    router.push('/');
  };

  const handleLogout = () => {
    logout();
    router.push('/'); // Chuyển về trang chủ sau khi logout
  };

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <div className="w-full min-h-screen relative overflow-x-hidden bg-gradient-to-b from-white to-blue-50">
      {/* Floating Navigation */}
      <header className={`fixed w-full top-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-lg py-3' : 'bg-transparent py-6'}`}>
        <div className="container mx-auto px-4 flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center">
            <div className="h-12 w-12 rounded-full bg-gradient-to-r from-teal-400 to-blue-400 flex items-center justify-center shadow-lg">
              <span className="text-white text-xl font-bold">M</span>
            </div>
            <span className={`ml-3 font-semibold text-xl ${scrolled ? 'text-gray-800' : 'text-white'}`}>MediClinic</span>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {['Home', 'About Us', 'Services', 'Contact Us'].map((item, index) => (
              <button 
                key={index}
                onClick={
                  item === 'Home' ? handleHomeClick :
                  item === 'About Us' ? handleAboutUsClick :
                  item === 'Services' ? handleServicesClick :
                  handleContactClick
                }
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 
                  ${scrolled 
                    ? 'text-gray-700 hover:bg-gray-100' 
                    : 'text-white hover:bg-white hover:bg-opacity-20'
                  }
                `}
              >
                {item}
              </button>
            ))}
            {/* Conditional Login/Logout Button */}
            {isAuthenticated && user ? (
              <div className="flex items-center space-x-4 ml-2">
                <span className={`font-medium text-sm ${scrolled ? 'text-gray-800' : 'text-white'}`}>Chào, {user.fullName}!</span>
                <button
                  onClick={handleLogout}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2 ${scrolled ? 'bg-red-100 text-red-700 hover:bg-red-200' : 'bg-white bg-opacity-20 hover:bg-opacity-30'}`}
                >
                  <LogOut className="w-4 h-4" />
                  Đăng xuất
                </button>
              </div>
            ) : (
              <button 
                onClick={handleLoginClick}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ml-2 ${scrolled ? 'bg-gradient-to-r from-teal-500 to-blue-500 text-white hover:from-teal-600 hover:to-blue-600' : 'bg-white bg-opacity-20 hover:bg-opacity-30'}`}
              >
                Đăng nhập
              </button>
            )}
          </nav>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden rounded-full w-10 h-10 flex items-center justify-center"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className={`h-6 w-6 ${scrolled ? 'text-gray-700' : 'text-white'}`} 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
        
        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white shadow-xl absolute top-full left-0 w-full">
            <div className="container mx-auto py-3 px-4 flex flex-col space-y-2">
              {['Home', 'About Us', 'Services', 'Contact Us'].map((item, index) => (
                <button 
                  key={index}
                  onClick={() => {
                    if (item === 'Home') handleHomeClick();
                    else if (item === 'About Us') handleAboutUsClick();
                    else if (item === 'Services') handleServicesClick();
                    else if (item === 'Contact Us') handleContactClick();
                    setMobileMenuOpen(false);
                  }}
                  className="px-4 py-3 rounded-lg text-left text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors"
                >
                  {item}
                </button>
              ))}
              {/* Conditional Mobile Login/Logout */}
              {isAuthenticated && user ? (
                 <div className="border-t border-gray-200 mt-2 pt-2">
                    <div className="px-4 py-2 text-sm text-gray-600">Đã đăng nhập với tư cách <span className="font-semibold">{user.fullName}</span></div>
                    <button 
                      onClick={() => {
                        handleLogout();
                        setMobileMenuOpen(false);
                      }}
                      className="w-full px-4 py-3 rounded-lg text-left text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 transition-colors flex items-center gap-2"
                    >
                      <LogOut className="w-4 h-4" />
                      Đăng xuất
                    </button>
                 </div>
              ) : (
                <button 
                  onClick={() => {
                    handleLoginClick();
                    setMobileMenuOpen(false);
                  }}
                  className="px-4 py-3 rounded-lg text-left text-sm font-medium bg-gradient-to-r from-teal-500 to-blue-500 text-white"
                >
                  Đăng nhập
                </button>
              )}
            </div>
          </div>
        )}
      </header>
      
      {/* Hero Section */}
      <section className="relative h-screen">
        {/* Background with overlay */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-teal-500/70 to-blue-700/70 mix-blend-multiply"></div>
          <img 
            src="/images/image-2.png" 
            alt="Healthcare professionals" 
            className="w-full h-full object-cover"
            onError={(e) => { 
              e.currentTarget.src = '/images/4.png'; 
            }}
          />
        </div>
        
        <div className="relative z-10 container mx-auto px-4 h-full flex flex-col justify-center">
          <motion.div 
            className="max-w-xl text-white"
            initial="hidden"
            animate="visible"
            variants={fadeIn}
          >
            <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-4">
              Advanced Healthcare <span className="text-teal-300">For Everyone</span>
            </h1>
            <p className="text-lg md:text-xl opacity-90 mb-8">
              Providing exceptional medical care with a compassionate approach. Your health is our priority.
            </p>
            <div className="flex flex-wrap gap-4">
              <button 
                onClick={handleServicesClick}
                className="px-8 py-4 bg-white text-blue-700 font-semibold rounded-full hover:bg-blue-50 transition duration-300 shadow-lg"
              >
                Our Services
              </button>
              <button 
                onClick={handleLoginClick}
                className="px-8 py-4 bg-transparent border-2 border-white text-white font-semibold rounded-full hover:bg-white hover:bg-opacity-10 transition duration-300"
              >
                Login to Portal
              </button>
            </div>
          </motion.div>
          
          {/* Quick contact info */}
<motion.div 
  className="absolute bottom-8 right-8 bg-white bg-opacity-20 backdrop-blur-md rounded-xl p-4 flex items-center shadow-lg border border-white border-opacity-20"
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.5, duration: 0.6 }}
>
  <div className="bg-gradient-to-r from-teal-500 to-blue-500 rounded-full p-3 mr-4">
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
    </svg>
  </div>
  <div>
    <p className="text-gray-800 font-medium">Emergency Hotline</p>
    <p className="text-gray-800 text-xl font-bold">(+765) 123 4567</p>
  </div>
</motion.div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block py-1 px-3 rounded-full bg-blue-100 text-blue-700 font-medium text-sm mb-3">WHAT WE DO</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800">Exceptional Care For Your Health</h2>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                ),
                title: "Expert Doctors",
                description: "Our team of certified professionals provides the highest quality of medical care using the latest technology and techniques."
              },
              {
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                ),
                title: "Modern Facilities",
                description: "State-of-the-art equipment and comfortable facilities ensure you receive the best possible treatment in a healing environment."
              },
              {
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
                title: "24/7 Services",
                description: "Our emergency services are available around the clock. Your health concerns don't follow a schedule, and neither do we."
              }
            ].map((feature, index) => (
              <motion.div 
                key={index}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow border border-gray-100"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 * index, duration: 0.6 }}
              >
                <div className="bg-blue-50 rounded-2xl p-4 inline-block mb-5">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Services Section */}
      <section className="py-16 bg-gradient-to-b from-blue-50 to-white">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block py-1 px-3 rounded-full bg-teal-100 text-teal-700 font-medium text-sm mb-3">OUR SERVICES</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800">Healthcare Solutions</h2>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Primary Care",
                description: "Comprehensive health services including preventive care, health maintenance, and chronic disease management.",
                image: "/images/1.png",
                fallbackImage: "window.svg"
              },
              {
                title: "Specialized Treatment",
                description: "Advanced specialized care with state-of-the-art technology and treatment options for complex conditions.",
                image: "/images/2.png",
                fallbackImage: "window.svg"
              },
              {
                title: "Mental Wellness",
                description: "Comprehensive mental health services including therapy, counseling, and support for emotional well-being.",
                image: "/images/3.png",
                fallbackImage: "window.svg"
              }
            ].map((service, index) => (
              <motion.div 
                key={index}
                className="rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 * index, duration: 0.6 }}
              >
                <div className="h-48 overflow-hidden">
                  <img 
                    src={service.image} 
                    alt={service.title} 
                    className="w-full h-full object-cover transition-transform hover:scale-105 duration-500"
                    onError={(e) => {
                      e.currentTarget.src = service.fallbackImage;
                    }}
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-3">{service.title}</h3>
                  <p className="text-gray-600 mb-4">{service.description}</p>
                  <button 
                    onClick={handleServicesClick}
                    className="flex items-center text-teal-600 font-medium hover:text-teal-800 transition duration-300"
                  >
                    Learn More
                    <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <button 
              onClick={handleServicesClick}
              className="px-8 py-4 bg-gradient-to-r from-teal-500 to-blue-500 text-white font-semibold rounded-full hover:from-teal-600 hover:to-blue-600 transition duration-300 shadow-lg"
            >
              View All Services
            </button>
          </div>
        </div>
      </section>
      
      {/* Appointment Section */}
      <section className="py-16 bg-gradient-to-r from-teal-500 to-blue-600 relative">
        <div className="absolute inset-0 opacity-10">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <pattern id="pattern-circles" x="0" y="0" width="50" height="50" patternUnits="userSpaceOnUse" patternContentUnits="userSpaceOnUse">
              <circle id="pattern-circle" cx="10" cy="10" r="1.5" fill="#fff"></circle>
            </pattern>
            <rect id="rect" x="0" y="0" width="100%" height="100%" fill="url(#pattern-circles)"></rect>
          </svg>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-gray-800">Make an Appointment</h2>
              <p className="text-gray-600 mt-2">Schedule a visit with our healthcare professionals</p>
            </div>
            
            <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-2">Full Name</label>
                <input 
                  type="text" 
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  placeholder="John Doe"
                  required
                />
              </div>
              
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-2">Email Address</label>
                <input 
                  type="email" 
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  placeholder="john@example.com"
                  required
                />
              </div>
              
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-2">Select Service</label>
                <select 
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-white"
                  required
                  defaultValue=""
                >
                  <option value="" disabled>Choose a service</option>
                  <option value="general">General Checkup</option>
                  <option value="cardiology">Cardiology</option>
                  <option value="neurology">Neurology</option>
                  <option value="pediatrics">Pediatrics</option>
                  <option value="orthopedics">Orthopedics</option>
                </select>
              </div>
              
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-2">Preferred Date</label>
                <input 
                  type="date" 
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  required
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-gray-700 text-sm font-medium mb-2">Additional Notes</label>
                <textarea 
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent h-24 resize-none"
                  placeholder="Please let us know if you have any specific concerns or requirements"
                ></textarea>
              </div>
              
              <div className="md:col-span-2 text-center">
                <button 
                  type="submit"
                  onClick={(e) => {
                    e.preventDefault();
                    // In a real app, you'd handle form submission here
                    // For now, just navigate to login
                    handleLoginClick();
                  }}
                  className="px-8 py-4 bg-gradient-to-r from-teal-500 to-blue-500 text-white font-semibold rounded-full hover:from-teal-600 hover:to-blue-600 transition duration-300 shadow-lg"
                >
                  Book Appointment
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block py-1 px-3 rounded-full bg-purple-100 text-purple-700 font-medium text-sm mb-3">TESTIMONIALS</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800">What Our Patients Say</h2>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Emily Johnson",
                role: "Patient",
                image: "https://randomuser.me/api/portraits/women/32.jpg",
                quote: "The care I received was exceptional. The doctors were attentive and took time to address all my concerns."
              },
              {
                name: "Michael Chen",
                role: "Patient",
                image: "https://randomuser.me/api/portraits/men/44.jpg",
                quote: "State-of-the-art facilities and compassionate staff. Made my recovery process much more comfortable."
              },
              {
                name: "Sarah Rodriguez",
                role: "Patient",
                image: "https://randomuser.me/api/portraits/women/68.jpg",
                quote: "The doctors here are true experts in their field. I'm grateful for the personalized care plan they created for me."
              }
            ].map((testimonial, index) => (
              <motion.div 
                key={index}
                className="bg-white rounded-2xl p-8 shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 * index, duration: 0.6 }}
              >
                <div className="flex items-center mb-6">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name} 
                    className="w-14 h-14 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h4 className="text-lg font-semibold text-gray-800">{testimonial.name}</h4>
                    <p className="text-gray-600 text-sm">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-600 italic">"{testimonial.quote}"</p>
                <div className="mt-4 flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-teal-500 to-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to prioritize your health?</h2>
            <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
              Schedule an appointment with our healthcare professionals today and take the first step towards better health.
            </p>
            <button 
              onClick={handleLoginClick}
              className="px-8 py-4 bg-white text-blue-600 font-semibold rounded-full hover:bg-blue-50 transition duration-300 shadow-lg"
            >
              Login to Patient Portal
            </button>
          </motion.div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-gray-900 text-white">
        <div className="container mx-auto px-4 pt-16 pb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            <div>
              <div className="flex items-center mb-6">
                <div className="h-10 w-10 rounded-full bg-gradient-to-r from-teal-400 to-blue-400 flex items-center justify-center mr-3">
                  <span className="text-white text-xl font-bold">M</span>
                </div>
                <span className="font-semibold text-xl">MediClinic</span>
              </div>
              <p className="text-gray-400 mb-6">
                Providing exceptional healthcare services with a focus on patient comfort and cutting-edge medical technology.
              </p>
              <div className="flex space-x-4">
                {['facebook', 'twitter', 'instagram', 'linkedin'].map(platform => (
                  <a key={platform} href="#" className="h-10 w-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition duration-300">
                    <span className="sr-only">{platform}</span>
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm3 8h-1.35c-.538 0-.65.221-.65.778v1.222h2l-.209 2h-1.791v7h-3v-7h-2v-2h2v-2.308c0-1.769.931-2.692 3.029-2.692h1.971v3z" />
                    </svg>
                  </a>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
              <ul className="space-y-2">
                {['Home', 'About Us', 'Services', 'Doctors', 'Contact'].map(link => (
                  <li key={link}>
                    <a href="#" className="text-gray-400 hover:text-white transition duration-300">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-lg mb-4">Our Services</h3>
              <ul className="space-y-2">
                {['Primary Care', 'Emergency Care', 'Surgery', 'Pediatrics', 'Mental Health'].map(service => (
                  <li key={service}>
                    <a href="#" className="text-gray-400 hover:text-white transition duration-300">
                      {service}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-lg mb-4">Contact Us</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-teal-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="text-gray-400">123 Medical Drive, Healthville, HV 12345</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-teal-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span className="text-gray-400">(+765) 123 4567</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-teal-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span className="text-gray-400">contact@mediclinic.com</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8">
            <p className="text-gray-400 text-sm text-center">
              © {new Date().getFullYear()} MediClinic. All rights reserved. <a href="#" className="hover:text-white">Privacy Policy</a> | <a href="#" className="hover:text-white">Terms of Service</a>
            </p>
          </div>
        </div>
      </footer>
      
      {/* Back to top button */}
      <button 
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-8 right-8 bg-white p-3 rounded-full shadow-lg hover:bg-gray-100 transition duration-300 z-50"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      </button>
    </div>
  );
}