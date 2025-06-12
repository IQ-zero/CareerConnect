import React, { useState } from 'react';
import { Calendar, Clock, User, Plus, Filter, Search } from 'lucide-react';

interface Appointment {
  id: string;
  studentName: string;
  studentEmail: string;
  date: string;
  time: string;
  type: 'career-guidance' | 'resume-review' | 'interview-prep' | 'general';
  status: 'scheduled' | 'completed' | 'cancelled' | 'no-show';
  notes?: string;
}

const AppointmentManagement: React.FC = () => {
  const [appointments] = useState<Appointment[]>([
    {
      id: '1',
      studentName: 'Alice Johnson',
      studentEmail: 'alice.johnson@example.com',
      date: '2025-06-15',
      time: '10:00',
      type: 'career-guidance',
      status: 'scheduled',
      notes: 'Discuss career paths in tech industry'
    },
    {
      id: '2',
      studentName: 'Bob Smith',
      studentEmail: 'bob.smith@example.com',
      date: '2025-06-15',
      time: '14:00',
      type: 'resume-review',
      status: 'scheduled'
    },
    {
      id: '3',
      studentName: 'Carol Davis',
      studentEmail: 'carol.davis@example.com',
      date: '2025-06-14',
      time: '11:00',
      type: 'interview-prep',
      status: 'completed',
      notes: 'Mock interview session completed successfully'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'scheduled' | 'completed' | 'cancelled'>('all');
  const [selectedDate, setSelectedDate] = useState('');

  const filteredAppointments = appointments.filter(appointment => {
    const matchesSearch = appointment.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         appointment.studentEmail.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || appointment.status === filterStatus;
    const matchesDate = !selectedDate || appointment.date === selectedDate;
    return matchesSearch && matchesStatus && matchesDate;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      case 'no-show': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'career-guidance': return 'Career Guidance';
      case 'resume-review': return 'Resume Review';
      case 'interview-prep': return 'Interview Prep';
      case 'general': return 'General Consultation';
      default: return type;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Appointment Management</h1>
          <p className="text-gray-600">Manage student appointments and consultations</p>
        </div>
        <button className="btn-primary flex items-center">
          <Plus size={20} className="mr-2" />
          New Appointment
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search by student name or email..."
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
              <option value="scheduled">Scheduled</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="input pl-10 w-full"
            />
          </div>
        </div>
      </div>

      {/* Appointments List */}
      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Student
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date & Time
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Notes
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredAppointments.map((appointment) => (
                <tr key={appointment.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center">
                        <User className="text-primary-600" size={20} />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{appointment.studentName}</div>
                        <div className="text-sm text-gray-500">{appointment.studentEmail}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div className="flex items-center">
                      <Calendar size={16} className="text-gray-400 mr-2" />
                      <div>
                        <div className="font-medium">{appointment.date}</div>
                        <div className="text-gray-500 flex items-center">
                          <Clock size={14} className="mr-1" />
                          {appointment.time}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {getTypeLabel(appointment.type)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(appointment.status)}`}>
                      {appointment.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900 max-w-xs truncate">
                    {appointment.notes || '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button className="text-primary-600 hover:text-primary-900">
                        Edit
                      </button>
                      {appointment.status === 'scheduled' && (
                        <button className="text-green-600 hover:text-green-900">
                          Complete
                        </button>
                      )}
                      <button className="text-red-600 hover:text-red-900">
                        Cancel
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredAppointments.length === 0 && (
          <div className="text-center py-12">
            <Calendar className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No appointments found</h3>
            <p className="mt-1 text-sm text-gray-500">
              Try adjusting your search criteria or schedule a new appointment.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AppointmentManagement;
