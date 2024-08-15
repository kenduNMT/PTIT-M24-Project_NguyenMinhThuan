import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllUsers, toggleBlockUser, addUser } from '../../store/slices/usersSlice';
import { RootState } from '../../store';

export default function UserAccount() {
    const dispatch = useDispatch();
    const users = useSelector((state: RootState) => state.user.users);
    const isLoading = useSelector((state: RootState) => state.user.isLoading);
    const error = useSelector((state: RootState) => state.user.error);

    const [newUser, setNewUser] = useState({ email: '', password: '' });
    const [searchTerm, setSearchTerm] = useState(''); // State lưu từ khóa tìm kiếm
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc'); // State để lưu trữ thứ tự sắp xếp
    const [currentPage, setCurrentPage] = useState(1); // State cho trang hiện tại
    const usersPerPage = 5; // Số lượng người dùng mỗi trang

    useEffect(() => {
        dispatch(fetchAllUsers());
    }, [dispatch]);

    // Hàm xử lý tìm kiếm và sắp xếp
    const filteredAndSortedUsers = users
        ?.filter((user) =>
            user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.fullName?.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .sort((a, b) => {
            const nameA = a.fullName ? a.fullName.toLowerCase() : ''; // Kiểm tra null
            const nameB = b.fullName ? b.fullName.toLowerCase() : ''; // Kiểm tra null
            if (sortOrder === 'asc') {
                return nameA.localeCompare(nameB);
            } else {
                return nameB.localeCompare(nameA);
            }
        });

    // Tính toán các user hiển thị trên trang hiện tại
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = filteredAndSortedUsers?.slice(indexOfFirstUser, indexOfLastUser);

    const handleToggleBlock = (userId: number, block: boolean) => {
        dispatch(toggleBlockUser({ userId, block }));
        dispatch(fetchAllUsers());
    };

    const handleAddUser = () => {
        if (newUser.email && newUser.password) {
            dispatch(addUser(newUser));
            setNewUser({ email: '', password: '' });
            dispatch(fetchAllUsers());
        }
    };

    const handleSortOrderChange = () => {
        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    };

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            <h1>User Accounts</h1>

            <div>
                <input
                    type="text"
                    placeholder="Search users..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button onClick={handleSortOrderChange}>
                    Sắp xếp theo tên ({sortOrder === 'asc' ? 'Tăng dần' : 'Giảm dần'})
                </button>
            </div>

            {currentUsers?.length ? (
                <ul>
                    {currentUsers.map((user: any) => (
                        <li key={user.id}>
                            <p>Tài khoản: {user.email}</p>
                            <p>Tên đầy đủ: {user.fullName || 'N/A'}</p> {/* Kiểm tra null */}
                            <p>Trạng thái: {user.block ? 'Blocked' : 'Active'}</p>
                            <button onClick={() => handleToggleBlock(user.id, !user.block)}>
                                {user.block ? 'Mở khóa tài khoản' : 'Khóa tài khoản'}
                            </button>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No users found.</p>
            )}

            {/* Pagination */}
            <div>
                {Array.from({ length: Math.ceil(filteredAndSortedUsers?.length / usersPerPage) }, (_, i) => (
                    <button key={i} onClick={() => paginate(i + 1)}>
                        {i + 1}
                    </button>
                ))}
            </div>

            <div>
                <h2>Thêm tài khoản mới</h2>
                <input
                    type="email"
                    placeholder="Email"
                    value={newUser.email}
                    onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                />
                <input
                    type="password"
                    placeholder="Mật khẩu"
                    value={newUser.password}
                    onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                />
                <button onClick={handleAddUser}>Thêm tài khoản</button>
            </div>
        </div>
    );
}
