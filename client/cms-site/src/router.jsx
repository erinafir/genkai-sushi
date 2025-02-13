import {
    createBrowserRouter,
    redirect,
    RouterProvider,
} from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import MainLayout from "./component/MainLayout";
import MenuPage from "./pages/MenuPage";
import RegisterPage from "./pages/RegisterPage";
import CategoryPage from "./pages/CategoryPage";
import AddMenu from "./component/AddMenu";
import UpdateMenu from "./component/UpdateMenu";
import UpdateImg from "./component/UpdateImg";
import SubLayout from "./component/SubLayout";

const router = createBrowserRouter([
    {
        element: <SubLayout />,
        children: [
            {
                path: "/login",
                element: <LoginPage />,
                loader: () => {
                    if (localStorage.getItem('tokens')) {
                        return redirect('/cuisines')
                    }
                    return null
                }
            }
        ]
    },
    {
        element: <MainLayout />,
        loader: () => {
            if (!localStorage.getItem('tokens')) {
                return redirect('/login')
            }
            return null
        },
        children: [
            {
                path: "/cuisines",
                element: <MenuPage />
            },
            {
                path: "/categories",
                element: <CategoryPage />
            },
            {
                path: "/cuisines/add",
                element: <AddMenu />
            },
            {
                path: "/cuisines/:id/update",
                element: <UpdateMenu />
            },
            {
                path: "/cuisines/:id/updateImg",
                element: <UpdateImg />
            },
            {
                path: "/add-user",
                element: <RegisterPage />
            }
        ]
    },
]);

export default router