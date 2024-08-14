import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import Navbar from '../layouts/Navbar';
import './css/ExamSubjects.css';

interface ExamSubject {
    id: number;
    title: string;
    description: string;
    courseId: number;
}

export const examSubjectsData: ExamSubject[] = [
    {
        "id": 1,
        "title": "Môn Toán",
        "description": "Luyện thi đại học Toán học",
        "courseId": 1
    },
    {
        "id": 2,
        "title": "Môn Văn",
        "description": "Luyện thi đại học Văn học",
        "courseId": 1
    },
    {
        "id": 3,
        "title": "Môn Anh",
        "description": "Luyện thi đại học Anh học",
        "courseId": 1
    },
    {
        "id": 4,
        "title": "Môn Lí",
        "description": "Luyện thi đại học Lí học",
        "courseId": 1
    },
    {
        "id": 5,
        "title": "Môn Hóa",
        "description": "Luyện thi đại học Hóa học",
        "courseId": 1
    },
    {
        "id": 6,
        "title": "Môn Sinh",
        "description": "Luyện thi đại học Sinh học",
        "courseId": 1
    },
    {
        "id": 7,
        "title": "Môn Sử",
        "description": "Luyện thi đại học Sử học",
        "courseId": 1
    },
    {
        "id": 8,
        "title": "Môn Địa",
        "description": "Luyện thi đại học Đại học",
        "courseId": 1
    },
    {
        "id": 9,
        "title": "Môn GDCD",
        "description": "Luyện thi đại học GDCD",
        "courseId": 1
    },
    {
        "id": 10,
        "title": "Vật lý lớp 11",
        "description": "Luyện thi Vật lý lớp 11",
        "courseId": 2
    },
    {
        "id": 11,
        "title": "Hóa học lớp 10",
        "description": "Luyện thi Hóa học lớp 10",
        "courseId": 2
    },
    {
        "id": 12,
        "title": "Toán học lớp 10",
        "description": "Luyện thi Toán học lớp 10",
        "courseId": 2
    },
    {
        "id": 13,
        "title": "Văn học lớp 10",
        "description": "Luyện thi Văn học lớp 10",
        "courseId": 2
    },
    {
        "id": 14,
        "title": "Toán học lớp 11",
        "description": "Luyện thi Toán học lớp 11",
        "courseId": 2
    },
    {
        "id": 15,
        "title": "Văn học lớp 11",
        "description": "Luyện thi Hóa học lớp 11",
        "courseId": 2
    },
    {
        "id": 16,
        "title": "Hóa học lớp 11",
        "description": "Luyện thi Hóa học lớp 11",
        "courseId": 2
    },
    {
        "id": 17,
        "title": "Vật lý lớp 11",
        "description": "Luyện thi Vật lý lớp 11",
        "courseId": 2
    },
    {
        "id": 18,
        "title": "Hóa học lớp 12",
        "description": "Luyện thi Hóa học lớp 12",
        "courseId": 2
    },
    {
        "id": 19,
        "title": "Toán học lớp 12",
        "description": "Luyện thi Vật lý lớp 12",
        "courseId": 2
    },
    {
        "id": 20,
        "title": "Văn học lớp 12",
        "description": "Luyện thi Văn học lớp 12",
        "courseId": 2
    },
    {
        "id": 21,
        "title": "Vật lý lớp 12",
        "description": "Luyện thi Vật lý lớp 12",
        "courseId": 2
    }
];

const ExamSubjects: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const courseId = parseInt(id || '0');
    const [filteredSubjects, setFilteredSubjects] = useState<ExamSubject[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 4;

    useEffect(() => {
        setFilteredSubjects(examSubjectsData.filter(subject => subject.courseId === courseId));
        setCurrentPage(1); // Reset trang về 1 khi thay đổi courseId
    }, [courseId]);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredSubjects.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(filteredSubjects.length / itemsPerPage);

    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    return (
        <>
            <Navbar />
            <div className="exam-subjects-container">
                <h1>Danh sách môn thi</h1>
                <div className="exam-subjects-grid">
                    {currentItems.length > 0 ? (
                        currentItems.map((subject) => (
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
                {totalPages > 1 && (
                    <div className="pagination">
                        <button
                            onClick={handlePreviousPage}
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
                            onClick={handleNextPage}
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

export default ExamSubjects;