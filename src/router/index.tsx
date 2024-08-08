// định nghĩa các router của ứng dụng 
// admin
// http://localhost:5173/admin/users
// user
// http://localhost:5173/profile


import { Route, Routes } from 'react-router-dom'
import { RegisterPage } from '../pages/auth/RegisterPage'
import LoginPage from '../pages/auth/LoginPage'
import ProtectedRouter from '../pages/ProtectedRouter'
import DashBoard from '../pages/admin/DashBoard'
// import Product from '../pages/admin/Product'
import UserAccount from '../pages/admin/UserAccount'
import Category from '../pages/admin/Category'
import Home from '../pages/Home'
// import { Home } from '../pages'

export const Router = () => {
    return (
        <Routes>
            <Route path='/register' element={<RegisterPage />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/' element={<Home />} />
            <Route path='/admin' element={<ProtectedRouter />}>
                <Route index element={<DashBoard />} />
                {/* <Route path='product' element={<Product />} /> */}
                <Route path='user' element={<UserAccount />} />
                <Route path='category' element={<Category />} />
            </Route>
        </Routes>

        // <Routes>
        //   {/* định nhĩa các đường dẫn */}
        //   <Route path='/' element={<Home />} >
        //     {/* khai báo các đường dẫn con ở đây */}
        //     <Route index element={<main>Banner</main>}/>
        //     <Route path='products' element={<main>Products</main>}/>
        //     <Route path='about' element={<main>about</main>}/>
        //     <Route path='profile' element={<main>Profile</main>}/>
        //   </Route>
        //   <Route path='/product/:productId' element={<ProductDetails/>}/>

        //   <Route path='/register' element={<RegisterPage />} />
        //   <Route path='/login' element={<LoginPage />} />
        //   <Route path='*' element={<NotFound/>}/>
        // </Routes>
    )
}
