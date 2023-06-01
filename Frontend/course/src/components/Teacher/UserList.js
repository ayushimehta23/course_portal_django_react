import { Link, useParams } from "react-router-dom";
import TeacherSidebar from "./TeacherSidebar";
import { useEffect, useState } from "react";
import axios from 'axios';
import MessageList from "./MessageList";
import Swal from "sweetalert2";
const baseURL = "http://127.0.0.1:8000/api";
function UserList(){
    
    const [studentData, setStudentData] = useState([]);

   
    const teacherId = localStorage.getItem('teacherId')
    
    useEffect(()=>{
        try{
            axios.get(baseURL+'/fetch-all-enrolled-students/'+teacherId)
            .then((res)=>{
                setStudentData(res.data);
            })
          }catch(error){
            console.log(error)
          }
        
    }, []);

    const msgList={
        height: '500px',
        overflow: 'auto',
    }

    const [groupMsgData, setGroupMsgData] = useState({
        msg_text: "",
    })

    const [groupErrorMsg, setGroupErrorMsg] = useState('');
    const [groupSuccessMsg, setGroupSuccessMsg] = useState('');

    const [msgData, setMsgData] = useState({
        msg_text: "",
    })

    const [errorMsg, setErrorMsg] = useState('');
    const [successMsg, setSuccessMsg] = useState('');

    const handleChange=(event)=>{
        setMsgData({
            ...msgData, [event.target.name]: event.target.value
        })
    }

    const groupHandleChange=(event)=>{
        setGroupMsgData({
            ...groupMsgData, [event.target.name]: event.target.value
        })
    }

    const formSubmit=(student_id)=>{
        const formData = new FormData();
           formData.append('msg_txt',msgData.msg_text);
           formData.append('msg_from','teacher');
           try{
               axios.post(baseURL+'/send-message/'+teacherId+'/'+student_id,formData)
               .then((res)=>{
                   if(res.data.bool===true){
                    setMsgData({
                        'msg_text':''
                    })
                        setSuccessMsg(res.data.msg);
                        setErrorMsg('');
                    }else{
                        setErrorMsg(res.data.msg);
                        setSuccessMsg('');
                    }
               });
           }catch(error){
               console.log(error)
           }
       }

       const groupFormSubmit=()=>{
        const formData = new FormData();
           formData.append('msg_txt',groupMsgData.msg_text);
           formData.append('msg_from','teacher');
           try{
               axios.post(baseURL+'/send-group-message/'+teacherId,formData)
               .then((res)=>{
                   if(res.data.bool===true){
                    setMsgData({
                        'msg_text':''
                    })
                        setGroupSuccessMsg(res.data.msg);
                        setGroupErrorMsg('');
                    }else{
                        setGroupErrorMsg(res.data.msg);
                        setGroupSuccessMsg('');
                    }
               });
           }catch(error){
               console.log(error)
           }
       }

    useEffect(()=>{
    
        document.title='Teacher | My Courses';
    });
    return (
        <div className="container mt-4">
            <div className="row">
                <aside className="col-md-3">
                    <TeacherSidebar />
                </aside>
                <section className="col-md-9">
                <div className="card">
                        <h5 className="card-header">
                            All Student List
                            <button type="button" class="btn btn-primary float-end btn-sm" data-bs-toggle="modal" data-bs-target="#groupMsgModal">
                            Send Message
                            </button>
                        </h5>
                    
                        <div className="modal fade" id="groupMsgModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                        <div className="modal-dialog">
                            <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="staticBackdropLabel">Send Message to All Students</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                            {groupSuccessMsg && <p className="text-success">{groupSuccessMsg}</p>}
                            {groupErrorMsg && <p className="text-danger">{groupErrorMsg}</p>}
                            <form>
                                <div className="mb-3">
                                    <label for="exampleInputEmail1" className="form-label">Message</label>
                                    <textarea onChange={groupHandleChange} value={groupMsgData.msg_text} name="msg_text" className="form-control" rows="10"></textarea>
                                </div>
                                <button type="button" onClick={groupFormSubmit} className="btn btn-primary">Submit</button>
                             </form>
                            </div>
        
                            </div>
                        </div>
                        </div>


                        <div className="card-body">
                            
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Username</th>
                                        <th>Interested Categories</th>
                                        <th>Assignment</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {studentData.map((row, index)=>
                                    <tr>
                                    <td>{row.student.full_name}</td>
                                    <td>{row.student.email}</td>
                                    <td>{row.student.username}</td>
                                    <td>
                                    {row.student.interested_categories} 
                                    </td>
                                    <td>
                                        <Link to={`/show-assignment/${row.student.id}/${teacherId}`} className="btn btn-sm btn-warning mb-2 me-2">Assignments</Link>
                                    <Link to={`/add-assignment/${row.student.id}/${teacherId}`} className="btn btn-sm btn-success mb-2 me-2">Add Assignment</Link>
                                    <button data-bs-toggle="modal" data-bs-target={`#msgModal${index}`} className="btn btn-sm btn-dark mb-2" title="Send Message"><i class="bi bi-chat-fill"></i></button>

                                    {/* {Message Modal} */}
                                    <div className="modal fade" id={`msgModal${index}`}  tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                    <div className="modal-dialog modal-fullscreen">
                                        <div className="modal-content">
                                        <div className="modal-header">
                                            <h5 className="modal-title" id="exampleModalLabel">
                                                <span className="text-danger">{row.student.full_name}</span>
                                                
                                            </h5>
                                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                        </div>
                                        <div class="modal-body">
                                            <div className="row">
                                                <div className="col-md-8 mb-2 col-12 border-end" style={msgList}>
                                                 <MessageList teacher_id={teacherId} student_id={row.student.id} />       
                                                </div>
                                                <div className="col-md-4 col-12">
                                                {successMsg && <p className="text-success">{successMsg}</p>}
                                                {errorMsg && <p className="text-danger">{errorMsg}</p>}
                                                <form>
                                                <div class="mb-3">
                                                    <label for="exampleInputEmail1" class="form-label">Message</label>
                                                    <textarea onChange={handleChange} value={msgData.msg_text} name="msg_text" className="form-control" rows="10"></textarea>
                                                </div>
                                                <button type="button" onClick={()=>formSubmit(row.student.id)} class="btn btn-primary">Submit</button>
                                                </form>
                                                </div>
                                            </div>
                                        </div>
                                       
                                        </div>
                                    </div>
                                    </div>
                                    </td>
                                    </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
}
export default UserList;