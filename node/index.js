const express = require('express')
const mysql = require('mysql')

const app = express()

const config = {
  host: 'db',
  user: 'root',
  password: 'root',
  database: 'nodedb'
}

app.get('/', (req, res) => {
  const connection = mysql.createConnection(config)

  connection.query("INSERT INTO people(name) values('Petrus')")
  
  connection.query('SELECT * from people', (err, result) => {
    if (err) {
      res.send('<h1>Erro ao consultar o banco de dados</h1>')
    } else {
      res.send(`
        <p>&lt;h1&gt;Full Cycle Rocks!&lt;/h1&gt;</p>
        <p>- Lista de nomes cadastrada no banco de dados.</p>
        <ul>
          ${result.map(({ name }) => `<li>${name}</li>`).join('')}
        </ul>
      `)
    }

  })

  connection.end()
})

app.listen(3000, () => {
  console.log('Rodando na porta 3000')
})