
import { Outlet } from 'react-router';
import Navbar from './Navbar';
import Footer from './Footer';
const MainLayouts = () => {
    return (
        <>
            <Navbar></Navbar>
            <Outlet></Outlet>
            <Footer></Footer>
        </>
    );
};

export default MainLayouts;