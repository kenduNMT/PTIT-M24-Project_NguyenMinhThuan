import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './login.css';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, logoutUser } from '../../store/slices/usersSlice';
import { RootState } from '../../store';
import { useEffect } from 'react';

const LoginPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const userLogin = useSelector((state: RootState) => state.user.userLogin);
    const message = useSelector((state: RootState) => state.user.error);

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .required("Không được để trống")
                .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Email không đúng định dạng"),
            password: Yup.string().required("Không được để trống")
        }),
        onSubmit: (values) => {
            if (userLogin?.block) {
                alert("Tài khoản của bạn đã bị khóa.");
                dispatch(logoutUser()); // Gọi action để đăng xuất
            } else {

                dispatch(loginUser(values));
            // navigate("/");

            }
        },
    });

    useEffect(() => {
        if (userLogin && !userLogin.block) {
            navigate("/");
        } else {
            navigate("/login")
        }
    }, [userLogin, navigate]);

    return (
        <div className='form-login'>
            <h2 className='text-center'>Login</h2>
            <Form onSubmit={formik.handleSubmit} className='border border-2 p-4 rounded-2 w-50'>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Enter email"
                        name="email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        isInvalid={!!formik.errors.email}
                    />
                    <Form.Control.Feedback type="invalid">
                        {formik.errors.email}
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Password"
                        name="password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        isInvalid={!!formik.errors.password || !!message}
                    />
                    <Form.Control.Feedback type="invalid">
                        {formik.errors.password}
                    </Form.Control.Feedback>
                </Form.Group>
                <p>Bạn chưa có tài khoản ? <Link to={"/register"}>Đăng kí</Link></p>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
            {message && <div className="text-danger">{message}</div>}
        </div>
    );
};

export default LoginPage;