import React from 'react';
import ShieldIcon from '@mui/icons-material/Shield';

function SafetyPopup({ onConfirm }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-neutral-900 rounded-lg p-8 max-w-2xl w-full border border-stone-800">
        <div className="flex gap-6">
          {/* Left side - Image/Icon */}
          <div className="flex-shrink-0 bg-blue-600 rounded-lg p-8">
            <ShieldIcon style={{ fontSize: 100 }} className="text-white" />
          </div>

          {/* Right side - Content */}
          <div className="flex-grow">
            <h2 className="text-2xl font-bold text-white mb-4">
              Stay safe on FreeWork by following the rules
            </h2>

            <div className="space-y-4 text-gray-300">
              <p>
                Do not share personal contact information or external links before signing a contract. 
                Once a contract is in place, limit information sharing to only what is necessary.
              </p>

              <p className="font-medium">
                Payments must always be completed on FreeWork.
              </p>

              <p className="text-red-400">
                Violations of these rules will result in permanent account suspension.
              </p>

              <a href="#" className="text-green-500 hover:underline">
                Learn more
              </a>

              <div className="flex items-center gap-2 mt-4">
                <input 
                  type="checkbox" 
                  id="agreement" 
                  className="w-4 h-4 rounded border-gray-300"
                />
                <label htmlFor="agreement" className="text-gray-300">
                  I understand that I agreed to keep payments and pre-contract chats on FreeWork per the{' '}
                  <a href="#" className="text-green-500 hover:underline">
                    User Agreement
                  </a>
                  .
                </label>
              </div>
            </div>

            <button
              onClick={onConfirm}
              className="mt-6 bg-green-500 hover:bg-green-600 text-white px-8 py-2 rounded-md font-medium"
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SafetyPopup; 