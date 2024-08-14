import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../layouts/Navbar';
import './css/Question.css'
import { auth } from '../service';

interface Question {
    id: number;
    question: string;
    examId: number;
    options: string[];
    answer: string;
}

const questionsData: Question[] = [
    {
        "id": 1,
        "question": "phương trình có nghiệm X =? X2-2X+1=0",
        "examId": 1,
        "options": [
            "0",
            "1",
            "2",
            "3"
        ],
        "answer": "1"
    },
    {
        "id": 2,
        "question": "Định lý Pythagore áp dụng cho loại tam giác nào?",
        "examId": 1,
        "options": [
            "Tam giác vuông",
            "Tam giác đều",
            "Tam giác cân",
            "Tam giác thường"
        ],
        "answer": "Tam giác vuông"
    },
    {
        "id": 3,
        "question": "Cho hàm số y = f(x) có đồ thị là đường cong trong hình vẽ. Đồ thị hàm số y = f(x) cắt trục hoành tại điểm A và B. Hàm số đã cho nghịch biến trên khoảng nào?",
        "examId": 1,
        "options": [
            "(−∞;−1)",
            "(−1;1)",
            "(1;+∞)",
            "(−∞;−1)∪(1;+∞)"
        ],
        "answer": "(−1;1)"
    },
    {
        "id": 4,
        "question": "Cho hình chóp S.ABC có đáy ABC là tam giác vuông tại A, SA vuông góc với đáy, AB = 3, AC = 4, SA = 5. Tính thể tích khối chóp S.ABC.",
        "examId": 1,
        "options": [
            "10",
            "15",
            "20",
            "25"
        ],
        "answer": "20"
    },
    {
        "id": 5,
        "question": "Cho hàm số y = f(x) = ax³ + bx² + cx + d (a ≠ 0) có đồ thị cắt trục hoành tại 3 điểm phân biệt và có một tiệm cận ngang y = 1. Tính a + b + c + d.",
        "examId": 1,
        "options": [
            "-1",
            "0",
            "1",
            "2"
        ],
        "answer": "1"
    },
    {
        "id": 6,
        "question": "Một hình nón có bán kính đáy r và chiều cao h. Tỉ số giữa diện tích xung quanh và diện tích đáy của hình nón là 5:2. Tính tỉ số h:r.",
        "examId": 1,
        "options": [
            "√21:2",
            "√21:4",
            "√19:2",
            "√19:4"
        ],
        "answer": "√21:2"
    },
    {
        "id": 7,
        "question": "Cho dãy số (un) được xác định bởi u₁ = 2 và un+1 = un² - 1 với mọi n ≥ 1. Tính u₄.",
        "examId": 1,
        "options": [
            "2",
            "3",
            "4",
            "5"
        ],
        "answer": "3"
    },
    {
        "id": 8,
        "question": "Một vật có khối lượng 2 kg đang chuyển động với vận tốc 3 m/s. Động năng của vật là bao nhiêu?",
        "examId": 15,
        "options": [
            "3 J",
            "6 J",
            "9 J",
            "18 J"
        ],
        "answer": "9 J"
    },
    {
        "id": 9,
        "question": "Một lực 10 N tác dụng lên một vật làm nó di chuyển được 5 m. Công của lực là bao nhiêu?",
        "examId": 15,
        "options": [
            "50 J",
            "25 J",
            "5 J",
            "10 J"
        ],
        "answer": "50 J"
    },
    {
        "id": 10,
        "question": "Tốc độ ánh sáng trong chân không là bao nhiêu?",
        "examId": 15,
        "options": [
            "3 × 10⁶ m/s",
            "3 × 10⁸ m/s",
            "3 × 10⁷ m/s",
            "3 × 10⁹ m/s"
        ],
        "answer": "3 × 10⁸ m/s"
    },
    {
        "id": 11,
        "question": "Đơn vị đo cường độ dòng điện là gì?",
        "examId": 15,
        "options": [
            "Volt",
            "Ampe",
            "Ôm",
            "Watt"
        ],
        "answer": "Ampe"
    },
    {
        "id": 12,
        "question": "Công thức tính điện trở của một dây dẫn có chiều dài l, điện trở suất ρ và diện tích mặt cắt ngang S là gì?",
        "examId": 15,
        "options": [
            "R = ρ/S",
            "R = ρl/S",
            "R = ρS/l",
            "R = S/ρl"
        ],
        "answer": "R = ρl/S"
    },
    {
        "id": 13,
        "question": "Một con lắc đơn có chu kỳ dao động T được tính theo công thức nào?",
        "examId": 15,
        "options": [
            "T = 2π√(l/g)",
            "T = 2π√(g/l)",
            "T = 2π√(l/2g)",
            "T = 2π√(2g/l)"
        ],
        "answer": "T = 2π√(l/g)"
    },
    {
        "id": 14,
        "question": "Điện áp xoay chiều có biểu thức u = U₀cos(ωt + φ). Giá trị U₀ được gọi là gì?",
        "examId": 15,
        "options": [
            "Điện áp tức thời",
            "Biên độ điện áp",
            "Pha ban đầu",
            "Tần số góc"
        ],
        "answer": "Biên độ điện áp"
    }
];

const ExamDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const examId = parseInt(id || '0');
    const [questions, setQuestions] = useState<Question[]>([]);
    const [userAnswers, setUserAnswers] = useState<{ [key: number]: string }>({});
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [score, setScore] = useState(0);
    const [examTitle, setExamTitle] = useState('');

    useEffect(() => {
        setQuestions(questionsData.filter(question => question.examId === examId));
        const userLogin = JSON.parse(localStorage.getItem('userLogin') || '{}');
        setExamTitle(userLogin.currentExamTitle || '');
    }, [examId]);

    const handleOptionChange = (questionId: number, answer: string) => {
        setUserAnswers(prevAnswers => ({
            ...prevAnswers,
            [questionId]: answer,
        }));
    };

    const handleSubmit = async () => {
        let calculatedScore = 0;
        questions.forEach((question) => {
            if (userAnswers[question.id] === question.answer) {
                calculatedScore += 1;
            }
        });

        setScore(calculatedScore);
        setIsSubmitted(true);

        // Lưu kết quả vào API
        try {
            const userId = parseInt(localStorage.getItem('userId') || '0'); // Lấy userId từ localStorage
            await auth.post('/userAnswers', {
                userId,
                examTitle,
                score: calculatedScore,
            });
        } catch (error) {
            console.error('Lỗi khi lưu kết quả:', error);
        }
    };

    return (
        <>
            <Navbar />
            <div className="exam-detail-container">
                <h1>Bài thi chi tiết</h1>
                {questions.length > 0 ? (
                    <form className="exam-form">
                        {questions.map((question) => (
                            <div key={question.id} className="question-card">
                                <h3>{question.question}</h3>
                                {question.options.map((option, index) => (
                                    <label key={index}>
                                        <input
                                            type="radio"
                                            name={`question-${question.id}`}
                                            value={option}
                                            checked={userAnswers[question.id] === option}
                                            onChange={() => handleOptionChange(question.id, option)}
                                            disabled={isSubmitted}
                                        />
                                        {option}
                                    </label>
                                ))}
                            </div>
                        ))}
                        {!isSubmitted ? (
                            <button type="button" onClick={handleSubmit}>Nộp bài</button>
                        ) : (
                            <div className="score">
                                <h2>Bạn đã trả lời đúng {score}/{questions.length} câu hỏi!</h2>
                            </div>
                        )}
                    </form>
                ) : (
                    <p>Không có câu hỏi nào cho bài thi này.</p>
                )}
            </div>
        </>
    );
};

export default ExamDetail;