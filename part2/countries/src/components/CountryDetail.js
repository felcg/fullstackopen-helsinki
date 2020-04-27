import React, { useState } from "react";

const CountryDetail = ({ country }) => {
  const [show, setShow] = useState(false);
  return show ? (
    <div>
      <div>
        <h2>{country.name}</h2>
        <p>Capital: {country.capital}</p>
        <p>Population: {country.population}</p>
        <h3>Languages</h3>
        <ul>
          {country.languages.map((language) => (
            <li key={language.name}>{language.name}</li>
          ))}
        </ul>
        <img
          src={country.flag}
          alt={`Flag of ${country.name}`}
          height="150px"
        />
        <button onClick={() => setShow(!show)}>Hide</button>
      </div>
    </div>
  ) : (
    <div>
      <p key={country.name}>{country.name}</p>
      <button onClick={() => setShow(!show)}>Show</button>
    </div>
  );
};

export default CountryDetail;
