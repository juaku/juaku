// pinata.js
import { PinataSDK } from 'pinata-web3';

const pinata = new PinataSDK({
  pinataJwt: process.env.NEXT_PUBLIC_PINATA_JWT,
  pinataGateway: process.env.NEXT_PUBLIC_PINATA_GATEWAY,
});

export default pinata;

// export async function fetchContent(item) {
//     try {
//         console.log('Fetching content from Pinata:', item.cid);
//         console.log(pinata, pinata);

//         const response = await fetch(pinata.gateways.get(item.cid));
//         if (!response.ok) {
//             if (response.status === 404) {
//                 console.error('Content not found (404) for CID:', item.cid);
//                 return { ...item, content: null };
//             }
//             throw new Error(`HTTP error! status: ${response.status}`);
//         }

//         const content = await response.json();
//         console.log('Content fetched from Pinata:', content);
//         return { ...item, content };
//     } catch (error) {
//         console.error('Error fetching content from Pinata:', error);
//         return { ...item, content: null };
//     }
// }

export async function uploadContent(file) {
    return pinata.upload.file(file)
}