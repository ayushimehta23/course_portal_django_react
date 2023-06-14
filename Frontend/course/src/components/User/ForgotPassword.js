
import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../Loader";

const baseURL = "http://127.0.0.1:8000/api";
function ForgotPassword(){

  const [loading, setLoading] = useState(false); 

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

  const submitForm = (e) => {
    e.preventDefault();
    const studentFormData = new FormData;
    studentFormData.append('email',studentData.email)

    setLoading(true);

    try{
      axios.post(baseURL+'/student-forgot-password/',studentFormData)
      .then((res)=>{
        if(res.data.bool==true){
            setSuccessMsg(res.data.msg)
            setErrorMsg('')
            window.location.href='/student-login';
        }else{
            setErrorMsg(res.data.msg)
            setSuccessMsg('')
        }
      })
    }catch(error){
      console.log(error)
    }

    setTimeout(() => {
        setLoading(false);
      }, 5000);

    
  }

 

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
    <p className="mt-3 text-danger">You will receive a reset password link on your registered Email</p>
  </div>
  
 
  {!loading && <button type="submit" onClick={submitForm} className="btn btn-primary">Send</button>}
  {loading && <Loader />}
 
</form> 
                    </div>
                </div>
                </div>
            </div>
        </div>
    )
}

export default ForgotPassword;