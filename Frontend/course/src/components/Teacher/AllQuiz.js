import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import TeacherSidebar from "./TeacherSidebar";
import { useEffect, useState } from "react";
import axios from 'axios';
const baseURL = "http://127.0.0.1:8000/api";

function AllQuiz(){
    
    const [quizData, setQuizData] = useState([]);
    const [totalResult, setTotalResult] = useState(0);

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
        
    }, []);

     //  Delete Data
     const Swal = require('sweetalert2')
     const handleDeleteClick = (quiz_id) => {
         Swal.fire({
             title: 'Confirm',
             text: 'Are you sure you want to delete this data?',
             icon: 'info',
             confirmButtonText: 'Continue',
             showCancelButton: true
 
           }).then((result)=>{
             if(result.isConfirmed){
                 try{
                     axios.delete(baseURL+'/quiz/'+quiz_id)
                     .then((res)=>{
                        Swal.fire('success','Data has been deleted.');
                        try{
                         axios.get(baseURL+'/teacher-quiz/'+teacherId)
                         .then((res)=>{
                             setTotalResult(res.data.length);
                             setQuizData(res.data);
 
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
                        <h5 className="card-header">My Quiz</h5>
                    
                        <div className="card-body">
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Total Questions</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {quizData.map((row, index)=>
                                    <tr>
                                    <td>
                                        <Link to={'/all-questions/'+row.id}>{row.title}</Link>
                                    </td>
                                    
                                    <td><Link to="#">123</Link></td>
                                    <td>
                                        
                                        <Link className="btn btn-info btn-sm" to={'/edit-quiz/'+row.id}>Edit</Link>
                                        <Link className="btn btn-success btn-sm ms-2" to={'/add-quiz-question/'+row.id}>Add Questions</Link>
                                        <button onClick={()=>handleDeleteClick(row.id)} className="btn btn-danger btn-sm ms-2">Delete</button>
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
export default AllQuiz;