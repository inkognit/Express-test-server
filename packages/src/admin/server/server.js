import express from 'express';
import path from 'path'
import { requestTime, logger } from '../middlewares/middlewares.js'


const app = express()
const HOST = 'localhost';
const PORT = 4200
const __dirname = path.resolve()

app.set('view engine', 'ejs')
app.set('views', path.resolve(__dirname, 'ejs'))


// app.use(requestTime)
// app.use(logger)


app.get('/', (req, res) => {
    res.render('index', { title: 'main page' })
})

app.get('/features', (req, res) => {
    res.render('features', { title: 'Features' })
})

// app.use(express.static(path.resolve(__dirname, 'pages')))
// app.get('/', (req, res) => {
//     res.sendFile(path.resolve(__dirname, 'myPage', 'mainPage.html'))
// })
// app.get('/features', (req, res) => {
//     res.sendFile(path.resolve(__dirname, 'myPage', 'features.html'))
// })

// app.get('/download', (req, res) => {
//     res.download(path.resolve(__dirname, 'pages', 'index.html'))
// })








app.listen(
    PORT,
    HOST,
    () => console.log(`✅\ncongratulations!!!!\n http://${HOST}:${PORT}`)
)