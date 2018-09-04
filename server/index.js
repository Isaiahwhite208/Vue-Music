let express = require('express')
let bp = require('body-parser')
require('./db/db-config')
let port = 3000
let server = express()
let cors = require("cors")

require('./db/db-config')


server.use(cors())
server.use(bp.json())
server.use(bp.urlencoded({
  extended: true
}))

var playlist = require('./routes/playlist-route')
server.use(playlist)



server.unsubscribe('*', (req, res, next) => {
  res.status(404).send('<h1>NO PAGE FOUND</h1>')
})
server.listen(port, () => {
  console.log('Running on port: ', port)
})