import React, { useEffect, useState } from 'react';
import { fetchQuestions, addQuestion, updateQuestion, deleteQuestion } from '../../service/admin/question'; 
import '../css/QuestionManagement.css';

interface Question {
    id: number;
    question: string;
    examId: number;
    options: string[];
    answer: string;
}

const QuestionManagement: React.FC = () => {
    const [questions, setQuestions] = useState<Question[]>([]);
    const [newQuestion, setNewQuestion] = useState<Partial<Question>>({});
    const [editingQuestion, setEditingQuestion] = useState<Partial<Question> | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetchQuestions();
                setQuestions(response.data);
            } catch (error) {
                setError('Đã xảy ra lỗi khi lấy dữ liệu.');
            }
        };

        fetchData();
    }, []);

    const handleAddQuestion = async () => {
        if (newQuestion.question && newQuestion.options && newQuestion.answer) {
            try {
                await addQuestion(newQuestion);
                setNewQuestion({});
                const response = await fetchQuestions();
                setQuestions(response.data);
            } catch (error) {
                setError('Đã xảy ra lỗi khi thêm câu hỏi.');
            }
        }
    };

    const handleUpdateQuestion = async (id: number) => {
        if (editingQuestion.question && editingQuestion.options && editingQuestion.answer) {
            try {
                await updateQuestion(id, editingQuestion);
                setEditingQuestion(null);
                const response = await fetchQuestions();
                setQuestions(response.data);
            } catch (error) {
                setError('Đã xảy ra lỗi khi sửa câu hỏi.');
            }
        }
    };

    const handleDeleteQuestion = async (id: number) => {
        try {
            await deleteQuestion(id);
            const response = await fetchQuestions();
            setQuestions(response.data);
        } catch (error) {
            setError('Đã xảy ra lỗi khi xóa câu hỏi.');
        }
    };

    return (
        <div>
            <h1>Quản lý câu hỏi</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <div>
                <h2>Thêm câu hỏi mới</h2>
                <input
                    type="text"
                    placeholder="Câu hỏi"
                    value={newQuestion.question || ''}
                    onChange={(e) => setNewQuestion({ ...newQuestion, question: e.target.value })}
                />
                <input
                    type="number"
                    placeholder="Id đề thi"
                    value={newQuestion.examId || ''}
                    onChange={(e) => setNewQuestion({ ...newQuestion, examId: Number(e.target.value) })}
                />
                <textarea
                    placeholder="Các lựa chọn (mỗi lựa chọn trên một dòng)"
                    value={(newQuestion.options || []).join('\n')}
                    onChange={(e) => setNewQuestion({ ...newQuestion, options: e.target.value.split('\n') })}
                />
                <input
                    type="text"
                    placeholder="Đáp án đúng"
                    value={newQuestion.answer || ''}
                    onChange={(e) => setNewQuestion({ ...newQuestion, answer: e.target.value })}
                />
                <button onClick={handleAddQuestion}>Thêm câu hỏi</button>
            </div>

            <div>
                <h2>Danh sách câu hỏi</h2>
                {questions.length > 0 ? (
                    questions.map((question) => (
                        <div key={question.id}>
                            <h3>{question.question}</h3>
                            <p>Đề thi ID: {question.examId}</p>
                            <p>Lựa chọn:</p>
                            <ul>
                                {question.options.map((option, index) => (
                                    <li key={index}>{option}</li>
                                ))}
                            </ul>
                            <p>Đáp án: {question.answer}</p>
                            <button onClick={() => setEditingQuestion(question)}>Sửa</button>
                            <button onClick={() => handleDeleteQuestion(question.id)}>Xóa</button>
                        </div>
                    ))
                ) : (
                    <p>Chưa có câu hỏi nào.</p>
                )}
            </div>

            {editingQuestion && (
                <div>
                    <h2>Sửa câu hỏi</h2>
                    <input
                        type="text"
                        placeholder="Câu hỏi"
                        value={editingQuestion.question || ''}
                        onChange={(e) => setEditingQuestion({ ...editingQuestion, question: e.target.value })}
                    />
                    <input
                        type="number"
                        placeholder="Id đề thi"
                        value={editingQuestion.examId || ''}
                        onChange={(e) => setEditingQuestion({ ...editingQuestion, examId: Number(e.target.value) })}
                    />
                    <textarea
                        placeholder="Các lựa chọn (mỗi lựa chọn trên một dòng)"
                        value={(editingQuestion.options || []).join('\n')}
                        onChange={(e) => setEditingQuestion({ ...editingQuestion, options: e.target.value.split('\n') })}
                    />
                    <input
                        type="text"
                        placeholder="Đáp án đúng"
                        value={editingQuestion.answer || ''}
                        onChange={(e) => setEditingQuestion({ ...editingQuestion, answer: e.target.value })}
                    />
                    <button onClick={() => handleUpdateQuestion(editingQuestion.id!)}>Lưu thay đổi</button>
                    <button onClick={() => setEditingQuestion(null)}>Hủy</button>
                </div>
            )}
        </div>
    );
};

export default QuestionManagement;
