import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../Loader";

const baseURL = "http://127.0.0.1:8000/api";

function Login() {
  const [loading, setLoading] = useState(false);
  const [studentLoginData, setStudentLoginData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (event) => {
    setStudentLoginData({
      ...studentLoginData,
      [event.target.name]: event.target.value,
    });
  };

  const submitForm = (e) => {
    e.preventDefault();
    
    const studentFormData = new FormData();
    studentFormData.append("email", studentLoginData.email);
    studentFormData.append("password", studentLoginData.password);

    setLoading(true);
    
    try {
      axios.post(baseURL + "/student-login", studentFormData).then((res) => {
        if (res.data.bool == true) {
          localStorage.setItem("studentLoginStatus", true);
          localStorage.setItem("studentId", res.data.student_id);
          window.location.href = "/student-dashboard";
        } else {
          setErrorMsg("Invalid Email or Password");
        }
      });
    } catch (error) {
      console.log(error);
    }
    setTimeout(() => {
      setLoading(false);
    }, 5000);
  };

  const studentLoginStatus = localStorage.getItem("studentLoginStatus");
  if (studentLoginStatus == "true") {
    window.location.href = "/student-dashboard";
  }

  useEffect(() => {
    document.title = "Student Login";
  });
  return (
   
    <div className="container mt-4">
      <div className="row">
        <div className="col-6 offset-3">
          <div className="card">
            <h5 className="card-header">Student Login</h5>
            <div className="card-body">
              {errorMsg && <p className="text-danger">{errorMsg}</p>}
                <div className="mb-3">
                  <label for="exampleInputEmail1" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={studentLoginData.email}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>
                <div className="mb-3">
                  <label for="exampleInputPassword1" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={studentLoginData.password}
                    onChange={handleChange}
                    className="form-control"
                    id="exampleInputPassword1"
                  />
                </div>
                {!loading &&
                <button
                  type="submit"
                  onClick={submitForm}
                  className="btn btn-primary"
                >
                  Login
                </button>
                }
                {loading && 
                <Loader />
                }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
