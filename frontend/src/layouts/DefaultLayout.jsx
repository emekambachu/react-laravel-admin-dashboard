import {Outlet} from "react-router-dom";

export const DefaultLayout = () => {
  return (
    <>
      <div>
        <h1>Default Layout</h1>
        <Outlet/>
      </div>
    </>
  )
}
