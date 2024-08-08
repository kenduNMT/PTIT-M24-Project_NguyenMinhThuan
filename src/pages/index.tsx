
import { Outlet, useNavigate } from 'react-router-dom'
import { data } from '../store/data'

export const Home = () => {
    const navigate = useNavigate();
    const handleDetailsProduct = (id: number) => {
        // điều hướng trang sang đường dẫn chi tiết
        navigate(`/product/${id}`)
    }
    return (
        <div>
            <nav>Đây là thanh điều hướng</nav>
            {
                data.map(pro => <div onClick={() => handleDetailsProduct(pro.id)}>
                    <h3>{pro.name}</h3>
                </div>)
            }

            <Outlet />
        </div>
    )
}