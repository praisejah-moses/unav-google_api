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
      <div id="map"></div>
    )}
    <script src="app.js"></script>
  </>
  )
}
