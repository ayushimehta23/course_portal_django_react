import TeacherSidebar from "./TeacherSidebar";
import  { useState, useEffect} from 'react';
import axios from 'axios';
import { useParams } from "react-router-dom";
import Swal from 'sweetalert2';
const baseURL = "http://127.0.0.1:8000/api";

function EditQuiz(){
    const [quizData, setQuizData] = useState({
        title: "",
        detail: "",

    })
    const {quiz_id} = useParams();
    useEffect(()=>{
        
        //Fetch current quiz data
        try{
            axios.get(baseURL+'/teacher-quiz-detail/'+quiz_id)
            .then((res)=>{

                setQuizData({
                   
                    title:res.data.title,
                    detail:res.data.detail,
                 
                });
              
            })
          }catch(error){
            console.log(error)
          }
        // End
        
    }, []);

    const handleChange=(event)=>{
        setQuizData({
            ...quizData, [event.target.name]: event.target.value
        })
    }


    const formSubmit=(e)=>{
        e.preventDefault();
        const teacherId=localStorage.getItem('teacherId');
        const formData = new FormData();
        formData.append('teacher',teacherId);
        formData.append('title',quizData.title);
        formData.append('detail',quizData.detail);
      
        axios.put(baseURL+'/teacher-quiz-detail/'+quiz_id,formData,{
            headers: {
                'content-type': 'multipart/form-data'
            }
        })
        .then((res)=>{
            if(res.status===200){
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
        }).catch((err) => {
            console.log("----error------", err)
        });
        
    }

    useEffect(() => {
        document.title='Edit Quiz';
    }, []);

    return(
        <div className="container mt-4">
            <div className="row">
                <aside className="col-md-3">
                    <TeacherSidebar />
                </aside>
                <div className="col-9">
                    <div className="card">
                        <h5 className="card-header">Edit Quiz</h5>
                        <div className="card-body">
                        <form>
                       
                        <div class="mb-3">
                            <label for="title" className="form-label">Title</label>
                            <input type="text" name="title" value={quizData.title} onChange={handleChange} className="form-control" id="title" />
                        </div>
                        <div class="mb-3">
                            <label for="description" class="form-label">Detail</label>
                            <textarea class="form-control" value={quizData.detail} onChange={handleChange} name="detail" id="detail"></textarea>
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
export default EditQuiz;