import React, { Component } from "react";
import { registerUser } from "../services/calls";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

class SignUp extends Component {
  onSubmit = async e => {
    e.preventDefault();

    // const username = `${e.target.firstname.value} ${e.target.lastname.value}`;
    const password = e.target.password.value;
    const email = e.target.email.value;

    const user = await registerUser(email, password)
      .then(res => res.json())
      .then(data => data);
    if (user) {
      this.props.dispatch({ type: "redirect" });
    } else {
      alert("Username or Password wrongs please complete the form again.");
    }
  };
  render() {
    if (this.props.redir) {
      return <Redirect to={"/login"} />;
    }
    return (
      <form onSubmit={this.onSubmit}>
        <h3>Sign Up</h3>

        <div className="form-group">
          <label>First name</label>
          <input
            type="text"
            name="firstname"
            className="form-control"
            placeholder="First name"
          />
        </div>

        <div className="form-group">
          <label>Last name</label>
          <input
            type="text"
            name="lastname"
            className="form-control"
            placeholder="Last name"
          />
        </div>

        <div className="form-group">
          <label>Email address</label>
          <input
            type="email"
            name="email"
            className="form-control"
            placeholder="Enter email"
          />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            className="form-control"
            placeholder="Enter password"
          />
        </div>

        <button type="submit" className="btn btn-primary btn-block">
          Sign Up
        </button>
        <p className="forgot-password text-right">
          Already registered
          {/* <a href="#">sign in?</a> */}
        </p>
      </form>
    );
  }
}

function mapStateToProps(state) {
  return {
    redir: state.redir
  };
}

export default connect(mapStateToProps)(SignUp);
