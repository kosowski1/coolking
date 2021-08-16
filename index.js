const express = require('express')
const yaml = require('js-yaml');
const fs = require('fs');

try {
  let fileContents = fs.readFileSync('./configs/dev.yaml', 'utf8');
  data = yaml.load(fileContents);
} catch (e) {
  console.log(e);
}

const app = express()
const port = data['port']

app.use(express.json())

const routing = require('./router/routing')

app.use(routing)

app.get('/test', function(req, res){
  throw {status: 500, message: 'detailed message'};
})

app.use(function (err, req, res, next) {
  res.status(err.httpStatusCode || 500).json({code: err.code, message: err.message})
});


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})