import React, { useState } from 'react';
import {  X, Camera, Settings } from 'lucide-react';

const PopXApp = () => {
  const [screen, setScreen] = useState('home');
  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    emailAddress: '',
    password: '',
    companyName: '',
    isAgency: false,
    profilePicture: null
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : 
              type === 'file' ? files[0] : 
              value
    }));
  };

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prevState => ({
          ...prevState,
          profilePicture: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveProfilePicture = () => {
    setFormData(prevState => ({
      ...prevState,
      profilePicture: null
    }));
  };

  const handleCreateAccount = () => {
    // Basic validation
    if (!formData.fullName || !formData.phoneNumber || !formData.emailAddress || !formData.password) {
      alert('Please fill all required fields');
      return;
    }
    // Simulating account creation
    setScreen('account-settings');
  };

  const handleLogin = () => {
    // Basic login validation
    if (!formData.emailAddress || !formData.password) {
      alert('Please enter email and password');
      return;
    }
    // Simulating login
    setScreen('account-settings');
  };

  const renderScreen = () => {
    switch (screen) {
      case 'home':
        return (
          <div className="flex items-center justify-center min-h-screen bg-gray-50">
            <div className="w-80 bg-white shadow-md rounded-lg p-6 text-center">
              <h1 className="text-2xl font-bold mb-4 text-gray-800">Welcome to PopX</h1>
              <p className="text-gray-500 mb-6 text-sm">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </p>
              <button 
                onClick={() => setScreen('create-account')}
                className="w-full py-3 mb-4 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                Create Account
              </button>
              <button 
                onClick={() => setScreen('login')}
                className="w-full py-3 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors"
              >
                Already Registered? Login
              </button>
            </div>
          </div>
        );
      
      case 'create-account':
        return (
          <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
            <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6">
              <h1 className="text-2xl font-bold mb-4 text-gray-800">Create your PopX account</h1>
              <div className="space-y-4">
                {/* Profile Picture Upload */}
                <div className="flex justify-center mb-4">
                  <div className="relative">
                    {formData.profilePicture ? (
                      <div className="relative">
                        <img 
                          src={formData.profilePicture} 
                          alt="Profile" 
                          className="w-24 h-24 rounded-full object-cover"
                        />
                        <button 
                          onClick={handleRemoveProfilePicture}
                          className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    ) : (
                      <label className="flex flex-col items-center cursor-pointer">
                        <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center">
                          <Camera size={32} className="text-gray-500" />
                        </div>
                        <input 
                          type="file" 
                          accept="image/*"
                          onChange={handleProfilePictureChange}
                          className="hidden"
                        />
                        <span className="text-purple-600 mt-2">Upload Profile Picture</span>
                      </label>
                    )}
                  </div>
                </div>

                {/* Form Fields */}
                <div>
                  <label className="text-purple-600 text-sm">Full Name*</label>
                  <input 
                    type="text" 
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="Marry Doe" 
                    className="w-full p-2 border rounded mt-1"
                  />
                </div>
                <div>
                  <label className="text-purple-600 text-sm">Phone number*</label>
                  <input 
                    type="tel" 
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    placeholder="Marry Doe" 
                    className="w-full p-2 border rounded mt-1"
                  />
                </div>
                <div>
                  <label className="text-purple-600 text-sm">Email address*</label>
                  <input 
                    type="email" 
                    name="emailAddress"
                    value={formData.emailAddress}
                    onChange={handleInputChange}
                    placeholder="Marry Doe" 
                    className="w-full p-2 border rounded mt-1"
                  />
                </div>
                <div>
                  <label className="text-purple-600 text-sm">Password*</label>
                  <input 
                    type="password" 
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Marry Doe" 
                    className="w-full p-2 border rounded mt-1"
                  />
                </div>
                <div>
                  <label className="text-purple-600 text-sm">Company name</label>
                  <input 
                    type="text" 
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleInputChange}
                    placeholder="Marry Doe" 
                    className="w-full p-2 border rounded mt-1"
                  />
                </div>
                <div>
                  <label className="text-purple-600 text-sm">Are you an Agency?</label>
                  <div className="flex items-center mt-1">
                    <input 
                      type="radio" 
                      name="isAgency"
                      checked={formData.isAgency === true}
                      onChange={() => setFormData(prev => ({...prev, isAgency: true}))}
                      className="mr-2" 
                    />
                    <span className="mr-4">Yes</span>
                    <input 
                      type="radio" 
                      name="isAgency"
                      checked={formData.isAgency === false}
                      onChange={() => setFormData(prev => ({...prev, isAgency: false}))}
                      className="mr-2" 
                    />
                    <span>No</span>
                  </div>
                </div>
                <button 
                  onClick={handleCreateAccount}
                  className="w-full py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors mt-4"
                >
                  Create Account
                </button>
              </div>
            </div>
          </div>
        );
      
      case 'login':
        return (
          <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
            <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6">
              <h1 className="text-2xl font-bold mb-2 text-gray-800">Signin to your PopX account</h1>
              <p className="text-gray-500 mb-6 text-sm">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </p>
              <div className="space-y-4">
                <div>
                  <label className="text-purple-600 text-sm">Email Address</label>
                  <input 
                    type="email" 
                    name="emailAddress"
                    value={formData.emailAddress}
                    onChange={handleInputChange}
                    placeholder="Enter email address" 
                    className="w-full p-2 border rounded mt-1"
                  />
                </div>
                <div>
                  <label className="text-purple-600 text-sm">Password</label>
                  <input 
                    type="password" 
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Enter password" 
                    className="w-full p-2 border rounded mt-1"
                  />
                </div>
                <button 
                  onClick={handleLogin}
                  className="w-full py-3 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition-colors mt-4"
                >
                  Login
                </button>
              </div>
            </div>
          </div>
        );
      
      case 'account-settings':
        return (
          <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
            <div className="w-full max-w-md bg-white shadow-md rounded-lg">
              <div className="flex items-center justify-between p-4 border-b">
                <div className="flex items-center space-x-2">
                  <Settings size={20} className="text-gray-600" />
                  <h1 className="text-lg font-semibold">Account Settings</h1>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center mb-6">
                  <div className="relative mr-4">
                    <img 
                      src={formData.profilePicture || "/api/placeholder/100/100"} 
                      alt="Profile" 
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div className="absolute bottom-0 right-0 bg-purple-600 text-white rounded-full w-6 h-6 flex items-center justify-center">
                      <Settings size={16} />
                    </div>
                  </div>
                  <div>
                    <h2 className="text-xl font-bold">Marry Doe</h2>
                    <p className="text-gray-500 text-sm">Marry@Gmail.Com</p>
                  </div>
                </div>
                <div className="bg-gray-100 p-4 rounded-lg mb-4">
                  <p className="text-gray-700">
                    Lorem Ipsum Dolor Sit Amet, Consectetur Sadipscing Elit, Sed Diam Nonumy Eirmad Tempad Invidunt Ut Labore Et Dolore Magna Aliquam Erat, Sed Diam
                  </p>
                </div>
                <button 
                  onClick={() => setScreen('home')}
                  className="w-full py-3 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div>
      {renderScreen()}
    </div>
  );
};

export default PopXApp;