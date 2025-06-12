import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Eye, 
  MessageSquare, 
  Calendar,
  Download,
  Star,
  MapPin,
  GraduationCap,
  Briefcase
} from 'lucide-react';

const CandidateManagement: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const mockCandidates = [
    {
      id: '1',
      name: 'Sarah Johnson',
      email: 'sarah.johnson@email.com',
      avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150',
      position: 'Senior Software Engineer',
      location: 'San Francisco, CA',
      education: 'MS Computer Science, Stanford',
      experience: '5 years',
      skills: ['React', 'Node.js', 'Python', 'AWS'],
      status: 'interview',
      appliedDate: '2024-01-15',
      rating: 4.5
    },
    {
      id: '2',
      name: 'Michael Chen',
      email: 'michael.chen@email.com',
      avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150',
      position: 'Product Manager',
      location: 'New York, NY',
      education: 'MBA, Harvard Business School',
      experience: '7 years',
      skills: ['Product Strategy', 'Analytics', 'Leadership', 'Agile'],
      status: 'review',
      appliedDate: '2024-01-12',
      rating: 4.2
    },
    {
      id: '3',
      name: 'Emily Rodriguez',
      email: 'emily.rodriguez@email.com',
      avatar: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=150',
      position: 'Marketing Intern',
      location: 'Los Angeles, CA',
      education: 'BA Marketing, UCLA',
      experience: '1 year',
      skills: ['Digital Marketing', 'Social Media', 'Content Creation', 'Analytics'],
      status: 'applied',
      appliedDate: '2024-01-18',
      rating: 4.0
    }
  ];

  const filteredCandidates = mockCandidates.filter(candidate => {
    const matchesSearch = candidate.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      candidate.position.toLowerCase().includes(searchQuery.toLowerCase()) ||
      candidate.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesStatus = statusFilter === 'all' || candidate.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'applied': return 'badge-primary';
      case 'review': return 'badge-warning';
      case 'interview': return 'badge-accent';
      case 'offer': return 'badge-success';
      case 'rejected': return 'badge-error';
      default: return 'badge-primary';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Candidate Management</h1>
        <p className="text-gray-600">Review and manage job applications</p>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <input
              type="text"
              placeholder="Search candidates..."
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
            <option value="applied">Applied</option>
            <option value="review">Under Review</option>
            <option value="interview">Interview</option>
            <option value="offer">Offer</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
        <button className="btn btn-outline">
          <Filter size={16} className="mr-2" />
          More Filters
        </button>
      </div>

      {/* Candidates List */}
      <div className="space-y-4">
        {filteredCandidates.map(candidate => (
          <div key={candidate.id} className="card p-6 hover:shadow-medium transition-shadow">
            <div className="flex flex-col lg:flex-row lg:items-start gap-6">
              {/* Candidate Info */}
              <div className="flex items-start gap-4 flex-1">
                <img
                  src={candidate.avatar}
                  alt={candidate.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">{candidate.name}</h3>
                      <p className="text-gray-600">{candidate.email}</p>
                    </div>
                    <div className="flex items-center">
                      <Star size={16} className="text-warning-500 mr-1" />
                      <span className="text-sm font-medium">{candidate.rating}</span>
                    </div>
                  </div>

                  <div className="mb-4">
                    <span className={`badge ${getStatusColor(candidate.status)}`}>
                      {candidate.status.charAt(0).toUpperCase() + candidate.status.slice(1)}
                    </span>
                    <span className="ml-2 text-sm text-gray-500">
                      Applied for {candidate.position}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div className="flex items-center text-gray-600">
                      <MapPin size={16} className="mr-2 text-gray-400" />
                      {candidate.location}
                    </div>
                    <div className="flex items-center text-gray-600">
                      <GraduationCap size={16} className="mr-2 text-gray-400" />
                      {candidate.education}
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Briefcase size={16} className="mr-2 text-gray-400" />
                      {candidate.experience}
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-sm text-gray-600 mb-2">Skills:</p>
                    <div className="flex flex-wrap gap-2">
                      {candidate.skills.map(skill => (
                        <span
                          key={skill}
                          className="px-2 py-1 bg-primary-50 text-primary-700 text-xs rounded-full"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <p className="text-sm text-gray-500">
                    Applied on {new Date(candidate.appliedDate).toLocaleDateString()}
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col gap-2 lg:w-48">
                <button className="btn btn-primary text-sm">
                  <Eye size={14} className="mr-2" />
                  View Profile
                </button>
                <button className="btn btn-outline text-sm">
                  <Download size={14} className="mr-2" />
                  Download Resume
                </button>
                <button className="btn btn-outline text-sm">
                  <MessageSquare size={14} className="mr-2" />
                  Send Message
                </button>
                <button className="btn btn-outline text-sm">
                  <Calendar size={14} className="mr-2" />
                  Schedule Interview
                </button>
              </div>
            </div>
          </div>
        ))}

        {filteredCandidates.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search size={24} className="text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900">No candidates found</h3>
            <p className="text-gray-600">Try adjusting your search filters</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CandidateManagement;