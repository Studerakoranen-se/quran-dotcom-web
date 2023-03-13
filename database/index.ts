import knex from "knex";
const config = require("../knexfile.ts");
var db: any = knex(config);

const { attachPaginate } = require("knex-paginate");

if (!db.paginate) {
  attachPaginate();
}

module.exports = db;
