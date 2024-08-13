import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserProfile, updateUserProfile } from "../../store/slices/usersSlice";
import { RootState } from "../../store";
import { Button, Form } from "react-bootstrap";
import './Profile.css'; // Import CSS
import { useNavigate } from "react-router-dom";

const EditProfilePage: React.FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userProfile = useSelector((state: RootState) => state.user.userProfile);
    const isLoading = useSelector((state: RootState) => state.user.isLoading);
    const errorMessage = useSelector((state: RootState) => state.user.error);

    const [editForm, setEditForm] = useState({
        email: '',
        fullName: '',
        phone: '',
        birthday: '',
        password: '',
        passwordConfirm: ''
    });
    const [error, setError] = useState({
        email: '',
        fullName: '',
        phone: '',
        birthday: '',
        password: '',
        passwordConfirm: ''
    });

    useEffect(() => {
        const userLogin = localStorage.getItem("userLogin");
        if (userLogin) {
            const user = JSON.parse(userLogin);
            const userId = user.id;
            dispatch(fetchUserProfile(userId));
        }
    }, [dispatch]);

    useEffect(() => {
        if (userProfile) {
            setEditForm({
                email: userProfile.email,
                fullName: userProfile.fullName,
                phone: userProfile.phone,
                birthday: userProfile.birthday,
                password: userProfile.password,
                passwordConfirm: userProfile.passwordConfirm
            });
        }
    }, [userProfile]);

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setEditForm({ ...editForm, [name]: value });
    };

    const handleSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        let valid = true;
        let newError = { ...error };

        if (!editForm.email.trim()) {
            newError.email = 'Email không để trống';
            valid = false;
        } else {
            newError.email = '';
        }

        if (!editForm.fullName.trim()) {
            newError.fullName = 'Họ tên không để trống';
            valid = false;
        } else {
            newError.fullName = '';
        }

        if (!editForm.phone.trim()) {
            newError.phone = 'Số điện thoại không để trống';
            valid = false;
        } else {
            newError.phone = '';
        }

        if (!editForm.birthday.trim()) {
            newError.birthday = 'Ngày sinh không để trống';
            valid = false;
        } else {
            newError.birthday = '';
        }

        if (editForm.password !== editForm.passwordConfirm) {
            newError.passwordConfirm = 'Mật khẩu xác nhận không khớp';
            valid = false;
        } else {
            newError.passwordConfirm = '';
        }

        if (!valid) {
            setError(newError);
            return;
        }

        const userId = userProfile?.id;
        if (userId) {
            dispatch(updateUserProfile({
                userId,
                email: editForm.email,
                fullName: editForm.fullName,
                phone: editForm.phone,
                birthday: editForm.birthday,
                password: editForm.password
            }));
            // Cập nhật thành công, có thể điều hướng hoặc xử lý thêm
            navigate('/'); // Điều hướng về trang chính sau khi cập nhật
        }
    };

    return (
        <div className="profile-container">
            <div className="profile-card">
                <h2>Chỉnh sửa thông tin cá nhân</h2>
                {isLoading ? (
                    <p>Đang tải...</p>
                ) : (
                    <Form className="border border-2 p-4 rounded-2" onSubmit={handleSubmitForm}>
                        <Form.Group className="mb-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="text"
                                name="email"
                                value={editForm.email}
                                onChange={handleInput}
                            />
                            {error.email && <Form.Text className="text-danger">{error.email}</Form.Text>}
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Họ tên</Form.Label>
                            <Form.Control
                                type="text"
                                name="fullName"
                                value={editForm.fullName}
                                onChange={handleInput}
                            />
                            {error.fullName && <Form.Text className="text-danger">{error.fullName}</Form.Text>}
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Số điện thoại</Form.Label>
                            <Form.Control
                                type="text"
                                name="phone"
                                value={editForm.phone}
                                onChange={handleInput}
                            />
                            {error.phone && <Form.Text className="text-danger">{error.phone}</Form.Text>}
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Ngày sinh</Form.Label>
                            <Form.Control
                                type="date"
                                name="birthday"
                                value={editForm.birthday}
                                onChange={handleInput}
                            />
                            {error.birthday && <Form.Text className="text-danger">{error.birthday}</Form.Text>}
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Mật khẩu mới</Form.Label>
                            <Form.Control
                                type="password"
                                name="password"
                                value={editForm.password}
                                onChange={handleInput}
                            />
                            {error.password && <Form.Text className="text-danger">{error.password}</Form.Text>}
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Xác nhận mật khẩu</Form.Label>
                            <Form.Control
                                type="password"
                                name="passwordConfirm"
                                value={editForm.passwordConfirm}
                                onChange={handleInput}
                            />
                            {error.passwordConfirm && <Form.Text className="text-danger">{error.passwordConfirm}</Form.Text>}
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Lưu
                        </Button>
                        <Button variant="secondary" onClick={() => navigate('/')} style={{ marginLeft: '10px' }}>
                            Trở lại trang chủ
                        </Button>
                    </Form>
                )}
            </div>
        </div>
    );
};

export default EditProfilePage;
