const categoria = deps => {
    //MODULOS
    //sempre recupera dependencias de seria a conexão e o errorHandler
    return  {
        login: (nome, senha) =>{
            return new Promise((resolve, reject)=> {
                const {connection, errorHandler} = deps
                connection.query('SELECT * FROM login WHERE nome = ? and senha = ?',[nome, senha], (error, results)=>{
                    if(error) {
                        errorHandler(error, `erro no db`, reject)
                        return false
                    }
                    if((results[0]) != undefined) {
                        resolve(results[0].id)
                    }else {
                        resolve(false)
                    }
                    
                })
            })        
        },
        cep: (cep) =>{
            return new Promise((resolve, reject)=>{
                const urlStr = "https://viacep.com.br/ws/"+cep+"/json/";
                $.ajax({
                    url: urlStr,
                    type: "get",
                    dataType: "json",
                    success: (data)=>{
                        resolve(data);
                    },
                    error : (erro)=>{
                        console.log(error);
                    }
                })
                
            })
        },
        all: () =>{
            return new Promise((resolve, reject)=>{
                const { connection, errorHandler } = deps
                    connection.query('SELECT * FROM login', (error, results)=>{
                    if(error) {
                        errorHandler(error, 'Falha ao listar as categorias', reject)
                        return false
                    }
                    resolve({ categorias : results})
                })
            })
        },
        save:(nome, senha) =>{
            return new Promise((resolve, reject)=>{
                const { connection, errorHandler } = deps
                    connection.query('INSERT INTO login(nome, senha) VALUES(?, ?)',[nome, senha], (error, results)=>{
                    if(error) {
                        errorHandler(error, `Falha ao salvar a categorias ${nome}`, reject)
                        return false
                    }
                    resolve({ categorias : {nome, id:results.insertId} })
                })
            }) 
        },
        update:(id, name) =>{
            return new Promise((resolve, reject) => {
                const {connection, errorHandler} = deps
                connection.query('UPDATE login SET name = ? WHERE id = ?',[name, id], (error, results)=>{
                    if(error) {
                        errorHandler(error, `falha ao atualizar categorias ${name}`, reject)
                        return false
                    }
                    resolve({categorias : {name, id:results.insertId} })
                })
            })
        },
        del:(id, name) => {
            return new Promise((resolve, reject)=> {
                const {connection, errorHandler} = deps
                connection.query('DELETE  FROM login WHERE id = ?',[id], (error, results)=> {
                    if(error) {
                        errorHandler(error, `falha ao sexcluir uma categoria ${name}`, reject)
                        return false
                    }
                    resolve({  message: "Categoria removida com sucesso" })
                })
            })
        }
    }
}

 module.exports = categoria