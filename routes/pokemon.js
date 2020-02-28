const express = require("express");
const router = express.Router();
const {
  getPokemon,
  getPokemonById,
  getPokemonByName,
  searchPokemonByName,
  savePokemon,
  deletePokemonByName,
  deletePokemonById,
  updateWholePokemon,
  patchPokemon
} = require("../models/pokemon");

router.get("/pokemon", async (req, res) => {
  //console.log("Here");
  //console.log(req, query, name);
  const { name, search } = req.query;
  if (name) {
    const namedPokemon = await getPokemonByName(name);
    res.json(namedPokemon);
    return;
  }
  if (search) {
    const searchedPokemon = await searchPokemonByName(search);
    res.json(searchedPokemon);
    return;
  }

  const pokemon = await getPokemon();
  res.json(pokemon);
});

router.get("/pokemon/:pokemonId", async (req, res) => {
  const { pokemonId } = req.params; // the parameter is set above ^ via :pokemonId (note the :) so we would type /pokemon/57 to get pokemon no 57
  const pokemon = await getPokemonById(pokemonId);
  res.json(pokemon);
});

router.post("/pokemon", (req, res) => {
  const { body } = req;
  savePokemon(body);
  console.log(body);
  res.send(`you have saved ${body.name} as a pokemon`);
});

router.delete("/pokemon", async (req, res) => {
  const { name, id } = req.query;
  if (name) {
    await deletePokemonByName(name);
    res.status(200).send(`oh no, you deleted ${name}!`);
  } else if (id) {
    const name = await deletePokemonById(id);
    res.status(200).send(`oh no you killed pokemon ${name} number ${id}!`);
  }
});

router.put("/pokemon/:id", async (req, res) => {
  const { body } = req;
  const { pkdx_id } = req.params;
  const response = await updateWholePokemon(body, pkdx_id);
  console.log(body);
  response.send(`you have updated ${body.name} to ${res.name}`);
});

router.patch("/pokemon:id", async (req, res) => {
  const { body, params } = req;
  const { id } = params;
  const result = await patchPokemon(body, id);
  // res.send{
  //   success:true;
  //   message: `you have updated pokemon id ${id} with `
  // }
});

// router.delete("/pokemon", async (req, res) => {
//   const { id } = req.query; // query takes a ? in the url eg pokemon?id=57
//   if (id) {
//     await deletePokemonById(id);
//     res.status(200).send(`oh no you killed pokemon number ${id}!`);
//   }
// });

module.exports = router;
