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

    const submitForm = (e) => {
        e.preventDefault();
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

    const listStyle={
        'list-style':'none'
    }

    useEffect(() => {
        document.title='Contact Us';
    });


    return (
        <div className="container mt-4">
        <div className="row">
            <div className="col-7">
                {contactData.status==="success" && <p className="text-success">Thanks for your Contacting Us</p>}
                {!contactData.status==="error" && <p className="text-danger">Something went wrong!</p>}
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
            <div className="col-4 offset-1">
                <h3 className="border-bottom">Address</h3>
                <ul className="m-0 p-0" style={listStyle}>
                    <li>
                        <label className="fw-bold">Address:</label>
                        <span className="ms-2">50, Green Avenue, New Delhi</span>
                    </li>
                    <li>
                        <label className="fw-bold">Mobile No:</label>
                        <span className="ms-2">9426523102</span>
                    </li>
                    <li>
                        <label className="fw-bold">Phone No:</label>
                        <span className="ms-2">0011-2550814</span>
                    </li>
                </ul>
            </div>
        </div>
    </div>
    )
}

export default ContactUs;