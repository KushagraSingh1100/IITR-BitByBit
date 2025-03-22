import React, { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import CreateIcon from '@mui/icons-material/Create';
import Navbar from './Navbar';
import Navbaremp from './Navbaremp';

function HelpCenter({ userType = 'freelancer' }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [showTicketForm, setShowTicketForm] = useState(false);
  const [ticketForm, setTicketForm] = useState({
    subject: '',
    description: '',
    priority: 'normal',
    type: 'technical'
  });

  const handleSubmitTicket = (e) => {
    e.preventDefault();
    // Here you would typically send the ticket data to your backend
    console.log('Ticket submitted:', ticketForm);
    setShowTicketForm(false);
    // Reset form
    setTicketForm({
      subject: '',
      description: '',
      priority: 'normal',
      type: 'technical'
    });
  };

  return (
    <div className="min-h-screen bg-neutral-900">
      {/* Conditional Navbar */}
      {userType === 'freelancer' ? <Navbar /> : <Navbaremp />}

      {/* Header Section */}
      <div className="bg-teal-800 p-8 pb-16">
        <h1 className="text-3xl font-bold text-white mb-4">Help Center</h1>
        <div className="max-w-2xl mx-auto">
          <div className="relative">
            <SearchIcon className="absolute left-4 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Search articles"
              className="w-full pl-12 pr-4 py-3 rounded-full bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-4 -mt-8">
        <div className="bg-neutral-800 rounded-lg shadow-lg p-6 mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-white">Support Tickets</h2>
            <button
              onClick={() => setShowTicketForm(true)}
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-full flex items-center gap-2"
            >
              <CreateIcon /> Create Ticket
            </button>
          </div>

          {/* Ticket Form */}
          {showTicketForm && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
              <div className="bg-neutral-800 rounded-lg p-6 w-full max-w-md">
                <h3 className="text-xl font-semibold text-white mb-4">Create Support Ticket</h3>
                <form onSubmit={handleSubmitTicket}>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-gray-300 mb-2">Subject</label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 bg-neutral-700 text-white rounded border border-neutral-600 focus:outline-none focus:border-green-500"
                        value={ticketForm.subject}
                        onChange={(e) => setTicketForm({...ticketForm, subject: e.target.value})}
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-gray-300 mb-2">Description</label>
                      <textarea
                        className="w-full px-3 py-2 bg-neutral-700 text-white rounded border border-neutral-600 focus:outline-none focus:border-green-500 h-32"
                        value={ticketForm.description}
                        onChange={(e) => setTicketForm({...ticketForm, description: e.target.value})}
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-gray-300 mb-2">Priority</label>
                      <select
                        className="w-full px-3 py-2 bg-neutral-700 text-white rounded border border-neutral-600 focus:outline-none focus:border-green-500"
                        value={ticketForm.priority}
                        onChange={(e) => setTicketForm({...ticketForm, priority: e.target.value})}
                      >
                        <option value="low">Low</option>
                        <option value="normal">Normal</option>
                        <option value="high">High</option>
                        <option value="urgent">Urgent</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-gray-300 mb-2">Type</label>
                      <select
                        className="w-full px-3 py-2 bg-neutral-700 text-white rounded border border-neutral-600 focus:outline-none focus:border-green-500"
                        value={ticketForm.type}
                        onChange={(e) => setTicketForm({...ticketForm, type: e.target.value})}
                      >
                        <option value="technical">Technical Issue</option>
                        <option value="billing">Billing</option>
                        <option value="account">Account</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>
                  <div className="flex justify-end gap-3 mt-6">
                    <button
                      type="button"
                      onClick={() => setShowTicketForm(false)}
                      className="px-4 py-2 text-gray-300 hover:text-white"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded"
                    >
                      Submit Ticket
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Empty State */}
          <div className="text-center py-8">
            <p className="text-gray-400">No active support tickets</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HelpCenter;