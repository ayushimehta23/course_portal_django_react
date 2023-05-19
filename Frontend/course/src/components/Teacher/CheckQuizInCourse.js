import { Link, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import TeacherSidebar from "./TeacherSidebar";
import { useEffect, useState } from "react";
import axios from 'axios';
const baseURL = "http://127.0.0.1:8000/api";

function CheckQuizInCourse(props){
    
    const [quizData, setQuizData] = useState([]);
    const teacherId=localStorage.getItem('teacherId');
    
    // Fetch courses when page load
    useEffect(()=>{
        try{
            axios.get(`${baseURL}/fetch-quiz-assign-status/${props.quiz}/${props.course}`)
            .then((res)=>{
                setQuizData(res.data);
            })
          }catch(error){
            console.log(error)
          }

        
        
    }, []);


    // Assign quiz to course
    const assignQuiz = (quiz_id) =>{
        
        const formData = new FormData();
        formData.append('teacher',teacherId)
        formData.append('course',props.course);
        formData.append('quiz',props.quiz);
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
        

    return (
       <td>
        {quizData.bool==false &&
        <button onClick={()=>assignQuiz(props.quiz)} className="btn btn-success btn-sm ms-2">Assign Quiz</button>
}
{quizData.bool==true &&
<span className="text-success">Assigned</span>

}
       </td>
        
    )
}
export default CheckQuizInCourse;
    