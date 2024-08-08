import Navbar from '../layouts/Navbar';
import QuizCards from '../layouts/Quizcards';
import Footer from '../layouts/Footer';
import Content from '../layouts/Content';
import '../App.css';
export default function Home() {
    return (
        <div>
            <Navbar />
            <Content />
            <QuizCards />
            <Footer />
        </div>
    )
}
