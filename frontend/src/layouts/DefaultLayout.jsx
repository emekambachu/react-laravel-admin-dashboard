import {Navigate, Outlet} from "react-router-dom";
import {useStateContext} from "../contexts/ContextProvider.jsx";

export const DefaultLayout = () => {

  const {user, token} = useStateContext();

  if(!token){
    return <Navigate to="/login"/>
  }

  return (
    <>
      <div>
        <h1>Default Layout</h1>
        <Outlet/>
      </div>
    </>
  )
}
