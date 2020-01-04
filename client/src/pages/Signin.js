import React from "react";
import { Link } from "react-router-dom";
import { Redirect } from "react-router";

import apiConfig from "../api/apiConfig";
import Input from "./components/formInput";

const _ = require("lodash");

class Signin extends React.Component {
  state = {
    email: "",
    password: "",
    logged: false,
    errorApiMsg: ""
  };

  updateForm = (name, value) => {
    this.setState({ [name]: value });
  };

  onFormSubmit = async event => {
    event.preventDefault();

    await apiConfig
      .post("/auth", _.pick(this.state, ["email", "password"]))
      .then(res => {
        localStorage.setItem("token", res.data.token);
        this.setState({ logged: true });
      })
      .catch(err => {
        let errorApiMsg = this.state.errorApiMsg;
        errorApiMsg = err.response.data;
        this.setState({ errorApiMsg });
      });
  };

  render() {
    if (this.state.logged === true || localStorage.getItem("token"))
      return <Redirect to="/welcomepage" />;
    return (
      <div className="signin ui middle aligned center aligned grid">
        <div className="twelve wide mobile eight wide tablet five wide computer column">
          <h2 className="ui blue header">
            <div className="content">Log-in to your account</div>
          </h2>
          <form onSubmit={this.onFormSubmit} className="ui large form">
            <div className="ui stacked segment">
              <Input
                name={"email"}
                type={"text"}
                placeholder={"E-mail address"}
                updateForm={this.updateForm}
              />
              <Input
                name={"password"}
                type={"password"}
                placeholder={"Password"}
                updateForm={this.updateForm}
              />
              <button className="ui fluid large blue button">Login</button>
            </div>
            {this.state.errorApiMsg && (
              <div className="ui negative message">
                {this.state.errorApiMsg}
              </div>
            )}
          </form>
          <div className="ui message">
            New to us?
            <Link to="/signup"> Register</Link>
          </div>
        </div>
      </div>
    );
  }
}

export default Signin;
