import { useEffect, useState } from "react";
import axios from 'axios';
const baseURL = "http://127.0.0.1:8000/api";

function MessageList(props){
    
    const [messageData, setMessageData] = useState([]);
    
    useEffect(()=>{
        try{
            axios.get(baseURL+'/get-messages/'+props.teacher_id+'/'+props.student_id)
            .then((res)=>{
                
                setMessageData(res.data);
            })
          }catch(error){
            console.log(error)
          }
        
    }, []);
     
    const msgList={
        height: '500px',
        overflow: 'auto',
    }

    const fetchMsgs = () => {
        try{
            axios.get(baseURL+'/get-messages/'+props.teacher_id+'/'+props.student_id)
            .then((res) => {
                setMessageData(res.data);
                const objDiv = document.getElementById("msgList");
                objDiv.scrollTop=objDiv.scrollHeight;
            })
        }catch(error){
            console.log(error);
        }
    }

   

    useEffect(()=>{
    
        document.title='My Quiz';
    });
    return (
        <>
        <p><span className="ms-5 btn btn-sm btn-secondary" onClick={fetchMsgs} title="Refresh"><i class="bi bi-bootstrap-reboot"></i></span></p>
        <div style={msgList} id="msgList"></div>
        {messageData.map((row, index)=> 
            <div className="row mb-4">
                {row.msg_from != 'teacher' &&
                <div className="col-5">
                    <div class="alert alert-primary mb-1">
                        {row.msg_txt}
                    </div>
                    <small className="text-muted">{row.msg_time}</small>
                </div>
                }

                {row.msg_from == 'teacher' &&
                <div className="col-5 offset-7">
                    <div class="alert alert-success mb-1">
                        {row.msg_txt}
                    </div>
                    <small className="text-muted">{row.msg_time}</small>
                </div>
                }
            </div>
        )}
       </>
    )
}
export default MessageList;