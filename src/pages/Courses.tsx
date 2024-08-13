import React from 'react';
import { Link } from 'react-router-dom';
import './css/Courses.css';
import Navbar from '../layouts/Navbar';

interface Course {
    id: number;
    title: string;
    description: string;
}

const coursesData: Course[] = [
    {
        id: 1,
        title: "Khóa luyện thi đại học",
        description: "Khóa luyện thi cho học sinh chuẩn bị thi đại học"
    },
    {
        id: 2,
        title: "Khóa luyện thi THPT",
        description: "Khóa học dành cho học sinh 10,11,12"
    }
];

const Courses: React.FC = () => {
    return (
        <>
            <Navbar />
            <div className="courses-container">
                <h1>Danh sách khóa thi</h1>
                <div className="courses-grid">
                    {coursesData.map((course) => (
                        <div key={course.id} className="course-card">
                            <h2>{course.title}</h2>
                            <p>{course.description}</p>
                            <Link to={`/exam-subjects/${course.id}`} className="view-details-button">Xem chi tiết</Link>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default Courses;
