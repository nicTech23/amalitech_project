
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

import DocumentProvider from "./service/document_context";
import FeedProvider from "./service/feeds_content";

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
    <FeedProvider>
    <DocumentProvider>
      <RouterProvider router={router}>
      </RouterProvider>
    </DocumentProvider>
    </FeedProvider>
  );
}

export default App;
