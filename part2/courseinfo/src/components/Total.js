import React from "react";

const Total = ({ parts, text }) => {
  return (
    <strong>
      {text +
        parts.reduce((sum, parts) => {
          return sum + parts.exercises;
        }, 0)}
    </strong>
  );
};

export default Total;
