import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import {
  User,
  Building2,
  Mail,
  Phone,
  MapPin,
  Edit2,
  Save,
  Briefcase,
  GraduationCap,
  Globe,
  Github,
  Linkedin,
  Link as LinkIcon,
  Plus,
  X,
  Calendar
} from 'lucide-react';

const Profile = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    location: user?.location || '',
    phone: user?.phoneNumber || '',
    bio: user?.bio || '',
    major: user?.major || '',
    graduationYear: user?.graduationYear || '',
    skills: user?.skills || [],
    linkedIn: user?.linkedIn || '',
    github: user?.github || '',
    portfolio: user?.portfolio || '',
    newSkill: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would update the user profile
    setIsEditing(false);
  };

  const addSkill = () => {
    if (formData.newSkill.trim()) {
      setFormData({
        ...formData,
        skills: [...formData.skills, formData.newSkill.trim()],
        newSkill: ''
      });
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setFormData({
      ...formData,
      skills: formData.skills.filter(skill => skill !== skillToRemove)
    });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-white rounded-xl shadow-soft overflow-hidden">
        {/* Header/Banner */}
        <div className="h-32 bg-gradient-to-r from-primary-600 to-primary-800"></div>
        
        {/* Profile Content */}
        <div className="px-6 py-8">
          {/* Avatar and Basic Info */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start -mt-16 mb-6">
            <div className="relative group">
              {user?.avatar ? (
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-24 h-24 rounded-full border-4 border-white shadow-md object-cover"
                />
              ) : (
                <div className="w-24 h-24 rounded-full border-4 border-white shadow-md bg-primary-100 flex items-center justify-center">
                  <User size={40} className="text-primary-600" />
                </div>
              )}
              {isEditing && (
                <button className="absolute bottom-0 right-0 bg-primary-600 text-white p-2 rounded-full shadow-md hover:bg-primary-700 transition-colors">
                  <Edit2 size={14} />
                </button>
              )}
            </div>
            <div className="mt-4 sm:mt-0 sm:ml-6 text-center sm:text-left">
              <h1 className="text-2xl font-bold text-gray-900">{user?.name}</h1>
              <p className="text-gray-600">{user?.major} Student</p>
              <p className="text-sm text-gray-500">Class of {user?.graduationYear}</p>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="space-y-8">
              {/* Personal Information */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold text-gray-900">Personal Information</h2>
                  <button
                    type="button"
                    onClick={() => setIsEditing(!isEditing)}
                    className="btn btn-outline text-sm py-1.5 px-3 flex items-center"
                  >
                    {isEditing ? (
                      <>
                        <Save size={16} className="mr-2" />
                        Save Changes
                      </>
                    ) : (
                      <>
                        <Edit2 size={16} className="mr-2" />
                        Edit Profile
                      </>
                    )}
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="input"
                      />
                    ) : (
                      <p className="text-gray-900 flex items-center">
                        <User size={16} className="mr-2 text-gray-400" />
                        {formData.name}
                      </p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    {isEditing ? (
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="input"
                      />
                    ) : (
                      <p className="text-gray-900 flex items-center">
                        <Mail size={16} className="mr-2 text-gray-400" />
                        {formData.email}
                      </p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        className="input"
                      />
                    ) : (
                      <p className="text-gray-900 flex items-center">
                        <MapPin size={16} className="mr-2 text-gray-400" />
                        {formData.location || 'Not specified'}
                      </p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                    {isEditing ? (
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="input"
                      />
                    ) : (
                      <p className="text-gray-900 flex items-center">
                        <Phone size={16} className="mr-2 text-gray-400" />
                        {formData.phone || 'Not specified'}
                      </p>
                    )}
                  </div>
                </div>

                <div className="mt-6">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                  {isEditing ? (
                    <textarea
                      value={formData.bio}
                      onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                      className="input min-h-[100px]"
                      placeholder="Write a brief bio about yourself..."
                    />
                  ) : (
                    <p className="text-gray-900">{formData.bio || 'No bio provided'}</p>
                  )}
                </div>
              </div>

              {/* Education */}
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Education</h2>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-start">
                    <GraduationCap size={20} className="text-gray-400 mr-3 mt-1" />
                    <div>
                      {isEditing ? (
                        <div className="space-y-4">
                          <input
                            type="text"
                            value={formData.major}
                            onChange={(e) => setFormData({ ...formData, major: e.target.value })}
                            className="input"
                            placeholder="Major"
                          />
                          <div className="flex items-center space-x-4">
                            <input
                              type="number"
                              value={formData.graduationYear}
                              onChange={(e) => setFormData({ ...formData, graduationYear: parseInt(e.target.value) })}
                              className="input w-32"
                              placeholder="Year"
                            />
                            <span className="text-gray-500">Expected Graduation Year</span>
                          </div>
                        </div>
                      ) : (
                        <>
                          <h3 className="font-medium text-gray-900">{formData.major}</h3>
                          <p className="text-gray-600">University of Technology</p>
                          <p className="text-sm text-gray-500">Expected Graduation: {formData.graduationYear}</p>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Skills */}
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Skills</h2>
                {isEditing ? (
                  <div className="space-y-4">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={formData.newSkill}
                        onChange={(e) => setFormData({ ...formData, newSkill: e.target.value })}
                        className="input flex-1"
                        placeholder="Add a new skill"
                        onKeyPress={(e) => e.key === 'Enter' && addSkill()}
                      />
                      <button
                        type="button"
                        onClick={addSkill}
                        className="btn btn-primary px-4"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {formData.skills.map((skill, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-primary-50 text-primary-700 rounded-full text-sm flex items-center"
                        >
                          {skill}
                          <button
                            type="button"
                            onClick={() => removeSkill(skill)}
                            className="ml-2 text-primary-400 hover:text-primary-600"
                          >
                            <X size={14} />
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {formData.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-primary-50 text-primary-700 rounded-full text-sm"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Social Links */}
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Social Links</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                      <Linkedin size={16} className="mr-2" /> LinkedIn Profile
                    </label>
                    {isEditing ? (
                      <input
                        type="url"
                        value={formData.linkedIn}
                        onChange={(e) => setFormData({ ...formData, linkedIn: e.target.value })}
                        className="input"
                        placeholder="https://linkedin.com/in/username"
                      />
                    ) : (
                      <a
                        href={formData.linkedIn}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary-600 hover:text-primary-700 flex items-center"
                      >
                        <Globe size={16} className="mr-2" />
                        {formData.linkedIn || 'Not provided'}
                      </a>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                      <Github size={16} className="mr-2" /> GitHub Profile
                    </label>
                    {isEditing ? (
                      <input
                        type="url"
                        value={formData.github}
                        onChange={(e) => setFormData({ ...formData, github: e.target.value })}
                        className="input"
                        placeholder="https://github.com/username"
                      />
                    ) : (
                      <a
                        href={formData.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary-600 hover:text-primary-700 flex items-center"
                      >
                        <Globe size={16} className="mr-2" />
                        {formData.github || 'Not provided'}
                      </a>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                      <LinkIcon size={16} className="mr-2" /> Portfolio Website
                    </label>
                    {isEditing ? (
                      <input
                        type="url"
                        value={formData.portfolio}
                        onChange={(e) => setFormData({ ...formData, portfolio: e.target.value })}
                        className="input"
                        placeholder="https://yourportfolio.com"
                      />
                    ) : (
                      <a
                        href={formData.portfolio}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary-600 hover:text-primary-700 flex items-center"
                      >
                        <Globe size={16} className="mr-2" />
                        {formData.portfolio || 'Not provided'}
                      </a>
                    )}
                  </div>
                </div>
              </div>

              {/* Save Button */}
              {isEditing && (
                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="btn btn-outline"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary"
                  >
                    Save Changes
                  </button>
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;