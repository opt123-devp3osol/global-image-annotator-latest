export function createToolbar(toolbar,tools = []) {
    if(tools.includes('undo') || !tools?.length){
        toolbar.innerHTML += `
        <div class="global_editor_button_group event_group_tool separate_section">
            <div class="tool_bar_wrap">
                <button type="button" class="global_editor_button global_image_annotator_toolbar_click" tabindex="-1" data-id="undo">
                   <svg width="17" height="17" viewBox="0 0 17.5 20">
                     <path d="M5.469,5.883c7.453,0,9.844,1.118,9.844,5.566,0,4.72-2.542,6.618-9.775,6.13a1.125,1.125,0,0,0-1.161,1.1A1.151,1.151,0,0,0,5.4,19.929c8.372.565,12.1-2.221,12.1-8.481,0-3.387-1.291-5.6-3.783-6.769-1.9-.886-4.228-1.15-8.248-1.15V0L0,4.706,5.469,9.413Z"/>
                   </svg>
                </button>
                <div class="ge_tooltip_wrapper"><span class="hover_ele_type">Undo</span><span class="shortcut">Ctrl+Z</span></div>
            </div>
            <div class="tool_bar_wrap">
                <button type="button" class="global_editor_button global_image_annotator_toolbar_click" tabindex="-1" data-id="redo">
                    <svg width="17" height="17" viewBox="0 0 17.5 20"><defs></defs><path d="M12.031,5.883C4.578,5.883,2.188,7,2.188,11.449c0,4.72,2.542,6.618,9.775,6.13a1.125,1.125,0,0,1,1.161,1.1A1.151,1.151,0,0,1,12.1,19.929C3.729,20.493,0,17.707,0,11.448c0-3.387,1.291-5.6,3.783-6.769,1.9-.886,4.228-1.15,8.248-1.15V0L17.5,4.706,12.031,9.413Z"/></svg>
                </button>
                 <div class="ge_tooltip_wrapper"><span class="hover_ele_type">Redo</span><span class="shortcut">Ctrl+Y</span></div>
            </div>
        </div>`;
    }

    if(tools.includes('select') || !tools?.length){
        toolbar.innerHTML += `
        <div class="global_editor_button_group event_group_tool separate_section">
            <div class="tool_bar_wrap">
                <button type="button" class="global_editor_button global_image_annotator_toolbar_click" tabindex="-1" data-id="select">
                   <svg xmlns="http://www.w3.org/2000/svg" width="12.5" height="16" viewBox="0 0 12.5 16">
                      <path id="Selection" d="M196.487,262.742a1.039,1.039,0,0,1-.915-.543l-1.052-1.933-2.2,2.172a1.044,1.044,0,0,1-1.778-.729V247.767a1.032,1.032,0,0,1,.274-.692,1.054,1.054,0,0,1,1.475-.06l10.428,9.707a1.034,1.034,0,0,1,.322.746,1.016,1.016,0,0,1-.3.728,1.039,1.039,0,0,1-.738.3h-2.97l.824,1.512a1.026,1.026,0,0,1-.454,1.41l-2.447,1.212A1.065,1.065,0,0,1,196.487,262.742Zm-1.608-4.886,1.791,3.291,1.685-.834-1.783-3.27h4.351l-8.906-8.29v11.933Zm3.662,2.8c0,.012.01.023.015.033h0Zm.206-.535h0Zm2.948-2.357.013.013h0Z" transform="translate(-190.545 -246.742)" fill="#404040"/>
                   </svg>
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
                   <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 11.382 15.5"><path id="Bold" d="M6,10.588h5.765a3.294,3.294,0,0,0,3.294-3.294h0A3.294,3.294,0,0,0,11.765,4H7.647A1.647,1.647,0,0,0,6,5.647Zm0,0v5.765A1.647,1.647,0,0,0,7.647,18h4.529a3.706,3.706,0,0,0,3.706-3.706h0a3.706,3.706,0,0,0-3.706-3.706Z" transform="translate(-5.25 -3.25)" fill="none" stroke="#0c0310" stroke-linecap="round" stroke-width="1.5" fill-rule="evenodd"></path></svg>
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
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="18" height="18" x="0px" y="0px"><g data-name="Layer 13"><path d="M62.5005,2.5a1,1,0,0,0-1-1l-28.562,0A1.94,1.94,0,0,0,31.001,3.4365V9.562A1.94,1.94,0,0,0,32.9385,11.5H45.43L11.5,45.43V32.9385A1.94,1.94,0,0,0,9.562,31.001H3.4365A1.94,1.94,0,0,0,1.499,32.9385l0,28.562a1,1,0,0,0,1,1l28.562,0a1.94,1.94,0,0,0,1.9375-1.9375V54.438a1.94,1.94,0,0,0-1.9375-1.9375H18.57L52.501,18.57l0,12.4912A1.94,1.94,0,0,0,54.438,32.999h6.1255a1.94,1.94,0,0,0,1.9375-1.9375Zm-8,28.562,0-14.9052a1,1,0,0,0-1.7071-.7071L15.4492,52.7935a1,1,0,0,0,.7071,1.707L30.999,54.438v6.063l-27.4995,0,0-27.5,6-.062V47.8438a1,1,0,0,0,1.707.707L48.5508,11.2065a1,1,0,0,0-.707-1.707L33.001,9.562l-.0625-6.063,27.5644,0,.0606,27.4995Z" stroke="black" stroke-width="2" fill="none"/></g></svg>
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
                   <svg width="17" height="17" viewBox="0 0 20 20"><path d="M21.7,3.29a1,1,0,0,0-1.419,0L2.29,21.279A1,1,0,1,0,3.709,22.7L21.7,4.709a1,1,0,0,0,0-1.419Z" transform="translate(-1.994 -2.994)" fill="#404040"/></svg>
                </button>
                <div class="ge_tooltip_wrapper"><span class="hover_ele_type">Line</span></div>
            </div>
        </div>`;
    }

    if(tools.includes('draw') || !tools?.length){
        toolbar.innerHTML += `
        <div class="global_editor_button_group event_group_tool">
            <div class="tool_bar_wrap">
                <button type="button" class="global_editor_button global_image_annotator_toolbar_click" tabindex="-1" data-id="draw">
                   <svg width="17" height="17" viewBox="0 0 20 20.002"><path d="M144,345.24a1,1,0,0,0-.29-.71l-4.24-4.24a1.014,1.014,0,0,0-1.42,0l-2.83,2.83h0l-10.93,10.93a1,1,0,0,0-.29.71V359a1,1,0,0,0,1,1h4.24a1,1,0,0,0,.76-.29l10.87-10.93h0l2.84-2.78a1.183,1.183,0,0,0,.22-.33.963.963,0,0,0,0-.24.654.654,0,0,0,0-.14ZM128.83,358H126v-2.83l9.93-9.93,2.83,2.83Zm11.34-11.34-2.83-2.83,1.42-1.41,2.82,2.82Z" transform="translate(-124 -340)" fill="#404040"/></svg>
                </button>
                <div class="ge_tooltip_wrapper"><span class="hover_ele_type">Draw</span></div>
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

    toolbar.innerHTML = `<div class="global_editor_toolbar_button_pane">${toolbar.innerHTML}</div>`;

}
