import React from "react";

const ContactList = ({ personsToShow, removePerson }) => {
  const confirmRemove = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      removePerson(id);
    }
    return;
  };

  return (
    <div>
      <h2>Contact List</h2>
      {personsToShow.map((person) => (
        <div key={person.id}>
          <p>Name: {person.name}</p>
          <p>Number: {person.number}</p>
          <button onClick={() => confirmRemove(person.id, person.name)}>
            Remove
          </button>
        </div>
      ))}
    </div>
  );
};

export default ContactList;
