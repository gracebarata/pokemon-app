const { query } = require("../index"); // the .. tells it to go up a folder, similar to cd .. in line command

async function createTable() {
  const res = await query(`
  CREATE TABLE IF NOT EXISTS pokemon (
      id SERIAL,
      pkdx_id INTEGER,
      name TEXT,
      description TEXT,
      img_url TEXT,
      types TEXT [],
      evolutions TEXT [],
      PRIMARY KEY(id)
  )`);
  console.log(res);
}

createTable();
