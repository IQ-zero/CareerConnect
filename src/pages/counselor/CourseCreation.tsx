import React, { useState } from 'react';
import { BookOpen, Plus, Users, Clock, Video, FileText, Save } from 'lucide-react';

interface Course {
  id: string;
  title: string;
  description: string;
  category: 'career-development' | 'interview-skills' | 'resume-writing' | 'networking' | 'industry-insights';
  duration: number; // in minutes
  format: 'video' | 'document' | 'interactive';
  status: 'draft' | 'published' | 'archived';
  enrollments: number;
  createdAt: string;
}

const CourseCreation: React.FC = () => {
  const [courses] = useState<Course[]>([
    {
      id: '1',
      title: 'Resume Writing Masterclass',
      description: 'Learn to create compelling resumes that get noticed by employers',
      category: 'resume-writing',
      duration: 45,
      format: 'video',
      status: 'published',
      enrollments: 124,
      createdAt: '2025-06-01'
    },
    {
      id: '2',
      title: 'Interview Preparation Guide',
      description: 'Comprehensive guide to ace your job interviews',
      category: 'interview-skills',
      duration: 60,
      format: 'interactive',
      status: 'published',
      enrollments: 89,
      createdAt: '2025-05-28'
    },
    {
      id: '3',
      title: 'Networking for Career Growth',
      description: 'Build meaningful professional relationships',
      category: 'networking',
      duration: 30,
      format: 'video',
      status: 'draft',
      enrollments: 0,
      createdAt: '2025-06-10'
    }
  ]);

  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newCourse, setNewCourse] = useState({
    title: '',
    description: '',
    category: 'career-development' as Course['category'],
    duration: 30,
    format: 'video' as Course['format']
  });

  const categories = [
    { value: 'career-development', label: 'Career Development' },
    { value: 'interview-skills', label: 'Interview Skills' },
    { value: 'resume-writing', label: 'Resume Writing' },
    { value: 'networking', label: 'Networking' },
    { value: 'industry-insights', label: 'Industry Insights' }
  ];

  const formats = [
    { value: 'video', label: 'Video Course', icon: Video },
    { value: 'document', label: 'Document/PDF', icon: FileText },
    { value: 'interactive', label: 'Interactive', icon: BookOpen }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return 'bg-green-100 text-green-800';
      case 'draft': return 'bg-yellow-100 text-yellow-800';
      case 'archived': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryLabel = (category: string) => {
    return categories.find(c => c.value === category)?.label || category;
  };

  const handleCreateCourse = () => {
    // Logic to create new course
    console.log('Creating course:', newCourse);
    setShowCreateForm(false);
    setNewCourse({
      title: '',
      description: '',
      category: 'career-development',
      duration: 30,
      format: 'video'
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Course Creation</h1>
          <p className="text-gray-600">Create and manage career development courses</p>
        </div>
        <button
          onClick={() => setShowCreateForm(true)}
          className="btn-primary flex items-center"
        >
          <Plus size={20} className="mr-2" />
          Create Course
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Courses</p>
              <p className="text-2xl font-bold text-blue-600">{courses.length}</p>
            </div>
            <BookOpen className="text-blue-600" size={24} />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Published</p>
              <p className="text-2xl font-bold text-green-600">
                {courses.filter(c => c.status === 'published').length}
              </p>
            </div>
            <Video className="text-green-600" size={24} />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Enrollments</p>
              <p className="text-2xl font-bold text-purple-600">
                {courses.reduce((total, course) => total + course.enrollments, 0)}
              </p>
            </div>
            <Users className="text-purple-600" size={24} />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Avg Duration</p>
              <p className="text-2xl font-bold text-orange-600">
                {Math.round(courses.reduce((total, course) => total + course.duration, 0) / courses.length)}m
              </p>
            </div>
            <Clock className="text-orange-600" size={24} />
          </div>
        </div>
      </div>

      {/* Create Course Form */}
      {showCreateForm && (
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Create New Course</h2>
            <button
              onClick={() => setShowCreateForm(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              ×
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Course Title
                </label>
                <input
                  type="text"
                  value={newCourse.title}
                  onChange={(e) => setNewCourse(prev => ({ ...prev, title: e.target.value }))}
                  className="input w-full"
                  placeholder="Enter course title"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  value={newCourse.description}
                  onChange={(e) => setNewCourse(prev => ({ ...prev, description: e.target.value }))}
                  className="input w-full h-24 resize-none"
                  placeholder="Enter course description"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category
                </label>
                <select
                  value={newCourse.category}
                  onChange={(e) => setNewCourse(prev => ({ ...prev, category: e.target.value as Course['category'] }))}
                  className="input w-full"
                >
                  {categories.map(category => (
                    <option key={category.value} value={category.value}>
                      {category.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Duration (minutes)
                </label>
                <input
                  type="number"
                  value={newCourse.duration}
                  onChange={(e) => setNewCourse(prev => ({ ...prev, duration: parseInt(e.target.value) || 0 }))}
                  className="input w-full"
                  min="1"
                  placeholder="30"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Format
                </label>
                <div className="space-y-2">
                  {formats.map(format => {
                    const Icon = format.icon;
                    return (
                      <label key={format.value} className="flex items-center cursor-pointer">
                        <input
                          type="radio"
                          name="format"
                          value={format.value}
                          checked={newCourse.format === format.value}
                          onChange={(e) => setNewCourse(prev => ({ ...prev, format: e.target.value as Course['format'] }))}
                          className="mr-3"
                        />
                        <Icon size={16} className="text-gray-400 mr-2" />
                        <span className="text-sm text-gray-700">{format.label}</span>
                      </label>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-3 mt-6 pt-6 border-t">
            <button
              onClick={() => setShowCreateForm(false)}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={handleCreateCourse}
              className="btn-primary flex items-center"
            >
              <Save size={16} className="mr-2" />
              Create Course
            </button>
          </div>
        </div>
      )}

      {/* Courses List */}
      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Course
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Format
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Duration
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Enrollments
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {courses.map((course) => {
                const FormatIcon = formats.find(f => f.value === course.format)?.icon || BookOpen;
                return (
                  <tr key={course.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="h-10 w-10 rounded-lg bg-primary-100 flex items-center justify-center">
                          <BookOpen className="text-primary-600" size={20} />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{course.title}</div>
                          <div className="text-sm text-gray-500">{course.description}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {getCategoryLabel(course.category)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <div className="flex items-center">
                        <FormatIcon size={16} className="text-gray-400 mr-2" />
                        {formats.find(f => f.value === course.format)?.label}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <div className="flex items-center">
                        <Clock size={16} className="text-gray-400 mr-2" />
                        {course.duration}m
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(course.status)}`}>
                        {course.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <div className="flex items-center">
                        <Users size={16} className="text-gray-400 mr-2" />
                        {course.enrollments}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button className="text-primary-600 hover:text-primary-900">
                          Edit
                        </button>
                        <button className="text-green-600 hover:text-green-900">
                          Preview
                        </button>
                        <button className="text-red-600 hover:text-red-900">
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CourseCreation;
