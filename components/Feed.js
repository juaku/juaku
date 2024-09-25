import { useState, useEffect } from 'react'
import { getFeed } from '../lib/gundb';
import styles from '../styles/Feed.module.css'

const pinataGateway = process.env.NEXT_PUBLIC_PINATA_GATEWAY;

const Feed = () => {
	const [feedItems, setFeedItems] = useState([]);
    const [activeVideo, setActiveVideo] = useState(null);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [isBlocked, setIsBlocked] = useState(false);

    const loadMoreFeed = async () => {
        setLoading(true);

        console.log('Page:', page);

		getFeed(page, 5, async (data) => {
            if (data) {
                const dataArray = Array.isArray(data) ? data : [data];
                const processedData = await Promise.all(dataArray.map(async (item) => {
					const itemUrl = `https://${pinataGateway}/ipfs/${item.cid}`;
					const fileType = await fetchFileType(itemUrl);
                    return { itemUrl, fileType, username: item.username };
                }));
                setFeedItems((prevItems) => [ ...prevItems, ...processedData ]);
			}
            setLoading(false); //*
        });
    };

	useEffect(() => {
        loadMoreFeed();
	}, [page]);

    const handleScroll = () => {
        const scrollThreshold = 200;
        if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - scrollThreshold && !loading && !isBlocked) {
            setPage(page + 1);
            console.log('End of the page', page);
            setIsBlocked(true);
            setTimeout(() => {
                setIsBlocked(false);
            }, 500);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [loading, isBlocked]);

    const handleVideoClick = (event) => {
        if (activeVideo && activeVideo !== event.target) {
          activeVideo.muted = true;
        }
        event.target.muted = !event.target.muted;
        setActiveVideo(event.target);
      };    

  return (
	<div>
		{feedItems.map((item, index) => (
            item.fileType !== 'unknown' ? (
                <div key={index} className={styles.post}>
                    {item.fileType === 'image' && <img src={item.itemUrl} alt="IPFS content" />}
                    {item.fileType === 'video' && 
                        <video src={item.itemUrl} autoPlay muted loop playsInline onClick={handleVideoClick} />}
                    {/* {item.fileType === 'unknown' && <p>Tipo de archivo desconocido o no soportado.</p>} */}
                    <div className={styles.info} >
                        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/wcAAwAB/ax5LIAAAAASUVORK5CYII" alt="User" className={ styles.user } />
                        <p>{item.username}</p>
                    </div>
                </div>
            ) : null
		))}
        {loading && <p>Loading...</p>}
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
