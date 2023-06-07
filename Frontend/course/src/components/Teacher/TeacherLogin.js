import { Form, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const baseURL = "http://127.0.0.1:8000/api";
function TeacherLogin(){

  const [teacherLoginData, setTeacherLoginData] = useState({
    email:'',
    password:''
  });


  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (event) => {
    setTeacherLoginData({
      ...teacherLoginData, [event.target.name]: event.target.value
    })
  }

  const submitForm = () => {
    const teacherFormData = new FormData;
    teacherFormData.append('email',teacherLoginData.email)
    teacherFormData.append('password',teacherLoginData.password)
    try{
      axios.post(baseURL+'/teacher-login',teacherFormData)
      .then((res)=>{
        if(res.data.bool==true){
            localStorage.setItem('teacherLoginStatus', true);
            localStorage.setItem('teacherId',res.data.teacher_id)
            window.location.href="/teacher-dashboard"
        }else{
          setErrorMsg(res.data.msg)
        }
      })
    }catch(error){
      console.log(error)
    }
  }

  const teacherLoginStatus=localStorage.getItem('teacherLoginStatus');
  if(teacherLoginStatus=='true'){
    window.location.href='/teacher-dashboard';
  }

  useEffect(() => {
    document.title='Teacher Login';
});


    return (
        <div className="container mt-4">
            <div className="row">
                <div className="col-6 offset-3">
                <div className="card">
                    <h5 className="card-header">Teacher Login</h5>
                    <div className="card-body">
                      {errorMsg && <p className="text-danger">{errorMsg}</p>}
                    <form>
  <div className="mb-3">
    <label for="exampleInputEmail1" className="form-label" >Email</label>
    <input name="email" type="email" value = {teacherLoginData.email} onChange={handleChange} className="form-control" />
    
  </div>
  <div className="mb-3">
    <label for="exampleInputPassword1" className="form-label">Password</label>
    <input name="password" type="password" value = {teacherLoginData.password} onChange={handleChange} className="form-control" id="exampleInputPassword1" />
  </div>
 
  <button type="submit" onClick={submitForm} className="btn btn-primary">Login</button>
 
</form> 
                    </div>
                </div>
                </div>
            </div>
        </div>
    )
}

export default TeacherLogin;