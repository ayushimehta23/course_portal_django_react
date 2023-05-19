import TeacherSidebar from "./TeacherSidebar";
import  { useState, useEffect} from 'react';
import axios from 'axios';

function AddCourse(){
    const baseURL = "http://127.0.0.1:8000/api";
    const [cats, setCats] = useState([]);
    const [courseData, setCourseData] = useState({
        category: "",
        title: "",
        description: "",
        f_img: "",
        techs: ""
    })

    useEffect(()=>{
        try{
            axios.get(baseURL+'/category')
            .then((res)=>{
            
                setCats(res.data)
              
            })
          }catch(error){
            console.log(error)
          }
        
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

    const formSubmit=(e)=>{
        e.preventDefault();
        const teacherId=localStorage.getItem('teacherId');
        const formData = new FormData();
        formData.append('category',courseData.category);
        formData.append('teacher',teacherId);
        formData.append('title',courseData.title);
        formData.append('description',courseData.description);
        formData.append('techs',courseData.techs);
        formData.append('featured_img',courseData.f_img);
        try{
            axios.post(baseURL+'/course/',formData,{
                headers: {
                    'content-type': 'multipart/form-data'
                }
            })
            .then((res)=>{
                // console.log(res.data);
                // window.location.href='/add-course'
            });
        }catch(error){
            console.log(error)
        }
    }

    // A

    useEffect(() => {
        document.title='Add Course';
    });

    return(
        <div className="container mt-4">
            <div className="row">
                <aside className="col-md-3">
                    <TeacherSidebar />
                </aside>
                <div className="col-9">
                    <div className="card">
                        <h5 className="card-header">Add Course</h5>
                        <div className="card-body">
                        <form>
                        <div class="mb-3">
                            <label for="title" className="form-label">Category</label>
                            <select name='category' onChange={handleChange} className="form-control">
                                <option>--Select--</option>
                                {cats.map((category, index)=>{return <option key={index} value={category
                                .id}>{category.title}</option>})}
                            </select>
                        </div>
                        <div class="mb-3">
                            <label for="title" className="form-label">Title</label>
                            <input type="text" name="title" onChange={handleChange} className="form-control" id="title" />
                        </div>
                        <div class="mb-3">
                            <label for="description" class="form-label">Description</label>
                            <textarea class="form-control" onChange={handleChange} name="description" id="description"></textarea>
                        </div>
                        <div class="mb-3">
                        <label for="video" className="form-label">Featured Image</label>
                            <input type="file" name="f_img" onChange={handleFileChange} className="form-control" id="video" />
                        </div>
                        <div class="mb-3">
                            <label for="techs" className="form-label">Technologies</label>
                            <textarea onChange={handleChange} name="techs" class="form-control" placeholder="PHP, Python, Javascipt, HTML, CSS" id="techs"></textarea>
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
export default AddCourse;