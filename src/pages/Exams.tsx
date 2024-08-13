import React from 'react';
import { Link, useParams } from 'react-router-dom';

interface Exam {
    id: number;
    title: string;
    description: string;
    duration: number;
    examSubjectId: number;
}

const examsData: Exam[] = [
    {
        id: 1,
        title: "Đề thi Toán học THPT Chuyên Lam Sơn Thanh Hóa",
        description: "Đề thi Toán Học năm 2023",
        duration: 90,
        examSubjectId: 1
    },
    {
        id: 2,
        title: "Đề thi Vật lý cơ bản lớp 11",
        description: "Đề thi gồm các câu hỏi cơ bản về Vật lý 11",
        duration: 60,
        examSubjectId: 2
    },
    {
        id: 3,
        title: "Đề thi Hóa học cơ bản lớp 10",
        description: "Đề thi gồm các câu hỏi cơ bản về Hóa học lớp 10",
        duration: 45,
        examSubjectId: 3
    }
];

const Exams: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const examSubjectId = parseInt(id || '0');

    const filteredExams = examsData.filter(exam => exam.examSubjectId === examSubjectId);

    return (
        <div>
            <h1>Danh sách đề thi</h1>
            {filteredExams.length > 0 ? (
                filteredExams.map((exam) => (
                    <div key={exam.id}>
                        <h2>{exam.title}</h2>
                        <p>{exam.description}</p>
                        <p>Thời gian: {exam.duration} phút</p>
                        <Link to={`/exams/${exam.id}`}>Xem chi tiết</Link>
                    </div>
                ))
            ) : (
                <p>Không có đề thi nào cho môn học này.</p>
            )}
        </div>
    );
};

export default Exams;
