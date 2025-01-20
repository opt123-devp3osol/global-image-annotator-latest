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

    // Construct the HTML string dynamically based on the toolbar position
    const getToolbarAndAnnotatorMain = ()=> `<div class="ge_outer_most_container">
       ${getPositionAnnotatorToolbar()}
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
