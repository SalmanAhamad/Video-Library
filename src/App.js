import "./App.css";
import {
  BrowserRouter,
  Link,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import { VideosMain } from "./components/videos-main";
import { UserRegister } from "./components/user-register";
import { UserLogin } from "./components/user-login";
import { UserDashboard } from "./components/user-dashboard";
import { useCookies } from "react-cookie";
import { AdminLogin } from "./components/admin-login";
import { AdminDashBoard } from "./components/admin-dashboard";
import { AddVideo } from "./components/add-video";
import { EditVideo } from "./components/edit-video";
import { DeleteVideo } from "./components/delete-video";

function SignoutComponent() {
  const [cookies, setCookie, removeCookie] = useCookies("userName");
  let navigate = useNavigate();
  function handleSignout() {
    removeCookie("userName");
    navigate("/userlogin");
  }
  return (
    <button onClick={handleSignout} className="btn btn-light me-2">
      Signout
    </button>
  );
}

function App() {
  const [cookies, setCookie, removeCookie] = useCookies("userName");

  return (
    <div
      className="container-fluid bg-dark text-light"
      style={{ height: "100vh" }}
    >
      <BrowserRouter>
        <header className="p-2 d-flex justify-content-between">
          <div>
            <span className="h3">
              {" "}
              <Link style={{ color: "white", textDecoration: "none" }} to="/">
                Video Library
              </Link>{" "}
            </span>
          </div>
          <div>
            {cookies["userName"] === undefined ? (
              <Link className="btn btn-light me-2 mb-2" to="/userlogin">
                User Signin
              </Link>
            ) : (
              <SignoutComponent />
            )}
            <Link to="/adminlogin" className="btn btn-light mb-2">
              {" "}
              <span className="bi bi-person-fill"></span> Admin Dashboard{" "}
            </Link>
          </div>
        </header>
        <section>
          <Routes>
            <Route path="/" element={<VideosMain />} />
            <Route path="uregister" element={<UserRegister />} />
            <Route path="userlogin" element={<UserLogin />} />
            <Route path="userdashboard" element={<UserDashboard />} />
            <Route path="adminlogin" element={<AdminLogin />} />
            <Route path="admindashboard" element={<AdminDashBoard />} />
            <Route path="addvideo" element={<AddVideo />} />
            <Route path="editvideo/:id" element={<EditVideo />} />
            <Route path="deletevideo/:id" element={<DeleteVideo />} />
          </Routes>
        </section>
      </BrowserRouter>
    </div>
  );
}

export default App;
