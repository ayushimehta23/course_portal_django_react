import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
const baseURL = "http://127.0.0.1:8000/api";

function VerifyTeacher(){

  const [teacherData, setTeacherData] = useState({
    otp_digit:'',
  });

  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (event) => {
    setTeacherData({
      ...teacherData, [event.target.name]: event.target.value
    })
  }

  const {teacher_id} = useParams();
  const submitForm = () => {
    const teacherFormData = new FormData;
    teacherFormData.append('otp_digit',teacherData.otp_digit)
    try{
      axios.post(baseURL+'/verify-teacher/'+teacher_id+'/',teacherFormData)
      .then((res)=>{
        if(res.data.bool==true){
          localStorage.setItem('teacherLoginStatus', true);
          localStorage.setItem('teacherId',res.data.teacher_id)
          window.location.href='/teacher-dashboard';
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
    document.title='Verify Teacher';
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
    <input name="otp_digit" type="number" value = {teacherData.otp_digit} onChange={handleChange} className="form-control" /> 
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

export default VerifyTeacher;