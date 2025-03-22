import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PersonIcon from '@mui/icons-material/Person';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';

const JoinPage = () => {
  const [selectedRole, setSelectedRole] = useState('');
  const navigate = useNavigate();

  return (
    <>
    <div 
        className="heading text-black text-2xl cursor-pointer hover:text-green-500 p-3"

      >
        FreeWork
      </div>
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4">
          
      <h1 className="text-4xl font-normal mb-12 text-center">
        Join as a client or freelancer
      </h1>

      <div className="flex flex-col md:flex-row gap-6 mb-8 w-full max-w-3xl">
        <div 
          className={`flex-1 p-6 border rounded-lg cursor-pointer hover:border-green-500 transition-all
            ${selectedRole === 'client' ? 'border-green-500' : 'border-gray-300'}`}
          onClick={() => setSelectedRole('client')}
        >
          <div className="flex justify-between items-start">
            <PersonIcon className="text-3xl" />
            {selectedRole === 'client' ? 
              <RadioButtonCheckedIcon className="text-green-500" /> : 
              <RadioButtonUncheckedIcon />
            }
          </div>
          <h2 className="text-2xl mt-4">
            I'm a client, hiring for a project
          </h2>
        </div>

        <div 
          className={`flex-1 p-6 border rounded-lg cursor-pointer hover:border-green-500 transition-all
            ${selectedRole === 'freelancer' ? 'border-green-500' : 'border-gray-300'}`}
          onClick={() => setSelectedRole('freelancer')}
        >
          <div className="flex justify-between items-start">
            <PersonIcon className="text-3xl" />
            {selectedRole === 'freelancer' ? 
              <RadioButtonCheckedIcon className="text-green-500" /> : 
              <RadioButtonUncheckedIcon />
            }
          </div>
          <h2 className="text-2xl mt-4">
            I'm a freelancer, looking for work
          </h2>
        </div>
      </div>


      <button
        className={`px-8 py-3 rounded-md text-lg mb-6 transition-all
          ${selectedRole 
            ? 'bg-green-500 text-white hover:bg-green-600' 
            : 'bg-gray-200 text-gray-500 cursor-not-allowed'}`}
        disabled={!selectedRole}
        onClick={() => navigate(`/signup/${selectedRole}`)}
      >
        Create Account
      </button>

      <div className="text-base">
        Already have an account? 
        <span 
          className="text-green-500 ml-1 cursor-pointer hover:underline"
          onClick={() => navigate('/login')}
        >
          Log In
        </span>
      </div>
    </div>
    </>
  );
};

export default JoinPage;