(g=>{var h,a,k,p="The Google Maps JavaScript API",c="google",l="importLibrary",q="__ib__",m=document,b=window;b=b[c]||(b[c]={});var d=b.maps||(b.maps={}),r=new Set,e=new URLSearchParams,u=()=>h||(h=new Promise(async(f,n)=>{await (a=m.createElement("script"));e.set("libraries",[...r]+"");for(k in g)e.set(k.replace(/[A-Z]/g,t=>"_"+t[0].toLowerCase()),g[k]);e.set("callback",c+".maps."+q);a.src=`https://maps.${c}apis.com/maps/api/js?`+e;d[q]=f;a.onerror=()=>h=n(Error(p+" could not load."));a.nonce=m.querySelector("script[nonce]")?.nonce||"";m.head.append(a)}));d[l]?console.warn(p+" only loads once. Ignoring:",g):d[l]=(f,...n)=>r.add(f)&&u().then(()=>d[l](f,...n))})({
  key: "AIzaSyD15dTnDanjeev2aJpSwDKeyCPDEiptVrk",
  ibraries:['places','routes'],
  v: "weekly",
});

let map
let directionsDisplay 

async function initMap() {
  const { Map } = await google.maps.importLibrary("maps");
  const {DirectionsRenderer} = await google.maps.importLibrary("routes")

  directionsDisplay = new DirectionsRenderer
   
  const uniben_bounds={
    north: 6.40684,
    south: 6.39624,
    west: 5.60875,
    east: 5.63325,
  }
  map = new Map(document.getElementById("map-container"), {
    center: { lat: 6.40010, lng: 5.61399 },
    zoom: 18,
    restriction: {
      latLngBounds: uniben_bounds,
      strictBounds: false,
    },
  });

  const autoComplete = await google.maps.importLibrary("places")
  initAutoComplete(autoComplete)

  const calculateButton = document.getElementById('get_direction-button')

  calculateButton.addEventListener('click', calculateDirections)
  directionsDisplay.setMap(map); 
  
  const infoWindow = new google.maps.InfoWindow();

    const locationButton = document.createElement("button");

    locationButton.textContent = "Pan to Current Location";
    locationButton.classList.add("custom-map-control-button");
    map.controls[google.maps.ControlPosition.TOP_CENTER].push(locationButton);
  
    locationButton.addEventListener("click", () => {
      // Try HTML5 geolocation.
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            };
  
            infoWindow.setPosition(pos);
            infoWindow.setContent("Location found.");
            infoWindow.open(map);
            map.setCenter(pos);
          },
          () => {
            handleLocationError(true, infoWindow, map.getCenter());
          },
        );
      } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
      }
    });

}

async function initAutoComplete(autoComplete){
  const defaultBounds= {
    north: 6.40684,
    south: 6.39624,
    west: 5.60875,
    east: 5.63325,
  }
  const options = {
    bounds: defaultBounds
  }
  const autoStart = new autoComplete.Autocomplete(
    document.getElementById('start'),options
  )
  const autoEnd = new autoComplete.Autocomplete(
    document.getElementById('end'),options
  )
}

  
async function calculateDirections() {
  const {DirectionsService} = await google.maps.importLibrary("routes")

  const startLocation = document.getElementById('start').value;
  const endLocation = document.getElementById('end').value;
  const selectedMode = document.getElementById('travelMode').value;

  const directionService = new DirectionsService

  const data ={
    "origin":{
      "address": startLocation
    },
    "destination":{
      "address": endLocation
    },
    "travelMode": selectedMode
}

  const options = {
    method: "POST",
    mode: "cors",
    headers:{
      'X-Goog-Api-Key':'AIzaSyD15dTnDanjeev2aJpSwDKeyCPDEiptVrk',
      'X-Goog-FieldMask':'routes.polyline.encodedPolyline',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }
  let request ={
    origin: startLocation,
    destination:endLocation,
    travelMode:selectedMode,
  }
  
  directionService.route(request, function(response,status){
    console.log(response)
    if(status === 'OK'){
      directionsDisplay.setDirections(response)
    }
  })

  // const response = await fetch("https://routes.googleapis.com/directions/v2:computeRoutes",options);
  // const poly = await response.text();
  // JSON.stringify()  
  // directionsDisplay.setDirections(JSON.stringify(poly));
}



  window.onload = function () {
    setTimeout(() => {
      initMap();
    },1000)
  };

