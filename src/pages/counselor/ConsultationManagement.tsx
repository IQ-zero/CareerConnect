import React, { useState } from 'react';
import { MessageSquare, User, Clock, Tag, Search, Filter, Plus } from 'lucide-react';

interface Consultation {
  id: string;
  studentName: string;
  studentEmail: string;
  topic: string;
  category: 'career-guidance' | 'academic' | 'personal-development' | 'job-search';
  status: 'active' | 'resolved' | 'pending';
  priority: 'low' | 'medium' | 'high';
  createdAt: string;
  lastUpdated: string;
  messages: number;
}

const ConsultationManagement: React.FC = () => {
  const [consultations] = useState<Consultation[]>([
    {
      id: '1',
      studentName: 'Alice Johnson',
      studentEmail: 'alice.johnson@example.com',
      topic: 'Career transition from CS to Data Science',
      category: 'career-guidance',
      status: 'active',
      priority: 'high',
      createdAt: '2025-06-10',
      lastUpdated: '2025-06-12',
      messages: 5
    },
    {
      id: '2',
      studentName: 'Bob Smith',
      studentEmail: 'bob.smith@example.com',
      topic: 'Resume optimization for business roles',
      category: 'job-search',
      status: 'pending',
      priority: 'medium',
      createdAt: '2025-06-11',
      lastUpdated: '2025-06-11',
      messages: 2
    },
    {
      id: '3',
      studentName: 'Carol Davis',
      studentEmail: 'carol.davis@example.com',
      topic: 'Course selection for final semester',
      category: 'academic',
      status: 'resolved',
      priority: 'low',
      createdAt: '2025-06-08',
      lastUpdated: '2025-06-10',
      messages: 8
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'pending' | 'resolved'>('all');
  const [filterCategory, setFilterCategory] = useState<'all' | 'career-guidance' | 'academic' | 'personal-development' | 'job-search'>('all');

  const filteredConsultations = consultations.filter(consultation => {
    const matchesSearch = consultation.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         consultation.topic.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || consultation.status === filterStatus;
    const matchesCategory = filterCategory === 'all' || consultation.category === filterCategory;
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'resolved': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'career-guidance': return 'Career Guidance';
      case 'academic': return 'Academic';
      case 'personal-development': return 'Personal Development';
      case 'job-search': return 'Job Search';
      default: return category;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Consultation Management</h1>
          <p className="text-gray-600">Manage ongoing student consultations and discussions</p>
        </div>
        <button className="btn-primary flex items-center">
          <Plus size={20} className="mr-2" />
          New Consultation
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active</p>
              <p className="text-2xl font-bold text-green-600">
                {consultations.filter(c => c.status === 'active').length}
              </p>
            </div>
            <MessageSquare className="text-green-600" size={24} />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Pending</p>
              <p className="text-2xl font-bold text-yellow-600">
                {consultations.filter(c => c.status === 'pending').length}
              </p>
            </div>
            <Clock className="text-yellow-600" size={24} />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Resolved</p>
              <p className="text-2xl font-bold text-gray-600">
                {consultations.filter(c => c.status === 'resolved').length}
              </p>
            </div>
            <Tag className="text-gray-600" size={24} />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">High Priority</p>
              <p className="text-2xl font-bold text-red-600">
                {consultations.filter(c => c.priority === 'high').length}
              </p>
            </div>
            <User className="text-red-600" size={24} />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search by student or topic..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input pl-10 w-full"
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as any)}
              className="input pl-10 pr-10"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="pending">Pending</option>
              <option value="resolved">Resolved</option>
            </select>
          </div>
          <div className="relative">
            <Tag className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value as any)}
              className="input pl-10 pr-10"
            >
              <option value="all">All Categories</option>
              <option value="career-guidance">Career Guidance</option>
              <option value="academic">Academic</option>
              <option value="personal-development">Personal Development</option>
              <option value="job-search">Job Search</option>
            </select>
          </div>
        </div>
      </div>

      {/* Consultations List */}
      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Student & Topic
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Priority
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Messages
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Updated
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredConsultations.map((consultation) => (
                <tr key={consultation.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center">
                        <User className="text-primary-600" size={20} />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{consultation.studentName}</div>
                        <div className="text-sm text-gray-500">{consultation.topic}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {getCategoryLabel(consultation.category)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(consultation.status)}`}>
                      {consultation.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPriorityColor(consultation.priority)}`}>
                      {consultation.priority}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div className="flex items-center">
                      <MessageSquare size={16} className="text-gray-400 mr-2" />
                      {consultation.messages}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {consultation.lastUpdated}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button className="text-primary-600 hover:text-primary-900">
                        View Chat
                      </button>
                      <button className="text-green-600 hover:text-green-900">
                        Update
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredConsultations.length === 0 && (
          <div className="text-center py-12">
            <MessageSquare className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No consultations found</h3>
            <p className="mt-1 text-sm text-gray-500">
              Try adjusting your search criteria or start a new consultation.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ConsultationManagement;
