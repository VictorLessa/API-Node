const restify = require('restify');

const app = restify.createServer();

const consign = require('consign');

const bodyParser = require('body-parser')

const rotas = require('../routes/rotas');

const cors = require('./cors');

//module do ejs

rotas(app);//exportando um metodo então chama o metodo passando o app

//modulo body parser para requisições url
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.pre(cors.preflight)//restify 
app.use(cors.actual)

//app.use(restify.plugins.bodyParser())

module.exports = app;