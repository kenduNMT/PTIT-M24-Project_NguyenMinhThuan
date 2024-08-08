import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../store/slices/usersSlice';
import { RootState } from '../store';

const Navbar: React.FC = () => {
    const dispatch = useDispatch();
    const userLogin = useSelector((state: RootState) => state.user.userLogin);

    const showInfo = (event: React.MouseEvent<HTMLButtonElement>) => {
        // Implement show info logic here
    };

    const handleLogout = () => {
        dispatch(logoutUser());
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light fixed-top">
            <div className="container">
                <a className="navbar-brand" href="./exam.html">
                    <img
                        src="https://eduquiz.vn/_next/image?url=%2Flogo%2Flogo-256.png&w=1920&q=75"
                        alt="EduQuiz Logo"
                        width="70"
                        height="50"
                    />
                </a>
                <a className="navbar-brand" href="./exam.html">EduQuiz</a>
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
                            <a className="nav-link" href="test.html">Các môn thi</a>
                        </li>
                        <li className="nav-item active" id="subjects-dropdown">
                            <a className="nav-link" href="test.html">Các đề thi</a>
                        </li>
                        {/* <div className="dropdown">
                            <button
                                className="btn btn-secondary dropdown-toggle"
                                type="button"
                                id="difficultyDropdownMenuButton"
                                data-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                            >
                                Lọc đề theo độ khó
                            </button>
                            <div className="dropdown-menu" aria-labelledby="difficultyDropdownMenuButton">
                                <a className="dropdown-item" href="#" onClick={() => filterByDifficulty('easy')}>Đề dễ</a>
                                <a className="dropdown-item" href="#" onClick={() => filterByDifficulty('hard')}>Đề khó</a>
                                <div className="dropdown-divider"></div>
                                <a className="dropdown-item" href="#" onClick={() => filterByDifficulty('all')}>Tất cả</a>
                            </div>
                        </div> */}
                        {/* <div className="dropdown">
                            <button
                                className="btn btn-secondary dropdown-toggle"
                                type="button"
                                id="timeDropdownMenuButton"
                                data-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                            >
                                Lọc đề theo thời gian
                            </button>
                            <div className="dropdown-menu" aria-labelledby="timeDropdownMenuButton">
                                <a className="dropdown-item" href="#" onClick={() => filterByTime('short')}>Thời gian ít (dưới 5 phút)</a>
                                <a className="dropdown-item" href="#" onClick={() => filterByTime('long')}>Thời gian nhiều (trên 5 phút)</a>
                                <div className="dropdown-divider"></div>
                                <a className="dropdown-item" href="#" onClick={() => filterByTime('all')}>Tất cả</a>
                            </div>
                        </div> */}
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
                                <li className="nav-item active">
                                    <a id="profileBtn" className="nav-link btn btn-primary rounded-pill text-black" href="./profile">Trang cá nhân</a>
                                </li>
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
