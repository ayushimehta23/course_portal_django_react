import { Link } from "react-router-dom";
import Sidebar from "./Sidebar";
import { useEffect, useState } from "react";
import axios from 'axios';
import Swal from "sweetalert2";
const baseURL = "http://127.0.0.1:8000/api";

function StudentAssignments(){
    const [assignmentData, setAssignmentData] = useState([]);
    const [assignmentStatus, setAssignmentStatus] = useState('');
    const studentId = localStorage.getItem('studentId')

    useEffect(()=>{
        try{
            axios.get(baseURL+'/my-assignments/'+studentId)
            .then((res)=>{
                setAssignmentData(res.data);
            })
          }catch(error){
            console.log(error)
          }
        
    }, []);

     // Enroll in this course
  const markAsDone = (assignment_id,title,detail,student,teacher) =>{
    console.log("Hello World")
    
    const formData = new FormData();
    formData.append('student_status',true);
    formData.append('title',title);
    formData.append('detail',detail);
    formData.append('student',student);
    formData.append('teacher',teacher);
    try{
        axios.put(baseURL+'/update-assignment/'+assignment_id,formData,{
            headers: {
                'content-type': 'multipart/form-data'
            }
        })
        .then((res)=>{
           if(res.status===200||res.status===201){
            window.location.reload();
           }
        });
    }catch(error){
        console.log(error)
    }
    }


    useEffect(() => {
        document.title='My Assignments';
    });
    return (
        <div className="container mt-4">
            <div className="row">
                <aside className="col-md-3">
                    <Sidebar />
                </aside>
                <section className="col-md-9">
                <div className="card">
                        <h5 className="card-header">My Assignments</h5>
                    
                        <div className="card-body">
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th>Title</th>
                                        <th>Detail</th>
                                        <th>Teacher</th>
                                        <th>Action</th>
                                      
                                    </tr>
                                </thead>
                                <tbody>
                                {assignmentData.map((row, index) =>
                                    <tr>
                                    <td>{row.title}</td>
                                    <td>{row.detail}</td>
                                    <td><Link to={'/teacher-detail/'+row.teacher.id}>{row.teacher.full_name}</Link></td>
                                    <td>
                                        {row.student_status==false &&
                                        <button onClick={()=>markAsDone(row.id,row.title,row.detail,row.student.id,row.teacher.id)} className="btn btn-success btn-sm">Mark as done.</button>}

                                        {row.student_status==true &&
                                        <span className="badge bg-primary">Completed</span>}
                                    </td>
                                    </tr>
                                    )}
                                </tbody>
                            </table>
                          
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
}
export default StudentAssignments;