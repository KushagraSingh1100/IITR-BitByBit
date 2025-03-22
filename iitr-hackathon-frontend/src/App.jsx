import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignUpClient from "./components/SignUpClient";
import { Fragment } from "react";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Employee from "./components/Employee";
import Notifsemp from "./components/Notifsemp";
import Notifs from "./components/Notifs";
import JoinPage from "./components/Joinpage";
import SignUpFreelancer from "./components/SignUpFreelancer";
import Login from "./components/Login";
import HelpCenter from "./components/HelpCenter";
import Messages from "./components/Messages";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route
            exact
            path="/"
            element={
              <Fragment>
                <Navbar />
                <Home />
              </Fragment>
            }
          />
          <Route exact path="/signup/client" element={<SignUpClient />} />
          <Route exact path="/signup/freelancer" element={<SignUpFreelancer />} />
          <Route exact path="/employee" element={<Employee />} />
          <Route exact path="/notifs/employee" element={<Notifsemp />} />
          <Route exact path="/notifs" element={<Notifs />} />
          <Route exact path="/join" element={<JoinPage />} />
          <Route exact path="/login" element={<Login />} />
          <Route path="/help" element={<HelpCenter userType="freelancer" />} />
          <Route path="/help/employee" element={<HelpCenter userType="employee" />} />
          <Route path="/messages" element={<Messages />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
