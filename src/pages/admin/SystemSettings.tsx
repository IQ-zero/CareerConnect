import React, { useState } from 'react';
import { Settings, Save, Bell, Shield, Database, Mail, Globe, Lock } from 'lucide-react';

interface SystemSetting {
  id: string;
  category: 'general' | 'security' | 'notifications' | 'integrations';
  name: string;
  description: string;
  type: 'boolean' | 'text' | 'number' | 'select';
  value: any;
  options?: string[];
}

const SystemSettings: React.FC = () => {
  const [settings, setSettings] = useState<SystemSetting[]>([
    {
      id: 'site_name',
      category: 'general',
      name: 'Site Name',
      description: 'The name of your career connect platform',
      type: 'text',
      value: 'CareerConnect'
    },
    {
      id: 'site_description',
      category: 'general',
      name: 'Site Description',
      description: 'Brief description of your platform',
      type: 'text',
      value: 'Your gateway to career success'
    },
    {
      id: 'max_file_size',
      category: 'general',
      name: 'Max File Upload Size (MB)',
      description: 'Maximum file size for uploads',
      type: 'number',
      value: 10
    },
    {
      id: 'maintenance_mode',
      category: 'general',
      name: 'Maintenance Mode',
      description: 'Enable maintenance mode to restrict access',
      type: 'boolean',
      value: false
    },
    {
      id: 'password_min_length',
      category: 'security',
      name: 'Minimum Password Length',
      description: 'Minimum number of characters for passwords',
      type: 'number',
      value: 8
    },
    {
      id: 'session_timeout',
      category: 'security',
      name: 'Session Timeout (minutes)',
      description: 'Auto logout after inactivity',
      type: 'number',
      value: 30
    },
    {
      id: 'two_factor_auth',
      category: 'security',
      name: 'Require Two-Factor Authentication',
      description: 'Enforce 2FA for all users',
      type: 'boolean',
      value: false
    },
    {
      id: 'email_notifications',
      category: 'notifications',
      name: 'Email Notifications',
      description: 'Send email notifications to users',
      type: 'boolean',
      value: true
    },
    {
      id: 'notification_frequency',
      category: 'notifications',
      name: 'Notification Frequency',
      description: 'How often to send digest emails',
      type: 'select',
      value: 'daily',
      options: ['immediate', 'daily', 'weekly', 'monthly']
    },
    {
      id: 'smtp_server',
      category: 'integrations',
      name: 'SMTP Server',
      description: 'Email server for sending notifications',
      type: 'text',
      value: 'smtp.example.com'
    },
    {
      id: 'api_rate_limit',
      category: 'integrations',
      name: 'API Rate Limit (requests/minute)',
      description: 'Maximum API requests per minute per user',
      type: 'number',
      value: 100
    }
  ]);

  const [activeCategory, setActiveCategory] = useState<'general' | 'security' | 'notifications' | 'integrations'>('general');
  const [hasChanges, setHasChanges] = useState(false);

  const categories = [
    { id: 'general', label: 'General', icon: Settings },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'integrations', label: 'Integrations', icon: Globe }
  ];

  const updateSetting = (settingId: string, newValue: any) => {
    setSettings(prev => prev.map(setting =>
      setting.id === settingId ? { ...setting, value: newValue } : setting
    ));
    setHasChanges(true);
  };

  const saveSettings = () => {
    // Logic to save settings
    console.log('Saving settings:', settings);
    setHasChanges(false);
  };

  const resetToDefaults = () => {
    // Logic to reset to default values
    console.log('Resetting to defaults');
    setHasChanges(false);
  };

  const filteredSettings = settings.filter(setting => setting.category === activeCategory);

  const renderSettingInput = (setting: SystemSetting) => {
    switch (setting.type) {
      case 'boolean':
        return (
          <label className="flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={setting.value}
              onChange={(e) => updateSetting(setting.id, e.target.checked)}
              className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
            />
            <span className="ml-2 text-sm text-gray-700">
              {setting.value ? 'Enabled' : 'Disabled'}
            </span>
          </label>
        );
      case 'number':
        return (
          <input
            type="number"
            value={setting.value}
            onChange={(e) => updateSetting(setting.id, parseInt(e.target.value) || 0)}
            className="input w-full max-w-xs"
          />
        );
      case 'select':
        return (
          <select
            value={setting.value}
            onChange={(e) => updateSetting(setting.id, e.target.value)}
            className="input w-full max-w-xs"
          >
            {setting.options?.map(option => (
              <option key={option} value={option}>
                {option.charAt(0).toUpperCase() + option.slice(1)}
              </option>
            ))}
          </select>
        );
      default:
        return (
          <input
            type="text"
            value={setting.value}
            onChange={(e) => updateSetting(setting.id, e.target.value)}
            className="input w-full max-w-md"
          />
        );
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">System Settings</h1>
          <p className="text-gray-600">Configure platform settings and preferences</p>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={resetToDefaults}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
          >
            Reset to Defaults
          </button>
          <button
            onClick={saveSettings}
            disabled={!hasChanges}
            className="btn-primary flex items-center disabled:opacity-50"
          >
            <Save size={20} className="mr-2" />
            Save Changes
          </button>
        </div>
      </div>

      {hasChanges && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <Settings className="h-5 w-5 text-yellow-400" />
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-yellow-800">
                Unsaved Changes
              </h3>
              <div className="mt-2 text-sm text-yellow-700">
                <p>You have unsaved changes. Don't forget to save your settings.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Category Navigation */}
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Categories</h3>
          <nav className="space-y-2">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id as any)}
                  className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                    activeCategory === category.id
                      ? 'bg-primary-100 text-primary-700'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <Icon size={16} className="mr-3" />
                  {category.label}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Settings Panel */}
        <div className="lg:col-span-3 bg-white rounded-lg shadow-sm border">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">
              {categories.find(c => c.id === activeCategory)?.label} Settings
            </h3>
          </div>
          
          <div className="p-6">
            <div className="space-y-6">
              {filteredSettings.map((setting) => (
                <div key={setting.id} className="flex items-start justify-between py-4 border-b border-gray-100 last:border-b-0">
                  <div className="flex-1 mr-4">
                    <h4 className="text-sm font-medium text-gray-900">
                      {setting.name}
                    </h4>
                    <p className="text-sm text-gray-500 mt-1">
                      {setting.description}
                    </p>
                  </div>
                  <div className="flex-shrink-0">
                    {renderSettingInput(setting)}
                  </div>
                </div>
              ))}

              {filteredSettings.length === 0 && (
                <div className="text-center py-12">
                  <Settings className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-2 text-sm font-medium text-gray-900">No settings found</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    No settings available for this category.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Additional Settings Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center mb-4">
            <Database className="text-blue-600 mr-3" size={24} />
            <h3 className="text-lg font-medium text-gray-900">Database</h3>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Total Size:</span>
              <span className="font-medium">2.4 GB</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Tables:</span>
              <span className="font-medium">47</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Last Backup:</span>
              <span className="font-medium">2 hours ago</span>
            </div>
          </div>
          <button className="mt-4 w-full btn-secondary text-sm">
            Backup Database
          </button>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center mb-4">
            <Mail className="text-green-600 mr-3" size={24} />
            <h3 className="text-lg font-medium text-gray-900">Email Status</h3>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Queue:</span>
              <span className="font-medium">12 pending</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Sent Today:</span>
              <span className="font-medium">1,247</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Delivery Rate:</span>
              <span className="font-medium text-green-600">98.5%</span>
            </div>
          </div>
          <button className="mt-4 w-full btn-secondary text-sm">
            Test Email
          </button>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center mb-4">
            <Lock className="text-purple-600 mr-3" size={24} />
            <h3 className="text-lg font-medium text-gray-900">Security</h3>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Failed Logins (24h):</span>
              <span className="font-medium">23</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Active Sessions:</span>
              <span className="font-medium">156</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">2FA Enabled:</span>
              <span className="font-medium text-green-600">67%</span>
            </div>
          </div>
          <button className="mt-4 w-full btn-secondary text-sm">
            Security Report
          </button>
        </div>
      </div>
    </div>
  );
};

export default SystemSettings;
