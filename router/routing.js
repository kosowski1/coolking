const routing = require('express').Router();
var usuarioController = require('../controller/usuario')()
var receitaController = require('../controller/receita')()
var ingredienteController = require('../controller/ingredientes')()

routing.get('/usuario', usuarioController.listar)
routing.post('/usuario', usuarioController.salvar)
routing.put('/usuario/:id', usuarioController.alterar)
routing.delete('/usuario/:id', usuarioController.excluir)

routing.get('/receitas', receitaController.listar)
//Buscar receitas registradas pelo perfil do usuario
routing.get('/receitas/:id', receitaController.listarperuser)
routing.post('/receitas', receitaController.salvar)
routing.put('/receitas/:id', receitaController.alterar)
routing.delete('/receitas/:id', receitaController.excluir)

routing.post('/ingrediente', ingredienteController.addIngrediente)
routing.get('/ingrediente/:id', ingredienteController.listarIngrediente)
routing.put('/ingrediente/:id', ingredienteController.alterar)
routing.delete('/ingrediente/:id', ingredienteController.excluir)



module.exports = routing