import React from "react";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import CloseIcon from "@mui/icons-material/Close";
import Navbaremp from "./Navbaremp";


const Employee = () => {
  return (
    <div className="employee-page bg-neutral-900">
    <Navbaremp />
      <div className="jobs-card flex flex-col h-[91.3vh] bg-neutral-900 w-[100%] border-neutral-600 w-[75%] border-1 rounded-2xl">
      <div className="job-top border-b-1 flex flex-row justify-between p-5 pb-8 border-neutral-700">
        <div className="top-left flex flex-col gap-3 w-98 h-18">
          <div className="top">
            <h1 className="text-white text-3xl">Available Talent</h1>
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
      <div className="job-bottom flex flex-row overflow-hidden">
        <div className="jobs-left overflow-y-scroll pb-72 text-white w-[35vw] h-[100vh] flex flex-col">
          <div className="listing flex px-5 py-3 flex-col gap-2 border-[0.1vw] border-neutral-700 border-l-white">
            <div className="listing-name flex justify-between flex-row">
              <div className="listing-heading w-84">
                <h1>Senior Full Stack Developer</h1>
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
                Expected Rate: $45/hr • Available: Immediately • Experience: 5+ years
              </p>
            </div>
            <div className="listing-proposal">
              <p className="text-neutral-500 text-[0.9vw]">
                Completed Projects: 25+ • Rating: 4.9/5
              </p>
            </div>
            <div className="listing-user-info">
              <p className="text-neutral-500 text-[0.9vw]">
                Verified Profile • Top Rated • India
              </p>
            </div>
            <div className="listing-tags w-full flex flex-row gap-2">
              <div className="tag p-2 px-4 text-[0.8vw] rounded-2xl bg-neutral-700">
                React
              </div>
              <div className="tag p-2 px-4 text-[0.8vw] rounded-2xl bg-neutral-700">
                Node.js
              </div>
              <div className="tag p-2 px-4 text-[0.8vw] rounded-2xl bg-neutral-700">
                Cloud Infrastructure
              </div>
            </div>
            <div className="listing-time text-neutral-500 text-[0.9vw]">
              <p>Posted 47 minutes ago</p>
            </div>
          </div>
          <div className="listing flex px-5 py-3 flex-col gap-2 border-[0.1vw] border-neutral-700 ">
            <div className="listing-name flex justify-between flex-row">
              <div className="listing-heading w-84">
                <h1>Senior Full Stack Developer</h1>
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
                Expected Rate: $45/hr • Available: Immediately • Experience: 5+ years
              </p>
            </div>
            <div className="listing-proposal">
              <p className="text-neutral-500 text-[0.9vw]">
                Completed Projects: 25+ • Rating: 4.9/5
              </p>
            </div>
            <div className="listing-user-info">
              <p className="text-neutral-500 text-[0.9vw]">
                Verified Profile • Top Rated • India
              </p>
            </div>
            <div className="listing-tags w-full flex flex-row gap-2">
              <div className="tag p-2 px-4 text-[0.8vw] rounded-2xl bg-neutral-700">
                React
              </div>
              <div className="tag p-2 px-4 text-[0.8vw] rounded-2xl bg-neutral-700">
                Node.js
              </div>
              <div className="tag p-2 px-4 text-[0.8vw] rounded-2xl bg-neutral-700">
                Cloud Infrastructure
              </div>
            </div>
            <div className="listing-time text-neutral-500 text-[0.9vw]">
              <p>Posted 47 minutes ago</p>
            </div>
          </div>
          <div className="listing flex px-5 py-3 flex-col gap-2 border-[0.1vw] border-neutral-700 ">
            <div className="listing-name flex justify-between flex-row">
              <div className="listing-heading w-84">
                <h1>Senior Full Stack Developer</h1>
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
                Expected Rate: $45/hr • Available: Immediately • Experience: 5+ years
              </p>
            </div>
            <div className="listing-proposal">
              <p className="text-neutral-500 text-[0.9vw]">
                Completed Projects: 25+ • Rating: 4.9/5
              </p>
            </div>
            <div className="listing-user-info">
              <p className="text-neutral-500 text-[0.9vw]">
                Verified Profile • Top Rated • India
              </p>
            </div>
            <div className="listing-tags w-full flex flex-row gap-2">
              <div className="tag p-2 px-4 text-[0.8vw] rounded-2xl bg-neutral-700">
                React
              </div>
              <div className="tag p-2 px-4 text-[0.8vw] rounded-2xl bg-neutral-700">
                Node.js
              </div>
              <div className="tag p-2 px-4 text-[0.8vw] rounded-2xl bg-neutral-700">
                Cloud Infrastructure
              </div>
            </div>
            <div className="listing-time text-neutral-500 text-[0.9vw]">
              <p>Posted 47 minutes ago</p>
            </div>
          </div>
          <div className="listing flex px-5 py-3 flex-col gap-2 border-[0.1vw] border-neutral-700 ">
            <div className="listing-name flex justify-between flex-row">
              <div className="listing-heading w-84">
                <h1>Senior Full Stack Developer</h1>
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
                Expected Rate: $45/hr • Available: Immediately • Experience: 5+ years
              </p>
            </div>
            <div className="listing-proposal">
              <p className="text-neutral-500 text-[0.9vw]">
                Completed Projects: 25+ • Rating: 4.9/5
              </p>
            </div>
            <div className="listing-user-info">
              <p className="text-neutral-500 text-[0.9vw]">
                Verified Profile • Top Rated • India
              </p>
            </div>
            <div className="listing-tags w-full flex flex-row gap-2">
              <div className="tag p-2 px-4 text-[0.8vw] rounded-2xl bg-neutral-700">
                React
              </div>
              <div className="tag p-2 px-4 text-[0.8vw] rounded-2xl bg-neutral-700">
                Node.js
              </div>
              <div className="tag p-2 px-4 text-[0.8vw] rounded-2xl bg-neutral-700">
                Cloud Infrastructure
              </div>
            </div>
            <div className="listing-time text-neutral-500 text-[0.9vw]">
              <p>Posted 47 minutes ago</p>
            </div>
          </div>
        </div>
        <div className="jobs-right p-3 px-5 overflow-y-scroll pb-78 w-[50%] h-[100vh] flex flex-col gap-3">
          <div className="job-desc-heading">
            <h1 className="text-white text-[1.3vw]">
              Senior Full Stack Developer
            </h1>
          </div>
          <div className="job-desc-time">
            <p className="text-neutral-500 text-[0.9vw]">Last active: 2 hours ago</p>
          </div>
          <div className="job-desc">
            <p className="text-[0.9vw] text-white w-[95%] border-b-1 pb-3 border-neutral-700">
              Experienced Full Stack Developer with expertise in modern web technologies.
              Proven track record of delivering complex projects for international clients.
              Specialized in React, Node.js, and cloud infrastructure. Strong problem-solving
              abilities and excellent communication skills. Available for long-term collaboration
              and can adapt to your timezone.
            </p>
          </div>
          <div className="job-desc-time">
            <h1 className="text-white">Availability</h1>
            <p className="text-neutral-500 text-[0.9vw]">40 hours per week</p>
          </div>
          <div className="job-desc-deadline">
            <h1 className="text-white">Experience Level</h1>
            <p className="text-neutral-500 text-[0.9vw]">Senior (5+ years)</p>
          </div>
          <div className="job-desc-difficulty">
            <h1 className="text-white">Communication</h1>
            <p className="text-neutral-500 text-[0.9vw]">Fluent English, Available for meetings in EST/PST</p>
          </div>
          <div className="job-desc-price">
            <h1 className="text-white">$45.00/hr</h1>
            <p className="text-neutral-500 text-[0.9vw]">Negotiable for long-term</p>
          </div>
          <div className="apply-btn">
            <button className="mt-3 bg-green-700 text-white text-[0.8vw] p-3 rounded-2xl">Contact Freelancer</button>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Employee;
