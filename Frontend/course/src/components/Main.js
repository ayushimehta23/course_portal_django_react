import Header from './Header';
import Home from './Home';
import Footer from './Footer';
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
import UpdatePassword from './User/UpdatePassword';
import StudentLogout from './User/StudentLogout';
import StudentAssignments from './User/StudentAssignments';

// Teacher
import TeacherLogin from './Teacher/TeacherLogin';
import TeacherRegister from './Teacher/TeacherRegister';
import TeacherDashboard from './Teacher/TeacherDashboard';
import TeacherProfileSetting from './Teacher/TeacherProfileSetting';
import TeacherUpdatePassword from './Teacher/TeacherUpdatePassword';
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
import StudyMaterials from './Teacher/StudyMaterials';

// Teacher Dashboard: Quiz
import AddQuiz from './Teacher/AddQuiz';
import AllQuiz from './Teacher/AllQuiz';
import EditQuiz from './Teacher/EditQuiz';
import QuizQuestions from './Teacher/QuizQuestions';
import AssignQuiz  from './Teacher/AssignQuiz';


// List Pages
import AllCourses from './AllCourses';
import PopularCourses from './PopularCourses';
import PopularTeachers from './PopularTeachers';
import CategoryCourses from './CategoryCourses';
import AddQuizQuestion from './Teacher/AddQuizQuestions';

// Student Dashboard: Quiz
import CourseQuizList from './User/CourseQuizList';
import TakeQuiz from './User/TakeQuiz';
import Search from './Search';
import AddStudyMaterial from './Teacher/AddStudyMaterial';
import UserStudyMaterials from './User/UserStudyMaterials';
import AttemptedStudents from './Teacher/AttemptedStudents';
import Category from './Category';
import FAQ from './FAQ';
import Page from './Page';
import ContactUs from './ContactUs';
import VerifyTeacher from './Teacher/VerifyTeacher';
import VerifyStudent from './User/VerifyStudent';
import TeacherForgotPassword from './Teacher/TeacherForgotPassword';
import TeacherChangePassword from './Teacher/TeacherChangePassword';
import ForgotPassword from './User/ForgotPassword';


function Main() {
  return (
   <div className="App">
    
     <Header />
     <Switch>
      <Route path="/" element={<Home />}/>
      <Route path="/detail/:course_id" element={<CourseDetail />}/>
      <Route path="/student-login" element={<Login />}/>
      <Route path="/student-register" element={<Register />}/>
      <Route path="/student-dashboard" element={<Dashboard />}/>
      <Route path="/student-logout" element={<StudentLogout />}/>
      <Route path="/my-courses" element={<MyCourses />}/>
      <Route path="/favorite-courses" element={<FavoriteCourses />}/>
      <Route path="/recommended-courses" element={<RecommendedCourses />}/>
      <Route path="/profile-setting" element={<ProfileSetting />}/>
      <Route path="/update-password" element={<UpdatePassword />}/>
      <Route path="/teacher-login" element={<TeacherLogin />}/>
      <Route path="/teacher-register" element={<TeacherRegister />}/>
      <Route path="/teacher-dashboard" element={<TeacherDashboard />}/>
      <Route path="/teacher-profile-setting" element={<TeacherProfileSetting />}/>
      <Route path="/teacher-update-password" element={<TeacherUpdatePassword />}/>
      <Route path="/teacher-change-password/:teacher_id" element={<TeacherChangePassword />}/>
      <Route path="/teacher-my-courses" element={<TeacherMyCourses />}/>
      <Route path="/my-users" element={<UserList />}/>
      <Route path="/add-course" element={<AddCourse />}/>
      <Route path="/teacher-detail/:teacher_id" element={<TeacherDetail />}/>
      <Route path="/all-courses" element={<AllCourses />}/>
      <Route path="/popular-courses" element={<PopularCourses />}/>
      <Route path="/popular-teachers" element={<PopularTeachers />}/>
      <Route path="/course/:category_id/:category_slug" element={<CategoryCourses />}/>
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
      <Route path="/add-quiz" element={<AddQuiz/>}/>
      <Route path="/quiz" element={<AllQuiz/>}/>
      <Route path="/edit-quiz/:quiz_id" element={<EditQuiz/>}/>
      <Route path="/all-questions/:quiz_id" element={<QuizQuestions/>}/>
      <Route path="/add-quiz-question/:quiz_id" element={<AddQuizQuestion/>}/>
      <Route path="/assign-quiz/:course_id" element={<AssignQuiz/>}/>
      <Route path="/course-quiz/:course_id" element={<CourseQuizList/>}/>
      <Route path="/take-quiz/:quiz_id" element={<TakeQuiz/>}/>
      <Route path="/search/:searchString" element={<Search/>}/>
      <Route path="/study-materials/:course_id" element={<StudyMaterials/>}/>
      <Route path="/add-study/:course_id" element={<AddStudyMaterial/>}/>
      <Route path="/user/study-materials/:course_id" element={<UserStudyMaterials/>}/>
      <Route path="/attempted-students/:quiz_id" element={<AttemptedStudents/>}/>
      <Route path="/category" element={<Category/>}/>
      <Route path="/faq" element={<FAQ/>}/>
      <Route path="/page/:page_id/:page_slug" element={<Page/>}/>
      <Route path="/contact-us" element={<ContactUs />}/>
      <Route path="/verify-teacher/:teacher_id" element={<VerifyTeacher />}/>
      <Route path="/verify-student/:student_id" element={<VerifyStudent />}/>
      <Route path="/teacher-forgot-password" element={<TeacherForgotPassword />}/>
      <Route path="/student-forgot-password" element={<ForgotPassword />}/>
     </Switch>
     <Footer />
     </div>
    
  );
}

export default Main;


