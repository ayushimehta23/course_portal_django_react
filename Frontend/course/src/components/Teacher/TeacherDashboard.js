import { Link } from "react-router-dom";
import TeacherSidebar from "./TeacherSidebar";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
const baseURL = "http://127.0.0.1:8000/api";

function TeacherDashboard(){
    const[dashboardData, setDashboardData] = useState([]);
    const teacherId = localStorage.getItem('teacherId');

    useEffect(()=>{
        // Fetch Course
        try{
            axios.get(baseURL+'/teacher/dashboard/'+teacherId)
            .then((res)=>{
                console.log(res);
                setDashboardData(res.data);
            });
        }catch(error){
            console.log(error)
        }
    },[])


    useEffect(() => {
        document.title='Teacher Dashboard';
    });
    return (
        <div className="container mt-4">
            <div className="row">
                <aside className="col-md-3">
                    <TeacherSidebar />
                </aside>
                <section className="col-md-9">
                   <div className="row">
                    <div className="col-md-4">
                    <div className="card border-primary">
                        <h5 className="card-header bg-primary text-white">Total Courses</h5>
                        <div className="card-body">
                            <h3><Link to="/teacher-my-courses">{dashboardData.total_teacher_courses}</Link></h3>
                        </div>
                    </div>
                   </div>
                   <div className="col-md-4">
                    <div className="card border-success">
                        <h5 className="card-header bg-success text-white">Total Students</h5>
                        <div className="card-body">
                            <h3><Link to="/my-users">{dashboardData.total_teacher_students}</Link></h3>
                        </div>
                    </div>
                   </div>
                   
                   </div>
                </section>
            </div>
        </div>
    )
}

export default TeacherDashboard;