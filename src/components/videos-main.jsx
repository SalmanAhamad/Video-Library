import { BrowserRouter, Link, Navigate, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";

function RegisterLink() {
  return (
    <div>
      <Link to="/uregister" className="btn btn-light mt-3">
        Account Not found - Register
      </Link>
    </div>
  );
}

export function VideosMain() {
  const [userEmail, setEmail] = useState("");
  const [users, setUsers] = useState([
    { UserId: "", UserName: "", Password: "", Email: "", Mobile: "" },
  ]);
  const [userErorr, setUserError] = useState("");
  let navigate = useNavigate();

  useEffect(() => {
    axios.get("http://127.0.0.1:2200/users").then((response) => {
      setUsers(response.data);
    });
  }, []);

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }

  function handleGetStartedClick() {
    var user = users.find((item) => item.Email == userEmail);
    if (user == undefined) {
      setUserError(<RegisterLink />);
    } else {
      navigate("/userlogin");
    }
  }

  return (
    <div>
      <main className="d-flex justify-content-center mt-4">
        <div>
          <h1>Watch Videos Any where</h1>
          <p className="text-center mt-4 mb-4">
            Please register for more technology videos
          </p>
          <div className="input-group">
            <input
              onChange={handleEmailChange}
              type="email"
              className="form-control"
              placeholder="Your email addess"
            />
            <Button
              onClick={handleGetStartedClick}
              variant="contained"
              color="error"
            >
              Get Started
            </Button>
          </div>
          <p className="text-danger"> {userErorr} </p>
        </div>
      </main>
    </div>
  );
}
