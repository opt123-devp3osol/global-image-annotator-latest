export const getAllAnnotatorCss = ()=>{
    return `
        <style>
                body {
                    font-family: sans-serif;
                    margin: 0;
                }
                .ge_outer_most_container {
                }
                 .ge_inner_second_container {
                    display: flex;
                    justify-content: center;
                    position: relative;
                    flex-direction: column;
                }
                .annotation_meta_header {
                    background-color: #272930;
                    border-bottom: 1px solid #32343E;
                    min-height: 60px;
                    display: flex;
                    align-items: center;
                    position: relative;
                }
                .annotation_meta_header .left_area_buttons {
                    display: flex;
                }
                .annotation_meta_header .left_area_buttons .isw_btns {
                    display: inline-flex;
                    text-align: center;
                    align-items: center;
                    justify-content: center;
                    position: relative;
                }
                
                .annotation_meta_header .left_area_buttons .isw_btns .mc_logo {
                    display: flex;
                    align-items: center;
                    margin-left: 15px;
                    cursor: pointer;
                }
                .annotation_meta_header .left_area_buttons .isw_btns .mc_logo svg {
                    width: 130px;
                    height: auto;
                }
                .annotation_meta_header .toolbar_ctrl {
                    margin: 0 auto;
                }
                .annotation_meta_header .toolbar_ctrl {
                    position: absolute;
                    display: inline-flex;
                    left: 0;
                    right: 0;
                    margin: auto;
                    max-width: calc(100% - 1172px);
                }
                /*///////// EDITOR PARENT ///////////////*/
               .gie_toolbar_main_container {
                    border: 0;
                    width: auto;
                    height: auto;
                    box-shadow: none;
                    display: flex;
                    margin: 0px;
                    justify-content: center;
                    z-index: 1;
                    position: relative;
                    left: 0px;
                    padding: 0 !important;
                    top: 0px;
                    background-color: #272930;
                }
                
                .gie_toolbar_main_container .global_editor_toolbar_button_pane {
                    flex-wrap: wrap;
                    min-height: 36px;
                    margin: auto;
                    list-style-type: none;
                    line-height: 10px;
                    backface-visibility: hidden;
                    justify-content: left;
                    align-items: center;
                    padding: 0 !important;
                    z-index: 11;
                    width: 100%;
                    flex-direction: row;
                    float: left;
                    position: relative;
                    display: flex;
                    text-align: left !important;
                }
                
                .preview-container {
                    height: calc(100vh - 62px) !important;
                }
                .preview-container {
                    background: url(data:image/png;base64,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) repeat 0 0 !important;
                    display: flex;
                }
                
              /*.global_editor_toolbar_button_pane .global_editor_button_group {*/
              /*      box-sizing: border-box;*/
              /*      border-radius: 4px;*/
              /*      width: auto;*/
              /*      min-width: 40px;*/
              /*      height: 40px;*/
              /*      margin-right: 10px;*/
              /*      border: 1px solid #444652;*/
              /*      display: flex;*/
              /*      background: none;*/
              /*      padding: 0;*/
              /*      cursor: pointer;*/
              /*      flex-wrap: wrap;*/
              /*  }*/
              /*  */
              /*  .global_editor_toolbar_button_pane .global_editor_button_group.separate_section::after {*/
              /*      content: " ";*/
              /*      display: block;*/
              /*      width: 1px;*/
              /*      background: #d7e0e2;*/
              /*      margin: 0 5px;*/
              /*      height: 35px;*/
              /*      vertical-align: top;*/
              /*  }*/
                
                
                /* Editor Styles */
                
                
                .global_editor_toolbar_button_pane button,
                .global_editor_toolbar_button_pane select,
                .global_editor_toolbar_button_pane input[type="color"] {
                        overflow: unset !important;
                        display: inline-flex !important;
                        align-items: center;
                        justify-content: center;
                        background: none;
                        border-radius: 4px;
                        width: auto;
                        height: 40px;
                        margin-right: 10px;
                        border: 1px solid #444652;
                }
               
                
                
                .global_editor_toolbar_button_pane svg{
                    width: 17px;
                    height: 100%;
                    color: #222;
                    fill: #222;
                }
                
                .global_editor_toolbar_button_pane button:active,
                .global_editor_toolbar_button_pane select:active,
                .global_editor_toolbar_button_pane input[type="color"]:active {
                    transform: scale(0.95);
                }
                
                .global_editor_toolbar_button_pane select {
                    padding: 5px;
                }
                
                .global_editor_toolbar_button_pane input[type="color"] {
                    width: 40px;
                    height: 35px;
                    border: none;
                    padding: 0;
                }
                
                /* Editor Styles */
                .global_editor_edit_main_area {
                    padding: 15px;
                    height: 100%;
                    background-color: #fff;
                    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
                    font-family: Calibri, serif;
                    line-height: 1.6;
                }
                
                .global_editor_edit_main_area div{
                    margin: 0px;
                }
                
                .global_editor_edit_main_area.global_editor_empty::before {
                    content: 'Type / to get editor options menu';
                    color: #999;
                    pointer-events: none;
                    position: absolute;
                }
                .global_editor_edit_main_area.global_editor_empty_without_slash::before {
                    content: 'Type your text here';
                    color: #999;
                    pointer-events: none;
                    position: absolute;
                }
                
                /* Additional Styles */
               .global_editor_toolbar_button_pane button svg {
                    fill: #F5F5F5;
                    width: 14px;
                    height: 14px;
                }
                
                .global_editor_edit_main_area:focus,.global_editor_textarea_section:focus {
                    outline: 0px solid transparent;
                    text-rendering: auto !important;
                }
                
                .global_editor_edit_main_area .slashMenu {
                    position: absolute;
                    background: #fff;
                    border: 1px solid #ccc;
                    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
                    border-radius: 4px;
                    padding: 5px;
                    z-index: 1001;
                }
                
                /* Table Resizing Styles */
                .global_editor_edit_main_area table {
                    border-collapse: collapse;
                    border: 1px solid #ccc;
                    table-layout: fixed;
                    width: 100%;
                }
                
                .global_editor_edit_main_area table th,.global_editor_edit_main_area table td {
                    border: 1px solid #ccc;
                    padding: 8px;
                    text-align: left;
                    width: 100px; /* Initial column width */
                    overflow: hidden;
                }
                
                .global_editor_edit_main_area table th,.global_editor_edit_main_area table td::after {
                    content: '';
                    top: 0px;
                    right: 0px;
                    width: 5px;
                    position: absolute;
                    cursor: col-resize;
                    user-select: none;
                    background-color: var(--resizer-color);
                    height: var(--resizer-height);
                }
                
                .global_editor_edit_main_area table th {
                    background-color: #f0f0f0;
                }
                .global_editor_textarea_section{
                    display: block;
                    -webkit-box-flex: 1;
                    -webkit-flex: 1;
                    -moz-box-flex: 1;
                    -ms-flex: 1;
                    flex: 1;
                    margin-bottom: 1px;
                    position: relative;
                    overflow: auto;
                    font-size: 14px;
                    font-family: Consolas,Courier,"Courier New",monospace;
                    line-height: 18px;
                    color: #222;
                    font-weight: 300;
                    height: 100% !important;
                    width: 100% !important;
                    resize: none!important;
                    padding: 15px;
                    border: none!important;
                    margin-top: 10px;
                    background-color: #fff;
                    border-radius: 4px;
                    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
                }
                
                .global_editor_button_group .dropdown-content {
                    display: none;
                    position: fixed;
                    background-color: #f9f9f9;
                    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
                    z-index: 1000;
                    max-height: 150px;
                    overflow: auto;
                }
                
                .global_editor_button_group .dropdown-button {
                    display: inline-flex;
                    align-items: center;
                    padding: 8px 12px;
                    cursor: pointer;
                    font-size: 14px;
                    width: auto;
                }
                
                .global_editor_button_group .dropdown-content div {
                    padding: 8px 16px;
                    cursor: pointer;
                }
                
                .global_editor_button_group .dropdown-contents div:hover {
                   background-color: #0e9aef;
                    border-color: #0e9aef;
                }
                .global_editor_button_group .dropdown-button  svg {
                    margin-left: 8px;
                    vertical-align: middle;
                }
                
                
                .global_editor_button_group .dropdown-button .color_button_toolbar {
                    height: 20px;
                    display: flex;
                    width: 20px;
                    border-radius: 50%;
                }
                .global_editor_button_group .dropdown-content.color_pallet_content .color_pallet {
                    display: flex;
                    border-radius: 50%;
                    height: 25px;
                    width: 25px;
                    padding: unset;
                    margin: 10px 10px;
                }
                
                .global_editor_button_group .dropdown-item.font_dropdown.active {
                    background-color: #0e9aef;
                    border-color: #0e9aef;
                }
                
                .global_editor_button_group .dropdown-item.color_pallet.active {
                    position: relative; /* Needed for absolute positioning of the pseudo-element */
                }
                
                .global_editor_button_group .dropdown-item.color_pallet.active::before {
                    content: '✔'; /* Tick icon */
                    position: absolute;
                    top: 50%;
                    left: 7px;
                    transform: translateY(-50%);
                    color: #ffffff; /* Color of the tick */
                    font-size: 12px; /* Size of the tick */
                }
                
                 .slash-dropdown-menu {
                    overflow:auto;
                    width: auto;
                    height: 153px;
                    background: white;
                    border-radius: 4px;
                    box-shadow: -2px 2px 19px 0px #cccccc9c;
                }
                
                 .ge_slash-dropdown-menu .ge_slash-menu-dropdown-item {
                    padding: 10px;
                    font-size: 15px;
                    border-bottom: 1px solid #d4d4d4;
                    cursor:pointer;
                }
                
                
                /* Modal container */
                .global_editor_modal {
                    display: none;
                    position: fixed;
                    z-index: 1000;
                    left: 0;
                    top: 0;
                    width: 100%;
                    height: 100%;
                    overflow: auto;
                    background-color: rgba(0, 0, 0, 0.4);
                    padding-top: 60px;
                }
                
                /* Modal content */
                .global_editor_modal .modal-content {
                    background-color: #fefefe;
                    margin: 5% auto;
                    padding: 20px;
                    border: 1px solid #888;
                    width: 80%;
                    max-width: 300px;
                    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
                    border-radius: 8px;
                }
                
                /* Close button */
                .global_editor_modal .close {
                    color:#333333;
                    float: right;
                    font-size: 28px;
                    font-weight: 500;
                    cursor: pointer;
                }
                
                .global_editor_modal .close:hover,
                .global_editor_modal .close:focus {
                    color: black;
                    text-decoration: none;
                }
                
                /* Form groups */
                .global_editor_modal .form-group {
                    margin-bottom: 15px;
                }
                
                .global_editor_modal .form-group label {
                    display: block;
                    margin-bottom: 5px;
                }
                
                .global_editor_modal .form-group input {
                    width: calc(100% - 18px);
                    padding: 8px;
                    border: 1px solid #ccc;
                    border-radius: 4px;
                }
                
                /* Create Table button */
                .global_editor_modal .ge_create_modal_button {
                    background-color: #8f8f8f;
                    color: white;
                    padding: 10px 20px;
                    border: none;
                    border-radius: 4px;
                    width: 100%;
                    font-size: 15px;
                    cursor: pointer;
                }
                
                .global_editor_button_group.tool_event_disabled { opacity:0.5; pointer-events:none; }
                
                .ge_slash-dropdown-menu .ge_slash-menu-dropdown-item.active {
                    /*background: #ffffff;*/
                    background: #F4F7F7;
                }
                
                .global_editor_toolbar .global_editor_toolbar_button_pane .global_editor_button.active {
                    background: #d8d8d8;
                }
                
                .global_editor_edit_main_area .ge_option_table_div {
                    position: absolute;
                    right: 6px;
                    top: 0px;
                    cursor: pointer;
                }
                .global_editor_edit_main_area .ge_section_element_locked_by_other_user{
                    background: #e3e3e3!important;
                    user-select: none!important;
                    cursor: not-allowed!important;
                }
                
                .global_editor_edit_main_area .ge_option_table_div.active svg {
                    stroke: #0058e0;
                }
                
                .global_editor_edit_main_area .dropdown-content div {
                    padding: 8px 16px;
                    cursor: pointer;
                }
                
                .global_editor_edit_main_area .dropdown-content div:hover {
                    background-color: #f1f1f1;
                }
                
                
                .global_editor_edit_main_area .dropdown-content {
                    display: none;
                    position: fixed;
                    background-color: #f9f9f9;
                    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
                    z-index: 1000;
                    max-height: 150px;
                    overflow: auto;
                    user-select: none;
                }
                
                /*///////// TOOLBAR PARENT ///////////////*/
                .ge_tooltip_wrapper {opacity: 0;display: none;position: absolute;z-index: 99999999;background:#3B4146;color: #ffffff;padding: 8px 6px;border-radius: 4px;top: 100%;bottom: auto;left: 50%;margin: auto;transform: translate(-50%, 0);margin-top: 2px;}
                .ge_tooltip_wrapper span {display: block;text-align: center;padding: 0 2px;white-space: pre;font-size: 12px;}
                .hover_ele_type {color: #FFFFFF;font-size: 13px;font-weight: 500;}
                .shortcut {color: rgb(255 255 255 / 80%);margin-top: 5px;}
                .tool_bar_wrap:hover .ge_tooltip_wrapper {opacity: 1!important;display: block!important;}
                .global_editor_toolbar_button_pane {overflow: unset!important;}
                .global_editor_toolbar_button_pane button {overflow: unset !important;display: inline-flex !important;border-radius: 6px;align-items: center;justify-content: center;min-width: 32px !important;width: auto !important;height: 32px !important;}
                .global_editor_toolbar {background: #ffffff;display: flex;border-bottom: 1px solid #E7E8E8;padding: 14px 14px;}
                .global_editor_toolbar .global_editor_toolbar_button_pane {display: inline-flex;margin: auto;width: auto;background: transparent;border:0;}
                .global_editor_toolbar .global_editor_toolbar_button_pane:before{display:none;}
                .global_editor_toolbar_button_pane button:hover { background-color: #0e9aef; border-color: #0e9aef;}
                .toolbar_selected_text {font-size: 15px;font-weight: 500;color: #1A1F22;}
                .global_editor_toolbar_button_pane .global_editor_button_group::after {margin: 6px 5px !important;height: 20px !important;}
                .global_editor_button_group .dropdown-content .dropdown-item {display: flex;align-items: center;padding: 2px 4px;min-height: 30px;border-radius: 4px;font-size: 14px;}
                .dropdown_ele_icon {display: inline-flex;width: 24px;height: 24px;border-radius: 4px;align-items: center;justify-content: center;background: #E2E8EA;margin-right: 6px;font-size: 12px;padding:0!important;}
                .global_editor_button_group .dropdown-content .dropdown-item:hover {background: #F4F7F7;}
                .global_editor_button_group .dropdown-content {padding: 4px;min-width: 200px;border: 1px solid #E2E8EA;border-radius: 8px;background: #ffffff !important;max-height:300px!important;}
                .global_editor_edit_main_area {overflow: auto;overflow-x: hidden;word-break: break-word;}
                .global_editor_toolbar_button_pane button svg.stroke_icon {fill: transparent;}
                .global_editor_toolbar_button_pane button {margin: 0 5px;}
                .dropdown-content.color_pallet_content {width: 192px;max-width: 192px;min-width: auto;}
                .global_editor_button_group .dropdown-content.color_pallet_content .color_pallet {margin: 0 3px;min-height: 16px;border-radius: 4px;height: 16px;width: 16px; border: 1px solid #ebebeb;}
                .dropdown-content.color_pallet_content.active {display: flex !important;padding: 7px 6px;flex-wrap: wrap;}
                .global_editor_button_group .dropdown-content.color_pallet_content .color_pallet::before {left: 4px;font-size: 10px;}
                .global_editor_toolbar_button_pane svg{width:auto!important;height:auto!important;}
                .global_editor_button_group .dropdown-item.font_dropdown.active {background: #ffffff;color: #000000;}
                .global_editor_toolbar_button_pane button:hover + .ge_tooltip_wrapper {opacity: 1;}
                .global_editor_toolbar .global_editor_toolbar_button_pane .global_editor_button.active {background: #0e9af11a !important;}
                .global_editor_button.active svg * {stroke: #0E9AEF!important;}
                .tool_bar_wrap {position: relative;}
                .global_editor_toolbar_button_pane button:hover + .ge_tooltip_wrapper {opacity: 1;}
                .global_editor_button.dropdown-button svg:first-child {margin-left: 0;}
                .global_editor_button_group .dropdown-button .color_button_toolbar {border-radius: 4px !important;}
                .global_editor_button_group .dropdown-button .color_button_toolbar svg {margin: 0;position: relative;top: 3px;}
                .global_editor_button_group .dropdown-button .color_button_toolbar {border-radius: 4px !important;padding: 0;width: 26px !important;height: 26px !important;max-width: 26px;display: inline-block !important;}
                .global_editor_button_group .dropdown-button .color_button_toolbar svg * {stroke: #ffffff;}
                .global_editor_button .toolbar_selected_text {max-width: 120px;white-space: nowrap;overflow: hidden;font-family: sans-serif;text-overflow: ellipsis;font-size: 14px;}
                .global_editor_button_group .dropdown-button svg:first-child {margin-left: 0;}
                .dropdown-content.auto_width {min-width: 48px;}
                .global_editor_button.dropdown-button .color_button_toolbar[style="background: rgb(255, 255, 255);"] svg * {stroke: #333333;}
                .global_editor_button.dropdown-button .color_button_toolbar {border: 1px solid #ededed;}
                .ge_slash-dropdown-menu {padding: 4px;min-width: 180px;border: 1px solid #E2E8EA;border-radius: 8px;background: #ffffff !important;height:auto;}
                 .ge_slash-dropdown-menu .ge_slash-menu-dropdown-item {display: flex;align-items: center;padding: 2px 4px;min-height: 30px;border-radius: 4px;font-size: 14px;border: 0;}
                 .ge_slash-dropdown-menu .ge_slash-menu-dropdown-item:hover {background: #F4F7F7;}
                .dropdown-item.font_dropdown.active:after ,  .ge_slash-dropdown-menu .ge_slash-menu-dropdown-item.active:after {content: url("data:image/svg+xml,%0A%3Csvg xmlns='http://www.w3.org/2000/svg' width='12.828' height='9.289' viewBox='0 0 12.828 9.289'%3E%3Cg id='tick' transform='translate(-2.586 -5.086)'%3E%3Cpath id='Path_5418' data-name='Path 5418' d='M4,10.319l3.077,3.056L14,6.5' fill='none' stroke='%232C72E4' stroke-linecap='round' stroke-linejoin='round' stroke-width='2'/%3E%3C/g%3E%3C/svg%3E%0A");position: absolute;right: 10px;}
                .ge_cursor_user{
                    position: absolute;
                    width: 2px;
                    height: 20px;
                }
                .global_editor_modal label {margin-bottom: 8px !important;font-size: 13px;font-weight: 600;color: #282C34;line-height: normal;}
                .global_editor_modal .ge_create_modal_button {padding: 0 8px!important;font-size: 13px;margin: 0;background: #0E9AEF!important;}
                .global_editor_modal .ge_create_modal_button:hover {background: #1a7bb9 !important;}
                .global_editor_modal .form-group input:focus-visible {outline: 1px solid #1a7bb9 !important;}
                .global_editor_edit_main_area .global_editor_textarea_section {overflow: auto !important;width: auto !important;padding: 16px;margin: 0;    border: 0 !important;box-shadow: none;}
                .ge_tooltip_wrapper:after {content: '';position: absolute;width: 8px;height: 8px;background: #333333;top: -3px;left: 0;right: 0;margin: auto;transform: rotate(45deg);}
                .global_editor_toolbar{user-select: none;}
                .ge_below_the_editor .ge_tooltip_wrapper:after {bottom: -4px;top: auto;}
                .ge_below_the_editor .ge_tooltip_wrapper {bottom: 100%;top: auto;margin-bottom: 8px;}
                .ge_below_the_editor.global_editor_toolbar {border-bottom: 0;border-top: 1px solid #E7E8E8;}
                .global_editor_toolbar_button_pane .global_editor_button_group.event_group_tool:last-child:after{display: none;}
                .global_editor_toolbar_button_pane button:active, .global_editor_toolbar_button_pane select:active, .global_editor_toolbar_button_pane input[type="color"]:active {transform: unset !important;}
                .slash-dropdown-menu .ge_slash-menu-dropdown-item.active {background: #ffffff !important;}
                .global_editor_modal .modal-header {justify-content: start;padding: 15px 15px;text-align: left;align-items: center;display: flex;border-bottom:1px solid #dee2e6;position:relative;}
                .global_editor_modal .modal-header .modal-title {font-size: 18px;margin: initial;text-align: left !important;font-weight: 600;line-height: normal;color: #000;}
                .global_editor_modal .modal-header button.close.close_bg_on_hover {right: 6px;top: 0;left: auto;position: absolute;bottom: 0;margin: auto;}
                .modal-footer {padding: 10px 15px;background-color: #fff;border-bottom-left-radius: 4px;border-bottom-right-radius: 4px;}
                .btn {font-size: 14px;line-height: 1.42857143;margin: 0;padding: 6px 12px;}
                .btn-default {background: #fff;border: 1px solid #e7eaec;color: inherit;}
                .modal-body {padding: 15px;}
                .modal-footer {border-top: 1px solid #dee2e6;text-align: right;display: flex;justify-content: right;}
                .btn-default {color: inherit;background: white;border: 1px solid #e7eaec;}
                .modal-footer .btn-default {background: #fff !important;border: 1px solid #e7eaec !important;font-size: 14px;}
                .modal-footer .btn {font-size: 14px !important;}
                .global_editor_modal .modal-content{padding:0!important;}
                .modal-body .form-group:last-child {margin-bottom: 0;}
                .toolbar_selected_text.font_family_text {width: 29px;max-width: 29px;}
                .canvas-container{margin: auto;}
                
                .capture_header_in_canvas {
                    border-bottom: 1px solid #32343E;
                    border-radius: 0;
                    padding: 0 15px;
                    background-color: #272930;
                    width: 100%;
                    display: flex;
                    left: 0;
                    right: 0;
                    margin: auto;
                    position: relative;
                }
                .capture_edit_header {
                    display: flex;
                    flex: 1 1;
                    background: #fff;
                    align-items: center;
                }
                .capture_header_in_canvas .capture_edit_header .task_data_main_wrap {
                        border-bottom: 1px solid #32343E !important;
                        border-top: 0;
                        border-left: 0;
                        border-right: 0;
                        transition: all 0.500msease-in-out;
                        -moz-transition: all 0.500ms ease-in-out;
                        border: 0;
                        width: 100%;
                        margin-bottom: 0;
                        padding: 0;
                        position: relative;
                        border-bottom: 1px solid #32343E;
                        border-radius: 0;
                        background-color: #272930;
                    }
                    .capture_edit_header .task_data_main_wrap .task_data_block_container {
                        padding: 0 !important;
                        min-height: 60px;
                        display: flex;
                        width: 100%;
                        align-items: center;
                        position: relative;
                    }
                    .rc_annotator_setting_ele_right {
    display: flex
;
    margin-right: 0px !important;
    align-items: center;
}
                
                .capture_header_in_canvas .task_data_ctrl_left.in_preview_panel {
    min-width: 510px;
        margin-left: 0px;
        margin: 0 auto;
    max-width: unset !important;
    align-items: center;
    flex: 1 1 auto;
    width: 0;
    display: inline-flex
;
    cursor: pointer;
}
.capture_header_in_canvas .task_data_ctrl_left.in_preview_panel input.task_name_text {
    background: none;
    color: #FFFFFF;
    border: 0;
    outline: none;
    /* text-align: center; */
        font-size: 14px !important;
    font-weight: 600;
        padding-left: 0;
        width: 100%;
    cursor: text;
    display: inline-table;
    word-break: break-word;
    top: -1px;
    position: relative;
    text-overflow: ellipsis;
    border-radius: 3px;
}
.extra_clickable_area_active {
    width: auto;
}
.supported_tools_main_ctrl {
    position: absolute !important;
    left: 0;
    right: 0;
    margin: auto !important;
        display: inline-flex;
justify-content: center;
    max-width: 50%;
}
.st_colors {
    display: flex;
    align-items: center;
}
.color_varians_main_ctrl {
    display: inline-flex;
    align-items: center;
}
.cv_innr_ctrl {
    align-items: center;
    display: inline-flex;
}
.colored_icon_ctrl {
    height: 14px;
    min-width: 14px;
    align-items: center;
    justify-content: center;
    border-radius: 1px;
    cursor: pointer;
    text-align: center;
    display: inline-flex;
    opacity: 1;
    position: relative;
    margin: 0 6px;
    transition: all 0.500msease-in-out;
    -moz-transition: all 0.500ms ease-in-out;
}
.colored_icon_ctrl.active:before {
    font-family: "Font Awesome 5 Free";
    font-weight: 900;
    color: #ffffff;
    top: 0px;
    font-size: 10px;
    position: absolute;
    left: 0px;
    content: "\\f00c";
    line-height: 1.6;
    vertical-align: middle;
    margin: auto;
    justify-content: center;
    align-items: center;
    display: inline-flex;
    width: 100%;
    height: 100%;
}
.colored_icon_ctrl.active:after {
    content: "";
    position: absolute;
    top: -5px;
    bottom: 0;
    left: -5px;
    right: 0;
    border: 2px solid #0e9aef;
    width: 24px;
    height: 24px;
    border-radius: 1px;
}
.stroke_variants_main_ctrl {
    display: inline-flex;
}
.sv_innr_ctrl {
    margin: 0;
    padding: 0;
    border: 0;
        display: inline-flex;
    align-items: center;
}
.sv_stroke.active {
    background-color: #0e9aef !important;
}
.sv_stroke {
    background-color: #32343e;
}
.sv_stroke {
    margin: 0 4px;
    cursor: pointer;
    width: 24px;
    height: 24px;
    border-radius: 4px;
    align-items: center;
    display: inline-flex;
    justify-content: center;
    transition: all 100msease-in-out;
    -moz-transition: all 100ms ease-in-out;
}
.initial_shot_window .sv_stroke svg {
    fill: #97989D;
    width: 18px;
    height: auto;
}
.sv_stroke.active * {
    fill: #ffffff;
}
.sv_stroke svg {
    fill: #97989D;
}


                </style>
    `;
}