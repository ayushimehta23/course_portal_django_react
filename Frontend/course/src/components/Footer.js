import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from 'axios';
const baseURL = "http://127.0.0.1:8000/api";

function Footer() {
  const [pagesData, setPagesData] = useState([]);

useEffect(()=>{
  try{
      axios.get(baseURL+'/pages/')
      .then((res)=>{
        setPagesData(res.data);
      })
    }catch(error){
      console.log(error)
    }
  
}, []);
    return (
      <footer class="py-3 my-5">
      <ul class="nav justify-content-center border-bottom pb-3 mb-3">
        <li class="nav-item"><Link to="/" class="nav-link px-2 text-body-secondary">Home</Link></li>
        <li class="nav-item"><Link to="/faq" class="nav-link px-2 text-body-secondary">FAQs</Link></li>
        
         <li class="nav-item"><Link to="/contact-us" class="nav-link px-2 text-body-secondary">Contact Us</Link></li>
      </ul>
      <p class="text-center text-body-secondary">© 2023 Course Portal, Inc</p>
    </footer> 
     
    );
  }
  
  export default Footer;