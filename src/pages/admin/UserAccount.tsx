import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllUsers, toggleBlockUser } from '../../store/slices/usersSlice';
import { RootState } from '../../store';

export default function UserAccount() {
    const dispatch = useDispatch();
    const users = useSelector((state: RootState) => state.user.users);
    const isLoading = useSelector((state: RootState) => state.user.isLoading);
    const error = useSelector((state: RootState) => state.user.error);

    useEffect(() => {
        dispatch(fetchAllUsers());
    }, [dispatch]);

    const handleToggleBlock = (userId: number, block:boolean) => {
        dispatch(toggleBlockUser({userId,block}));
        dispatch(fetchAllUsers());

    };

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            <h1>User Accounts</h1>
            {users?.length ? (
                <ul>
                    {users.map((user) => (
                        <li key={user.id}>
                            <p>Tài khoản: {user.email}</p>
                            <p>Trạng thái: {user.block ? "Blocked" : "Active"}</p>
                            <button onClick={() => handleToggleBlock(user.id,!user.block)}>
                                {user.block ? "Mở khóa tài khoản" : "Khóa tài khoản"}
                            </button>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No users found.</p>
            )}
        </div>
    );
}
