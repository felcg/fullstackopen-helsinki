require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const Person = require("./models/person");

const app = express();
const PORT = process.env.PORT || 3001;

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

//Customiza o errorHandler padrao do Express
const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    return response.status(400).send({ error: error.message });
  }

  next(error);
};

const generateId = () => {
  const maxId = persons.length > 0 ? Math.max(...persons.map((n) => n.id)) : 0;
  return maxId + 1;
};

app.get("/api/persons", (req, res) => {
  //Usa o model Person e o find() do mongoose com o campo vazio para achar todas as pessoas
  //em seguida usa o toJSON() para trazer um JSON já que no mongoDB os itens são objetos
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
  Person.findById(req.params.id)
    .then((person) => {
      if (person) {
        res.json(person.toJSON());
      } else {
        res.status(404).end();
      }
    })
    .catch((error) => next(error));
});

app.delete("/api/persons/:id", (req, res) => {
  Person.findByIdAndRemove(req.params.id).then((result) => {
    console.log(result);
    res.status(204).end();
  });
});

app.post("/api/persons", (req, res, next) => {
  const body = req.body;
  const person = new Person({
    name: body.name,
    number: body.number,
  });

  if (!body.name) {
    return res.status(400).json({ error: "name is missing" });
  }

  if (!body.number) {
    return res.status(400).json({ error: "number is missing" });
  }

  if (persons.find((person) => person.name === body.name)) {
    console.log("Name already in the book");
  }

  person
    .save()
    .then((savedPerson) => savedPerson.toJSON())
    .then((savedAndFormattedPerson) => res.json(savedAndFormattedPerson))
    .catch((error) => next(error));
});

//Atualiza o numero de uma pessoa na lista utilizando o metodo put
//passando o numero no objeto person, entao procurando o id usando
//findByIdAndUpdate do mongoose
app.put("/api/persons/:id", (req, res, next) => {
  const body = req.body;
  const person = {
    number: body.number,
  };

  Person.findByIdAndUpdate(req.params.id, person, {
    new: true,
  })
    .then((updatedPerson) => res.json(updatedPerson.toJSON()))
    .catch((error) => next(error));
});

//Aqui mandamos o app usar o errorHandler, ele precisa ser chamado no
//final do app para que ele possa tratar qualquer erro
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
