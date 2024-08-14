import React, { useEffect, useState } from 'react';
import { fetchExams, addExam, updateExam, deleteExam } from '../../service/admin/exams';
import '../css/ExManagemen.css';

interface Exam {
    id: number;
    title: string;
    description: string;
    duration: number;
    examSubjectId: number;
}

const ExamsManagemen: React.FC = () => {
    const [exams, setExams] = useState<Exam[]>([]);
    const [newExam, setNewExam] = useState<Partial<Exam>>({});
    const [editingExam, setEditingExam] = useState<Partial<Exam> | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetchExams();
                setExams(response.data);
            } catch (error) {
                setError('Đã xảy ra lỗi khi lấy dữ liệu.');
            }
        };

        fetchData();
    }, []);

    const handleAddExam = async () => {
        if (newExam.title && newExam.description) {
            try {
                await addExam(newExam);
                setNewExam({});
                const response = await fetchExams();
                setExams(response.data);
            } catch (error) {
                setError('Đã xảy ra lỗi khi thêm đề thi.');
            }
        }
    };

    const handleUpdateExam = async (id: number) => {
        if (editingExam.title && editingExam.description) {
            try {
                await updateExam(id, editingExam);
                setEditingExam(null);
                const response = await fetchExams();
                setExams(response.data);
            } catch (error) {
                setError('Đã xảy ra lỗi khi sửa đề thi.');
            }
        }
    };

    const handleDeleteExam = async (id: number) => {
        try {
            await deleteExam(id);
            const response = await fetchExams();
            setExams(response.data);
        } catch (error) {
            setError('Đã xảy ra lỗi khi xóa đề thi.');
        }
    };

    return (
        <div className="dash-board-container">
            <h1>Quản lý đề thi</h1>
            {error && <p className="error">{error}</p>}
            <div>
                <h2>Thêm đề thi mới</h2>
                <input
                    type="text"
                    placeholder="Tiêu đề"
                    value={newExam.title || ''}
                    onChange={(e) => setNewExam({ ...newExam, title: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Mô tả"
                    value={newExam.description || ''}
                    onChange={(e) => setNewExam({ ...newExam, description: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Thời gian"
                    value={newExam.duration || ''}
                    onChange={(e) => setNewExam({ ...newExam, duration: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Id"
                    value={newExam.examSubjectId || ''}
                    onChange={(e) => setNewExam({ ...newExam, examSubjectId: e.target.value })}
                />
                <button onClick={handleAddExam}>Thêm đề thi</button>
            </div>

            <div>
                <h2>Danh sách đề thi</h2>
                {exams.length > 0 ? (
                    exams.map((exam) => (
                        <div key={exam.id} className="exam-item">
                            <h3>{exam.title}</h3>
                            <p>{exam.description}</p>
                            <button onClick={() => setEditingExam(exam)}>Sửa</button>
                            <button onClick={() => handleDeleteExam(exam.id)}>Xóa</button>
                        </div>
                    ))
                ) : (
                    <p>Chưa có đề thi nào.</p>
                )}
            </div>

            {editingExam && (
                <div className="edit-form">
                    <h2>Sửa đề thi</h2>
                    <input
                        type="text"
                        placeholder="Tiêu đề"
                        value={editingExam.title || ''}
                        onChange={(e) => setEditingExam({ ...editingExam, title: e.target.value })}
                    />
                    <input
                        type="text"
                        placeholder="Mô tả"
                        value={editingExam.description || ''}
                        onChange={(e) => setEditingExam({ ...editingExam, description: e.target.value })}
                    />
                    <input
                        type="text"
                        placeholder="Thời gian"
                        value={editingExam.duration || ''}
                        onChange={(e) => setEditingExam({ ...editingExam, duration: e.target.value })}
                    />
                    <input
                        type="text"
                        placeholder="Id"
                        value={editingExam.examSubjectId || ''}
                        onChange={(e) => setEditingExam({ ...editingExam, examSubjectId: e.target.value })}
                    />
                    <button onClick={() => handleUpdateExam(editingExam.id!)}>Lưu thay đổi</button>
                    <button onClick={() => setEditingExam(null)}>Hủy</button>
                </div>
            )}
        </div>
    );
};

export default ExamsManagemen;
