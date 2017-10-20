/*
 * .dev SPACE
 * @author: Luis Suárez (@Lu1sSuarez)
 * @url: https://github.com/dotdevspace/spacejs-server
 *
 * @package: SpaceJS
 * @file: server.js
 */

let $server = require('http').createServer()
let $io = require('socket.io').listen($server)

const $namespace = '.devSPACE'
const $config = require('./config/app')

$io.on('connection', ($socket) => {
  $socket.emit(`${$namespace} connection`, {
    socketId: $socket.id,
    connected: true
  })

  $socket.on(`${$namespace} me`, ($data) => {
    $socket.emit($data.nsp, $data.data)
  })

  $socket.on(`${$namespace} buzz`, ($data) => {
    $socket.broadcast.emit($data.nsp, $data.data)
  })

  $socket.on('disconnect', () => {
    console.log(`Disconnect ${$namespace} IO :(`)
  })
})

$server.listen($config.PORT, $config.HOST, () => {
  console.log(`${$namespace} is running and listening to port ${$config.HOST}:${$config.PORT}...`)
})