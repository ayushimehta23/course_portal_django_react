import TeacherSidebar from "./TeacherSidebar";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';

const baseURL = "http://127.0.0.1:8000/api"; 
function AddStudyMaterial(){

    const [studyData, setStudyData] = useState({
        course: "",
        title: "",
        description: "",
        upload: "",
        remarks: ""
    })


    const handleChange=(event)=>{
        setStudyData({
            ...studyData, [event.target.name]: event.target.value
        })
    }

    const handleFileChange=(event)=>{
        setStudyData({
            ...studyData, [event.target.name]: event.target.files[0]
        })
    }
    const {id : course_id} = useParams();

    const formSubmit=()=>{
     const formData = new FormData();
        formData.append('course',course_id);
        formData.append('title',studyData.title);
        formData.append('description',studyData.description);
        formData.append('remarks',studyData.remarks);
        formData.append('upload',studyData.upload,studyData.upload.name);
        try{
            axios.post(baseURL+'/study-material/'+course_id,formData,{
                headers: {
                    'content-type': 'multipart/form-data'
                }
            })
            .then((res)=>{
                // console.log(res.data);
                if(res.status===200){
                    const Swal = require('sweetalert2')
                    
                        Swal.fire({
                            title: 'Data has been updated',
                            icon: 'success',
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
        document.title='Add Chapter';
    });
    return(
        
        <div className="container mt-4">
            <div className="row">
                <aside className="col-md-3">
                    <TeacherSidebar />
                </aside>
                <div className="col-9">
                    <div className="card">
                        <h5 className="card-header">Add Study Material</h5>
                        <div className="card-body">
                        <form>
                        <div class="mb-3">
                            <label for="title" className="form-label">Title</label>
                            <input type="text" onChange={handleChange} name="title" className="form-control" id="title" />
                            
                        </div>
                        <div class="mb-3">
                            <label for="description" class="form-label">Description</label>
                            <textarea class="form-control" onChange={handleChange} name="description" id="description"></textarea>
                        </div>
                        <div class="mb-3">
                        <label for="upload" className="form-label">Upload</label>
                            <input type="file" onChange={handleFileChange}  name='upload' className="form-control" id="upload" />
                        </div>
                        <div class="mb-3">
                            <label for="remarks" className="form-label">Remarks</label>
                            <textarea onChange={handleChange} name="remarks" class="form-control" id="remarks"></textarea>
                        </div>
                        <button type="button" onClick={formSubmit} class="btn btn-primary">Submit</button>
                        </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default AddStudyMaterial;