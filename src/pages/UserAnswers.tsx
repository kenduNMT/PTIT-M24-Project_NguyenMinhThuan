import React from 'react';

interface UserAnswer {
    id: number;
    userId: number;
    exampId: number;
    score: number;
}

const userAnswersData: UserAnswer[] = [
    {
        id: 1,
        userId: 1,
        exampId: 1,
        score: 15
    },
    {
        id: 2,
        userId: 2,
        exampId: 2,
        score: 8
    }
];

const UserAnswers: React.FC = () => {
    return (
        <div>
            <h1>Kết quả người dùng</h1>
            {userAnswersData.map((userAnswer) => (
                <div key={userAnswer.id}>
                    <h2>Kết quả {userAnswer.id}</h2>
                    <p>User ID: {userAnswer.userId}</p>
                    <p>Đề thi ID: {userAnswer.exampId}</p>
                    <p>Điểm số: {userAnswer.score}</p>
                </div>
            ))}
        </div>
    );
};

export default UserAnswers;