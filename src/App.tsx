
// import './App.css'

import 'bootstrap/dist/css/bootstrap.min.css';

import { Router } from './router';



function App() {


  // lấy ra biến môi trường
  console.log(import.meta.env.VITE_API_HOST);
  

  return (
    <>
      <Router/>
    </>
  )
}

export default App