import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import DetailPage from "./pages/detail";
import MainLayout from "./component/MainLayout"
import App from "./App";
const router = createBrowserRouter([
    {
        element: <MainLayout />,
        children: [
            {
                path: "/pub/cuisines",
                element: <App />,

            },
            {
                path: "/pub/cuisines/:id",
                element: <DetailPage />
            }
        ]
    },
]);

export default router