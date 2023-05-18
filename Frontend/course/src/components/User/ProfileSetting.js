import { Link } from "react-router-dom";
import Sidebar from "./Sidebar";
import  { useState, useEffect} from 'react';
import axios from 'axios';
import { useParams } from "react-router-dom";
import Swal from 'sweetalert2';
const baseURL = "http://127.0.0.1:8000/api";

function TeacherProfileSetting(){
    const [studentData, setStudentData] = useState({
        'full_name':'',
        'email':'',
        'username':'',
        'interested_categories':'',
        'profile_img':'',
        'p_img':'',
    })

    const studentId = localStorage.getItem('studentId');

    useEffect(()=>{
        

        // Fetch current teacher data
        try{
            axios.get(baseURL+'/student/'+studentId)
            .then((res)=>{

                setStudentData({
                 
                    full_name:res.data.full_name,
                    email:res.data.email,
                    username:res.data.username,
                    interested_categories:res.data.interested_categories,
                    profile_img:res.data.profile_img,
                    p_img:"",
                });
              
            })
          }catch(error){
            console.log(error)
          }
        // End
        
    }, []);

     // Change element value
     const  handleChange=(event)=>{
        setStudentData({
            ...studentData, [event.target.name]:event.target.value
        });
    }

    const handleFileChange=(event)=>{
        setStudentData({
            ...studentData, [event.target.name]: event.target.files[0]
        })
    }

     // Submit Form

     const submitForm = () => {
        // console.log(teacherData)
        const studentFormData = new FormData();
        studentFormData.append("full_name", studentData.full_name)
        studentFormData.append("email", studentData.email)
        studentFormData.append("username", studentData.username)
        studentFormData.append("interested_categories", studentData.interested_categories)
        if(studentData.p_img!==''){
            studentFormData.append('profile_img',studentData.p_img,studentData.p_img.name);
        }
            
        
        try {
            axios.put(baseURL+'/student/'+studentId+'/', studentFormData,{
                headers: {
                    'content-type': 'multipart/form-data'
                }
            }).then((response)=>{
                if(response.status==200){
                    const Swal = require('sweetalert2')
                        Swal.fire({
                            title: 'Data has been updated',
                            icon:'success',
                            toast: true,
                            timer: 3000,
                            position: 'top-right',
                            timerProgressBar: true,
                            showConfirmButton: false,
                          });
                 }
            })
        }catch(error){
            console.log(error);
            setStudentData({'status':'error'})
        }
        
    };

    // End

    useEffect(() => {
        document.title='My Profile Settings';
    });

    const studentLoginStatus = localStorage.getItem('studentLoginStatus')
    if (studentLoginStatus!='true') {
      window.location.href='/student-login';
    }

    return (
        <div className="container mt-4">
            <div className="row">
                <aside className="col-md-3">
                    <Sidebar />
                </aside>
                <section className="col-md-9">
                    <div className="card">
                        <h5 className="card-header">Profile Setting</h5>
                        <div className="card-body">
                <form>
                        <div className="mb-3 row">
                        <label for="staticEmail" className="col-sm-2 col-form-label">Full Name</label>
                        <div className="col-sm-10">
                        <input value={studentData.full_name} onChange={handleChange} name="full_name" type="text" className="form-control" id="staticEmail" />
                        </div>
                        </div>
                        <div className="mb-3 row">
                        <label for="staticEmail" className="col-sm-2 col-form-label">Email</label>
                        <div className="col-sm-10">
                        <input value={studentData.email} onChange={handleChange} name="email" type="email" className="form-control" id="staticEmail"/>
                        </div>
                        </div>
                        <div class="mb-3">
                        <label for="video" className="col-sm-2 col-form-label">Profile Image</label>
                        <div class="col-sm-18">
                            <input type="file" name="p_img"  onChange={handleFileChange} className="form-control" id="video" />
                            {studentData.profile_img &&
                           <p className="mt-2"><img src={studentData.profile_img} width="300" alt={studentData.full_name} /></p>
                            }
                        </div>
                        </div>
                        <div className="mb-3 row">
                        <div className="col-sm-10">
                        <label for="staticEmail" className="col-sm-2 col-form-label">Username</label>
                        <input value={studentData.username} onChange={handleChange} name="username" type="text" className="form-control" id="staticEmail" />
                        </div>
                        </div>
                        <div className="mb-3 row">
                        <div className="col-sm-10">
                        <label for="exampleInputEmail1" className="form-label">Interested Categories</label>
                        <input value={studentData.interested_categories} onChange={handleChange} name="interested_categories" type="text" className="form-control"></input>
                        <div id="emailHelp" className="form-text">Php, Python, Javascript, etc</div>
                        </div>
                        </div>

                        <button onClick={submitForm} type="submit" className="btn btn-primary">Register</button>
                        </form> 
                </div>
                </div>
                
                </section>
            </div>
            
        </div>
    )
}

export default TeacherProfileSetting;