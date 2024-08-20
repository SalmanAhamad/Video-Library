import { Link } from "react-router-dom";
import axios from "axios";
import { Formik, useFormik } from "formik";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

export function UserLogin() {
  let navigate = useNavigate();
  const [users, setUsers] = useState([
    { UserId: "", UserName: "", Password: "", Email: "", Mobile: "" },
  ]);
  const [userError, setUserError] = useState("");

  const [cookies, setCookie, removeCookie] = useCookies("userName");

  const formik = useFormik({
    initialValues: {
      UserId: "",
      Password: "",
    },
    onSubmit: (values) => {
      var user = users.find((item) => item.UserId === values.UserId);
      if (user.Password === values.Password) {
        setCookie("userName", user.UserName);
        navigate("/userdashboard");
      } else {
        setUserError("Invalid Credentials");
      }
    },
  });

  useEffect(() => {
    axios.get("http://127.0.0.1:2200/users").then((response) => {
      setUsers(response.data);
    });
  }, []);

  return (
    <div className="text-center mt-5">
      <h3>User Login</h3>
      <form onSubmit={formik.handleSubmit}>
        <dl>
          <dt>User Id</dt>
          <dd>
            <input
              className="rounded p-2"
              type="text"
              name="UserId"
              onChange={formik.handleChange}
            />
          </dd>
          <dt>Password</dt>
          <dd>
            <input
              className="rounded p-2"
              type="password"
              name="Password"
              onChange={formik.handleChange}
            />
          </dd>
        </dl>
        <button className="btn btn-warning ">Login</button>
        <Link to="/uregister" className="btn btn-success ms-2">
          New User ?{" "}
        </Link>
        <p className="h4 text-danger">{userError}</p>
      </form>
    </div>
  );
}
