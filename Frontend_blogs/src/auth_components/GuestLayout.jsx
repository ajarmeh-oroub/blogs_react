import { Navigate,Outlet } from 'react-router-dom'
import { useStateContext } from "../contexts/ContextProvider";


export const GuestLayout = () => {

  const { userToken } = useStateContext();


  // this will redirect you to signup page or login page depend on the path.
  // signup/login start render from here (from '/')
  // outlet will render the specific page then.
  if (userToken) {
    return <Navigate to="/" />
  }


  return (
    <div>
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            alt="Your Company"
            src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
            className="mx-auto h-10 w-auto"
          />
          <Outlet/>     
            </div>
        </div>
         
    </div>  
  )
}

export default GuestLayout
