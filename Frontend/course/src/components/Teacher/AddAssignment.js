import TeacherSidebar from "./TeacherSidebar";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';

const baseURL = "http://127.0.0.1:8000/api"; 
function AddAssignment(){

    const [assignmentData, setAssignmentData] = useState({
        title: "",
        detail: "",
    })


    const handleChange=(event)=>{
        setAssignmentData({
            ...assignmentData, [event.target.name]: event.target.value
        })
    }

    const {student_id} = useParams();
    const {teacher_id} = useParams();

    const formSubmit=()=>{
     const formData = new FormData();
        formData.append('teacher',teacher_id);
        formData.append('student',student_id);
        formData.append('title',assignmentData.title);
        formData.append('detail',assignmentData.description);
        try{
            axios.post(baseURL+'/student-assignment/'+teacher_id+'/'+student_id,formData,{
                headers: {
                    'content-type': 'multipart/form-data'
                }
            })
            .then((res)=>{
                if(res.status===200 || res.status===201){
                    const Swal = require('sweetalert2')
                    
                        Swal.fire({
                            title: 'Assignment has been updated',
                            icon: 'success',
                            toast: true,
                            timer: 3000,
                            position: 'top-right',
                            timerProgressBar: true,
                            showConfirmButton: false,
                          });

                        //   Save Notification Data
                        const notifData=new FormData();
                        notifData.append('teacher',teacher_id);
                        notifData.append('notif_subject','Assignment');
                        notifData.append('notif_for','Student');
                        notifData.append('student',student_id);
                        axios.post(baseURL+'/save-notification/',notifData,{
                            headers:{
                                'content-type': 'multipart/form-data'
                            }
                        })
                        .then((res)=>{
                            console.log('Notification Added');
                        })
                        window.location.reload();
                         
                 }
            });
        }catch(error){
            console.log(error)
        }
    }

    useEffect(() => {
        document.title='Add Chapter';
    });
    return(
        
        <div className="container mt-4">
            <div className="row">
                <aside className="col-md-3">
                    <TeacherSidebar />
                </aside>
                <div className="col-9">
                    <div className="card">
                        <h5 className="card-header">Add Assignment</h5>
                        <div className="card-body">
                        <form>
                        <div class="mb-3">
                            <label for="title" className="form-label">Title</label>
                            <input type="text" onChange={handleChange} name="title" className="form-control" id="title" />
                            
                        </div>
                        <div class="mb-3">
                            <label for="detail" class="form-label">Detail</label>
                            <textarea class="form-control" onChange={handleChange} name="detail" id="detail"></textarea>
                        </div>
                       
                        <button type="button" onClick={formSubmit} class="btn btn-primary">Submit</button>
                        </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default AddAssignment;