import React, { useState } from 'react';
import Header from '../ui/Header';
import Sidebar from '../ui/Sidebar';
import Modal from '../ui/Modal';
import { useTheme } from '../../contexts/ThemeContext';

const lowcumJobs = [
	{
		id: 1,
		hospital: 'Kenyatta Hospital',
		logo: '/logos/kenyatta.png',
		location: 'Nairobi',
		role: 'Locum Nurse - Emergency Dept',
		shift: '5:00 PM - 3:00 AM',
		pay: 'KES 6,500'
	},
	{
		id: 2,
		hospital: 'Pwani University',
		logo: '/logos/pwani.png',
		location: 'Kilifi',
		role: 'Administrative Officer II - Locum',
		shift: '8:00 AM - 5:00 PM',
		pay: 'KES 5,200'
	}
];

const NurseDashboard = ({ user = { name: 'Jane Doe' } }) => {
	const { isDark } = useTheme();
	const [activeGroup, setActiveGroup] = useState('all');
	const [modalOpen, setModalOpen] = useState(false);
	const [selectedJob, setSelectedJob] = useState(null);

	const jobGroups = {
		counties: ['Nairobi', 'Mombasa', 'Kisumu', 'Uasin Gishu', 'Kilifi'],
		education: ['Bachelor', 'Diploma', 'Certificate'],
		titles: ['Nurse', 'Clinical Officer', 'Admin']
	};

	const handleViewJob = (job) => {
		setSelectedJob(job);
		setModalOpen(true);
	};

	return (
		<div className={`min-h-screen flex ${isDark ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
			<Sidebar userType="nurse" />
			<div className="flex-1">
				<Header title="Nurse Dashboard" />

				<main className="p-6 space-y-6">
					<h1 className="text-2xl font-bold">Welcome, {user.name}</h1>

					<div className="grid grid-cols-1 md:grid-cols-4 gap-6">
						<section className="md:col-span-3 space-y-4">
							{lowcumJobs.map(job => (
								<div
									key={job.id}
									className="p-4 bg-white dark:bg-gray-800 rounded-xl shadow hover:shadow-md cursor-pointer"
									onClick={() => handleViewJob(job)}
								>
									<div className="flex items-center gap-4">
										<img src={job.logo} alt={job.hospital} className="w-12 h-12 rounded-full object-cover" />
										<div>
											<h3 className="text-lg font-semibold">{job.hospital}</h3>
											<p className="text-sm text-gray-500 dark:text-gray-400">{job.location}</p>
											<p className="text-sm mt-1 font-medium">{job.role}</p>
											<p className="text-sm">Shift: {job.shift}</p>
											<p className="text-sm font-bold text-green-600 dark:text-green-300">{job.pay}</p>
										</div>
									</div>
								</div>
							))}
						</section>

						<aside className="space-y-6">
							<div>
								<h4 className="text-lg font-semibold mb-2">Jobs by County</h4>
								<ul className="text-sm space-y-1">
									{jobGroups.counties.map((c, i) => (
										<li key={i} className="hover:underline cursor-pointer" onClick={() => setActiveGroup(c)}>{c}</li>
									))}
								</ul>
							</div>
							<div>
								<h4 className="text-lg font-semibold mb-2">Jobs by Education</h4>
								<ul className="text-sm space-y-1">
									{jobGroups.education.map((e, i) => (
										<li key={i} className="hover:underline cursor-pointer" onClick={() => setActiveGroup(e)}>{e}</li>
									))}
								</ul>
							</div>
							<div>
								<h4 className="text-lg font-semibold mb-2">Jobs by Title</h4>
								<ul className="text-sm space-y-1">
									{jobGroups.titles.map((t, i) => (
										<li key={i} className="hover:underline cursor-pointer" onClick={() => setActiveGroup(t)}>{t}</li>
									))}
								</ul>
							</div>
						</aside>
					</div>
				</main>
			</div>

			{modalOpen && selectedJob && (
				<Modal onClose={() => setModalOpen(false)}>
					<div className="space-y-4">
						<h2 className="text-xl font-bold">{selectedJob.role}</h2>
						<img src={selectedJob.logo} alt="logo" className="w-14 h-14 rounded" />
						<p><strong>Hospital:</strong> {selectedJob.hospital}</p>
						<p><strong>Location:</strong> {selectedJob.location}</p>
						<p><strong>Shift:</strong> {selectedJob.shift}</p>
						<p><strong>Pay:</strong> {selectedJob.pay}</p>
						<button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Apply Now</button>
					</div>
				</Modal>
			)}
		</div>
	);
};

export default NurseDashboard;