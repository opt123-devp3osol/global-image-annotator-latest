import io from 'socket.io-client';
import {updatePreviewDocDataLiveEditing} from "./AnnotatorEditorHelper"; // Import Socket.IO client

export let isProcessingRemoteUpdate = false;
export class SocketIOManager {
    constructor(editor, mainEditorDocumentId, options = {}) {
        // Set Socket.IO server URL and options
        this.url = 'https://backend.timebox.ai/global-editor-api'; // Use HTTPS instead of WSS for Socket.IO
        this.socketClient = null;
        this.reconnectInterval = options.reconnectInterval || 5000; // Reconnect automatically (Socket.IO handles this)
        this.heartbeatInterval = options.heartbeatInterval || 10000; // 10 seconds heartbeat message
        this.isConnected = false;
        this.heartbeatTimer = null;
        this.editor = editor;
        this.mainEditorDocumentId = mainEditorDocumentId;

        // Initialize the Socket.IO connection
        this.init();
    }

    // Initialize Socket.IO connection
    init() {
        //this.setUserUniqueClientId(); // Generate unique client ID

        // Clear any existing Socket.IO connection before reconnecting
        if (this.socketClient) {
            this.cleanupSocketIO();
        }

        // Create a new Socket.IO connection
        this.socketClient = io(this.url, {
            reconnectionAttempts: 5, // Max reconnection attempts (Socket.IO auto-reconnects)
            reconnectionDelay: this.reconnectInterval, // Time before attempting to reconnect
            transports: ['websocket'], // Ensure WebSocket is used as transport
            path: '/global-editor-api/socket.io', // Specify the custom namespace for Socket.IO
            query: { EIO: 4 }, // Optional query parameter for engine.io version 4
        });

        // Handle Socket.IO connection event
        this.socketClient.on('connect', () => {
            this.isConnected = true;
            console.log('Socket.IO connection opened to:', this.url);
            this.socketClient.emit('joinRoom', this.mainEditorDocumentId);
            //this.startHeartbeat(); // Start sending wakeup messages
        });

        // Handle incoming Socket.IO messages
        this.socketClient.on('message', (dataFromServer) => {
            if (dataFromServer instanceof ArrayBuffer) {
                // Convert the ArrayBuffer to a Uint8Array
                const uint8Array = new Uint8Array(dataFromServer);

                // Convert Uint8Array to a string
                const jsonString = new TextDecoder('utf-8').decode(uint8Array); // Use TextDecoder to decode
                try {
                    // Parse the JSON string
                    const jsonData = JSON.parse(jsonString);
                    this.onMessage(jsonData);
                } catch (error) {
                    console.error('Error parsing JSON from received message:', error);
                }
            } else {
                console.error('Received unexpected data type:', typeof dataFromServer);
            }
        });

        // Handle Socket.IO disconnect event
        this.socketClient.on('disconnect', () => {
            this.isConnected = false;
            console.log('Socket.IO connection closed. Attempting to reconnect...');
            //this.stopHeartbeat();
        });

        // Handle Socket.IO errors
        this.socketClient.on('connect_error', (error) => {
            console.error('Socket.IO encountered an error:', error);
        });
    }

    // Generate a unique client ID for the user
    // setUserUniqueClientId() {
    //     const s4 = () => Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    //     clientId = `${s4()}${s4()}-${s4()}-${s4()}-${s4()}-${s4()}${s4()}${s4()}`;
    // }

    // Send a message through the Socket.IO connection
    sendSocketIORequest(binaryMessage) {
        if (this.isConnected) {
            this.socketClient.emit('message', binaryMessage);
        } else {
            console.error('Socket.IO is not connected or ready.');
        }
    }

    // Handle incoming Socket.IO messages
    onMessage(data) {
        switch (data?.type) {
            case 'actionToUpdateImageAnnotatorDoc':
                if (data.payload !== undefined) {
                    isProcessingRemoteUpdate = true;
                    updatePreviewDocDataLiveEditing(data.payload);
                    setTimeout(()=>{
                        isProcessingRemoteUpdate = false;
                    },0)
                }
                break;
        }
    }

    // Cleanup Socket.IO before reconnecting or closing
    cleanupSocketIO() {
        if (this.socketClient) {
            this.socketClient.off('connect');
            this.socketClient.off('disconnect');
            this.socketClient.off('message');
            this.socketClient.close();
        }
    }

    // Start sending heartbeat (wakeup) messages every `heartbeatInterval` milliseconds
    // startHeartbeat() {
    //     if (this.heartbeatTimer) {
    //         clearInterval(this.heartbeatTimer);
    //     }
    //
    //     this.heartbeatTimer = setInterval(() => {
    //         const data = { type: 'wakeupMessage', message: 'wakeup' };
    //         this.sendSocketIORequest(JSON.stringify(data));
    //     }, this.heartbeatInterval);
    // }

    // Stop sending heartbeat messages
    // stopHeartbeat() {
    //     if (this.heartbeatTimer) {
    //         clearInterval(this.heartbeatTimer);
    //         this.heartbeatTimer = null;
    //     }
    // }
}
