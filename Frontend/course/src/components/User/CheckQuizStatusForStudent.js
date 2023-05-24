import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from 'axios';
const baseURL = "http://127.0.0.1:8000/api";

function CheckQuizStatusForStudent(props){
    
    const [quizData, setQuizData] = useState([]);
    const studentId=localStorage.getItem('studentId');
    
    // Fetch courses when page load
    useEffect(()=>{
        try{
            axios.get(`${baseURL}/fetch-quiz-attempt-status/${props.quiz}/${props.student}`)
            .then((res)=>{
                setQuizData(res.data);
            })
          }catch(error){
            console.log(error)
          }

        
        
    }, []);




    return (
    
        <td>
        {quizData.bool==false &&
        <Link to={`/take-quiz/${props.quiz}`} className="btn btn-success btn-sm ms-2">Take Quiz</Link>
}
{quizData.bool==true &&
<span className="text-success">Attempted</span>

}
       </td>
       
        
    )
}
export default CheckQuizStatusForStudent;
    