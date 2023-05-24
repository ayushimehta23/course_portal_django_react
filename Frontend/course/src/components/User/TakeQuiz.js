import { Link } from "react-router-dom";
import Sidebar from "./Sidebar";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';
const baseURL = "http://127.0.0.1:8000/api";

function TakeQuiz(){
    const [questionData, setQuestionData] = useState([]);
    const {quiz_id} = useParams();
    const studentId = localStorage.getItem('studentId')

    useEffect(()=>{
        try{
            axios.get(baseURL+'/quiz-questions/'+quiz_id+'/1')
            .then((res)=>{
            
                setQuestionData(res.data);
              
            })
          }catch(error){
            console.log(error)
          }
        
    }, []);

    const submitAnswer = (question_id, right_ans) => {
        const formData = new FormData();
        formData.append('student',studentId);
        formData.append('quiz',quiz_id);
        formData.append('question',question_id);
        formData.append('right_ans',right_ans);
        try{
            axios.post(baseURL+'/attempt-quiz/',formData,{
                headers: {
                    'content-type': 'multipart/form-data'
                }
            })
            .then((res)=>{
                // console.log(res.data);
                if(res.status===200 || res.status==201){
                    try{
                        axios.get(baseURL+'/quiz-questions/'+quiz_id+'/next-question/'+question_id)
                        .then((res)=>{
                        
                            setQuestionData(res.data);
                          
                        })
                      }catch(error){
                        console.log(error)
                      }
                 }
            });
        }catch(error){
            console.log(error)
        }

    }

    useEffect(() => {
        document.title='Attempt Quiz';
    });
    return (
        <div className="container mt-4">
            <div className="row">
                <aside className="col-md-3">
                    <Sidebar />
                </aside>
                <section className="col-md-9">
                    <h4 className="mb-3 border-bottom pb-1">Quiz Title</h4>
                    {questionData.map((row, index)=>
                <div className="card">
                        <h5 className="card-header">{row.questions}</h5>
                    
                        <div className="card-body">
          
                            <table className="table table-bordered">
                                <tbody>
                                
                                <>
                                    <tr>
                                        <td>
                                        <button onClick={()=>submitAnswer(row.id, row.ans1)} className="btn btn-outline-secondary">{row.ans1}</button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                        <button onClick={()=>submitAnswer(row.id, row.ans2)} className="btn btn-outline-secondary">{row.ans2}</button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                        <button onClick={()=>submitAnswer(row.id, row.ans3)} className="btn btn-outline-secondary">{row.ans3}</button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                        <button onClick={()=>submitAnswer(row.id, row.ans4)} className="btn btn-outline-secondary">{row.ans4}</button>
                                        </td>
                                    </tr>
                                  </>  
                                
                                 
                                </tbody>
                            </table>
                            
                        </div>
                    </div>
                    )}
                </section>
            </div>
        </div>
    )
}
export default TakeQuiz;