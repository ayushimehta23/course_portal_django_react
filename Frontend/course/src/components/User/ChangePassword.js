import { Form, Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const baseURL = "http://127.0.0.1:8000/api";
function ChangePassword(){

    const {student_id} = useParams();

  const [studentData, setStudentData] = useState({
    password:'',
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
    studentFormData.append('password',studentData.password)
    try{
      axios.post(baseURL+'/student-change-password/'+student_id+'/',studentFormData)
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

  const studentLoginStatus=localStorage.getItem('studentLoginStatus');
  if(studentLoginStatus=='true'){
    window.location.href='/student-dashboard';
  }

  useEffect(() => {
    document.title='Student - Change Password';
});


    return (
        <div className="container mt-4">
            <div className="row">
                <div className="col-6 offset-3">
                <div className="card">
                    <h5 className="card-header">Enter your password</h5>
                    <div className="card-body">
                      {successMsg && <p className="text-success">{successMsg}</p>}
                      {errorMsg && <p className="text-danger">{errorMsg}</p>}
                    {/* <form> */}
  <div className="mb-3">
    <label for="exampleInputEmail1" className="form-label" >Password</label>
    <input name="password" type="password" value = {studentData.password} onChange={handleChange} className="form-control" />
  </div>
  
 
  <button type="submit" onClick={submitForm} className="btn btn-primary">Change</button>
{/* </form>  */}
                    </div>
                </div>
                </div>
            </div>
        </div>
    )
}

export default ChangePassword;