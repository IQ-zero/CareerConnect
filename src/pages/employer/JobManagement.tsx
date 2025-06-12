import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  Eye, 
  Edit, 
  Trash2, 
  Users, 
  Calendar,
  MapPin,
  DollarSign
} from 'lucide-react';

const JobManagement: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const mockJobs = [
    {
      id: '1',
      title: 'Senior Software Engineer',
      department: 'Engineering',
      location: 'San Francisco, CA',
      type: 'Full-time',
      salary: '$120,000 - $150,000',
      status: 'active',
      applications: 45,
      postedDate: '2024-01-15',
      deadline: '2024-02-15'
    },
    {
      id: '2',
      title: 'Product Manager',
      department: 'Product',
      location: 'Remote',
      type: 'Full-time',
      salary: '$100,000 - $130,000',
      status: 'active',
      applications: 32,
      postedDate: '2024-01-10',
      deadline: '2024-02-10'
    },
    {
      id: '3',
      title: 'Marketing Intern',
      department: 'Marketing',
      location: 'New York, NY',
      type: 'Internship',
      salary: '$20 - $25/hour',
      status: 'draft',
      applications: 0,
      postedDate: '2024-01-20',
      deadline: '2024-03-01'
    }
  ];

  const filteredJobs = mockJobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.department.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || job.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Job Management</h1>
          <p className="text-gray-600">Create and manage your job postings</p>
        </div>
        <button className="btn btn-primary mt-4 md:mt-0">
          <Plus size={16} className="mr-2" />
          Post New Job
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <input
              type="text"
              placeholder="Search jobs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input pl-10 w-full"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          </div>
        </div>
        <div className="w-full md:w-48">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="input w-full"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="draft">Draft</option>
            <option value="closed">Closed</option>
          </select>
        </div>
        <button className="btn btn-outline">
          <Filter size={16} className="mr-2" />
          More Filters
        </button>
      </div>

      {/* Jobs List */}
      <div className="space-y-4">
        {filteredJobs.map(job => (
          <div key={job.id} className="card p-6 hover:shadow-medium transition-shadow">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between">
              <div className="flex-1">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">{job.title}</h3>
                    <p className="text-gray-600">{job.department}</p>
                  </div>
                  <span className={`badge ${
                    job.status === 'active' ? 'badge-success' :
                    job.status === 'draft' ? 'badge-warning' :
                    'badge-error'
                  }`}>
                    {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
                  </span>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <div className="flex items-center text-gray-600">
                    <MapPin size={16} className="mr-2 text-gray-400" />
                    {job.location}
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Calendar size={16} className="mr-2 text-gray-400" />
                    {job.type}
                  </div>
                  <div className="flex items-center text-gray-600">
                    <DollarSign size={16} className="mr-2 text-gray-400" />
                    {job.salary}
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Users size={16} className="mr-2 text-gray-400" />
                    {job.applications} applications
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>Posted: {new Date(job.postedDate).toLocaleDateString()}</span>
                  <span>Deadline: {new Date(job.deadline).toLocaleDateString()}</span>
                </div>
              </div>

              <div className="flex items-center space-x-2 mt-4 lg:mt-0 lg:ml-6">
                <button className="btn btn-outline text-sm py-1.5 px-3">
                  <Eye size={14} className="mr-1" />
                  View
                </button>
                <button className="btn btn-outline text-sm py-1.5 px-3">
                  <Edit size={14} className="mr-1" />
                  Edit
                </button>
                <button className="btn btn-outline text-sm py-1.5 px-3 text-error-600 border-error-200 hover:bg-error-50">
                  <Trash2 size={14} className="mr-1" />
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}

        {filteredJobs.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search size={24} className="text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900">No jobs found</h3>
            <p className="text-gray-600">Try adjusting your search filters</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobManagement;