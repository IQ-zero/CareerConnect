import React, { useState } from 'react';
import { mockCompanies } from '../data/mockData';
import { Building2, MapPin, Globe, Users, Search, Briefcase } from 'lucide-react';

const Companies = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState<string>('');

  const industries = Array.from(
    new Set(mockCompanies.flatMap(company => company.industry))
  ).sort();

  const filteredCompanies = mockCompanies.filter(company => {
    const matchesSearch = company.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      company.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesIndustry = !selectedIndustry || company.industry.includes(selectedIndustry);
    return matchesSearch && matchesIndustry;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Companies</h1>
        <p className="mt-2 text-gray-600">Discover companies and explore career opportunities</p>
      </div>

      {/* Search and Filter */}
      <div className="mb-8 flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <input
              type="text"
              placeholder="Search companies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input pl-10 w-full"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          </div>
        </div>
        <div className="w-full md:w-64">
          <select
            value={selectedIndustry}
            onChange={(e) => setSelectedIndustry(e.target.value)}
            className="input w-full"
          >
            <option value="">All Industries</option>
            {industries.map(industry => (
              <option key={industry} value={industry}>{industry}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Companies Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCompanies.map(company => (
          <div key={company.id} className="bg-white rounded-xl shadow-soft hover:shadow-medium transition-shadow p-6">
            <div className="flex items-start space-x-4">
              {company.logo ? (
                <img
                  src={company.logo}
                  alt={company.name}
                  className="w-16 h-16 rounded-lg object-cover"
                />
              ) : (
                <div className="w-16 h-16 bg-primary-100 rounded-lg flex items-center justify-center">
                  <Building2 size={32} className="text-primary-600" />
                </div>
              )}
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-900">{company.name}</h3>
                <p className="text-sm text-gray-500 flex items-center mt-1">
                  <MapPin size={14} className="mr-1" /> {company.location}
                </p>
              </div>
            </div>

            <p className="mt-4 text-gray-600 text-sm line-clamp-2">{company.description}</p>

            <div className="mt-4 flex flex-wrap gap-2">
              {company.industry.map(ind => (
                <span
                  key={ind}
                  className="px-2 py-1 bg-primary-50 text-primary-700 text-xs rounded-full"
                >
                  {ind}
                </span>
              ))}
            </div>

            <div className="mt-6 pt-4 border-t border-gray-100">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center text-sm text-gray-500">
                  <Users size={16} className="mr-2" />
                  {company.size || 'Not specified'}
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <Briefcase size={16} className="mr-2" />
                  {company.openPositions} open positions
                </div>
              </div>
            </div>

            <div className="mt-4 flex justify-between items-center">
              <a
                href={company.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-600 hover:text-primary-700 text-sm flex items-center"
              >
                <Globe size={16} className="mr-1" /> Website
              </a>
              <button className="btn btn-primary text-sm py-1.5">
                View Jobs
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Companies;