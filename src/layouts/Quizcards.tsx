import React from 'react';

interface QuizCardProps {
    title: string;
    author: string;
    date: string;
}

const QuizCard: React.FC<QuizCardProps> = ({ title, author, date, }) => {
    return (
        <div className="col-md-4">
            <div className="card khoa-hoc">
                <img
                    className="card-img-top"
                    src="https://eduquiz.vn/_next/image?url=https%3A%2F%2Fimg.freepik.com%2Fpremium-vector%2Fquiz-comic-pop-art-style_175838-505.jpg%3Fw%3D600&w=1920&q=60"
                    alt="Quiz Image"
                />
                <div className="card-body">
                    <h5 className="card-title">{title}</h5>
                    <p className="card-text">{author}</p>
                    <p className="card-text">{date}</p>
                </div>
            </div>
        </div>
    );
};

const QuizCards: React.FC = () => {
    const quizzes = [
        { title: 'Anh 11', author: 'Nguyễn Hồng Thanh Phú', date: '12/04/2024'},
        { title: 'Văn 10', author: 'Nguyễn Lý Gia An', date: '12/04/2024'},
        { title: 'Toán 12', author: 'Nguyễn Lý Gia An', date: '12/04/2024'},
    ];

    return (
        <div className="container">
            <div className="row">
                {quizzes.map((quiz, index) => (
                    <QuizCard key={index} {...quiz} />
                ))}
            </div>
        </div>
    );
};

export default QuizCards;
