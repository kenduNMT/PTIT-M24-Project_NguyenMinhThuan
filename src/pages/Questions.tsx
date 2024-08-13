import React from 'react';

interface Question {
    id: number;
    question: string;
    examId: number;
    options: string[];
    answer: string;
}

const questionsData: Question[] = [
    {
        id: 1,
        question: "phương trình có nghiệm X =? X2-2X+1=0",
        examId: 1,
        options: ["0", "1", "2", "3"],
        answer: "1"
    },
    {
        id: 2,
        question: "Định lý Pythagore áp dụng cho loại tam giác nào?",
        examId: 2,
        options: [
            "Tam giác vuông",
            "Tam giác đều",
            "Tam giác cân",
            "Tam giác thường"
        ],
        answer: "Tam giác vuông"
    }
];

const Questions: React.FC = () => {
    return (
        <div>
            <h1>Danh sách câu hỏi</h1>
            {questionsData.map((question) => (
                <div key={question.id}>
                    <h2>Câu hỏi {question.id}</h2>
                    <p>{question.question}</p>
                    <ul>
                        {question.options.map((option, index) => (
                            <li key={index}>{option}</li>
                        ))}
                    </ul>
                    <p>Đáp án: {question.answer}</p>
                    <p>Đề thi ID: {question.examId}</p>
                </div>
            ))}
        </div>
    );
};

export default Questions;