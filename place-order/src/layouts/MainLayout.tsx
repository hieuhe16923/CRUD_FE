// src/layouts/MainLayout.tsx
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from '../components/header/header';
import Footer from '../components/footer/footer';

const MainLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="container-fluid">
            <Header/>
            {children}
            <Footer/>
            <ToastContainer position="top-right" autoClose={1000} />
        </div>
    );
};

export default MainLayout;
