const app = require('express')()
const bodyParser = require('body-parser')
const { Pool, Client } = require('pg')

// lodash
const _ = require('lodash')
const bcrypt = require('bcrypt')

const logger = require('./helper/logger')

// initial body raw request
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// initial postgre auth
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

// initial query name
const query = {
    text: '',
    values: []
};

// create user account
app.post('/users/create', (req, res) => {
    query.text = `INSERT INTO users(username, password) VALUES($1, $2)`

    // mapping value password
    _.forEach(req.body, (value, key) => {
        if (key === 'password') value = bcrypt.hashSync(value, 10);
        query.values.push(value)
    })

    pool.query(query, (err, result) => {
        res.send(result)
    })
})

// login user account
app.post('/users/login', (req, res) => {

})

// set logger middleware
app.use((req, res, next) => {
    console.log(res)
})

app.listen(port, () => {
    console.log(`running on port ${port}`)
})