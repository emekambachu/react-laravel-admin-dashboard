import {Link} from "react-router-dom";

export const Signup = () => {

  const onSubmit = (e) => {
    e.preventDefault();
  }

  return (
    <>
      <div className="login-signup-form animated fadeInDown">
        <div className="form">

          <h1 className="title">Signup</h1>
          <form onSubmit={onSubmit}>
            <div className="form-group">
              <label htmlFor="email">Name</label>
              <input type="text" id="name" name="name" placeholder="Name"/>
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" name="email" placeholder="Email"/>
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input type="password" id="password" name="password" placeholder="Password"/>
            </div>
            <div className="form-group">
              <label htmlFor="password-confirmation">Password Confirmation</label>
              <input type="password" id="password-confirmation" name="password-confirmation"
                     placeholder="Password Confirmatin"/>
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
