// ** GET RID OF DEPENDENCY ON FILE SYSTEM AND INSTEAD INTERACT WITH DATABASE

const { query } = require("../db/index.js");

async function getPokemon() {
  const data = await query(`SELECT * FROM pokemon`); // query parses data under the hood
  console.log(data);
  return data.rows; // data alone will send back all data. to access info only about the pokemon, do data.rows
}

// make a functon that will get a specific pokemon by its id
async function getPokemonById(id) {
  const pokemon = await query(`SELECT * FROM pokemon WHERE pkdx_id=$1`, [id]);
  return pokemon.rows[0]; // will return one pokemon
}

// write a function to getPokemonByName
async function getPokemonByName(name) {
  const pokemon = await query(`SELECT * FROM pokemon WHERE LOWER(name)=$1`, [
    name.toLowerCase()
  ]);
  return pokemon.rows[0];
}

// make a search function for any pokemon that includes a search term eg 'saur'
async function searchPokemonByName(search) {
  const pokemon = await query(
    `SELECT * FROM pokemon WHERE name ILIKE '%' || $1 || '%' `,
    [search]
  );
  return pokemon.rows;
}
// ILIKE will also turn the name in to lower case

// make a function to save new pokemon (can do this in postman, send it via a post request)
async function savePokemon(pokemon) {
  const { pkdx_id, name, description, img_url, types, evolutions } = pokemon;
  const pokemonArray = await query(
    `INSERT INTO pokemon (
      pkdx_id,
      name,
      description,
      img_url,
      types,
      evolutions
  ) VALUES($1, $2, $3, $4, $5, $6)`,
    [pkdx_id, name, description, img_url, types, evolutions]
  );
}

async function deletePokemonByName(name) {
  const pokemon = await query(`DELETE FROM pokemon WHERE LOWER(name)=$1`, [
    name
  ]);
  console.log(`${name} has been deleted!`);
}

async function deletePokemonById(id) {
  const pokemon = await query(
    `DELETE FROM pokemon WHERE id=$1 RETURNING name, id`,
    [id]
  );
  return pokemon.rows[0];
  // const { name } = pokemon.rows[0]; //the deleted pokemon will occupy one row ie index position [0]
  // return name; // will show us the name of the deleted pokemon
}

async function updateWholePokemon(body, id) {
  const { name, description, img_url, types, evolutions, pkdx_id } = body;
  const res = await query(
    "UPDATE pokemon SET name=$1, description=$2, img_url=$3, types=$4, evolutions=$5 WHERE pkdx_id=$6",
    [name, description, img_url, types, evolutions, id]
  );
  return res.rows[0]; // gets the name of the updated pokemon
}

async function patchPokemon(body, id) {
  const { pkdx_id, name, description, img_url, types, evolutions } = body;
  const res = await query(
    `UPDATE pokemon SET pkdx_id=$1, name = $2, description=$3, img_url=$3, types=$4, evolution=$5 COALESCE `
  );
}

module.exports = {
  getPokemon,
  getPokemonById,
  getPokemonByName,
  searchPokemonByName,
  savePokemon,
  deletePokemonByName,
  deletePokemonById,
  updateWholePokemon,
  patchPokemon
};

// don't need to call the function yet with (), you want to hand it as a function to any other files that can then call it with ()

// ** OLD METHOD - BEFORE WE LEARNT ABOUT DATABASES

// const fs = require("fs"); // to use readFile reasds through JSON and parses it
// const { promisify } = require("util"); // destructuring. util is an object with many different methods on it. we are taking promisify from the util object and using it here.
// const readFile = promisify(fs.readFile); // to promisify readFile

// async function getPokemon() {
//   const data = await readFile("pokedex.json"); // JSON file is stringified, needs to be parsed /turned in to JavaScript
//   const pokemon = JSON.parse(data);
//   return pokemon; // returns an array
// }

// // make a functon that will get a specific pokemon by its id
// async function getPokemonById(id) {
//   const pokemon = await getPokemon();
//   return pokemon.find(item => item.pkdx_id == id); // .find will loop through array and return you the first instance of an item (the first 'true' instance) pkdx_id = the key for the id. see file 'pokedex.json'
// }

// // write function getPokemonByName
// async function getPokemonByName(name) {
//   const pokemon = await getPokemon();
//   return pokemon.find(item => item.name.toLowerCase() == name.toLowerCase());
// }

// // make a search function for any pokemon ending in 'saur'
// // use .includes() ? arr.includes(valueToFind[, fromIndex])
// // use .filter (item) to look through the array called pokemon, using a function with .includes to look for search term
// //

// async function searchPokemonByName(search) {
//   const pokemon = await getPokemon();
//   const res = pokemon.filter(name =>
//     name.toLowerCase().includes(search.toLowerCase())
//   );
//   return res;
// }

// async function savePokemon(pokemon) {
//   const pokemonArray = await getPokemon();
//   const newArray = [...pokemonArray, pokemon]; // pokemonArray.push(pokemon);
//   await writeFile("pokedex.json", JSON.stringify(newArray));
// }

// module.exports = {
//   getPokemon,
//   getPokemonById,
//   getPokemonByName,
//   searchPokemonByName,
//   savePokemon
// };

// don't need to call the function yet with (), you want to hand it as a function to any other files that can then call it with ()
