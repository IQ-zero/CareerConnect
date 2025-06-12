import React, { useState } from 'react';
import { BookOpen, Clock, Star, Users, Play, Award, Filter, Search } from 'lucide-react';

const Courses = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedLevel, setSelectedLevel] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['Programming', 'Data Science', 'Design', 'Business', 'Marketing', 'Career Development'];
  const levels = ['Beginner', 'Intermediate', 'Advanced'];

  const courses = [
    {
      id: '1',
      title: 'Full-Stack Web Development with React and Node.js',
      instructor: 'Dr. Michael Rodriguez',
      duration: '12 weeks',
      level: 'intermediate',
      category: 'Programming',
      rating: 4.8,
      enrolledCount: 1247,
      price: 0,
      isFree: true,
      image: 'https://images.pexels.com/photos/2004161/pexels-photo-2004161.jpeg?auto=compress&cs=tinysrgb&w=600',
      description: 'Learn to build modern web applications from scratch using React, Node.js, and MongoDB.',
      lessons: 45,
      enrolled: false
    },
    {
      id: '2',
      title: 'Data Science Fundamentals with Python',
      instructor: 'Prof. Sarah Johnson',
      duration: '8 weeks',
      level: 'beginner',
      category: 'Data Science',
      rating: 4.9,
      enrolledCount: 892,
      price: 99,
      isFree: false,
      image: 'https://images.pexels.com/photos/590020/pexels-photo-590020.jpeg?auto=compress&cs=tinysrgb&w=600',
      description: 'Master the basics of data analysis, visualization, and machine learning with Python.',
      lessons: 32,
      enrolled: true
    },
    {
      id: '3',
      title: 'UI/UX Design Principles and Prototyping',
      instructor: 'Emily Chen',
      duration: '6 weeks',
      level: 'beginner',
      category: 'Design',
      rating: 4.7,
      enrolledCount: 634,
      price: 0,
      isFree: true,
      image: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=600',
      description: 'Learn design thinking, user research, wireframing, and prototyping with industry tools.',
      lessons: 28,
      enrolled: false
    },
    {
      id: '4',
      title: 'Advanced JavaScript and Modern Frameworks',
      instructor: 'David Kim',
      duration: '10 weeks',
      level: 'advanced',
      category: 'Programming',
      rating: 4.6,
      enrolledCount: 456,
      price: 149,
      isFree: false,
      image: 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=600',
      description: 'Deep dive into ES6+, TypeScript, React, Vue.js, and modern development practices.',
      lessons: 52,
      enrolled: false
    },
    {
      id: '5',
      title: 'Career Development and Interview Skills',
      instructor: 'Lisa Thompson',
      duration: '4 weeks',
      level: 'beginner',
      category: 'Career Development',
      rating: 4.9,
      enrolledCount: 1156,
      price: 0,
      isFree: true,
      image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=600',
      description: 'Master job search strategies, resume writing, and interview techniques.',
      lessons: 16,
      enrolled: true
    },
    {
      id: '6',
      title: 'Digital Marketing and Social Media Strategy',
      instructor: 'Mark Wilson',
      duration: '8 weeks',
      level: 'intermediate',
      category: 'Marketing',
      rating: 4.5,
      enrolledCount: 723,
      price: 79,
      isFree: false,
      image: 'https://images.pexels.com/photos/267350/pexels-photo-267350.jpeg?auto=compress&cs=tinysrgb&w=600',
      description: 'Learn digital marketing fundamentals, SEO, social media marketing, and analytics.',
      lessons: 36,
      enrolled: false
    },
  ];

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.instructor.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || course.category === selectedCategory;
    const matchesLevel = !selectedLevel || course.level === selectedLevel;
    return matchesSearch && matchesCategory && matchesLevel;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Courses</h1>
        <p className="mt-2 text-gray-600">Enhance your skills with our comprehensive course library</p>
      </div>

      {/* Search and Filters */}
      <div className="mb-8 flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <input
              type="text"
              placeholder="Search courses..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input pl-10 w-full"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          </div>
        </div>
        <div className="w-full md:w-48">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="input w-full"
          >
            <option value="">All Categories</option>
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>
        <div className="w-full md:w-48">
          <select
            value={selectedLevel}
            onChange={(e) => setSelectedLevel(e.target.value)}
            className="input w-full"
          >
            <option value="">All Levels</option>
            {levels.map(level => (
              <option key={level} value={level}>{level}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Course Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map(course => (
          <div key={course.id} className="bg-white rounded-xl shadow-soft hover:shadow-medium transition-shadow overflow-hidden">
            <div className="relative">
              <img
                src={course.image}
                alt={course.title}
                className="w-full h-48 object-cover"
              />
              <div className="absolute top-4 left-4">
                {course.isFree ? (
                  <span className="bg-success-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                    Free
                  </span>
                ) : (
                  <span className="bg-primary-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                    ${course.price}
                  </span>
                )}
              </div>
              <div className="absolute top-4 right-4">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  course.level === 'beginner' ? 'bg-success-100 text-success-700' :
                  course.level === 'intermediate' ? 'bg-warning-100 text-warning-700' :
                  'bg-error-100 text-error-700'
                }`}>
                  {course.level.charAt(0).toUpperCase() + course.level.slice(1)}
                </span>
              </div>
              {course.enrolled && (
                <div className="absolute bottom-4 right-4">
                  <span className="bg-primary-500 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center">
                    <Award size={12} className="mr-1" />
                    Enrolled
                  </span>
                </div>
              )}
            </div>

            <div className="p-6">
              <div className="mb-2">
                <span className="text-xs text-primary-600 font-medium">{course.category}</span>
              </div>
              
              <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">{course.title}</h3>
              <p className="text-sm text-gray-600 mb-4 line-clamp-2">{course.description}</p>

              <div className="flex items-center text-sm text-gray-500 mb-4">
                <span className="mr-4 flex items-center">
                  <Clock size={14} className="mr-1" />
                  {course.duration}
                </span>
                <span className="mr-4 flex items-center">
                  <BookOpen size={14} className="mr-1" />
                  {course.lessons} lessons
                </span>
              </div>

              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <Star size={16} className="text-warning-500 mr-1" />
                  <span className="text-sm font-medium">{course.rating}</span>
                  <span className="text-sm text-gray-500 ml-2">
                    ({course.enrolledCount.toLocaleString()})
                  </span>
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <Users size={14} className="mr-1" />
                  {course.enrolledCount.toLocaleString()} enrolled
                </div>
              </div>

              <div className="border-t border-gray-100 pt-4">
                <p className="text-sm text-gray-600 mb-3">Instructor: {course.instructor}</p>
                
                {course.enrolled ? (
                  <button className="w-full btn btn-primary flex items-center justify-center">
                    <Play size={16} className="mr-2" />
                    Continue Learning
                  </button>
                ) : (
                  <button className="w-full btn btn-outline hover:btn-primary">
                    {course.isFree ? 'Enroll for Free' : `Enroll for $${course.price}`}
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredCourses.length === 0 && (
        <div className="text-center py-12">
          <BookOpen size={48} className="mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900">No courses found</h3>
          <p className="text-gray-600">Try adjusting your search filters</p>
        </div>
      )}
    </div>
  );
};

export default Courses;