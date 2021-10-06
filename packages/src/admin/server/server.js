import express from 'express';
import path from 'path'
import serverRoutes from './servers.js'


const app = express()
const HOST = 'localhost';
const PORT = 4200
const __dirname = path.resolve()

app.set('view engine', 'ejs')
app.set('views', path.resolve(__dirname, 'ejs'))


app.get('/', (req, res) => {
    res.render('index', { title: 'Main page', active: 'main' })
})

app.get('/features', (req, res) => {
    res.render('features', { title: 'Features', active: 'features' })
})

app.use(serverRoutes)






app.listen(
    PORT,
    HOST,
    () => console.log(`✅\ncongratulations!!!!\n http://${HOST}:${PORT}`)
)