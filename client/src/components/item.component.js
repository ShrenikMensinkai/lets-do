import React, { Component } from "react";
import ItemDataService from "../services/item.service";

export default class Item extends Component {
  constructor(props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.getItem = this.getItem.bind(this);
    this.onChangeStatus = this.onChangeStatus.bind(this);
    this.updateItem = this.updateItem.bind(this);
    this.deleteItem = this.deleteItem.bind(this);

    this.state = {
      currentItem: {
        id: "",
        title: "",
        is_done: false
      },
      message: ""
    };
  }

  componentDidMount() {
    this.getItem(this.props.match.params.id);
  }

  onChangeTitle(e) {
    const title = e.target.value;
    this.setState(function(prevState) {
      return {
        currentItem: {
          ...prevState.currentItem,
          title: title
        }
      };
    });
  }

  
  getItem(id) {
    ItemDataService.get(id)
      .then(response => {
        this.setState({
          currentItem: response.data.data
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  onChangeStatus(status) {
    let data = {
      is_done: status
    };
    ItemDataService.update(this.state.currentItem.id, data)
      .then(response => {
        this.setState(prevState => ({
          currentItem: {
            ...prevState.currentItem,
            is_done: status
          }
        }));
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updateItem() {
    let data = {
      title:this.state.currentItem.title
    };
    ItemDataService.update(
      this.state.currentItem.id,
      data
    ).then(response => {
        console.log(response.data);
        this.setState({
          message: "The item was updated successfully!"
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  deleteItem() {    
    ItemDataService.delete(this.state.currentItem.id)
      .then(response => {
        console.log(response.data);
        this.props.history.push('/items')
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { currentItem } = this.state;

    return (
      <div>
        {currentItem ? (
          <div className="edit-form">
            <h4>Item</h4>
            <form>
              <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  value={currentItem.title}
                  onChange={this.onChangeTitle}
                />
              </div>
              
              <div className="form-group">
                <label>
                  <strong>Status:</strong>
                </label>
                {currentItem.is_done ? "Done" : "Pending"}
              </div>
            </form>

            {currentItem.is_done ? (
              <button
                className="badge badge-primary mr-2"
                onClick={() => this.onChangeStatus(false)}
              >
                Mark as Pending
              </button>
            ) : (
              <button
                className="badge badge-primary mr-2"
                onClick={() => this.onChangeStatus(true)}
              >
                Mark as Done
              </button>
            )}

            <button
              className="badge badge-danger mr-2"
              onClick={this.deleteItem}
            >
              Delete
            </button>

            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updateItem}
            >
              Update
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on an Item</p>
          </div>
        )}
      </div>
    );
  }
}