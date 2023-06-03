import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from 'axios';

const baseURL = "http://127.0.0.1:8000/api";

function TeacherDetail() {
    const [teacherData, setTeacherData] = useState([]);
    const [courseData, setCourseData] = useState([]);
    const [skillListData, setSkillListData] = useState([]);
    let {teacher_id}=useParams();

    
  useEffect(()=>{
    try{
        axios.get(baseURL+'/teacher/'+teacher_id)
        .then((res)=>{
            console.log(res)
            setTeacherData(res.data);
            setCourseData(res.data.teacher_courses)
            setSkillListData(res.data.skill_list)
        })
      }catch(error){
        console.log(error)
      }
    
}, []);

const icon_style={
  'font-size' :'30px'
}

    useEffect(() => {
        document.title='Teacher Details';
    });
    return (
        <div className="container mt-3">
            <div className="row">
                <div className="col-4">
                  {teacherData.profile_img && 
                <img src={teacherData.profile_img} className="img-thumbnail" alt="Teacher Image"/>
              }
                </div>
                    <div className="col-8">
                        <h3>{teacherData.full_name}</h3>
                        <p>{teacherData.detail}</p>
                        <p className="fw-bold">Skills: &nbsp;
                        {skillListData.map((skill, index)=>
                        <>
                          <Link to={`/teacher-skill-courses/${skill.trim()}/${teacherData.id}`} className="badge badge-pill text-dark bg-warning mr-2">{skill.trim()}</Link>&nbsp;
                          </>
                        )}
                        </p>
                        {teacherData.facebook_url &&
                        <Link  to={teacherData.facebook_url} style={icon_style}><i class="bi bi-facebook"></i></Link>
                        }
                        {teacherData.instagram_url &&
                        <Link to={teacherData.instagram_url} style={icon_style}><i class="bi bi-instagram ms-4"></i></Link>
                        }
                        {teacherData.twitter_url &&
                        <Link to={teacherData.twitter_url} style={icon_style}><i class="bi bi-twitter ms-4"></i></Link>
                        }
                        {teacherData.website_url &&
                        <Link to={teacherData.website_url} style={icon_style}><i class="bi bi-globe ms-4"></i></Link>
                        }
      
                    </div>
            </div>
            { /* Course Videos */ }
            <div className="card mt-4">
  <h5 className
  ="card-header">
   Course List
  </h5>
  <div className="list-group list-group-flush">
    {courseData.map((course, index)=>
    <Link to={`/detail/${course.id}`} className="list-group-item list-group-item-action">{course.title}</Link>
    )}
  </div>
</div>
        
            </div>
        
    )
}

export default TeacherDetail;