import React from "react";
import CountryDetail from "./CountryDetail";

const CountryList = ({ countries, searchTerm }) => {
  const countriesToShow = countries.filter((country) =>
    country.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (searchTerm === "") {
    return <p>Please type something</p>;
  } else if (countriesToShow.length > 10) {
    return <p>Too many matches, specify another filter</p>;
  }

  return (
    <>
      {countriesToShow.map((country) => (
        <CountryDetail key={country.name} country={country} show={false} />
      ))}
    </>
  );
};

export default CountryList;
