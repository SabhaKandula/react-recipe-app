import React, { Component } from "react";
import { recipeData } from "../data/tempDetails";
import { Link } from "react-router-dom";

export default class SingleRecipe extends Component {
  constructor(props) {
    super(props);
    const id = this.props.match.params.id;
    this.state = {
      recipe: recipeData,
      id,
      loading: false
    };
  }
  render() {
    const {
      image_url,
      publisher,
      publisher_url,
      source_url,
      title,
      ingredients
    } = this.state.recipe;
    if (this.state.loading) {
      return (
        <div className="container">
          <div className="row">
            <div className="col-10 mx-auto col-md-6 my-3">
              <h2 className="text-orange text-uppercase text-center">
                loading recipe...
              </h2>
            </div>
          </div>
        </div>
      );
    }
    return (
      <div className="container my-5">
        <div className="row">
          <div className="col-10 mx-auto col-md-6 my-3">
            <Link
              to={`/recipes`}
              className="btn btn-warning text-capitalize mb-5"
            >
              back to recipes list
            </Link>
            <img
              src={image_url}
              className="d-block w-100"
              style={{ maxHeight: "30rem" }}
              alt="recipe"
            />
          </div>
          <div className="col-10 mx-auto col-md-6 my-3">
            <h6 className="text-uppercase">{title}</h6>
            <h6 className="text-capitalize text-slanted text-warning">
              provided by {publisher}
            </h6>
            <a
              href={publisher_url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary mx-2 text-capitalize"
            >
              publisher webpage
            </a>
            <a
              href={source_url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-success mx-2 text-capitalize"
            >
              recipe url
            </a>
            <ul className="list-group mt-4">
              <h2 className="mt-3 mb-4">ingredients</h2>
              {ingredients.map((item, index) => {
                return (
                  <li key={index} className="text-slanted list-group-item">
                    {item}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}
