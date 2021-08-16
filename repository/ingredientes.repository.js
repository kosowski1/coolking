var mysql = require('mysql');

module.exports = () => {

    const repository = {}

    function conectar(callback) {
        var connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'coolking'
        });

        connection.connect(function (err) {
            if (err) {
                return callback(connection, err)
            }

            return callback(connection, err);
        });
    }

    repository.listar = (id, callback) => {
        conectar((connection, err) => {
            if (err) {
                const error = new Error()
                error.message = "Não foi possível conectar ao banco de dados"
                error.httpStatusCode = 500
                error.code = 'ERR003'
                return callback(error)
            }

            connection.query('SELECT * FROM INGREDIENTE WHERE fk_id_receitas = ?',[id],  function (err, rows) {
                if (err) {
                    console.log(err)
                    return;
                }
                
    
                /* usuarios = rows.map(function(item) {
                     if (user.id === item.id) {
                         item.login = user.login;
                     }
                     return item;        
                 }) */
    
                return callback(rows)
            })
        })        
    }

    repository.addIngrediente = (servico, callback) => {
        conectar((connection, err) => {
            if (err) {
                const error = new Error()
                error.message = "Não foi possível conectar ao banco de dados"
                error.httpStatusCode = 500
                error.code = 'ERR003'
                return callback(error)
            }
            connection.query('INSERT INTO INGREDIENTE SET ?', servico, function (err, res) {
                if (err) {
                    console.log(err)
                }

                servico.id = res.insertId

                connection.end();
                
                return callback(servico)
            })
        })
    }
    repository.alterar = (ingrediente,id, callback) => {
        conectar((connection, err) => {
            if (err) {
                const error = new Error()
                error.message = "Não foi possível conectar ao banco de dados"
                error.httpStatusCode = 500
                error.code = 'ERR003'
                return callback(error)
            }
            connection.query('UPDATE ingrediente SET NOME_INGREDIENTE =? WHERE  ID_INGREDIENTE = ?',[ingrediente.NOME_INGREDIENTE, id] , function (err, res) {
                if (err) {
                    console.log(err)
                }
                connection.end();
                
                return callback(ingrediente)
            })
        })
    }
    repository.excluir = (id, result) => {
        conectar((connection, err) => {
            if (err) {
                const error = new Error()
                error.message = "Não foi possível conectar ao banco de dados"
                error.httpStatusCode = 500
                error.code = 'ERR003'
                return callback(error)
            }
            connection.query('DELETE FROM ingrediente WHERE id_ingrediente = ?',[id] , function (err, res) {
                if(err) {
                    console.log("error: ", err);
                    result(null, err);
                }
                else{
                    result(null, res);
                }
            })
        })
    }

    return repository

}

