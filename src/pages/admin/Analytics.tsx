import React, { useState } from 'react';
import { BarChart3, Users, TrendingUp, Activity, Calendar, ArrowUp, ArrowDown } from 'lucide-react';

interface AnalyticData {
  period: string;
  users: number;
  jobs: number;
  applications: number;
  consultations: number;
}

const SystemAnalytics: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('7d');
  
  const analyticsData: AnalyticData[] = [
    { period: '2025-06-06', users: 45, jobs: 12, applications: 89, consultations: 23 },
    { period: '2025-06-07', users: 52, jobs: 15, applications: 102, consultations: 28 },
    { period: '2025-06-08', users: 38, jobs: 8, applications: 76, consultations: 19 },
    { period: '2025-06-09', users: 61, jobs: 18, applications: 134, consultations: 34 },
    { period: '2025-06-10', users: 47, jobs: 11, applications: 98, consultations: 26 },
    { period: '2025-06-11', users: 59, jobs: 16, applications: 127, consultations: 31 },
    { period: '2025-06-12', users: 64, jobs: 19, applications: 145, consultations: 38 }
  ];

  const kpiData = [
    {
      title: 'Total Users',
      value: '2,847',
      change: '+12.5%',
      trend: 'up',
      icon: Users,
      color: 'blue'
    },
    {
      title: 'Active Jobs',
      value: '342',
      change: '+8.2%',
      trend: 'up',
      icon: BarChart3,
      color: 'green'
    },
    {
      title: 'Applications',
      value: '1,234',
      change: '+15.7%',
      trend: 'up',
      icon: TrendingUp,
      color: 'purple'
    },
    {
      title: 'Consultations',
      value: '189',
      change: '-3.1%',
      trend: 'down',
      icon: Activity,
      color: 'orange'
    }
  ];

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'blue': return 'bg-blue-100 text-blue-600';
      case 'green': return 'bg-green-100 text-green-600';
      case 'purple': return 'bg-purple-100 text-purple-600';
      case 'orange': return 'bg-orange-100 text-orange-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  const getTrendColor = (trend: string) => {
    return trend === 'up' ? 'text-green-600' : 'text-red-600';
  };

  const periods = [
    { value: '7d', label: 'Last 7 days' },
    { value: '30d', label: 'Last 30 days' },
    { value: '90d', label: 'Last 3 months' },
    { value: '1y', label: 'Last year' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">System Analytics</h1>
          <p className="text-gray-600">Monitor platform performance and user engagement</p>
        </div>
        <div className="flex items-center space-x-2">
          <Calendar className="text-gray-400" size={20} />
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="input"
          >
            {periods.map(period => (
              <option key={period.value} value={period.value}>
                {period.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiData.map((kpi, index) => {
          const Icon = kpi.icon;
          const TrendIcon = kpi.trend === 'up' ? ArrowUp : ArrowDown;
          
          return (
            <div key={index} className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{kpi.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{kpi.value}</p>
                  <div className={`flex items-center mt-1 ${getTrendColor(kpi.trend)}`}>
                    <TrendIcon size={14} className="mr-1" />
                    <span className="text-sm font-medium">{kpi.change}</span>
                  </div>
                </div>
                <div className={`p-3 rounded-lg ${getColorClasses(kpi.color)}`}>
                  <Icon size={24} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* User Activity Chart */}
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-medium text-gray-900 mb-4">User Activity</h3>
          <div className="space-y-4">
            {analyticsData.slice(-7).map((data, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-sm text-gray-600">{data.period}</span>
                <div className="flex items-center space-x-4">
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ width: `${(data.users / 70) * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium text-gray-900 w-8">{data.users}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Job Applications Chart */}
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Job Applications</h3>
          <div className="space-y-4">
            {analyticsData.slice(-7).map((data, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-sm text-gray-600">{data.period}</span>
                <div className="flex items-center space-x-4">
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-green-600 h-2 rounded-full"
                      style={{ width: `${(data.applications / 150) * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium text-gray-900 w-8">{data.applications}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Detailed Analytics Table */}
      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Detailed Analytics</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  New Users
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Jobs Posted
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Applications
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Consultations
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Engagement Rate
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {analyticsData.slice(-7).reverse().map((data, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {data.period}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div className="flex items-center">
                      <Users size={16} className="text-blue-400 mr-2" />
                      {data.users}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div className="flex items-center">
                      <BarChart3 size={16} className="text-green-400 mr-2" />
                      {data.jobs}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div className="flex items-center">
                      <TrendingUp size={16} className="text-purple-400 mr-2" />
                      {data.applications}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div className="flex items-center">
                      <Activity size={16} className="text-orange-400 mr-2" />
                      {data.consultations}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                      {((data.applications / (data.users * 3)) * 100).toFixed(1)}%
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h4 className="text-sm font-medium text-gray-900 mb-2">User Growth Rate</h4>
          <p className="text-2xl font-bold text-green-600">+12.5%</p>
          <p className="text-sm text-gray-500">Compared to last period</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h4 className="text-sm font-medium text-gray-900 mb-2">Average Session Duration</h4>
          <p className="text-2xl font-bold text-blue-600">8.4 min</p>
          <p className="text-sm text-gray-500">Per user session</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h4 className="text-sm font-medium text-gray-900 mb-2">Platform Conversion Rate</h4>
          <p className="text-2xl font-bold text-purple-600">24.7%</p>
          <p className="text-sm text-gray-500">Applications to interviews</p>
        </div>
      </div>
    </div>
  );
};

export default SystemAnalytics;
