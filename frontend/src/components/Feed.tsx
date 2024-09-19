// src/components/Feed.tsx
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
// import axios from 'axios';
import Post from './Post';
// import { initializeIPFS } from '../services/ipfsService';
import { initializeGun } from '../services/gunService';

const Feed: React.FC = () => {
    const [posts, setPosts] = useState([]);
    // const [ipfs, setIpfs] = useState<any>(null);
    // const [gun, setGun] = useState<any>(null);

    useEffect(() => {
        const setupServices = async () => {
            // const ipfsInstance = await initializeIPFS();
            // setIpfs(ipfsInstance);

            const gunInstance = initializeGun();
            // setGun(gunInstance);
        };

        setupServices();
    }, []);

    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const response = await axios.get('http://your-backend-url/api/posts');
    //             setPosts(response.data);

    //             if (ipfs) {
    //                 // Example of fetching data from IPFS
    //                 const ipfsData = await ipfs.cat('QmYourIpfsHash');
    //                 console.log('IPFS Data:', new TextDecoder().decode(ipfsData));
    //             }

    //             if (gun) {
    //                 // Example of fetching data from Gun
    //                 gun.get('posts').once((data: any) => {
    //                     console.log('Gun Data:', data);
    //                 });
    //             }
    //         } catch (error) {
    //             console.error(error);
    //         }
    //     };

    //     fetchData();
    // }, [ipfs, gun]);

    return (
        <ScrollView style={styles.container}>
            {posts.map((post, index) => (
                <Post key={index} data={post} />
            ))}
        </ScrollView>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
});

export default Feed;
