import React from 'react';
import { Link, useParams } from 'react-router-dom';
import Navbar from '../layouts/Navbar';
import './css/ExamSubjects.css';

interface ExamSubject {
    id: number;
    title: string;
    description: string;
    courseId: number;
}

const examSubjectsData: ExamSubject[] = [
    {
        id: 1,
        title: "Môn Toán",
        description: "Luyện thi đại học Toán học",
        courseId: 1
    },
    {
        id: 2,
        title: "Vật lý lớp 11",
        description: "Luyện thi Vật lý lớp 11",
        courseId: 2
    },
    {
        id: 3,
        title: "Hóa học lớp 10",
        description: "Luyện thi Hóa học lớp 10",
        courseId: 2
    }
];

const ExamSubjects: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const courseId = parseInt(id || '0');

    const filteredSubjects = examSubjectsData.filter(subject => subject.courseId === courseId);

    return (
        <>
            <Navbar />
            <div className="exam-subjects-container">
                <h1>Danh sách môn thi</h1>
                <div className="exam-subjects-grid">
                    {filteredSubjects.length > 0 ? (
                        filteredSubjects.map((subject) => (
                            <div key={subject.id} className="exam-subject-card">
                                <h2>{subject.title}</h2>
                                <p>{subject.description}</p>
                                <Link to={`/exams/${subject.id}`} className="view-details-button">
                                    Xem chi tiết
                                </Link>
                            </div>
                        ))
                    ) : (
                        <p>Không có môn thi nào cho khóa học này.</p>
                    )}
                </div>
            </div>
        </>
    );
};

export default ExamSubjects;