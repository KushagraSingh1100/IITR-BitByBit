import React from "react";

function UserSideCard() {
  return (
    <div className="flex flex-col p-5 px-7 gap-3 user-side-card w-[25%] h-[100%] border-neutral-600 border-1 rounded-2xl bg-stone-900">
      <div className="side-profile flex items-center gap-4">
        <img
          className="w-12 rounded-2xl"
          src="https://www.upwork.com/profile-portraits/c1SlS59i7ragOdNjdCc_j3C256FkzyjOcxd7oDHMEDKy5yLv8l7q0OlDoSgxPbfAo6"
          alt=""
        />
        <div className="side-profile-heading">
          <h1 className="text-[1.5vw] underline underline-offset-2 text-white">
            Kushagra Singh
          </h1>
          <p className="overflow-hidden text-white text-[0.8vw] w-[90%] h-5">
            Web Developer | UI/UX | Full-Stack
          </p>
        </div>
      </div>
    </div>
  );
}

export default UserSideCard;
