import React, {useState, useEffect} from 'react';
import ReactMapGL, {Marker, Popup} from 'react-map-gl';
import place from './img/placeholder.svg';
import addplace from './img/maps-and-flags.png';
import LogEntryForm from './LogEntryForm'
import {Navbar} from 'react-bootstrap'

import {listLogEntries} from './API';

const  App = () => {
  const [logEntries, setLogEntries] = useState([]);
  const [showPopup, setShowPopup] = useState({});
  const [addEntryLocation, setAddEntryLocation] = useState(null);
  const [viewport, setViewport] = useState({
    width: '100vw',
    height: '100vh',
    latitude: -1.29015,
    longitude: 36.8082,
    zoom: 3
  });

  useEffect(() =>{
    (async () => {
      const logEntries = await listLogEntries();
      setLogEntries(logEntries);
    })();
  }, []);

  const showAddMarkerPopup = (event) => {
    const [ longitude, latitude] = event.lngLat;
    setAddEntryLocation({
      latitude,
      longitude,
    })
  };

  return (
   <div>
  <Navbar bg="dark">
    <Navbar.Brand href="#home" style={{color: 'white'}}>Mapit</Navbar.Brand>

  </Navbar>


  <ReactMapGL
      mapStyle="mapbox://styles/gachez/ck6qey7i71wuf1imfkizw8jfc"
      {...viewport}
      onViewportChange={setViewport}
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
      onDblClick={showAddMarkerPopup}
    >
      {
        logEntries.map(entry => (
          <React.Fragment  key={entry._id}>
          <Marker 
           
            latitude={entry.latitude} 
            longitude={entry.longitude}
            offsetLeft={-12} 
            offsetTop={-24}
            >
          <img 
            alt="location" 
            src={place} 
            width="24px" 
            height="24px"
            onClick = {() => setShowPopup({
              [entry._id]: true
            })}
          />
        </Marker>
        {
          showPopup[entry._id] ? (
            <Popup
            className="popup"
            style={{maxWidth: '300px'}}
            latitude={entry.latitude}
            longitude={entry.longitude}
            closeButton={true}
            closeOnClick={false}
            dynamicPosition={true}
            onClose={() => setShowPopup({})}
            anchor="top" >
            <div>
              <h3>{entry.title}</h3>
              <img alt="location img" src={entry.image} width="200px" height= "200px"/>
              <p>{entry.comments}</p>
              <small>Visited on: {new Date(entry.visitDate).toLocaleDateString()}</small>
            </div>
        </Popup> 
          ): null
        }
      </React.Fragment>
    
        ))
      }
      {
        addEntryLocation ? (
          <React.Fragment>
            <Marker 
                
                latitude={addEntryLocation.latitude} 
                longitude={addEntryLocation.longitude}
                offsetLeft={-12} 
                offsetTop={-24}
                >
              <img 
                alt="location" 
                src={addplace} 
                width="24px" 
                height="24px"
             
              />
            </Marker>
            <Popup
              style={{maxWidth: '300px'}}
              latitude={addEntryLocation.latitude}
              longitude={addEntryLocation.longitude}
              closeButton={true}
              closeOnClick={false}
              dynamicPosition={true}
              onClose={() => setAddEntryLocation(null)}
              anchor="top" >
              <div>
                <LogEntryForm />
              </div>
            </Popup> 
          </React.Fragment>
         

        ) : null
      }
    </ReactMapGL>  
   </div>
  
  );
}

export default App;
