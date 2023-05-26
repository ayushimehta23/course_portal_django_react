import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from 'axios';

function PopularTeachers(){

  const baseURL="http://127.0.0.1:8000/api/popular-teachers/?all=4";
  const [teacherData, setTeacherData] = useState([]);

 

// Fetch courses when page load
  useEffect(()=>{
      try{
          axios.get(baseURL)
          .then((res)=>{
           
            setTeacherData(res.data);
          })
        }catch(error){
          console.log(error)
        }
      }, []);

      

  useEffect(() => {
    document.title='Popular Teachers';
});
    return (
        <div className="container mt-3">
        <h3 className="pb-1 mb-5">Popular Teachers</h3>
            <div className="row mb-4">
              {teacherData && teacherData.map((teacher,index)=>
                <div className="col-md-3">
            <div className="card">
            <Link to={`/teacher-detail/${teacher.id}`}><img src={teacher.profile_img} className="card-img-top" alt="..."/></Link>
            <div className="card-body">
              <h5 className="card-title"><Link to={`/teacher-detail/${teacher.id}`}>{teacher.full_name}</Link></h5>
            </div>
            <div className="card-footer">
            <div className="title"><span>Total Courses: {teacher.total_teacher_courses}</span>
            </div>
            </div>
          </div>
          </div>
          )}
          </div>

  { /* End Latest Courses */ }
  
  </div>
    )
}

export default PopularTeachers;