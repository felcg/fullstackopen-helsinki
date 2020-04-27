import React, { useState, useEffect } from "react";
import axios from "axios";
import CountryList from "./components/CountryList";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    axios
      .get("https://restcountries.eu/rest/v2/all")
      .then((response) => setCountries(response.data));
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div>
      Find Countries <input onChange={handleSearch}></input>
      <CountryList countries={countries} searchTerm={searchTerm} />
    </div>
  );
};

export default App;
