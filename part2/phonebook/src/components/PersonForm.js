import React from "react";

const PersonForm = ({ addPerson, newPerson, handlePersonChange }) => {
  return (
    <div>
      <h2>Add a new person to the book.</h2>
      <form onSubmit={addPerson}>
        <div>
          name:{" "}
          <input
            name="name"
            value={newPerson.name}
            onChange={handlePersonChange}
          />
          number:{" "}
          <input
            name="number"
            value={newPerson.number}
            onChange={handlePersonChange}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  );
};

export default PersonForm;
