import { Link } from "react-router-dom";
import TeacherSidebar from "./TeacherSidebar";
import  { useState, useEffect} from 'react';
import axios from 'axios';
import { useParams } from "react-router-dom";
import Swal from 'sweetalert2';
const baseURL = "http://127.0.0.1:8000/api";

function TeacherProfileSetting(){
    const [teacherData, setTeacherData] = useState({
        'full_name':'',
        'email':'',
        'qualification':'',
        'mobile_no':'',
        'profile_img':'',
        'p_img':'',
        'skills':'',
        'status':'',
    })

    const teacherId = localStorage.getItem('teacherId');

    useEffect(()=>{
        

        // Fetch current teacher data
        try{
            axios.get(baseURL+'/teacher/'+teacherId)
            .then((res)=>{

                setTeacherData({
                 
                    full_name:res.data.full_name,
                    email:res.data.email,
                    qualification:res.data.qualification,
                    mobile_no:res.data.mobile_no,
                    skills:res.data.skills,
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
        setTeacherData({
            ...teacherData, [event.target.name]:event.target.value
        });
    }

    const handleFileChange=(event)=>{
        setTeacherData({
            ...teacherData, [event.target.name]: event.target.files[0]
        })
    }

     // Submit Form

     const submitForm = () => {
        // console.log(teacherData)
        const teacherFormData = new FormData();
        teacherFormData.append("full_name", teacherData.full_name)
        teacherFormData.append("email", teacherData.email)
        teacherFormData.append("qualification", teacherData.qualification)
        teacherFormData.append("mobile_no", teacherData.mobile_no)
        teacherFormData.append("skills", teacherData.skills)
       
        if(teacherData.p_img!==''){
            teacherFormData.append('profile_img',teacherData.p_img,teacherData.p_img.name);
        }
            
        
        try {
            axios.put(baseURL+'/teacher/'+teacherId+'/', teacherFormData,{
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
            setTeacherData({'status':'error'})
        }
        
    };

    // End

    useEffect(() => {
        document.title='Teacher Profile Settings';
    });

    const teacherLoginStatus = localStorage.getItem('teacherLoginStatus')
    if (teacherLoginStatus!='true') {
      window.location.href='/teacher-login';
    }

    return (
        <div className="container mt-4">
            <div className="row">
                <aside className="col-md-3">
                    <TeacherSidebar />
                </aside>
                <section className="col-md-9">
                    <div className="card">
                        <h5 className="card-header">Profile Setting</h5>
                        <div className="card-body">
                <form>
                        <div className="mb-3 row">
                        <label for="staticEmail" className="col-sm-2 col-form-label">Full Name</label>
                        <div className="col-sm-10">
                        <input value={teacherData.full_name} onChange={handleChange} name="full_name" type="text" className="form-control" id="staticEmail" />
                        </div>
                        </div>
                        <div className="mb-3 row">
                        <label for="staticEmail" className="col-sm-2 col-form-label">Email</label>
                        <div className="col-sm-10">
                        <input value={teacherData.email} onChange={handleChange} name="email" type="email" className="form-control" id="staticEmail"/>
                        </div>
                        </div>
                        <div class="mb-3">
                        <label for="video" className="form-label">Featured Image</label>
                            <input type="file" name="p_img"  onChange={handleFileChange} className="form-control" id="video" />
                            {teacherData.profile_img &&
                           <p className="mt-2"><img src={teacherData.profile_img} width="300" alt={teacherData.full_name} /></p>
                            }
                        </div>
                        <div className="mb-3 row">
                        <div className="col-sm-10">
                        <label for="staticEmail" className="col-sm-2 col-form-label">Qualification</label>
                        <input value={teacherData.qualification} onChange={handleChange} name="qualification" type="text" className="form-control" id="staticEmail" />
                        </div>
                        </div>
                        <div className="mb-3 row">
                        <div className="col-sm-10">
                        <label for="exampleInputEmail1" className="form-label">Skills</label>
                        <textarea value={teacherData.skills} onChange={handleChange} name="skills" type="text" className="form-control"></textarea>
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