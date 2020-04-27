import React from "react";
import Header from "./Header.js";
import Content from "./Content.js";
import Total from "./Total.js";

const Course = ({ course }) => {
  return course.map((course) => (
    <div key={course.id}>
      <Header course={course} />
      <Content parts={course.parts} />
      <Total parts={course.parts} text="The total of exercises is " />
    </div>
  ));
};

export default Course;
