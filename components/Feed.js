import { useState, useEffect } from 'react'
import { getFeed } from '../lib/gundb';
import styles from '../styles/Feed.module.css'

const pinataGateway = process.env.NEXT_PUBLIC_PINATA_GATEWAY;

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
                    return { itemUrl, fileType, username: item.username };
                }));
                setFeedItems((prevItems) => [...processedData, ...prevItems]);
			}
		});
	}, []);

  return (
	<div>
		{feedItems.map((item, index) => (
			<div key={index} className={styles.post}>
				{item.fileType === 'image' && <img src={item.itemUrl} alt="IPFS content" />}
				{item.fileType === 'video' && <video src={item.itemUrl} autoPlay muted loop playsInline />}
				{item.fileType === 'unknown' && <p>Tipo de archivo desconocido o no soportado.</p>}
                <div className={styles.info} >
                    <img src="" alt="User" className={ styles.user } />
                    <p>{item.username}</p>
                </div>
			</div>
		))}
	</div>
  )
}

export default Feed

export const fetchFileType = async (url) => {
    try {
        const response = await fetch(url, { method: 'HEAD' });
        const contentType = response.headers.get('content-type');
        return getContentType(contentType);
    } catch (error) {
        console.error('Error fetching file type:', error);
        return 'unknown';
    }
};

export const getContentType = async (contentType) => {
    if (contentType.startsWith('image/')) {
        return 'image';
    } else if (contentType.startsWith('video/')) {
        return 'video';
    } else {
        return 'unknown';
    }
}
