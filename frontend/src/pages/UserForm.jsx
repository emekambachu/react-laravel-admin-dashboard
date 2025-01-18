import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axiosClient from "../utils/axios-client.js";

export default function UserForm(){

  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [user, setUser] = useState({
    id: null,
    name: '',
    email: '',
    password: '',
    password_confirmation: ''
  });

  if(id){
    useEffect(() => {

      setLoading(true);

      axiosClient.get(`/users/${id}`)
        .then(({data}) => {
          setUser(data.data);
        }).catch(err => {
          console.log(err);
        });

      setLoading(false);

    }, []);
  }

  const onSubmit = (e) => {
    e.preventDefault();

    setErrors(null);
    setLoading(true);
    setSubmitted(false);

    if(user.id){
      axiosClient.put(`/users/${user.id}`, user)
        .then(({data}) => {

          setUser(data);
          setLoading(false);
          setSubmitted(true);
          // navigate('/users');
        }).catch(err => {

          console.log(err.response.data.errors);
          const response = err.response;
          if(response && response.status === 422){
            setErrors(response.data.errors);
          }

          setLoading(false);
        });

    }else{

      axiosClient.post('/users', user)
        .then(({data}) => {

          setUser(data);
          setLoading(false);
          setSubmitted(true);

        }).catch(err => {

          console.log(err.response.data.errors);
          const response = err.response;
          if(response && response.status === 422){
            setErrors(response.data.errors);
          }

          setLoading(false);
      });

    }


  }

  return (
    <>
      <div>

        <div>
          <button className="btn" onClick={() => navigate('/users')}>Back</button>
        </div>

        {
          user.id ? <h1>Edit User: {user.name}</h1> : <h1>Create User</h1>
        }
        <div className="card animated fadeInDown">

          {
            loading && (<div className="text-center">Loading...</div>)
          }

          {
            errors && (
              <div className="alert alert-danger">
                <ul>
                  {
                    Object.keys(errors).map((key) => (
                      <li key={key}>{errors[key][0]}</li>
                    ))
                  }
                </ul>
              </div>
            )
          }

          {
            submitted && (
              <div className="alert-success text-center">User saved successfully.</div>
            )
          }

          <form onSubmit={onSubmit}>
            <div>
              <label htmlFor="name">Name</label>
              <input
                type="text" id="name" name="name"
                value={user.name}
                onChange={(e) => setUser({...user, name: e.target.value})}
              />
            </div>
            <div>
              <label htmlFor="email">Email</label>
              <input
                type="email" id="email" name="email"
                value={user.email}
                onChange={(e) => setUser({...user, email: e.target.value})}
              />
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <input
                type="password" id="password" name="password"
                onChange={(e) => setUser({...user, password: e.target.value})}
              />
            </div>
            <div>
              <label htmlFor="password_confirmation">Password Confirmation</label>
              <input
                type="password" id="password_confirmation" name="password_confirmation"
                onChange={(e) => setUser({...user, password_confirmation: e.target.value})}
              />
            </div>
            <div>
              <button className="btn" type="submit">Submit</button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
