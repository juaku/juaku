// src/components/Feed.tsx
import React, { useState } from 'react';
import { View, Button, Image, StyleSheet, Text, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { createHelia } from 'helia';
import Gun from 'gun/gun';
import 'gun/lib/radix';
import 'gun/lib/radisk';
import 'gun/lib/store';
import 'gun/lib/rindexed';

// Crear instancia de GUN
const gun = Gun();

const UploadButton: React.FC = () => {
  const [cid, setCid] = useState<string | null>(null);
  const [image, setImage] = useState<string | null>(null);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    const helia = await createHelia();

    console.log('helia', helia);

    if (!result.cancelled) {
      setImage(result.uri);
      uploadImage(result.uri);
    }
  };

  const uploadImage = async (uri: string) => {
    try {
      // const response = await fetch(uri);
      // const blob = await response.blob();

      //const helia = await createHelia();
      // Aquí se realiza una operación básica con helia sin usar unixfs
      //const { cid } = await helia.add(blob);

      //setCid(cid.toString());
      //Alert.alert('Upload Successful', `CID: ${cid.toString()}`);

      console.log('helia', createHelia);

    } catch (error) {
      console.error(error);
      Alert.alert('Upload Failed', 'An error occurred while uploading the image.');
    }
  };

  // const uploadToIPFS = async (selectedAsset: string) => {
  //   try {
  //     const formData = new FormData();
  //     formData.append('file', selectedAsset);

  //     const response = await axios.post('https://ipfs.infura.io:5001/api/v0/add', formData, {
  //       headers: {
  //         'Content-Type': 'multipart/form-data',
  //       },
  //     });

  //     setCid(response.data.Hash);
  //     console.log('File uploaded to IPFS with CID:', cid.toString);
  //     console.log('CID:', cid);

  //   } catch (error) {
  //     console.error('Error uploading to IPFS:', error);
  //   }
  // };

  // const saveData = () => {
  //   console.log('Saving data to GUN...');

  //   const node = gun.get('example-node');
  //   const res = node.put({ example: 'data' });
  //   console.log('RES:', res);
  //   Alert.alert('Data saved to GUN');
  //   Alert.alert(res);
  // };

  // const [selectedAsset, setSelectedAsset] = useState<string | null>(null);
  // const [isSending, setIsSending] = useState<boolean>(false);

  // const pickAsset = async () => {
  //   let result = await ImagePicker.launchImageLibraryAsync({
  //     mediaTypes: ImagePicker.MediaTypeOptions.All,
  //     allowsEditing: true,
  //     aspect: [4, 3],
  //     quality: 1,
  //   });

  //   if (!result.canceled && result.assets && result.assets.length > 0) {
  //     setSelectedAsset(result.assets[0].uri);
  //     console.log(result.assets[0].uri);
  //   }
  // };

//   const sendAsset = async () => {
//     if (!selectedAsset) { return; }

//     // uploadToIPFS(selectedAsset);

//     setIsSending(true);

//     const formData = new FormData();

//     const assetUri = selectedAsset;

//     // const base64Data = selectedAsset.split(',')[1]; // Extract base64 data
//     const assetType = selectedAsset.match(/data:([^;]+);/)[1]; // Extract MIME type
//     const fileExtension = assetType.split('/')[1]; // Get file extension from MIME type
//     const fileName = `upload.${fileExtension}`;

//     console.log('assetType', assetType);
//     console.log('fileExtension', fileExtension);
//     console.log('fileName', fileName);

//     formData.append('file', {
//         uri: assetUri,
//         name: fileName,
//         type: assetType,
//     });

//     try {
//         const response = await fetch('http://your-backend-url/upload', {
//             method: 'POST',
//             body: formData,
//         });

//         // Handle response
//         if (response.ok) {
//             console.log('Upload successful');
//         } else {
//             console.error('Upload failed');
//         }
//     } catch (error) {
//         console.error('Error uploading file:', error);
//     } finally {
//         setIsSending(false);
//     }
// };

return (
  <View style={styles.container}>
    <Button title="Upload Photo/Video" onPress={pickImage} />
    {/* {selectedAsset && ( */}
      <View style={styles.previewContainer}>
        <Text style={styles.previewText}>Selected Image/Video:</Text>
        {image && <Image source={{ uri: image }} style={styles.image} />}
        {cid && <Text>CID: {cid}</Text>}
        {/* <Image source={{ uri: selectedAsset }} style={styles.previewImage} /> */}
        {/* <Button title="Upload File" onPress={() => uploadToIPFS(selectedAsset)} /> */}
        {/* {cid && <Text>File CID: {cid}</Text>} */}
        {/* <Button title="Save Data" onPress={saveData} disabled={isSending} /> */}
        {/* {data && <Text>Data: {JSON.stringify(data)}</Text>} */}
      </View>
    {/* )} */}
  </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 20,
  },
  image: {
    width: 200,
    height: 200,
    marginTop: 20,
  },
  previewContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  previewText: {
    marginBottom: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
  previewImage: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
});

export default UploadButton;
