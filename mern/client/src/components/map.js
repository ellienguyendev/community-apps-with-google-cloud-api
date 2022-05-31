// import React, { useState } from "react"
// import { GoogleMap, Marker, InfoWindow } from "react-google-maps"

// const Map = props => {
//   const [infoWindow, setInfoWindow] = useState(null)
// console.log(props.coordinates)

//   return (
//     <div>
//       <GoogleMap
//         defaultZoom={10}
//         defaultCenter={{
//           lat: props.coordinates.lat,
//           lng: props.coordinates.lng,
//         }}
//       >
//         {props.mongoData.map(event => (
//           <Marker
//             key={event.node.id}
//             icon={{
//               url: 'https://i.pinimg.com/originals/22/11/f8/2211f8cc5b35a7cd807586328bc33e35.png',
//               scaleSize: new window.google.maps.Size(20, 20),
//             }}
//             onMouseOver={() => {
//               setInfoWindow(event.node)
//             }}
//             onClick={() => {
//               props.setmodal(true)
//               props.setMapData(event.node)
//             }}
//             position={{
//               lat: event.node.coordinates.lat,
//               lng: event.node.coordinates.lng,
//             }}
//           />
//         ))}
//         {infoWindow ? (
//           <InfoWindow
//             key={infoWindow.id}
//             position={{
//               lat: infoWindow.coordinates[0] + 0.01,
//               lng: infoWindow.coordinates[1] + 0.01,
//             }}
//             onCloseClick={() => setInfoWindow(null)}
//           >
//             <div>
//               <img
//                 className="w-15 h-12 mb-2"
//                 src={infoWindow.images[0]}
//                 style={{ width: "200px", height: "100px" }}
//               />
//               <h2 className="text-sm mb-3" style={{ fontFamily: "Gentium Basic" }}>
//                 {`${infoWindow.name}`}
//               </h2>
//               <p className="text-sm" style={{ fontFamily: "Gentium Basic" }}>
//                 {infoWindow.description}
//               </p>
//             </div>
//           </InfoWindow>
//         ) : null}
//       </GoogleMap>
//     </div>
//   )
// }

// export default Map