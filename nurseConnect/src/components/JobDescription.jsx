import React, { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import Button from './ui/Button';
import Modal from './ui/Modal';
import { FiChevronDown, FiChevronUp, FiExternalLink, FiClock, FiMapPin, FiCalendar, FiBriefcase, FiAward, FiLayers } from 'react-icons/fi';

const JobDescription = ({ job, onClose }) => {
  const { isDark } = useTheme();
  const [activeSection, setActiveSection] = useState(null);
  const [isApplying, setIsApplying] = useState(false);
  const [applicationSubmitted, setApplicationSubmitted] = useState(false);

  const fallbackJob = {
    title: 'Accounts Assistant I - Locum',
    company: 'Pwani University',
    datePosted: 'Jul 14, 2025',
    deadline: 'Jul 25, 2025',
    location: 'Kilifi',
    jobType: 'Contract',
    qualification: 'Diploma',
    experience: '4 years',
    field: 'Finance / Accounting / Audit',
    description: `Pwani University began as Kilifi Institute of Agriculture in 1984 and was upgraded to a University College in 2007. It was awarded full university status in 2013. The University is located in Kilifi County, about 60 km north of Mombasa.`,
    requirements: [
      'Diploma in Business Administration or equivalent',
      'CPA I (Section 2)',
      'Knowledge of ERP systems',
      '4 years relevant experience'
    ],
    responsibilities: [
      'Manage student finance data and records',
      'Prepare and maintain asset register',
      'Prepare payments vouchers and process payments',
      'Undertake banking of receipts and reconcile accounts'
    ],
    skills: [
      'Strong analytical and numerical skills',
      'Excellent communication and interpersonal skills',
      'Computer proficiency (ERP systems, MS Office)',
      'Report writing and presentation skills'
    ],
    salary: 'KSh 45,000 - 60,000',
    benefits: [
      'Medical insurance cover',
      'Opportunity for permanent employment',
      'Professional development support'
    ]
  };

  const j = job || fallbackJob;

  const toggleSection = (section) => {
    setActiveSection(activeSection === section ? null : section);
  };

  const handleApply = () => {
    setIsApplying(true);
  };

  const handleSubmitApplication = () => {
    // Simulate API call
    setTimeout(() => {
      setApplicationSubmitted(true);
      setIsApplying(false);
    }, 1500);
  };

  const sections = [
    {
      id: 'about',
      title: 'About the Institution',
      icon: <FiBriefcase className="mr-2" />,
      content: <p className="text-base leading-relaxed">{j.description}</p>
    },
    {
      id: 'details',
      title: 'Job Details',
      icon: <FiLayers className="mr-2" />,
      content: (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-start">
            <FiBriefcase className="mt-1 mr-2 flex-shrink-0" />
            <div>
              <h3 className="font-medium">Job Type</h3>
              <p>{j.jobType}</p>
            </div>
          </div>
          <div className="flex items-start">
            <FiAward className="mt-1 mr-2 flex-shrink-0" />
            <div>
              <h3 className="font-medium">Qualification</h3>
              <p>{j.qualification}</p>
            </div>
          </div>
          <div className="flex items-start">
            <FiClock className="mt-1 mr-2 flex-shrink-0" />
            <div>
              <h3 className="font-medium">Experience</h3>
              <p>{j.experience}</p>
            </div>
          </div>
          <div className="flex items-start">
            <FiMapPin className="mt-1 mr-2 flex-shrink-0" />
            <div>
              <h3 className="font-medium">Field</h3>
              <p>{j.field}</p>
            </div>
          </div>
          {j.salary && (
            <div className="flex items-start">
              <FiAward className="mt-1 mr-2 flex-shrink-0" />
              <div>
                <h3 className="font-medium">Salary Range</h3>
                <p>{j.salary}</p>
              </div>
            </div>
          )}
        </div>
      )
    },
    {
      id: 'requirements',
      title: 'Requirements',
      icon: <FiAward className="mr-2" />,
      content: (
        <ul className="space-y-2">
          {j.requirements.map((req, idx) => (
            <li key={idx} className="flex items-start">
              <span className="inline-block h-2 w-2 rounded-full bg-blue-500 mt-2 mr-2"></span>
              <span className="text-base">{req}</span>
            </li>
          ))}
        </ul>
      )
    },
    {
      id: 'responsibilities',
      title: 'Responsibilities',
      icon: <FiLayers className="mr-2" />,
      content: (
        <ul className="space-y-2">
          {j.responsibilities.map((res, idx) => (
            <li key={idx} className="flex items-start">
              <span className="inline-block h-2 w-2 rounded-full bg-green-500 mt-2 mr-2"></span>
              <span className="text-base">{res}</span>
            </li>
          ))}
        </ul>
      )
    },
    {
      id: 'skills',
      title: 'Skills',
      icon: <FiAward className="mr-2" />,
      content: (
        <div className="flex flex-wrap gap-2">
          {j.skills.map((skill, idx) => (
            <span 
              key={idx}
              className={`px-3 py-1 rounded-full text-sm ${isDark ? 'bg-gray-700' : 'bg-gray-200'}`}
            >
              {skill}
            </span>
          ))}
        </div>
      )
    },
    ...(j.benefits ? [{
      id: 'benefits',
      title: 'Benefits',
      icon: <FiAward className="mr-2" />,
      content: (
        <ul className="space-y-2">
          {j.benefits.map((benefit, idx) => (
            <li key={idx} className="flex items-start">
              <span className="inline-block h-2 w-2 rounded-full bg-purple-500 mt-2 mr-2"></span>
              <span className="text-base">{benefit}</span>
            </li>
          ))}
        </ul>
      )
    }] : [])
  ];

  return (
    <div className={`min-h-screen px-4 py-8 transition-colors duration-200 ${isDark ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'}`}>
      <div className="max-w-4xl mx-auto">
        {/* Header with back button */}
        <div className="flex justify-between items-center mb-6">
          <button 
            onClick={onClose}
            className={`flex items-center px-4 py-2 rounded-lg ${isDark ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-100'} shadow-sm transition-colors`}
          >
            ← Back to listings
          </button>
          <span className={`px-3 py-1 rounded-full text-sm ${isDark ? 'bg-blue-900 text-blue-200' : 'bg-blue-100 text-blue-800'}`}>
            {j.jobType}
          </span>
        </div>

        {/* Job title and company */}
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold mb-1">{j.title}</h1>
          <p className="text-lg text-blue-500">{j.company}</p>
        </div>

        {/* Meta information */}
        <div className={`flex flex-wrap gap-4 mb-8 p-4 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-white'} shadow-sm`}>
          <div className="flex items-center">
            <FiMapPin className="mr-2 text-blue-500" />
            <span>{j.location}</span>
          </div>
          <div className="flex items-center">
            <FiCalendar className="mr-2 text-blue-500" />
            <span>Posted: {j.datePosted}</span>
          </div>
          <div className="flex items-center">
            <FiClock className="mr-2 text-blue-500" />
            <span>Deadline: {j.deadline}</span>
          </div>
        </div>

        {/* Interactive sections */}
        <div className="space-y-4">
          {sections.map((section) => (
            <div 
              key={section.id}
              className={`rounded-lg overflow-hidden transition-all duration-200 ${isDark ? 'bg-gray-800' : 'bg-white'} shadow-sm`}
            >
              <button
                onClick={() => toggleSection(section.id)}
                className={`w-full flex justify-between items-center p-4 text-left ${isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-50'} transition-colors`}
              >
                <div className="flex items-center">
                  {section.icon}
                  <h2 className="text-lg font-semibold">{section.title}</h2>
                </div>
                {activeSection === section.id ? <FiChevronUp /> : <FiChevronDown />}
              </button>
              <div className={`px-4 pb-4 ${activeSection === section.id ? 'block' : 'hidden'}`}>
                {section.content}
              </div>
            </div>
          ))}
        </div>

        {/* Fixed apply button */}
        <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-t from-white to-transparent dark:from-gray-900 dark:to-transparent pt-8 pb-4 px-4">
          <div className="max-w-4xl mx-auto flex justify-end">
            <Button
              onClick={handleApply}
              className="px-8 py-3 text-base font-medium rounded-lg shadow-lg hover:shadow-xl transition-all"
            >
              Apply Now
            </Button>
          </div>
        </div>

        {/* Application Modal */}
        <Modal isOpen={isApplying} onClose={() => setIsApplying(false)}>
          <div className={`p-6 ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
            {applicationSubmitted ? (
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <h3 className="text-lg font-medium mb-2">Application Submitted!</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Thank you for applying to the {j.title} position at {j.company}.
                </p>
                <Button onClick={() => setApplicationSubmitted(false)} className="w-full">
                  Close
                </Button>
              </div>
            ) : (
              <>
                <h3 className="text-lg font-medium mb-4">Apply for {j.title}</h3>
                <form className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Full Name</label>
                    <input 
                      type="text" 
                      className={`w-full px-3 py-2 rounded border ${isDark ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`}
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Email</label>
                    <input 
                      type="email" 
                      className={`w-full px-3 py-2 rounded border ${isDark ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`}
                      placeholder="your.email@example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Phone</label>
                    <input 
                      type="tel" 
                      className={`w-full px-3 py-2 rounded border ${isDark ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`}
                      placeholder="+254 700 000000"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Cover Letter</label>
                    <textarea 
                      rows="4"
                      className={`w-full px-3 py-2 rounded border ${isDark ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`}
                      placeholder="Tell us why you're a good fit for this position..."
                    ></textarea>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Resume/CV</label>
                    <div className={`border-2 border-dashed rounded-lg p-4 text-center ${isDark ? 'border-gray-600' : 'border-gray-300'}`}>
                      <p className="text-sm">Drag and drop your file here, or click to browse</p>
                      <input type="file" className="hidden" id="resume-upload" />
                      <label htmlFor="resume-upload" className="inline-block mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 cursor-pointer">
                        Select File
                      </label>
                    </div>
                  </div>
                  <div className="flex justify-end space-x-3 pt-2">
                    <Button variant="secondary" onClick={() => setIsApplying(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleSubmitApplication}>
                      Submit Application
                    </Button>
                  </div>
                </form>
              </>
            )}
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default JobDescription;