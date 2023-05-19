import { Link } from "react-router-dom";
import Sidebar from "./Sidebar";
import { useEffect, useState } from "react";
import axios from 'axios';
const baseURL = "http://127.0.0.1:8000/api";

function CourseQuizList(){
    const [courseData, setCourseData] = useState([]);
    const studentId = localStorage.getItem('studentId')

    useEffect(()=>{
        try{
            axios.get(baseURL+'/fetch-enrolled-courses/'+studentId)
            .then((res)=>{
                setCourseData(res.data);
            })
          }catch(error){
            console.log(error)
          }
        
    }, []);


    useEffect(() => {
        document.title='Quiz List';
    });
    return (
        <div className="container mt-4">
            <div className="row">
                <aside className="col-md-3">
                    <Sidebar />
                </aside>
                <section className="col-md-9">
                <div className="card">
                        <h5 className="card-header">Quiz List</h5>
                    
                        <div className="card-body">
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th>Quiz</th>
                                        <th>Action</th>
                                      
                                    </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td>Python Quiz</td>
                                    <td className="text-success">Attempted</td>
                                    </tr>
                                    <tr>
                                    <td>Django Quiz</td>
                                    <td><Link className="btn btn-sm btn-warning" to={'/take-quiz/1'}>Take Quiz</Link></td>
                                    </tr>
                                 
                                </tbody>
                            </table>
                          
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
}
export default CourseQuizList;