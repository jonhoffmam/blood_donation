// configurando o servidor
const express = require('express')
const server = express()

//configurar apresentação de arquivos extras puxando da pasta public
server.use(express.static('public'))

// habilitar body do formulário
server.use(express.urlencoded({extended: true}))


// configurar conexão DB
const Pool = require('pg').Pool
const db = new Pool({
   user: 'postgres',
   password: '123Nmudar',
   host: 'localhost',
   port: 5432,
   database: 'blood_donation'
})

// configurar template engine
const nunjucks = require('nunjucks')
   nunjucks.configure('./', {
   express: server,
   noCache: true,
})

// configurar apresentação na página
server.get('/', function(req, res) {
   //return res.send('Ok, funcionando')
   db.query('SELECT * FROM donors;', function(err, result) {
     // if (err) return res.send('Erro no banco de dados! 01')
      
      const donors = result.rows
     
      return res.render('index.html', { donors })
   })
})

server.post('/', function(req, res) {
   const name = req.body.name
   const email = req.body.email
   const blood = req.body.blood

   if (name == '' || email == '' || blood == '') {
      console.log('Campos obrigatórios vazios!')
      return res.redirect('/')
   }
   
   // insere dados no DB
   const query = `
      INSERT INTO donors ("name", "email", "blood")
      VALUES ($1, $2, $3)`
   const values = [name, email, blood]


   db.query(query, values, function(err) {
      if (err) return res.send('Erro no banco de dados! 02')

      return res.redirect('/')
   })

})

// ligar o servidor e permitir o acesso na porta 3000
server.listen(3000, function() {
   console.log('Servidor iniciado!')
})