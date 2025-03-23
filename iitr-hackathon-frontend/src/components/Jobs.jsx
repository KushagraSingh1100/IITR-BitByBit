import React, { useState, useEffect } from "react";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import CloseIcon from "@mui/icons-material/Close";

function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastRefresh, setLastRefresh] = useState(Date.now());
  const [showMilestonesModal, setShowMilestonesModal] = useState(false);
  const [milestones, setMilestones] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [uploading, setUploading] = useState(false);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:8001/jobs');
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
      const response = await fetch(`http://localhost:8001/freework/milestones/${projectId}`);
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

  const handleMilestoneComplete = async (milestoneId) => {
    try {
      const response = await fetch(`http://localhost:8001/freework/milestone/complete/${milestoneId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to complete milestone');
      }

      // Refresh milestones after completion
      if (selectedJob) {
        await fetchMilestones(selectedJob._id);
      }
      alert('Milestone marked as completed!');
    } catch (error) {
      console.error('Error completing milestone:', error);
      alert('Failed to complete milestone: ' + error.message);
    }
  };

  const handleWithdrawPayment = async (milestoneId) => {
    try {
      const freelancerId = localStorage.getItem('userId') || "67de4ffede33d66551a62e8b"; // Using default ID for testing
      const response = await fetch('http://localhost:8001/freework/payment/withdraw', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          freelancerId,
          milestoneId
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to withdraw payment');
      }

      const data = await response.json();
      alert('Payment withdrawal successful! Transaction ID: ' + data.transactionId);
      
      // Refresh milestones after withdrawal
      if (selectedJob) {
        await fetchMilestones(selectedJob._id);
      }
    } catch (error) {
      console.error('Error withdrawing payment:', error);
      alert('Failed to withdraw payment: ' + error.message);
    }
  };

  const handleViewMilestones = async () => {
    if (!selectedJob) {
      alert('Please select a job first');
      return;
    }
    await fetchMilestones(selectedJob._id);
    setShowMilestonesModal(true);
  };

  const handleImageUpload = async (milestoneId) => {
    if (!selectedImage) {
      alert('Please select an image first');
      return;
    }

    try {
      setUploading(true);
      
      // Create FormData for image upload
      const formData = new FormData();
      formData.append('image', selectedImage);
      formData.append('milestoneId', milestoneId);

      // Upload image to server
      const uploadResponse = await fetch('http://localhost:8001/freework/milestone/upload', {
        method: 'POST',
        body: formData,
      });

      if (!uploadResponse.ok) {
        throw new Error('Failed to upload image');
      }

      const uploadData = await uploadResponse.json();
      
      // Update local state to show submission
      setMilestones(prevMilestones => 
        prevMilestones.map(milestone => 
          milestone._id === milestoneId 
            ? { 
                ...milestone, 
                status: 'submitted',
                submission: uploadData.imageUrl
              }
            : milestone
        )
      );
      
      alert('Work submitted successfully! Waiting for employer review.');
      setSelectedImage(null);
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Failed to upload work: ' + error.message);
    } finally {
      setUploading(false);
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
    <div className="jobs-card flex flex-col border-neutral-600 w-[75%] h-[100%] border-1 rounded-2xl">
      <div className="job-top border-b-1 flex flex-row justify-between p-5 pb-8 border-neutral-700">
        <div className="top-left flex flex-col gap-3 w-98 h-18">
          <div className="top">
            <h1 className="text-white text-3xl">Jobs for you</h1>
          </div>
          <div className="bottom gap-5 flex flex-row text-white">
            <button
              className="border-1 p-2 px-3 text-[0.8vw] rounded-2xl"
              type="button"
            >
              Best Matches
            </button>
            <button
              className="border-1 p-2 px-3 text-[0.8vw] rounded-2xl"
              type="button"
            >
              Current Jobs
            </button>
            <button
              className="border-1 p-2 px-3 text-[0.8vw] rounded-2xl"
              type="button"
            >
              Saved Jobs
            </button>
          </div>
        </div>
      </div>

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
                <button
                  onClick={handleViewMilestones}
                  className="bg-blue-700 text-white px-4 py-2 text-sm rounded-lg hover:bg-blue-600 transition-colors"
                >
                  View Milestones
                </button>
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
                <button className="mt-3 bg-green-700 text-white text-[0.8vw] p-3 rounded-2xl">Apply for the job</button>
              </div>
            </>
          ) : (
            <div className="text-white">Select a job to view details</div>
          )}
        </div>
      </div>

      {showMilestonesModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-neutral-800 p-6 rounded-lg w-[600px] max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-white text-xl">Project Milestones</h2>
              <button onClick={() => setShowMilestonesModal(false)} className="text-white">
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
                        {milestone.status === "pending" && (
                          <div className="flex flex-col gap-2">
                            <label className="text-white text-sm">
                              Choose File (Optional):
                              <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => {
                                  console.log('File selected:', e.target.files[0]);
                                  setSelectedImage(e.target.files[0]);
                                }}
                                className="text-white text-sm mt-1 w-full"
                              />
                            </label>
                            <div className="flex gap-2">
                              <button
                                onClick={() => {
                                  if (selectedImage) {
                                    handleImageUpload(milestone._id);
                                  } else {
                                    // Just mark as submitted without image
                                    setMilestones(prevMilestones => 
                                      prevMilestones.map(m => 
                                        m._id === milestone._id 
                                          ? { ...m, status: 'submitted' }
                                          : m
                                      )
                                    );
                                    alert('Work marked as completed! Waiting for employer review.');
                                  }
                                }}
                                className="bg-blue-700 text-white px-3 py-1 rounded hover:bg-blue-600 transition-colors"
                              >
                                {selectedImage ? 'Upload Work' : 'Mark Complete'}
                              </button>
                            </div>
                          </div>
                        )}
                        {milestone.status === "approved" && (
                          <button
                            onClick={() => handleWithdrawPayment(milestone._id)}
                            className="bg-green-700 text-white px-3 py-1 rounded hover:bg-green-600 transition-colors"
                          >
                            Withdraw Payment
                          </button>
                        )}
                        {milestone.status === "rejected" && (
                          <div className="flex flex-col gap-2">
                            <label className="text-white text-sm">
                              Choose File:
                              <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => setSelectedImage(e.target.files[0])}
                                className="text-white text-sm mt-1 w-full"
                              />
                            </label>
                            <button
                              onClick={() => handleImageUpload(milestone._id)}
                              className="bg-blue-700 text-white px-3 py-1 rounded hover:bg-blue-600 transition-colors"
                            >
                              Resubmit Work
                            </button>
                          </div>
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
    </div>
  );
}

export default Jobs;
