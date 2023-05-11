import { Link } from "react-router-dom";

function TeacherSidebar(){
    return (
        <div className="card">
                        <Link to="/teacher-dashboard" className="list-group-item list-group-item-action"><h5 className="card-header">Teacher Dashboard</h5></ Link>
                    <div className="list-group list-group-flush">
                    <Link to="/teacher-dashboard" className="list-group-item list-group-item-action"></ Link>
                        <Link to="/teacher-my-courses" className="list-group-item list-group-item-action">My Courses</Link>
                        <Link to="/my-users" className="list-group-item list-group-item-action">My Users</Link>
                        <Link to="/add-course" className="list-group-item list-group-item-action">Add Courses</Link>
                        <Link to="/teacher-profile-setting" className="list-group-item list-group-item-action">Profile Setting</Link>
                        <Link to="/teacher-change-password" className="list-group-item list-group-item-action">Change Password</Link>
                        <Link to="/user-login" className="list-group-item list-group-item-action text-danger">Logout</Link>

                    </div>
                    </div>
    )
}

export default TeacherSidebar;