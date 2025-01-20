import {createImageAnnotatorIframe} from "./IframeImageAnnotatorEditor";
// import {SocketIOManager} from "./SocketIOManager";
import * as fabric from "fabric";
import {generateUniqueIdForBlock, getInitialFabricDoxData} from "./AnnotatorEditorHelper";
import {createToolbar} from "./toolbar";
import {
    changeObjectSelection,
    drawLineArrow,
    drawObjectInCanvas,
    infiniteCanvasProperties
} from "./EditorToolbarAnnotationLiberary";
const optionsForWebSocket = {
    reconnectInterval: 5000,  // 5 seconds reconnect interval
    heartbeatInterval: 15000, // 15 seconds heartbeat interval
};
export const baseServerUrl = `https://backend.timebox.ai/global-editor-api`;
export let userInfo = null;
export let websocketManager = null;
export let mainEditorDocumentId = null;
export let fabricCanvas = null;
export class ImageAnnotatorEditor {
    constructor(iframeId,editorId,toolbarId,documentId,options) {
        try {
            this.iframe = document.getElementById(iframeId);
            if (!this.iframe) {
                throw new Error(`Element with ID ${iframeId} not found.`);
            }
            this.iframe.style.border = 'unset';

            // Access the iframe's document
            this.iframeDocument = this.iframe?.contentDocument || this.iframe?.contentWindow.document;
            // Access the iframe's document
            if (this.iframeDocument) {
                createImageAnnotatorIframe(this.iframeDocument, editorId, toolbarId,options?.isToolBarAtBottom);

                // Use an arrow function in setTimeout to preserve 'this' context
                setTimeout(() => {
                    this.editor = this.iframeDocument.getElementById(editorId);
                    this.toolbar = this.iframeDocument.getElementById(toolbarId);
                    if (!this.editor || !this.toolbar) {
                        throw new Error(`Element with ID ${editorId} or ${toolbarId} not found.`);
                    }

                    ///////////////////  SETUP WEB SOCKET /////////////////////
                    //websocketManager = new SocketIOManager(this.editor, mainEditorDocumentId, optionsForWebSocket);
                    ///////////////////  SETUP WEB SOCKET /////////////////////

                    /////////// SETUP EDITOR AND OTHER FUNCTIONS /////////////
                    this.setupEditorAndToolbarOtherFunctions(options);
                    /////////// SETUP EDITOR AND OTHER FUNCTIONS /////////////

                    ////////// GET USER INFO /////////
                    this.getAndSetCurrentUserInfo();
                    ////////// GET USER INFO /////////

                },0)

            }
        } catch (error) {
            console.error(error.message);
        }
    }

    setupEditorAndToolbarOtherFunctions(options){
        // Initialize the Fabric.js canvas
        fabricCanvas = new fabric.Canvas(this.iframeDocument.getElementById('rc_editor_image_canvas'));
        // Disable selection for objects
        fabricCanvas.selection = false;
        console.log('Fabric.js Canvas initialized:', fabricCanvas);
        /////////// SETUP EDITOR AND OTHER FUNCTIONS /////////////
        this.setImageIntoImageAnnotator('blank_image_editor_screen.png','https://backend.timebox.ai/global-editor-api/actionToGetFabricAnnotatorJsonFileTempApiCall');
        /////////// SETUP EDITOR AND OTHER FUNCTIONS /////////////
        const editorRect = this.editor.getBoundingClientRect();
        if(this.toolbar) {
            const toolbarRect = this.toolbar.getBoundingClientRect();
            ///////////// ATTACH TOOLBAR INTO DOM //////////
            if (toolbarRect.bottom <= editorRect.top) {
                this.toolbar.classList.add('ge_above_the_editor');
            } else if (toolbarRect.top >= editorRect.bottom) {
                this.toolbar.classList.add('ge_below_the_editor');
            } else {
                this.toolbar.classList.add('ge_above_the_editor');
            }
            const tools = options?.tools ? options?.tools : [];
            createToolbar(this.toolbar, tools);
            ///////////// ATTACH TOOLBAR INTO DOM //////////
        }
        let currentCu = this;
        setTimeout(function () {
            if(currentCu.toolbar) {
                currentCu.setupToolbar();
            }
        }, 0)
    }


    setupToolbar() {
        this.toolbar.querySelectorAll('.global_image_annotator_toolbar_click').forEach((element) => {
            element.addEventListener('mousedown', (e) => {
                e.preventDefault();
                let toolId = e.target.closest('.global_image_annotator_toolbar_click').dataset.id;
                if(toolId){
                  drawObjectInCanvas(toolId,fabricCanvas);
                }
            });
        });
    }

    setImageIntoImageAnnotator(imageUniqueName,imageUrl) {
        mainEditorDocumentId = `fabric_annotation_json_${imageUniqueName}`;
        const getImageDataUrl = (img) => {
            // Create an offscreen canvas
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');

            // Set canvas dimensions
            canvas.width = img.width;
            canvas.height = img.height;

            // Draw the image onto the canvas
            ctx.drawImage(img, 0, 0);
            return canvas.toDataURL('image/jpeg');
        };


        let imgObj = new Image();
        if (!imgObj) {
            console.error('Image element not found');
            return;
        }

        imgObj.crossOrigin = 'Anonymous';
        imgObj.src = imageUrl + '?v=' + Math.random();

        imgObj.onload = (event) => {
            // Use the loaded image dimensions
            const loadedImage = event.currentTarget;
            const dataURL = getImageDataUrl(loadedImage);
            const height = loadedImage.naturalHeight;
            const width = loadedImage.naturalWidth;

            fetch(baseServerUrl + '/actionToValidateImageJsonDataAnnotatorApiCall', {
                method: 'POST', // Use POST method
                headers: {
                    'Content-Type': 'application/json' // Set content type for JSON
                },
                body: JSON.stringify({
                    fabRicJsonObject: getInitialFabricDoxData(dataURL,height,width),
                    imageUniqueName: imageUniqueName
                }) // Convert the data to a JSON string
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`Network response was not ok: ${response.statusText}`);
                    }
                    return response.text(); // Parse the response as text
                })
                .then(text => {
                    let data;
                    try {
                        // Try parsing the text as JSON
                        data = JSON.parse(text);
                        console.log('Valid JSON:', data);

                        let jsonObject = JSON.stringify(data);
                        fabricCanvas.setHeight(data.height);
                        fabricCanvas.setWidth(data.width);
                        fabricCanvas.loadFromJSON(jsonObject, fabricCanvas.renderAll.bind(fabricCanvas)).then(() => {
                            // Ensure the canvas renders after loading
                            fabricCanvas.renderAll();
                            // Iterate over objects to customize behavior
                            fabricCanvas.getObjects().forEach(obj => {
                                if(obj.id === 'main_image'){
                                    obj.selectable = false;
                                    obj.hasControls = false;
                                    obj.hasBorders = false;
                                }else if(obj.shapeName === 'circle'){
                                    obj.selectable = true;
                                    obj.setControlsVisibility({
                                        mb:false,
                                        mt:false,
                                        mtr:false
                                    });
                                }
                                else if(obj.shapeName === 'blur'){
                                    obj.setControlsVisibility({
                                        mt: false,
                                        mb: false,
                                        ml: false,
                                        mr: false,
                                        tr: false,
                                        tl: false,
                                        br: false,
                                        mtr:false,
                                        bl: false
                                    });
                                }else if(obj.shapeName === 'arrow'){
                                    obj.setControlsVisibility({
                                        mt: false,
                                        mb: false,
                                        ml: false,
                                        mr: false,
                                        br: false,
                                        tl: false,
                                        //mtr: false,
                                    });
                                } else {obj.selectable = true;}
                            });
                            changeObjectSelection(false, fabricCanvas);
                            infiniteCanvasProperties(fabricCanvas);
                            drawLineArrow(fabricCanvas);
                            fabric.Image.fromURL('./assets/canvas_background_texture.png', ({})).then((img) => {
                                // Set the background pattern of the canvas
                                //fabricCanvas.setBackgroundColor({ source: pattern }, fabricCanvas.renderAll.bind(fabricCanvas));
                                fabricCanvas.backgroundColor = new fabric.Pattern({
                                    source: img.getElement(),
                                    repeat: 'repeat', // Set the pattern to repeat
                                });
                                fabricCanvas.renderAll();
                            });
                        });

                    } catch (error) {
                        // Handle invalid JSON
                        console.error('Response is not valid JSON:', text);
                    }
                })
                .catch(error => {
                    console.error('There was a problem with the fetch operation:', error); // Handle errors
                });
        };

        imgObj.onerror = () => {
            console.error('Failed to load the image.');
        };
    }


    openModalPopup (modal){
        modal.style.display = 'block';
    }


    getAndSetCurrentUserInfo(){
        if(localStorage.getItem('getRCRImageAnnotatorChannelBroadCastUserInfo')){
            userInfo = JSON.parse(localStorage.getItem('getRCRImageAnnotatorChannelBroadCastUserInfo'));
        }else{
            /////////////// CREATE IMAGE POPUP EVENTS //////////////////////
            const broadcastModal = this.iframeDocument.querySelector('#globalEditorBroadcastModal');
            const createBroadcastBtn = this.iframeDocument.querySelector('#globalEditorCreateBroadcastChannel');
            if(broadcastModal) {
                this.openModalPopup(broadcastModal);
                broadcastModal.querySelector('#global_editor_broadcast_user_name').value = '';
                setTimeout(function(){
                    broadcastModal?.querySelector('#global_editor_broadcast_user_name')?.focus();
                },0)

                createBroadcastBtn.addEventListener('click', () => {
                    const broadcastUserName = broadcastModal.querySelector('#global_editor_broadcast_user_name').value?.trim();
                    if (broadcastUserName) {
                        userInfo = {id:'user-'+generateUniqueIdForBlock(),name:broadcastUserName};
                        localStorage.setItem('getRCRImageAnnotatorChannelBroadCastUserInfo',JSON.stringify(userInfo));
                        broadcastModal.style.display = 'none';
                    }else{
                        if(!broadcastUserName){
                            setTimeout(function(){
                                broadcastModal?.querySelector('#global_editor_broadcast_user_name')?.focus();
                            },0)
                        }
                    }
                });
            }
            ///////////////// CREATE IMAGE POPUP EVENTS //////////////////////
        }
    }

    // Static method to create a new TextEditor instance
    static create(iframeId,editorId, toolbarId,documentId, options) {
        try {
            return new ImageAnnotatorEditor(iframeId,editorId,toolbarId,documentId,options);
        } catch (error) {
            console.error("Error in TextEditor.create:", error.message);
        }
    }
}
