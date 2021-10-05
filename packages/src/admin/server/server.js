import express from 'express';
import path from 'path'
// const fs = require('fs').readFileSync()
const app = express()

const HOST = 'localhost';
const PORT = 4200
const __dirname = path.resolve()
console.log(__dirname)

app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'myPage', 'mainPage.html'))
})
app.get('/features/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'myPage', 'features.html'))
})
app.listen(
    PORT,
    HOST,
    () => console.log(`✅\ncongratulations!!!!\n http://${HOST}:${PORT}`)
)