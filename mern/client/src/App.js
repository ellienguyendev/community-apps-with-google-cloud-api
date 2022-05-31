import React, { useState, useRef } from 'react'
// We use Route in order to define the different routes of our application
import { Route, Routes } from "react-router-dom";
import Geocode from "react-geocode";

// We import all the components we need in our app
import Button from './components/button'
import Navbar from "./components/navbar";
import RecordList from "./components/recordList";
import Edit from "./components/edit";
import Create from "./components/create";
import SearchInput from './components/SearchInput';

Geocode.setApiKey(process.env.REACT_APP_GOOGLE_API_KEY);

const App = () => {
  const searchForm = useRef(null);

  const handleSearchSubmit = e => {
    e.preventDefault();
    let userLocation = searchForm.current.searchInput.value;

    Geocode.fromAddress(userLocation).then(
      (res) => {
        const { lat, lng } = res.results[0].geometry.location;
        console.log(lat, lng)
      })
  }

  return (
    <div>
      <Navbar />
      <div style={{ margin: 20 }}>
        <Routes>
          <Route exact path="/" element={<RecordList />} />
          <Route path="/edit/:id" element={<Edit />} />
          <Route path="/create" element={<Create />} />
        </Routes>
      </div>
      <form ref={searchForm}>
        <SearchInput
          onChange={() => null}
        />
        <Button
          handleClick={handleSearchSubmit}
          text='Search'
        />
      </form>
    </div>
  );
};

export default App;
