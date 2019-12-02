import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom';
import Navbar from './Navbar'
import Home from './Home'
import RecipePage from './RecipePage'
import Login from './Login'
import User from './User'
import { slugify } from '../helpers'
import recipes from '../sample_data/recipes.json'
import { withRouter, matchPath } from "react-router";

const HomeRoute = ({ match, recipes, searchString }) => (

  <Home
    recipes={recipes}
    searchString={searchString}
  />

)

const LoginRoute = (props) => <Login {...props} />

const ProfileRoute = (props) => <User  {...props} />



class App extends Component {

  handlerChange = e => {
    this.props.history.push(e.target.value)
  }

  pathUrl = () => {
    const match = matchPath(this.props.location.pathname, {
      path: "/:id",
      exact: true
    });

    return match ? match.params.id : ''
  }



  render() {

    const searchString = this.pathUrl()

    return (
      <div className="App">
        <Navbar
          onChange={this.handlerChange}
          searchString={searchString}
        />

        <div className="container mt-10">
          <Switch>

            <Route path="/user/login" exact component={LoginRoute} />
            <Route path="/user/profile" component={ProfileRoute} />

            <Route exact path="/" component={(props) =>
              <HomeRoute {...props} recipes={recipes.results} searchString={searchString} />} />

            <Route path="/recipe/:recipe" component={props => {
              const recipeFiltered = recipes.results.find(
                recipe => slugify(recipe.title) === props.match.params.recipe
              );

              return <RecipePage recipe={recipeFiltered} />;
            }}
            />

            <Route path="/:searchString" render={(props) =>
              <Home recipes={recipes.results} searchString={searchString} />} />



          </Switch>
        </div>
      </div>
    )
  }
}

export default withRouter(App)
