import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import AppleIcon from '@mui/icons-material/Apple';
import GoogleIcon from '@mui/icons-material/Google';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

function SignUpClient() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    country: 'India',
    emailConsent: true,
    termsAccepted: false
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  return (
    <div className="min-h-screen bg-white p-4">
      <div className="max-w-xl mx-auto pt-8">
        <div className="flex justify-between items-center mb-8">
          <div className="text-2xl font-bold">FreeWork</div>
          <div className="flex items-center gap-4">
            <span className="text-gray-600">Looking for work?</span>
            <Link to="/signup/freelancer" className="text-green-600 hover:underline">
              Apply as talent
            </Link>
          </div>
        </div>

        <h1 className="text-3xl font-normal mb-8 text-center">
          Sign up to hire talent
        </h1>

        {/* OAuth Buttons */}
        <div className="flex flex-col gap-3 mb-6">
          <button className="flex items-center justify-center gap-2 w-full border rounded-full py-3 hover:bg-gray-50">
            <AppleIcon /> Continue with Apple
          </button>
          <button className="flex items-center justify-center gap-2 w-full border rounded-full py-3 hover:bg-gray-50">
            <GoogleIcon /> Continue with Google
          </button>
        </div>

        <div className="text-center text-gray-500 mb-6">or</div>

        {/* Sign Up Form */}
        <form className="space-y-4">
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-sm mb-1">First name</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded focus:outline-none focus:border-green-500"
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm mb-1">Last name</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded focus:outline-none focus:border-green-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm mb-1">Work email address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:border-green-500"
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password (8 or more characters)"
                className="w-full px-3 py-2 border rounded focus:outline-none focus:border-green-500"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2"
              >
                {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm mb-1">Country</label>
            <div className="relative">
              <select
                name="country"
                value={formData.country}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded focus:outline-none focus:border-green-500 appearance-none"
              >
                <option value="India">India</option>
                {/* Add more countries as needed */}
              </select>
              <KeyboardArrowDownIcon className="absolute right-3 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          <div className="space-y-4">
            <label className="flex items-start gap-2">
              <input
                type="checkbox"
                name="emailConsent"
                checked={formData.emailConsent}
                onChange={handleChange}
                className="mt-1"
              />
              <span className="text-sm">
                Send me emails with tips on how to find talent that fits my needs.
              </span>
            </label>

            <label className="flex items-start gap-2">
              <input
                type="checkbox"
                name="termsAccepted"
                checked={formData.termsAccepted}
                onChange={handleChange}
                className="mt-1"
              />
              <span className="text-sm">
                Yes, I understand and agree to the FreeWork Terms of Service, including the 
                <Link to="/user-agreement" className="text-green-600 hover:underline mx-1">
                  User Agreement
                </Link>
                and
                <Link to="/privacy-policy" className="text-green-600 hover:underline ml-1">
                  Privacy Policy
                </Link>.
              </span>
            </label>
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-3 rounded-full hover:bg-green-700 disabled:bg-gray-300"
            disabled={!formData.termsAccepted}
          >
            Create my account
          </button>

          <div className="text-center text-sm">
            Already have an account?
            <Link to="/login" className="text-green-600 hover:underline ml-1">
              Log In
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUpClient;
