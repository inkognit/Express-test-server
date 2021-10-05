import express from 'express';
// const fs = require('fs').readFileSync()
const app = express()

const HOST = 'localhost';
const PORT = 4200


app.get('/', (req, res) => {
    // res.status(200)
    res.send('<h1>Hello World!!!</h1>')
})
// const server
app.listen(
    PORT,
    HOST,
    () => console.log(`✅\ncongratulations!!!!\n http://${HOST}:${PORT}`)
)