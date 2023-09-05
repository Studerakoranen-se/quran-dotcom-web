const environment = process.env.ENVIRONMENT || 'development'

const { attachPaginate } = require('knex-paginate')
const config = require('../../knexfile.ts')[environment]
// eslint-disable-next-line import/order
const db: any = require('knex')(config)

if (!db.paginate) {
  attachPaginate()
}

// eslint-disable-next-line import/prefer-default-export
export { db }
