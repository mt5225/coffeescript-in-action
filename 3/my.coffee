fs = require 'fs'
http = require 'http'

sourceFile = '1.txt'
fileContent = 'empty'

readFile = ->
  fs.readFile sourceFile, 'utf-8', (error, data) ->
    if error
      console.log error
    else
      fileContent =  data

#dynamic context
fs.watchFile sourceFile, readFile

#http server
server = http.createServer (request, response) ->
  console.log fileContent
  response.end fileContent

server.listen 8080, '127.0.0.1'
