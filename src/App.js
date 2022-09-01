import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./Components/LandingPage/Login";
import Dashboard from "./Components/Dashboard/Dashboard";
import Transaction from "./Components/Transactions/Transaction";
import Statement from "./Components/Statement/Statement";
import NewUserAdmin from "./Components/Create new user/NewUserAdmin";
import CreateNewAccount from "./Components/CreateNewAccount/CreateNewAccount";
import SignupRequest from "./Components/SignupRequests/SignUpRequests";
import Signup from "./Components/LandingPage/Signup";
import PasswordChangeRequest from "./Components/PasswordChange/PasswordChangeRequest";
import AboutMe from "./Components/About me/AboutMe";
import LandingPage from "./Components/LandingPage/LandingPage";
import PageNotFound from "./Components/PageNotFound";
import TrackRequest from "./Components/LandingPage/TrackReqeust";

function App() {
  return (
    <div className="App">
      <h3>{process.env.ENCRYPTION_KEY}</h3>
      <Routes>
        <Route path="*" element={<PageNotFound />} />
        <Route path="/" element={<LandingPage />} />
        <Route path="/track-request" element={<TrackRequest />} />
        <Route path="/home" element={<Navigate to="/" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/transaction" element={<Transaction />} />
        <Route path="/statement" element={<Statement />} />
        <Route path="/new-user" element={<NewUserAdmin />} />
        <Route path="/new-account" element={<CreateNewAccount />} />
        <Route path="/signup-requests" element={<SignupRequest />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/change-password" element={<PasswordChangeRequest />} />
        <Route path="/about-me" element={<AboutMe />} />
      </Routes>
    </div>
  );
}

export default App;
