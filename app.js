// Review: MAKING A SERVER USING EXPRESS
// git clone the project down if you need to
// FIRST: make sure you are in the right folder! (might have to move down one as git clones the new folder but doesn't move you in to it. So do ls to see list of folders and cd 'folder name' to get in to the right folder)
// npm init -y
// npm install express
// npm install --save-dev nodemon
// copy the following lines in to package.json folder, under the "scripts" key:
// "start": "node app.js",
//"dev": "nodemon app.js"
// npm run dev

const express = require("express");
const app = express();
const PORT = 5000;
// const { getPokemon, getPokemonById } = require("./pokemon.js");
const pokemonRouter = require("./routes/pokemon");

app.use((req, res, next) => {
  // this is middleware. we tell it to do specific things. it acts just before the get request reaches the app.get(target) on the server
  // next is a tool that allows us to give more than 1 instuction to the .use method
  console.log(`${req.method} request received to ${req.url}`);
  next();
});

app.use((req, res, next) => {
  // something to do with cors? google this
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next(); // passport control - needed to end the .use function
});

app.use(express.json()); // grabs the body of each post request and does .json() on it

app.use(pokemonRouter);

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
