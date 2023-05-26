import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from 'axios';
const baseURL = "http://127.0.0.1:8000/api";

function CategoryCourses(){
  const [courseData, setCourseData] = useState([]);
  const {category_id, category_slug}=useParams();
  const [nextUrl, setNextUrl] = useState();
  const [previousUrl, setPreviousUrl] = useState()
  useEffect(()=>{
    try{
        axios.get(baseURL+'/course/?category='+category_id)
        .then((res)=>{
            setNextUrl(res.data.next)
            setPreviousUrl(res.data.previous)
            setCourseData(res.data.results);
        })
      }catch(error){
        console.log(error)
      }
    
}, []);

const paginationHandler = (url) => {
  try{
    axios.get(url)
    .then((res)=>{
        setNextUrl(res.data.next)
        setPreviousUrl(res.data.previous)
        setCourseData(res.data.results);
    })
  }catch(error){
    console.log(error)
  }
}

  useEffect(() => {
    document.title='Course Category';
});
    return (
        <div className="container mt-3">
        { /* Latest Courses */ }
        <h3 className="pb-1 mb-4">{category_slug}</h3>
    <div className="row mb-4">
    {courseData && courseData.map((course, index)=>
        <div className="col-md-3 mb-4">
    <div className="card">
    <Link to={`/detail/${course.id}`}><img src={course.featured_img} className="card-img-top" alt={course.title}/></Link>
    <div className="card-body">
      <h5 className="card-title"><Link to={`/detail/${course.id}`}>{course.title}</Link></h5>
    </div>
  </div>
  </div>
  )}
  </div>
{/* Pagination Start */}
<nav aria-label="Page navigation example mt-5">
  <ul className="pagination justify-content-center">
    {previousUrl &&
    <li className="page-item"><button className="page-link" onClick={()=>paginationHandler(previousUrl)}><i class="bi bi-arrow-left"></i>Previous</button></li>
    }
    {nextUrl &&
    <li className="page-item"><button className="page-link" onClick={()=>paginationHandler(nextUrl)}><i class="bi bi-arrow-right"></i>Next</button></li>
    }
  </ul>
</nav>
  {/* Pagination End */}
  </div>
    )
}

export default CategoryCourses;