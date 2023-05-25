import { Link, useParams } from "react-router-dom";

import TeacherSidebar from "./TeacherSidebar";
import { useEffect, useState } from "react";
import axios from 'axios';
import QuizResult from "./QuizResult";
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
                                    <button type="button"class="btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target={`#resultModal${row.id}`}>
                                    Quiz Result
                                    </button>

                                    <div className="modal fade" id={`resultModal${row.id}`} tabindex="-1" aria-labelledby="resultModalLabel" aria-hidden="true">
                                        <QuizResult quiz={row.quiz.id} student={row.student.id} />
                                    </div>
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