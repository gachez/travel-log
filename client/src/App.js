import React, {useState, useEffect} from 'react';
import ReactMapGL from 'react-map-gl';

import {listLogEntries} from './API'

function App() {
 
  const [viewport, setViewport] = useState({
    width: '100vw',
    height: '100vh',
    latitude: -1.29015,
    longitude: 36.8082,
    zoom: 10
  });

  useEffect(() =>{
    (async () => {
      const logEntries = await listLogEntries();
      console.log(logEntries)
    })();
  }, [])

  return (
    <ReactMapGL
      mapStyle="mapbox://styles/gachez/ck6qey7i71wuf1imfkizw8jfc"
      {...viewport}
      onViewportChange={setViewport}
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
    />
  );
}

export default App;
