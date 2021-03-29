const express = require('express')
const { Pool, Client } = require('pg')

const app = express()

const pool = new Pool({
    user: 'postgres',
    password: '1234',
    port: 5432,
    // db
    database: 'feature-chat',
});

// dotenv
const dotenv = require('dotenv')
dotenv.config()

//
const port = process.env.PORT

app.get('/', (req, res) => {
    pool.query('SELECT NOW()', (err, result) => {

        // response of get
        res.send(result)

        pool.end()
    })
})

app.listen(port, () => {
    console.log(`running on port ${port}`)
})