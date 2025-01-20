import {getAllAnnotatorCss} from "./AnnotatorCssHelper";

export function createImageAnnotatorIframe(iframeDocument, editorId, toolbarId, isToolBarAtBottom = false) {
    iframeDocument.open();

    const getPositionAnnotatorToolbar = ()=>{
        if(isToolBarAtBottom) {
            return `<div class={"preview-container"} id="${editorId}">
                       <canvas id="rc_editor_image_canvas"></canvas>
                    </div>
                    <div id="${toolbarId}" class="gie_toolbar_main_container"></div>`
        }else{
            return `<div id="${toolbarId}" class="gie_toolbar_main_container"></div>
                    <div class="preview-container" id="${editorId}">
                       <canvas id="rc_editor_image_canvas"></canvas>
                    </div>`
        }
    }

    const getBroadcastPopup = ()=>{
        return `<div id="globalEditorBroadcastModal" class="global_editor_modal">
                    <div class="modal-content">
                        <div class="modal-header">
                          <h4 class="modal-title modal-large-heading">User Detail</h4>  
                        </div>
                        <div class="modal-body">
                            <div class="form-group">
                                <label for="linkURL">Enter your name:</label>
                                <input type="text" id="global_editor_broadcast_user_name" name="broadCastUserName" placeholder="Full name">
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-success ge_create_modal_button" id="globalEditorCreateBroadcastChannel">Connect</button>
                        </div>
                    </div>
                </div>`;
    }

    // Construct the HTML string dynamically based on the toolbar position
    const getToolbarAndAnnotatorMain = ()=> `<div class="ge_outer_most_container">
       ${getPositionAnnotatorToolbar()}
       ${getBroadcastPopup()}
    </div>`;

    // Write the HTML content into the iframe
    iframeDocument.write(`
        <html>
            <head>
                ${getAllAnnotatorCss()}
            </head>
            <body>
               ${getToolbarAndAnnotatorMain()}
            </body>
        </html>
    `);

    iframeDocument.close();
}
