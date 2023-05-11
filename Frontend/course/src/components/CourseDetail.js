import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from 'axios';
const siteURL = "http://127.0.0.1:8000/";
const baseURL = "http://127.0.0.1:8000/api";

function CourseDetail () {
  const [courseData, setCourseData] = useState([]);
  const [chapterData, setChapterData] = useState([]);
  const [teacherData, setTeacherData] = useState([]);
  const [relatedCourseData, setRelatedCourseData] = useState([]);
  const [techListData, setTechListData] = useState([]);
  let {course_id}=useParams();

  useEffect(()=>{
    try{
        axios.get(baseURL+'/course/'+course_id)
        .then((res)=>{
            setCourseData(res.data);
            setChapterData(res.data.course_chapters)
            setTeacherData(res.data.teacher)
            setRelatedCourseData(JSON.parse(res.data.related_videos))
            setTechListData(res.data.tech_list)
        })
      }catch(error){
        console.log(error)
      }
    
}, []);

const enrollCourse = () =>{
  console.log("Hello World")
}

// console.log(relatedCourseData)

  useEffect(() => {
    document.title='Course Details';
});
   
    return (
        <div className="container mt-3">
            <div className="row">
                <div className="col-4">
                <img src={courseData.featured_img} className="img-thumbnail" alt={courseData.title}/>
                </div>
                    <div className="col-8">
                        <h3>{courseData.title}</h3>
                        <p>{courseData.description}</p>
                        <p className="fw-bold">Course By: <Link to={`/teacher-detail/${teacherData.id}`}>{teacherData.full_name}</Link></p>
                        <p className="fw-bold">Techs:&nbsp;
                        {techListData.map((tech, index)=>
                        <>
                          <Link to={`/category/${tech.trim()}`} className="badge badge-pill text-dark bg-warning mr-2">{tech.trim()}</Link>&nbsp;
                          </>
                        )}
                        </p>
                        <p className="fw-bold">Duration: 3 Hours 30 Minutes</p>
                        <p className="fw-bold">Total Enrolled: 456 Students</p>
                        <p className="fw-bold">Rating: 4.5/5</p>
                        <p><Link to="/" onClick={enrollCourse} className="btn btn-success">Enroll in this course</Link></p>
                    </div>
            </div>
            { /* Course Videos */ }
            <div className="card mt-4">
            <h5 className
            ="card-header">
            In This Course:
            </h5>
            <ul className="list-group list-group-flush">
            {chapterData.map((chapter, index)=>
              <li className="list-group-item">{chapter.title} <span className="float-end"> <span className="me-5">1 Hour 30 Minutes</span><button className="btn btn-sm btn-danger" data-bs-toggle="modal" data-bs-target="#videoModal1" float-end><i class="bi-youtube"></i></button>
              </span>
              { /* Video Modal */}
              <div className="modal" id="videoModal1" tabindex="-1" aria-labelledby="exampleModalLabel">
            <div className="modal-dialog modal-xl">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Video 1</h5>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                <div class="ratio ratio-16x9">
            <iframe src={chapter.video} title={chapter.title} allowfullscreen></iframe>
          </div>
                </div>
      
    </div>
  </div>
</div>
{ /*End Video Modal */}
    </li>
    )}
  </ul>
</div>
<h3 className="pb-1 mb-4 mt-5">Related Courses </h3>
    <div className="row mb-4">
    {relatedCourseData.map((rcourse, index)=>
        <div className="col-md-3">
    <div className="card">
    <Link target="__blank" to={`/detail/${rcourse.pk}`}><img src={`${siteURL}media/${rcourse.fields.featured_img}`} className="card-img-top" alt={rcourse.fields.title}/></Link>
    <div className="card-body">
      <h5 className="card-title"><Link target="__blank" to={`/detail/${rcourse.pk}`}>{rcourse.fields.title}</Link></h5>
    </div>
  </div>
  </div>
    )}
            </div>
        </div>
    )
}

export default CourseDetail;