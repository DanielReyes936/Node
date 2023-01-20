
const { response } = require('express')
const express = require('express')
const app = express()

app.use(express.json())

let notes =[ {
    "id": 1,
    "SerialNo": "GUIR23456JYG5685",
    "Maker": "Toyota",
    "Model": "Acura",
    "Year": 1998,
    "ExteriorColor": "red"}
  ,
  {
    "id": 2,
    "SerialNo": "GUIR23456JYG4753",
    "Maker": "Toyota",
    "Model": "Civic",
    "Year": 2004,
    "ExteriorColor": "green"
  },
  {
    "_id": 3,
    "SerialNo": "GUIR234567895",
    "Maker": "BMW",
    "Model": "M6",
    "Year": 2014,
    "ExteriorColor": "Blue"
  }]
//const app = http.createServer((request, Response) => {

  //  Response.writeHead(200,{'Content-Type' : 'application/json'})
   // Response.end(JSON.stringify(info))
//})

app.get('/', (request, Response) =>{
    Response.send('<h1>Hola Daniel</h1>')
})

app.get('/api/notes/', (request, Response) =>{

Response.json(notes)

})

app.get('/api/notes/:id', (request, Response) =>{
    const id = Number(request.params.id)
    
    const note = notes.find(note=> note.id == id)

    if(note){

        Response.json(note)
    }
    else
    {
        Response.send('<h1>This ID not  exist</h1>')
    }
    
})


app.delete('/api/notes/:id', (request, Response) =>{
    const id = Number(request.params.id)
    
    notes = notes.filter(note=> note.id != id)
    Response.status(204).end()
})

app.post('/api/notes/', (request, Response) =>{
    const note = request.body
    
    const ids = notes.map(note => note.id)
    const maxId = Math.max(...ids)

    const newNote = {
        id: maxId + 1,
        content : note.content
    }
    notes = [...notes,newNote]
    Response.json(newNote)

})

const PORT = 3001
app.listen(PORT,()  =>{
console.log(`Server running on port ${PORT}`)
})