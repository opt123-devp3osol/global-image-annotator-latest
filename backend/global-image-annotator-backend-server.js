import express from 'express';
import { Server } from 'socket.io'; // Import Socket.IO Server
import http from 'http';
import cors from 'cors';
import path from 'path';
import fs from 'fs';
import {actionToUpdateImageAnnotatorJsonFile} from "./helper/ImageAnnotationBackendHelper.js";

const app = express();
app.use(cors());
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  return next();
});
app.use(express.urlencoded({ extended: true, limit: '250mb' }));
app.use(express.json({ limit: '250mb' }));
const __dirname = path.resolve();

const clients = {};
const port = 7000;
const host = 'localhost';

// Initialize the HTTP server
const server = http.createServer(app);

// Initialize Socket.IO server
const io = new Server(server, {
  path: '/global-editor-api/socket.io', // Ensure this path matches the client-side
  transports: ['websocket'], // WebSocket only
  cors: {
    origin: '*', // Set appropriate CORS settings
    methods: ['GET', 'POST'],
  }
});

const globalEditorNamespace = io.of('/global-editor-api');

// Function to get a unique client ID
function getUniqueID() {
  return "client_" + Math.random().toString(36).substr(2, 9);
}

// Broadcast a message to all clients except the sender
const sendMessage = (jsonData, socket) => {
  socket.broadcast.emit("message", jsonData);
};

// Setup Socket.IO connection and event listeners
globalEditorNamespace.on('connection', (socket) => {
  const userID = getUniqueID();
  clients[userID] = socket;

  // Listen for the client to join a room
  socket.on("joinRoom", (mainEditorDocumentId) => {
    console.log(`Client ${userID} joining room: ${mainEditorDocumentId}`);
    socket.join(mainEditorDocumentId); // Make the client join the room based on the channel ID
  });

  // Listen for incoming messages
  socket.on('message', (binaryMessage) => {
    try {
      // Convert binary data back to JSON string
      const jsonString = binaryMessage.toString();
      const jsonData = JSON.parse(jsonString);

      const { mainEditorDocumentId,type,payload } = jsonData; // Assuming messages have a channel ID

      if(type === 'actionToUpdateImageAnnotatorDoc'){
        actionToUpdateImageAnnotatorJsonFile(mainEditorDocumentId,payload)
      }

      // Send the message to everyone else in the room (except the sender)
      socket.to(mainEditorDocumentId).emit('message', binaryMessage);
    } catch (error) {
      console.error('Error parsing binary message:', error);
    }
  });

  // Handle disconnection
  socket.on("disconnect", () => {
    delete clients[userID];
  });
});


app.post('/global-editor-api/ationTouploadFabricAnnotatorJsonFileApiCall', (req, res) => {
  const { jsonStringData,id } = req.body;
  if (!jsonStringData) {
    return res.status(400).json({ message: 'No text data received' });
  }
  // Define the path to the file
  const filePath = path.join(`${__dirname}/public_data/fabric_annotation_json_${id}.txt`);
  // Write the text data to the file
  fs.writeFile(filePath, jsonStringData, (err) => {
    if (err) {
      console.error('Error writing to file:', err);
      return res.status(500).json({ message: 'Failed to write data to file' });
    }
    res.json({ message: 'Text data written to file successfully' });
  });
});

app.post('/global-editor-api/actionToValidateImageJsonDataAnnotatorApiCall', (req, res) => {
  const { fabRicJsonObject,imageUniqueName } = req.body;
  if (!imageUniqueName) {
    return res.status(400).json({ message: 'No doc id data received' });
  }
  let jsonObjectName = `fabric_annotation_json_${imageUniqueName}.txt`;
  const filePath = path.join(`${__dirname}/public_data/${jsonObjectName}`);
  if (!fs.existsSync(filePath)) {
    fs.writeFile(filePath, fabRicJsonObject, (err) => {
      if (err) {
        return res.status(500).json({ message: 'Failed to create the file.' });
      }
      // Send the created file to the client
      res.sendFile(filePath, (err) => {
        if (err) {
          console.error('Error sending file:', err);
          res.status(500).send('Failed to send the file.');
        }
      });
    });
  }else{
    res.sendFile(filePath, (err) => {
      if (err) {
        console.error('Error sending file:', err);
        res.status(500).send('Failed to send the file.');
      }
    });
  }
});

app.get('/global-editor-api/actionToGetFabricAnnotatorJsonFileApiCall/:id', (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ message: 'No doc id data received' });
  }
  const filePath = path.join(`${__dirname}/public_data/fabric_annotation_json_${id}.txt`);
  res.sendFile(filePath, (err) => {
    if (err) {
      console.error('Error sending file:', err);
      res.status(500).send('Failed to send the file.');
    }
  });
});

app.get('/global-editor-api/actionToGetFabricAnnotatorJsonFileTempApiCall', (req, res) => {
  const filePath = path.join(`${__dirname}/public_data/blank_image_editor_screen.png`);
  res.sendFile(filePath, (err) => {
    if (err) {
      console.error('Error sending file:', err);
      res.status(500).send('Failed to send the file.');
    }
  });
});


app.get('/global-editor-api', (req, res) => {
  res.send(`Node Server is ready at port ${port}`);
});

app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

// Start the server
server.listen(port, host, () => {
  console.log('[SOCKET.IO SERVER CONNECTED TO PORT]', port);
});
