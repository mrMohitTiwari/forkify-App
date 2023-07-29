import { async } from "regenerator-runtime";
import * as model from "./model.js";
import recipeView from "./views/recipeView.js";
import searchView from "./views/searchView.js";
import resultsView from "./views/resultsView.js";
import paginationView from "./views/paginationView.js";
import bookmarkVIew from "./views/bookmarkVIew.js";
import addRecipeView from "./views/addRecipeView.js";
import { MODEL_CLOSE_SECONDS } from "./config.js";
// import icons from "url:../img/icons.svg";

// console.log(icons);//will give the link to local host of dst folder generated by parcel
import "core-js/stable"; //it is for polyfilling for all the code exceot async and await
import "regenerator-runtime/runtime"; //it is for polyfilling async and await
import { Set } from "core-js";
import { MODEL_CLOSE_SECONDS } from "./config.js";

// };
// if (module.hot) {
//   module.hot.accept();
// }

const handleRecipe = async function () {
  // 1.loading the recipe
  // console.log(window.location);

  try {
    const id = window.location.hash
      ? window.location.hash.slice(1)
      : "5ed6604591c37cdc054bcb34";
    // console.log(id);
    if (!id) return;
    recipeView.renderSpinner();
    // updating the result view when clicked
    await model.loadRecipe(id); //it will pass id to model then model will fetch it and then the data recived from that id will be get saved in state object of state.recipe
    recipeView.render(model.state.recipe);

    // console.log(model.state.recipe);
  } catch (err) {
    console.log(err);
    recipeView.renderError();
  }
  resultsView.update(model.getSearchResultPage());
  bookmarkVIew.update(model.state.bookmarks);
};

const controlSearchResults = async function () {
  try {
    //loading the spinner
    // getting search query
    const query = searchView.getQuery();
    console.log(query);
    if (!query) return;
    resultsView.renderSpinner();
    // load search results
    await model.loadSearchResults(query);
    // rendring data
    // resultsView.render(model.state.search.results);
    resultsView.render(model.getSearchResultPage());

    // render initial pagination buttons
    paginationView.render(model.state.search);
  } catch (error) {
    console.log(error);
  }
};
// controlSearchResults();
const controlPagination = function (goto) {
  // render new results
  resultsView.render(model.getSearchResultPage(goto));
  // render new pagination buttons
  paginationView.render(model.state.search);
};

// controller for controlling the servings
const controlServings = function (newServings) {
  // upade the recipe servings (in model state  )
  model.updateServings(newServings);
  // update the recipe view as well
  // recipeView.render(model.state.recipe);
  recipeView.update(model.state.recipe);
};
// controler for adding a new bookmark
const controlAddBookmark = function () {
  // we only want recipe to get bookmarked if it is not already bookmarked
  // 1.Add a new bookmark
  if (!model.state.recipe.bookmarked) {
    model.addbookmark(model.state.recipe);
    console.log(model.state.recipe.bookmarked);
  } else model.deleteBookmark(model.state.recipe.id);
  // renrendring the updated part
  recipeView.update(model.state.recipe);
  // render bookmark
  bookmarkVIew.render(model.state.bookmarks);
};
// function for loading bookmarks at the begining of page load
const controlBookMarks = function () {
  bookmarkVIew.render(model.state.bookmarks);
  // console.log(model.state.bookmarks);
};
const controlAddRecipe = async function (newRecipe) {
  console.log(newRecipe);
  try {
    // loading spinner
    addRecipeView.renderSpinner();
    // upload the new recipe
    await model.uploadRecipe(newRecipe);
  } catch (err) {
    addRecipeView.renderError(err.message);
  }
  // render recipe
  recipeView.render(model.state.recipe);
  // rendering a sucees message
  addRecipeView.renderMessage();
  // render bookmarks
  bookmarkVIew.render(model.state.bookmarks);
  // changing id in url
  window.history.pushState(null, "", `#${model.state.recipe.id}`);
  // close form window
  setTimeout(() => {
    addRecipeView._toggleWindow();
  }, MODEL_CLOSE_SECONDS);
};

const init = function () {
  bookmarkVIew.addHandlerRender(controlBookMarks);
  recipeView.addHandlerRender(handleRecipe);
  searchView.addHandlerSerach(controlSearchResults);
  paginationView.addHaandlerClick(controlPagination);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerBookmark(controlAddBookmark);
  addRecipeView._addHandlerUpload(controlAddRecipe);
};
init();
