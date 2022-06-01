import React, { useState, useEffect, useRef } from "react";
import Geocode from "react-geocode";

import Button from "./button";
import Event from "./event";
import MapContainer from "./mapContainer";
import SearchForm from "./searchForm";

Geocode.setApiKey(process.env.REACT_APP_GOOGLE_API_KEY);

function FindResource() {
  let form = useRef(null);
  let [mapData, setMapData] = useState(null);
  let [isLoading, setLoading] = useState(true);
  let [coordinates, setCoordinates] = useState(null);
  let [matchingLocations, setMatchingLocations] = useState(null);

  // <!-- function to check radius of user to see if locations fall within radius -->
  const arePointsNear = (checkPoint, centerPoint, miles) => {
    let km = miles * 1.60934;
    let ky = 40000 / 360;
    let kx = Math.cos((Math.PI * centerPoint.lat) / 180.0) * ky;
    let dx = Math.abs(centerPoint.lng - checkPoint.lng) * kx;
    let dy = Math.abs(centerPoint.lat - checkPoint.lat) * ky;
    return Math.sqrt(dx * dx + dy * dy) <= km;
  };

  const getResouces = (userCoords, radius, category) => {
    console.log(userCoords);
    fetch("http://localhost:5000/record", {
      method: "get",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) return response.json();
      })
      .then((data) => {
        let withinRadius = [];

        data.forEach((resource) => {
          let resourceCoords = resource.coordinates;
          let checkMatch = arePointsNear(resourceCoords, userCoords, radius);
          if (checkMatch) {
            withinRadius.push(resource);
          }
        });
        setMatchingLocations(withinRadius);
        setLoading(false);
      });
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    let userLocation = form.current.searchForm.value;
    let radius = form.current.radius.value;
    let category = "all";

    Geocode.fromAddress(userLocation).then((res) => {
      let userCoords = res.results[0].geometry.location;
      setCoordinates(userCoords);
      getResouces(userCoords, radius, category);
    });
  };

  function renderList() {
    return matchingLocations.map((rsc, i) => {
      return (
        <Event
          name={rsc.name}
          address={rsc.address}
          phone_number={rsc.phone_number}
          description={rsc.description}
          category={rsc.category}
          website_url={rsc.website_url}
          image_url={rsc.image_url}
        ></Event>
      );
    });
  }

  if (isLoading) {
    return (
      <div className="search-location-input form-group">
        <form ref={form}>
          <SearchForm
            label="Enter a City or Zip Code to Find Resources Near You"
            placeholder="City or Zip Code"
            id="userSearch"
          />
          <Button handleClick={handleSearchSubmit} text="Search" />
        </form>
      </div>
    );
  } else {
    return (
      <div className="mainContainer">
        <h1>Resources Near You</h1>

        <MapContainer
          google={window.google}
          coordinates={coordinates}
          resources={matchingLocations}
        />

        <section className="resourceList">{renderList()}</section>
      </div>
    );
  }
}

export default FindResource;
