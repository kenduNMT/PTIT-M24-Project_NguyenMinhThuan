import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../store/slices/usersSlice';

const Navbar: React.FC = () => {
    const dispatch = useDispatch();
    const [userLogin, setUserLogin] = useState<boolean>(false);
    const [isAdmin, setIsAdmin] = useState<boolean>(false);

    useEffect(() => {
        const storedUserLogin = localStorage.getItem("access_token");
        const storedRole = localStorage.getItem("role");
        
        if (storedUserLogin) {
            setUserLogin(true);
        }
        
        if (storedRole === 'ADMIN') {
            setIsAdmin(true);
        }
    }, []);

    const handleLogout = () => {
        const confirmLogout = window.confirm("Bạn có muốn đăng xuất không?");
        if (confirmLogout) {
            dispatch(logoutUser()); // Gọi action để đăng xuất
            setUserLogin(false);
            setIsAdmin(false);
        }
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light fixed-top">
            <div className="container">
                <a className="navbar-brand" href="/">
                    <img
                        src="https://eduquiz.vn/_next/image?url=%2Flogo%2Flogo-256.png&w=1920&q=75"
                        alt="EduQuiz Logo"
                        width="70"
                        height="50"
                    />
                </a>
                <a className="navbar-brand" href="/">EduQuiz</a>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarResponsive"
                    aria-controls="navbarResponsive"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarResponsive">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item active">
                            <a className="nav-link btn btn-link text-primary" href="/">Trang chủ</a>
                        </li>
                        <li className="nav-item active" id="subjects-dropdown">
                            <a className="nav-link" href="./courses">Các khóa luyện thi</a>
                        </li>
                        <form id="searchForm" className="form-inline my-2 my-lg-0">
                            <input id="searchInput" className="form-control mr-sm-2" type="text" placeholder="Tìm kiếm" aria-label="Search" />
                            <button id="timKiem" className="btn btn-outline-success my-2 my-sm-0">Tìm kiếm</button>
                        </form>
                        {!userLogin ? (
                            <>
                                <li className="nav-item active">
                                    <a id="registerBtn" className="nav-link btn btn-primary rounded-pill text-black" href="./register">Đăng ký</a>
                                </li>
                                <li className="nav-item active">
                                    <a id="loginBtn" className="nav-link btn btn-primary rounded-pill text-black" href="./login">Đăng nhập</a>
                                </li>
                            </>
                        ) : (
                            <>
                                {isAdmin ? (
                                    <li className="nav-item active">
                                        <a id="adminBtn" className="nav-link btn btn-primary rounded-pill text-black" href="./admin">Quản trị viên</a>
                                    </li>
                                ) : (
                                    <li className="nav-item active">
                                        <a id="profileBtn" className="nav-link btn btn-primary rounded-pill text-black" href="./profile">Trang cá nhân</a>
                                    </li>
                                )}
                                <li className="nav-item active">
                                    <button id="logoutBtn" className="nav-link btn btn-primary rounded-pill text-black" onClick={handleLogout}>Đăng xuất</button>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
