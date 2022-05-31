import React, { useState, useEffect, useRef } from "react";
import Geocode from "react-geocode";
import { withGoogleMap, withScriptjs } from 'react-google-maps'

import Button from "./button";
import Event from "./event";
import Map from "./map";
import SearchForm from "./searchForm";

const MapComponent = withScriptjs(withGoogleMap(Map));

Geocode.setApiKey(process.env.REACT_APP_GOOGLE_API_KEY);

function FindResource() {
  const form = useRef(null);
  const [mapData, setMapData] = useState(null)
  const [coordinates, setCoordinates] = useState(null)
  const [matchingLocations, setMatchingLocations] = useState(null)


  // <!-- function to check radius of user to see if locations fall within radius -->
  const arePointsNear = (checkPoint, centerPoint, miles) => {
    let km = miles * 1.60934
    let ky = 40000 / 360;
    let kx = Math.cos((Math.PI * centerPoint.lat) / 180.0) * ky;
    let dx = Math.abs(centerPoint.lng - checkPoint.lng) * kx;
    let dy = Math.abs(centerPoint.lat - checkPoint.lat) * ky;
    return Math.sqrt(dx * dx + dy * dy) <= km;
  }

  const handleSearchSubmit = e => {
    e.preventDefault();
    let userLocation = form.current.searchForm.value;
    let radius = form.current.radius.value;
    let category = form.current.category.value;
    let withinRadius = []
    let userCoords

    Geocode.fromAddress(userLocation).then(
      (res) => {
        userCoords = res.results[0].geometry.location;
        setCoordinates({lat: userCoords.lat, lng: userCoords.lng})

        fetch("http://localhost:5000/record", {
          method: "get",
          headers: {
            "Content-Type": "application/json",
          }
        })
          .then(response => {
            console.log(response)
            if (response.ok) return response.json()
          })
          .then(data => {
            //code to check matches within radius & category
            data.forEach(resource => {
              let resourceCoords = resource.coordinates
              let checkRadius = arePointsNear(resourceCoords, userCoords, radius)
              if (checkRadius) {
                withinRadius.push(resource)
              }
            })

          })
          .catch(error => {
            window.alert(error);
            return;
          });
      })
      console.log(coordinates)

  }


  return (
    <div>
      <div className="search-location-input form-group">
        <form ref={form}>
          <SearchForm
            label="Enter a City or Zip Code to Find Resources Near You"
            placeholder="City or Zip Code"
            id="userSearch"
          />
          <Button
            handleClick={handleSearchSubmit}
            text='Search'
          />
        </form>
      </div>



      <div>


      </div>

    </div>
  );
}

export default FindResource;