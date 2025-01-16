import {Link} from "react-router-dom";
import {useRef, useState} from "react";
import {useStateContext} from "../contexts/ContextProvider.jsx";
import axiosClient from "../utils/axios-client.js";

export const Login = () => {

  const email = useRef();
  const password = useRef();

  const {setUser, setToken} = useStateContext();
  const [errors, setErrors] = useState(null);

  const onSubmit = (e) => {
    e.preventDefault();

    const payload = {
      email: email.current.value,
      password: password.current.value,
    }

    setErrors(null);

    axiosClient.post('/login', payload)
      .then(({data}) => {
        setUser(data.user);
        setToken(data.token);
      }).catch(err => {

        const response = err.response;

        if(response && response.status === 422){

          if(response.data.errors){
            const errors = response.data.errors;
            console.log('Validation Errors', errors);
            setErrors(errors);

          }else{

            setErrors({
              email: ['Invalid email or password']
            });
          }

        }

    });

    console.log('PAYLOAD', payload);
  }

    return (
        <>
          <div className="login-signup-form animated fadeInDown">
            <div className="form">

              <h1 className="title">Login</h1>

              {
                errors && <div className="alert alert-danger">
                  {Object.keys(errors).map(key => (
                    <p key={key}>{errors[key][0]}</p>
                  ))}
                </div>
              }

              <form onSubmit={onSubmit}>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    ref={email}
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Email"
                  />

                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Password"
                    ref={password}
                  />

                </div>

                <div className="form-group">
                  <button type="submit" className="btn btn-block">Login</button>
                </div>

                <p className="message">
                  Not Registered? <Link to="/signup">Create an account</Link>
                </p>

              </form>

            </div>
          </div>
        </>
    )
}
