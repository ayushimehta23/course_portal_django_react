import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Loader from "../Loader";

const baseURL = "http://127.0.0.1:8000/api/student/";
function Register(){

    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    const [studentData, setStudentData] = useState({
        'full_name':'',
        'email':'',
        'password':'',
        'username':'',
        'interested_categories':'',
        'status':'',
    })

    // Change element value
    const  handleChange=(event)=>{
        setStudentData({
            ...studentData, [event.target.name]:event.target.value
        });
    }
    
      // Submit Form

      const submitForm = () => {
        // console.log(teacherData)
        const otp_digit=Math.floor(100000 + Math.random() * 900000);
        const studentFormData = new FormData();
        studentFormData.append("full_name", studentData.full_name)
        studentFormData.append("email", studentData.email)
        studentFormData.append("password", studentData.password)
        studentFormData.append("username", studentData.username)
        studentFormData.append("interested_categories", studentData.interested_categories)
        studentFormData.append("otp_digit", otp_digit)

        setLoading(true);
        
        axios.post(baseURL, studentFormData).then((response)=>{
            navigate('/verify-student/'+response.data.id)
            
           
                
            // })
        }).catch((error) => {
            console.log(error);
            setStudentData({'status':'error'})
        })

        setTimeout(() => {
            setLoading(false);
          }, 5000);
        
    };
    

    useEffect(() => {
        document.title='Student Registration';
    });
    return (
        <div className="container mt-4">
        <div className="row">
            <div className="col-6 offset-3">
            {studentData.status=="success" && <p className="text-success">Thanks for your registration</p>}
                {studentData.status=="error" && <p className="text-danger">Something went wrong!</p>}
            <div className="card">
                <h5 className="card-header">User Register</h5>
                <div className="card-body">
                {/* <form> */}
                <div className="mb-3">
<label for="exampleInputEmail1" className="form-label">Full Name</label>
<input type="text" name="full_name" value={studentData.full_name} onChange={handleChange} className="form-control" />

</div>
<div className="mb-3">
<label for="exampleInputEmail1" className="form-label">Email</label>
<input type="email" value={studentData.email} name="email" onChange={handleChange} className="form-control" />

</div>
<div className="mb-3">
<label for="exampleInputEmail1" className="form-label">Username</label>
<input type="text" value={setStudentData.username} name="username" onChange={handleChange} className="form-control" />

</div>
<div className="mb-3">
<label for="exampleInputPassword1" className="form-label">Password</label>
<input type="password"value={studentData.password}  name="password" onChange={handleChange} className="form-control" id="exampleInputPassword1" />
</div>
<div className="mb-3">
<label for="exampleInputEmail1" className="form-label">Interests</label>
<textarea name="interested_categories" value={studentData.interested_categories} onChange={handleChange} className="form-control"></textarea>
<div id="emailHelp" className="form-text">Php, Python, Javascript, etc</div>

</div>

{!loading && <button type="submit" onClick={submitForm} className="btn btn-primary">Register</button>}
{loading && <Loader />}

                </div>
            </div>
            </div>
        </div>
    </div>
    )
}

export default Register;