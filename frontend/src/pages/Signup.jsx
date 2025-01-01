import {Link} from "react-router-dom";
import {useRef} from "react";
import axiosClient from "../utils/axios-client.js";
import {useStateContext} from "../contexts/ContextProvider.jsx";

export const Signup = () => {

  const name = useRef();
  const email = useRef();
  const password = useRef();
  const passwordConfirmation = useRef();

  const {setUser, setToken} = useStateContext()

  const onSubmit = (e) => {
    e.preventDefault();

    const payload = {
      name: name.current.value,
      email: email.current.value,
      password: password.current.value,
      password_confirmation: passwordConfirmation.current.value
    }

    axiosClient.post('/signup', payload)
      .then(({data}) => {
        setUser(data.user);
        setToken(data.token);
    }).catch(err => {
      const response = err.response;
      if(response && response.status === 422){
        const errors = response.data.errors;
        console.log('Validation Errors', errors);
      }
    });

    console.log('PAYLOAD', payload);
  }

  return (
    <>
      <div className="login-signup-form animated fadeInDown">
        <div className="form">

          <h1 className="title">Signup</h1>
          <form onSubmit={onSubmit}>
            <div className="form-group">
              <label htmlFor="email">Name</label>
              <input ref={name} type="text" id="name" name="name" placeholder="Name"/>
            </div>
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
                ref={password}
                type="password"
                id="password"
                name="password"
                placeholder="Password"
              />
            </div>
            <div className="form-group">
              <label htmlFor="password-confirmation">
                Password Confirmation
              </label>
              <input
                ref={passwordConfirmation}
                type="password"
                id="password-confirmation"
                name="password-confirmation"
                placeholder="Password Confirmatin"
              />
            </div>
            <div className="form-group">
              <button type="submit" className="btn btn-block">Sign up</button>
            </div>
            <p className="message">
              Already Registered? <Link to="/login">Login</Link>
            </p>
          </form>

        </div>
      </div>
    </>
  )
}
