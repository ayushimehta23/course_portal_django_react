import TeacherSidebar from "./TeacherSidebar";
import  { useState, useEffect } from 'react';
import axios from 'axios';

function AddQuiz(){
    const baseURL = "http://127.0.0.1:8000/api";
    const [cats, setCats] = useState([]);
    const [quizData, setQuizData] = useState({
        title: "",
        detail: "",
    })

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
        try{
            axios.post(baseURL+'/quiz/',formData,{
        
            })
            .then((res)=>{
                // console.log(res.data);
                window.location.href='/add-quiz';
            });
        }catch(error){
            console.log(error)
        }
    }

    // A

    useEffect(() => {
        document.title='Add Quiz';
    });

    return(
        <div className="container mt-4">
            <div className="row">
                <aside className="col-md-3">
                    <TeacherSidebar />
                </aside>
                <div className="col-9">
                    <div className="card">
                        <h5 className="card-header">Add Quiz</h5>
                        <div className="card-body">
                        <form>
                     
                        <div class="mb-3">
                            <label for="title" className="form-label">Title</label>
                            <input type="text" name="title" onChange={handleChange} className="form-control" id="title" />
                        </div>
                        <div class="mb-3">
                            <label for="description" class="form-label">Detail</label>
                            <textarea class="form-control" onChange={handleChange} name="detail" id="detail"></textarea>
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
export default AddQuiz;