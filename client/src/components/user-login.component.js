import React, { Component } from "react";
import UserDataService from "../services/user.service";

export default class UserLogin extends Component {
  constructor(props) {
    super(props);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.login = this.login.bind(this);

    this.state = {
        email: "",
        password: "",
    };
  }

    onChangePassword(e) {
        let password = e.target.value;
        this.setState({
            password: password
        });
    }

    onChangeEmail(e) {
      let email = e.target.value;
      this.setState({
        email: email
      });

    }
    login() {
        let data = {
            email:this.state.email,
            password:this.state.password
        };
        UserDataService.userLogin(data)
          .then(response => {
            console.log(response);
            this.props.history.push('/items')
          })
          .catch(e => {
            console.log(e);
          });
    }

  render() {
    const { password, email } = this.state;
    return (
      <div>
          <div className="edit-form">
            <h4>Login to your account</h4>
            <form>
              <div className="form-group">
                <label htmlFor="password">Email</label>
                <input
                  type="text"
                  className="form-control"
                  id="email"
                  value={email}
                  onChange={this.onChangeEmail}
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  value={password}
                  onChange={this.onChangePassword}
                />
              </div>
            </form>
            <button onClick={this.login} className="btn btn-success">
              Login
            </button>
          </div>
        </div>
    );
  }
}