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

    repository.listar = (callback) => {
        conectar((connection, err) => {
            if (err) {
                const error = new Error()
                error.message = "Não foi possível conectar ao banco de dados"
                error.httpStatusCode = 500
                error.code = 'ERR003'
                return callback(null, error)
            }

            connection.query('SELECT * FROM USUARIO', function (err, rows) {
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

    repository.salvar = (usuario, callback) => {
        conectar((connection, err) => {
            if (err) {
                const error = new Error()
                error.message = "Não foi possível conectar ao banco de dados"
                error.httpStatusCode = 500
                error.code = 'ERR005'
                return callback(null, error)
            }
            connection.query('INSERT INTO USUARIO SET ?', usuario, function (err, res) {
                if (err) {
                    const error = new Error()
                    error.message = "Erro ao inserir o usuário"
                    error.httpStatusCode = 500
                    error.code = 'ERR003'
                    return callback(null, error)
                }

                usuario.id = res.insertId

                connection.end();
                return callback(usuario, null)
            })
        })
    }

    repository.alterar = (user,id, callback) => {
        conectar((connection, err) => {
            if (err) {
                const error = new Error()
                error.message = "Não foi possível conectar ao banco de dados"
                error.httpStatusCode = 500
                error.code = 'ERR003'
                return callback(error)
            }
            connection.query('UPDATE usuario SET LOGIN =?, SENHA =? WHERE  ID = ?',[user.LOGIN, user.SENHA, id] , function (err, res) {
                if (err) {
                    console.log(err)
                }

                user.id = res.insertId

                connection.end();
                
                return callback(user)
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
            connection.query('DELETE FROM USUARIO WHERE ID = ?',[id] , function (err, res) {
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

