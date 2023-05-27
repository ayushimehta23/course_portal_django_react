import { Link } from "react-router-dom";
import Dropdown from 'react-bootstrap/Dropdown';
import { useState } from "react";

function Header() {
  const [searchString, setSearchString] = useState({
    search: "",
  });
  const teacherLoginStatus = localStorage.getItem('teacherLoginStatus')
  const studentLoginStatus = localStorage.getItem('studentLoginStatus')

  const handleChange=(event)=>{
    
    setSearchString({
        ...searchString, [event.target.name]: event.target.value
    })
}

  const searchCourse = () => {
    
    if (searchString.search!=''){
    window.location.href='/search/'+searchString.search
  }
  }
  
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">Course Portal</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <form class="d-flex" role="search">
        <input name="search" onChange={handleChange} class="form-control me-2" type="search" placeholder="Search by Course title" aria-label="Search"/>
        <button onClick={searchCourse} class="btn btn-warning" type="button">Search</button>
      </form>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav ms-auto">
            <Link className="nav-link active" aria-current="page" to="/">Home</Link>
            <Link className="nav-link" to="/category">Categories</Link>
            <Link className="nav-link" to="/all-courses">Courses</Link>
            <Dropdown>
      <Dropdown.Toggle variant="secondary" id="dropdown-basic">
        Teacher
      </Dropdown.Toggle>

      <Dropdown.Menu>
        {teacherLoginStatus!='true' && 
        <>
        <Dropdown.Item href="/teacher-login">Login</Dropdown.Item>
        <Dropdown.Item href="/teacher-register/">Register</Dropdown.Item>
        </>
        }
        {teacherLoginStatus=='true' && 
        <>
        <Dropdown.Item href="teacher-dashboard">Dashboard</Dropdown.Item>
        <Dropdown.Item href="teacher-logout">Logout</Dropdown.Item>
        </>
        }
       
      </Dropdown.Menu>
      
    </Dropdown>
    <span><h3>..</h3></span>
            <Dropdown>
      <Dropdown.Toggle variant="secondary" id="dropdown-basic">
        User
      </Dropdown.Toggle>

      <Dropdown.Menu>
        {studentLoginStatus!='true'  && 
        <>
        <Dropdown.Item href="/student-login">Login</Dropdown.Item>
        <Dropdown.Item href="/student-register">Register</Dropdown.Item>
        </>
        }
         {studentLoginStatus=='true'  &&
         <>
        <Dropdown.Item href="/student-dashboard">Dashboard</Dropdown.Item>
        <Dropdown.Item href="/student-logout">Logout</Dropdown.Item>
        </>
        }
      </Dropdown.Menu>
    </Dropdown>
           
        </div>
        </div>
      </div>
    </nav>
  
    );
  }
  
  export default Header;