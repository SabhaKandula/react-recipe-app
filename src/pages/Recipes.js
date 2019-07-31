import React, { Component } from "react";
import RecipeList from "../components/RecipeList";
import Search from "../components/Search";
import { recipeData } from "../data/tempList";
export default class Recipes extends Component {
  constructor(props) {
    super(props);
    this.getRecipes = this.getRecipes.bind(this);
  }
  state = {
    recipes: recipeData,
    search: "",
    url: `https://www.food2fork.com/api/search?key=${
      process.env.REACT_APP_API_KEY
    }`,
    baseUrl: `https://www.food2fork.com/api/search?key=${
      process.env.REACT_APP_API_KEY
    }`,
    query: "&q=",
    error: ""
  };
  async getRecipes() {
    try {
      const data = await fetch(this.state.url);
      const jsonData = await data.json();
      if (jsonData.recipes.length === 0) {
        this.setState({
          error:
            "sorry but your search didnot return any recipes. Please try again or press search icon for most popular recipes"
        });
      } else {
        this.setState({
          recipes: jsonData.recipes,
          error: ""
        });
      }
    } catch (error) {
      console.log(error);
    }
  }
  componentDidMount() {
    this.getRecipes();
  }
  handleChange = e => {
    this.setState({
      search: e.target.value
    });
  };
  handleSubmit = e => {
    e.preventDefault();
    const { baseUrl, query, search } = this.state;
    this.setState(
      {
        url: `${baseUrl}${query}${search}`,
        search: ""
      },
      () => this.getRecipes() //Call back after setting state with parameters
    );
  };
  render() {
    return (
      <>
        <Search
          search={this.state.search}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
        />
        {this.state.error ? (
          <section>
            <div className="row">
              <div className="col">
                <h2 className="text-orange text-uppercase text-center mt-5">
                  {this.state.error}
                </h2>
              </div>
            </div>
          </section>
        ) : (
          <RecipeList recipes={this.state.recipes} />
        )}
      </>
    );
  }
}
