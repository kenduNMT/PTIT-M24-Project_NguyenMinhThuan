import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import Navbar from '../layouts/Navbar';
import './css/Exams.css'

interface Exam {
    id: number;
    title: string;
    description: string;
    duration: number;
    examSubjectId: number;
}

export const examsData: Exam[] = [
    {
        "id": 1,
        "title": "Đề thi Toán học THPT Chuyên Lam Sơn Thanh Hóa",
        "description": "Đề thi Toán Học năm 2023",
        "duration": 90,
        "examSubjectId": 1
    },
    {
        "id": 2,
        "title": "Đề thi Toán học THPT Quốc gia 2023",
        "description": "Đề thi tốt nghiệp THPT Quốc gia môn Toán năm 2023",
        "duration": 90,
        "examSubjectId": 1
    },
    {
        "id": 3,
        "title": "Đề thi Toán học THPT Chuyên Hà Nội - Amsterdam",
        "description": "Đề thi tuyển sinh vào lớp 10 chuyên Toán năm 2023",
        "duration": 120,
        "examSubjectId": 1
    },
    {
        "id": 4,
        "title": "Đề thi Toán học THPT Chuyên Lê Hồng Phong TP.HCM",
        "description": "Đề thi học kỳ 1 môn Toán lớp 12 năm học 2022-2023",
        "duration": 90,
        "examSubjectId": 1
    },
    {
        "id": 5,
        "title": "Đề thi thử Toán học THPT Quốc gia 2024",
        "description": "Đề thi thử chuẩn bị cho kỳ thi THPT Quốc gia 2024",
        "duration": 90,
        "examSubjectId": 1
    },
    {
        "id": 6,
        "title": "Đề thi Toán học Olympic 30/4",
        "description": "Đề thi Olympic Toán học 30/4 năm 2023",
        "duration": 180,
        "examSubjectId": 1
    },
    {
        "id": 7,
        "title": "Đề thi Toán học IMO Selection Test",
        "description": "Đề thi tuyển chọn đội tuyển IMO Việt Nam 2023",
        "duration": 270,
        "examSubjectId": 1
    },
    {
        "id": 8,
        "title": "Đề thi Văn học THPT Quốc gia 2023",
        "description": "Đề thi tốt nghiệp THPT Quốc gia môn Văn năm 2023",
        "duration": 120,
        "examSubjectId": 2
    },
    {
        "id": 9,
        "title": "Đề thi Văn học THPT Chuyên Nguyễn Huệ",
        "description": "Đề thi học kỳ 2 môn Văn lớp 11 năm học 2022-2023",
        "duration": 90,
        "examSubjectId": 2
    },
    {
        "id": 10,
        "title": "Đề thi Văn học THPT Chu Văn An",
        "description": "Đề thi thử THPT Quốc gia môn Văn năm 2023",
        "duration": 120,
        "examSubjectId": 2
    },
    {
        "id": 11,
        "title": "Đề thi Văn học THPT Chuyên Hà Nội - Amsterdam",
        "description": "Đề thi tuyển sinh vào lớp 10 chuyên Văn năm 2023",
        "duration": 150,
        "examSubjectId": 2
    },
    {
        "id": 12,
        "title": "Đề thi Văn học THPT Quốc gia 2022",
        "description": "Đề thi tốt nghiệp THPT Quốc gia môn Văn năm 2022",
        "duration": 120,
        "examSubjectId": 2
    },
    {
        "id": 13,
        "title": "Đề thi Văn học THPT Chuyên Lê Hồng Phong TP.HCM",
        "description": "Đề thi học kỳ 1 môn Văn lớp 12 năm học 2022-2023",
        "duration": 90,
        "examSubjectId": 2
    },
    {
        "id": 14,
        "title": "Đề thi thử Văn học THPT Quốc gia 2024",
        "description": "Đề thi thử chuẩn bị cho kỳ thi THPT Quốc gia 2024",
        "duration": 120,
        "examSubjectId": 2
    },
    {
        "id": 15,
        "title": "Đề thi Vật lý cơ bản lớp 11",
        "description": "Đề thi gồm các câu hỏi cơ bản về Vật lý 11",
        "duration": 60,
        "examSubjectId": 10
    },
    {
        "id": 16,
        "title": "Đề thi Vật lý THPT Quốc gia 2023",
        "description": "Đề thi tốt nghiệp THPT Quốc gia môn Vật lý năm 2023",
        "duration": 50,
        "examSubjectId": 10
    },
    {
        "id": 17,
        "title": "Đề thi Vật lý THPT Chuyên Lý Tự Trọng",
        "description": "Đề thi học kỳ 2 môn Vật lý lớp 11 năm học 2022-2023",
        "duration": 45,
        "examSubjectId": 10
    },
    {
        "id": 18,
        "title": "Đề thi Vật lý Olympic 30/4",
        "description": "Đề thi Olympic Vật lý 30/4 năm 2023",
        "duration": 180,
        "examSubjectId": 10
    },
    {
        "id": 19,
        "title": "Đề thi Vật lý THPT Chuyên Đại học Sư phạm Hà Nội",
        "description": "Đề thi tuyển sinh vào lớp 10 chuyên Vật lý năm 2023",
        "duration": 150,
        "examSubjectId": 10
    },
    {
        "id": 20,
        "title": "Đề thi thử Vật lý THPT Quốc gia 2024",
        "description": "Đề thi thử chuẩn bị cho kỳ thi THPT Quốc gia 2024",
        "duration": 50,
        "examSubjectId": 10
    },
    {
        "id": 21,
        "title": "Đề thi Vật lý IPhO Selection Test",
        "description": "Đề thi tuyển chọn đội tuyển IPhO Việt Nam 2023",
        "duration": 300,
        "examSubjectId": 10
    }
];

const Exams: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const examSubjectId = parseInt(id || '0');
    const [filteredExams, setFilteredExams] = useState<Exam[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 4;

    useEffect(() => {
        setFilteredExams(examsData.filter(exam => exam.examSubjectId === examSubjectId));
    }, [examSubjectId]);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredExams.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(filteredExams.length / itemsPerPage);

    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    const handleStartExam = (examId: number,examTitle: string) => {
        const userLogin = JSON.parse(localStorage.getItem('userLogin') || '{}');
        userLogin.currentExamId = examId;
        userLogin.currentExamTitle = examTitle;
        localStorage.setItem('userLogin', JSON.stringify(userLogin));
    };
    return (
        <>
            <Navbar />
            <div className="exams-container">
                <h1>Danh sách đề thi</h1>
                {currentItems.length > 0 ? (
                    currentItems.map((exam) => (
                        <div key={exam.id} className="exam-card">
                            <h2>{exam.title}</h2>
                            <p>{exam.description}</p>
                            <p>Thời gian: {exam.duration} phút</p>
                            <Link to={`/questions/${exam.id}`} onClick={() => handleStartExam(exam.id,exam.title)}>Bắt đầu làm</Link>
                        </div>
                    ))
                ) : (
                    <p>Không có đề thi nào cho môn học này.</p>
                )}
                {totalPages > 1 && (
                    <div className="pagination">
                        <button
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                        >
                            Lùi lại
                        </button>
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                            <button
                                key={page}
                                onClick={() => handlePageChange(page)}
                                className={currentPage === page ? 'active' : ''}
                            >
                                {page}
                            </button>
                        ))}
                        <button
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                        >
                            Tiếp theo
                        </button>
                    </div>
                )}
            </div>
        </>
    );
};

export default Exams;
