import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from 'axios';
import Swal from 'sweetalert2'
const siteURL = "http://127.0.0.1:8000/";
const baseURL = "http://127.0.0.1:8000/api";

function CourseDetail () {
  const [courseData, setCourseData] = useState([]);
  const [chapterData, setChapterData] = useState([]);
  const [teacherData, setTeacherData] = useState([]);
  const [relatedCourseData, setRelatedCourseData] = useState([]);
  const [techListData, setTechListData] = useState([]);
  const [enrolledStatus, setEnrolledStatus] = useState();
  const [userLoginStatus, setUserLoginStatus] = useState();
  const [courseViews, setCourseViews] = useState(0);
  const [ratingStatus, setRatingStatus] = useState();
  const [favoriteStatus, setFavoriteStatus] = useState();
  const [avgRating, setAvgRating] = useState(0);
  const {course_id}=useParams();
  const studentId=localStorage.getItem('studentId');

    useEffect(()=>{
      try{
        axios.get(baseURL+'/course/'+course_id)
        .then((res)=>{
            setCourseData(res.data);
            setChapterData(res.data.course_chapters)
            setTeacherData(res.data.teacher)
            setRelatedCourseData(JSON.parse(res.data.related_videos))
            setTechListData(res.data.tech_list)
            if(res.data.course_rating!='' && res.data.course_rating!=null)
            {
              setAvgRating(res.data.course_rating)
            }
        })
      }catch(error){
        console.log(error)
      }

      // Update View
      axios.get(baseURL+'/update-view/'+course_id)
      .then((res)=>{
        setCourseViews(res.data.views)
      })



      // Fetch enroll status
      try{
        axios.get(baseURL+'/fetch-enroll-status/'+studentId+'/'+course_id)
        .then((res)=>{
            if(res.data.bool==true){
              setEnrolledStatus('success')
            }
        })
      }catch(error){
        console.log(error)
      }
      
      // Fetch rating status
      try{
        axios.get(baseURL+'/fetch-rating-status/'+studentId+'/'+course_id)
        .then((res)=>{
            if(res.data.bool==true){
              setRatingStatus('success')
            }
        })
      }catch(error){
        console.log(error)
      }


  
    // Fetch enroll status
    try{
      axios.get(baseURL+'/fetch-favorite-status/'+studentId+'/'+course_id)
      .then((res)=>{
        if(res.data.bool==true){
          setFavoriteStatus('success');

        }
      });
    }catch(error){
      console.log(error)
    }
    

    const studentLoginStatus=localStorage.getItem('studentLoginStatus');
    if(studentLoginStatus=='true'){
      setUserLoginStatus('success')
    }
  },[])


  // Enroll in this course
  const enrollCourse = () =>{
    console.log("Hello World")
    
    const formData = new FormData();
    formData.append('course',course_id);
    formData.append('student',studentId);
    try{
        axios.post(baseURL+'/student-enroll-course/',formData,{
            headers: {
                'content-type': 'multipart/form-data'
            }
        })
        .then((res)=>{
           if(res.status===200||res.status===201){
            Swal.fire({
              title:'You have successfully enrolled in this course',
              icon:'success',
              toast:true,
              timer:3000,
              position:'top-right',
              timerProgressBar:true,
              showConfirmButton:false
            })
            setEnrolledStatus('success')
           }
        });
    }catch(error){
        console.log(error)
    }
    }
  
// Mark as favorite course

const markAsFavorite = () => {
  const formData = new FormData();
  formData.append('course',course_id);
  formData.append('student',studentId);
  formData.append("status", true);
  try{
    axios.post(baseURL+'/student-add-favorite-course/',formData,{
      headers: {
        'content-type': 'multipart/form-data'
      }
    })
    .then((res)=>{
      if(res.status==200 || res.status==201){
        Swal.fire({
          title: "This course has been added in your wish list",
          icon:'success',
          toast:true,
          timer:3000,
          position:'top-right',
          timerProgressBar:true,
          showConfirmButton: false
        });
        setFavoriteStatus('success');
      }
    });
  }catch(error){
    console.log(error);
  }
}

// End


// Remove from favorite course
const removeFavorite = (pk) => {
  const formData = new FormData();
  formData.append('course',course_id);
  formData.append('student',studentId);
  formData.append('status',false);
  try{
    axios.get(baseURL+'/student-remove-favorite-course/'+course_id+'/'+studentId,{
      headers:{
        'content-type': 'multipart/form-data'
      }
    })
    .then((res)=>{
      if(res.status===200||res.status===201){
        Swal.fire({
        title: 'This course has been removed from your wish list',
        icon:'success',
        toast: true,
        timer: 3000,
        position: 'top-right',
        timerProgressBar:true,
        showConfirmButton:false

      });
      setFavoriteStatus('');
      }
    });
  }catch(error){
    console.log(error)
  }
}

// Add Rating
const [ratingData, setRatingData] = useState({
  rating: "",
  reviews: "",
  
})

const formSubmit=()=>{
  const formData = new FormData();
     formData.append('course',course_id);
     formData.append('student',studentId);
     formData.append('rating',ratingData.rating);
     formData.append('reviews',ratingData.reviews);
     
     try{
         axios.post(baseURL+'/course-rating/',formData,{
          headers: {
            'content-type': 'multipart/form-data'
          }
         })
         .then((res)=>{
             if(res.status===200||res.status===201){
              Swal.fire({
                title: 'Rating has been saved',
                icon: 'success',
                toast: true,
                timer: 3000,
                position: 'top-right',
                timerProgressBar: true,
                showConfirmButton: false,
              })
            
             }
             
         });
         
     }catch(error){
         console.log(error)
     }
 }

const handleChange=(event)=>{
  setRatingData({
      ...ratingData, [event.target.name]: event.target.value
  })
}

const handleFileChange=(event)=>{
  setChapterData({
      ...chapterData, [event.target.name]: event.target.files[0]
  })
}


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
                          <Link to="#" className="badge badge-pill text-dark bg-warning mr-2">{tech.trim()}</Link>&nbsp;
                          </>
                        )}
                        </p>
                        <p className="fw-bold">Total Enrolled: {courseData.total_enrolled_students} Student(s)</p>
                        <p className="fw-bold">Rating: {avgRating} out of 5
                        <p className="fw-bold">Views: {courseViews}</p>
                        { enrolledStatus === "success" && userLoginStatus==="success" && 
                        <>
                        { ratingStatus != 'success' && 
                        <button className="btn btn-success btn-sm ms-2" data-bs-toggle="modal" data-bs-target="#ratingModal" >Rating</button>
                        }
                        { ratingStatus == 'success' && 
                        <small className="badge bg-info text-dark ms-2">You already rated this course</small>
                        }
                        <div className="modal fade" id="ratingModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div className="modal-dialog modal-lg">
                              <div className="modal-content">
                              <div className="modal-header">
                                  <h1 className="modal-title" id="exampleModalLabel">Rate for {courseData.title}</h1>
                                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                              </div>
                              <div className="modal-body">
                              <form>
                              <div className="mb-3">
                                <label for="exampleInputEmail1" class="form-label">Rating</label>
                                <select onChange={handleChange} className="form-control" name="rating">
                                  <option value="1">1</option>
                                  <option value="2">2</option>
                                  <option value="3">3</option>
                                  <option value="4">4</option>
                                  <option value="5">5</option>
                                </select>
                            
                              </div>
                              <div className="mb-3">
                                <label for="exampleInputPassword1" className="form-label">Review</label>
                                <textarea onChange={handleChange} className="form-control" name="review" rows="10"></textarea>
                              </div>
                              <button type="button" onClick={formSubmit} class="btn btn-primary">Submit</button>
                            </form>
                              </div>
                        
                              </div>
                            </div>
                          </div>
                          </>
                        }
                        </p>
                        { enrolledStatus === "success" && userLoginStatus=="success" && 
                        <p><span>You are already enrolled in this course</span></p>
                        }

                        { userLoginStatus==="success" &&  enrolledStatus !=='success' &&
                        <p><button onClick={enrollCourse} type="button" className="btn btn-success">Enroll in this course</button></p>
                        }
                        
                        { userLoginStatus==="success" && favoriteStatus!=='success' &&
                        <p><button onClick={markAsFavorite} type="button" title="Mark as Favorites" className="btn btn-outline-danger"><i class="bi bi-heart-fill"></i></button></p>
                        }
                        { userLoginStatus==="success" && favoriteStatus === 'success' &&
                          <p><button onClick={removeFavorite} title="Remove from Favorites" type="button" className="btn btn-danger"><i class="bi bi-heart-fill"></i></button></p>
                        }


                        { userLoginStatus!=="success" && 
                        <p><Link to="/student-login">Please login to enroll in this course</Link></p>
                        }
                        
                    </div>
            </div>
            { /* Course Videos */ }
            {enrolledStatus === "success" && userLoginStatus=="success" && 
            <div className="card mt-4">
            <h5 className
            ="card-header">
            In This Course:
            </h5>
            <ul className="list-group list-group-flush">
            {chapterData.map((chapter, index)=>
              <li className="list-group-item">{chapter.title} <span className="float-end"> <button className="btn btn-sm btn-danger" data-bs-toggle="modal" data-bs-target="#videoModal1" float-end><i class="bi-youtube"></i></button>
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
}
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