const { query } = require("../index.js"); // allows us to query the database. the log in info for the database etc is in index.js
const fs = require("fs");
const { promisify } = require("util"); // takes the promisify method out of util
const readFile = promisify(fs.readFile); // fs.readFile doesn't return a promise. But here we hand fs.readFile to promisify, so that it will now return a promise. So now we can use async await.

// define a function that uploads a single pokemon to the DB, then change it so that it uploads a pokemon at position [i]
async function uploadPoke() {
  const data = await readFile("pokedex.json"); // grabs / reads the pokedex file
  const pokemon = JSON.parse(data); // translates it from a JSON to readable JS
  // console.log(pokemon[0]); // to test. should console.log the pokemon at index position 0 ie the first pokemon

  for (let i = 0; i < pokemon.length; i++) {
    //use for loop to loop through all pokemon
    try {
      const {
        pkdx_id,
        name,
        description,
        img_url,
        types,
        evolutions
      } = pokemon[i]; // destructure the values out of pokemon[0] so we can refer to them below
      const res = await query(
        //res is the repsonse from the database
        ` 
              INSERT INTO pokemon(
                  pkdx_id,
                  name,
                  description,
                  img_url,
                  types,
                  evolutions
              ) VALUES($1, $2, $3, $4, $5, $6)`,
        [pkdx_id, name, description, img_url, types, evolutions] // these params are taken (destructured) from pokemon[0]
      );

      console.log(name);
    } catch (err) {
      console.log(err);
    }
  }
}

uploadPoke();
