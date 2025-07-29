import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FiChevronDown, FiChevronUp, FiClock, FiMapPin, FiBriefcase, FiAward, FiLayers } from 'react-icons/fi';
import Button from './ui/Button';
import Modal from './ui/Modal';
import Header from './ui/Header';
import Input from './ui/Input';

const JobDescription = ({ onClose }) => {
  const { state } = useLocation();
  const job = state?.job || {
    hospital: 'Hospital Not Specified',
    logo: '',
    location: 'Location Not Specified',
    role: 'Role Not Specified',
    shift: 'Shift Not Specified',
    pay: 'Pay Not Specified',
    description: 'No description provided',
    requirements: ['No requirements specified'],
    status: 'active'
  };

  const [activeSection, setActiveSection] = useState(null);
  const [isApplying, setIsApplying] = useState(false);
  const [applicationSubmitted, setApplicationSubmitted] = useState(false);
  const navigate = useNavigate();

  const toggleSection = (section) => setActiveSection(activeSection === section ? null : section);
  const handleSubmitApplication = () => setTimeout(() => setApplicationSubmitted(true), 1500);

  const sections = [
    {
      id: 'about',
      title: 'About the Position',
      icon: <FiBriefcase className="mr-2" />,
      content: <p className="text-base leading-relaxed">{job.description}</p>
    },
    {
      id: 'details',
      title: 'Job Details',
      icon: <FiLayers className="mr-2" />,
      content: (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { icon: <FiBriefcase className="mt-1 mr-2" />, label: 'Role', value: job.role },
            { icon: <FiClock className="mt-1 mr-2" />, label: 'Shift', value: job.shift },
            { icon: <FiAward className="mt-1 mr-2" />, label: 'Pay', value: job.pay },
            { icon: <FiMapPin className="mt-1 mr-2" />, label: 'Location', value: job.location },
            { icon: <FiAward className="mt-1 mr-2" />, label: 'Status', value: job.status }
          ].map((item, i) => (
            <div key={i} className="flex items-start">
              {item.icon}
              <div>
                <h3 className="font-medium">{item.label}</h3>
                <p className="capitalize">{item.value}</p>
              </div>
            </div>
          ))}
        </div>
      )
    },
    {
      id: 'requirements',
      title: 'Requirements',
      icon: <FiAward className="mr-2" />,
      content: (
        <ul className="space-y-2">
          {job.requirements.map((req, idx) => (
            <li key={idx} className="flex items-start">
              <span className="inline-block h-2 w-2 rounded-full bg-accent mt-2 mr-2"></span>
              <span className="text-base">{req}</span>
            </li>
          ))}
        </ul>
      )
    }
  ];

  return (
    <div className="min-h-screen py-0 bg-primary text-primary">
      <Header title={`Job Description - ${job.hospital}`} />

      <div className="max-w-4xl mx-auto p-4">
        <div className="flex justify-between items-center mb-6">
          <Button variant="secondary" onClick={() => navigate(-1)}>
            ← Back to listings
          </Button>
          <span className="px-3 py-1 rounded-full text-sm bg-accent/20 text-accent">
            {job.status === 'new' ? 'New' : 'Active'}
          </span>
        </div>

        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold mb-1">{job.role}</h1>
          <div className="flex items-center text-lg text-accent">
            {job.logo && <img src={job.logo} alt={`${job.hospital} logo`} className="w-8 h-8 mr-2" />}
            {job.hospital}
          </div>
        </div>

        <div className="flex flex-wrap gap-4 mb-8 p-4 rounded-lg bg-card">
          {[
            { icon: <FiMapPin className="mr-2" />, text: job.location },
            { icon: <FiClock className="mr-2" />, text: `Shift: ${job.shift}` },
            { icon: <FiAward className="mr-2" />, text: `Pay: ${job.pay}` }
          ].map((item, i) => (
            <div key={i} className="flex items-center">
              {item.icon}
              <span>{item.text}</span>
            </div>
          ))}
        </div>

        <div className="space-y-4 mb-20">
          {sections.map((section) => (
            <div key={section.id} className="rounded-lg bg-card">
              <Button
                variant="text"
                className="w-full flex justify-between p-4"
                onClick={() => toggleSection(section.id)}
              >
                <div className="flex items-center">
                  {section.icon}
                  <h2 className="text-lg font-semibold">{section.title}</h2>
                </div>
                {activeSection === section.id ? <FiChevronUp /> : <FiChevronDown />}
              </Button>
              <div className={`px-4 pb-4 ${activeSection === section.id ? 'block' : 'hidden'}`}>
                {section.content}
              </div>
            </div>
          ))}
        </div>

        <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-t from-card to-transparent pt-8 pb-4 px-4">
          <div className="max-w-4xl mx-auto flex justify-end">
            <Button onClick={() => setIsApplying(true)}>
              Apply Now
            </Button>
          </div>
        </div>

        <Modal isOpen={isApplying} onClose={() => setIsApplying(false)}>
          {applicationSubmitted ? (
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              <h3 className="text-lg font-medium mb-2">Application Submitted!</h3>
              <p className="mb-4">
                Thank you for applying to the {job.role} position at {job.hospital}.
              </p>
              <Button onClick={() => setApplicationSubmitted(false)}>
                Close
              </Button>
            </div>
          ) : (
            <div className="p-6">
              <h3 className="text-lg font-medium mb-4">Apply for {job.role}</h3>
              <div className="space-y-4">
                {['Full Name', 'Email', 'Phone'].map((label) => (
                  <div key={label}>
                    <label className="block text-sm font-medium mb-1">{label}</label>
                    <Input type={label === 'Email' ? 'email' : 'text'} placeholder={label} />
                  </div>
                ))}
                <div>
                  <label className="block text-sm font-medium mb-1">Cover Letter</label>
                  <textarea className="w-full p-2 rounded border" rows="4" />
                </div>
                <div className="flex justify-end gap-3 pt-2">
                  <Button variant="secondary" onClick={() => setIsApplying(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleSubmitApplication}>
                    Submit Application
                  </Button>
                </div>
              </div>
            </div>
          )}
        </Modal>
      </div>
    </div>
  );
};

export default JobDescription;