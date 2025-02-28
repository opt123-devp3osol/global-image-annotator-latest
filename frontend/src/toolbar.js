export function createToolbar(toolbar,tools = []) {
    if(tools.includes('undo') || !tools?.length){
        toolbar.innerHTML += `
        <div class="global_editor_button_group event_group_tool separate_section">
            <button type="button" class="global_editor_button global_image_annotator_toolbar_click" tabindex="-1" data-id="undo">
                   <svg width="17" height="17" viewBox="0 0 17.5 20">
                     <path d="M5.469,5.883c7.453,0,9.844,1.118,9.844,5.566,0,4.72-2.542,6.618-9.775,6.13a1.125,1.125,0,0,0-1.161,1.1A1.151,1.151,0,0,0,5.4,19.929c8.372.565,12.1-2.221,12.1-8.481,0-3.387-1.291-5.6-3.783-6.769-1.9-.886-4.228-1.15-8.248-1.15V0L0,4.706,5.469,9.413Z"/>
                   </svg>
                </button>
            <div class="ge_tooltip_wrapper"><span class="hover_ele_type">Undo</span><span class="shortcut">Ctrl+Z</span></div>
            <button type="button" class="global_editor_button global_image_annotator_toolbar_click" tabindex="-1" data-id="redo">
                    <svg width="17" height="17" viewBox="0 0 17.5 20"><defs></defs><path d="M12.031,5.883C4.578,5.883,2.188,7,2.188,11.449c0,4.72,2.542,6.618,9.775,6.13a1.125,1.125,0,0,1,1.161,1.1A1.151,1.151,0,0,1,12.1,19.929C3.729,20.493,0,17.707,0,11.448c0-3.387,1.291-5.6,3.783-6.769,1.9-.886,4.228-1.15,8.248-1.15V0L17.5,4.706,12.031,9.413Z"/></svg>
                </button>
            <div class="ge_tooltip_wrapper"><span class="hover_ele_type">Redo</span><span class="shortcut">Ctrl+Y</span></div>
        </div>`;
    }

    if(tools.includes('select') || !tools?.length){
        toolbar.innerHTML += `
        <div class="global_editor_button_group event_group_tool separate_section">
            <div class="tool_bar_wrap">
                <button type="button" class="global_editor_button global_image_annotator_toolbar_click" tabindex="-1" data-id="select">
                   <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"><path id="mouse-pointer" d="M6.051,15.5.062,1.126A.813.813,0,0,1,1.126.063L15.5,6.051a.813.813,0,0,1-.052,1.521L10.426,9.277l4.513,4.513a.813.813,0,1,1-1.149,1.149L9.277,10.426,7.571,15.448A.811.811,0,0,1,6.828,16H6.8A.812.812,0,0,1,6.051,15.5Zm.673-2.612L8.158,8.666a.807.807,0,0,1,.509-.508l4.22-1.434L2.322,2.323Z" transform="translate(0)" fill="#fff"></path></svg>
                </button>
                <div class="ge_tooltip_wrapper"><span class="hover_ele_type">Select</span></div>
            </div>
        </div>`;
    }

    if(tools.includes('text') || !tools?.length){
        toolbar.innerHTML += `
        <div class="global_editor_button_group event_group_tool separate_section">
            <div class="tool_bar_wrap">
                <button type="button" class="global_editor_button global_image_annotator_toolbar_click" tabindex="-1" data-id="text">
                   <svg width="14" height="14" viewBox="0 0 16 16"><path d="M20.667,6H7.333a1.333,1.333,0,0,0,0,2.667h5.333v12a1.333,1.333,0,1,0,2.667,0v-12h5.333a1.333,1.333,0,1,0,0-2.667Z" transform="translate(-6 -6)"></path></svg>
                </button>
                <div class="ge_tooltip_wrapper"><span class="hover_ele_type">Text</span></div>
            </div>
        </div>`;
    }


    if(tools.includes('arrow') || !tools?.length){
        toolbar.innerHTML += `
        <div class="global_editor_button_group event_group_tool">
            <div class="tool_bar_wrap">
                <button type="button" class="global_editor_button global_image_annotator_toolbar_click" tabindex="-1" data-id="arrow">
                   <svg width="17" height="17" viewBox="0 0 20.166 20"><defs></defs><path d="M154.08,363.85h-10.9a1.461,1.461,0,0,0-1.04,2.485l2.98,2.972-9.45,12.306a1.38,1.38,0,0,0,.14,1.839,1.41,1.41,0,0,0,.97.4,1.37,1.37,0,0,0,.87-.308l12.14-9.592,3.26,3.23a1.473,1.473,0,0,0,2.5-1.034V365.311A1.468,1.468,0,0,0,154.08,363.85Zm-.53,11.014-3.6-3.579-9.73,7.684,7.55-9.841-3.31-3.29h9.09Z" transform="translate(-135.384 -363.85)"/></svg>
                </button>
                <div class="ge_tooltip_wrapper"><span class="hover_ele_type">Arrow</span></div>
            </div>
        </div>`;
    }

    if(tools.includes('double-headed-arrow') || !tools?.length){
        toolbar.innerHTML += `
        <div class="global_editor_button_group event_group_tool separate_section">
            <div class="tool_bar_wrap">
                <button type="button" class="global_editor_button global_image_annotator_toolbar_click" tabindex="-1" data-id="double-headed-arrow">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="18" height="18" x="0px" y="0px"><g data-name="Layer 13"><path d="M62.5005,2.5a1,1,0,0,0-1-1l-28.562,0A1.94,1.94,0,0,0,31.001,3.4365V9.562A1.94,1.94,0,0,0,32.9385,11.5H45.43L11.5,45.43V32.9385A1.94,1.94,0,0,0,9.562,31.001H3.4365A1.94,1.94,0,0,0,1.499,32.9385l0,28.562a1,1,0,0,0,1,1l28.562,0a1.94,1.94,0,0,0,1.9375-1.9375V54.438a1.94,1.94,0,0,0-1.9375-1.9375H18.57L52.501,18.57l0,12.4912A1.94,1.94,0,0,0,54.438,32.999h6.1255a1.94,1.94,0,0,0,1.9375-1.9375Zm-8,28.562,0-14.9052a1,1,0,0,0-1.7071-.7071L15.4492,52.7935a1,1,0,0,0,.7071,1.707L30.999,54.438v6.063l-27.4995,0,0-27.5,6-.062V47.8438a1,1,0,0,0,1.707.707L48.5508,11.2065a1,1,0,0,0-.707-1.707L33.001,9.562l-.0625-6.063,27.5644,0,.0606,27.4995Z" fill="#F5F5F5"/></g></svg>
                </button>
                <div class="ge_tooltip_wrapper"><span class="hover_ele_type">Double Headed Arrow</span></div>
            </div>
        </div>`;
    }

    if(tools.includes('rectangle') || !tools?.length){
        toolbar.innerHTML += `
        <div class="global_editor_button_group event_group_tool">
            <div class="tool_bar_wrap">
                <button type="button" class="global_editor_button global_image_annotator_toolbar_click" tabindex="-1" data-id="rectangle">
                 <svg width="17" height="17" viewBox="0 0 20 20"><defs></defs><path d="M21,2H3A1,1,0,0,0,2,3V21a1,1,0,0,0,1,1H21a1,1,0,0,0,1-1V3A1,1,0,0,0,21,2ZM20,20H4V4H20Z" transform="translate(-2 -2)"/></svg>
                </button>
                <div class="ge_tooltip_wrapper"><span class="hover_ele_type">Rectangle</span></div>
            </div>
        </div>`;
    }

    if(tools.includes('triangle') || !tools?.length){
        toolbar.innerHTML += `
        <div class="global_editor_button_group event_group_tool">
            <div class="tool_bar_wrap">
                <button type="button" class="global_editor_button global_image_annotator_toolbar_click" tabindex="-1" data-id="triangle">
                   <svg width="17" height="17" viewBox="0 0 22 20"><defs></defs><path d="M23.849,21.5,13.953,3.78a1.082,1.082,0,0,0-1.913,0L2.143,21.5a1.171,1.171,0,0,0,0,1.137A1.093,1.093,0,0,0,3.1,23.2H22.892a1.093,1.093,0,0,0,.957-.569A1.171,1.171,0,0,0,23.849,21.5ZM5,20.929,13,6.623,20.99,20.929Z" transform="translate(-1.996 -3.203)"/></svg>
                </button>
                <div class="ge_tooltip_wrapper"><span class="hover_ele_type">Triangle</span></div>
            </div>
        </div>`;
    }

    if(tools.includes('circle') || !tools?.length){
        toolbar.innerHTML += `
        <div class="global_editor_button_group event_group_tool">
            <div class="tool_bar_wrap">
                <button type="button" class="global_editor_button global_image_annotator_toolbar_click" tabindex="-1" data-id="circle">
                   <svg width="17" height="17" viewBox="0 0 20 20"><defs></defs><path d="M12,2A10,10,0,1,0,22,12,10,10,0,0,0,12,2Zm0,18a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z" transform="translate(-2 -2)"/></svg>                           
                </button>
                <div class="ge_tooltip_wrapper"><span class="hover_ele_type">Circle</span></div>
            </div>
        </div>`;
    }

    if(tools.includes('line') || !tools?.length){
        toolbar.innerHTML += `
        <div class="global_editor_button_group event_group_tool separate_section">
            <div class="tool_bar_wrap">
                <button type="button" class="global_editor_button global_image_annotator_toolbar_click" tabindex="-1" data-id="line">
                   <svg width="18" height="18" viewBox="0 0 20 20"><path d="M21.7,3.29a1,1,0,0,0-1.419,0L2.29,21.279A1,1,0,1,0,3.709,22.7L21.7,4.709a1,1,0,0,0,0-1.419Z" transform="translate(-1.994 -2.994)"></path></svg>
                </button>
                <div class="ge_tooltip_wrapper"><span class="hover_ele_type">Line</span></div>
            </div>
        </div>`;
    }

    if(tools.includes('draw') || !tools?.length){
        toolbar.innerHTML += `
        <div class="global_editor_button_group event_group_tool separate_section">
            <div class="tool_bar_wrap">
                <button type="button" class="global_editor_button global_image_annotator_toolbar_click" tabindex="-1" data-id="draw">
                  <svg width="18" height="18" viewBox="0 0 20 20.002"><path d="M144,345.24a1,1,0,0,0-.29-.71l-4.24-4.24a1.014,1.014,0,0,0-1.42,0l-2.83,2.83h0l-10.93,10.93a1,1,0,0,0-.29.71V359a1,1,0,0,0,1,1h4.24a1,1,0,0,0,.76-.29l10.87-10.93h0l2.84-2.78a1.183,1.183,0,0,0,.22-.33.963.963,0,0,0,0-.24.654.654,0,0,0,0-.14ZM128.83,358H126v-2.83l9.93-9.93,2.83,2.83Zm11.34-11.34-2.83-2.83,1.42-1.41,2.82,2.82Z" transform="translate(-124 -340)"></path></svg>
                </button>
                <div class="ge_tooltip_wrapper"><span class="hover_ele_type">Draw</span></div>
            </div>
        </div>`;
    }

    if(tools.includes('polygon') || !tools?.length){
        toolbar.innerHTML += `
        <div class="global_editor_button_group event_group_tool">
            <div class="tool_bar_wrap">
                 <button type="button" class="global_editor_button global_image_annotator_toolbar_click" tabindex="-1" data-id="polygon">
                   <svg xmlns="http://www.w3.org/2000/svg" width="19.31" height="20" viewBox="0 0 19.31 20"><path id="PenFill" d="M13.606,2.379a2.07,2.07,0,0,0-3.9,0H3.379A.69.69,0,1,0,2,2.379V3.759a.69.69,0,0,0,1.379,0H9.7a2.07,2.07,0,0,0,3.9,0h6.325a.69.69,0,0,0,1.379,0V2.379a.69.69,0,0,0-1.379,0Zm-2.641.69a.69.69,0,1,1,.69.69A.69.69,0,0,1,10.966,3.069Zm.69,2.759a.69.69,0,0,1,.565.294l4.828,6.9a.69.69,0,0,1-.565,1.085H14.414v3.448a.69.69,0,0,1,.69.69V20.31a.69.69,0,0,1-.69.69H8.9a.69.69,0,0,1-.69-.69V18.241a.69.69,0,0,1,.69-.69V14.1H6.828a.69.69,0,0,1-.565-1.085l4.828-6.9A.69.69,0,0,1,11.655,5.828Zm1.379,11.034v.69H10.276v-.69Zm0-1.379V13.414a.69.69,0,0,1,.69-.69h1.434L12.345,8.705v1.95a.69.69,0,1,1-1.379,0V8.705L8.152,12.724H9.586a.69.69,0,0,1,.69.69v2.069ZM9.586,18.931v.69h4.138v-.69Z" transform="translate(-2 -1)" fill="#f5f5f5" fill-rule="evenodd"></path></svg>
                 </button>
                <div class="ge_tooltip_wrapper"><span class="hover_ele_type">Polygon</span></div>
            </div>
        </div>`;
    }

    if(tools.includes('blur') || !tools?.length){
        toolbar.innerHTML += `
        <div class="global_editor_button_group event_group_tool">
            <div class="tool_bar_wrap">
                <button type="button" class="global_editor_button global_image_annotator_toolbar_click" tabindex="-1" data-id="blur">
                    <svg width="17" height="17" viewBox="0 0 17.376 20.605">
                      <svg width="17.376" height="20.605" viewBox="0 0 17.376 20.605"><path id="Blur" d="M6114.543,75.06a8.687,8.687,0,0,1,0-12.288l5.5-5.509a.9.9,0,0,1,1.272,0l5.51,5.51a8.687,8.687,0,1,1-12.285,12.286Zm1.277-11.014a6.886,6.886,0,1,0,9.736,0l-4.873-4.873Zm3.635,9.554a4.594,4.594,0,0,1-2.539-1.517,4.936,4.936,0,0,1-1-2.184,7.443,7.443,0,0,1-.02-2.684.9.9,0,0,1,1.765.358,5.58,5.58,0,0,0,.029,2.012,2.722,2.722,0,0,0,2.187,2.263.9.9,0,0,1-.21,1.776A.913.913,0,0,1,6119.456,73.6Z" transform="translate(-6112 -57.001)" fill="#f5f5f5"></path></svg>
                    </svg>
                </button>
                <div class="ge_tooltip_wrapper"><span class="hover_ele_type">Blur</span></div>
            </div>
        </div>`;
    }

    if(tools.includes('highlighter') || !tools?.length){
        toolbar.innerHTML += `
        <div class="global_editor_button_group event_group_tool separate_section">
            <div class="tool_bar_wrap">
                <button type="button" class="global_editor_button global_image_annotator_toolbar_click" tabindex="-1" data-id="highlighter">
                   <svg xmlns="http://www.w3.org/2000/svg" width="10" height="16" viewBox="0 0 10 16"><path id="Highlighter" d="M264.79,257.05c-1.071-.8-2.564-2.273-2.564-2.967v-2.82a.721.721,0,0,0-.737-.7.979.979,0,0,0-.158.017l-2.853.7a.734.734,0,0,0-.544.685v2.117c0,.651-1.334,2.048-2.564,2.967a.708.708,0,0,0-.29.564v8.946h1.431v-8.234l7.147-.009v8.243h1.422v-8.946A.763.763,0,0,0,264.79,257.05Zm-5.417-4.529,1.431-.356v1.215h-1.431Zm-1.668,4.39a6.525,6.525,0,0,0,1.528-2.117h1.7a6.286,6.286,0,0,0,1.519,2.117Z" transform="translate(-255.08 -250.56)"></path></svg>
                </button>
                <div class="ge_tooltip_wrapper"><span class="hover_ele_type">Highlighter</span></div>
            </div>
        </div>`;
    }

    if(tools.includes('number') || !tools?.length){
        toolbar.innerHTML += `
        <div class="global_editor_button_group event_group_tool">
            <div class="tool_bar_wrap">
                <button type="button" class="global_editor_button global_image_annotator_toolbar_click" tabindex="-1" data-id="number">
                  <svg width="20" height="20" viewBox="0 0 20 20"><path d="M10,0A10,10,0,1,0,20,10,10,10,0,0,0,10,0Zm0,18.125A8.125,8.125,0,1,1,18.125,10,8.125,8.125,0,0,1,10,18.125Z"/><path class="a" d="M118.589,80.39h-1.58a.851.851,0,0,0-.756.91.819.819,0,0,0,.756.91h.5v5.9a.912.912,0,1,0,1.823,0V81.246A.761.761,0,0,0,118.589,80.39Z" transform="translate(-108.109 -74.722)"/></svg>
                </button>
                <div class="ge_tooltip_wrapper"><span class="hover_ele_type">Number</span></div>
            </div>
        </div>`;
    }

    if(tools.includes('alphabet') || !tools?.length){
        toolbar.innerHTML += `
        <div class="global_editor_button_group event_group_tool">
            <div class="tool_bar_wrap">
                <button type="button" class="global_editor_button global_image_annotator_toolbar_click" tabindex="-1" data-id="alphabet">
                   <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"><g id="Add_number_2" data-name="Add number 2" transform="translate(3905 1637)"><path id="Path_3149" data-name="Path 3149" d="M10,0A10,10,0,1,0,20,10,10,10,0,0,0,10,0Zm0,18.125A8.125,8.125,0,1,1,18.125,10,8.125,8.125,0,0,1,10,18.125Z" transform="translate(-3905 -1637)" fill="#3333333"/><path id="Path_3551" data-name="Path 3551" d="M859.05,507.38l-.03-.07h-1.33l-3.31,8.42-.05.13h1.56l.67-1.79h3.59l.67,1.79h1.55Zm.58,5.3h-2.55l1.28-3.39Z" transform="translate(-4753.35 -2138.585)" fill="#3333333"/></g></svg>
                </button>
                <div class="ge_tooltip_wrapper"><span class="hover_ele_type">Alphabet</span></div>
            </div>
        </div>`;
    }

    // if(tools.includes('addImage') || !tools?.length){
    //     toolbar.innerHTML += `
    //     <div class="global_editor_button_group event_group_tool separate_section">
    //         <div class="tool_bar_wrap">
    //              <button type="button" class="global_editor_button global_image_annotator_toolbar_click" tabindex="-1" data-id="addImage">
    //              <input type="file"
    //                             //onChange={(e)=>updateUploadedImageIntoCanvas(e)}
    //                                onInputCapture={(e) => updateUploadedImageIntoCanvas(e)}
    //                                id="upload_image_in_canvas"
    //                                style="display:none"/>
    //                 <svg xmlns="http://www.w3.org/2000/svg" width="10" height="11" viewBox="0 0 20 20"><path id="image-upload" d="M18.186,12.432a.952.952,0,0,0-.952.953v.362l-1.409-1.41a2.655,2.655,0,0,0-3.742,0L11.416,13,9.055,10.641a2.713,2.713,0,0,0-3.742,0L3.9,12.05V6.716a.952.952,0,0,1,.952-.953h6.665a.953.953,0,0,0,0-1.905H4.856A2.857,2.857,0,0,0,2,6.716V18.147A2.857,2.857,0,0,0,4.856,21H16.282a2.857,2.857,0,0,0,2.856-2.858V13.384A.952.952,0,0,0,18.186,12.432ZM4.856,19.1a.952.952,0,0,1-.952-.953v-3.4l2.761-2.763a.752.752,0,0,1,1.038,0L10.721,15h0l4.094,4.1Zm12.378-.953a.848.848,0,0,1-.171.5l-4.294-4.315.666-.667a.733.733,0,0,1,1.047,0l2.752,2.772ZM21.718,4.134,18.862,1.276a.984.984,0,0,0-1.352,0L14.654,4.134a.956.956,0,0,0,1.352,1.353l1.228-1.238V9.574a.952.952,0,1,0,1.9,0V4.249l1.228,1.238a.956.956,0,1,0,1.352-1.353Z" transform="translate(-2 -1.005)" fill="#404040"/></svg>
    //              </button>
    //             <div class="ge_tooltip_wrapper"><span class="hover_ele_type">Add Image</span></div>
    //         </div>
    //     </div>`;
    // }

    toolbar.innerHTML = `<div class="global_editor_toolbar_button_pane">
        ${toolbar.innerHTML}
    </div>`;

}
