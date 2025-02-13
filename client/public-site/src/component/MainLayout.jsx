import { Outlet } from "react-router-dom";
import Footer from "./footer";
import Navbar from "./Navbar";
import Header from "./Header";

export default function MainLayout() {
    return (
        <>
        <Navbar />
        <Header />
        <Outlet />
        <Footer />
        </>
    )
}