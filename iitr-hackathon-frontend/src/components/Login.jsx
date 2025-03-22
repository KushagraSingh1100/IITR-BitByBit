import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import GoogleIcon from '@mui/icons-material/Google';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

// Your Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBOFqQeIKL9pgtJUzgLWf9DGyoOSPCp1xA",
    authDomain: "freelancer-53d5b.firebaseapp.com",
    projectId: "freelancer-53d5b",
    storageBucket: "freelancer-53d5b.firebasestorage.app",
    messagingSenderId: "866083910439",
    appId: "1:866083910439:web:69af3cc1b9b10de1ddaf02",
    measurementId: "G-XDRYNEWJRP"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

function Login() {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add regular email login logic here
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const user = result.user;

      // Store user info in localStorage
      localStorage.setItem('user', JSON.stringify({
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL
      }));

      // Navigate to home page or dashboard
      navigate('/');
      
    } catch (error) {
      console.error("Google login error:", error);
      alert(`Login failed: ${error.message}`);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Logo */}
      <div className="p-8">
        <div 
          className="text-2xl font-bold cursor-pointer"
          onClick={() => navigate('/')}
        >
          FreeWork
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center pt-8">
        <div className="w-full max-w-md px-6">
          <h1 className="text-3xl font-normal text-center mb-8">
            Log in to FreeWork
          </h1>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Username or Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 pl-12 border rounded focus:outline-none focus:border-green-500"
              />
              <PersonOutlineIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            </div>

            <button
              type="submit"
              className="w-full bg-green-600 text-white py-3 rounded font-medium hover:bg-green-700"
            >
              Continue
            </button>
          </form>

          <div className="text-center my-4 text-gray-500">or</div>

          {/* Google OAuth Button */}
          <div>
            <button 
              onClick={handleGoogleLogin}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 border rounded hover:bg-gray-50"
            >
              <GoogleIcon />
              Continue with Google
            </button>
          </div>

          {/* Sign Up Link */}
          <div className="mt-8 text-center">
            <p className="text-gray-600">
              Don't have an FreeWork account?
            </p>
            <Link 
              to="/join"
              className="text-green-600 hover:underline font-medium mt-2 inline-block"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-neutral-900 text-gray-400 py-6 mt-16 text-center text-sm">
        <div className="max-w-md mx-auto px-6">
          <p>© 2015 - 2025 FreeWork® Global Inc.</p>
          <div className="flex justify-center gap-4 mt-2">
            <Link to="/privacy-policy" className="hover:text-white">Privacy Policy</Link>
            <span>•</span>
            <button className="hover:text-white">Cookie Settings</button>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Login;
