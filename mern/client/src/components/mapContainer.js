import React, { useState } from "react";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";

const MapContainer = ({ coordinates, resources, google, handleClick }) => {
  const [infoWindow, setInfoWindow] = useState(null);

  function renderMarkers() {
    return resources.map((location, i) => {
      return (
        <Marker
          key={i}
          title={location.name}
          position={location.coordinates}
          desc={location.description}
          name={location.name}
          onClick={() => {
            setInfoWindow(location);
          }}
        ></Marker>
      );
    });
  }

  return (
    <div className="mapContainer">
    <Map
      google={google}
      zoom={11}
      initialCenter={coordinates}
    >
      {renderMarkers()}
    </Map>
    </div>
  );
};

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_API_KEY,
})(MapContainer);
