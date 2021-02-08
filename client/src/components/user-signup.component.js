import React, { Component } from "react";
import UserDataService from "../services/user.service";

export default class UserLogin extends Component {
  constructor(props) {
    super(props);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangeName = this.onChangeName.bind(this);
    this.signup = this.signup.bind(this);

    this.state = {
        name: "",
        email: "",
    };
  }

    onChangeName(e) {
        let name = e.target.value;
        this.setState({
            name: name
        });
    }

    onChangeEmail(e) {
      let email = e.target.value;
      this.setState({
        email: email
      });

    }
    signup() {
        let data = {
            name:this.state.name,
            email:this.state.email            
        };
        UserDataService.createUser(data)
          .then(response => {
            console.log(response);
            alert("Verification Link is sent to your email-id, please verify your email")
            this.props.history.push('/login')
          })
          .catch(e => {
            console.log(e);
          });
    }

  render() {
    const { name, email } = this.state;
    return (
      <div>
          <div className="edit-form">
            <h4>Sign up for an account</h4>
            <form>
            <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  value={name}
                  onChange={this.onChangeName}
                />
              </div>
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
              
            </form>
            <button onClick={this.signup} className="btn btn-success">
              Sign up
            </button>
          </div>
        </div>
    );
  }
}