function StudentLogout(){
    const studentLoginStatus = localStorage.removeItem('studentLoginStatus')
  
    window.location.href='/student-login';
  
    return(
        <div></div>
    )
}

export default StudentLogout;