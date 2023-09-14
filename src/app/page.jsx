'use client'
import { useEffect, useState } from "react";

export default function Home() {
  const [domLoaded, setDomLoaded] = useState(false);

  useEffect(() => {
    setDomLoaded(true);
  }, []);
  return (
    <>
    {domLoaded && (
      <>
        <div id="map-container"></div>

        <div className="waypoint-container" id="controls">
          <input type="text" id="start" placeholder="Starting Location"/>
          <input type="text" id="end" placeholder="Ending Location"/>
          <label>Select Travel Mode:</label>
          <select id="travelMode">
            <option value="DRIVING">Driving</option>
            <option value="WALKING">Walking</option>
            <option value="BICYCLING">Bicycling</option>
            <option value="TRANSIT">Transit</option>
          </select>
          <button id="get_direction-button">Get Directions</button>
        </div>       
      </>
    )}
  </>
  )
}