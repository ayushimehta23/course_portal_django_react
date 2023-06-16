from django.shortcuts import render
from django.http import JsonResponse, HttpResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import generics
from rest_framework import permissions
from .serializers import TeacherSerializer, CategorySerializer, CourseSerializer, ChapterSerializer, StudentSerializer, StudentCourseEnrollSerializer, CourseRatingSerializer, TeacherDashboardSerializer,  StudentFavoriteCourseSerializer, StudentAssignemntSerializer, StudentDashboardSerializer, NotificationSerializer, QuizSerializer, QuestionSerializer, CourseQuizSerializer, AttemptQuizSerializer, StudyMaterialSerializer, FAQSerializer, FlatPagesSerializer, ContactSerializer, TeacherStudentChatSerializer
from . import models
from rest_framework.pagination import PageNumberPagination
from django.contrib.flatpages.models import FlatPage

from django.conf import settings
from django.core.mail import send_mail
import pandas as pd

class StandardResultsSetPagination(PageNumberPagination):
    page_size=4
    page_size_query_param='page_size'
    max_page_size=4

class TeacherList(generics.ListCreateAPIView):
    queryset = models.Teacher.objects.all()
    serializer_class = TeacherSerializer
   

    def get_queryset(self):
        if 'popular' in self.request.GET:
            sql="SELECT *,COUNT(c.id) as total_course FROM main_teacher as t INNER JOIN main_course as c ON c.teacher_id=t.id GROUP BY t.id ORDER BY total_course DESC LIMIT 4"
            return models.Teacher.objects.raw(sql)

        if 'all' in self.request.GET:
            sql="SELECT *,COUNT(c.id) as total_course FROM main_teacher as t INNER JOIN main_course as c ON c.teacher_id=t.id GROUP BY t.id ORDER BY total_course DESC"
            return models.Teacher.objects.raw(sql)

class TeacherDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = models.Teacher.objects.all()
    serializer_class = TeacherSerializer
   

class TeacherDashboard(generics.RetrieveAPIView):
    queryset=models.Teacher.objects.all()
    serializer_class=TeacherDashboardSerializer

@csrf_exempt
def teacher_login(request):
   
    email = request.POST['email']
    password = request.POST['password']
    
    
    try:
        teacherData = models.Teacher.objects.get(email = email, password = password)
        if not teacherData:
            return JsonResponse({'bool': False})
        subject = 'Login Successful (Teacher)'
        message = f"Hello {teacherData.full_name}, \n\nWe're excited to inform you that a successful login has been detected on your account. Your account security is our utmost priority, and we want to ensure that you are aware of any activity related to your account. \n\nIf you have recently logged into your account, there is no need for concern. However, if you did not initiate this login or suspect any unauthorized activity, we strongly recommend taking immediate action by contacting us to secure your account. \n\nThank you for your cooperation in maintaining the security of your account. \n\n\nBest Regards, \nCourse Portal."
        email_from = settings.EMAIL_HOST_USER
        recipient_list = ['ayushimehta9515@gmail.com']
        send_mail( subject, message, email_from, recipient_list )
        return JsonResponse({'bool': True, 'teacher_id':teacherData.id})
    except models.Teacher.DoesNotExist:
        return JsonResponse({'bool': False})



class CategoryList(generics.ListCreateAPIView):
    queryset = models.CourseCategory.objects.all()
    serializer_class = CategorySerializer

# Course
class CourseList(generics.ListCreateAPIView):
    queryset = models.Course.objects.all()
    serializer_class = CourseSerializer
    pagination_class = StandardResultsSetPagination

    def get_queryset(self):
        qs=super().get_queryset()
        if 'result' in self.request.GET:
            limit=int(self.request.GET['result'])
            qs=models.Course.objects.all().order_by('-id')[:limit]
        return qs

        if 'category' in self.request.GET:
            category=self.request.GET['category']
            category=models.CourseCategory.objects.filter(id=category).first()
            qs=models.Course.objects.filter(category=category)

        if 'skill_name' in self.request.GET and 'teacher' in self.request.GET:
            skill_name=self.request.GET['skill_name']
            teacher=self.request.GET['teacher']
            teacher=models.Teacher.objects.filter(id=skill_name).first()
            qs=models.Course.objects.filter(techs__icontains=skill_name, teacher=teacher)

       

class CourseDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset=models.Course.objects.all()
    serializer_class=CourseSerializer

# Specific Teacher Course
class TeacherCourseList(generics.ListCreateAPIView):
    serializer_class = CourseSerializer

    def get_queryset(self):
        teacher_id=self.kwargs['teacher_id']
        teacher=models.Teacher.objects.get(pk=teacher_id)
        return models.Course.objects.filter(teacher=teacher)

# Specific Teacher Course
class TeacherCourseDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = models.Course.objects.all()
    serializer_class = CourseSerializer

# Specific Course Chapter
class CourseChapterList(generics.ListCreateAPIView):
    serializer_class = ChapterSerializer

    def get_queryset(self):
        course_id=self.kwargs['course_id']
        course=models.Course.objects.get(pk=course_id)
        return models.Chapter.objects.filter(course=course)

# Chapter
class ChapterDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = models.Chapter.objects.all()
    serializer_class = ChapterSerializer

    # def get_serializer_context(self):
    #     context=super().get_serializer_context()
    #     return context

# Student Data
class StudentList(generics.ListCreateAPIView):
    queryset = models.Student.objects.all()
    serializer_class = StudentSerializer
    
class StudentDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = models.Student.objects.all()
    serializer_class = StudentSerializer
    
class StudentDashboard(generics.RetrieveAPIView):
    queryset=models.Student.objects.all()
    serializer_class=StudentDashboardSerializer

@csrf_exempt
def student_login(request):
   
    email = request.POST['email']
    password = request.POST['password']
    
    
    try:
        studentData = models.Student.objects.get(email = email, password = password)
        if not studentData:
            return JsonResponse({'bool': False})
        subject = 'Login Successful (Student)'
        message = f"Hello {studentData.full_name}, \n\nWe're excited to inform you that a successful login has been detected on your account. Your account security is our utmost priority, and we want to ensure that you are aware of any activity related to your account. \n\nIf you have recently logged into your account, there is no need for concern. However, if you did not initiate this login or suspect any unauthorized activity, we strongly recommend taking immediate action by contacting us to secure your account. \n\nThank you for your cooperation in maintaining the security of your account. \n\n\nBest Regards, \nCourse Portal."
        email_from = settings.EMAIL_HOST_USER
        recipient_list = ['ayushimehta9515@gmail.com']
        send_mail( subject, message, email_from, recipient_list )
        return JsonResponse({'bool': True, 'student_id':studentData.id})
    except models.Student.DoesNotExist:
        return JsonResponse({'bool': False})


class StudentEnrollCourseList(generics.ListCreateAPIView):
    queryset = models.StudentCourseEnrollment.objects.all()
    serializer_class = StudentCourseEnrollSerializer

# class StudentEnrollCourseCreate(generics.ListCreateAPIView):
#     queryset=models.StudentCourseEnrollment.objects.all()
#     serializer_class = StudentCourseEnrollCreateSerializer

class StudentFavoriteCourseList(generics.ListCreateAPIView):
    queryset=models.StudentFavoriteCourse.objects.all()
    serializer_class=StudentFavoriteCourseSerializer

    def get_queryset(self):
        if 'student_id' in self.kwargs:
            student_id=self.kwargs['student_id']
            student=models.Student.objects.get(pk=student_id)
            return models.StudentFavoriteCourse.objects.filter(student=student).distinct()
    
def fetch_enroll_status(request, student_id, course_id):
    student = models.Student.objects.filter(id=student_id).first()
    course = models.Course.objects.filter(id=course_id).first()
    enrollStatus = models.StudentCourseEnrollment.objects.filter(course=course, student=student).count()
    if enrollStatus:
        return JsonResponse({'bool': True})
    else:
        return JsonResponse({'bool': False})

def fetch_favorite_status(request, student_id, course_id):
    student=models.Student.objects.filter(id=student_id).first()
    course=models.Course.objects.filter(id=course_id).first()
    favouriteStatus=models.StudentFavoriteCourse.objects.filter(course=course, student=student).first()
    if favouriteStatus and favouriteStatus.status == True:
        return JsonResponse({'bool':True})
    else:
        return JsonResponse({'bool':False})

def remove_favorite_course(request, course_id, student_id):
    student=models.Student.objects.filter(id=student_id).first()
    course=models.Course.objects.filter(id=course_id).first()
    favouriteStatus=models.StudentFavoriteCourse.objects.filter(course=course, student=student).delete()
    if favouriteStatus:
        return JsonResponse({'bool':True})
    else:
        return JsonResponse({'bool':False})

class EnrolledStudentList(generics.ListAPIView):
    queryset = models.StudentCourseEnrollment.objects.all()
    serializer_class = StudentCourseEnrollSerializer

    def get_queryset(self):
        if 'course_id' in self.kwargs:
            course_id=self.kwargs['course_id']
            course=models.Course.objects.get(pk=course_id)
            return models.StudentCourseEnrollment.objects.filter(course=course)
        elif 'teacher_id' in self.kwargs:
            teacher_id=self.kwargs['teacher_id']
            teacher=models.Teacher.objects.get(pk=teacher_id)
            return models.StudentCourseEnrollment.objects.filter(course__teacher=teacher).distinct()
        elif 'student_id' in self.kwargs:
            student_id=self.kwargs['student_id']
            student=models.Student.objects.get(pk=student_id)
            return models.StudentCourseEnrollment.objects.filter(student=student).distinct()

class CourseRatingList(generics.ListCreateAPIView):
    queryset = models.CourseRating.objects.all()
    serializer_class = CourseRatingSerializer
    pagination_class = StandardResultsSetPagination

    def get_queryset(self):
        if 'popular' in self.request.GET:
            sql="SELECT *,AVG(cr.RATING) as avg_rating FROM main_courserating as cr INNER JOIN main_course as c on cr.course_id=c.id GROUP BY c.id ORDER BY avg_rating desc LIMIT 4"
            return models.CourseRating.objects.raw(sql)
        if 'all' in self.request.GET:
            sql="SELECT *,AVG(cr.RATING) as avg_rating FROM main_courserating as cr INNER JOIN main_course as c on cr.course_id=c.id GROUP BY c.id ORDER BY avg_rating desc"
            return models.CourseRating.objects.raw(sql)
        return models.CourseRating.objects.filter(course__isnull=False).order_by('-rating')
    
def fetch_rating_status(request, student_id, course_id):
    student = models.Student.objects.filter(id=student_id).first()
    course = models.Course.objects.filter(id=course_id).first()
    ratingStatus = models.CourseRating.objects.filter(course=course, student=student).count()
    if ratingStatus:
        return JsonResponse({'bool': True})
    else:
        return JsonResponse({'bool': False})

@csrf_exempt
def teacher_update_password(request, teacher_id):
    password = request.POST['password']
    try:
        teacherData = models.Teacher.objects.get(id=teacher_id)
    except models.Teacher.DoesNotExist:
        teacherData=None
    if teacherData:
        models.Teacher.objects.filter(id=teacher_id).update(password=password)
        return JsonResponse({'bool': True})
    else:
        return JsonResponse({'bool': False})

class AssignmentList(generics.ListCreateAPIView):
    queryset=models.StudentAssignemnt.objects.all()
    serializer_class=StudentAssignemntSerializer

    def get_queryset(self):
        student_id=self.kwargs['student_id']
        teacher_id=self.kwargs['teacher_id']
        student=models.Student.objects.get(pk=student_id)
        teacher=models.Teacher.objects.get(pk=teacher_id)
        return models.StudentAssignemnt.objects.filter(student=student,teacher=teacher)
   
class MyAssignmentList(generics.ListCreateAPIView):
    queryset=models.StudentAssignemnt.objects.all()
    serializer_class=StudentAssignemntSerializer

    def get_queryset(self):
        student_id=self.kwargs['student_id']
        student=models.Student.objects.get(pk=student_id)
        # Update Notification
        models.Notification.objects.filter(student=student,notif_for='Student',notif_subject='Assignment').update(notifread_status=True)
        return models.StudentAssignemnt.objects.filter(student=student)

class UpdateAssignment(generics.RetrieveUpdateDestroyAPIView):
    queryset=models.StudentAssignemnt.objects.all()
    serializer_class=StudentAssignemntSerializer

@csrf_exempt
def student_update_password(request, student_id):
    password = request.POST['password']
    try:
        studentData = models.Student.objects.get(id=student_id)
    except models.Student.DoesNotExist:
        studentData=None
    if studentData:
        models.Student.objects.filter(id=student_id).update(password=password)
        return JsonResponse({'bool': True})
    else:
        return JsonResponse({'bool': False})

class NotificationList(generics.ListCreateAPIView):
    queryset=models.Notification.objects.all()
    serializer_class=NotificationSerializer

    def get_queryset(self):
        student_id=self.kwargs['student_id']
        student=models.Student.objects.get(pk=student_id)
        return models.Notification.objects.filter(student=student,notif_for='Student',notif_subject='Assignment',notifread_status=False)
    
class QuizList(generics.ListCreateAPIView):
    queryset=models.Quiz.objects.all()
    serializer_class=QuizSerializer

class TeacherQuizList(generics.ListCreateAPIView):
    serializer_class = QuizSerializer

    def get_queryset(self):
        teacher_id=self.kwargs['teacher_id']
        teacher=models.Teacher.objects.get(pk=teacher_id)
        return models.Quiz.objects.filter(teacher=teacher)

class TeacherQuizDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = models.Quiz.objects.all()
    serializer_class = QuizSerializer

class QuizDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = models.Quiz.objects.all()
    serializer_class = QuizSerializer

class QuizQuestionList(generics.ListCreateAPIView):
    serializer_class = QuestionSerializer

    def get_queryset(self):
        quiz_id=self.kwargs['quiz_id']
        quiz=models.Quiz.objects.get(pk=quiz_id)
        if 'limit' in self.kwargs:
            return models.QuizQuestions.objects.filter(quiz=quiz).order_by('id')[:1]
        elif 'question_id' in self.kwargs:
            current_question=self.kwargs['question_id']
            return models.QuizQuestions.objects.filter(quiz=quiz, id__gt=current_question).order_by('id')[:1]
        else:
            return models.QuizQuestions.objects.filter(quiz=quiz)

class CourseQuizList(generics.ListCreateAPIView):
    queryset=models.CourseQuiz.objects.all()
    serializer_class=CourseQuizSerializer

    def get_queryset(self):
        if 'course_id' in self.kwargs:
            course_id=self.kwargs['course_id']
            course=models.Course.objects.get(pk=course_id)
            return models.CourseQuiz.objects.filter(course=course)

def fetch_quiz_assign_status(request, quiz_id, course_id):
    quiz=models.Quiz.objects.filter(id=quiz_id).first()
    course=models.Course.objects.filter(id=course_id).first()
    assignStatus=models.CourseQuiz.objects.filter(course=course,quiz=quiz).count()
    if assignStatus:
        return JsonResponse({'bool': True})
    else:
        return JsonResponse({'bool': False})

class AttemptQuizList(generics.ListCreateAPIView):
    queryset=models.AttemptQuiz.objects.all()
    serializer_class=AttemptQuizSerializer

    def get_queryset(self):
        if 'quiz_id' in self.kwargs:
            quiz_id=self.kwargs['quiz_id']
            quiz=models.Quiz.objects.get(pk=quiz_id)
            return models.AttemptQuiz.objects.raw(f'SELECT * FROM main_attemptquiz WHERE quiz_id={int(quiz_id)} GROUP by student_id')

def fetch_quiz_result_status(request,quiz_id,student_id):
    quiz=models.Quiz.objects.filter(id=quiz_id).first()
    student=models.Student.objects.filter(id=student_id).first()  
    total_questions=models.QuizQuestions.objects.filter(quiz=quiz).count()
    total_attempted_questions=models.AttemptQuiz.objects.filter(quiz=quiz,student=student).values('student').count()
    attempted_questions=models.AttemptQuiz.objects.filter(quiz=quiz,student=student)

    total_correct_questions=0
    for attempt in attempted_questions:
        if attempt.right_ans == attempt.question.right_ans:
            total_correct_questions+=1

    return JsonResponse({'total_questions':total_questions, 'total_attempted_questions':total_attempted_questions, 'total_correct_questions':total_correct_questions})

def fetch_quiz_attempt_status(request, quiz_id, student_id):
    quiz=models.Quiz.objects.filter(id=quiz_id).first()
    student=models.Student.objects.filter(id=student_id).first()
    attemptStatus=models.AttemptQuiz.objects.filter(student=student,question__quiz=quiz).count()
    if attemptStatus > 0:
        return JsonResponse({'bool': True})
    else:
        return JsonResponse({'bool': False})

class StudyMaterialList(generics.ListCreateAPIView):
    serializer_class = StudyMaterialSerializer

    def get_queryset(self):
        course_id=self.kwargs['course_id']
        course=models.Course.objects.get(pk=course_id)
        return models.StudyMaterial.objects.filter(course=course)

class StudyMaterialDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = models.StudyMaterial.objects.all()
    serializer_class = StudyMaterialSerializer

def update_view(request,course_id):
    queryset=models.Course.objects.filter(pk=course_id).first()
    queryset.course_views+=1
    queryset.save()
    return JsonResponse({'views':queryset.course_views})

class FAQList(generics.ListAPIView):
    queryset = models.FAQ.objects.all()
    serializer_class = FAQSerializer

class FlatPagesList(generics.ListAPIView):
    queryset=FlatPage.objects.all()
    serializer_class=FlatPagesSerializer

class FlatPagesDetail(generics.RetrieveAPIView):
    queryset=FlatPage.objects.all()
    serializer_class=FlatPagesSerializer

class ContactList(generics.ListCreateAPIView):
    queryset = models.Contact.objects.all()
    serializer_class = ContactSerializer

    def perform_create(self, serializer):
        instance = serializer.save()
        
        subject = 'Thank You for Contacting Us'
        message = f"Hello, \n\nThank you for contacting us. We appreciate your intrest and value your query request. \n\nIf you require immediate assistance, please don't hesitate to contact us directly at 9426523102. Our team is ready to help. \n\nWe look forward to serving you. \n\n\nBest Regards,\nCourse Portal."
        email_from = settings.EMAIL_HOST_USER
        recipient_list = ['ayushimehta9515@gmail.com']

        send_mail( subject, message, email_from, recipient_list )

@csrf_exempt
def save_teacher_student_msg(request, teacher_id, student_id):
    teacher=models.Teacher.objects.get(id=teacher_id)
    student=models.Student.objects.get(id=student_id)
    msg_txt=request.POST.get('msg_txt')
    msg_from=request.POST.get('msg_from')
    msgRes=models.TeacherStudentChat.objects.create(
        teacher=teacher, student=student, msg_txt=msg_txt, msg_from=msg_from
    )
    if msgRes:
        msgs=models.TeacherStudentChat.objects.filter(teacher=teacher, student=student).count()
        return JsonResponse({'bool':True, 'msg':'Message has been sent'})
    else:
        return JsonResponse({'bool':True, 'msg':'Oops... Some Error Occured!!'})

class MessageList(generics.ListAPIView):
    queryset=models.TeacherStudentChat.objects.all()
    serializer_class=TeacherStudentChatSerializer

    def get_queryset(self):
        teacher_id=self.kwargs['teacher_id']
        student_id=self.kwargs['student_id']
        teacher=models.Teacher.objects.get(pk=teacher_id)
        student=models.Student.objects.get(pk=student_id)
        return models.TeacherStudentChat.objects.filter(teacher=teacher, student=student).exclude(msg_txt='')


@csrf_exempt
def save_teacher_student_group_msg(request, teacher_id):
    teacher=models.Teacher.objects.get(id=teacher_id)
    msg_txt=request.POST.get('msg_txt')
    msg_from=request.POST.get('msg_from')

    enrolledList=models.StudentCourseEnrollment.objects.filter(course__teacher=teacher).distinct()
    for enrolled in enrolledList:

        msgRes=models.TeacherStudentChat.objects.create(
            teacher=teacher, student=enrolled.student, msg_txt=msg_txt, msg_from=msg_from
        )
    if msgRes:
        return JsonResponse({'bool':True, 'msg':'Message has been sent'})
    else:
        return JsonResponse({'bool':True, 'msg':'Oops... Some Error Occured!!'})

class MyTeacherList(generics.ListAPIView):
    queryset=models.Course.objects.all()
    serializer_class=CourseSerializer

    def get_queryset(self):
        if 'studentId' in self.kwargs:
            student_id=self.kwargs['studentId']
            sql=f"SELECT * FROM main_course as c, main_studentcourseenrollment as e, main_teacher as t WHERE c.teacher_id=t.id AND e.course_id=c.id AND e.student_id={student_id} GROUP BY c.teacher_id"
            qs=models.Course.objects.raw(sql)
            print(qs)
            return qs

@csrf_exempt
def save_teacher_student_group_msg_from_student(request, student_id):
    student=models.Student.objects.get(id=student_id)
    msg_txt=request.POST.get('msg_txt')
    msg_from=request.POST.get('msg_from')

    sql=f"SELECT * FROM main_course as c, main_studentcourseenrollment as e, main_teacher as t WHERE c.teacher_id=t.id AND e.course_id=c.id AND e.student_id={student_id} GROUP BY c.teacher_id"
    qs=models.Course.objects.raw(sql)

    myCourses=qs
    for course in myCourses:

        msgRes=models.TeacherStudentChat.objects.create(
            teacher=course.teacher, student=student, msg_txt=msg_txt, msg_from=msg_from
        )
    if msgRes:
        return JsonResponse({'bool':True, 'msg':'Message has been sent'})
    else:
        return JsonResponse({'bool':True, 'msg':'Oops... Some Error Occured!!'})


@csrf_exempt
def teacher_forgot_password(request):
    email=request.POST.get('email')
    verify=models.Teacher.objects.filter(email=email).first()
    teacherData = models.Teacher.objects.get(email = email)
    if verify:
        link=f"http://localhost:3000/teacher-change-password/{verify.id}/"
       
        subject = 'Reset Password Link (Teacher)'
        message = f"Hello {teacherData.full_name}, \n\nA request has been received to change the password of your course portal account. \n\nhttp://localhost:3000/teacher-change-password/{verify.id}/. \n\nIf you didn't inititate this request, we strongly recommend taking immediate action by contacting us to secure your account. \n\nThank you for your cooperation in maintaining the security of your account.. \n\n\nBest Regards, \nCourse Portal."
        email_from = settings.EMAIL_HOST_USER
        recipient_list = ['ayushimehta9515@gmail.com']
        send_mail( subject, message, email_from, recipient_list )
        return JsonResponse({'bool': True, 'teacher_id':teacherData.id})
    else:
        return JsonResponse({'bool': False, 'msg':'Invalid Email!!'})

@csrf_exempt
def teacher_change_password(request, teacher_id):
    password = request.POST['password']
    verify = models.Teacher.objects.filter(id=teacher_id).first()
    if verify:
        models.Teacher.objects.filter(id=teacher_id).update(password=password)
        return JsonResponse({'bool':True, 'msg':'Password has been changed'})
    else:
        return JsonResponse({'bool':True, 'msg':'Oops... Some Error Occured!!'})


@csrf_exempt
def student_forgot_password(request):
    email=request.POST.get('email')
    verify=models.Student.objects.filter(email=email).first()
    studentData = models.Student.objects.get(email = email)
    if verify:
        link=f"http://localhost:3000/student-change-password/{verify.id}/"
       
        subject = 'Reset Password Link (Student)'
        message = f"Hello {studentData.full_name}, \n\nA request has been received to change the password of your course portal account. \n\nhttp://localhost:3000/student-change-password/{verify.id}/. \n\nIf you didn't inititate this request, we strongly recommend taking immediate action by contacting us to secure your account. \n\nThank you for your cooperation in maintaining the security of your account.. \n\n\nBest Regards, \nCourse Portal."
        email_from = settings.EMAIL_HOST_USER
        recipient_list = ['ayushimehta9515@gmail.com']
        send_mail( subject, message, email_from, recipient_list )
        return JsonResponse({'bool': True, 'student_id':studentData.id})
    else:
        return JsonResponse({'bool': False, 'msg':'Invalid Email!!'})

@csrf_exempt
def student_change_password(request, student_id):
    password = request.POST['password']
    verify = models.Student.objects.filter(id=student_id).first()
    if verify:
        models.Student.objects.filter(id=student_id).update(password=password)
        return JsonResponse({'bool':True, 'msg':'Password has been changed'})
    else:
        return JsonResponse({'bool':True, 'msg':'Oops... Some Error Occured!!'})

@csrf_exempt
def verify_teacher_via_otp(request, teacher_id):
    otp_digit=request.POST.get('otp_digit')
    verify=models.Teacher.objects.filter(id=teacher_id,otp_digit=otp_digit).first()
    if verify:
        models.Teacher.objects.filter(id=teacher_id,otp_digit=otp_digit).update(verify_status=True)
        return JsonResponse({'bool': True,'teacher_id':verify.id})
    else:
        return JsonResponse({'bool': False})

@csrf_exempt
def verify_student_via_otp(request, student_id):
    otp_digit=request.POST.get('otp_digit')
    verify=models.Student.objects.filter(id=student_id,otp_digit=otp_digit).first()
    if verify:
        models.Student.objects.filter(id=student_id,otp_digit=otp_digit).update(verify_status=True)
        return JsonResponse({'bool': True,'student_id':verify.id})
    else:
        return JsonResponse({'bool': False})


   

        
     

       