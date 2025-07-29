import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiFilter, FiSearch, FiClock, FiMapPin, FiDollarSign, FiChevronRight } from 'react-icons/fi';
import Header from '../ui/Header';
import Sidebar from '../ui/Sidebar';
import Footer from '../ui/Footer';
import Input from '../ui/Input';

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

  const jobGroups = {
    counties: ['All', 'Nairobi', 'Mombasa', 'Kisumu', 'Uasin Gishu', 'Kilifi'],
    education: ['All', 'Bachelor', 'Diploma', 'Certificate'],
    titles: ['All', 'Nurse', 'Clinical Officer', 'Admin']
  };

const JobCard = ({ job, onClick }) => (
  <div className="p-4 bg-card rounded-xl shadow hover:shadow-md cursor-pointer transition-all duration-200 border-l-4 border-accent" onClick={onClick}>
    <div className="flex items-start gap-4">
      <img src={job.logo} alt={job.hospital} className="w-12 h-12 rounded-full object-cover border-2 border-card-secondary" />
      <div className="flex-1">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-semibold">{job.hospital}</h3>
          <span className={`px-2 py-1 text-xs rounded-full ${job.status === 'urgent' ? 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200' :
              'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
            }`}>
            {job.status === 'urgent' ? 'Urgent' : 'New'}
          </span>
        </div>
        <p className="text-sm text-secondary">{job.location}</p>
        <p className="text-base font-medium mt-1">{job.role}</p>
        <div className="flex flex-wrap gap-4 mt-2 text-sm">
          <span className="flex items-center"><FiClock className="mr-1 text-accent" /> {job.shift}</span>
          <span className="flex items-center"><FiDollarSign className="mr-1 text-accent" /> {job.pay}</span>
        </div>
        <div className="mt-3 flex justify-between items-center">
          <button className="text-sm text-accent hover:underline flex items-center">
            View details <FiChevronRight className="ml-1" />
          </button>
        </div>
      </div>
    </div>
  </div>
);

const NoJobsFound = ({ onClearFilters }) => (
  <div className="p-8 text-center bg-card rounded-xl">
    <p className="text-lg">No jobs found matching your criteria</p>
    <button onClick={onClearFilters} className="mt-4 text-accent hover:underline">
      Clear filters
    </button>
  </div>
);

const FilterList = ({ items = [], activeGroup, setActiveGroup }) => (
  <ul className="space-y-1">
    {items.map((item, i) => (
      <li
        key={i}
        className={`px-2 py-1 rounded cursor-pointer transition-colors ${activeGroup === item ? 'bg-accent/20 text-accent font-medium' : 'hover:bg-card-secondary'
          }`}
        onClick={() => setActiveGroup(item)}
      >
        {item}
      </li>
    ))}
  </ul>
);

const FilterSection = ({ title, items, activeGroup, setActiveGroup }) => (
  <div className="mb-4">
    <h5 className="font-medium mb-2 text-sm uppercase text-secondary">{title}</h5>
    <FilterList items={items} activeGroup={activeGroup} setActiveGroup={setActiveGroup} />
  </div>
);

const NurseDashboard = ({ user = { name: 'Jane Doe' } }) => {
  const navigate = useNavigate();
  const [activeGroup, setActiveGroup] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const toggleMobileSidebar = () => setMobileSidebarOpen(!mobileSidebarOpen);

  const filteredJobs = locumJobs.filter(job => {
    const matchesSearch = job.hospital.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.role.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesFilter = activeGroup === 'all' ||
      jobGroups.counties.includes(activeGroup) ||
      jobGroups.education.includes(activeGroup) ||
      jobGroups.titles.some(title => job.role.includes(title));

    return matchesSearch && matchesFilter;
  });

  const handleViewJob = (job) => {
    navigate('/jobdescription', { state: { job } });
  };

  return (
    <div className="min-h-screen flex flex-col bg-primary text-primary">
      <Header title="Nurse Dashboard" onMenuToggle={toggleMobileSidebar} />

      {mobileSidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-20 md:hidden" onClick={toggleMobileSidebar} />
      )}

      <div className="flex flex-1 overflow-hidden pt-3">
        <div className={`fixed md:static top-20 z-30 w-64 transition-transform duration-300 ${mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } md:translate-x-0`}>
          <div className="h-[calc(100vh-5rem)] overflow-y-auto bg-card border-r border-card-secondary">
            <Sidebar userType="nurse" onNavigate={toggleMobileSidebar} />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          <main className="p-4 md:p-6 space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <h1 className="text-2xl font-bold">Welcome, {user.name}</h1>
              <div className="relative w-full md:w-96">
                <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary" />
                <Input
                  type="text"
                  placeholder="Search jobs..."
                  className="w-full pl-10 pr-4 py-2 rounded-lg bg-card focus:outline-none focus:ring-2 focus:ring-accent"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              <section className="lg:col-span-3 space-y-4">
                {filteredJobs.length > 0 ? (
                  filteredJobs.map(job => (
                    <JobCard key={job.id} job={job} onClick={() => handleViewJob(job)} />
                  ))
                ) : (
                  <NoJobsFound onClearFilters={() => { setActiveGroup('all'); setSearchQuery(''); }} />
                )}
              </section>

              <aside className="space-y-6 bg-card p-4 rounded-xl shadow sticky top-20">
                <h4 className="text-lg font-semibold mb-3 flex items-center">
                  <FiFilter className="mr-2 text-accent" /> Filters
                </h4>
                <FilterSection
                  title="By County"
                  items={jobGroups.counties}
                  activeGroup={activeGroup}
                  setActiveGroup={setActiveGroup}
                />
                <FilterSection
                  title="By Education"
                  items={jobGroups.education}
                  activeGroup={activeGroup}
                  setActiveGroup={setActiveGroup}
                />
                <FilterSection
                  title="By Title"
                  items={jobGroups.titles}
                  activeGroup={activeGroup}
                  setActiveGroup={setActiveGroup}
                />
              </aside>
            </div>
            <Footer />
          </main>
        </div>
      </div>
    </div>
  );
};

export default NurseDashboard;