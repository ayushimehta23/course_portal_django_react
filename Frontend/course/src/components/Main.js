import Header from './Header';
import Home from './Home';
import Footer from './Footer';
import About from './About';
import CourseDetail from './CourseDetail';
import TeacherDetail from './TeacherDetail';


import {Routes as Switch, Route} from 'react-router-dom';

// Users 
import Login from './User/Login';
import Register from './User/Register';
import Dashboard from './User/Dashboard';
import MyCourses from './User/MyCourses';
import FavoriteCourses from './User/FavoriteCourses';
import RecommendedCourses from './User/RecommendedCourses';
import ProfileSetting from './User/ProfileSetting';
import ChangePassword from './User/ChangePassword';
import StudentLogout from './User/StudentLogout';
import StudentAssignments from './User/StudentAssignments';

// Teacher
import TeacherLogin from './Teacher/TeacherLogin';
import TeacherRegister from './Teacher/TeacherRegister';
import TeacherDashboard from './Teacher/TeacherDashboard';
import TeacherProfileSetting from './Teacher/TeacherProfileSetting';
import TeacherChangePassword from './Teacher/TeacherChangePassword';
import TeacherMyCourses  from './Teacher/TeacherMyCourses';
import UserList from './Teacher/UserList';
import AddCourse from './Teacher/AddCourse';
import TeacherLogout from './Teacher/TeacherLogout';
import AddChapter from './Teacher/AddChapter';
import CourseChapters from './Teacher/CourseChapters';
import EditChapter from './Teacher/EditChapter';
import EditCourse from './Teacher/EditCourse';
import TeacherSkillCourses from './TeacherSkillCourses';
import EnrolledStudents from './Teacher/EnrolledStudents';
import AddAssignment from './Teacher/AddAssignment';
import ShowAssignment from './Teacher/ShowAssignment';

// List Pages
import AllCourses from './AllCourses';
import PopularCourses from './PopularCourses';
import PopularTeachers from './PopularTeachers';
import CategoryCourses from './CategoryCourses';


function Main() {
  return (
   <div className="App">
    
     <Header />
     <Switch>
      <Route path="/" element={<Home />}/>
      <Route path="/about" element={<About />}/>
      <Route path="/detail/:course_id" element={<CourseDetail />}/>
      <Route path="/student-login" element={<Login />}/>
      <Route path="/student-register" element={<Register />}/>
      <Route path="/student-dashboard" element={<Dashboard />}/>
      <Route path="/student-logout" element={<StudentLogout />}/>
      <Route path="/my-courses" element={<MyCourses />}/>
      <Route path="/favorite-courses" element={<FavoriteCourses />}/>
      <Route path="/recommended-courses" element={<RecommendedCourses />}/>
      <Route path="/profile-setting" element={<ProfileSetting />}/>
      <Route path="/change-password" element={<ChangePassword />}/>
      <Route path="/teacher-login" element={<TeacherLogin />}/>
      <Route path="/teacher-register" element={<TeacherRegister />}/>
      <Route path="/teacher-dashboard" element={<TeacherDashboard />}/>
      <Route path="/teacher-profile-setting" element={<TeacherProfileSetting />}/>
      <Route path="/teacher-change-password" element={<TeacherChangePassword />}/>
      <Route path="/teacher-my-courses" element={<TeacherMyCourses />}/>
      <Route path="/my-users" element={<UserList />}/>
      <Route path="/add-course" element={<AddCourse />}/>
      <Route path="/teacher-detail/:teacher_id" element={<TeacherDetail />}/>
      <Route path="/all-courses" element={<AllCourses />}/>
      <Route path="/popular-courses" element={<PopularCourses />}/>
      <Route path="/popular-teachers" element={<PopularTeachers />}/>
      <Route path="/category/:category_slug" element={<CategoryCourses />}/>
      <Route path="/teacher-logout" element={<TeacherLogout/>}/>
      <Route path="/add-chapter/:id" element={<AddChapter/>}/>
      <Route path="/all-chapters/:course_id" element={<CourseChapters/>}/>
      <Route path="/edit-chapter/:chapter_id" element={<EditChapter/>}/>
      <Route path="/edit-course/:course_id" element={<EditCourse/>}/>
      <Route path="/teacher-skill-courses/:skill_name/:teacher_id" element={<TeacherSkillCourses/>}/>
      <Route path="/student-logout" element={<StudentLogout/>}/>
      <Route path="/enrolled-students/:course_id" element={<EnrolledStudents/>}/>
      <Route path="/add-assignment/:student_id/:teacher_id" element={<AddAssignment/>}/>
      <Route path="/show-assignment/:student_id/:teacher_id" element={<ShowAssignment/>}/>
      <Route path="/my-assignments/" element={<StudentAssignments/>}/>
      <Route path="/teacher-chapters/" element={<CourseChapters/>}/>
     </Switch>
     <Footer />
     </div>
    
  );
}

export default Main;