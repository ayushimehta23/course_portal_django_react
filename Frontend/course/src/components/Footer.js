import { Link } from "react-router-dom";


function Footer() {

    return (
    
      <footer  className="py-3 my-1" >
      <ul className="nav justify-content-center border-bottom pb-3 mb-3">
        <li className="nav-item"><Link to="/" class="nav-link px-2 text-body-secondary">Home</Link></li>
        <li className="nav-item"><Link to="/faq" class="nav-link px-2 text-body-secondary">FAQs</Link></li>
        <li className="nav-item"><Link to="/contact-us" class="nav-link px-2 text-body-secondary">Contact Us</Link></li>
      </ul>
      <p class="text-center text-body-secondary">© 2023 Course Portal, Inc</p>
    </footer> 
    
    );
  }
  
  export default Footer;

