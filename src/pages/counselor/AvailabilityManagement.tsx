import React, { useState } from 'react';
import { Calendar, Clock, Plus, Settings, Save } from 'lucide-react';

interface TimeSlot {
  id: string;
  day: string;
  startTime: string;
  endTime: string;
  isAvailable: boolean;
}

interface Availability {
  [key: string]: TimeSlot[];
}

const AvailabilityManagement: React.FC = () => {
  const [availability, setAvailability] = useState<Availability>({
    monday: [
      { id: '1', day: 'monday', startTime: '09:00', endTime: '12:00', isAvailable: true },
      { id: '2', day: 'monday', startTime: '14:00', endTime: '17:00', isAvailable: true },
    ],
    tuesday: [
      { id: '3', day: 'tuesday', startTime: '10:00', endTime: '15:00', isAvailable: true },
    ],
    wednesday: [
      { id: '4', day: 'wednesday', startTime: '09:00', endTime: '16:00', isAvailable: true },
    ],
    thursday: [
      { id: '5', day: 'thursday', startTime: '11:00', endTime: '14:00', isAvailable: false },
    ],
    friday: [
      { id: '6', day: 'friday', startTime: '09:00', endTime: '12:00', isAvailable: true },
    ],
    saturday: [],
    sunday: []
  });

  const [selectedDay, setSelectedDay] = useState('monday');
  const [newSlot, setNewSlot] = useState({ startTime: '', endTime: '' });

  const daysOfWeek = [
    { key: 'monday', label: 'Monday' },
    { key: 'tuesday', label: 'Tuesday' },
    { key: 'wednesday', label: 'Wednesday' },
    { key: 'thursday', label: 'Thursday' },
    { key: 'friday', label: 'Friday' },
    { key: 'saturday', label: 'Saturday' },
    { key: 'sunday', label: 'Sunday' },
  ];

  const addTimeSlot = () => {
    if (newSlot.startTime && newSlot.endTime) {
      const newId = Date.now().toString();
      const slot: TimeSlot = {
        id: newId,
        day: selectedDay,
        startTime: newSlot.startTime,
        endTime: newSlot.endTime,
        isAvailable: true
      };

      setAvailability(prev => ({
        ...prev,
        [selectedDay]: [...(prev[selectedDay] || []), slot]
      }));

      setNewSlot({ startTime: '', endTime: '' });
    }
  };

  const removeTimeSlot = (day: string, slotId: string) => {
    setAvailability(prev => ({
      ...prev,
      [day]: prev[day].filter(slot => slot.id !== slotId)
    }));
  };

  const toggleSlotAvailability = (day: string, slotId: string) => {
    setAvailability(prev => ({
      ...prev,
      [day]: prev[day].map(slot =>
        slot.id === slotId ? { ...slot, isAvailable: !slot.isAvailable } : slot
      )
    }));
  };

  const getTotalHours = () => {
    let total = 0;
    Object.values(availability).forEach(daySlots => {
      daySlots.forEach(slot => {
        if (slot.isAvailable) {
          const start = new Date(`2000-01-01 ${slot.startTime}`);
          const end = new Date(`2000-01-01 ${slot.endTime}`);
          total += (end.getTime() - start.getTime()) / (1000 * 60 * 60);
        }
      });
    });
    return total;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Availability Management</h1>
          <p className="text-gray-600">Manage your consultation hours and availability</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="text-sm text-gray-600">
            Total Weekly Hours: <span className="font-semibold text-primary-600">{getTotalHours()}h</span>
          </div>
          <button className="btn-primary flex items-center">
            <Save size={20} className="mr-2" />
            Save Changes
          </button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Available Days</p>
              <p className="text-2xl font-bold text-green-600">
                {Object.values(availability).filter(daySlots => 
                  daySlots.some(slot => slot.isAvailable)
                ).length}
              </p>
            </div>
            <Calendar className="text-green-600" size={24} />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Time Slots</p>
              <p className="text-2xl font-bold text-blue-600">
                {Object.values(availability).reduce((total, daySlots) => 
                  total + daySlots.filter(slot => slot.isAvailable).length, 0
                )}
              </p>
            </div>
            <Clock className="text-blue-600" size={24} />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Avg Hours/Day</p>
              <p className="text-2xl font-bold text-purple-600">
                {(getTotalHours() / 7).toFixed(1)}h
              </p>
            </div>
            <Settings className="text-purple-600" size={24} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Day Selection */}
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Select Day</h3>
          <div className="space-y-2">
            {daysOfWeek.map((day) => (
              <button
                key={day.key}
                onClick={() => setSelectedDay(day.key)}
                className={`w-full text-left px-4 py-3 rounded-lg border transition-colors ${
                  selectedDay === day.key
                    ? 'border-primary-500 bg-primary-50 text-primary-700'
                    : 'border-gray-200 bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                <div className="flex justify-between items-center">
                  <span className="font-medium">{day.label}</span>
                  <span className="text-sm text-gray-500">
                    {availability[day.key]?.filter(slot => slot.isAvailable).length || 0} slots
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Time Slots for Selected Day */}
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            {daysOfWeek.find(d => d.key === selectedDay)?.label} Schedule
          </h3>
          
          <div className="space-y-3 mb-6">
            {availability[selectedDay]?.map((slot) => (
              <div
                key={slot.id}
                className={`p-3 rounded-lg border ${
                  slot.isAvailable 
                    ? 'border-green-200 bg-green-50' 
                    : 'border-gray-200 bg-gray-50'
                }`}
              >
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-2">
                    <Clock size={16} className={slot.isAvailable ? 'text-green-600' : 'text-gray-400'} />
                    <span className={`font-medium ${slot.isAvailable ? 'text-green-900' : 'text-gray-500'}`}>
                      {slot.startTime} - {slot.endTime}
                    </span>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => toggleSlotAvailability(selectedDay, slot.id)}
                      className={`px-2 py-1 text-xs rounded ${
                        slot.isAvailable
                          ? 'bg-green-100 text-green-800 hover:bg-green-200'
                          : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                      }`}
                    >
                      {slot.isAvailable ? 'Available' : 'Unavailable'}
                    </button>
                    <button
                      onClick={() => removeTimeSlot(selectedDay, slot.id)}
                      className="px-2 py-1 text-xs bg-red-100 text-red-800 rounded hover:bg-red-200"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {(!availability[selectedDay] || availability[selectedDay].length === 0) && (
              <div className="text-center py-8 text-gray-500">
                <Calendar className="mx-auto h-12 w-12 text-gray-300 mb-2" />
                <p>No time slots set for this day</p>
              </div>
            )}
          </div>

          {/* Add New Slot */}
          <div className="border-t pt-4">
            <h4 className="text-sm font-medium text-gray-900 mb-3">Add Time Slot</h4>
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Start Time</label>
                  <input
                    type="time"
                    value={newSlot.startTime}
                    onChange={(e) => setNewSlot(prev => ({ ...prev, startTime: e.target.value }))}
                    className="input text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">End Time</label>
                  <input
                    type="time"
                    value={newSlot.endTime}
                    onChange={(e) => setNewSlot(prev => ({ ...prev, endTime: e.target.value }))}
                    className="input text-sm"
                  />
                </div>
              </div>
              <button
                onClick={addTimeSlot}
                disabled={!newSlot.startTime || !newSlot.endTime}
                className="w-full btn-primary flex items-center justify-center text-sm disabled:opacity-50"
              >
                <Plus size={16} className="mr-2" />
                Add Slot
              </button>
            </div>
          </div>
        </div>

        {/* Weekly Overview */}
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Weekly Overview</h3>
          <div className="space-y-3">
            {daysOfWeek.map((day) => {
              const daySlots = availability[day.key] || [];
              const availableSlots = daySlots.filter(slot => slot.isAvailable);
              const totalHours = availableSlots.reduce((total, slot) => {
                const start = new Date(`2000-01-01 ${slot.startTime}`);
                const end = new Date(`2000-01-01 ${slot.endTime}`);
                return total + (end.getTime() - start.getTime()) / (1000 * 60 * 60);
              }, 0);

              return (
                <div key={day.key} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
                  <span className="font-medium text-gray-900">{day.label}</span>
                  <div className="text-right">
                    <div className="text-sm font-medium text-gray-900">
                      {totalHours.toFixed(1)}h
                    </div>
                    <div className="text-xs text-gray-500">
                      {availableSlots.length} slots
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AvailabilityManagement;
