import { useState, useEffect } from 'react'
import { getFeed } from '../lib/gundb';
// import { fetchContent } from '../lib/pinata';

const pinataGateway = process.env.NEXT_PUBLIC_PINATA_GATEWAY;

// const readFromPinata = async (cid) => {
//     try {
//         const data = await pinata.gateways.get(cid);
//         return data;
//     } catch (error) {
//         if (error.response && error.response.status === 404) {
//             console.error('CID not found:', cid);
//         } else {
//             console.error('Error reading file from Pinata:', error);
//         }
//         return null;
//     }
// };

const Feed = () => {
	const [feedItems, setFeedItems] = useState([]);

	useEffect(() => {
		getFeed(async (data) => {
            if (data) {
                console.log('Data fetched from Gundb:', data);
                const dataArray = Array.isArray(data) ? data : [data];
                const processedData = await Promise.all(dataArray.map(async (item) => {
					const itemUrl = `https://${pinataGateway}/ipfs/${item.cid}`;
					const fileType = await fetchFileType(itemUrl);
                    return { itemUrl, fileType };
                }));
                setFeedItems((prevItems) => [...prevItems, ...processedData]);
			}
		});
	}, []);

	const fetchFileType = async (url) => {
        try {
            const response = await fetch(url, { method: 'HEAD' });
            const contentType = response.headers.get('content-type');

			console.log('Content type:', contentType);

            if (contentType.startsWith('image/')) {
                return 'image';
            } else if (contentType.startsWith('video/')) {
                return 'video';
            } else {
                return 'unknown';
            }
        } catch (error) {
            console.error('Error fetching file type:', error);
            return 'unknown';
        }
    };

  return (
	<div>
		{feedItems.map((item, index) => (
			<div key={index}>
				{item.fileType === 'image' && <img src={item.itemUrl} alt="IPFS content" />}
				{item.fileType === 'video' && <video src={item.itemUrl} controls />}
				{item.fileType === 'unknown' && <p>Tipo de archivo desconocido o no soportado.</p>}
			</div>
		))}
	</div>
  )
}

export default Feed