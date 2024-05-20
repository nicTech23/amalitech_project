
import Login from "./screen/auth/login";
import Signup from "./screen/auth/signup";
import ForgetPassword from "./screen/auth/forget_password";
import UpdatePassword from "./screen/auth/update_password";
import Feeds from "./screen/feeds/feeds";
import Dashboard from "./screen/admin_dashboard/dashboard";
import AdminProvider from "./service/auth_context/admin_context";
 import  {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import DocumentProvider from "./service/document_context";
import FeedProvider from "./service/feeds_content";
import AdminLogin from "./screen/auth/admin_login";
import AdminSignup from "./screen/auth/admin_signup";
import Verify from "./screen/verify";


const router = createBrowserRouter([

  {
    path: "/",
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
    element:<Feeds/> 
  },
  {
    path: "/dashboard",
    element: <Dashboard/>
  },
  {
    path: "/admin-login",
    element: <AdminLogin/>
  },
  {
    path: "/admin-signup",
    element: <AdminSignup/>
  },
  {
    path: "/verify/:token",
    element: <Verify/>
  },
]);

function App() {
  return (
    <FeedProvider>
      <DocumentProvider>
        <AdminProvider>
          <RouterProvider router={router}>
          </RouterProvider>
        </AdminProvider>
    </DocumentProvider>
    </FeedProvider>
  );
}

export default App;
