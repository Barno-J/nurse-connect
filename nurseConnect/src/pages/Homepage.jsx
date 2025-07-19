import React, { useState, useEffect } from 'react';
import { FaHospital, FaUserNurse, FaCalendarAlt, FaSearchLocation, FaMoon, FaSun, FaHandHoldingMedical, FaPhoneAlt, FaEnvelope } from 'react-icons/fa';
import { MdHealthAndSafety, MdWork } from 'react-icons/md';

const Homepage = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('darkMode') === 'true') {
      setDarkMode(true);
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setDarkMode(true);
    }
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('darkMode', 'true');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('darkMode', 'false');
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'dark bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-800'}`}>
      {/* Navigation */}
      <nav className="py-4 px-6 shadow-md dark:bg-gray-800 dark:shadow-gray-900">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <FaHospital className="text-3xl text-blue-600 dark:text-blue-400" />
            <span className="text-xl font-bold">NurseConnect</span>
          </div>
          <div className="flex items-center space-x-6">
            <a href="#features" className="hover:text-blue-600 dark:hover:text-blue-400">Features</a>
            <a href="#how-it-works" className="hover:text-blue-600 dark:hover:text-blue-400">How It Works</a>
            <a href="#testimonials" className="hover:text-blue-600 dark:hover:text-blue-400">Testimonials</a>
            <button 
              onClick={toggleDarkMode}
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              {darkMode ? <FaSun className="text-yellow-400" /> : <FaMoon className="text-gray-600" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-blue-500 to-blue-700 dark:from-blue-800 dark:to-blue-900 text-white">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Connecting Nurses with Hospitals</h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">Find your perfect locum nursing opportunity or fill staffing gaps quickly with our dedicated platform.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="bg-white text-blue-600 hover:bg-gray-100 px-6 py-3 rounded-lg font-semibold shadow-md transition duration-300">
              I'm a Nurse
            </button>
            <button className="bg-blue-800 hover:bg-blue-900 px-6 py-3 rounded-lg font-semibold shadow-md transition duration-300">
              I'm a Hospital
            </button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-6 dark:bg-gray-800">
        <div className="container mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div className="p-4">
            <div className="text-4xl font-bold text-blue-600 dark:text-blue-400">500+</div>
            <div className="text-gray-600 dark:text-gray-300">Nurses</div>
          </div>
          <div className="p-4">
            <div className="text-4xl font-bold text-blue-600 dark:text-blue-400">120+</div>
            <div className="text-gray-600 dark:text-gray-300">Hospitals</div>
          </div>
          <div className="p-4">
            <div className="text-4xl font-bold text-blue-600 dark:text-blue-400">3,000+</div>
            <div className="text-gray-600 dark:text-gray-300">Shifts Filled</div>
          </div>
          <div className="p-4">
            <div className="text-4xl font-bold text-blue-600 dark:text-blue-400">98%</div>
            <div className="text-gray-600 dark:text-gray-300">Satisfaction</div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-6">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose NurseConnect</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300">
              <FaUserNurse className="text-4xl text-blue-600 dark:text-blue-400 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Flexible Work</h3>
              <p className="text-gray-600 dark:text-gray-300">Choose shifts that fit your schedule and lifestyle.</p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300">
              <FaSearchLocation className="text-4xl text-blue-600 dark:text-blue-400 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Local Opportunities</h3>
              <p className="text-gray-600 dark:text-gray-300">Find work near you or explore new locations.</p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300">
              <MdHealthAndSafety className="text-4xl text-blue-600 dark:text-blue-400 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Quality Facilities</h3>
              <p className="text-gray-600 dark:text-gray-300">Work with accredited healthcare institutions.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 px-6 bg-gray-100 dark:bg-gray-700">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 dark:bg-blue-900 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl font-bold text-blue-600 dark:text-blue-300">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Create Profile</h3>
              <p className="text-gray-600 dark:text-gray-300">Nurses and hospitals register with their credentials.</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 dark:bg-blue-900 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl font-bold text-blue-600 dark:text-blue-300">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Match & Connect</h3>
              <p className="text-gray-600 dark:text-gray-300">Our algorithm matches needs with availability.</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 dark:bg-blue-900 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl font-bold text-blue-600 dark:text-blue-300">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Work & Get Paid</h3>
              <p className="text-gray-600 dark:text-gray-300">Complete shifts and receive timely payments.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20 px-6">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">What Our Users Say</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="bg-blue-100 dark:bg-blue-900 w-12 h-12 rounded-full flex items-center justify-center mr-4">
                  <FaUserNurse className="text-blue-600 dark:text-blue-300" />
                </div>
                <div>
                  <h4 className="font-semibold">Sarah Johnson</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">ICU Nurse</p>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300">"NurseConnect has given me the flexibility to work when I want while still earning competitive rates. The platform is easy to use and the hospitals are top-notch."</p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="bg-blue-100 dark:bg-blue-900 w-12 h-12 rounded-full flex items-center justify-center mr-4">
                  <FaHospital className="text-blue-600 dark:text-blue-300" />
                </div>
                <div>
                  <h4 className="font-semibold">Dr. Michael Chen</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Hospital Administrator</p>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300">"We've been able to fill last-minute staffing gaps quickly with qualified nurses. The verification process gives us confidence in the professionals we're bringing in."</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-6 bg-blue-600 dark:bg-blue-800 text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">Join hundreds of healthcare professionals and institutions finding the perfect match.</p>
          <button className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 rounded-lg font-semibold shadow-md transition duration-300 text-lg">
            Sign Up Now
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 bg-gray-800 text-gray-300">
        <div className="container mx-auto grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <FaHospital className="text-2xl text-blue-400" />
              <span className="text-xl font-bold">NurseConnect</span>
            </div>
            <p className="text-gray-400">Connecting healthcare professionals with opportunities that matter.</p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-blue-400">Home</a></li>
              <li><a href="#features" className="hover:text-blue-400">Features</a></li>
              <li><a href="#how-it-works" className="hover:text-blue-400">How It Works</a></li>
              <li><a href="#testimonials" className="hover:text-blue-400">Testimonials</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Contact</h4>
            <ul className="space-y-2">
              <li className="flex items-center"><FaPhoneAlt className="mr-2" /> (555) 123-4567</li>
              <li className="flex items-center"><FaEnvelope className="mr-2" /> info@nurseconnect.com</li>
              <li className="flex items-center"><MdWork className="mr-2" /> 123 Medical Way, Healthcare City</li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Legal</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-blue-400">Terms of Service</a></li>
              <li><a href="#" className="hover:text-blue-400">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-blue-400">Cookie Policy</a></li>
            </ul>
          </div>
        </div>
        <div className="container mx-auto mt-12 pt-6 border-t border-gray-700 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} NurseConnect. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Homepage;