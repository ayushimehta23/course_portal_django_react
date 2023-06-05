import TeacherSidebar from "./TeacherSidebar";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';

const baseURL = "http://127.0.0.1:8000/api"; 
function AddQuizQuestion(){

    const [questionData, setQuestionData] = useState({
        quiz: "",
        questions: "",
        ans1: "",
        ans2: "",
        ans3: "",
        ans4:"",
        right_ans:"",
  })


    const handleChange=(event)=>{
        setQuestionData({
            ...questionData, [event.target.name]: event.target.value
        })
    }

   
    const {quiz_id} = useParams();

    const formSubmit=()=>{
     const formData = new FormData();
        formData.append('quiz',quiz_id);
        formData.append('questions',questionData.questions);
        formData.append('ans1',questionData.ans1);
        formData.append('ans2',questionData.ans2);
        formData.append('ans3',questionData.ans3);
        formData.append('ans4',questionData.ans4);
        formData.append('right_ans',questionData.right_ans);
        try{
            axios.post(baseURL+'/quiz-questions/'+quiz_id,formData,{
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
        document.title='Add Quiz Questions';
    });
    return(
        
        <div className="container mt-4">
            <div className="row">
                <aside className="col-md-3">
                    <TeacherSidebar />
                </aside>
                <div className="col-9">
                    <div className="card">
                        <h5 className="card-header">Add Question <Link className="btn btn-success btn-sm float-end" to={'/all-questions/'+quiz_id}>All Questions</Link></h5>
                        <div className="card-body">
                        <form>
                        <div class="mb-3">
                            <label for="title" className="form-label">Quiz</label>
                            <input type="text" onChange={handleChange} name="quiz" className="form-control" id="quiz" />
                            
                        </div>
                        <div class="mb-3">
                            <label for="description" class="form-label">Question</label>
                            <textarea class="form-control" onChange={handleChange} name="questions" id="questions"></textarea>
                        </div>
                        
                        <div class="mb-3">
                            <label for="techs" className="form-label">Ans 1</label>
                            <input onChange={handleChange} name="ans1" class="form-control" id="ans1"></input>
                        </div>
                        <div class="mb-3">
                            <label for="techs" className="form-label">Ans 2</label>
                            <input onChange={handleChange} name="ans2" class="form-control" id="ans2"></input>
                        </div>
                        <div class="mb-3">
                            <label for="techs" className="form-label">Ans 3</label>
                            <input onChange={handleChange} name="ans3" class="form-control" id="ans3"></input>
                        </div>
                        <div class="mb-3">
                            <label for="techs" className="form-label">Ans 4</label>
                            <input onChange={handleChange} name="ans4" class="form-control" id="ans4"></input>
                        </div>
                        <div class="mb-3">
                            <label for="techs" className="form-label">Right Answer</label>
                            <input onChange={handleChange} name="right_ans" class="form-control" id="right_ans"></input>
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
export default AddQuizQuestion;