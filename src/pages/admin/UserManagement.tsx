import React, { useState } from 'react';
import { Users, Search, Filter, User, Mail, Shield, Settings, MoreVertical } from 'lucide-react';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'employer' | 'counselor' | 'admin';
  status: 'active' | 'inactive' | 'suspended';
  lastActive: string;
  joinedDate: string;
  profileComplete: boolean;
}

const UserManagement: React.FC = () => {
  const [users] = useState<User[]>([
    {
      id: '1',
      name: 'Alice Johnson',
      email: 'alice.johnson@example.com',
      role: 'student',
      status: 'active',
      lastActive: '2025-06-12',
      joinedDate: '2025-01-15',
      profileComplete: true
    },
    {
      id: '2',
      name: 'Bob Smith',
      email: 'bob.smith@example.com',
      role: 'employer',
      status: 'active',
      lastActive: '2025-06-11',
      joinedDate: '2025-02-20',
      profileComplete: false
    },
    {
      id: '3',
      name: 'Dr. Carol Davis',
      email: 'carol.davis@example.com',
      role: 'counselor',
      status: 'active',
      lastActive: '2025-06-12',
      joinedDate: '2025-01-10',
      profileComplete: true
    },
    {
      id: '4',
      name: 'John Admin',
      email: 'john.admin@example.com',
      role: 'admin',
      status: 'active',
      lastActive: '2025-06-12',
      joinedDate: '2025-01-01',
      profileComplete: true
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState<'all' | 'student' | 'employer' | 'counselor' | 'admin'>('all');
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'inactive' | 'suspended'>('all');

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === 'all' || user.role === filterRole;
    const matchesStatus = filterStatus === 'all' || user.status === filterStatus;
    return matchesSearch && matchesRole && matchesStatus;
  });

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin': return 'bg-red-100 text-red-800';
      case 'counselor': return 'bg-purple-100 text-purple-800';
      case 'employer': return 'bg-blue-100 text-blue-800';
      case 'student': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      case 'suspended': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'admin': return <Shield size={16} className="text-red-600" />;
      case 'counselor': return <User size={16} className="text-purple-600" />;
      case 'employer': return <Settings size={16} className="text-blue-600" />;
      case 'student': return <User size={16} className="text-green-600" />;
      default: return <User size={16} className="text-gray-600" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
          <p className="text-gray-600">Manage all users across the platform</p>
        </div>
        <div className="flex items-center space-x-2">
          <Users className="text-primary-600" size={24} />
          <span className="text-sm text-gray-500">{filteredUsers.length} users</span>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Users</p>
              <p className="text-2xl font-bold text-blue-600">{users.length}</p>
            </div>
            <Users className="text-blue-600" size={24} />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Users</p>
              <p className="text-2xl font-bold text-green-600">
                {users.filter(u => u.status === 'active').length}
              </p>
            </div>
            <User className="text-green-600" size={24} />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Students</p>
              <p className="text-2xl font-bold text-purple-600">
                {users.filter(u => u.role === 'student').length}
              </p>
            </div>
            <Shield className="text-purple-600" size={24} />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Employers</p>
              <p className="text-2xl font-bold text-orange-600">
                {users.filter(u => u.role === 'employer').length}
              </p>
            </div>
            <Settings className="text-orange-600" size={24} />
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
              placeholder="Search users by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input pl-10 w-full"
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <select
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value as any)}
              className="input pl-10 pr-10"
            >
              <option value="all">All Roles</option>
              <option value="student">Students</option>
              <option value="employer">Employers</option>
              <option value="counselor">Counselors</option>
              <option value="admin">Admins</option>
            </select>
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
              <option value="inactive">Inactive</option>
              <option value="suspended">Suspended</option>
            </select>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Profile
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Active
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Joined
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center">
                        <User className="text-primary-600" size={20} />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{user.name}</div>
                        <div className="text-sm text-gray-500 flex items-center">
                          <Mail size={14} className="mr-1" />
                          {user.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {getRoleIcon(user.role)}
                      <span className={`ml-2 inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getRoleColor(user.role)}`}>
                        {user.role}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(user.status)}`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div className="flex items-center">
                      <div className={`h-2 w-2 rounded-full mr-2 ${user.profileComplete ? 'bg-green-400' : 'bg-red-400'}`}></div>
                      {user.profileComplete ? 'Complete' : 'Incomplete'}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {user.lastActive}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {user.joinedDate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button className="text-primary-600 hover:text-primary-900">
                        View
                      </button>
                      <button className="text-yellow-600 hover:text-yellow-900">
                        Edit
                      </button>
                      <button className="text-red-600 hover:text-red-900">
                        Suspend
                      </button>
                      <button className="text-gray-400 hover:text-gray-600">
                        <MoreVertical size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredUsers.length === 0 && (
          <div className="text-center py-12">
            <Users className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No users found</h3>
            <p className="mt-1 text-sm text-gray-500">
              Try adjusting your search criteria.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserManagement;
