import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

function mapStateToProps(state) {
  return {
    auth: state.auth,
    token: state.token
  };
}
class User extends Component {
  render() {
    if (!this.props.auth) {
      return <Redirect to={"/"} />;
    }
    return <p> {this.props.token} </p>;
  }
}

export default connect(mapStateToProps)(User);
