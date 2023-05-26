import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const baseURL = "http://127.0.0.1:8000/api/contact/";
function ContactUs(){



    const [contactData, setContactData] = useState({
        'full_name':'',
        'email':'',
        'query_txt':'',
        'status':'',
        
    })
    
    // Change element value
    const  handleChange=(event)=>{
        setContactData({
            ...contactData, [event.target.name]:event.target.value
        });
    }
    
    // Submit Form

    const submitForm = () => {
        // console.log(teacherData)
        const contactFormData = new FormData();
        contactFormData.append("full_name", contactData.full_name)
        contactFormData.append("email", contactData.email)
        contactFormData.append("query_txt", contactData.query_txt)
       
        
        try {
            axios.post(baseURL, contactFormData).then((response)=>{
                setContactData({
                    'full_name':'',
                    'email':'',
                    'query_txt':'',
                    'status':'success',
                })
            })
        }catch(error){
            console.log(error);
            setContactData({'status':'error'})
        }
        
    };

    // End
    useEffect(() => {
        document.title='Contact Us';
    });


    return (
        <div className="container mt-4">
        <div className="row">
            <div className="col-8 offset-2">
                {contactData.status=="success" && <p className="text-success">Thanks for your Contacting Us</p>}
                {!contactData.status=="error" && <p className="text-danger">Something went wrong!</p>}
            <div className="card">
                <h5 className="card-header">Contact Us</h5>
                                    <div className="card-body">
                                    <form>
                                    <div className="mb-3">
                    <label for="exampleInputEmail1" className="form-label">Full Name</label>
                    <input value={caches.full_name} onChange={handleChange} name="full_name" type="text" className="form-control" />

                    </div>
                    <div className="mb-3">
                    <label for="exampleInputEmail1" className="form-label">Email</label>
                    <input value={contactData.email} onChange={handleChange} name="email" type="email" className="form-control" />

                    </div>
            

                    <div className="mb-3">
                    <label for="exampleInputEmail1" className="form-label">Query</label>
                    <textarea rows= "10" value={contactData.query_txt} onChange={handleChange} name="query_txt" className="form-control"></textarea>

                    </div>

                    <button onClick={submitForm} type="submit" className="btn btn-primary">Send</button>
                    </form> 
                                    </div>
            </div>
            </div>
        </div>
    </div>
    )
}

export default ContactUs;