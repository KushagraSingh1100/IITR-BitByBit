import React from "react";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import CloseIcon from "@mui/icons-material/Close";

function Jobs() {
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
          <div className="listing flex px-5 py-3 flex-col gap-2 border-[0.1vw] border-neutral-700 border-l-white">
            <div className="listing-name flex justify-between flex-row">
              <div className="listing-heading w-84">
                <h1>HTML\CSS Developer Needed for Website</h1>
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
                $ Hourly: $15-$50 • 1-3 months • &lt;30 • Intermediate
              </p>
            </div>
            <div className="listing-proposal">
              <p className="text-neutral-500 text-[0.9vw]">
                Proposals: 15 to 20
              </p>
            </div>
            <div className="listing-user-info">
              <p className="text-neutral-500 text-[0.9vw]">
                Payment unverified • 0 • 0$ spent • India
              </p>
            </div>
            <div className="listing-tags w-full flex flex-row gap-2">
              <div className="tag p-2 px-4 text-[0.8vw] rounded-2xl bg-neutral-700">
                CSS
              </div>
              <div className="tag p-2 px-4 text-[0.8vw] rounded-2xl bg-neutral-700">
                HTML
              </div>
              <div className="tag p-2 px-4 text-[0.8vw] rounded-2xl bg-neutral-700">
                HTML5
              </div>
              <div className="tag p-2 px-4 text-[0.8vw] rounded-2xl bg-neutral-700">
                JavaScript
              </div>
              <div className="tag p-2 px-4 text-[0.8vw] rounded-2xl bg-neutral-700">
                CSS 3
              </div>
            </div>
            <div className="listing-time text-neutral-500 text-[0.9vw]">
              <p>Posted 47 minutes ago</p>
            </div>
          </div>
          <div className="listing flex px-5 py-3 flex-col gap-2 border-[0.1vw] border-neutral-700 ">
            <div className="listing-name flex justify-between flex-row">
              <div className="listing-heading w-84">
                <h1>HTML\CSS Developer Needed for Website</h1>
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
                $ Hourly: $15-$50 • 1-3 months • &lt;30 • Intermediate
              </p>
            </div>
            <div className="listing-proposal">
              <p className="text-neutral-500 text-[0.9vw]">
                Proposals: 15 to 20
              </p>
            </div>
            <div className="listing-user-info">
              <p className="text-neutral-500 text-[0.9vw]">
                Payment unverified • 0 • 0$ spent • India
              </p>
            </div>
            <div className="listing-tags w-full flex flex-row gap-2">
              <div className="tag p-2 px-4 text-[0.8vw] rounded-2xl bg-neutral-700">
                CSS
              </div>
              <div className="tag p-2 px-4 text-[0.8vw] rounded-2xl bg-neutral-700">
                HTML
              </div>
              <div className="tag p-2 px-4 text-[0.8vw] rounded-2xl bg-neutral-700">
                HTML5
              </div>
              <div className="tag p-2 px-4 text-[0.8vw] rounded-2xl bg-neutral-700">
                JavaScript
              </div>
              <div className="tag p-2 px-4 text-[0.8vw] rounded-2xl bg-neutral-700">
                CSS 3
              </div>
            </div>
            <div className="listing-time text-neutral-500 text-[0.9vw]">
              <p>Posted 47 minutes ago</p>
            </div>
          </div>
          <div className="listing flex px-5 py-3 flex-col gap-2 border-[0.1vw] border-neutral-700 ">
            <div className="listing-name flex justify-between flex-row">
              <div className="listing-heading w-84">
                <h1>HTML\CSS Developer Needed for Website</h1>
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
                $ Hourly: $15-$50 • 1-3 months • &lt;30 • Intermediate
              </p>
            </div>
            <div className="listing-proposal">
              <p className="text-neutral-500 text-[0.9vw]">
                Proposals: 15 to 20
              </p>
            </div>
            <div className="listing-user-info">
              <p className="text-neutral-500 text-[0.9vw]">
                Payment unverified • 0 • 0$ spent • India
              </p>
            </div>
            <div className="listing-tags w-full flex flex-row gap-2">
              <div className="tag p-2 px-4 text-[0.8vw] rounded-2xl bg-neutral-700">
                CSS
              </div>
              <div className="tag p-2 px-4 text-[0.8vw] rounded-2xl bg-neutral-700">
                HTML
              </div>
              <div className="tag p-2 px-4 text-[0.8vw] rounded-2xl bg-neutral-700">
                HTML5
              </div>
              <div className="tag p-2 px-4 text-[0.8vw] rounded-2xl bg-neutral-700">
                JavaScript
              </div>
              <div className="tag p-2 px-4 text-[0.8vw] rounded-2xl bg-neutral-700">
                CSS 3
              </div>
            </div>
            <div className="listing-time text-neutral-500 text-[0.9vw]">
              <p>Posted 47 minutes ago</p>
            </div>
          </div>
          <div className="listing flex px-5 py-3 flex-col gap-2 border-[0.1vw] border-neutral-700 ">
            <div className="listing-name flex justify-between flex-row">
              <div className="listing-heading w-84">
                <h1>HTML\CSS Developer Needed for Website</h1>
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
                $ Hourly: $15-$50 • 1-3 months • &lt;30 • Intermediate
              </p>
            </div>
            <div className="listing-proposal">
              <p className="text-neutral-500 text-[0.9vw]">
                Proposals: 15 to 20
              </p>
            </div>
            <div className="listing-user-info">
              <p className="text-neutral-500 text-[0.9vw]">
                Payment unverified • 0 • 0$ spent • India
              </p>
            </div>
            <div className="listing-tags w-full flex flex-row gap-2">
              <div className="tag p-2 px-4 text-[0.8vw] rounded-2xl bg-neutral-700">
                CSS
              </div>
              <div className="tag p-2 px-4 text-[0.8vw] rounded-2xl bg-neutral-700">
                HTML
              </div>
              <div className="tag p-2 px-4 text-[0.8vw] rounded-2xl bg-neutral-700">
                HTML5
              </div>
              <div className="tag p-2 px-4 text-[0.8vw] rounded-2xl bg-neutral-700">
                JavaScript
              </div>
              <div className="tag p-2 px-4 text-[0.8vw] rounded-2xl bg-neutral-700">
                CSS 3
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
              HTML/CSS Developer Needed for Website Improvements
            </h1>
          </div>
          <div className="job-desc-time">
            <p className="text-neutral-500 text-[0.9vw]">Posted 1 hour ago</p>
          </div>
          <div className="job-desc">
            <p className="text-[0.9vw] text-white w-[95%] border-b-1 pb-3 border-neutral-700">
              I am seeking an HTML/CSS developer to assist in enhancing my
              website. The project involves making improvements to the existing
              website, ensuring responsiveness, and optimizing user experience.
              The ideal candidate will have a strong understanding of web design
              principles and the ability to implement creative solutions. The
              website is online at ciflux.pt
            </p>
          </div>
          <div className="job-desc-time">
            <h1 className="text-white ">Less than 30 hrs/week</h1>
            <p className="text-neutral-500 text-[0.9vw]">Hourly</p>
          </div>
          <div className="job-desc-deadline">
            <h1 className="text-white ">1-3 month length</h1>
            <p className="text-neutral-500 text-[0.9vw]">Project Length</p>
          </div>
          <div className="job-desc-difficulty">
            <h1 className="text-white ">Intermediate</h1>
            <p className="text-neutral-500 text-[0.9vw]">I am looking for mix of experience and value.</p>
          </div>
          <div className="job-desc-price">
            <h1 className="text-white ">$15.00-%50.00</h1>
            <p className="text-neutral-500 text-[0.9vw]">Hourly</p>
          </div>
          <div className="apply-btn">
            <button className="mt-3 bg-green-700 text-white text-[0.8vw] p-3 rounded-2xl">Apply for the job</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Jobs;
