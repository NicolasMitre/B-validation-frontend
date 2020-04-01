import React, { Component } from "react";
import { loginUser } from "../services/calls";
import { connect } from "react-redux";
import { Redirect, Link } from "react-router-dom";

class Login extends Component {
  onSubmit = async e => {
    e.preventDefault();

    const username = e.target.username.value;
    const password = e.target.password.value;

    const token = await loginUser(username, password)
      .then(res => res.json())
      .then(data => data.access_token);
    if (token) {
      this.props.dispatch({ type: true, token: token });
    } else {
      alert("Username or Password wrongs please complete the form again.");
    }
  };
  render() {
    if (this.props.auth) {
      return <Redirect to={"/user"} />;
    }
    return (
      <form onSubmit={this.onSubmit}>
        <h3> Login </h3>

        <div className="form-group">
          <label>Email address</label>
          <input
            type="email"
            name="username"
            className="form-control"
            placeholder="Enter email"
            required
          />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            className="form-control"
            placeholder="Enter password"
            required
          />
        </div>

        {/*  <div className="form-group">
          <div className="custom-control custom-checkbox">
            <input
              type="checkbox"
              className="custom-control-input"
              id="customCheck1"
            />
            <label className="custom-control-label" htmlFor="customCheck1">
              Remember me
            </label>
          </div>
        </div> */}

        <button type="submit" className="btn btn-primary btn-block">
          Submit
        </button>
        <p className="forgot-password text-right">
          Forgot{" "}
          <Link className="navbar-brand" to={"/recovery-password"}>
            password?
          </Link>
        </p>
      </form>
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth
  };
}

export default connect(mapStateToProps)(Login);
