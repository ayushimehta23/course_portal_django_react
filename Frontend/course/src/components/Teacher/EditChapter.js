import { Link } from "react-router-dom";
import TeacherSidebar from "./TeacherSidebar";
import { useEffect, useState } from "react";
import axios from 'axios';
import { useParams } from "react-router-dom";
import Swal from 'sweetalert2';

const baseURL = "http://127.0.0.1:8000/api";
function EditChapter (){

    const [chapterData, setChapterData] = useState({
        course: "",
        title: "",
        description: "",
        prev_video: "",
        video: "",
        remarks: ""
    })

    const handleChange=(event)=>{
        setChapterData({
            ...chapterData, [event.target.name]: event.target.value
        })
    }

    const handleFileChange=(event)=>{
        setChapterData({
            ...chapterData, [event.target.name]: event.target.files[0]
        })
    }

    const {chapter_id} = useParams();

    const formSubmit=()=>{
        const formData = new FormData();
           formData.append('course',chapterData.course);
           formData.append('title',chapterData.title);
           formData.append('description',chapterData.description);
           if(chapterData.video!==''){
            formData.append('video',chapterData.video,chapterData.video.name);
           }
           
           formData.append('remarks',chapterData.remarks);
           try{
               axios.put(baseURL+'/chapter/'+chapter_id,formData,{
                   headers: {
                       'content-type': 'multipart/form-data'
                   }
               })
               .then((res)=>{
                 if(res.status==200){
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

       useEffect(()=>{
        try{
            axios.get(baseURL+'/chapter/'+chapter_id)
            .then((res)=>{

                setChapterData({
                    course:res.data.course,
                    title:res.data.title,
                    description:res.data.description,
                    prev_video:res.data.video,
                    remarks:res.data.remarks,
                    video:""
                });
              
            })
          }catch(error){
            console.log(error)
          }
        
    }, []);
   

    return (
        <div className="container mt-4">
            <div className="row">
                <aside className="col-md-3">
                    <TeacherSidebar />
                </aside>
                <div className="col-9">
                    <div className="card">
                        <h5 className="card-header">Update Chapter</h5>
                        <div className="card-body">
                        <form>
                        <div class="mb-3">
                            <label for="title" className="form-label">Title</label>
                            <input type="text"  onChange={handleChange} value={chapterData
                            .title} name="title" className="form-control" id="title" />
                            
                        </div>
                        <div class="mb-3">
                            <label for="description" class="form-label">Description</label>
                            <textarea class="form-control" value={chapterData.description} onChange={handleChange} name="description" id="description"></textarea>
                            {chapterData.prev_video &&
                            <video controls width="100%" height="240" className="mt-2">
                            <source src={chapterData.prev_video} type="video/webm"/>

                            <source src={chapterData.prev_video} type="video/mp4"/>
                            Sorry, your browser doesn't support embedded videos.
                            </video>
                            }
                        </div>
                        <div class="mb-3">
                        <label for="video" className="form-label">Video</label>
                            <input type="file" onChange={handleFileChange}  name='video' className="form-control" id="video" />
                        </div>
                        <div class="mb-3">
                            <label for="techs" className="form-label">Remarks</label>
                            <textarea onChange={handleChange} value={chapterData.remarks} name="remarks" class="form-control"  id="techs"></textarea>
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

export default EditChapter;