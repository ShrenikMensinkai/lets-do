import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AddItem from "./components/add-item.component";
import Item from "./components/item.component";
import ItemList from "./components/item-list.component";
import UserRegistration from "./components/user-registration.component";
import UserLogin from "./components/user-login.component";
import UserSignup from "./components/user-signup.component";

class App extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <a href="/items" className="navbar-brand">
            TODO
          </a>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/items"} className="nav-link">
                List Items
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/add"} className="nav-link">
                Add Item
              </Link>
            </li>
          </div>
        </nav>

        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/items"]} component={ItemList} />
            <Route exact path="/add" component={AddItem} />
            <Route path="/item/:id" component={Item} />
            <Route path="/userregistration/:invite_id" component={ UserRegistration } />
            <Route path="/login" component={UserLogin} />
            <Route path="/signup" component={UserSignup} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;