import { createBrowserRouter } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import GuestLayout from './auth_components/GuestLayout.jsx';
import Login from './auth_components/Login.jsx';
import Signup from './auth_components/Signup.jsx';    


const router = createBrowserRouter([
    
    {
        path: "/",
        element: <GuestLayout />,
        children: [
          {
            path: "/login",
            element: <Login />,
          },
          {
            path: "/signup",
            element: <Signup />,
          },
        ],
      },
   
])


export default router;