import {Link, Navigate, Outlet} from "react-router-dom";
import {useStateContext} from "../contexts/ContextProvider.jsx";

export const DefaultLayout = () => {

  const {user, token} = useStateContext();

  if(!token){
    return <Navigate to="/login"/>
  }

  const onLogout = (e) => {
    e.preventDefault();
  }

  return (
    <>
      <div id="defaultLayout">

        <aside>
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/users">Users</Link>
        </aside>

        <div className="content">
          <header>
            <div>
              <h1>Default Layout</h1>
            </div>
            <div>
              <p>{user.name}</p>
              <a href="#" onClick={onLogout} className="btn-logout">Logout</a>
            </div>
          </header>

          <main>
            <Outlet/>
          </main>

        </div>
      </div>
    </>
  )
}
