import React, { useState } from 'react';
import { mockEvents } from '../data/mockData';
import { Calendar, MapPin, Users, Clock, ExternalLink, Filter } from 'lucide-react';
import { format } from 'date-fns';

const Events = () => {
  const [selectedType, setSelectedType] = useState<string>('');
  const [showVirtualOnly, setShowVirtualOnly] = useState(false);

  const eventTypes = Array.from(
    new Set(mockEvents.map(event => event.type))
  ).sort();

  const filteredEvents = mockEvents.filter(event => {
    const matchesType = !selectedType || event.type === selectedType;
    const matchesVirtual = !showVirtualOnly || event.virtual;
    return matchesType && matchesVirtual;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Upcoming Events</h1>
        <p className="mt-2 text-gray-600">Browse and register for career events, workshops, and networking opportunities</p>
      </div>

      {/* Filters */}
      <div className="mb-8 flex flex-col md:flex-row gap-4">
        <div className="w-full md:w-64">
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="input w-full"
          >
            <option value="">All Event Types</option>
            {eventTypes.map(type => (
              <option key={type} value={type}>
                {type.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
              </option>
            ))}
          </select>
        </div>
        <div className="flex items-center">
          <label className="flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={showVirtualOnly}
              onChange={(e) => setShowVirtualOnly(e.target.checked)}
              className="form-checkbox h-4 w-4 text-primary-600 rounded"
            />
            <span className="ml-2 text-gray-700">Virtual Events Only</span>
          </label>
        </div>
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEvents.map(event => (
          <div key={event.id} className="bg-white rounded-xl shadow-soft hover:shadow-medium transition-shadow overflow-hidden">
            {event.image && (
              <div className="h-48 overflow-hidden">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <span className={`badge ${
                  event.type === 'workshop' ? 'badge-primary' :
                  event.type === 'career_fair' ? 'badge-secondary' :
                  event.type === 'info_session' ? 'badge-accent' :
                  event.type === 'networking' ? 'badge-success' :
                  'badge-warning'
                }`}>
                  {event.type.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                </span>
                {event.virtual && (
                  <span className="badge badge-success">Virtual</span>
                )}
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mb-2">{event.title}</h3>
              <p className="text-gray-600 text-sm mb-4">{event.description}</p>

              <div className="space-y-2 text-sm text-gray-500">
                <div className="flex items-center">
                  <Calendar size={16} className="mr-2" />
                  {format(new Date(event.date), 'MMMM d, yyyy')}
                </div>
                <div className="flex items-center">
                  <Clock size={16} className="mr-2" />
                  {event.startTime} - {event.endTime}
                </div>
                <div className="flex items-center">
                  <MapPin size={16} className="mr-2" />
                  {event.virtual ? 'Online Event' : event.location}
                </div>
                <div className="flex items-center">
                  <Users size={16} className="mr-2" />
                  {event.attendees} attendees
                </div>
              </div>

              <div className="mt-6 flex justify-between items-center">
                <span className="text-sm text-gray-500">Hosted by {event.host}</span>
                {event.virtual ? (
                  <a
                    href={event.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary text-sm py-1.5 px-4 flex items-center"
                  >
                    Join Online <ExternalLink size={14} className="ml-1" />
                  </a>
                ) : (
                  <button className="btn btn-primary text-sm py-1.5 px-4">
                    Register Now
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Events;