import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './login.css'
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup'
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../store/slices/usersSlice';
import { RootState } from '../../store';
import { useEffect } from 'react';

const LoginPage = () => {
    const dispatch = useDispatch();

    // lấy userLogin
    const userLogin = useSelector((state: RootState) => state.user.userLogin)

    const message = useSelector((state: RootState) => state.user.error)
    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .required("Không được để trống")
                .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "email không đúng định dạng"),
            password: Yup.string()
                .required("Không được để trống")
        })
        ,
        onSubmit: (values) => {
            console.log(values);
            // call api

            dispatch(loginUser(values))
        }
    })
    const navigate = useNavigate()

    const onSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        formik.handleSubmit();
    }
    useEffect(() => {
        // nếu quyền người dùng là admin thì điều hướng sang trang admin ,
        // nếu là user thì điều hướng sang user
        if (userLogin) {
            if (userLogin.role) {
                // điều hướng sang trang admin
                navigate("/admin")
            } else {
                // điều hướng sang trang user
                navigate("/")
            }
        }
    }, [userLogin])
    return (
        <div className='form-login'>
            <h2 className='text-center'>Login</h2>
            <Form onSubmit={onSubmitForm} className='border border-2 p-4 rounded-2 w-50'>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" name="email" value={formik.values.email} onChange={formik.handleChange} />
                    {
                        formik.errors.email && <Form.Text className="text-danger">
                            {formik.errors.email}
                        </Form.Text>
                    }
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" name="password" value={formik.values.password} onChange={formik.handleChange} />
                    {
                        formik.errors.password && <Form.Text className="text-danger">
                            {formik.errors.password}
                        </Form.Text>
                    }
                </Form.Group>
                <p>Bạn chưa có tài khoản ? <Link to={"/register"}>Đăng kí</Link></p>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
            {
                message && <div className="text-danger">{message}</div>  // hiển thị thông báo l��i nếu có


            }
        </div>
    );
}

export default LoginPage;