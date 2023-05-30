import { Form, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const baseURL = "http://127.0.0.1:8000/api";
function ForgotPassword(){

  const [studentData, setStudentData] = useState({
    email:'',
  });


  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleChange = (event) => {
    setStudentData({
      ...studentData, [event.target.name]: event.target.value
    })
  }

  const submitForm = () => {
    const studentFormData = new FormData;
    studentFormData.append('email',studentData.email)
    try{
      axios.post(baseURL+'/student-forgot-password/',studentFormData)
      .then((res)=>{
        if(res.data.bool==true){
            setSuccessMsg(res.data.msg)
            setErrorMsg('')
        }else{
            setErrorMsg(res.data.msg)
            setSuccessMsg('')
        }
      })
    }catch(error){
      console.log(error)
    }
  }

//   const teacherLoginStatus=localStorage.getItem('teacherLoginStatus');
//   if(teacherLoginStatus=='true'){
//     window.location.href='/teacher-dashboard';
//   }

  useEffect(() => {
    document.title='Student - Forgot Password';
});


    return (
        <div className="container mt-4">
            <div className="row">
                <div className="col-6 offset-3">
                <div className="card">
                    <h5 className="card-header">Enter Your Registered Email</h5>
                    <div className="card-body">
                      {successMsg && <p className="text-success">{successMsg}</p>}
                      {errorMsg && <p className="text-danger">{errorMsg}</p>}
                    <form>
  <div className="mb-3">
    <label for="exampleInputEmail1" className="form-label" >Email</label>
    <input name="email" type="email" value = {studentData.email} onChange={handleChange} className="form-control" />
  </div>
  
 
  <button type="submit" onClick={submitForm} className="btn btn-primary">Send</button>
</form> 
                    </div>
                </div>
                </div>
            </div>
        </div>
    )
}

export default ForgotPassword;