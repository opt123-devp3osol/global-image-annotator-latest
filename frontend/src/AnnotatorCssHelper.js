export const getAllAnnotatorCss = ()=>{
    return `
        <style>
             body { font-family: sans-serif;}
            .ge_outer_most_container {position: relative;}
            .global_editor_modal{display:none;position:fixed;z-index:1000;left:0;top:0;width:100%;height:100%;overflow:auto;background-color:rgba(0,0,0,.4);padding-top:60px}
            .global_editor_modal .modal-content{background-color:#fefefe;margin:5% auto;padding:20px;border:1px solid #888;width:80%;max-width:300px;box-shadow:0 5px 15px rgba(0,0,0,.3);border-radius:8px}
            .global_editor_modal .close{color:#333;float:right;font-size:28px;font-weight:500;cursor:pointer}
            .global_editor_modal .close:focus,.global_editor_modal .close:hover{color:#000;text-decoration:none}
            .global_editor_modal .form-group{margin-bottom:15px}
            .global_editor_modal .form-group label{display:block;margin-bottom:5px}
            .global_editor_modal .form-group input{width:calc(100% - 18px);padding:8px;border:1px solid #ccc;border-radius:4px}
            .global_editor_modal .ge_create_modal_button{background-color:#8f8f8f;color:#fff;padding:10px 20px;border:none;border-radius:4px;width:100%;font-size:15px;cursor:pointer}      
        </style>
    `;
}