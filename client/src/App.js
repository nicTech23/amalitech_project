
import Login from "./screen/auth/login";
import Signup from "./screen/auth/signup";
import ForgetPassword from "./screen/auth/forget_password";
import UpdatePassword from "./screen/auth/update_password";
import Feeds from "./screen/feeds/feeds";
import Dashboard from "./screen/admin_dashboard/dashboard";
 import  {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";


const router = createBrowserRouter([
  {
    path: "/",
    element: <div>Hello world!</div>,
  },
  {
    path: "/login",
    element: <Login/>
  },
  {
    path: "/signup",
    element: <Signup/>
  },
  {
    path: "/forgot-password",
    element: <ForgetPassword/>
  },
  {
    path: "/update-password",
    element: <UpdatePassword/>
  },
  {
    path: "/feeds",
    element: <Feeds/>
  },
  {
    path: "/dashboard",
    element: <Dashboard/>
  },
]);

function App() {
  return (
    <RouterProvider router={router}>

    </RouterProvider>
  );
}

export default App;
