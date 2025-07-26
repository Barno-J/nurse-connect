import React from 'react';
import { FaHospital, FaUserNurse, FaSearchLocation, FaPhoneAlt, FaEnvelope, FaSun, FaMoon } from 'react-icons/fa';
import { MdHealthAndSafety, MdWork } from 'react-icons/md';
import { useTheme } from '../contexts/ThemeContext';
const Homepage = () => {
  const { isDark, setIsDark } = useTheme();

  return (
    <div className="flex flex-col min-h-screen bg-primary text-primary">
      {/* Navigation */}
      <nav className="py-4 px-6 shadow-md bg-secondary">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <FaHospital className="text-2xl icon-primary" />
            <span className="text-xl font-bold">NurseConnect</span>
          </div>
          <div className="flex gap-4">
            <a href="/login" className="px-4 py-2 rounded button-secondary">
              Login
            </a>
            <a href="/register" className="px-4 py-2 rounded button-secondary">
              Create Account
            </a>
            <div>
              <button onClick={() => setIsDark(!isDark)} className="p-2">
                {isDark ? <FaSun className="icon-accent" /> : <FaMoon className="icon-dark" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="text-center py-16 px-6 bg-accent text-secondary">
        <h1 className="text-4xl font-bold mb-4">Connecting Nurses with Hospitals</h1>
        <p className="text-lg mb-6 max-w-2xl mx-auto">Find the perfect nursing opportunity or fill hospital shifts quickly and easily.</p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <a href="/register-nurse" className="px-6 py-3 rounded hover:bg-opacity-90 bg-card text-primary">
            I'm a Nurse
          </a>
          <a href="/register-hospital" className="px-6 py-3 rounded hover:bg-opacity-90 bg-card text-primary">
            I'm a Hospital
          </a>
        </div>
      </header>

      {/* Features Section */}
      <section id="features" className="py-16 px-6">
        <div className="container mx-auto grid md:grid-cols-3 gap-8 text-center">
          <div className="p-4 rounded shadow-theme bg-card">
            <FaUserNurse className="text-4xl mb-4 mx-auto icon-primary" />
            <h3 className="text-xl font-semibold mb-2">Flexible Work</h3>
            <p>Choose shifts that suit your schedule.</p>
          </div>
          <div className="p-4 rounded shadow-theme bg-card">
            <FaSearchLocation className="text-4xl mb-4 mx-auto icon-primary" />
            <h3 className="text-xl font-semibold mb-2">Local Jobs</h3>
            <p>Find nursing roles near you or explore new areas.</p>
          </div>
          <div className="p-4 rounded shadow-theme bg-card">
            <MdHealthAndSafety className="text-4xl mb-4 mx-auto icon-primary" />
            <h3 className="text-xl font-semibold mb-2">Top Facilities</h3>
            <p>Partnering with accredited hospitals only.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto py-8 px-6 bg-accent-dark text-secondary">
        <div className="container mx-auto grid sm:grid-cols-2 md:grid-cols-4 gap-6 text-sm">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <FaHospital className="text-xl" />
              <span className="font-bold text-lg">NurseConnect</span>
            </div>
            <p>Connecting healthcare professionals with trusted institutions.</p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Quick Links</h4>
            <ul className="space-y-1">
              <li><a href="#features" className="hover:underline">Features</a></li>
              <li><a href="/login" className="hover:underline">Login</a></li>
              <li><a href="/register" className="hover:underline">Create Account</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Contact</h4>
            <ul className="space-y-1">
              <li className="flex items-center"><FaPhoneAlt className="mr-2" /> (555) 123-4567</li>
              <li className="flex items-center"><FaEnvelope className="mr-2" /> info@nurseconnect.com</li>
              <li className="flex items-center"><MdWork className="mr-2" /> Healthcare City</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Legal</h4>
            <ul className="space-y-1">
              <li><a href="#" className="hover:underline">Terms</a></li>
              <li><a href="#" className="hover:underline">Privacy</a></li>
            </ul>
          </div>
        </div>
        <div className="text-center mt-6 text-sm">&copy; {new Date().getFullYear()} NurseConnect. All rights reserved.</div>
      </footer>
    </div>
  );
};

export default Homepage;