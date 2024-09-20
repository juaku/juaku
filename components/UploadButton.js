import React, { useState, useEffect } from 'react';
import { saveCid } from '../lib/gundb';
import { uploadContent } from '../lib/pinata';
import { useUpload } from '../context/Context';
import { getContentType } from './Feed';
import styles from '../styles/Upload.module.css';

const UploadButton = ({ onUploadStart, onUploadEnd, isComposing }) => {
    const [file, setFile] = useState(null)
    const [fileType, setFileType] = useState(null)
    const [cid, setCid] = useState('');
    const [username, setUsername] = useState('');
    const [preview, setPreview] = useState(null);
    const [isUploading, setIsUploading] = useState(false);

    const { fileInputRef } = useUpload();

    useEffect(() => {
        const savedUsername = localStorage.getItem('username');
        if (savedUsername) {
            setUsername(savedUsername);
        }
    }, []);

    const handleFileChange = async (event) => {
        onUploadStart();
        console.log('File selected:', event.target.files[0]);   
        const file = event.target.files[0];
        if (file) {
            const fileType = await getContentType(file.type);
            console.log('File:', file);
            const preview = URL.createObjectURL(file);

            setFile(file)
            setFileType(fileType)
            setPreview(preview)
        }
    }

    const handleUsernameChange = (event) => {
        const newUsername = event.target.value;
        setUsername(event.target.value);
        localStorage.setItem('username', newUsername);
    };

    const handleUpload = async () => {
        if (!file) {
            alert('Please select a file first!');
            return;
        }

        setIsUploading(true);
        try {
            const upload = await uploadContent(file);
            const fileCid = upload.IpfsHash;
            setCid(fileCid);
            console.log('File uploaded:', upload);

            // Save CID to GunDB
            await saveCid({ cid: fileCid, username });
            console.log('CID saved to GunDB:', fileCid);
        } catch (error) {
            console.error('Error uploading file:', error);
        } finally {
            setIsUploading(false);
        }
        onUploadEnd();
    };

    const handleCancel = () => {
        setIsUploading(false);
        onUploadEnd();
      };

    return (
        <div>
            <input type="file" ref={fileInputRef} onChange={handleFileChange} className={ styles.fileSelector }/>
            {isComposing && (
                <div>
                    <h2>Completar publicación:</h2>
                    <div className={ styles.preview }>
                        {/* <img src={preview} alt="File Preview" style={{ maxWidth: '100%' }} /> */}
                        {fileType === 'image' && <img src={preview} alt="IPFS content" />}
                        {fileType === 'video' && <video src={preview} autoPlay muted loop playsInline />}
                        {fileType === 'unknown' && <p>Tipo de archivo desconocido o no soportado.</p>}
                    </div>
                    <label htmlFor="username">Usuario:</label>{' '}
                    <input
                        type="text"
                        autoCapitalize="none"
                        autoCorrect="off"
                        spellCheck="false"
                        autoComplete="off"
                        placeholder=""
                        value={username}
                        onChange={handleUsernameChange}
                    />{' '}
                    <button onClick={handleUpload}>Subir publicación</button>{' '}
                    {isUploading && <p>Subiendo...</p>}
                    {/* {cid && (
                        <div>
                            <h3>Uploaded File CID:</h3>
                            <p>{cid}</p>
                        </div>
                    )} */}
                    {!isUploading && <button onClick={handleCancel}>Cancelar</button>}
                </div>
            )}
            
        </div>
    )
}

export default UploadButton