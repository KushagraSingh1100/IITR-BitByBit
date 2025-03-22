import React from "react";
import Jobs from "./Jobs";
import UserSideCard from "./UserSideCard";

const Home = () => {
  return (
    <>
      <div className="home-page h-[91.3vh] bg-neutral-900">
        <div className="center-portion h-[100%] gap-3 p-12 flex">
          <Jobs />
          <UserSideCard />
        </div>
      </div>
    </>
  );
};

export default Home;
