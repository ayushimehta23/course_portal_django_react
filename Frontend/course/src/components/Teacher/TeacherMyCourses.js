import { Link } from "react-router-dom";
import TeacherSidebar from "./TeacherSidebar";
import { useEffect, useState } from "react";
import axios from 'axios';
const baseURL = "http://127.0.0.1:8000/api";
function TeacherMyCourses(){
    
    const [courseData, setCourseData] = useState([]);
    const [totalResult, setTotalResult] = useState(0);
    const teacherId=localStorage.getItem('teacherId');
    
    useEffect(()=>{
        try{
            axios.get(baseURL+'/teacher-courses/'+teacherId)
            .then((res)=>{
                setCourseData(res.data);
            })
          }catch(error){
            console.log(error)
          }
        
    }, []);

    
    //  Delete Data
    const Swal = require('sweetalert2')
    const handleDeleteClick = (course_id) => {
        Swal.fire({
            title: 'Confirm',
            text: 'Are you sure you want to delete this data?',
            icon: 'info',
            confirmButtonText: 'Continue',
            showCancelButton: true

          }).then((result)=>{
            if(result.isConfirmed){
                try{
                    axios.delete(baseURL+'/course/'+course_id)
                    .then((res)=>{
                       Swal.fire('success','Data has been deleted.');
                       try{
                        axios.get(baseURL+'/teacher-courses/'+teacherId)
                        .then((res)=>{
                            setTotalResult(res.data.length);
                            setCourseData(res.data);

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
    
        document.title='Teacher | My Courses';
    });
    return (
        <div className="container mt-4">
            <div className="row">
                <aside className="col-md-3">
                    <TeacherSidebar />
                </aside>
                <section className="col-md-9">
                <div className="card">
                        <h5 className="card-header">My Courses</h5>
                    
                        <div className="card-body">
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Image</th>
                                        <th>Total Enrolled</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {courseData.map((course, index)=>
                                    <tr>
                                    <td>
                                        <Link to={'/all-chapters/'+course.id}>{course.title}</Link>
                                        <hr />
                                        {course.course_rating &&
                                        <span>
                                        Rating: {course.course_rating} out of 5
                                        </span>
                                        }
                                        {!course.course_rating &&
                                        <span>
                                        Rating: 0 out of 5
                                        </span>
                                        }

                                    </td>
                                    <td><img src ={course.featured_img} width="80" className="rounded" alt={course.title}/></td>
                                    <td><Link to={`/enrolled-students/`+course.id}>{course.total_enrolled_students}</Link></td>
                                    <td>
                                        
                                        <Link className="btn btn-info btn-sm" to={'/edit-course/'+course.id}>Edit</Link>
                                        <Link className="btn btn-success btn-sm ms-2" to={'/add-chapter/'+course.id}>Add Chapter</Link>
                                        <Link className="btn btn-warning btn-sm ms-2" to={'/assign-quiz/'+course.id}>Assign Quiz</Link>
                                        
                                        <button onClick={()=>handleDeleteClick(course.id)} className="btn btn-danger btn-sm ms-2">Delete</button>
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
export default TeacherMyCourses;