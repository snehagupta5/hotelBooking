import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from "./Login";
import Signup from "./Signup";
import Home from "./Home";
import axios from "axios";
import Layout from "./Layout";
import { UserState } from "../context/user/UserContext";
import Logout from "./Logout";
import Account from "./AccountNav";
import Placesform from "./account/Placesform";
import Booking from './account/Booking';
import Accommodation from './account/Accommodation';
import Tour from "./account/Tour";
import Oneplace from "./Oneplace";
import Profile from "./account/Profile";

axios.defaults.baseURL = 'http://127.0.0.1:4000';
axios.defaults.withCredentials = true;

function App() {
  // handle all the routes 
  return (
    <UserState>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/Signup" element={<Signup />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/Account" element={<Account />} />
            <Route path="/Tour" element={<Tour />} />
            <Route path="/Tour/:id" element={<Oneplace />} />
            {/* <Route path="/Account/:subpage" element={<Account />} /> */}
            <Route path="/Account/Profile" element={<Profile />} />
            <Route path="/Account/Booking" element={<Booking />} />
            <Route path="/Account/Accommodation" element={<Accommodation />} />
            <Route path="/Account/:subpage/new" element={<Placesform />} />
          </Route>
        </Routes>
      </Router>
    </UserState>
  );
}

export default App;
