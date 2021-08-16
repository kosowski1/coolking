var usuarioRep = require('../repository/usuario.repository')()

module.exports = () => {

    const controller = {}   
    
    controller.listar = (req, res, callback) => {
        //const login = req.query.login
        //
        //const usuarioFiltro = usuarios.filter(function(item, index) {        
        //    return item.login === login;
        //});

        usuarioRep.listar((usuarios, err) => {    
            if (err) {
                return callback(err)
            }        
            res.status(200).json(usuarios)
        })
    }
    
    controller.salvar = (req, res, callback) => {
        const {LOGIN, SENHA} = req.body;
        if(!LOGIN || !SENHA)
        res.status(400).send({error: true, message: 'Campos incorretos'});
        else{   
        usuarioRep.salvar({LOGIN, SENHA}, (usuario, err) => {      
            if (err) {
                return callback(err)
            }       
            res.json(usuario)
        });
    }
    }

    controller.alterar = (req, res) => {
        let {LOGIN, SENHA} = req.body;
        let id = req.params.id;
        if(!LOGIN || !SENHA)
        res.status(400).send({error: true, message: 'Campos incorretos'});
        else{
    usuarioRep.alterar({LOGIN, SENHA},id, (usuario) => {               
        res.json(usuario)
    });
    }
}
    controller.excluir = (req, res) => {
        let id = req.params.id;
        usuarioRep.excluir(id, function(err, usuario){
            if(err)
            res.send(err);
            res.json({ error:false, message: 'USER successfully deleted' });
        });
    }

    return controller
}




