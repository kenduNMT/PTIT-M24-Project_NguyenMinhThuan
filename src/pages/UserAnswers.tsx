import React, { useEffect, useState } from 'react';
import { auth } from '../service/index'; // Import cấu hình axios
// import './UserAnswers.css'; // Import CSS nếu có

interface UserAnswer {
    id: number;
    examTitle: string;
    score: number;
}

const UserAnswers: React.FC = () => {
    const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchUserAnswers = async () => {
            try {
                const response = await auth.get('/userAnswers'); // Đổi đường dẫn API phù hợp với API của bạn
                setUserAnswers(response.data);
            } catch (error) {
                setError('Đã xảy ra lỗi khi lấy dữ liệu.');
            } finally {
                setLoading(false);
            }
        };

        fetchUserAnswers();
    }, []);

    if (loading) return <p>Đang tải dữ liệu...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            <h1>Kết quả người dùng</h1>
            {userAnswers.length > 0 ? (
                userAnswers.map((userAnswer) => (
                    <div key={userAnswer.id}>
                        <h2>Kết quả {userAnswer.id}</h2>
                        <p>Đề thi : {userAnswer.examTitle}</p>
                        <p>Điểm số: {userAnswer.score}</p>
                    </div>
                ))
            ) : (
                <p>Chưa có kết quả thi.</p>
            )}
        </div>
    );
};

export default UserAnswers;
