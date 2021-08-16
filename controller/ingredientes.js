var ingredienteRep = require('../repository/ingredientes.repository')()

module.exports = () => {

var ingrediente = Array();

const ingredienteController = {}   
ingredienteController.listarIngrediente = (req, res) => {
    ingredienteRep.listar(req.params.id,  (err, recipe) => {
        if (err)
        res.send(err);
        res.status(200)
        res.json(recipe);
    })
}

ingredienteController.addIngrediente = (req, res) => {
    const {NOME_INGREDIENTE, fk_id_receitas} = req.body;
    if(!NOME_INGREDIENTE || !fk_id_receitas)
        res.status(400).send({error: true, message: 'Campos incorretos'});
    else{   
        ingredienteRep.addIngrediente({NOME_INGREDIENTE, fk_id_receitas}, (receita) => {               
            res.json(receita)
        });
    }
}

ingredienteController.alterar = (req, res) => {
    const {NOME_INGREDIENTE, fk_id_receitas} = req.body;
    if(!NOME_INGREDIENTE || !fk_id_receitas)
        res.status(400).send({error: true, message: 'Campos incorretos'});
        else{
    let id = req.params.id;
    ingredienteRep.alterar({NOME_INGREDIENTE, fk_id_receitas},id, (ingrediente) => {               
        res.json(ingrediente)
    });
}
}
ingredienteController.excluir = (req, res) => {
    let id = req.params.id;
    ingredienteRep.excluir(id, function(err, receita){
        if(err)
        res.send(err);
        res.json({ error:false, message: 'Ingredient successfully deleted' });
    });
}

return ingredienteController;

}