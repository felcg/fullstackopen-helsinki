import React from "react";

const Notification = ({ message, type }) => {
  const notificationStyle = {
    color: "green",
    fontStyle: "italic",
    fontSize: 20,
    background: "white",
  };

  const errorStyle = {
    color: "red",
    fontStyle: "italic",
    fontSize: 20,
    background: "black",
  };
  if (message === null) {
    return null;
  }

  if (type === "error") {
    return <div style={errorStyle}>{message}</div>;
  }

  return <div style={notificationStyle}>{message}</div>;
};

export default Notification;
