require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const Person = require("./models/person");

const app = express();

//tokens do morgan sao criados assim, primeiro parametro é o nome do token
//o segundo é a função que o token realiza
morgan.token("body", (req, res) => {
  return JSON.stringify(req.body);
});

app.use(express.json());
app.use(express.static("build"));

//aqui o morgan é chamado com os tokens que vao ser usados no log
//:body é o token criado acima, os outros são tokens ja existentes no morgan
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body")
);
app.use(cors());

let persons = [
  {
    name: "Arto Hellas",
    number: "040-123456",
    id: 1,
  },
  {
    name: "Ada Lovelace",
    number: "39-44-5323523",
    id: 2,
  },
  {
    name: "Dan Abramov",
    number: "12-43-234345",
    id: 3,
  },
  {
    name: "Mary Poppendieck",
    number: "39-23-6423122",
    id: 4,
  },
  {
    name: "Felipe",
    number: "21965793739",
    id: 5,
  },
  {
    name: "Carolina",
    number: "21968505490",
    id: 6,
  },
];

const generateId = () => {
  const maxId = persons.length > 0 ? Math.max(...persons.map((n) => n.id)) : 0;
  return maxId + 1;
};

app.get("/api/persons", (req, res) => {
  Person.find({}).then((persons) =>
    res.json(persons.map((person) => person.toJSON()))
  );
});

app.get("/info", (req, res) => {
  res.send(
    `<p>The phonebook has info for ${
      persons.length
    } people</p> <br/> ${new Date()}`
  );
});

app.get("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  const person = persons.find((person) => person.id === id);

  if (person) {
    res.json(person);
  } else {
    res.status(404).end();
  }
});

app.delete("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  persons = persons.filter((person) => person.id !== id);

  res.status(204).end();
});

app.post("/api/persons", (req, res) => {
  const body = req.body;

  if (!body.name) {
    return res.status(400).json({ error: "name is missing" });
  }

  if (!body.number) {
    return res.status(400).json({ error: "number is missing" });
  }

  // if (persons.find((person) => person.name === body.name)) {
  //   return res.status(400).json({ error: "name already in the book" });
  // }

  const person = new Person({
    name: body.name,
    number: body.number,
  });

  person.save().then((savedPerson) => res.json(savedPerson.toJSON()));
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
