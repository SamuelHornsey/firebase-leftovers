const functions = require("firebase-functions");
const fetch = require("node-fetch");

const admin = require('firebase-admin');
admin.initializeApp();

const URL = 'https://api.spoonacular.com/recipes';
const API_TOKEN = functions.config().prod.api_token;

exports.searchRecipes = functions.https.onCall(async (data, context) => {
  if (!context.auth) {
    return;
  }

  const { ingredients } = data;

  console.log(ingredients);

  const r = await fetch(`${URL}/findByIngredients?ingredients=${ingredients}&apiKey=${API_TOKEN}`);
  const json = await r.json()

  return json;
});

exports.getRecipeById = functions.https.onCall(async (data, context) => {
  if (!context.auth) {
    return;
  }

  const { id } = data;

  console.log(id);

  const r = await fetch(`${URL}/${id}/information?includeNutrition=false&apiKey=${API_TOKEN}`);
  const json = await r.json();

  return json;
});