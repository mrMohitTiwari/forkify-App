import { async } from "regenerator-runtime";
import { API_URL, RES_PER_PAGE, KEY } from "./config";
import { getJSON, sendJSON } from "./helper";
export const state = {
  recipe: {},
  search: { query: "", page: 1, results: [], resultsPerPage: RES_PER_PAGE },
  bookmarks: [],
};
// create recipe object
const createRecipeObject = function (data) {
  const { recipe } = data.data;

  return {
    id: recipe.id,
    title: recipe.title,
    publisher: recipe.publisher,
    image: recipe.image_url,
    servings: recipe.servings,
    cookingTime: recipe.cooking_time,
    ingredients: recipe.ingredients,
    sourceUrl: recipe.source_url,
    // if key is present we can destrucure it here
    ...(recipe.key && { key: recipe.key }),
  };
};

// creating a function which will fetch the recipe for our users
export const loadRecipe = async function (id) {
  try {
    const data = await getJSON(`${API_URL}${id}?key=${KEY}`);
    state.recipe = createRecipeObject(data);

    // making api coming recipe bookmarks true on the basis of we have already bookmarks

    if (state.bookmarks.some((bookmark) => bookmark.id === id))
      state.recipe.bookmarked = true;
    else state.recipe.bookmarked = false;
    //  (state.recipe);
  } catch (error) {
    // temp error handling
    console.error(`${error}🎆🎆`);
    throw error;
  }
};
// creaitng a function for search result on the basis of query
export const loadSearchResults = async function (query) {
  try {
    state.search.query = query;
    const data = await getJSON(`${API_URL}?search=${query}&key=${KEY}`);
    // console.log(data);
    state.search.results = data.data.recipes.map((rec) => {
      return {
        id: rec.id,
        title: rec.title,
        publisher: rec.publisher,
        image: rec.image_url,
        // ...(recipe.key && { key: recipe.key }),
      };
      // updating the page for resetting pagination
      state.search.page = 1;
    });
    // console.log(state.search.results);
  } catch (error) {
    console.error(`${error}🎆🎆`);
    throw error;
  }
};
// now we will change the api url in our configuration file
// loadSearchResults("pizza");
// creating a function to load recipe results only 10 at a time
export const getSearchResultPage = function (page = state.search.page) {
  state.search.page = page;
  const start = (page - 1) * state.search.resultsPerPage; //0
  const end = page * state.search.resultsPerPage; //10 will not inckude in slice
  return state.search.results.slice(start, end);
};
export const updateServings = function (newServings) {
  // this function will reach in the state and change the quantitiy of each ingrident
  state.recipe.ingredients.forEach(
    (ing) =>
      (ing.quantity = (ing.quantity * newServings) / state.recipe.servings)
    // new qaunt = oldquant*new servings /old servings  2*8/4=4
  );
  // updating the servings in state
  state.recipe.servings = newServings;
};
// making a local storage for bookmarks which can presisits data whenever we are adding and remoing a bookmark
const presisitsBookmark = function () {
  localStorage.setItem("bookmarks", JSON.stringify(state.bookmarks));
  // now we have to call this function in both the places
};
// adding a bookmark
export const addbookmark = function (recipe) {
  // add new recipe to bookmark
  state.bookmarks.push(recipe);
  //mark current recipe as bookmark
  if (recipe.id === state.recipe.id) state.recipe.bookmarked = true;
  presisitsBookmark();
};
// method for deleting the bookmarks
// when we add something we get all the data but when we delete something we only get the id

export const deleteBookmark = function (id) {
  const index = state.bookmarks.indexOf((el) => el.id === id);
  state.bookmarks.splice(index, 1);
  // marking that recipe as unbookmarks
  if (id === state.recipe.id) state.recipe.bookmarked = false;
  presisitsBookmark();
};
const init = function () {
  const storage = localStorage.getItem("bookmarks");
  if (storage) state.bookmarks = JSON.parse(storage); //it will make string to object
};
init();
export const uploadRecipe = async function (newRecipe) {
  // now we will again convert our object to array using Object.entries method and then filter it to make ingridents array then we will map on the ingridents to make the quantites as an object

  try {
    const ingredients = Object.entries(newRecipe)
      .filter((entry) => entry[0].startsWith("ingredient") && entry[1] != "")
      .map((ing) => {
        const ingArr = ing[1].replaceAll(" ", "").split(",");
        if (ingArr.length != 3)
          throw new Error(
            "Wrong  ingredients format!Please use the correct format "
          );
        const [quantity, unit, description] = ingArr;
        return { quantity: quantity ? +quantity : null, unit, description };
      });
    console.log(ingredients);
    // now creating the recipe object with this data
    const recipe = {
      title: newRecipe.title,
      source_url: newRecipe.sourceUrl,
      image_url: newRecipe.image,
      publisher: newRecipe.publisher,
      cooking_time: +newRecipe.cookingTime,
      servings: +newRecipe.servings,
      ingredients,
    };
    console.log(recipe);
    const data = await sendJSON(`${API_URL}?key=${KEY}`, recipe);
    console.log(data);
    // now we will sotre this data into recipe state
    state.recipe = createRecipeObject(data);
    addbookmark(state.recipe);
  } catch (err) {
    throw err;
  }
};
// api key f14c0b94-84bb-4644-8573-dbbc41624448
