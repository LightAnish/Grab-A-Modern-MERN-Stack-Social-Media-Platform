import { createBrowserRouter } from "react-router";
import App from "../App";
import SignUpPage from "../pages/Auth/SignUp.page";
import SignInPage from "../pages/Auth/SignIn.page";

const AppRouter = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        children:[
            {
                path: '',
                element: <SignUpPage/>
            },
            {
                path: '/signin',
                element: <SignInPage/>
            }
        ]
    },
    
])

export default AppRouter;