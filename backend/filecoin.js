// backend/filecoin.js
import pkg from 'filecoin.js';
const { LotusClient, HttpJsonRpcConnector } = pkg;

// Configurar el conector HTTP JSON-RPC
const connector = new HttpJsonRpcConnector({ url: 'https://api.node.glif.io' });

// Crear una instancia de LotusClient con el conector
const client = new LotusClient(connector);

export default client;