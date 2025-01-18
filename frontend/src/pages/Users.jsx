import {useEffect, useState} from "react";
import axiosClient from "../utils/axios-client.js";
import {Link} from "react-router-dom";

export const Users = () => {

  const [users, setUsers] = useState([]);
  const [paginateUsers, setPaginateUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = (page = null) => {

    setLoading(true);

    axiosClient.get('/users?page=' + page)
      .then(({data}) => {
        setUsers(data.data);
        setPaginateUsers(data.meta.links);
      }).catch(err => {
      console.log(err);
    });

    setLoading(false);
  }

    return (
        <>

          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
            <h1>Users</h1>
            <Link to="/users/create" className="btn-add">Add User</Link>
          </div>

          <div className="card animated fadeInDown">

            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Create Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
              {users && users.map(user => (
                <tr key={user.id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.created_at}</td>
                  <td>
                    <Link to={`/users/${user.id}`} className="btn-edit">Edit</Link>
                  </td>
                </tr>
              ))}
              </tbody>
            </table>

            <div className="card text-center">
              <ul className="pagination-list">
                {
                  paginateUsers?.map(link => (
                    <li key={link.label}>
                      {
                        link.label === '&laquo; Previous' ? (
                          <Link to="" className={`paginate-link ${link.active ? "paginate-link-active" : ""}`} onClick={() => getUsers(link.label)}>Previous</Link>
                        ) : link.label === 'Next &raquo;' ? (
                          <Link to="" className={`paginate-link ${link.active ? "paginate-link-active" : ""}`} onClick={() => getUsers(link.label)}>Next</Link>
                        ) : (
                          <Link to="" className={`paginate-link ${link.active ? "paginate-link-active" : ""}`} onClick={() => getUsers(link.label)}>{link.label}</Link>
                        )
                      }
                    </li>
                  ))
                }
              </ul>
            </div>
          </div>
        </>
    )
}
