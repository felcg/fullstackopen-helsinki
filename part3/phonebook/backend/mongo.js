const mongoose = require("mongoose");

//Checa se a senha foi inserido na linha de comando
if (process.argv.length < 3) {
  console.log("give password as argument");
  process.exit(1);
}

//Cria as variaveis para senha, nome e numero a serem inseridos na linha de comando
const password = process.argv[2];
const name = process.argv[3];
const number = process.argv[4];

//Cria a url dada pelo mongodb atlas com o nome 'phonebook-app' para a collection
const url = `mongodb+srv://admin:${password}@cluster0-rcxcj.mongodb.net/phonebook-app?retryWrites=true&w=majority`;

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

//Cria a Schema para o objeto person
const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

//Cria o modelo Person usando a Schema criada acimda
const Person = mongoose.model("Person", personSchema);

//Cria a pessoa que será adicionada usando os parametros passados na linha de comoando
const person = new Person({
  name: name,
  number: number,
});

//Adiciona a pessoa caso tenha sido passado um name e number
if (process.argv.length === 5)
  person.save().then((response) => {
    console.log(`added ${name} number ${number} to phonebook`);
    mongoose.connection.close();
  });

//Retorna as pessoas na lista caso tenha sido passado apenas o password
if (process.argv.length === 3) {
  Person.find({}).then((result) => {
    result.forEach((person) => {
      console.log(person);
    });
    mongoose.connection.close();
  });
}
