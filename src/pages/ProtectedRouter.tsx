import Admin from './admin';
import { Navigate } from 'react-router-dom';



export default function ProtectedRouter() {

    // nếu như có xác thực người dung hiện tại la admin thì cho phép  hiển thị trang admin ra còn ko thì điều hướng về login
    const role = localStorage.getItem('role') as string;


    return (
        <>
            {
                role === 'ADMIN' ? <Admin /> : <Navigate to={"/login"} />
            }
        </>
    )
}