export const getAllAnnotatorCss = ()=>{
    return `
        <style>
                body {
                    font-family: sans-serif;
                }
                
                /*///////// EDITOR PARENT ///////////////*/
                .gie_toolbar_main_container {
                    background: #ecf0f1;
                    display: flex;
                    width: 100%;
                }
                
                .gie_toolbar_main_container .global_editor_toolbar_button_pane {
                    display: flex;
                    flex-wrap: wrap;
                    min-height: 36px;
                    background: #ecf0f1;
                    border-bottom: 1px solid #d7e0e2;
                    margin: auto;
                    padding: 5px 5px;
                    position: relative;
                    list-style-type: none;
                    line-height: 10px;
                    backface-visibility: hidden;
                    overflow: hidden;
                    z-index: 11;
                }
                
                .global_editor_toolbar_button_pane .global_editor_button_group {
                    box-sizing: border-box;
                    display: -webkit-box;
                    display: -webkit-flex;
                    display: -moz-box;
                    display: -ms-flexbox;
                    display: flex;
                    -webkit-flex-wrap: wrap;
                    -ms-flex-wrap: wrap;
                    flex-wrap: wrap;
                }
                
                .global_editor_toolbar_button_pane .global_editor_button_group.separate_section::after {
                    content: " ";
                    display: block;
                    width: 1px;
                    background: #d7e0e2;
                    margin: 0 5px;
                    height: 35px;
                    vertical-align: top;
                }
                
                
                /* Editor Styles */
                
                
                .global_editor_toolbar_button_pane button,
                .global_editor_toolbar_button_pane select,
                .global_editor_toolbar_button_pane input[type="color"] {
                    display: block;
                    position: relative;
                    width: 35px;
                    height: 35px;
                    padding: 1px 6px !important;
                    margin-bottom: 1px;
                    overflow: hidden;
                    border: none;
                    cursor: pointer;
                    background: 0 0;
                    vertical-align: middle;
                    -webkit-transition: background-color 150ms, opacity 150ms;
                    -o-transition: background-color 150ms, opacity 150ms;
                    transition: background-color 150ms, opacity 150ms;
                    font-family: "Open Sans", sans-serif;
                    font-size: 18px;
                    color: #222;
                    text-transform: none;
                    line-height: normal;
                    font-weight: 400;
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
                    width: 18px;
                    height: 18px;
                    fill: currentColor;
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
                    background-color: #f1f1f1;
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
                    background: #7f7f7f; /* Optional background color for active item */
                    color:#fff;
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
                .global_editor_button_group.event_group_tool button svg {width: auto;height: auto;}
                .global_editor_toolbar_button_pane button:hover {background: #EFEFEF;}
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
                .global_editor_toolbar_button_pane button:hover {background: #EFEFEF!important;}
                .toolbar_selected_text.font_family_text {width: 29px;max-width: 29px;
                }
                </style>
    `;
}