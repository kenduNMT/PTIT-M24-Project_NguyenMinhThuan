import React, { useEffect, useState } from 'react';
import { fetchCourses, addCourse, updateCourse, deleteCourse } from '../../service/admin/courses'; // Import các hàm API
import '../css/CoursesManagemen.css';

interface Course {
    id: number;
    title: string;
    description: string;
}

const CoursesManagement: React.FC = () => {
    const [courses, setCourses] = useState<Course[]>([]);
    const [newCourse, setNewCourse] = useState<Partial<Course>>({});
    const [editingCourse, setEditingCourse] = useState<Partial<Course> | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetchCourses();
                setCourses(response.data);
            } catch (error) {
                setError('Đã xảy ra lỗi khi lấy dữ liệu.');
            }
        };

        fetchData();
    }, []);

    const handleAddCourse = async () => {
        if (newCourse.title && newCourse.description) {
            try {
                await addCourse(newCourse);
                setNewCourse({});
                const response = await fetchCourses();
                setCourses(response.data);
            } catch (error) {
                setError('Đã xảy ra lỗi khi thêm khóa học.');
            }
        }
    };

    const handleUpdateCourse = async (id: number) => {
        if (editingCourse.title && editingCourse.description) {
            try {
                await updateCourse(id, editingCourse);
                setEditingCourse(null);
                const response = await fetchCourses();
                setCourses(response.data);
            } catch (error) {
                setError('Đã xảy ra lỗi khi sửa khóa học.');
            }
        }
    };

    const handleDeleteCourse = async (id: number) => {
        try {
            await deleteCourse(id);
            const response = await fetchCourses();
            setCourses(response.data);
        } catch (error) {
            setError('Đã xảy ra lỗi khi xóa khóa học.');
        }
    };

    return (
        <div>
            <h1>Quản lý khóa học</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <div>
                <h2>Thêm khóa học mới</h2>
                <input
                    type="text"
                    placeholder="Tiêu đề"
                    value={newCourse.title || ''}
                    onChange={(e) => setNewCourse({ ...newCourse, title: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Mô tả"
                    value={newCourse.description || ''}
                    onChange={(e) => setNewCourse({ ...newCourse, description: e.target.value })}
                />
                <button onClick={handleAddCourse}>Thêm khóa học</button>
            </div>

            <div>
                <h2>Danh sách khóa học</h2>
                {courses.length > 0 ? (
                    courses.map((course) => (
                        <div key={course.id}>
                            <h3>{course.title}</h3>
                            <p>{course.description}</p>
                            <button onClick={() => setEditingCourse(course)}>Sửa</button>
                            <button onClick={() => handleDeleteCourse(course.id)}>Xóa</button>
                        </div>
                    ))
                ) : (
                    <p>Chưa có khóa học nào.</p>
                )}
            </div>

            {editingCourse && (
                <div>
                    <h2>Sửa khóa học</h2>
                    <input
                        type="text"
                        placeholder="Tiêu đề"
                        value={editingCourse.title || ''}
                        onChange={(e) => setEditingCourse({ ...editingCourse, title: e.target.value })}
                    />
                    <input
                        type="text"
                        placeholder="Mô tả"
                        value={editingCourse.description || ''}
                        onChange={(e) => setEditingCourse({ ...editingCourse, description: e.target.value })}
                    />
                    <button onClick={() => handleUpdateCourse(editingCourse.id!)}>Lưu thay đổi</button>
                    <button onClick={() => setEditingCourse(null)}>Hủy</button>
                </div>
            )}
        </div>
    );
};

export default CoursesManagement;
