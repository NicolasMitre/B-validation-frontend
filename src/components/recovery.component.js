import React, { Component } from "react";
import { sendMail, passwordRecovered } from "../services/calls";

class Recovery extends Component {
  onSubmit = async e => {
    e.preventDefault();

    const username = e.target.username.value;
    sendMail(username);
  };
  onReset = async e => {
    e.preventDefault();

    const token = e.target.token.value;
    const email = e.target.email.value;
    const newpassword = e.target.password.value;
    const text = document.querySelector(".textValidated");
    const results = await passwordRecovered(email, newpassword, token)
      .then(data => data.json())
      .then(result => result);

    if (results && results.length > 0) {
      text.innerHTML = `¡Todo salió bien! Tu nueva contraseña es: ${results} recuerda nunca compartirla con nadie.`;
    } else {
      text.innerHTML = "Algo salío mal por favor vuelta a intentarlo";
    }
  };
  render() {
    return (
      <>
        <form onSubmit={this.onSubmit}>
          <h3> Recovery your password </h3>

          <div className="form-group">
            <label>Email address to send your token for validation</label>
            <input
              type="email"
              name="username"
              className="form-control"
              placeholder="Enter email"
              required
            />
          </div>

          <button type="submit" className="btn btn-primary btn-block">
            Submit
          </button>
        </form>
        <form onSubmit={this.onReset}>
          <h3> Insert your data </h3>
          <div className="form-group">
            <label>Your email address</label>
            <input
              type="email"
              name="email"
              className="form-control"
              placeholder="Enter email"
              required
            />
          </div>
          <div className="form-group">
            <label> Your new password </label>
            <input
              type="password"
              name="password"
              className="form-control"
              placeholder="Enter password"
              required
            />
          </div>
          <div className="form-group">
            <label> The token sended by email</label>
            <input
              type="text"
              name="token"
              className="form-control"
              placeholder="Enter token"
              required
            />
          </div>

          <button type="submit" className="btn btn-primary btn-block">
            Validate
          </button>
        </form>
        <div>
          <p className="textValidated"> </p>
        </div>
      </>
    );
  }
}

export default Recovery;
