import PropTypes from 'prop-types'
import { React, useState, useEffect } from 'react'
import Gun from 'gun';
import '../styles/globals.css'

// Inicializa GunDB
const gun = Gun();

function App ({ Component, pageProps }) {
  const [cids, setCids] = useState([]);

  useEffect(() => {
    // Escucha cambios en la lista de feeds en GunDB
    const feedRef = gun.get('feed');
    feedRef.map().on((cid) => {
      setCids((prevCids) => [...prevCids, cid]);
    });
  }, []);

  const handleUpload = (newCids) => {
    const feedRef = gun.get('feed');
    newCids.forEach((cid) => {
      feedRef.set(cid);
    });
  };

  return <Component {...pageProps} gun={gun} cids={cids} onUpload={handleUpload} />;
}

App.propTypes = {
  Component: PropTypes.func,
  pageProps: PropTypes.object
}

export default App
