const environment = process.env.ENVIRONMENT || "development";

const config = require("../knexfile.ts")[environment];
var db: any = require("knex")(config);

const { attachPaginate } = require("knex-paginate");

if (!db.paginate) {
  attachPaginate();
}

export { db };
