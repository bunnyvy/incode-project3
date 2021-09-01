// Proper way to initialise and share the Database object

// Loading and initialising the library:
const pgp = require(`pg-promise`)()

// Preparing the connection details:
const connection = {
    user: "postgres",
    password: "12345678",
    host: "localhost",
    port: 5432,
    database: "mrcoffee"
}

// Creating a new database instance from the connection details
const db = pgp(connection)

// Exporting the database oject for shared use:
module.exports =  db