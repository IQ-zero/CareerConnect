import React, { useState } from 'react';
import { FileText, Image, Video, BookOpen, Plus, Edit, Trash2, Eye, Search, Filter } from 'lucide-react';

interface Content {
  id: string;
  title: string;
  type: 'article' | 'course' | 'video' | 'document';
  category: 'career-guidance' | 'interview-prep' | 'resume-tips' | 'industry-insights' | 'skill-development';
  status: 'published' | 'draft' | 'archived';
  author: string;
  createdAt: string;
  lastModified: string;
  views: number;
  featured: boolean;
}

const ContentManagement: React.FC = () => {
  const [contents] = useState<Content[]>([
    {
      id: '1',
      title: 'The Ultimate Guide to Writing a Winning Resume',
      type: 'article',
      category: 'resume-tips',
      status: 'published',
      author: 'Dr. Carol Davis',
      createdAt: '2025-06-01',
      lastModified: '2025-06-10',
      views: 1247,
      featured: true
    },
    {
      id: '2',
      title: 'Mastering the Art of Job Interviews',
      type: 'video',
      category: 'interview-prep',
      status: 'published',
      author: 'John Smith',
      createdAt: '2025-05-28',
      lastModified: '2025-06-08',
      views: 892,
      featured: false
    },
    {
      id: '3',
      title: 'Tech Industry Career Paths in 2025',
      type: 'course',
      category: 'industry-insights',
      status: 'draft',
      author: 'Dr. Carol Davis',
      createdAt: '2025-06-10',
      lastModified: '2025-06-12',
      views: 0,
      featured: false
    },
    {
      id: '4',
      title: 'Networking Strategies for Introverts',
      type: 'document',
      category: 'career-guidance',
      status: 'published',
      author: 'Alice Johnson',
      createdAt: '2025-06-05',
      lastModified: '2025-06-05',
      views: 456,
      featured: true
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'article' | 'course' | 'video' | 'document'>('all');
  const [filterStatus, setFilterStatus] = useState<'all' | 'published' | 'draft' | 'archived'>('all');
  const [showCreateForm, setShowCreateForm] = useState(false);

  const filteredContents = contents.filter(content => {
    const matchesSearch = content.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         content.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || content.type === filterType;
    const matchesStatus = filterStatus === 'all' || content.status === filterStatus;
    return matchesSearch && matchesType && matchesStatus;
  });

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'article': return <FileText size={16} className="text-blue-600" />;
      case 'course': return <BookOpen size={16} className="text-green-600" />;
      case 'video': return <Video size={16} className="text-red-600" />;
      case 'document': return <Image size={16} className="text-purple-600" />;
      default: return <FileText size={16} className="text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return 'bg-green-100 text-green-800';
      case 'draft': return 'bg-yellow-100 text-yellow-800';
      case 'archived': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'career-guidance': return 'Career Guidance';
      case 'interview-prep': return 'Interview Prep';
      case 'resume-tips': return 'Resume Tips';
      case 'industry-insights': return 'Industry Insights';
      case 'skill-development': return 'Skill Development';
      default: return category;
    }
  };

  const contentTypes = [
    { value: 'all', label: 'All Types' },
    { value: 'article', label: 'Articles' },
    { value: 'course', label: 'Courses' },
    { value: 'video', label: 'Videos' },
    { value: 'document', label: 'Documents' }
  ];

  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'published', label: 'Published' },
    { value: 'draft', label: 'Draft' },
    { value: 'archived', label: 'Archived' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Content Management</h1>
          <p className="text-gray-600">Manage articles, courses, videos, and documents</p>
        </div>
        <button
          onClick={() => setShowCreateForm(true)}
          className="btn-primary flex items-center"
        >
          <Plus size={20} className="mr-2" />
          Create Content
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Content</p>
              <p className="text-2xl font-bold text-blue-600">{contents.length}</p>
            </div>
            <FileText className="text-blue-600" size={24} />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Published</p>
              <p className="text-2xl font-bold text-green-600">
                {contents.filter(c => c.status === 'published').length}
              </p>
            </div>
            <Eye className="text-green-600" size={24} />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Views</p>
              <p className="text-2xl font-bold text-purple-600">
                {contents.reduce((total, content) => total + content.views, 0).toLocaleString()}
              </p>
            </div>
            <Video className="text-purple-600" size={24} />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Featured</p>
              <p className="text-2xl font-bold text-orange-600">
                {contents.filter(c => c.featured).length}
              </p>
            </div>
            <BookOpen className="text-orange-600" size={24} />
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search content by title or author..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input pl-10 w-full"
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value as any)}
              className="input pl-10 pr-10"
            >
              {contentTypes.map(type => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as any)}
              className="input pl-10 pr-10"
            >
              {statusOptions.map(status => (
                <option key={status.value} value={status.value}>
                  {status.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Content Table */}
      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Content
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Author
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Views
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Modified
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredContents.map((content) => (
                <tr key={content.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-lg bg-gray-100 flex items-center justify-center">
                        {getTypeIcon(content.type)}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900 flex items-center">
                          {content.title}
                          {content.featured && (
                            <span className="ml-2 inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">
                              Featured
                            </span>
                          )}
                        </div>
                        <div className="text-sm text-gray-500">ID: {content.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div className="flex items-center">
                      {getTypeIcon(content.type)}
                      <span className="ml-2 capitalize">{content.type}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {getCategoryLabel(content.category)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(content.status)}`}>
                      {content.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {content.author}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div className="flex items-center">
                      <Eye size={16} className="text-gray-400 mr-2" />
                      {content.views.toLocaleString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {content.lastModified}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button className="text-primary-600 hover:text-primary-900">
                        <Eye size={16} />
                      </button>
                      <button className="text-yellow-600 hover:text-yellow-900">
                        <Edit size={16} />
                      </button>
                      <button className="text-red-600 hover:text-red-900">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredContents.length === 0 && (
          <div className="text-center py-12">
            <FileText className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No content found</h3>
            <p className="mt-1 text-sm text-gray-500">
              Try adjusting your search criteria or create new content.
            </p>
          </div>
        )}
      </div>

      {/* Create Content Form Modal (simplified) */}
      {showCreateForm && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Create New Content</h3>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Content title"
                  className="input w-full"
                />
                <select className="input w-full">
                  <option value="">Select type</option>
                  <option value="article">Article</option>
                  <option value="course">Course</option>
                  <option value="video">Video</option>
                  <option value="document">Document</option>
                </select>
                <textarea
                  placeholder="Content description"
                  className="input w-full h-24 resize-none"
                />
              </div>
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => setShowCreateForm(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={() => setShowCreateForm(false)}
                  className="btn-primary"
                >
                  Create
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContentManagement;
