import express from 'express';
import { Server } from 'socket.io'; // Import Socket.IO Server
import http from 'http';
import cors from 'cors';
import path from 'path';
import fs from 'fs';
import multer from 'multer';

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

      const { mainEditorDocumentId } = jsonData; // Assuming messages have a channel ID

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

// Set storage engine for multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let uploadPath = `${__dirname}/attachments/${req?.query?.docId}/`;
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
      fs.chmodSync(uploadPath, 0o755);
    }
    cb(null, uploadPath); // Specify the upload directory
  },
  filename: (req, file, cb) => {
    cb(null, req?.query?.name); // Use the original file name
  },
});

const upload = multer({ storage });

// Endpoint for file upload
app.post('/global-editor-api/actionToUploadEditorAttachmentApiCall', upload.single('image'), (req, res) => {
  // Handle the uploaded file here.
  const file = req.file;
  if (!file) {
    return res.status(400).send('No file uploaded.');
  }
  // You can save the file information or perform other operations here.
  res.send('File uploaded successfully.');
});

app.get('/global-editor-api/actionToGetEditorAttachmentApiCall/:docId/:fileId', (req, res) => {
  const { docId, fileId } = req.params;
  const filePath = path.join(__dirname, 'attachments/'+docId, fileId);

  // Send the file to the client
  res.sendFile(filePath, (err) => {
    if (err) {
      console.error('Error sending file:', err);
      res.status(err.status).end();
    } else {
      console.log('File sent:', filePath);
    }
  });
});

app.post('/global-editor-api/uploadEditorTestFileApiCall', (req, res) => {
  const { htmlData,docId } = req.body;
  if (!htmlData) {
    return res.status(400).json({ message: 'No text data received' });
  }


  // Define the path to the file
  const filePath = path.join(`${__dirname}/editor_docs/editor_doc_${docId}.txt`);
  // Write the text data to the file
  fs.writeFile(filePath, htmlData, (err) => {
    if (err) {
      console.error('Error writing to file:', err);
      return res.status(500).json({ message: 'Failed to write data to file' });
    }
    res.json({ message: 'Text data written to file successfully' });
  });
});

app.get('/global-editor-api/getEditorTestFileApiCall/:docId', (req, res) => {
  const { docId } = req.params;

  if (!docId) {
    return res.status(400).json({ message: 'No doc id data received' });
  }

  const filePath = path.join(`${__dirname}/editor_docs/editor_doc_${docId}.txt`);

  // Check if the file exists
  if (!fs.existsSync(filePath)) {
    let dataToWrite = `<div data-block-id="block-${docId}" class="content_section_inner_container gl_doc_selectable_div editable_content_section normal_text"></div>`;
    // If the file doesn't exist, create it with some default content
    fs.writeFile(filePath, dataToWrite, (err) => {
      if (err) {
        return res.status(500).json({ message: 'Failed to create the file.' });
      }

      // Send the created file to the client
      return res.sendFile(filePath, (err) => {
        if (err) {
          console.error('Error sending file:', err);
          res.status(500).send('Failed to send the file.');
        }
      });
    });
  } else {
    // If the file exists, send it to the client
    res.sendFile(filePath, (err) => {
      if (err) {
        console.error('Error sending file:', err);
        res.status(500).send('Failed to send the file.');
      }
    });
  }
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
