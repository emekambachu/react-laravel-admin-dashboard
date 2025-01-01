import {Link} from "react-router-dom";

export const Login = () => {

  const onSubmit = (e) => {
    e.preventDefault();
  }

    return (
        <>
          <div className="login-signup-form animated fadeInDown">

            <div className="form">
              <h1 className="text-center">Login</h1>
              <form onSubmit={onSubmit}>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input type="email" id="email" name="email" placeholder="Email"/>
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input type="password" id="password" name="password" placeholder="Password"/>
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
