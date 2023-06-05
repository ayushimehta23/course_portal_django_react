import { Link } from "react-router-dom";
import TeacherSidebar from "./TeacherSidebar";
import { useEffect, useState } from "react";
import axios from 'axios';
import { useParams } from "react-router-dom";

import Swal from 'sweetalert2';
const baseURL = "http://127.0.0.1:8000/api";


function QuizQuestions(){
    const [questionData, setQuestionData] = useState([]);
    const [totalResult, setTotalResult] = useState(0);
    const {quiz_id} = useParams();
    useEffect(()=>{
        try{
            axios.get(baseURL+'/quiz-questions/'+quiz_id)
            .then((res)=>{
            
                setTotalResult(res.data.length);
                setQuestionData(res.data);
              
            })
          }catch(error){
            console.log(error)
          }
        
    }, []);

    //  Delete Data
    const Swal = require('sweetalert2')
    const handleDeleteClick = (question_id) => {
        Swal.fire({
            title: 'Confirm',
            text: 'Are you sure you want to delete this data?',
            icon: 'info',
            confirmButtonText: 'Continue',
            showCancelButton: true

          }).then((result)=>{
            if(result.isConfirmed){
                try{
                    axios.delete(baseURL+'/question/'+question_id)
                    .then((res)=>{
                       Swal.fire('success','Data has been deleted.');
                       try{
                        axios.get(baseURL+'/quiz-questions/'+quiz_id)
                        .then((res)=>{
                            setTotalResult(res.data.length);
                            setQuestionData(res.data);

                        })
                    }catch(error){
                            console.log(error);
                        }
                    });
                }catch(error){
                    Swal.fire('error','Data has not been deleted');
                }
            }else{
                Swal.fire('error','Data has not been deleted');
            }
        });
    }
                
    useEffect(() => {
        document.title='Quiz Questions';
    });
   return(
    <div className="container mt-4">
            <div className="row">
                <aside className="col-md-3">
                    <TeacherSidebar />
                </aside>
                <section className="col-md-9">
                <div className="card">
                        <h5 className="card-header">All Questions ({totalResult}) <Link className="btn btn-success btn-sm float-end" to={'/add-quiz-question/'+quiz_id}>Add Question</Link></h5>
                    
                        <div className="card-body">
                        <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th>Questions</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {questionData.map((row, index)=>
                                    <tr>
                                    <td><Link to={'/edit-question/'+row.id}>{row.questions}</Link></td>
                                    <td>
                                        <Link to={'/edit-question/'+row.id} className="btn btn-sm text-white btn-info"><i class="bi bi-pencil-square"></i></Link>
                                        <button onClick={()=>handleDeleteClick(row.id)} className="btn btn-sm btn-danger ms-1"><i class="bi bi-trash"></i></button>
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
export default QuizQuestions;