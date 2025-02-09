import {Link, Navigate, Outlet} from "react-router-dom";
import {useStateContext} from "../contexts/ContextProvider.jsx";
import {useEffect} from "react";
import axiosClient from "../utils/axios-client.js";

export const DefaultLayout = () => {

  const {user, token, setUser, setToken, notification} = useStateContext();

  if(!token){
    return <Navigate to="/login"/>
  }

  const onLogout = (e) => {
    e.preventDefault();

    axiosClient.post('/logout')
      .then(() => {
         setUser({});
         setToken(null);
         setToken(null);
      }).catch(err => {
         console.log(err);
      });
  }

  useEffect(() => {
    axiosClient.get('/user')
      .then(({data}) => {
        setUser(data);
      }).catch(err => {
        console.log(err);
      });
  }, []);

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

        {
          notification &&
          <div className="notification">
            {notification}
          </div>
        }

      </div>
    </>
  )
}
