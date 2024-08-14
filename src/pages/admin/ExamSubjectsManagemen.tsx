import React, { useEffect, useState } from 'react';
import { fetchExamSubjects, addExamSubject, updateExamSubject, deleteExamSubject } from '../../service/admin/examsubject'; // Import các hàm API
import '../css/ExamSubjectManagement.css';

interface ExamSubject {
    id: number;
    name: string;
    description: string;
}

const ExamSubjectManagement: React.FC = () => {
    const [examSubjects, setExamSubjects] = useState<ExamSubject[]>([]);
    const [newExamSubject, setNewExamSubject] = useState<Partial<ExamSubject>>({});
    const [editingExamSubject, setEditingExamSubject] = useState<Partial<ExamSubject> | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetchExamSubjects();
                setExamSubjects(response.data);
            } catch (error) {
                setError('Đã xảy ra lỗi khi lấy dữ liệu.');
            }
        };

        fetchData();
    }, []);

    const handleAddExamSubject = async () => {
        if (newExamSubject.name && newExamSubject.description) {
            try {
                await addExamSubject(newExamSubject);
                setNewExamSubject({});
                const response = await fetchExamSubjects();
                setExamSubjects(response.data);
            } catch (error) {
                setError('Đã xảy ra lỗi khi thêm môn thi.');
            }
        }
    };

    const handleUpdateExamSubject = async (id: number) => {
        if (editingExamSubject.name && editingExamSubject.description) {
            try {
                await updateExamSubject(id, editingExamSubject);
                setEditingExamSubject(null);
                const response = await fetchExamSubjects();
                setExamSubjects(response.data);
            } catch (error) {
                setError('Đã xảy ra lỗi khi sửa môn thi.');
            }
        }
    };

    const handleDeleteExamSubject = async (id: number) => {
        try {
            await deleteExamSubject(id);
            const response = await fetchExamSubjects();
            setExamSubjects(response.data);
        } catch (error) {
            setError('Đã xảy ra lỗi khi xóa môn thi.');
        }
    };

    return (
        <div>
            <h1>Quản lý môn thi</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <div>
                <h2>Thêm môn thi mới</h2>
                <input
                    type="text"
                    placeholder="Tên môn thi"
                    value={newExamSubject.name || ''}
                    onChange={(e) => setNewExamSubject({ ...newExamSubject, name: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Mô tả"
                    value={newExamSubject.description || ''}
                    onChange={(e) => setNewExamSubject({ ...newExamSubject, description: e.target.value })}
                />
                <button onClick={handleAddExamSubject}>Thêm môn thi</button>
            </div>

            <div>
                <h2>Danh sách môn thi</h2>
                {examSubjects.length > 0 ? (
                    examSubjects.map((examSubject) => (
                        <div key={examSubject.id}>
                            <h3>{examSubject.name}</h3>
                            <p>{examSubject.description}</p>
                            <button onClick={() => setEditingExamSubject(examSubject)}>Sửa</button>
                            <button onClick={() => handleDeleteExamSubject(examSubject.id)}>Xóa</button>
                        </div>
                    ))
                ) : (
                    <p>Chưa có môn thi nào.</p>
                )}
            </div>

            {editingExamSubject && (
                <div>
                    <h2>Sửa môn thi</h2>
                    <input
                        type="text"
                        placeholder="Tên môn thi"
                        value={editingExamSubject.name || ''}
                        onChange={(e) => setEditingExamSubject({ ...editingExamSubject, name: e.target.value })}
                    />
                    <input
                        type="text"
                        placeholder="Mô tả"
                        value={editingExamSubject.description || ''}
                        onChange={(e) => setEditingExamSubject({ ...editingExamSubject, description: e.target.value })}
                    />
                    <button onClick={() => handleUpdateExamSubject(editingExamSubject.id!)}>Lưu thay đổi</button>
                    <button onClick={() => setEditingExamSubject(null)}>Hủy</button>
                </div>
            )}
        </div>
    );
};

export default ExamSubjectManagement;
