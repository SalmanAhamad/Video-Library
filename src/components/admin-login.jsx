import { Link } from "react-router-dom";
import axios from "axios";
import { Formik, useFormik } from "formik";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

export function AdminLogin() {
  let navigate = useNavigate();
  const [users, setUsers] = useState([{ UserId: "", Password: "" }]);
  const [userError, setUserError] = useState("");

  const [cookies, setCookie, removeCookie] = useCookies("adminName");

  const formik = useFormik({
    initialValues: {
      UserId: "",
      Password: "",
    },
    onSubmit: (values) => {
      var user = users.find((item) => item.UserId === values.UserId);
      if (user.Password === values.Password) {
        setCookie("adminName", user.UserId);
        navigate("/admindashboard");
      } else {
        setUserError("Invalid Credentials");
      }
    },
  });

  useEffect(() => {
    axios.get("http://127.0.0.1:2200/admin").then((response) => {
      setUsers(response.data);
    });
  }, []);

  return (
    <div className="text-center mt-5">
      <form onSubmit={formik.handleSubmit}>
        <dl>
          <dt>Admin Id</dt>
          <dd>
            <input
              className="rounded p-1"
              type="text"
              onChange={formik.handleChange}
              name="UserId"
            />
          </dd>
          <dt>Password</dt>
          <dd>
            <input
              className="rounded p-1"
              type="password"
              onChange={formik.handleChange}
              name="Password"
            />
          </dd>
        </dl>
        <button className="btn btn-primary">Login</button>
        <p className="h3 text-danger">{userError}</p>
      </form>
    </div>
  );
}
