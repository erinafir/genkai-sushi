import { Outlet } from "react-router-dom";
import Footer from "./footer";
import Header from "./Header";

export default function SubLayout() {
    return (
        <>
        <Header />
        <Outlet />
        <Footer />
        </>
    )
}