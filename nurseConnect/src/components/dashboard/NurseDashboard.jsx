import React, { useState, useEffect } from 'react';
import Header from '../ui/Header';
import Sidebar from '../ui/Sidebar';
import Modal from '../ui/Modal';
import { FiFilter, FiSearch, FiClock, FiMapPin, FiDollarSign, FiChevronRight } from 'react-icons/fi';

const locumJobs = [
  {
    id: 1,
    hospital: 'Kenyatta Hospital',
    logo: '/logos/kenyatta.png',
    location: 'Nairobi',
    role: 'Locum Nurse - Emergency Dept',
    shift: '5:00 PM - 3:00 AM',
    pay: 'KES 6,500',
    description: 'Emergency department locum position requiring experience in trauma care and emergency response.',
    requirements: ['BSc Nursing', '3+ years ER experience', 'BLS/ACLS certified'],
    status: 'urgent'
  },
  {
    id: 2,
    hospital: 'Pwani University',
    logo: '/logos/pwani.png',
    location: 'Kilifi',
    role: 'Administrative Officer II - Locum',
    shift: '8:00 AM - 5:00 PM',
    pay: 'KES 5,200',
    description: 'Temporary administrative position handling patient records and department coordination.',
    requirements: ['Diploma in Administration', 'Computer proficiency', '2+ years experience'],
    status: 'new'
  },
  {
    id: 3,
    hospital: 'Moi Teaching Hospital',
    logo: '/logos/moi.png',
    location: 'Eldoret',
    role: 'Pediatric Nurse Locum',
    shift: '7:00 AM - 7:00 PM',
    pay: 'KES 7,800',
    description: 'Locum position in pediatric ward, 12-hour shifts including weekends.',
    requirements: ['BSc Nursing', 'Pediatric experience', 'Valid nursing license'],
    status: 'new'
  }
];

const NurseDashboard = ({ user = { name: 'Jane Doe' } }) => {
  const [activeGroup, setActiveGroup] = useState('all');
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [filteredJobs, setFilteredJobs] = useState(locumJobs);

  const jobGroups = {
    counties: ['All', 'Nairobi', 'Mombasa', 'Kisumu', 'Uasin Gishu', 'Kilifi'],
    education: ['All', 'Bachelor', 'Diploma', 'Certificate'],
    titles: ['All', 'Nurse', 'Clinical Officer', 'Admin']
  };

  useEffect(() => {
    let results = locumJobs;
    
    if (activeGroup !== 'all') {
      results = results.filter(job => 
        jobGroups.counties.includes(activeGroup) ||
        jobGroups.education.includes(activeGroup) ||
        jobGroups.titles.some(title => job.role.includes(title))
      );
    }
    
    if (searchQuery) {
      results = results.filter(job => 
        job.hospital.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.role.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    setFilteredJobs(results);
  }, [activeGroup, searchQuery]);

  const handleViewJob = (job) => {
    setSelectedJob(job);
    setModalOpen(true);
  };

  const toggleMobileSidebar = () => {
    setMobileSidebarOpen(!mobileSidebarOpen);
  };

  return (
    <div className="min-h-screen flex bg-primary text-primary">
      {/* Mobile sidebar toggle */}
      <button 
        onClick={toggleMobileSidebar}
        className="md:hidden fixed bottom-6 right-6 z-40 bg-accent text-white p-3 rounded-full shadow-lg"
      >
        <FiFilter className="text-xl" />
      </button>

      {/* Sidebar - now responsive */}
      <div className={`fixed md:static z-30 w-64 h-full transition-all duration-300 ease-in-out 
        ${mobileSidebarOpen ? 'left-0' : '-left-64'} md:left-0`}>
        <Sidebar userType="nurse" onNavigate={() => setMobileSidebarOpen(false)} />
      </div>

      {/* Overlay for mobile sidebar */}
      {mobileSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-20 md:hidden"
          onClick={() => setMobileSidebarOpen(false)}
        />
      )}

      <div className="flex-1 overflow-x-hidden">
        <Header title="Nurse Dashboard" onMenuToggle={toggleMobileSidebar} />

        <main className="p-4 md:p-6 space-y-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <h1 className="text-2xl font-bold">Welcome, {user.name}</h1>
            
            <div className="relative w-full md:w-64">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary" />
              <input
                type="text"
                placeholder="Search jobs..."
                className="w-full pl-10 pr-4 py-2 rounded-lg bg-card border border-card-secondary focus:outline-none focus:ring-2 focus:ring-accent"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <section className="lg:col-span-3 space-y-4">
              {filteredJobs.length > 0 ? (
                filteredJobs.map(job => (
                  <div
                    key={job.id}
                    className="p-4 bg-card rounded-xl shadow hover:shadow-md cursor-pointer transition-all duration-200 border-l-4 border-accent"
                    onClick={() => handleViewJob(job)}
                  >
                    <div className="flex items-start gap-4">
                      <img 
                        src={job.logo} 
                        alt={job.hospital} 
                        className="w-12 h-12 rounded-full object-cover border-2 border-card-secondary" 
                      />
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <h3 className="text-lg font-semibold">{job.hospital}</h3>
                          {job.status === 'urgent' && (
                            <span className="px-2 py-1 text-xs bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 rounded-full">
                              Urgent
                            </span>
                          )}
                          {job.status === 'new' && (
                            <span className="px-2 py-1 text-xs bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-full">
                              New
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-secondary">{job.location}</p>
                        <p className="text-base font-medium mt-1">{job.role}</p>
                        
                        <div className="flex flex-wrap gap-4 mt-2 text-sm">
                          <span className="flex items-center">
                            <FiClock className="mr-1 text-accent" /> {job.shift}
                          </span>
                          <span className="flex items-center">
                            <FiDollarSign className="mr-1 text-accent" /> {job.pay}
                          </span>
                        </div>
                        
                        <div className="mt-3 flex justify-between items-center">
                          <button className="text-sm text-accent hover:underline flex items-center">
                            View details <FiChevronRight className="ml-1" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-8 text-center bg-card rounded-xl">
                  <p className="text-lg">No jobs found matching your criteria</p>
                  <button 
                    onClick={() => {
                      setActiveGroup('all');
                      setSearchQuery('');
                    }}
                    className="mt-4 text-accent hover:underline"
                  >
                    Clear filters
                  </button>
                </div>
              )}
            </section>

            <aside className="space-y-6 bg-card p-4 rounded-xl shadow sticky top-4">
              <div>
                <h4 className="text-lg font-semibold mb-3 flex items-center">
                  <FiFilter className="mr-2 text-accent" /> Filters
                </h4>
                
                <div className="mb-4">
                  <h5 className="font-medium mb-2 text-sm uppercase text-secondary">By County</h5>
                  <ul className="space-y-1">
                    {jobGroups.counties.map((c, i) => (
                      <li 
                        key={i} 
                        className={`px-2 py-1 rounded cursor-pointer transition-colors ${activeGroup === c ? 'bg-accent/20 text-accent font-medium' : 'hover:bg-card-secondary'}`}
                        onClick={() => setActiveGroup(c)}
                      >
                        {c}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="mb-4">
                  <h5 className="font-medium mb-2 text-sm uppercase text-secondary">By Education</h5>
                  <ul className="space-y-1">
                    {jobGroups.education.map((e, i) => (
                      <li 
                        key={i} 
                        className={`px-2 py-1 rounded cursor-pointer transition-colors ${activeGroup === e ? 'bg-accent/20 text-accent font-medium' : 'hover:bg-card-secondary'}`}
                        onClick={() => setActiveGroup(e)}
                      >
                        {e}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h5 className="font-medium mb-2 text-sm uppercase text-secondary">By Title</h5>
                  <ul className="space-y-1">
                    {jobGroups.titles.map((t, i) => (
                      <li 
                        key={i} 
                        className={`px-2 py-1 rounded cursor-pointer transition-colors ${activeGroup === t ? 'bg-accent/20 text-accent font-medium' : 'hover:bg-card-secondary'}`}
                        onClick={() => setActiveGroup(t)}
                      >
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </aside>
          </div>
        </main>
      </div>

      {modalOpen && selectedJob && (
        <Modal onClose={() => setModalOpen(false)}>
          <div className="space-y-4 max-w-md">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-xl font-bold">{selectedJob.role}</h2>
                <h3 className="text-lg text-accent">{selectedJob.hospital}</h3>
              </div>
              <img src={selectedJob.logo} alt="logo" className="w-14 h-14 rounded-full border-2 border-card-secondary" />
            </div>
            
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="flex items-center">
                <FiMapPin className="text-accent mr-2" />
                <span>{selectedJob.location}</span>
              </div>
              <div className="flex items-center">
                <FiClock className="text-accent mr-2" />
                <span>{selectedJob.shift}</span>
              </div>
              <div className="flex items-center">
                <FiDollarSign className="text-accent mr-2" />
                <span className="font-medium">{selectedJob.pay}</span>
              </div>
            </div>
            
            <div className="mt-4">
              <h4 className="font-semibold mb-2">Description</h4>
              <p className="text-sm">{selectedJob.description}</p>
            </div>
            
            <div className="mt-4">
              <h4 className="font-semibold mb-2">Requirements</h4>
              <ul className="space-y-2 text-sm">
                {selectedJob.requirements.map((req, i) => (
                  <li key={i} className="flex items-start">
                    <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent mt-2 mr-2"></span>
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="flex gap-3 mt-6">
              <button 
                className="flex-1 button-secondary py-2 rounded-lg"
                onClick={() => setModalOpen(false)}
              >
                Close
              </button>
              <button 
                className="flex-1 button-primary py-2 rounded-lg"
                onClick={() => {
                  // Handle application
                  setModalOpen(false);
                }}
              >
                Apply Now
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default NurseDashboard;