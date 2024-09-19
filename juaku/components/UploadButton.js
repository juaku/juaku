import React, { useState } from 'react';
import { saveCid } from '../lib/gundb';
import { uploadContent } from '../lib/pinata';

const UploadButton = () => {
    const [file, setFile] = useState(null)
    const [cid, setCid] = useState('');


    const handleFileChange = (event) => {
        setFile(event.target.files[0])
    }

    const handleUpload = async () => {
        if (!file) {
            alert('Please select a file first!');
            return;
        }

        try {
            const upload = await uploadContent(file);
            const fileCid = upload.IpfsHash;
            setCid(fileCid);
            console.log('File uploaded:', upload);

            // Save CID to GunDB
            await saveCid(fileCid);
            console.log('CID saved to GunDB:', fileCid);
        } catch (error) {
            console.error('Error uploading file:', error);
        }
    };

    return (
        <div>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleUpload}>Upload to Pinata</button>
            {cid && (
                <div>
                    <h3>Uploaded File CID:</h3>
                    <p>{cid}</p>
                </div>
            )}
        </div>
    )
}

export default UploadButton