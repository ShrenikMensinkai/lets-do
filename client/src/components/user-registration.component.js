import React, { Component } from "react";
import UserDataService from "../services/user.service";

export default class UserRegistration extends Component {
  constructor(props) {
    super(props);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangeRePassword = this.onChangeRePassword.bind(this);
    this.registerAccount = this.registerAccount.bind(this);

    this.state = {
        invite_id: this.props.match.params.invite_id,
        password: "",
        re_password: "",
    };
  }

    onChangePassword(e) {
        let password = e.target.value;
        this.setState({
            password: password
        });
    }

    onChangeRePassword(e) {
      let re_password = e.target.value;
      this.setState({
        re_password: re_password
      });

    }
    registerAccount() {
      if(this.state.password === this.state.re_password){
        let data = {
          invite_id:this.state.invite_id,
          password:this.state.password
        };
        UserDataService.userRegistration(data)
          .then(response => {
            console.log(response);
            alert("You've successfully registered, please login with new credientials")
            this.props.history.push('/login')
          })
          .catch(e => {
            console.log(e);
          });
      } else {
        alert("Password and confirm password should match");
      }      
    }

  render() {
    const { password, re_password } = this.state;
    return (
      <div>
          <div className="edit-form">
            <h4>Please set password and register account</h4>
            <form>
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
              <div className="form-group">
                <label htmlFor="repassword">Confirm Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="repassword"
                  value={re_password}
                  onChange={this.onChangeRePassword}
                />
              </div>
            </form>
            <button onClick={this.registerAccount} className="btn btn-success">
              Register
            </button>
          </div>
        </div>
    );
  }
}