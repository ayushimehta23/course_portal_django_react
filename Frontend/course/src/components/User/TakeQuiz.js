import { Link } from "react-router-dom";
import Sidebar from "./Sidebar";
import { useEffect, useState } from "react";
import axios from 'axios';
const baseURL = "http://127.0.0.1:8000/api";

function TakeQuiz(){
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
                    <h4 className="mb-3 border-bottom pb-1">Quiz Title</h4>
                <div className="card">
                        <h5 className="card-header">Question Title</h5>
                    
                        <div className="card-body">
          
                            <table className="table table-bordered">
                                <tbody>
                            
                                    <tr>
                                    <td><input type="radio" /></td>
                                    <th>Option 1</th>
                                    </tr>
                                    <tr>
                                    <td><input type="radio" /></td>
                                    <th>Option 2</th>
                                    </tr>
                                    <tr>
                                    <td><input type="radio" /></td>
                                    <th>Option 3</th>
                                    </tr>
                                    <tr>
                                    <td><input type="radio" /></td>
                                    <th>Option 4</th>
                                    </tr>
                                   
                                 
                                </tbody>
                            </table>
                            <button className="btn btn-dark ">Skip</button>
                          <button className="btn btn-primary ms-2">Submit</button>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
}
export default TakeQuiz;