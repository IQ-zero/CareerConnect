import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  Calendar, 
  MapPin, 
  Users, 
  Clock,
  Edit,
  Trash2,
  Eye,
  Video
} from 'lucide-react';

const EmployerEvents: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const mockEvents = [
    {
      id: '1',
      title: 'TechVision Career Fair',
      type: 'career_fair',
      date: '2024-02-15',
      startTime: '10:00 AM',
      endTime: '4:00 PM',
      location: 'University Center Ballroom',
      virtual: false,
      status: 'upcoming',
      registrations: 156,
      maxAttendees: 200,
      description: 'Join us for our annual career fair where we\'ll be recruiting for multiple positions across engineering, product, and design teams.',
      targetAudience: 'Computer Science, Engineering students'
    },
    {
      id: '2',
      title: 'Software Engineering Info Session',
      type: 'info_session',
      date: '2024-01-25',
      startTime: '6:00 PM',
      endTime: '7:30 PM',
      location: 'Virtual Event',
      virtual: true,
      link: 'https://techvision.zoom.us/j/123456789',
      status: 'upcoming',
      registrations: 89,
      maxAttendees: 100,
      description: 'Learn about our software engineering roles, company culture, and application process. Q&A session included.',
      targetAudience: 'Computer Science, Software Engineering students'
    },
    {
      id: '3',
      title: 'Product Management Workshop',
      type: 'workshop',
      date: '2024-01-20',
      startTime: '2:00 PM',
      endTime: '4:00 PM',
      location: 'Business School, Room 301',
      virtual: false,
      status: 'completed',
      registrations: 45,
      maxAttendees: 50,
      description: 'Hands-on workshop covering product management fundamentals, case studies, and career paths.',
      targetAudience: 'Business, Engineering, Design students'
    }
  ];

  const filteredEvents = mockEvents.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || event.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming': return 'badge-primary';
      case 'ongoing': return 'badge-warning';
      case 'completed': return 'badge-success';
      case 'cancelled': return 'badge-error';
      default: return 'badge-primary';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'career_fair': return 'badge-secondary';
      case 'info_session': return 'badge-accent';
      case 'workshop': return 'badge-primary';
      case 'networking': return 'badge-success';
      default: return 'badge-primary';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Company Events</h1>
          <p className="text-gray-600">Create and manage your recruitment events</p>
        </div>
        <button className="btn btn-primary mt-4 md:mt-0">
          <Plus size={16} className="mr-2" />
          Create New Event
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <input
              type="text"
              placeholder="Search events..."
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
            <option value="upcoming">Upcoming</option>
            <option value="ongoing">Ongoing</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
        <button className="btn btn-outline">
          <Filter size={16} className="mr-2" />
          More Filters
        </button>
      </div>

      {/* Events List */}
      <div className="space-y-4">
        {filteredEvents.map(event => (
          <div key={event.id} className="card p-6 hover:shadow-medium transition-shadow">
            <div className="flex flex-col lg:flex-row lg:items-start justify-between">
              <div className="flex-1">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`badge ${getTypeColor(event.type)}`}>
                        {event.type.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                      </span>
                      <span className={`badge ${getStatusColor(event.status)}`}>
                        {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                      </span>
                      {event.virtual && (
                        <span className="badge badge-success">Virtual</span>
                      )}
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900">{event.title}</h3>
                    <p className="text-gray-600 mt-1">{event.description}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <div className="flex items-center text-gray-600">
                    <Calendar size={16} className="mr-2 text-gray-400" />
                    {new Date(event.date).toLocaleDateString()}
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Clock size={16} className="mr-2 text-gray-400" />
                    {event.startTime} - {event.endTime}
                  </div>
                  <div className="flex items-center text-gray-600">
                    {event.virtual ? (
                      <Video size={16} className="mr-2 text-gray-400" />
                    ) : (
                      <MapPin size={16} className="mr-2 text-gray-400" />
                    )}
                    {event.virtual ? 'Virtual Event' : event.location}
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Users size={16} className="mr-2 text-gray-400" />
                    {event.registrations}/{event.maxAttendees} registered
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-sm text-gray-600">
                    <strong>Target Audience:</strong> {event.targetAudience}
                  </p>
                </div>

                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>
                    Registration Rate: {Math.round((event.registrations / event.maxAttendees) * 100)}%
                  </span>
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-primary-500 h-2 rounded-full" 
                      style={{ width: `${(event.registrations / event.maxAttendees) * 100}%` }}
                    ></div>
                  </div>
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
                  Cancel
                </button>
              </div>
            </div>
          </div>
        ))}

        {filteredEvents.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Calendar size={24} className="text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900">No events found</h3>
            <p className="text-gray-600">Try adjusting your search filters or create a new event</p>
          </div>
        )}
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-8">
        <div className="card p-4 text-center">
          <div className="p-3 rounded-full bg-primary-100 mb-3 mx-auto w-fit">
            <Calendar size={24} className="text-primary-600" />
          </div>
          <h3 className="font-medium mb-1">Total Events</h3>
          <p className="text-2xl font-bold text-primary-600">{mockEvents.length}</p>
        </div>
        
        <div className="card p-4 text-center">
          <div className="p-3 rounded-full bg-secondary-100 mb-3 mx-auto w-fit">
            <Users size={24} className="text-secondary-600" />
          </div>
          <h3 className="font-medium mb-1">Total Registrations</h3>
          <p className="text-2xl font-bold text-secondary-600">
            {mockEvents.reduce((sum, event) => sum + event.registrations, 0)}
          </p>
        </div>
        
        <div className="card p-4 text-center">
          <div className="p-3 rounded-full bg-accent-100 mb-3 mx-auto w-fit">
            <Clock size={24} className="text-accent-600" />
          </div>
          <h3 className="font-medium mb-1">Upcoming Events</h3>
          <p className="text-2xl font-bold text-accent-600">
            {mockEvents.filter(e => e.status === 'upcoming').length}
          </p>
        </div>
        
        <div className="card p-4 text-center">
          <div className="p-3 rounded-full bg-success-100 mb-3 mx-auto w-fit">
            <Video size={24} className="text-success-600" />
          </div>
          <h3 className="font-medium mb-1">Virtual Events</h3>
          <p className="text-2xl font-bold text-success-600">
            {mockEvents.filter(e => e.virtual).length}
          </p>
        </div>
      </div>
    </div>
  );
};

export default EmployerEvents;