import {useEffect, useState} from "react";
import axiosClient from "../utils/axios-client.js";

export const Users = () => {

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {

    getUsers();

  }, []);

  const getUsers = () => {

    setLoading(true);

    axiosClient.get('/users')
      .then(({data}) => {
        setUsers(data);
      }).catch(err => {
      console.log(err);
    });

    setLoading(false);
  }

    return (
        <>
          <div>
            <h1>Users</h1>
          </div>
        </>
    )
}
