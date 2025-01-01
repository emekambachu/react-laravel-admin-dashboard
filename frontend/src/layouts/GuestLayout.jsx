import {Navigate, Outlet} from "react-router-dom";
import {useStateContext} from "../contexts/ContextProvider.jsx";

export const GuestLayout = () => {

  const {user, token} = useStateContext();

  if(token){
    return <Navigate to="/"/>
  }

  return (
    <>
      <div>
        <h1>Guest Layout</h1>
        <Outlet />
      </div>
    </>
  )
}
