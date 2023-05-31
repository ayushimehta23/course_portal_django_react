import Sidebar from "./Sidebar";
import  { useState, useEffect} from 'react';
import axios from 'axios';
const baseURL = "http://127.0.0.1:8000/api";

function UpdatePassword(){

    const [studentData, setStudentData] = useState({
        'password':'',
    })

    const studentId = localStorage.getItem('studentId');

    // Change element value
    const  handleChange=(event)=>{
        setStudentData({
            ...studentData, [event.target.name]:event.target.value
        });
    }


    // Submit Form
    const submitForm = () => {
        // console.log(teacherData)
        const studentFormData = new FormData();
       studentFormData.append("password", studentData.password)
            
        
        try {
            axios.post(baseURL+'/student/update-password/'+studentId+'/', studentFormData,{
                headers: {
                    'content-type': 'multipart/form-data'
                }
            }).then((response)=>{
                if(response.status==200){
                   window.location.href='/student-logout';
                 }
            })
        }catch(error){
            console.log(error);
            setStudentData({'status':'error'})
        }
        
    };

    // End

    const studentLoginStatus = localStorage.getItem('studentLoginStatus')
    if (studentLoginStatus!='true') {
      window.location.href='/student-login';
    }else{
        // alert('Oops...Something went wrong')
    }

    useEffect(() => {
        document.title='Student Change Password';
    });
    return (
        <div className="container mt-4">
            <div className="row">
                <aside className="col-md-3">
                    <Sidebar />
                </aside>
                <section className="col-md-9">
                    <div className="card">
                        <h5 className="card-header">Change Password</h5>
                        <div className="card-body">
                <div className="mb-3 row">
                    <label for="inputPassword" className="col-sm-2 col-form-label">New Password</label>
                    <div className="col-sm-10">
                    <input type="text" value={studentData.password} onChange={handleChange} name="password" className="form-control" id="inputPassword" />
                    </div>
                    </div>
                        <hr />
                        <button className="btn btn-primary" onClick={submitForm}>Update</button>
                        </div>
                </div>
                </section>
            </div>
            
        </div>
    )
}

export default UpdatePassword;