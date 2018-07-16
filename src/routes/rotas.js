const fs = require('file-system')
const buscaCep = require('busca-cep')
const db = require('../db/db');
const ViaCep = require('node-viacep').default
const routes = (app)=>{
    app.get('/', (req, res, next)=>{
        fs.readFile(__dirname + '/../login.html', (err, data)=>{
            if(err) {
                next(err)
                return
            }
            res.setHeader('Content-Type', 'text/html');
            res.writeHead(200);
            res.end(data);
        })
        next()
    })
    app.post('/login', async(req, res, next)=>{
        const {nome, senha} = req.body
        try{
            if(await db.sql().login(nome, senha)) {
                fs.readFile(__dirname + '/../home.html', (err, data)=>{
                    res.setHeader('Content-Type', 'text/html');
                    res.writeHead(200);
                    res.end(data);
                })
            }else {
                res.send('usuario n encontrado')
            }    
            return false
        }catch(error) {
            res.send(error)
        }
        next()
    })
    app.post('/cep', async (req, res, next)=>{
        const {cep} = req.body
        global.fetch = require('node-fetch');
        const viacep = new ViaCep({
            type: 'json'
        })
        const address = viacep.zipCod.getZip(cep)
        address
        .then(data=>data.json())
        .then(data=>res.send(data))
        .catch(erro=>res.send('error ao analizar cep'))
        
        //outra forma de recuperar o CEP
        /*buscaCep(cep, {sync: false, timeout: 1000})
        .then(endereco =>{
            res.send(endereco.logradouro)
        })
        .catch(erro=>{
            res.send(`Erro: statusCode ${erro.statusCode} e mensagem ${erro.message}`)
        })*/

    })
    app.get('/all', async (req, res, next)=>{       
        try{
            res.send(await db.sql().all())       
        }catch(error){
            res.send(error)        
        }
        next()
    })
    app.post('/categoria', async (req, res, next)=>{
        const {nome, senha} = req.body
        try{
            res.send(await db.sql().save(nome, senha))       
        }catch(error){
            res.send(error)       
        }
        next()
    })
    app.put('/categoria', async (req, res, next)=>{
        const {id, name} = req.body
        try{
            res.send(await db.categorias().update(id, name))       
        }catch(error){
            res.send(error)    
        }
        next()
    })
    app.del('/delet', async (req, res, next)=>{
        const {id, name} = req.body
        try{
            res.send(await db.sql().del(id, name)) 
        }catch(error){
            res.send(error)        
        }
        next();
    })
    /*app.delete('/categoria', (req, res, next)=>{
        res.send
    ;
    });*/
    //put atualização de um recurso
    //delete é a exclusão de um recurso
}

module.exports = routes;