import { useDispatch } from 'react-redux';
import './login.css';
import React, { useState } from 'react';
import { registerUser } from '../../store/slices/usersSlice';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';

const initStateForm = {
    email: '',
    password: '',
    passwordConfirm: '',
    fullName: '',
    phone: '',
    birthday: '',
    role: ''
};

const initErrorForm = {
    email: '',
    password: '',
    passwordConfirm: '',
    fullName: '',
    phone: '',
    birthday: ''
};

export const RegisterPage = () => {
    const [registerForm, setRegisterForm] = useState(initStateForm);
    const [error, setError] = useState(initErrorForm);

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setRegisterForm({ ...registerForm, [name]: value });
    };

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // validate
        // ko để trống
        if (!registerForm.email.trim()) {
            setError((pre) => ({ ...pre, email: 'email ko để trống' }));
            return;
        }
        if (!registerForm.email.toLowerCase().match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )) {
            // ko hợp lệ
            setError((pre) => ({ ...pre, email: 'email ko đúng định dạng' }));
            return;
        }
        setError((pre) => ({ ...pre, email: '' }));
        // password
        if (!registerForm.password.trim()) {
            setError((pre) => ({ ...pre, password: 'password ko để trống' }));
            return;
        }
        if (registerForm.password.length < 6) {
            setError((pre) => ({ ...pre, password: 'password phải ít nhất 6 ki tự' }));
            return;
        }
        setError((pre) => ({ ...pre, password: '' }));
        // call api
        dispatch(registerUser(registerForm));
        navigate("/login");
    };

    return (
        <div className='form-login'>
            <h2 className='text-center'>Register</h2>
            <Form className='border border-2 p-4 rounded-2 w-50' onSubmit={handleSubmitForm}>
                <Form.Group className="mb-3">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter email"
                        value={registerForm.email}
                        name="email"
                        onChange={handleInput}
                    />
                    {
                        error.email && <Form.Text className="text-danger">
                            {error.email}
                        </Form.Text>
                    }
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Enter password"
                        value={registerForm.password}
                        name="password"
                        onChange={handleInput}
                    />
                    {
                        error.password && <Form.Text className="text-danger">
                            {error.password}
                        </Form.Text>
                    }
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Confirm password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Enter confirm password"
                        value={registerForm.passwordConfirm}
                        name="passwordConfirm"
                        onChange={handleInput}
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Fullname</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter full name"
                        value={registerForm.fullName}
                        name="fullName"
                        onChange={handleInput}
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Phone number</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter phone"
                        value={registerForm.phone}
                        name="phone"
                        onChange={handleInput}
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Birthday</Form.Label>
                    <Form.Control
                        type="date"
                        placeholder="Enter birthday"
                        value={registerForm.birthday}
                        name="birthday"
                        onChange={handleInput}
                    />
                </Form.Group>
                <p>Bạn đã có tài khoản? <Link to={"/login"}>Đăng nhập</Link></p>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </div>
    );
};
