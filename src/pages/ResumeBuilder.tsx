import React, { useState } from 'react';
import { FileText, Plus, Trash2, Download, Eye, Edit2 } from 'lucide-react';

const ResumeBuilder = () => {
  const [activeSection, setActiveSection] = useState('personal');
  
  const sections = [
    { id: 'personal', title: 'Personal Info' },
    { id: 'education', title: 'Education' },
    { id: 'experience', title: 'Experience' },
    { id: 'skills', title: 'Skills' },
    { id: 'projects', title: 'Projects' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Resume Builder</h1>
        <p className="mt-2 text-gray-600">Create and manage your professional resumes</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Saved Resumes */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-soft p-6">
            <h2 className="text-xl font-semibold mb-4">My Resumes</h2>
            
            <div className="space-y-4">
              <div className="p-4 border border-gray-200 rounded-lg hover:border-primary-300 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex items-center">
                    <FileText size={20} className="text-primary-600 mr-3" />
                    <div>
                      <h3 className="font-medium">Software Engineer</h3>
                      <p className="text-sm text-gray-500">Last updated: 2 days ago</p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button className="p-1 text-gray-400 hover:text-primary-600">
                      <Eye size={16} />
                    </button>
                    <button className="p-1 text-gray-400 hover:text-primary-600">
                      <Edit2 size={16} />
                    </button>
                    <button className="p-1 text-gray-400 hover:text-error-600">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>

              <button className="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-primary-300 hover:text-primary-600 transition-colors flex items-center justify-center">
                <Plus size={20} className="mr-2" />
                Create New Resume
              </button>
            </div>
          </div>
        </div>

        {/* Resume Editor */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-soft p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Resume Editor</h2>
              <div className="flex space-x-3">
                <button className="btn btn-outline text-sm py-1.5">
                  <Eye size={16} className="mr-2" />
                  Preview
                </button>
                <button className="btn btn-primary text-sm py-1.5">
                  <Download size={16} className="mr-2" />
                  Download PDF
                </button>
              </div>
            </div>

            {/* Section Navigation */}
            <div className="flex space-x-2 mb-6 overflow-x-auto pb-2">
              {sections.map(section => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap ${
                    activeSection === section.id
                      ? 'bg-primary-100 text-primary-700'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {section.title}
                </button>
              ))}
            </div>

            {/* Section Content */}
            <div className="space-y-6">
              {activeSection === 'personal' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name
                    </label>
                    <input type="text" className="input" placeholder="John Doe" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Professional Title
                    </label>
                    <input type="text" className="input" placeholder="Software Engineer" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <input type="email" className="input" placeholder="john@example.com" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone
                    </label>
                    <input type="tel" className="input" placeholder="(123) 456-7890" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Location
                    </label>
                    <input type="text" className="input" placeholder="City, State" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Professional Summary
                    </label>
                    <textarea
                      className="input min-h-[100px]"
                      placeholder="Write a brief professional summary..."
                    ></textarea>
                  </div>
                </div>
              )}

              {activeSection === 'education' && (
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-medium">Education History</h3>
                    <button className="btn btn-outline text-sm py-1.5">
                      <Plus size={16} className="mr-1" />
                      Add Education
                    </button>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="p-4 border border-gray-200 rounded-lg">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <input
                            type="text"
                            className="input"
                            placeholder="Institution Name"
                          />
                          <input
                            type="text"
                            className="input mt-2"
                            placeholder="Degree & Major"
                          />
                        </div>
                        <button className="text-gray-400 hover:text-error-600">
                          <Trash2 size={16} />
                        </button>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <input
                          type="text"
                          className="input"
                          placeholder="Start Date"
                        />
                        <input
                          type="text"
                          className="input"
                          placeholder="End Date (or Expected)"
                        />
                      </div>
                      <input
                        type="text"
                        className="input mt-4"
                        placeholder="GPA (optional)"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Save Button */}
              <div className="mt-8 flex justify-end">
                <button className="btn btn-primary">
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeBuilder;