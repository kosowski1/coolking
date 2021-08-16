var receitaRep = require('../repository/receita.repository')()

module.exports = () => {

var receita = Array();

const receitaController = {}   

receitaController.listar = (req, res) => {
    receitaRep.listarReceitasUsuario((receita) => {
        res.status(200).json(receita)
    })
}
receitaController.listarperuser = (req, res) => {
    receitaRep.listarperuser(req.params.id,  (err, recipe) => {
        if (err)
        res.send(err);
        res.status(200)
        res.json(recipe);
    })
}
 receitaController.salvar = (req, res) => {
    const {RECEITA_NOME, RECEITA_DESCRICAO, id_fk_usuario} = req.body;
    if(!RECEITA_NOME, !RECEITA_DESCRICAO, !id_fk_usuario)
        res.status(400).send({error: true, message: 'Campos incorretos'});
    else{
    receitaRep.salvar({RECEITA_NOME, RECEITA_DESCRICAO, id_fk_usuario}, (receita) => {               
        res.json(receita)
    });
}
}

receitaController.alterar = (req, res) => {
    const {RECEITA_NOME, RECEITA_DESCRICAO, id_fk_usuario} = req.body;
    if(!RECEITA_NOME, !RECEITA_DESCRICAO, !id_fk_usuario)
        res.status(400).send({error: true, message: 'Campos incorretos'});
    else{
    let id = req.params.id;
    receitaRep.alterar({RECEITA_NOME, RECEITA_DESCRICAO, id_fk_usuario},id, (receita) => {               
        res.json(receita)
    });
}
}

receitaController.excluir = (req, res) => {
    let id = req.params.id;
    receitaRep.excluir(id, function(err, receita){
        if(err)
        res.send(err);
        res.json({ error:false, message: 'RECIPE successfully deleted' });
    });
}

return receitaController;

}