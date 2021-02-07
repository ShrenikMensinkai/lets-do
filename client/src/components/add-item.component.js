import React, { Component } from "react";
import ItemDataService from "../services/item.service";

export default class Test extends Component {
  constructor(props) {
    super(props);
    this.onChangeItem = this.onChangeItem.bind(this);
    this.saveItem = this.saveItem.bind(this);
    this.newItem = this.newItem.bind(this);

    this.state = {
      id: null,
      title: "",
      submitted: false
    };
  }

  onChangeItem(e) {
    this.setState({
      title: e.target.value
    });
  }

  saveItem() {
    let data = {
      title: this.state.title,
    };
    ItemDataService.create(data)
      .then(response => {
        this.setState({
          id: response.data.item_id,
          title: response.data.title,
          published: response.data.published,
          submitted: true
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  newItem() {
    this.setState({
      id: null,
      title: "",
      submitted: false
    });
  }

  render() {
    return (
      <div className="submit-form">
        {this.state.submitted ? (
          <div>
            <h4>Item added successfully!</h4>
            <button className="btn btn-success" onClick={this.newItem}>
              Add new
            </button>
          </div>
        ) : (
          <div>
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                className="form-control"
                id="title"
                required
                value={this.state.title}
                onChange={this.onChangeItem}
                name="title"
              />
            </div>
            <button onClick={this.saveItem} className="btn btn-success">
              Submit
            </button>
          </div>
        )}
      </div>
    );
  }
}