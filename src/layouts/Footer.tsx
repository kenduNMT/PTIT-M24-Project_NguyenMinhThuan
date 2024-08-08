import React from 'react';

const Footer: React.FC = () => {
    return (
        <footer>
            <div className="container">
                <div className="contact">
                    <h3>Liên hệ</h3>
                    <p>Email: binbabyb@#gmail.com</p>
                    <p>Phone: +0562085853</p>
                </div>
                <div className="info">
                    <h3>Thông tin về chúng tôi</h3>
                    <a href="#">Trợ giúp</a><br />
                    <a href="#">Chính sách bảo mật</a>
                    <p>Nguồn từ: eduquiz.vn</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
