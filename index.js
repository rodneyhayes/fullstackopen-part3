const express = require('express');
const app = express();

app.use(express.json());

var persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
];

app.get('/api/persons', (req, res) => {
    res.json(persons);
});

app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id);
    const person = persons.find(p => p.id === id);

    if(person){
        res.json(person);
    }
    else{
        res.status(404).end();
    }
});

app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id);
    persons = persons.filter(p => p.id !== id);

    res.status(204).end();
});

app.post('/api/persons', (req, res) => {
	var person = req.body;
	person.id = getMaxId() + 1;
	persons = persons.concat(person);

	res.json(person);
});

const getMaxId = () => {
	return persons.length > 0 ? Math.max(...persons.map(p => p.id)) : 0;
}

app.get('/info', (req, res) => {
    res.send(`<p>Phonebook has info for ${persons.length} ${persons.length === 1 ? 'person' : 'people'}</p><p>${new Date()}</p>`)
});

const PORT = 3001;

app.listen(PORT, () => {
    console.log(`App is listening on port: ${PORT}`);
})