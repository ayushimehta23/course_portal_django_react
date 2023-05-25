import { Link, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import TeacherSidebar from "./TeacherSidebar";
import { useEffect, useState } from "react";
import axios from 'axios';
const baseURL = "http://127.0.0.1:8000/api";

function QuizResult(props){
    
    const [resultData, setResultData] = useState([]);

    // Fetch courses when page load
    useEffect(()=>{
        try{
            axios.get(`${baseURL}/fetch-quiz-result/${props.quiz}/${props.student}`)
            .then((res)=>{
                setResultData(res.data);
            })
          }catch(error){
            console.log(error)
          }   
    }, []);

    return (
        <div className="modal-dialog">
            <div className="modal-content">
            <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">Quiz Result</h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
                <table className="table table-bordered">
                    <tr>
                        <td>Total Questions</td>
                        <td>{resultData.total_questions}</td>
                    </tr>
                    <tr>
                        <td>Attempted Questions</td>
                        <td>{resultData.total_attempted_questions}</td>
                    </tr>
                </table>
            </div>
            </div>
        </div>    
    )
}
export default QuizResult;
    