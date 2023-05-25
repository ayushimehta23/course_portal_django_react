import { Link, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import TeacherSidebar from "./TeacherSidebar";
import { useEffect, useState } from "react";
import axios from 'axios';
import CheckQuizInCourse from "./CheckQuizInCourse.js";
const baseURL = "http://127.0.0.1:8000/api";

function AttemptedStudents(){
    
    const [studentData, setStudentData] = useState([]);
 
    const { quiz_id } = useParams();

    
    useEffect(()=>{
        try{
            axios.get(baseURL+'/attempted-quiz/'+quiz_id)
            .then((res)=>{
                setStudentData(res.data);
            })
          }catch(error){
            console.log(error)
          } 
        
    }, []);




    useEffect(()=>{
    
        document.title='My Quiz';
    });
    return (
        <div className="container mt-4">
            <div className="row">
                <aside className="col-md-3">
                    <TeacherSidebar />
                </aside>
                <section className="col-md-9">
                <div className="card">
                        <h5 className="card-header">Student List</h5>
                    
                        <div className="card-body">
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Username</th>
                                        <th>Result</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {studentData.map((row, index)=>
                                    <tr>
                                    <td>
                                        {row.student.full_name}  
                                    </td>
                                    <td>
                                        {row.student.email}
                                    </td>
                                    <td>
                                        {row.student.username}
                                    </td>
                                    <td>
                                        <Link to="#">Quiz Result</Link>
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
export default AttemptedStudents;