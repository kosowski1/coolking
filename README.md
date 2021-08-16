# CoolKing
## Uma RESTAPI simples de cadastro de receitas
#### Projeto supervisionado pelo Professor Cleverson Avelino

## Requisitos

- 3 Funcionalidades (crud)
- 1 Funcionalidade avançada (Exemplo: gerar um pedido, reservar um carro etc)
- Ter a separação de rotas
- Separar a aplicação em módulos e defender a escolha
- Utilizar o banco de dados mysql
- Fazer a manipulação de erros e responder com o http status correto

## Dependencias
- express [aqui](https://expressjs.com/pt-br/)
- yaml [aqui](https://www.npmjs.com/package/js-yaml)
- mysql [aqui](https://www.npmjs.com/package/mysql)
- xampp [aqui](https://www.apachefriends.org/pt_br/index.html)

# Instalação

1. Instalar node.js versão 12 ou superior [aqui](https://nodejs.org/en/)
2. Clone o projeto criado na sua máquina. Instale o git [aqui](https://git-scm.com/downloads)
3. Configure o ambiente

# Configuração do ambiente
- Criar as tabelas : 
    - usuario(ID, LOGIN, SENHA)
    - receitas(RECEITA_ID, RECEITA_NOME, RECEITA_DESCRICAO, id_fk_usuario(Foreign Key da tabela usuario))
    - ingrediente(ID_INGREDIENTE, NOME_INGREDIENTE, fk_id_receitas(Foreign Key da tabela receitas))
- Utilizar o xampp para facil instalação, acessando o phpmyadmin, utilizando apache  + mysql

# Desenvolvendo 
- Iniciando o projeto com npm start
