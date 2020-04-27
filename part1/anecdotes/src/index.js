import React, { useState } from "react";
import ReactDOM from "react-dom";

const Anecdote = ({ text, points }) => (
  <div>
    {text} {points}
  </div>
);

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}> {text} </button>
);

const App = (props) => {
  const [selected, setSelected] = useState(0);
  const anecdotes = [
    "If it hurts, do it more often",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
  ];
  const [points, setPoint] = useState(
    Array.apply(null, new Array(anecdotes.length)).map(
      Number.prototype.valueOf,
      0
    )
  );

  const chooseAnecdote = (number, setSelected) => () => {
    const selected = Math.floor(Math.random() * Math.floor(number));
    setSelected(selected);
  };

  const voteAnecdote = (selected) => () => {
    const copy = [...points];
    copy[selected] += 1;
    setPoint(copy);
  };

  const maxVoted = Math.max(...points);
  const topAnecdote = points.indexOf(maxVoted);

  return (
    <div>
      <h1>Anecdotes</h1>
      <Anecdote text={anecdotes[selected]} points={points[selected]} />
      <Button
        handleClick={chooseAnecdote(anecdotes.length, setSelected)}
        text={"Get random anecdote"}
      />
      <Button handleClick={voteAnecdote(selected)} text={"Vote"} />

      <h1>Anecdote with the most votes</h1>
      <Anecdote text={anecdotes[topAnecdote]} points={points[topAnecdote]} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
