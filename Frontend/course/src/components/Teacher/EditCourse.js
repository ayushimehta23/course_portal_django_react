import TeacherSidebar from "./TeacherSidebar";
import  { useState, useEffect} from 'react';
import axios from 'axios';
import { useParams } from "react-router-dom";
import Swal from 'sweetalert2';

function EditCourse(){
    const baseURL = "http://127.0.0.1:8000/api";
    const [cats, setCats] = useState([]);
    const [courseData, setCourseData] = useState({
        category: "",
        title: "",
        description: "",
        prev_img: "",
        f_img: "",
        techs: ""
    })
    const {course_id} = useParams();
    useEffect(()=>{
        try{
            axios.get(baseURL+'/category')
            .then((res)=>{
            
                setCats(res.data)
              
            })
          }catch(error){
            console.log(error)
          }

        // Fetch current course data
        try{
            axios.get(baseURL+'/teacher-course-detail/'+course_id)
            .then((res)=>{

                setCourseData({
                    category:res.data.category,
                    title:res.data.title,
                    description:res.data.description,
                    prev_img:res.data.featured_img,
                    f_img:"",
                    techs:res.data.techs,
                });
              
            })
          }catch(error){
            console.log(error)
          }
        // End
        
    }, []);

    const handleChange=(event)=>{
        setCourseData({
            ...courseData, [event.target.name]: event.target.value
        })
    }

    const handleFileChange=(event)=>{
        setCourseData({
            ...courseData, [event.target.name]: event.target.files[0]
        })
    }

    const formSubmit=()=>{
        const formData = new FormData();
        formData.append('category',courseData.category);
        formData.append('teacher',9);
        formData.append('title',courseData.title);
        formData.append('description',courseData.description);
        if(courseData.f_img!==''){
        formData.append('featured_img',courseData.f_img,courseData.f_img.name);
    }
        formData.append('techs',courseData.techs);
        try{
            axios.put(baseURL+'/teacher-course-detail/'+course_id,formData,{
                headers: {
                    'content-type': 'multipart/form-data'
                }
            })
            .then((res)=>{
                if(res.status==200){
                    const Swal = require('sweetalert2')
                    
                        Swal.fire({
                            title: 'Data has been updated',
                            icon:'success',
                            toast: true,
                            timer: 3000,
                            position: 'top-right',
                            timerProgressBar: true,
                            showConfirmButton: false,
                          });
                 }
            });
        }catch(error){
            console.log(error)
        }
    }

    useEffect(() => {
        document.title='Edit Course';
    });

    return(
        <div className="container mt-4">
            <div className="row">
                <aside className="col-md-3">
                    <TeacherSidebar />
                </aside>
                <div className="col-9">
                    <div className="card">
                        <h5 className="card-header">Edit Course</h5>
                        <div className="card-body">
                        <form>
                        <div class="mb-3">
                            <label for="title" className="form-label">Category</label>
                            <select name='category' value={courseData.category} onChange={handleChange} className="form-control">
                                {cats.map((category, index)=>{return <option key={index} value={category
                                .id}>{category.title}</option>})}
                            </select>
                        </div>
                        <div class="mb-3">
                            <label for="title" className="form-label">Title</label>
                            <input type="text" name="title" value={courseData.title} onChange={handleChange} className="form-control" id="title" />
                        </div>
                        <div class="mb-3">
                            <label for="description" class="form-label">Description</label>
                            <textarea class="form-control" value={courseData.description} onChange={handleChange} name="description" id="description"></textarea>
                        </div>
                        <div class="mb-3">
                        <label for="video" className="form-label">Featured Image</label>
                            <input type="file" name="f_img"  onChange={handleFileChange} className="form-control" id="video" />
                            {courseData.prev_img &&
                           <p className="mt-2"><img src={courseData.prev_img} width="300" /></p>
                            }
                        </div>
                        <div class="mb-3">
                            <label for="techs" className="form-label">Technologies</label>
                            <textarea onChange={handleChange} value={courseData.techs} name="techs" class="form-control" placeholder="PHP, Python, Javascipt, HTML, CSS" id="techs"></textarea>
                        </div>
                        <button type="submit" onClick={formSubmit} class="btn btn-primary">Submit</button>
                        </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default EditCourse;