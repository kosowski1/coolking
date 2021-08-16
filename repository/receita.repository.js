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

    repository.listarReceitasUsuario = (callback) => {
        conectar((connection, err) => {
            if (err) {
                const error = new Error()
                error.message = "Não foi possível conectar ao banco de dados"
                error.httpStatusCode = 500
                error.code = 'ERR003'
                return callback(error)
            }

            connection.query('SELECT R.RECEITA_ID, R.id_fk_usuario, U.LOGIN, R.RECEITA_NOME, R.RECEITA_DESCRICAO FROM RECEITAS R LEFT JOIN USUARIO U ON U.ID = R.id_fk_usuario ', function (err, rows) {
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

    repository.listarperuser = (id, callback) => {
        conectar((connection, err) => {
            if (err) {
                const error = new Error()
                error.message = "Não foi possível conectar ao banco de dados"
                error.httpStatusCode = 500
                error.code = 'ERR003'
                return callback(error)
            }

            connection.query('SELECT * FROM receitas WHERE id_fk_usuario = ?',[id],  function (err, rows) {
                if (err) {
                    console.log(err)
                    return;
                }
                return callback(rows)
            })
        })        
    }

    repository.salvar = (servico, callback) => {
        conectar((connection, err) => {
            if (err) {
                const error = new Error()
                error.message = "Não foi possível conectar ao banco de dados"
                error.httpStatusCode = 500
                error.code = 'ERR003'
                return callback(error)
            }
            connection.query('INSERT INTO RECEITAS SET ?', servico, function (err, res) {
                if (err) {
                    console.log(err)
                }

                connection.end();
                
                return callback(servico)
            })
        })
    }

    repository.alterar = (servico,id, callback) => {
        conectar((connection, err) => {
            if (err) {
                const error = new Error()
                error.message = "Não foi possível conectar ao banco de dados"
                error.httpStatusCode = 500
                error.code = 'ERR003'
                return callback(error)
            }
            connection.query('UPDATE RECEITAS SET RECEITA_NOME =?, RECEITA_DESCRICAO =? WHERE  RECEITA_ID = ?',[servico.RECEITA_NOME, servico.RECEITA_DESCRICAO, id] , function (err, res) {
                if (err) {
                    console.log(err)
                }

                servico.id = res.insertId

                connection.end();
                
                return callback(servico)
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
            connection.query('DELETE FROM RECEITAS WHERE RECEITA_ID = ?',[id] , function (err, res) {
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

