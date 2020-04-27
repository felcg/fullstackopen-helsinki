import React from "react";

const Content = ({ parts }) => {
  return parts.map((part) => (
    <div key={part.id}>
      <p>
        {part.name} {part.exercises}
      </p>
    </div>
  ));
};

export default Content;
