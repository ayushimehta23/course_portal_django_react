import { Link, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import TeacherSidebar from "./TeacherSidebar";
import { useEffect, useState } from "react";
import axios from 'axios';
import CheckQuizInCourse from "./CheckQuizInCourse.js";
const baseURL = "http://127.0.0.1:8000/api";

function AssignQuiz(){
    
    const [quizData, setQuizData] = useState([]);
    const [courseData, setCourseData] = useState([]);
    const { course_id } = useParams();

    const teacherId=localStorage.getItem('teacherId');
    
    useEffect(()=>{
        try{
            axios.get(baseURL+'/teacher-quiz/'+teacherId)
            .then((res)=>{
                setQuizData(res.data);
            })
          }catch(error){
            console.log(error)
          }

          try{
            axios.get(baseURL+'/course/'+course_id)
            .then((res)=>{
                setCourseData(res.data);
               
            })
          }catch(error){
            console.log(error)
          }
         
        
    }, []);


    // Assign quiz to course
    const assignQuiz = (quiz_id) =>{
        
        const formData = new FormData();
        formData.append('teacher',teacherId)
        formData.append('course',course_id);
        formData.append('quiz',quiz_id);
        try{
            axios.post(baseURL+'/quiz-assign-course/',formData,{
                headers: {
                    'content-type': 'multipart/form-data'
                }
            })
            .then((res)=>{
               if(res.status===200||res.status===201){
                window.location.reload()
               }
            });
        }catch(error){
            console.log(error)
        }
        }
        

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
                        <h5 className="card-header">Assign Quiz  <span className="text-primary">({courseData.title})</span></h5>
                    
                        <div className="card-body">
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {quizData.map((row, index)=>
                                  
                                    <tr>
                                    <td>
                                        <Link to={'/all-questions/'+row.id}>{row.title}</Link>
                                    </td>
                                    <CheckQuizInCourse quiz={row.id} course={course_id} />
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
export default AssignQuiz;