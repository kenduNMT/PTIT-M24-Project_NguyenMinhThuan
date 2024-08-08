import React from 'react';

interface QuizCardProps {
    title: string;
    author: string;
    date: string;
    questions: number;
    time: number;
    link: string;
    difficulty: string;
}

const QuizCard: React.FC<QuizCardProps> = ({ title, author, date, questions, time, link, difficulty }) => {
    const showInfo = (event: React.MouseEvent<HTMLButtonElement>) => {
        // Implement show info logic here
    };

    return (
        <div className="col-md-4">
            <div className="card khoa-hoc" data-difficulty={difficulty} data-time={time}>
                <img
                    className="card-img-top"
                    src="https://eduquiz.vn/_next/image?url=https%3A%2F%2Fimg.freepik.com%2Fpremium-vector%2Fquiz-comic-pop-art-style_175838-505.jpg%3Fw%3D600&w=1920&q=60"
                    alt="Quiz Image"
                />
                <div className="card-body">
                    <h5 className="card-title">{title}</h5>
                    <p className="card-text">{author}</p>
                    <p className="card-text">{date}</p>
                    <p className="card-text">{questions} câu hỏi</p>
                    <p className="card-text">Thời gian: {time} phút</p>
                    <a href={link} className="btn btn-success">Bắt Đầu</a>
                    <button className="btn btn-secondary" onClick={showInfo}>Xem thông tin đề</button>
                    <div className="difficulty" style={{ display: 'none' }}></div>
                </div>
            </div>
        </div>
    );
};

const QuizCards: React.FC = () => {
    const quizzes = [
        { title: 'Anh 1', author: 'Nguyễn Hồng Thanh Phú', date: '12/04/2024', questions: 10, time: 10, link: '', difficulty: 'easy' },
        { title: 'Văn 1', author: 'Nguyễn Lý Gia An', date: '12/04/2024', questions: 10, time: 10, link: '', difficulty: 'easy' },
        { title: 'Toán 2', author: 'Nguyễn Lý Gia An', date: '12/04/2024', questions: 10, time: 10, link: '', difficulty: 'hard' },
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
