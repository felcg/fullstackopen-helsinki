import React, { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Notification from "./components/Notification";
import ContactList from "./components/ContactList";
import personService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newPerson, setNewPerson] = useState({ name: "", number: "" });
  const [searchTerm, setSearchTerm] = useState("");
  const [showAll, setShowAll] = useState(true);
  const [notificationMessage, setNotificationMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  //Usa o personService para pegar a lista de pessoas
  useEffect(() => {
    personService.getAll().then((initialPersons) => setPersons(initialPersons));
  }, []);

  //Decide quais pessoas vão aparecer na lista baseados no termo de busca do usuário
  const personsToShow = showAll
    ? persons
    : persons.filter((person) =>
        person.name.toLowerCase().includes(searchTerm.toLowerCase())
      );

  //Lida com a mudança dos inputs nos campos name e number
  //quando o usuário escreve alguma coisa em um dos dois.
  //usa o spread para quebrar o newPerson e event.target.name
  //para saber qual campo está sendo modificado a partir do
  //name do input.
  const handlePersonChange = (event) => {
    const value = event.target.value;
    setNewPerson({ ...newPerson, [event.target.name]: value });
  };

  //Lida com quando o usuário busca algum nome na lista
  //mudando o setShowAll para false, para só mostrar o
  //nome que o usuário está buscando
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setShowAll(false);
  };

  //Adiciona uma pessoa nova na lista
  const addPerson = (event) => {
    event.preventDefault();
    const personObject = {
      name: newPerson.name,
      number: newPerson.number,
    };

    //Cria um array usando filter contendo o nome que existe na lista
    //caso seja o mesmo que o usuário esta digitando (checa se usuario
    //buscado já existe)
    const toUpdate = persons.filter((person) => {
      return person.name === newPerson.name;
    });

    //se nome já existe na lista, pergunta se usuário quer atualizar numero
    if (toUpdate.length === 1) {
      const confirm = window.confirm(
        `${newPerson.name} already in phonebook, do you want to update the number?`
      );
      //se usuário quiser atualizar, pega o id e numero digitados
      //usando o array criado em toUpdate e também o state newPerson
      if (confirm) {
        const id = toUpdate[0].id;
        const updatedPerson = { ...toUpdate[0], number: newPerson.number };

        //usa o personService para fazer a atualização passando o id e o objeto
        //da nova pessoa. Em seguida atualiza o state persons, fazendo um map
        //por ele, retornando os nomes da lista que nao foram modificados
        //e retornando a versao modificada do que foi
        personService.update(id, updatedPerson).then((returnedPerson) => {
          setPersons(
            persons.map((person) =>
              person.id !== id ? person : returnedPerson
            )
          );
          //Modifica a mensagem de notificação e faz ela sumir depois de 5 sec
          setNotificationMessage(`${updatedPerson.name}'s number was updated`);
          setTimeout(() => {
            setNotificationMessage(null);
          }, 5000);
        });
      }

      //caso nao seja um usuário novo, adiciona o objeto novo com o state persons
      //e limpa o state newPerson para que fique em branco e possa ser usado novamente
    } else {
      personService.create(personObject).then((returnedPerson) => {
        setPersons(persons.concat(personObject));
        setNewPerson({ name: "", number: "" });
        //Modifica a mensagem de notificação e faz ela sumir depois de 5 sec
        setNotificationMessage(
          `${personObject.name} was added to the phonebook`
        );
        setTimeout(() => {
          setNotificationMessage(null);
        }, 5000);
      });
    }
  };

  //Deleta uma pessoa da lista usando o personService, atualizando o state
  //para sumir com o nome removido. Usando filter procurando pelo id da pessoa
  //na lista de pessoas
  const removePerson = (id) => {
    const removedPerson = persons.find((person) => person.id === id);
    personService
      .remove(id)
      .then(() => {
        const updatedPersons = persons.filter((p) => p.id !== id);
        setPersons(updatedPersons);
        //Modifica a mensagem de notificação e faz ela sumir depois de 5 sec
        setNotificationMessage(
          `${removedPerson.name} was removed from the phonebook`
        );
        setTimeout(() => {
          setNotificationMessage(null);
        }, 5000);
      })
      .catch((error) => {
        //Modifica a mensagem de erro e faz ela sumir depois de 5 sec
        setErrorMessage(
          `${removedPerson.name} was already removed from the phonebook`
        );
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
      });
  };

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={notificationMessage} />
      <Notification message={errorMessage} type={"error"} />
      <Filter searchTerm={searchTerm} handleSearch={handleSearch} />
      <PersonForm
        addPerson={addPerson}
        newPerson={newPerson}
        handlePersonChange={handlePersonChange}
      />
      <ContactList personsToShow={personsToShow} removePerson={removePerson} />
    </div>
  );
};

export default App;
