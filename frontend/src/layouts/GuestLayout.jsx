import {Outlet} from "react-router-dom";

export const GuestLayout = () => {
  return (
    <>
      <div>
        <h1>Guest Layout</h1>
        <Outlet />
      </div>
    </>
  )
}
