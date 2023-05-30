import { Link } from "react-router-dom";
import TeacherSidebar from "./TeacherSidebar";
import  { useState, useEffect} from 'react';
import axios from 'axios';
import { useParams } from "react-router-dom";
import Swal from 'sweetalert2';
const baseURL = "http://127.0.0.1:8000/api";

function TeacherUpdatePassword(){

    const [teacherData, setTeacherData] = useState({
        'password':'',
    })

    const teacherId = localStorage.getItem('teacherId');

    // Change element value
    const  handleChange=(event)=>{
        setTeacherData({
            ...teacherData, [event.target.name]:event.target.value
        });
    }


    // Submit Form
    const submitForm = () => {
        // console.log(teacherData)
        const teacherFormData = new FormData();
        teacherFormData.append("password", teacherData.password)
            
        
        try {
            axios.post(baseURL+'/teacher-update-password/'+teacherId+'/', teacherFormData,{
                headers: {
                    'content-type': 'multipart/form-data'
                }
            }).then((response)=>{
                if(response.status==200){
                   window.location.href='/teacher-logout';
                 }
            })
        }catch(error){
            console.log(error);
            setTeacherData({'status':'error'})
        }
        
    };

    // End

    const teacherLoginStatus = localStorage.getItem('teacherLoginStatus')
    if (teacherLoginStatus!='true') {
      window.location.href='/teacher-login';
    }else{
        // alert('Oops...Something went wrong')
    }

    useEffect(() => {
        document.title='Teacher Update Password';
    });
    return (
        <div className="container mt-4">
            <div className="row">
                <aside className="col-md-3">
                    <TeacherSidebar />
                </aside>
                <section className="col-md-9">
                    <div className="card">
                        <h5 className="card-header">Change Password</h5>
                        <div className="card-body">
                <div className="mb-3 row">
                    <label for="inputPassword" className="col-sm-2 col-form-label">New Password</label>
                    <div className="col-sm-10">
                    <input type="text" value={teacherData.password} onChange={handleChange} name="password" className="form-control" id="inputPassword" />
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

export default TeacherUpdatePassword;