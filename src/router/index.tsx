// định nghĩa các router của ứng dụng 
// admin
// http://localhost:5173/admin/users
// user
// http://localhost:5173/profile


import { Route, Routes } from 'react-router-dom'
import { RegisterPage } from '../pages/auth/RegisterPage'
import LoginPage from '../pages/auth/LoginPage'
import ProtectedRouter from '../pages/ProtectedRouter'
import DashBoard from '../pages/admin/DashBoard'
// import Product from '../pages/admin/Product'
import UserAccount from '../pages/admin/UserAccount'
import Home from '../pages/Home'
import ProfilePage from '../pages/user/ProfilePage'
import Courses from '../pages/Courses';
import ExamSubjects from '../pages/ExamSubjects';
import Exams from '../pages/Exams';
import Questions from '../pages/Questions';
import UserAnswers from '../pages/UserAnswers';
import CoursesManagemen from '../pages/admin/CoursesManagemen'
import QuestionManagemen from '../pages/admin/QuestionManagemen'
import ExamsManagemen from '../pages/admin/ExamsManagemen'
import ExamSubjectsManagemen from '../pages/admin/ExamSubjectsManagemen'

export const Router = () => {
    return (
        <Routes>
            <Route path='/register' element={<RegisterPage />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/' element={<Home />} />
            <Route path="/profile" element={<ProfilePage />} />
            
            <Route path="/courses" element={<Courses />} />
            <Route path="/exam-subjects/:id" element={<ExamSubjects />} />

            <Route path="/exams/:id" element={<Exams />} />
            <Route path="/questions/:id" element={<Questions />} />
            <Route path="/user-answers" element={<UserAnswers />} />

            <Route path='/admin' element={<ProtectedRouter />}>
                <Route index element={<DashBoard />} />
                <Route path='examsubjectsManagemen' element={<ExamSubjectsManagemen />} />
                <Route path='examsManagemen' element={<ExamsManagemen />} />
                <Route path='questionManagemen' element={<QuestionManagemen />} />
                <Route path='user' element={<UserAccount />} />
                <Route path='coursesManagemen' element={<CoursesManagemen />} />
            </Route>
        </Routes>
    )
}
