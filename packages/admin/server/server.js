import express from 'express';
import path from 'path';
import serverRoutes from './servers.js';

var app = express();
var HOST = 'localhost';
var PORT = 4200;
var __dirname = path.resolve();

app.set('view engine', 'ejs');
app.set('views', path.resolve(__dirname, 'ejs'));

app.get('/', function (req, res) {
    res.render('index', { title: 'Main page', active: 'main' });
});

app.get('/features', function (req, res) {
    res.render('features', { title: 'Features', active: 'features' });
});

app.use(serverRoutes);

app.listen(PORT, HOST, function () {
    return console.log('\u2705\ncongratulations!!!!\n http://' + HOST + ':' + PORT);
});