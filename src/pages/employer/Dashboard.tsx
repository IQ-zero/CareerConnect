import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { 
  Briefcase, 
  Users, 
  Calendar, 
  TrendingUp, 
  Plus,
  Eye,
  Edit,
  Building2
} from 'lucide-react';

const EmployerDashboard: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Welcome section */}
      <section className="mb-8">
        <div className="bg-gradient-to-r from-primary-600 to-primary-800 rounded-2xl p-6 md:p-8 text-white">
          <div className="flex flex-col md:flex-row md:items-center justify-between">
            <div className="mb-4 md:mb-0">
              <h1 className="text-2xl md:text-3xl font-bold">Welcome back, {user?.name}!</h1>
              <p className="mt-2 text-primary-100">Manage your job postings and connect with talented candidates.</p>
            </div>
            <div className="flex space-x-3">
              <button className="btn bg-white text-primary-700 hover:bg-primary-50">
                <Plus size={16} className="mr-2" />
                Post New Job
              </button>
              <button className="btn bg-primary-500 text-white hover:bg-primary-400">
                <Users size={16} className="mr-2" />
                View Candidates
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats overview */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="card flex items-center p-4">
          <div className="p-3 rounded-full bg-primary-100 mr-3">
            <Briefcase size={20} className="text-primary-600" />
          </div>
          <div>
            <p className="text-sm text-gray-600">Active Jobs</p>
            <p className="text-xl font-semibold">12</p>
          </div>
        </div>
        
        <div className="card flex items-center p-4">
          <div className="p-3 rounded-full bg-secondary-100 mr-3">
            <Users size={20} className="text-secondary-600" />
          </div>
          <div>
            <p className="text-sm text-gray-600">Applications</p>
            <p className="text-xl font-semibold">89</p>
          </div>
        </div>
        
        <div className="card flex items-center p-4">
          <div className="p-3 rounded-full bg-accent-100 mr-3">
            <Calendar size={20} className="text-accent-600" />
          </div>
          <div>
            <p className="text-sm text-gray-600">Interviews</p>
            <p className="text-xl font-semibold">15</p>
          </div>
        </div>
        
        <div className="card flex items-center p-4">
          <div className="p-3 rounded-full bg-success-100 mr-3">
            <TrendingUp size={20} className="text-success-600" />
          </div>
          <div>
            <p className="text-sm text-gray-600">Hires This Month</p>
            <p className="text-xl font-semibold">7</p>
          </div>
        </div>
      </section>

      {/* Recent job postings */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Recent Job Postings</h2>
          <button className="text-primary-600 text-sm hover:underline">
            View All
          </button>
        </div>
        
        <div className="space-y-3">
          {[1, 2, 3].map((job) => (
            <div key={job} className="card p-4 hover:shadow-medium transition-shadow">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Building2 size={20} className="text-gray-400 mr-3" />
                  <div>
                    <h3 className="font-medium">Software Engineer</h3>
                    <p className="text-sm text-gray-600">Posted 2 days ago • 23 applications</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="badge badge-success">Active</span>
                  <button className="p-1 text-gray-400 hover:text-primary-600">
                    <Eye size={16} />
                  </button>
                  <button className="p-1 text-gray-400 hover:text-primary-600">
                    <Edit size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Recent applications */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Recent Applications</h2>
          <button className="text-primary-600 text-sm hover:underline">
            View All
          </button>
        </div>
        
        <div className="space-y-3">
          {[1, 2, 3].map((application) => (
            <div key={application} className="card p-4 hover:shadow-medium transition-shadow">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center mr-3">
                    <Users size={20} className="text-gray-500" />
                  </div>
                  <div>
                    <h3 className="font-medium">John Doe</h3>
                    <p className="text-sm text-gray-600">Applied for Software Engineer • 1 hour ago</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="badge badge-warning">Under Review</span>
                  <button className="btn btn-outline text-sm py-1 px-3">
                    View Profile
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default EmployerDashboard;