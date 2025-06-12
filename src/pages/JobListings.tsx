import React, { useState } from 'react';
import { mockJobs } from '../data/mockData';
import { Search, MapPin, Building2, Filter, Briefcase, DollarSign, Calendar, BookmarkPlus, ExternalLink } from 'lucide-react';
import { format } from 'date-fns';

const JobListings = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string>('');
  const [selectedCompany, setSelectedCompany] = useState<string>('');

  const jobTypes = Array.from(new Set(mockJobs.map(job => job.type))).sort();
  const companies = Array.from(new Set(mockJobs.map(job => job.company.name))).sort();

  const filteredJobs = mockJobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.company.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = !selectedType || job.type === selectedType;
    const matchesCompany = !selectedCompany || job.company.name === selectedCompany;
    return matchesSearch && matchesType && matchesCompany;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Job Listings</h1>
        <p className="mt-2 text-gray-600">Find and apply for jobs that match your skills and interests</p>
      </div>

      {/* Search and Filters */}
      <div className="mb-8 flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <input
              type="text"
              placeholder="Search jobs by title, company, or keywords..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input pl-10 w-full"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          </div>
        </div>
        <div className="w-full md:w-48">
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="input w-full"
          >
            <option value="">All Job Types</option>
            {jobTypes.map(type => (
              <option key={type} value={type}>
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </option>
            ))}
          </select>
        </div>
        <div className="w-full md:w-64">
          <select
            value={selectedCompany}
            onChange={(e) => setSelectedCompany(e.target.value)}
            className="input w-full"
          >
            <option value="">All Companies</option>
            {companies.map(company => (
              <option key={company} value={company}>{company}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Job Listings */}
      <div className="space-y-6">
        {filteredJobs.map(job => (
          <div key={job.id} className="bg-white rounded-xl shadow-soft hover:shadow-medium transition-shadow p-6">
            <div className="flex items-start gap-4">
              {job.company.logo ? (
                <img
                  src={job.company.logo}
                  alt={job.company.name}
                  className="w-16 h-16 rounded-lg object-cover"
                />
              ) : (
                <div className="w-16 h-16 bg-primary-100 rounded-lg flex items-center justify-center">
                  <Building2 size={32} className="text-primary-600" />
                </div>
              )}
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">{job.title}</h2>
                    <p className="text-gray-600">{job.company.name}</p>
                  </div>
                  <button className="text-gray-400 hover:text-primary-600">
                    <BookmarkPlus size={20} />
                  </button>
                </div>

                <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="flex items-center text-gray-600">
                    <MapPin size={16} className="mr-2 text-gray-400" />
                    {job.location}
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Briefcase size={16} className="mr-2 text-gray-400" />
                    {job.type}
                  </div>
                  {job.salary && (
                    <div className="flex items-center text-gray-600">
                      <DollarSign size={16} className="mr-2 text-gray-400" />
                      {job.salary}
                    </div>
                  )}
                  <div className="flex items-center text-gray-600">
                    <Calendar size={16} className="mr-2 text-gray-400" />
                    Posted {format(new Date(job.postedDate), 'MMM d, yyyy')}
                  </div>
                </div>

                <p className="mt-4 text-gray-600 line-clamp-2">{job.description}</p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {job.tags.map(tag => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-primary-50 text-primary-700 text-xs rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="mt-6 flex flex-wrap items-center gap-4">
                  <button className="btn btn-primary">
                    Apply Now
                  </button>
                  <button className="btn btn-outline">
                    View Details
                  </button>
                  {job.company.website && (
                    <a
                      href={job.company.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary-600 hover:text-primary-700 text-sm flex items-center"
                    >
                      Company Website <ExternalLink size={14} className="ml-1" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}

        {filteredJobs.length === 0 && (
          <div className="text-center py-12">
            <Briefcase size={48} className="mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900">No jobs found</h3>
            <p className="text-gray-600">Try adjusting your search filters</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobListings;