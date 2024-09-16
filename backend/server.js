// backend/server.js
import express from 'express';
import ipfs from './ipfs.js';
import client from './filecoin.js';
import gun from './gundb.js';
import multer from 'multer';

const upload = multer({ dest: 'uploads/' });

const app = express();
const port = 3000;

app.post('/upload', upload.single('file'), async (req, res) => {
  const file = req.file;
  try {
    const added = await ipfs.add(file);
    const cid = added.path;

    // Guarda el CID en Filecoin
    await client.client.import(cid);

    // Guarda el CID en GunDB
    gun.get('posts').set({ cid });

    res.send({ cid });
  } catch (error) {
    res.status(500).send('Error al procesar el archivo');
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});