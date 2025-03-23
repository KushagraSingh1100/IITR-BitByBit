import React, { useState, useEffect } from "react";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import CloseIcon from "@mui/icons-material/Close";
import Navbaremp from "./Navbaremp";

const Employee = () => {
  const [showModal, setShowModal] = useState(false);
  const [showMilestoneModal, setShowMilestoneModal] = useState(false);
  const [showViewMilestonesModal, setShowViewMilestonesModal] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastRefresh, setLastRefresh] = useState(Date.now());
  const [newJob, setNewJob] = useState({
    projectname: "",
    description: "",
    amount: "",
    deadline: "",
    tags: "",
    difficulty: "beginner",
    completeStatus: false,
    assignedfreelancerid: null,
    proposals: 0,
  });

  const [newMilestone, setNewMilestone] = useState({
    projectId: "",
    title: "",
    amount: "",
    employerId: "", // This will be set when creating a milestone
  });

  const [milestones, setMilestones] = useState([]);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const response = await fetch('https://iitr-hackathon-backend.onrender.com/jobs');
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch jobs');
      }
      const data = await response.json();
      console.log('Fetched jobs:', data);
      const jobsArray = data.allJobs || [];
      setJobs(jobsArray);
      if (jobsArray.length > 0 && !selectedJob) {
        setSelectedJob(jobsArray[0]);
      }
    } catch (error) {
      console.error('Error fetching jobs:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchMilestones = async (projectId) => {
    try {
      const response = await fetch(`https://iitr-hackathon-backend.onrender.com/freework/milestones/${projectId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch milestones');
      }
      const data = await response.json();
      setMilestones(data.milestones || []);
    } catch (error) {
      console.error('Error fetching milestones:', error);
      alert('Failed to fetch milestones: ' + error.message);
    }
  };

  // Fetch jobs on component mount and when lastRefresh changes
  useEffect(() => {
    fetchJobs();
  }, [lastRefresh]);

  // Refresh jobs every 30 seconds
  useEffect(() => {
    const intervalId = setInterval(() => {
      setLastRefresh(Date.now());
    }, 30000);

    return () => clearInterval(intervalId);
  }, []);

  const handleRefresh = () => {
    setLastRefresh(Date.now());
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewJob(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Format the data to match the schema
      const formattedData = {
        projectname: newJob.projectname,
        description: newJob.description,
        amount: Number(newJob.amount),
        deadline: new Date(newJob.deadline).toISOString(),
        tags: newJob.tags.split(',').map(tag => tag.trim()).filter(tag => tag), // Remove empty tags
        difficulty: newJob.difficulty,
        completeStatus: false,
        assignedfreelancerid: null,
        proposals: 0, // Ensure proposals is a number
        milestones: {} // Add empty milestones object as per schema
      };

      console.log('Sending data:', formattedData); // Debug log

      const response = await fetch('https://iitr-hackathon-backend.onrender.com/create/project', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formattedData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create job');
      }

      const result = await response.json();
      console.log('Job created:', result);

      setShowModal(false);
      // Reset form
      setNewJob({
        projectname: "",
        description: "",
        amount: "",
        deadline: "",
        tags: "",
        difficulty: "beginner",
        completeStatus: false,
        assignedfreelancerid: null,
        proposals: 0,
      });
      
      // Refresh the job list
      handleRefresh();
      alert('Job created successfully!');
    } catch (error) {
      console.error('Error creating job:', error);
      alert('Failed to create job: ' + error.message);
    }
  };

  const handleMilestoneInputChange = (e) => {
    const { name, value } = e.target;
    setNewMilestone(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleMilestoneSubmit = async (e) => {
    e.preventDefault();
    
    // For testing, use a default employer ID
    const employerId = "67de4ffede33d66551a62e8b";

    if (!selectedJob || !selectedJob._id) {
      alert('Please select a job first');
      return;
    }

    try {
      const formattedData = {
        projectId: selectedJob._id,
        employerId: employerId,
        title: newMilestone.title,
        amount: Number(newMilestone.amount)
      };

      // Validate all required fields
      if (!formattedData.projectId || !formattedData.employerId || !formattedData.title || !formattedData.amount) {
        throw new Error('All fields are required. Please fill in all fields.');
      }

      console.log('Sending milestone data:', formattedData); // Debug log

      const response = await fetch('http://localhost:8001/freework/milestone', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formattedData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create milestone');
      }

      const result = await response.json();
      console.log('Milestone created:', result);

      setShowMilestoneModal(false);
      // Reset form
      setNewMilestone({
        projectId: "",
        title: "",
        amount: "",
        employerId: "",
      });
      
      alert('Milestone created successfully!');
    } catch (error) {
      console.error('Error creating milestone:', error);
      alert('Failed to create milestone: ' + error.message);
    }
  };

  const handleViewMilestones = async () => {
    if (!selectedJob) {
      alert('Please select a job first');
      return;
    }
    await fetchMilestones(selectedJob._id);
    setShowViewMilestonesModal(true);
  };

  const handlePayment = async (milestoneId) => {
    try {
      const employerId = "67de4ffede33d66551a62e8b"; // Using the default employer ID for testing
      
      // First, create the payment link
      const response = await fetch('http://localhost:8001/freework/payment/deposit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          employerId,
          milestoneId
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create payment link');
      }

      const data = await response.json();
      if (data.paymentLink) {
        // Open payment link in new window
        window.open(data.paymentLink, '_blank');
        
        // Show success message
        alert('Payment link opened. Please complete the payment in the new window.');
        
        // Update local state to show payment is in progress
        setMilestones(prevMilestones => 
          prevMilestones.map(milestone => 
            milestone._id === milestoneId 
              ? { ...milestone, status: 'payment_in_progress' }
              : milestone
          )
        );

        // Update milestone status in database
        const updateResponse = await fetch(`http://localhost:8001/freework/milestone/update/${milestoneId}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            status: 'funded',
            escrowFunded: true
          }),
        });

        if (!updateResponse.ok) {
          throw new Error('Failed to update milestone status');
        }

        // Update local state
        setMilestones(prevMilestones => 
          prevMilestones.map(milestone => 
            milestone._id === milestoneId 
              ? { ...milestone, status: 'funded', escrowFunded: true }
              : milestone
          )
        );
        
        alert('Payment confirmed! Milestone is now funded.');
      } else {
        alert('Payment link not available');
      }
    } catch (error) {
      console.error('Error creating payment:', error);
      alert('Failed to create payment: ' + error.message);
    }
  };

  const handleMilestoneApprove = async (milestoneId) => {
    try {
      // Update local state only
      setMilestones(prevMilestones => 
        prevMilestones.map(milestone => 
          milestone._id === milestoneId 
            ? { ...milestone, status: 'approved' }
            : milestone
        )
      );
      alert('Milestone approved successfully! Payment will be released to the freelancer.');
    } catch (error) {
      console.error('Error approving milestone:', error);
      alert('Failed to approve milestone: ' + error.message);
    }
  };

  const handleMilestoneReject = async (milestoneId) => {
    try {
      // Update local state only
      setMilestones(prevMilestones => 
        prevMilestones.map(milestone => 
          milestone._id === milestoneId 
            ? { ...milestone, status: 'rejected' }
            : milestone
        )
      );
      alert('Milestone rejected. Freelancer can resubmit the work.');
    } catch (error) {
      console.error('Error rejecting milestone:', error);
      alert('Failed to reject milestone: ' + error.message);
    }
  };

  if (loading) {
    return <div className="text-white">Loading...</div>;
  }

  if (error) {
    return (
      <div className="text-white">
        Error: {error}
        <button 
          onClick={handleRefresh}
          className="ml-4 bg-green-700 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="employee-page bg-neutral-900">
      <Navbaremp />
      <div className="jobs-card flex flex-col h-[91.3vh] bg-neutral-900 w-[100%] border-neutral-600 w-[75%] border-1 rounded-2xl">
        <div className="job-top border-b-1 flex flex-row justify-between p-5 pb-8 border-neutral-700">
          <div className="top-left flex flex-col gap-3 w-98 h-18">
            <div className="top flex justify-between items-center">
              <h1 className="text-white text-3xl">Available Talent</h1>
              <button
                onClick={() => setShowModal(true)}
                className="bg-green-700 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
              >
                Create Job
              </button>
            </div>
            <div className="bottom gap-5 flex flex-row text-white">
              <button
                className="border-1 p-2 px-3 text-[0.8vw] rounded-2xl"
                type="button"
              >
                Top Rated
              </button>
              <button
                className="border-1 p-2 px-3 text-[0.8vw] rounded-2xl"
                type="button"
              >
                Recently Active
              </button>
              <button
                className="border-1 p-2 px-3 text-[0.8vw] rounded-2xl"
                type="button"
              >
                Shortlisted
              </button>
            </div>
          </div>
        </div>

        {/* Create Job Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-neutral-800 p-6 rounded-lg w-[500px]">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-white text-xl">Create New Job</h2>
                <button onClick={() => setShowModal(false)} className="text-white">
                  <CloseIcon />
                </button>
              </div>
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input
                  type="text"
                  name="projectname"
                  value={newJob.projectname}
                  onChange={handleInputChange}
                  placeholder="Project Name"
                  className="bg-neutral-700 text-white p-2 rounded"
                  required
                />
                <textarea
                  name="description"
                  value={newJob.description}
                  onChange={handleInputChange}
                  placeholder="Description"
                  className="bg-neutral-700 text-white p-2 rounded h-24"
                  required
                />
                <input
                  type="number"
                  name="amount"
                  value={newJob.amount}
                  onChange={handleInputChange}
                  placeholder="Budget Amount"
                  className="bg-neutral-700 text-white p-2 rounded"
                  required
                />
                <input
                  type="datetime-local"
                  name="deadline"
                  value={newJob.deadline}
                  onChange={handleInputChange}
                  className="bg-neutral-700 text-white p-2 rounded"
                  required
                />
                <input
                  type="text"
                  name="tags"
                  value={newJob.tags}
                  onChange={handleInputChange}
                  placeholder="Tags (comma-separated)"
                  className="bg-neutral-700 text-white p-2 rounded"
                  required
                />
                <select
                  name="difficulty"
                  value={newJob.difficulty}
                  onChange={handleInputChange}
                  className="bg-neutral-700 text-white p-2 rounded"
                  required
                >
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="professional">Professional</option>
                </select>
                <button
                  type="submit"
                  className="bg-green-700 text-white p-2 rounded hover:bg-green-600 transition-colors"
                >
                  Create Job
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Milestone Creation Modal */}
        {showMilestoneModal && selectedJob && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-neutral-800 p-6 rounded-lg w-[500px]">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-white text-xl">Create New Milestone</h2>
                <button onClick={() => setShowMilestoneModal(false)} className="text-white">
                  <CloseIcon />
                </button>
              </div>
              <form onSubmit={handleMilestoneSubmit} className="flex flex-col gap-4">
                <input
                  type="text"
                  name="title"
                  value={newMilestone.title}
                  onChange={handleMilestoneInputChange}
                  placeholder="Milestone Title"
                  className="bg-neutral-700 text-white p-2 rounded"
                  required
                />
                <input
                  type="number"
                  name="amount"
                  value={newMilestone.amount}
                  onChange={handleMilestoneInputChange}
                  placeholder="Amount"
                  className="bg-neutral-700 text-white p-2 rounded"
                  required
                />
                <div className="text-neutral-400 text-sm">
                  <p>Project ID: {selectedJob._id}</p>
                  <p>Employer ID: 67de4ffede33d66551a62e8b</p>
                </div>
                <button
                  type="submit"
                  className="bg-green-700 text-white p-2 rounded hover:bg-green-600 transition-colors"
                >
                  Create Milestone
                </button>
              </form>
            </div>
          </div>
        )}

        {/* View Milestones Modal */}
        {showViewMilestonesModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-neutral-800 p-6 rounded-lg w-[600px] max-h-[80vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-white text-xl">Project Milestones</h2>
                <button onClick={() => setShowViewMilestonesModal(false)} className="text-white">
                  <CloseIcon />
                </button>
              </div>
              <div className="flex flex-col gap-4">
                {milestones.length > 0 ? (
                  milestones.map((milestone) => (
                    <div key={milestone._id} className="bg-neutral-700 p-4 rounded-lg">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-white text-lg">{milestone.title}</h3>
                          <p className="text-neutral-400">Amount: ${milestone.amount}</p>
                          <p className={`text-neutral-400 ${
                            milestone.status === 'approved' ? 'text-green-500' : 
                            milestone.status === 'rejected' ? 'text-red-500' : 
                            milestone.status === 'submitted' ? 'text-yellow-500' :
                            'text-neutral-400'
                          }`}>
                            Status: {milestone.status}
                          </p>
                          {milestone.submission && (
                            <div className="mt-2">
                              <p className="text-neutral-400">Submitted Work:</p>
                              <img 
                                src={milestone.submission} 
                                alt="Submitted work" 
                                className="mt-1 max-w-[200px] rounded"
                              />
                            </div>
                          )}
                        </div>
                        <div className="flex gap-2">
                          {milestone.status === "submitted" && (
                            <>
                              <button
                                onClick={() => handleMilestoneApprove(milestone._id)}
                                className="bg-green-700 text-white px-3 py-1 rounded hover:bg-green-600 transition-colors"
                              >
                                Approve
                              </button>
                              <button
                                onClick={() => handleMilestoneReject(milestone._id)}
                                className="bg-red-700 text-white px-3 py-1 rounded hover:bg-red-600 transition-colors"
                              >
                                Reject
                              </button>
                            </>
                          )}
                          {milestone.status === "approved" && (
                            <button
                              onClick={() => handlePayment(milestone._id)}
                              className="bg-blue-700 text-white px-3 py-1 rounded hover:bg-blue-600 transition-colors"
                            >
                              Add Payment
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-white">No milestones found for this project.</p>
                )}
              </div>
            </div>
          </div>
        )}

        <div className="job-bottom flex flex-row overflow-hidden">
          <div className="jobs-left overflow-y-scroll pb-72 text-white w-[35vw] h-[100vh] flex flex-col">
            {Array.isArray(jobs) && jobs.length > 0 ? (
              jobs.map((job, index) => (
                <div 
                  key={job._id || index}
                  className={`listing flex px-5 py-3 flex-col gap-2 border-[0.1vw] border-neutral-700 ${
                    selectedJob?._id === job._id ? 'border-l-white' : ''
                  }`}
                  onClick={() => setSelectedJob(job)}
                >
                  <div className="listing-name flex justify-between flex-row">
                    <div className="listing-heading w-84">
                      <h1>{job.projectname}</h1>
                    </div>
                    <div className="listing-name-buttons gap-4 flex flex-row">
                      <div className="like text-green-500">
                        <FavoriteBorderIcon />
                      </div>
                      <div className="remove">
                        <button>
                          <CloseIcon />
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="listing-pricing">
                    <p className="text-neutral-500 text-[0.9vw]">
                      Budget: ${job.amount} • {job.difficulty} • {job.proposals} proposals
                    </p>
                  </div>
                  <div className="listing-proposal">
                    <p className="text-neutral-500 text-[0.9vw]">
                      Deadline: {new Date(job.deadline).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="listing-user-info">
                    <p className="text-neutral-500 text-[0.9vw]">
                      Status: {job.completeStatus ? 'Completed' : 'Open'} • {job.assignedfreelancerid ? 'Assigned' : 'Unassigned'}
                    </p>
                  </div>
                  <div className="listing-tags w-full flex flex-row gap-2">
                    {Array.isArray(job.tags) && job.tags.map((tag, idx) => (
                      <div key={idx} className="tag p-2 px-4 text-[0.8vw] rounded-2xl bg-neutral-700">
                        {tag}
                      </div>
                    ))}
                  </div>
                  <div className="listing-time text-neutral-500 text-[0.9vw]">
                    <p>Posted {new Date(job.createdAt).toLocaleDateString()}</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-white p-4">No jobs available</div>
            )}
          </div>
          <div className="jobs-right p-3 px-5 overflow-y-scroll pb-78 w-[50%] h-[100vh] flex flex-col gap-3">
            {selectedJob ? (
              <>
                <div className="job-desc-heading flex justify-between items-center">
                  <h1 className="text-white text-[1.3vw]">
                    {selectedJob.projectname}
                  </h1>
                  <div className="flex gap-2">
                    <button
                      onClick={handleViewMilestones}
                      className="bg-blue-700 text-white px-4 py-2 text-sm rounded-lg hover:bg-blue-600 transition-colors"
                    >
                      View Milestones
                    </button>
                    <button
                      onClick={() => setShowMilestoneModal(true)}
                      className="bg-green-700 text-white px-4 py-2 text-sm rounded-lg hover:bg-green-600 transition-colors"
                    >
                      Create Milestone
                    </button>
                  </div>
                </div>
                <div className="job-desc-time">
                  <p className="text-neutral-500 text-[0.9vw]">Posted {new Date(selectedJob.createdAt).toLocaleDateString()}</p>
                </div>
                <div className="job-desc">
                  <p className="text-[0.9vw] text-white w-[95%] border-b-1 pb-3 border-neutral-700">
                    {selectedJob.description}
                  </p>
                </div>
                <div className="job-desc-time">
                  <h1 className="text-white ">Budget: ${selectedJob.amount}</h1>
                  <p className="text-neutral-500 text-[0.9vw]">Fixed Price</p>
                </div>
                <div className="job-desc-deadline">
                  <h1 className="text-white ">Deadline: {new Date(selectedJob.deadline).toLocaleDateString()}</h1>
                  <p className="text-neutral-500 text-[0.9vw]">Project Deadline</p>
                </div>
                <div className="job-desc-difficulty">
                  <h1 className="text-white ">{selectedJob.difficulty}</h1>
                  <p className="text-neutral-500 text-[0.9vw]">Experience Level Required</p>
                </div>
                <div className="job-desc-price">
                  <h1 className="text-white ">{selectedJob.proposals} proposals</h1>
                  <p className="text-neutral-500 text-[0.9vw]">Current Proposals</p>
                </div>
                <div className="apply-btn">
                  <button className="mt-3 bg-green-700 text-white text-[0.8vw] p-3 rounded-2xl">Contact Freelancer</button>
                </div>
              </>
            ) : (
              <div className="text-white">Select a job to view details</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Employee;
