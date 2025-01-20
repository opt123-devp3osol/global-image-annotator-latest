import {websocketManager, mainEditorDocumentId, fabricCanvas} from "./ImageAnnotatorMain";
import { Buffer } from 'buffer';
import * as fabric from "fabric";
export function generateUniqueIdForBlock() {
    const s4 = () => Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    return `${s4()}-${new Date().getTime()}`;
}

export function getInitialFabricDoxData(dataUri,height,width){
    return `{"version":"6.5.4","height":${height},"width":${width},"objects":[{"id":"main_image","cropX":0,"cropY":0,"type":"Image","version":"6.5.4","originX":"left","originY":"top","left":0,"top":0,"height":${height},"width":${width},"fill":"rgb(0,0,0)","stroke":null,"strokeWidth":0,"strokeDashArray":null,"strokeLineCap":"butt","strokeDashOffset":0,"strokeLineJoin":"miter","strokeUniform":false,"strokeMiterLimit":4,"scaleX":1,"scaleY":1,"angle":0,"flipX":false,"flipY":false,"opacity":1,"shadow":null,"visible":true,"backgroundColor":"#ffffff","fillRule":"nonzero","paintFirst":"fill","globalCompositeOperation":"source-over","skewX":0,"skewY":0,"src":"${dataUri}","crossOrigin":"anonymous","filters":[]}]}`
}

export function sendUpdateRequestForLiveEditing(payload,type = 'actionToUpdateImageAnnotatorDoc'){
    const jsonString = JSON.stringify({mainEditorDocumentId,type,payload});
    const binaryMessage = Buffer.from(jsonString);
    websocketManager.sendSocketIORequest(binaryMessage);
}

export function updatePreviewDocDataLiveEditing(payload){
    switch (payload?.type) {
        case 'ADD':
        case 'MODIFY': {
            if (!fabricCanvas) {
                console.error("Canvas is not initialized.");
                return;
            }

            let objectData = payload.fabricCanvasJson;

            // Parse JSON if it's a string
            if (typeof objectData === 'string') {
                try {
                    objectData = JSON.parse(objectData);
                } catch (error) {
                    console.error("Invalid JSON object:", error);
                    return;
                }
            }

            // Update canvas dimensions
            fabricCanvas.width = objectData.width;
            fabricCanvas.height = objectData.height;

            // Process the objects
            fabric.util.enlivenObjects(objectData.objects).then((enlivenedObjects) => {
                enlivenedObjects.forEach((newObj) => {
                    const existingObj = fabricCanvas.getObjects().find((obj) => obj.id === newObj.id);

                    if (existingObj) {
                        // Merge properties of the existing object with the new one
                        existingObj.set(newObj.toObject());
                    } else {
                        // Add new object to the canvas
                        fabricCanvas.add(newObj);
                    }
                });

                // Render the canvas to reflect changes
                fabricCanvas.renderAll();
            });

            break;
        }
    }

}

