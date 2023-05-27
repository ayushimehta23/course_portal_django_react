import { Form, Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
const baseURL = "http://127.0.0.1:8000/api";

function VerifyStudent(){

  const [studentData, setStudentData] = useState({
    otp_digit:'',
  });

  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (event) => {
    setStudentData({
      ...studentData, [event.target.name]: event.target.value
    })
  }

  const {student_id} = useParams();
  const submitForm = () => {
    const studentFormData = new FormData;
    studentFormData.append('otp_digit',studentData.otp_digit)
    try{
      axios.post(baseURL+'/verify-student/'+student_id+'/',studentFormData)
      .then((res)=>{
        if(res.data.bool==true){
          localStorage.setItem('studentLoginStatus', true);
          localStorage.setItem('studentId',res.data.student_id)
          window.location.href='/student-dashboard';
        }else{
          setErrorMsg(res.data.msg)
        }
      })
    }catch(error){
      console.log(error)
    }
  }

  const studentLoginStatus=localStorage.getItem('studentLoginStatus');
  if(studentLoginStatus=='true'){
    window.location.href='/student-dashboard';
  }

  useEffect(() => {
    document.title='Verify Student';
});


    return (
        <div className="container mt-4">
            <div className="row">
                <div className="col-6 offset-3">
                <div className="card">
                    <h5 className="card-header">Enter 6 digit OTP</h5>
                    <div className="card-body">
                      {errorMsg && <p className="text-danger">{errorMsg}</p>}
                    <form>
  <div className="mb-3">
    <label for="exampleInputEmail1" className="form-label" >OTP</label>
    <input name="otp_digit" type="number" value = {studentData.otp_digit} onChange={handleChange} className="form-control" /> 
  </div>
  <button type="submit" onClick={submitForm} className="btn btn-primary">Verify</button>
</form> 
                    </div>
                </div>
                </div>
            </div>
        </div>
    )
}

export default VerifyStudent;