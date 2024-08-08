import React from 'react';

const Content: React.FC = () => {
    return (
        <div>
            {/* Phần nội dung mới */}
            {/* <div className="content">
                <h2>Chào mừng đến với công cụ ôn thi!</h2>
                <p>Chúng tôi cung cấp các công cụ hữu ích để giúp bạn chuẩn bị cho kỳ thi một cách hiệu quả nhất. Hãy cùng khám phá!</p>
                <img src="https://example.com/welcome-image.jpg" alt="Chào mừng" className="content-image" />
            </div> */}

            {/* Phần card */}
            <div className="jumbotron text-center">
                <h1 className="display-4">Công cụ ôn thi</h1>
                <h1 className="display-4 tail">trắc nghiệm hiệu quả</h1>
                <p className="lead">
                    Thông qua các bài thi trắc nghiệm, công cụ sẽ giúp bạn học tập, ôn thi hiệu quả hơn, đạt điểm số cao.
                </p>
                <div className="column">
                    <p className="number">2M+</p>
                    <p>Lượt truy cập</p>
                </div>
                <div className="column">
                    <p className="number">52K+</p>
                    <p>Đề thi</p>
                </div>
                <div className="column">
                    <p className="number">10M+</p>
                    <p>Lượt thi</p>
                </div>
                <a className="btn btn-primary btn-lg rounded-pill" href="#" role="button">TẠO ĐỀ THI NGAY</a>
            </div>

        </div>
    );
};

export default Content;
