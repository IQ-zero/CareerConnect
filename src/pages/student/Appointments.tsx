import React, { useState } from 'react';
import { Calendar, Clock, User, Video, MapPin, Plus, Filter, Star } from 'lucide-react';

const Appointments = () => {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past' | 'book'>('upcoming');

  const counselors = [
    {
      id: '1',
      name: 'Dr. Michael Rodriguez',
      title: 'Senior Career Counselor',
      specialization: ['Career Planning', 'Resume Writing', 'Tech Industry'],
      rating: 4.9,
      totalSessions: 1247,
      avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150',
      availability: 'Available today',
      nextSlot: '2:00 PM'
    },
    {
      id: '2',
      name: 'Dr. Sarah Johnson',
      title: 'Career Development Specialist',
      specialization: ['Interview Preparation', 'Career Transition', 'Leadership'],
      rating: 4.8,
      totalSessions: 892,
      avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150',
      availability: 'Available tomorrow',
      nextSlot: '10:00 AM'
    },
    {
      id: '3',
      name: 'Emily Chen',
      title: 'Industry Specialist',
      specialization: ['Design Career', 'Portfolio Review', 'Creative Industries'],
      rating: 4.7,
      totalSessions: 634,
      avatar: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=150',
      availability: 'Available this week',
      nextSlot: 'Friday 3:00 PM'
    },
  ];

  const upcomingAppointments = [
    {
      id: '1',
      counselorName: 'Dr. Michael Rodriguez',
      counselorAvatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150',
      date: '2024-01-18',
      time: '2:00 PM - 3:00 PM',
      type: 'Resume Review',
      location: 'Virtual Meeting',
      status: 'confirmed',
      notes: 'Bring your current resume and job descriptions you\'re interested in.'
    },
    {
      id: '2',
      counselorName: 'Dr. Sarah Johnson',
      counselorAvatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150',
      date: '2024-01-22',
      time: '10:00 AM - 11:00 AM',
      type: 'Career Guidance',
      location: 'Career Services Office, Room 203',
      status: 'confirmed',
      notes: 'Discussion about career paths in technology and next steps.'
    },
  ];

  const pastAppointments = [
    {
      id: '1',
      counselorName: 'Emily Chen',
      counselorAvatar: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=150',
      date: '2024-01-10',
      time: '3:00 PM - 4:00 PM',
      type: 'Mock Interview',
      status: 'completed',
      rating: 5,
      feedback: 'Great session! Emily provided excellent feedback on my interview skills and helped me prepare for technical questions.'
    },
    {
      id: '2',
      counselorName: 'Dr. Michael Rodriguez',
      counselorAvatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150',
      date: '2024-01-05',
      time: '1:00 PM - 2:00 PM',
      type: 'Job Search Strategy',
      status: 'completed',
      rating: 5,
      feedback: 'Very helpful session on job search strategies and networking tips.'
    },
  ];

  const sessionTypes = [
    {
      id: 'resume_review',
      name: 'Resume Review',
      duration: '60 minutes',
      description: 'Get personalized feedback on your resume and cover letter'
    },
    {
      id: 'career_guidance',
      name: 'Career Guidance',
      duration: '60 minutes',
      description: 'Explore career paths and develop your professional goals'
    },
    {
      id: 'mock_interview',
      name: 'Mock Interview',
      duration: '60 minutes',
      description: 'Practice interviews with industry-specific questions'
    },
    {
      id: 'job_search',
      name: 'Job Search Strategy',
      duration: '60 minutes',
      description: 'Learn effective job search techniques and networking'
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Career Counseling</h1>
        <p className="mt-2 text-gray-600">Book sessions with career counselors and track your appointments</p>
      </div>

      {/* Tabs */}
      <div className="mb-8">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('upcoming')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'upcoming'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Upcoming Appointments
            </button>
            <button
              onClick={() => setActiveTab('past')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'past'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Past Sessions
            </button>
            <button
              onClick={() => setActiveTab('book')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'book'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Book New Session
            </button>
          </nav>
        </div>
      </div>

      {/* Upcoming Appointments */}
      {activeTab === 'upcoming' && (
        <div className="space-y-6">
          {upcomingAppointments.length > 0 ? (
            upcomingAppointments.map(appointment => (
              <div key={appointment.id} className="bg-white rounded-xl shadow-soft p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start">
                    <img
                      src={appointment.counselorAvatar}
                      alt={appointment.counselorName}
                      className="w-12 h-12 rounded-full object-cover mr-4"
                    />
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{appointment.type}</h3>
                      <p className="text-gray-600">with {appointment.counselorName}</p>
                      <div className="mt-2 flex items-center space-x-4 text-sm text-gray-500">
                        <span className="flex items-center">
                          <Calendar size={16} className="mr-1" />
                          {new Date(appointment.date).toLocaleDateString()}
                        </span>
                        <span className="flex items-center">
                          <Clock size={16} className="mr-1" />
                          {appointment.time}
                        </span>
                        <span className="flex items-center">
                          {appointment.location.includes('Virtual') ? (
                            <Video size={16} className="mr-1" />
                          ) : (
                            <MapPin size={16} className="mr-1" />
                          )}
                          {appointment.location}
                        </span>
                      </div>
                    </div>
                  </div>
                  <span className="badge badge-success">{appointment.status}</span>
                </div>
                
                {appointment.notes && (
                  <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-700">
                      <strong>Notes:</strong> {appointment.notes}
                    </p>
                  </div>
                )}
                
                <div className="mt-4 flex space-x-3">
                  <button className="btn btn-outline text-sm">Reschedule</button>
                  <button className="btn btn-primary text-sm">Join Meeting</button>
                  <button className="btn btn-outline text-sm">Cancel</button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12">
              <Calendar size={48} className="mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900">No upcoming appointments</h3>
              <p className="text-gray-600 mb-4">Book a session with a career counselor to get started</p>
              <button
                onClick={() => setActiveTab('book')}
                className="btn btn-primary"
              >
                Book New Session
              </button>
            </div>
          )}
        </div>
      )}

      {/* Past Sessions */}
      {activeTab === 'past' && (
        <div className="space-y-6">
          {pastAppointments.map(appointment => (
            <div key={appointment.id} className="bg-white rounded-xl shadow-soft p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start">
                  <img
                    src={appointment.counselorAvatar}
                    alt={appointment.counselorName}
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{appointment.type}</h3>
                    <p className="text-gray-600">with {appointment.counselorName}</p>
                    <div className="mt-2 flex items-center space-x-4 text-sm text-gray-500">
                      <span className="flex items-center">
                        <Calendar size={16} className="mr-1" />
                        {new Date(appointment.date).toLocaleDateString()}
                      </span>
                      <span className="flex items-center">
                        <Clock size={16} className="mr-1" />
                        {appointment.time}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={16}
                        className={`${
                          i < appointment.rating ? 'text-warning-500 fill-current' : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="badge badge-success">{appointment.status}</span>
                </div>
              </div>
              
              {appointment.feedback && (
                <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-700">
                    <strong>Your feedback:</strong> {appointment.feedback}
                  </p>
                </div>
              )}
              
              <div className="mt-4 flex space-x-3">
                <button className="btn btn-outline text-sm">Book Again</button>
                <button className="btn btn-outline text-sm">Download Notes</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Book New Session */}
      {activeTab === 'book' && (
        <div className="space-y-8">
          {/* Session Types */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Choose Session Type</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {sessionTypes.map(type => (
                <div key={type.id} className="card p-4 hover:shadow-medium transition-shadow cursor-pointer border-2 border-transparent hover:border-primary-200">
                  <h3 className="font-medium text-gray-900">{type.name}</h3>
                  <p className="text-sm text-gray-600 mt-1">{type.description}</p>
                  <p className="text-sm text-primary-600 mt-2 font-medium">{type.duration}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Available Counselors */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Choose Your Counselor</h2>
            <div className="space-y-4">
              {counselors.map(counselor => (
                <div key={counselor.id} className="bg-white rounded-xl shadow-soft p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start">
                      <img
                        src={counselor.avatar}
                        alt={counselor.name}
                        className="w-16 h-16 rounded-full object-cover mr-4"
                      />
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{counselor.name}</h3>
                        <p className="text-gray-600">{counselor.title}</p>
                        <div className="mt-2 flex items-center space-x-4">
                          <div className="flex items-center">
                            <Star size={16} className="text-warning-500 mr-1" />
                            <span className="text-sm font-medium">{counselor.rating}</span>
                            <span className="text-sm text-gray-500 ml-1">
                              ({counselor.totalSessions} sessions)
                            </span>
                          </div>
                          <span className="text-sm text-success-600">{counselor.availability}</span>
                        </div>
                        <div className="mt-2 flex flex-wrap gap-1">
                          {counselor.specialization.map(spec => (
                            <span key={spec} className="px-2 py-1 bg-primary-50 text-primary-700 text-xs rounded-full">
                              {spec}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600">Next available:</p>
                      <p className="font-medium text-primary-600">{counselor.nextSlot}</p>
                    </div>
                  </div>
                  
                  <div className="mt-4 flex justify-end space-x-3">
                    <button className="btn btn-outline text-sm">View Profile</button>
                    <button className="btn btn-primary text-sm">Book Session</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Appointments;