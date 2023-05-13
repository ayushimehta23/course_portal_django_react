import { Link } from "react-router-dom";

function Sidebar(){
    return (
        <div className="card">
                        <Link to="/user-dashboard" className="list-group-item list-group-item-action"><h5 className="card-header">User Dashboard</h5></Link>
                    <div className="list-group list-group-flush">
                    <Link to="/user-dashboard" className="list-group-item list-group-item-action"></Link>
                        <Link to="/my-courses" className="list-group-item list-group-item-action">My Courses</Link>
                        <Link to="/favorite-courses" className="list-group-item list-group-item-action">Favorite Courses</Link>
                        <Link to="/recommended-courses" className="list-group-item list-group-item-action">Recommended Courses</Link>
                        <Link to="/profile-setting" className="list-group-item list-group-item-action">Profile Setting</Link>
                        <Link to="/change-password" className="list-group-item list-group-item-action">Change Password</Link>
                        <Link to="/student-logout" className="list-group-item list-group-item-action text-danger">Logout</Link>

                    </div>
                    </div>
    )
}

export default Sidebar;