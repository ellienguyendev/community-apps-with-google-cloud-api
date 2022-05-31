import React, { useState, useRef } from 'react'
// We use Route in order to define the different routes of our application
import { Route, Routes } from "react-router-dom";

// We import all the components we need in our app
import Create from "./components/create";
import Edit from "./components/edit";
import Footer from "./components/footer";
import Hero from "./components/hero";
import Navbar from "./components/navbar";
import RecordList from "./components/recordList";
import FindResource from './components/findResource';


const App = () => {
  return (
    <div>
      <Navbar />
      <Hero 
        heading= "Example App"
        subHeading= "Resources in San Diego, CA"
        bgImgUrl = "https://i.postimg.cc/8PGB5mg7/laptop-mushroom.jpg"
      />
      <div style={{ margin: 50 }}>
        <Routes>
        <Route path="/" element={<FindResource />} />
          <Route path="/create" element={<Create />} />
          <Route path="/viewAll" element={<RecordList />} />
          <Route path="/edit/:id" element={<Edit />} />
        </Routes>
      </div>

      <Footer />
    </div>
  );
};

export default App;
