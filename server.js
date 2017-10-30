/*
 * .dev SPACE
 * @author: Luis Suárez (@Lu1sSuarez)
 * @url: https://github.com/dotdevspace/spacejs-server
 *
 * @package: SpaceJS
 * @file: server.js
 */

const $server = require('http').createServer(($request, $respond) => {
  $respond.writeHead(200, {'Content-Type': 'text/plain'})
  $respond.end('.dev SPACE')
})
const $io = require('socket.io').listen($server)

const $namespace = '.devSPACE'
const $config = require('./config/app')

const $port = $config.PORT || 3000
const $host = $config.HOST || '::'

$io.on('connection', ($socket) => {
  $socket.emit(`${$namespace} connection`, {
    socketId: $socket.id,
    connected: true
  })

  $socket.on(`${$namespace} me`, ($data) => {
    $socket.emit($data.nsp, $data.data)
  })

  $socket.on(`${$namespace} room`, ($data) => {
    $socket.broadcast.emit($data.nsp, $data.data)
  })

  /*$socket.on('disconnect', () => {
    console.log(`Disconnect ${$namespace} IO :(`)
  })*/
})

$server.listen($port, $host, () => {
  console.log(`${$namespace} is running and listening to port ${$host}:${$port}...`)
})