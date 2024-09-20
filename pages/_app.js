import PropTypes from 'prop-types'
import { React, useState, useEffect } from 'react'
import '../styles/globals.css'

function App ({ Component, pageProps }) {
  // const [cids, setCids] = useState([]);

  // useEffect(() => {
  //   // Escucha cambios en la lista de feeds en GunDB
  //   // const feedRef = gun.get('feed');
  //   // feedRef.map().on((cid) => {
  //   //   setCids((prevCids) => [...prevCids, cid]);
  //   // });
  // }, []);

  // const handleUpload = (newCids) => {
  //   const feedRef = gun.get('feed');
  //   newCids.forEach((cid) => {
  //     feedRef.set(cid);
  //   });
  // };

  return <Component {...pageProps} />;
}

App.propTypes = {
  Component: PropTypes.func,
  pageProps: PropTypes.object
}

export default App
