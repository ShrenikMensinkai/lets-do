import React, { Component } from "react";
import ItemDataService from "../services/item.service";
import { Link } from "react-router-dom";

export default class ItemList extends Component {
  constructor(props) {
    super(props);
    this.retrieveItems = this.retrieveItems.bind(this);
    this.setActiveItem = this.setActiveItem.bind(this);
    
    this.state = {
      items: [],
      currentItem: null,
      currentIndex: -1,
    };
  }

  componentDidMount() {
    this.retrieveItems();
  }

  retrieveItems() {
    ItemDataService.getAll()
      .then(response => {
        this.setState({
          items: response.data.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  setActiveItem(item, index) {
    this.setState({
      currentItem: item,
      currentIndex: index
    });
  }
  render() {
    const { items, currentItem, currentIndex } = this.state;

    return (
      <div className="list row">
        <div className="col-md-6">
          <h4>Items</h4>

          <ul className="list-group">
            {items &&
              items.map((item, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveItem(item, index)}
                  key={index}
                >
                  {item.title}
                </li>
              ))}
          </ul>
        </div>
        <div className="col-md-6">
          {currentItem ? (
            <div>
              <h4>Item</h4>
              <div>
                <label>
                  <strong>Title:</strong>
                </label>{" "}
                {currentItem.title}
              </div>
              <div>
                <label>
                  <strong>Status:</strong>
                </label>{" "}
                {currentItem.is_done ? "Done" : "Pending"}
              </div>

              <Link
                to={"/item/" + currentItem._id}
                className="badge badge-warning"
              >
                Edit
              </Link>
            </div>
          ) : (
            <div>
              <br />
              <p>Please click on an Item to edit</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}