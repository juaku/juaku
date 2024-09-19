import React, { useState, useEffect } from 'react'
import pinata from '../lib/pinata'

console.log('Pinata ipfs.js:', pinata)

const IpfsComponent = () => {
  const [id, setId] = useState(null)
  const [isOnline, setIsOnline] = useState(false)

  useEffect(() => {
    const init = async () => {
      try {
          // Simulate fetching ID and status from Pinata
          const response = {cid: ''} //await pinata.gateways.get('bafkreibm6jg3ux5qumhcn2b3flc3tyu6dmlb4xa7u5bf44yegnrjhc4yeq');
          setId(response.cid);
          setIsOnline(true); // Assuming the fetch was successful
      } catch (error) {
          console.error('Error fetching data from Pinata:', error);
          setIsOnline(false);
      }
    };

    init();
  }, [])

  if (!id) {
    return <h4>Starting Helia...</h4>
  }

  return (
    <div>
      <h4 data-test="id">ID: {id.toString()}</h4>
      <h4 data-test="status">Status: {isOnline ? 'Online' : 'Offline'}</h4>
    </div>
  )
}

export default IpfsComponent
