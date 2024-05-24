require('dotenv').config()
const express = require('express')
var morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')

const app = express()

morgan.token('new_person', function (req, res) {
    if (req.method === 'POST' && req.url.endsWith('persons'))
        return JSON.stringify(req.body)
})

app.use(cors())
app.use(express.static('dist'))
app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :new_person'))

app.get('/info', (request, response) => {
    const info = `<div>Phonebook has info for ${persons.length} people</div>
    <div>${Date(Date.now()).toString()}</div>`
    response.send(info)
})

app.get('/api/persons', (request, response) => {
    Person.find({}).then(persons => {
        response.json(persons)
    })
})

app.get('/api/persons/:id', (request, response) => {
    Person.findById(request.params.id).then(person => {
        response.json(person)
    })
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)
    response.status(204).end()
})

const generateId = () => {
    return parseInt(Math.random() * (10000 - 5))
}

app.post('/api/persons', (request, response) => {
    const body = request.body

    if (!body.name || !body.number) {
        return response.status(400).json({
            error: !body.name ? 'name missing' : 'number missing'
        })
    }
    Person.find({ name: body.name }).then(persons => {
        if (persons.length > 0)
            return response.status(400).json({
                error: 'name must be unique'
            })
        else {
            const person = new Person({
                name: body.name,
                number: body.number,
            })

            person.save().then(savedPerson => {
                response.json(savedPerson)
            })
        }
    })
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})