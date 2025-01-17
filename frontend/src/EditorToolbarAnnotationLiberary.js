import * as fabric from "fabric";

let drawActive = false;
let selectedToolColor = '#FF0000';
let selectedToolStroke = 2;
let selectedTextSize = 22;
let selectedTextStyle = 'arial';
let pathShapeName = 'path';
let digit = 1;
let caseType = '';
let alphabetNo = 0;
let ipAddress,captureId,custom_editor_id,userId;
let strokeSize = 4;
let onLoad = true;
let selectedFontSize = 22;
let alphabetArray = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','x','y','z'];

let Direction = {
    LEFT: 0,
    UP: 1,
    RIGHT: 2,
    DOWN: 3
};

// Save additional attributes in Serialization
fabric.Object.prototype.toObject = (function (toObject) {
    return function (properties) {
        console.log('Custom toObject is called'); // Debugging
        return fabric.util.object.extend(toObject.call(this, properties), {
            id: this.id,
            userId: this.userId,
            customEditorId: this.customEditorId,
            shapeName: this.shapeName,
            lastModifiedTime: this.lastModifiedTime
        });
    };
})(fabric.Object.prototype.toObject);

export function removeEvents(selected_canvas) {
    selected_canvas.selection = false;
    selected_canvas.off('mouse:down');
    selected_canvas.off('mouse:up');
    selected_canvas.off('mouse:move');
}

export function enableFreeDrawing(selected_canvas,shapeName){
    removeEvents(selected_canvas);

    let isDown;
    selected_canvas.on('mouse:down', function () {
        selected_canvas.freeDrawingBrush.color = selectedToolColor;
        selected_canvas.isDrawingMode = true;
        isDown= true;
        pathShapeName = shapeName;
    });
    selected_canvas.on('mouse:up', function () {
        if (!isDown) return;
        isDown = false;
    });
}

export function changeObjectSelection(value, fabricCanvas) {
    if(value){
        // $(".modal_screenshot_image").addClass('modal_screenshot_image_cursor_move');
        // $(".modal_screenshot_image").removeClass('modal_screenshot_image_cursor_crosshair');
    }else{
        fabricCanvas._activeObject = null;
    }

    fabricCanvas.forEachObject(function (obj) {
        if (obj.stroke === '#f1f1f100') {
            fabricCanvas.remove(obj);
        }else if(obj.shapeName === 'polygon-start'){
            fabricCanvas.remove(obj);
        }else if(obj.id === "main_image") {
            obj.selectable = false;
        } else {
            obj.selectable = value;
            obj.hasControls = value;
            obj.hasBorders = value;
            obj.borderColor = '#000';
            obj.cornerColor = '#6B7587';
            obj.cornerStyle = 'circle';
            obj.cornerSize = 10;
            obj.padding = 0;
            obj.LockRotation = value;
            obj.transparentCorners = false;
        }
    });
    fabricCanvas.renderAll();
}

function distanceIsNotOuterThenCanvas(pointer,o,canvas){
    let canvasLeft = 15;
    let canvasTop = 15;
    let newPosition = {x:pointer.x,y:pointer.y};
    if((pointer.x >= canvasLeft && pointer.x <= canvasLeft+canvas?.width-20)){
        newPosition.x=pointer.x;
    }else{
        if(pointer.x <= canvasLeft){
            newPosition.x = canvasLeft-12;
        }else if(pointer.x+17 >= canvasLeft+canvas?.width){
            newPosition.x = canvas?.width-canvasLeft+12;
        }

        if(pointer.y <= canvasTop){
            newPosition.y = canvasTop;
        } else if(pointer.y >= canvasTop+canvas?.height){
            newPosition.y = canvas?.height-canvasTop;
        }
    }

    if(pointer.y >= canvasTop && pointer.y <= canvasTop+canvas?.height-20){
        newPosition.y = pointer.y;
    }else{
        if(pointer.y <= canvasTop){
            newPosition.y = canvasTop-12;
        } else if(pointer.y+17 >= canvasTop+canvas?.height){
            newPosition.y = canvas?.height-canvasTop+12;
        }
    }
    return newPosition;
}

function drawCrop(selected_canvas) {
    let rect, isDown, origX, origY;
    removeEvents(selected_canvas);
    selected_canvas.on('mouse:down', function(o) {
        isDown = true;
        let pointer = selected_canvas.getPointer(o.e);
        origX = pointer.x;
        origY = pointer.y;
        rect = new fabric.Rect({
            lockRotation: true,
            id:'crop_element',
            left: origX,
            top: origY,
            originX: 'left',
            originY: 'top',
            width:0,
            height:0,
            fill: 'rgba(0,0,0,0.3)',
            stroke: 'black',
            opacity: 1,
            hasRotatingPoint: false,
            transparentCorners: false,
            cornerColor: 'white',
            cornerStrokeColor: 'black',
            borderColor: 'black',
            selectable:true,
            hasControls:true,
            hasBorders:true,
            cornerSize:10,
            padding:0,
        });
        selected_canvas.add(rect);
    });

    selected_canvas.on('mouse:move', function(o) {
        if (!isDown) return;
        let pointer = selected_canvas.getPointer(o.e);
        const {x,y} = distanceIsNotOuterThenCanvas(pointer,o,selected_canvas);
        if (origX > x) {
            rect.set({
                left: x
            });
        }
        if (origY > y) {
            rect.set({
                top: y
            });
        }
        rect.set({
            width: Math.abs(origX - x)
        });
        rect.set({
            height: Math.abs(origY - y)
        });
        selected_canvas.renderAll();
    });
    // $(document).on('keydown',function(e){
    // if(e.keyCode == 27){
    //     if(rect) {
    //         selected_canvas.remove(rect);
    //     }
    // }
    // });
    selected_canvas.on('mouse:up', function() {
        if (!isDown) return;
        isDown = false;
        if(rect.width === 0 && rect.height === 0){
            selected_canvas.remove(rect);
        }else{
            rect.setCoords();
            //eventBus.dispatch('call-to-active-select-event','crop-object');
            selected_canvas.setActiveObject(rect);
            selected_canvas.renderAll();
        }
    });
}

function drawRectangle(selected_canvas) {
    let rect, isDown, origX, origY;
    removeEvents(selected_canvas);
    selected_canvas.on('mouse:down', function(o) {
        isDown = true;
        let pointer = selected_canvas.getPointer(o.e);
        origX = pointer.x;
        origY = pointer.y;
        rect = new fabric.Rect({
            left: origX,
            top: origY,
            originX: 'left',
            originY: 'top',
            width: pointer.x - origX,
            height: pointer.y - origY,
            angle: 0,
            fill: '',
            strokeWidth: selectedToolStroke,
            stroke: selectedToolColor,
            noScaleCache: false,
            strokeUniform: true,
            id:'rectangle'+new Date().getTime()+Math.random().toString(36).substr(2,8)+userId,
            userId: userId,
            customEditorId:custom_editor_id,
            shapeName:'rectangle',
            lastModifiedTime:new Date(),
            selectable:true,
            hasControls:true,
            borderColor:'#000',
            hasBorders:true,
            cornerStyle:'circle',
            cornerSize:10,
            cornerColor:'#6B7587',
            padding:0,
            LockRotation: true,
            transparentCorners:false,
        });
        selected_canvas.add(rect);
    });

    selected_canvas.on('mouse:move', function(o) {
        if (!isDown) return;
        let pointer = selected_canvas.getPointer(o.e);
        if (origX > pointer.x) {
            rect.set({
                left: pointer.x
            });
        }
        if (origY > pointer.y) {
            rect.set({
                top: pointer.y
            });
        }
        rect.set({
            width: Math.abs(origX - pointer.x)
        });
        rect.set({
            height: Math.abs(origY - pointer.y)
        });
        selected_canvas.renderAll();
    });

    selected_canvas.on('mouse:up', function() {
        if (!isDown) return;
        isDown = false;
        rect.setCoords();
        /*let zoom = window.fabricCanvas.getZoom();
        let right = rect.width + rect.left;
        if((selected_canvas.width - 6) < (right * zoom))
            selected_canvas.setWidth((right * zoom) + 10);
        if((selected_canvas.height - 6) < (rect.top * zoom) + (rect.height * zoom))
            selected_canvas.setHeight((rect.top * zoom) + (rect.height * zoom) + 10);*/
        if(rect.width === 0 && rect.height === 0){
            selected_canvas.remove(rect);
        }else{
            selected_canvas.setActiveObject(rect);
            //eventBus.dispatch('send-to-websocket-fabric',{type:'add',userPointer:rect,resize:true});
        }
        selected_canvas.renderAll();
    });
}

function drawTriangle(selected_canvas) {
    let tri, isDown, origX, origY;
    let isMovingUp = false;
    let isMovingDown = false;
    removeEvents(selected_canvas);
    selected_canvas.on('mouse:down', function(o) {
        isDown = true;
        let pointer = selected_canvas.getPointer(o.e);
        origX = pointer.x;
        origY = pointer.y;
        tri = new fabric.Triangle({
            left: pointer.x,
            top: pointer.y,
            originX: 'left',
            originY: 'top',
            width: pointer.x - origX,
            height: pointer.y - origY,
            angle: 0,
            fill: '',
            strokeWidth: selectedToolStroke,
            stroke: selectedToolColor,
            noScaleCache: false,
            strokeUniform: true,
            id:'triangle'+new Date().getTime()+Math.random().toString(36).substr(2,8)+userId,
            userId: userId,
            customEditorId:custom_editor_id,
            shapeName:'triangle',
            lastModifiedTime:new Date(),
            selectable:true,
            hasControls:true,
            borderColor:'#000',
            hasBorders:true,
            cornerStyle:'circle',
            cornerSize:10,
            cornerColor:'#6B7587',
            padding:0,
            LockRotation: true,
            transparentCorners:false
        });
        selected_canvas.add(tri);
    });

    selected_canvas.on('mouse:move', function(o) {
        if (!isDown) return;
        let pointer = selected_canvas.getPointer(o.e);
        if (origX > pointer.x) {
            tri.set({
                left: pointer.x
            });
        }
        if(origY > pointer.y && !isMovingUp && !isMovingDown){
            isMovingUp = true
        }
        if(origY < pointer.y && !isMovingDown && !isMovingUp){
            isMovingDown = true
        }
        if(isMovingUp) {
            if (origY > pointer.y && !isMovingUp) {
                tri.set({
                    top: pointer.y,
                    flipY: true
                });
            } else if (isMovingUp && origY < pointer.y) {
                tri.set({
                    flipY: true
                });
            } else if (isMovingUp) {
                tri.set({
                    top: pointer.y,
                    flipY: false
                });
            }
        }
        if(isMovingDown){
            if (origY > pointer.y) {
                tri.set({
                    top: pointer.y,
                    flipY:true
                });
            }else{
                tri.set({
                    flipY:false
                });
            }
        }
        tri.set({
            width: Math.abs(origX - pointer.x)
        });
        tri.set({
            height: Math.abs(origY - pointer.y)
        });
        selected_canvas.renderAll();
    });

    selected_canvas.on('mouse:up', function() {
        if (!isDown) return;
        isDown = false;
        isMovingUp = false;
        isMovingDown = false;
        tri.setCoords();
        /*let zoom = window.fabricCanvas.getZoom();
        let right = (tri.width + tri.left) * zoom;
        let bottom = (tri.top + tri.height)* zoom;
        if(selected_canvas.width  < right )
            selected_canvas.setWidth(right);
        if(selected_canvas.height < bottom)
            selected_canvas.setHeight(bottom);*/
        if(tri.height === 0 && tri.width === 0){
            selected_canvas.remove(tri);// removing old object
        }else{
            selected_canvas.setActiveObject(tri);
            //eventBus.dispatch('send-to-websocket-fabric',{type:'add',userPointer:tri,resize:true});
        }
        selected_canvas.renderAll();
    });
}

function drawCircle(selected_canvas) {
    let circle, isDown, origX, origY;
    removeEvents(selected_canvas);
    selected_canvas.on('mouse:down', function(o) {
        isDown = true;
        let pointer = selected_canvas.getPointer(o.e);
        origX = pointer.x;
        origY = pointer.y;
        circle = new fabric.Circle({
            top: origY,
            left: origX,
            radius: 0,
            noScaleCache: false,
            strokeUniform: true,
            id: 'circle' + new Date().getTime() + Math.random().toString(36).substr(2, 8) + userId,
            userId: userId,
            customEditorId: custom_editor_id,
            fill: '',
            strokeWidth: selectedToolStroke,
            stroke: selectedToolColor,
            shapeName: 'circle',
            lastModifiedTime: new Date(),
            selectable: true,
            hasControls: true,
            borderColor: '#000',
            hasBorders: true,
            cornerStyle: 'circle',
            cornerSize: 10,
            cornerColor: '#6B7587',
            padding: 0,
            LockRotation: true,
            transparentCorners: false,
        });
        selected_canvas.add(circle);
    });

    selected_canvas.on('mouse:move', function(o) {
        if (!isDown) return;
        let pointer = selected_canvas.getPointer(o.e);
        if (origX > pointer.x) {
            circle.set({
                left: (pointer.x)
            });
        }

        if (origY > pointer.y) {
            circle.set({
                top: (pointer.y)
            });
        }

        circle.set({
            radius: Math.abs(origX - pointer.x) / 2
        });

        selected_canvas.renderAll();
    });

    selected_canvas.on('mouse:up', function() {
        if (!isDown) return;
        isDown = false;

        if(circle.radius === 0){
            selected_canvas.remove(circle);
        }else{
            circle.setControlsVisibility({mb:false,
                ml:false,
                mt:false,
                mr:false,
                mtr:false});
            circle.setCoords();
            selected_canvas.setActiveObject(circle);
            //eventBus.dispatch('send-to-websocket-fabric',{type:'add',userPointer:circle,resize:true});
        }
        selected_canvas.renderAll();
    });
}

export function drawLineArrow(selected_canvas){
    removeEvents(selected_canvas);
    selected_canvas.isDrawingMode = true;
    if(selected_canvas.freeDrawingBrush){
        selected_canvas.freeDrawingBrush.color = "#f1f1f100";
        selected_canvas.freeDrawingBrush.width = 0;
    }
    // Extended fabric line class
    let canvas = selected_canvas;
    let triangle,triangle2, isDown, origX, origY,height,width;

    canvas.on('mouse:down', function(o) {
        isDown = true;
        let pointer = canvas.getPointer(o.e);
        origX = pointer.x;
        origY = pointer.y;
        width= origX;
        height=origY;
        triangle = new fabric.Triangle({
            left: origX,
            top: origY,
            originX: 'center',
            originY: 'center',
            selectable: false,
            pointType: 'arrow_start',
            angle: -45,
            width: selectedToolStroke+22,
            height: selectedToolStroke+20,
            fill: selectedToolColor
        });
        triangle2 = new fabric.Triangle({
            left: origX,
            top: origY,
            originX: 'center',
            originY: 'center',
            selectable: false,
            pointType: 'arrow_end',
            angle: -45,
            width: selectedToolStroke+9,
            height: selectedToolStroke+22,
            fill: selectedToolColor,
            absolutePositioned: true
        });
        canvas.add(triangle2, triangle);

    });

    let _FabricCalcArrowAngle = (x1, y1, x2, y2) =>{
        let angle = 0, x, y;
        x = (x2 - x1);
        y = (y2 - y1);
        if (x === 0) {
            angle = (y === 0) ? 0 : (y > 0) ? Math.PI / 2 : Math.PI * 3 / 2;
        } else if (y === 0) {
            angle = (x > 0) ? 0 : Math.PI;
        } else {
            angle = (x < 0) ? Math.atan(y / x) + Math.PI :
                (y < 0) ? Math.atan(y / x) + (2 * Math.PI) : Math.atan(y / x);
        }
        return (angle * 180 / Math.PI + 90);
    };
    let _FabricCalcArrowAngle2 = (x1, y1, x2, y2) =>{
        let angle = 0, x, y;
        x = (x2 - x1);
        y = (y2 - y1);
        if (x === 0) {
            angle = (y === 0) ? 0 : (y > 0) ? Math.PI / 2 : Math.PI * 3 / 2;
        } else if (y === 0) {
            angle = (x > 0) ? 0 : Math.PI;
        } else {
            angle = (x < 0) ? Math.atan(y / x) + Math.PI :
                (y < 0) ? Math.atan(y / x) + (2 * Math.PI) : Math.atan(y / x);
        }
        return (angle * 180 / Math.PI + 270);
    };
    let _getDistance = (xA, yA, xB, yB)=> {
        let xDiff = xA - xB;
        let yDiff = yA - yB;

        return Math.sqrt(xDiff * xDiff + yDiff * yDiff);
    };
    let _getMidpoint =(x1, x2, y1, y2)=>
    {
        return {left:(x1 + x2) / 2 , top:(y1 + y2) / 2};
    }

    canvas.on('mouse:move', function(o) {
        if (isDown) {
            let pointer = canvas.getPointer(o.e);
            let distance =  _getDistance(origX,origY,pointer.x,pointer.y);
            let midPoint = _getMidpoint(origX,pointer.x,origY,pointer.y);
            triangle.set({
                'left': pointer.x,
                'top': pointer.y,
                'angle': _FabricCalcArrowAngle(origX,
                    origY,
                    pointer.x,
                    pointer.y)
            });
            triangle2.set({
                left:midPoint.left,
                top:midPoint.top,
                'height':distance-7,
                'angle': _FabricCalcArrowAngle2(origX,
                    origY,
                    pointer.x,
                    pointer.y)
            });
            width= Math.abs(origX - pointer.x);
            height=Math.abs(origY - pointer.y);
            canvas.renderAll();
        }
    });

    canvas.on('mouse:up', function() {
        if (!isDown) return;
        isDown = false;
        let group = new fabric.Group([triangle,triangle2], {
                id:'line-arrow'+new Date().getTime()+Math.random().toString(36).substr(2,8)+userId,
                userId: userId,
                customEditorId:custom_editor_id,
                shapeName:'arrow',
                lastModifiedTime:new Date(),
                selectable:true,
                hasControls:true,
                borderColor:'#000',
                hasBorders:true,
                cornerStyle:'circle',
                cornerSize:10,
                cornerColor:'#6B7587',
                padding:0,
                LockRotation: true,
                transparentCorners:false,
                fill: selectedToolColor,
                strokeWidth:selectedToolStroke
            }
        );

        group.setControlsVisibility({
            mt: false,
            mb: false,
            ml: false,
            mr: false,
            br: false,
            tl: false,
            //mtr: false,
        });

        canvas.remove(triangle,triangle2);// removing old object
        // console.log(group,'group',height, origY , width, origX)
        if(height === origY && width === origX){
            return true;
        }else {
            canvas.add(group);
            canvas.setActiveObject(group);
            //canvas.isDrawingMode = false;
            //eventBus.dispatch('send-to-websocket-fabric', {type: 'add', userPointer: group});
        }
    });

}


export function drawDoubleEndedArrow(selected_canvas) {
    removeEvents(selected_canvas);
    selected_canvas.isDrawingMode = true;
    selected_canvas.freeDrawingBrush.color = "#f1f1f100";
    selected_canvas.freeDrawingBrush.width = 0;

    // Extended fabric line class
    let canvas = selected_canvas;
    let line, triangle,triangle2, isDown,deltaX,deltaY,origX,origY,height,width;
    canvas.on('mouse:down', function(o) {
        isDown = true;
        let pointer = canvas.getPointer(o.e);
        origX = pointer.x;
        origY = pointer.y;
        width= origX;
        height=origY;
        let points = [pointer.x, pointer.y, pointer.x, pointer.y];
        line = new fabric.Line(points, {
            strokeWidth: selectedToolStroke+2,
            fill: selectedToolColor,
            stroke: selectedToolColor,
            originX: 'center',
            originY: 'center',
            id:'arrow_line'
        });
        let centerX = (line.x1 + line.x2) / 2;
        let centerY = (line.y1 + line.y2) / 2;
        deltaX = line.left - centerX;
        deltaY = line.top - centerY;

        triangle = new fabric.Triangle({
            left: line.get('x1') + deltaX,
            top: line.get('y1') + deltaY,
            originX: 'center',
            originY: 'center',
            selectable: false,
            pointType: 'arrow_start',
            angle: -45,
            width: selectedToolStroke+16,
            height: selectedToolStroke+22,
            fill: selectedToolColor

        });
        triangle2 = new fabric.Triangle({
            left: line.get('x1') + deltaX,
            top: line.get('y1') + deltaY,
            originX: 'center',
            originY: 'center',
            selectable: false,
            pointType: 'arrow_start',
            angle: -45,
            width: selectedToolStroke+16,
            height: selectedToolStroke+22,
            fill: selectedToolColor
        });
        canvas.add(line, triangle2,triangle);
    });

    let _FabricCalcArrowAngle = function(x1, y1, x2, y2) {
        let angle = 0, x, y;
        x = (x2 - x1);
        y = (y2 - y1);
        if (x === 0) {
            angle = (y === 0) ? 0 : (y > 0) ? Math.PI / 2 : Math.PI * 3 / 2;
        } else if (y === 0) {
            angle = (x > 0) ? 0 : Math.PI;
        } else {
            angle = (x < 0) ? Math.atan(y / x) + Math.PI :
                (y < 0) ? Math.atan(y / x) + (2 * Math.PI) : Math.atan(y / x);
        }
        return (angle * 180 / Math.PI + 90);
    };
    let _FabricCalcArrowAngle2 = function(x1, y1, x2, y2) {
        let angle = 0, x, y;
        x = (x2 - x1);
        y = (y2 - y1);
        if (x === 0) {
            angle = (y === 0) ? 0 : (y > 0) ? Math.PI / 2 : Math.PI * 3 / 2;
        } else if (y === 0) {
            angle = (x > 0) ? 0 : Math.PI;
        } else {
            angle = (x < 0) ? Math.atan(y / x) + Math.PI :
                (y < 0) ? Math.atan(y / x) + (2 * Math.PI) : Math.atan(y / x);
        }
        return (angle * 180 / Math.PI + 270);
    };

    canvas.on('mouse:move', function(o) {
        if (isDown) {
            let pointer = canvas.getPointer(o.e);
            line.set({
                x2: pointer.x,
                y2: pointer.y
            });
            triangle.set({
                'left': pointer.x + deltaX,
                'top': pointer.y + deltaY,
                'angle': _FabricCalcArrowAngle(line.x1,
                    line.y1,
                    line.x2,
                    line.y2)
            });
            triangle2.set({
                'angle': _FabricCalcArrowAngle2(line.x1,
                    line.y1,
                    line.x2,
                    line.y2)
            });
            canvas.renderAll();
            width= Math.abs(origX - pointer.x);
            height=Math.abs(origY - pointer.y);
        }
    });

    canvas.on('mouse:up', function() {
        if (!isDown) return;
        isDown = false;
        let group = new fabric.Group([line,triangle2,triangle],
            {
                id:'double-headed-arrow'+new Date().getTime()+Math.random().toString(36).substr(2,8)+userId,
                userId: userId,
                customEditorId:custom_editor_id,
                shapeName:'double headed arrow',
                lastModifiedTime:new Date(),
                selectable:true,
                hasControls:true,
                borderColor:'#000',
                hasBorders:true,
                cornerStyle:'circle',
                cornerSize:10,
                cornerColor:'#6B7587',
                padding:0,
                LockRotation: true,
                transparentCorners:false,
                fill: selectedToolColor,
                stroke:selectedToolColor,
                strokeWidth:selectedToolStroke
            }
        );
        canvas.remove(line, triangle2,triangle);// removing old object
        if(height === origY && width === origX){
            return true;
        }else {
            canvas.add(group);
            canvas.setActiveObject(group);
            //eventBus.dispatch('send-to-websocket-fabric', {type: 'add', userPointer: group});
        }
    });
}

function drawLine(selected_canvas) {
    removeEvents(selected_canvas);
    let line,isDown;

    selected_canvas.on('mouse:down', function(o) {
        isDown = true;
        let pointer = selected_canvas.getPointer(o.e);
        let points = [ pointer.x, pointer.y, pointer.x, pointer.y ];
        line = new fabric.Line(points, {
            strokeWidth: selectedToolStroke,
            fill: selectedToolColor,
            stroke: selectedToolColor,
            originX: 'left',
            originY: 'top',
            noScaleCache: false,
            strokeUniform: true,
            id:'line'+new Date().getTime()+Math.random().toString(36).substr(2,8)+userId,
            userId: userId,
            customEditorId:custom_editor_id,
            shapeName:'line',
            lastModifiedTime:new Date(),
            selectable:true,
            hasControls:true,
            borderColor:'#000',
            hasBorders:true,
            cornerStyle:'circle',
            cornerSize:10,
            cornerColor:'#6B7587',
            padding:0,
            LockRotation: true,
            transparentCorners:false,
        });
        selected_canvas.add(line);
    });
    selected_canvas.on('mouse:move', function(o) {
        if (!isDown) return;
        let pointer = selected_canvas.getPointer(o.e);
        line.set({ x2: pointer.x, y2: pointer.y });
        selected_canvas.renderAll();
    });

    selected_canvas.on('mouse:up', function() {
        if (!isDown) return;
        isDown = false;
        line.setCoords();
        if(line.height === 0 && line.width === 0){
            selected_canvas.remove(line);// removing old object
        }else{
            selected_canvas.setActiveObject(line);
            //eventBus.dispatch('send-to-websocket-fabric',{type:'add',userPointer:line,resize:true});
        }
        selected_canvas.renderAll();
    });
}

function drawEllipse(selected_canvas){
    let ellipse, isDown, origX, origY;
    removeEvents(selected_canvas);
    selected_canvas.on('mouse:down', function(o) {
        isDown = true;
        let pointer = selected_canvas.getPointer(o.e);
        origX = pointer.x;
        origY = pointer.y;
        ellipse = new fabric.Ellipse({
            left: pointer.x,
            top: pointer.y,
            strokeWidth: strokeSize-2,
            stroke: selectedToolColor,
            fill: '',
            noScaleCache: false,
            strokeUniform: true,
            originX: 'left', originY: 'top',
            rx: 0,
            ry: 0,
            id:'ellipse'+new Date().getTime()+Math.random().toString(36).substr(2,8)+userId,
            userId: userId,
            customEditorId:custom_editor_id,
            shapeName:'ellipse',
            lastModifiedTime:new Date(),
            selectable:true,
            hasControls:true,
            borderColor:'#000',
            hasBorders:true,
            cornerStyle:'circle',
            cornerSize:10,
            cornerColor:'#6B7587',
            padding:0,
            LockRotation: true,
            transparentCorners:false,
        });
        selected_canvas.add(ellipse);
    });

    selected_canvas.on('mouse:move', function(o){
        if (!isDown) return;
        let pointer = selected_canvas.getPointer(o.e);
        if (origX > pointer.x) {
            ellipse.set({
                left: (pointer.x)
            });
        }

        if (origY > pointer.y) {
            ellipse.set({
                top: (pointer.y)
            });
        }
        ellipse.set({ rx: Math.abs(origX - pointer.x)/2,ry:Math.abs(origY - pointer.y)/2 });
        selected_canvas.renderAll();
    });

    selected_canvas.on('mouse:up', function(){
        if (!isDown) return;
        isDown = false;
        if(ellipse.height === 0 && ellipse.width === 0){
            selected_canvas.remove(ellipse);
        }else{
            selected_canvas.setActiveObject(ellipse);
            //eventBus.dispatch('send-to-websocket-fabric',{type:'add',userPointer:ellipse,resize:true});
        }
        selected_canvas.renderAll();

    });
}

export function addTextField(selected_canvas) {
    let minHeight = 0;
    let rect, isDown = false, origX, origY, itext;

    // Remove existing event listeners
    function removeCanvasEvents() {
        selected_canvas.off('mouse:down');
        selected_canvas.off('mouse:move');
        selected_canvas.off('mouse:up');
    }

    // Attach event listeners
    selected_canvas.on('mouse:down', function (o) {
        isDown = true;
        let pointer = selected_canvas.getPointer(o.e);
        origX = pointer.x;
        origY = pointer.y;

        rect = new fabric.Rect({
            left: origX,
            top: origY,
            width: 1,
            height: selectedFontSize + 8,
            fill: "#ffffff",
            strokeWidth: 1,
            stroke: selectedToolColor,
            selectable: false,
        });

        itext = new fabric.Textbox('', {
            id: `text-${Date.now()}-${Math.random().toString(36).substr(2, 8)}`,
            userId: userId,
            shapeName: 'text',
            lastModifiedTime: new Date(),
            fontFamily: selectedTextStyle,
            fontWeight: 600,
            width: 1,
            height: selectedFontSize,
            left: origX,
            top: origY,
            fill: selectedToolColor,
            cornerSize: 7,
            cornerColor: 'black',
            editingBorderColor: 'black',
            borderColor: 'black',
            selectable: true,
            transparentCorners: false,
            breakWords: true,
            hasControls: false,
            shadow: {
                color: '#00000045',
                blur: 8,
                offsetX: 0,
                offsetY: 0,
                opacity: 1,
            },
            hasRotatingPoint: false,
            fontSize: Number(selectedTextSize),
        });

        selected_canvas.add(rect);
    });

    selected_canvas.on('mouse:move', function (o) {
        if (!isDown) return;

        let pointer = selected_canvas.getPointer(o.e);

        if (origX > pointer.x) {
            rect.set({ left: pointer.x });
            itext.set({ left: pointer.x });
        }
        if (origY > pointer.y) {
            rect.set({ top: pointer.y });
            itext.set({ top: pointer.y });
        }

        rect.set({ width: Math.abs(origX - pointer.x) });
        itext.set({ width: Math.abs(origX - pointer.x) });
        selected_canvas.renderAll();
    });

    selected_canvas.on('mouse:up', function () {
        if (!isDown) return;
        isDown = false;

        rect.setCoords();
        selected_canvas.remove(rect);

        if (itext.width < 2) return false;

        minHeight = rect.height;
        itext.set({ minHeight: minHeight });
        itext.setControlsVisibility({ mb: false, mtr: false });
        itext.setCoords();

        selected_canvas.add(itext);
        removeCanvasEvents();

        selected_canvas.setActiveObject(itext);
        itext.enterEditing();
        selected_canvas.renderAll();
    });
}


function addNumberInCanvas(selected_canvas) {
    // Remove previous event listeners (if needed)
    removeEvents(selected_canvas);

    let circle, iText, group, origX, origY;
    let shadow = new fabric.Shadow({
        color: '#0000006b',
        blur: 10,
        offsetX: 0,
        offsetY: 0,
    });

    selected_canvas.on('mouse:down', function (o) {
        let pointer = selected_canvas.getPointer(o.e);
        origX = pointer.x;
        origY = pointer.y;

        // Create a circle
        circle = new fabric.Circle({
            radius: 7,
            padding: 2,
            centeredScaling: true,
            strokeWidth: 15,
            lockUniScaling: true,
            stroke: selectedToolColor,
            selectable: false,
            fill: selectedToolColor,
            originX: 'center',
            originY: 'center',
            hasControls: false,
            hasBorders: false,
        });

        // Create a text
        iText = new fabric.Text('' + digit, {
            fontFamily: 'arial',
            fontSize: 12,
            fontWeight: 10,
            top: 1,
            strokeWidth: 0,
            textAlign: 'center',
            originX: 'center',
            originY: 'center',
            fill: 'white',
            selectable: false,
            stroke: 'white',
            hasControls: false,
            hasBorders: false,
        });

        // Create a group with the circle and text
        group = new fabric.Group([circle, iText], {
            left: origX - 16,
            top: origY - 16,
            fill: selectedToolColor,
            stroke: selectedToolColor,
            lockSkewingX: true,
            hasRotatingPoint: false,
            object_id: 'number',
            shadow: shadow,
            id: 'number' + new Date().getTime() + Math.random().toString(36).substr(2, 8) + userId,
            userId: userId,
            customEditorId: custom_editor_id,
            shapeName: 'number',
            lastModifiedTime: new Date(),
            selectable: true,
            hasControls: true,
            borderColor: '#000',
            hasBorders: true,
            cornerStyle: 'circle',
            cornerSize: 10,
            cornerColor: '#6B7587',
            padding: 0,
            lockRotation: true,
            transparentCorners: false,
        });

        // Hide specific controls
        group.setControlsVisibility({
            mt: false,
            mb: false,
            ml: false,
            mr: false,
            mtr: false,
        });

        // Add the group to the canvas
        selected_canvas.add(group);
        selected_canvas.setActiveObject(group);
        selected_canvas.renderAll();

        // Increment the digit for the next number
        digit++;

        // Dispatch an event if needed
        // eventBus.dispatch('send-to-websocket-fabric', { type: 'add', userPointer: group });
    });
}


function addAlphabetInCanvas(selected_canvas) {
    // Remove previous event listeners (if needed)
    removeEvents(selected_canvas);

    // Ensure positive alphabetNo
    alphabetNo = alphabetNo < 1 ? 0 : alphabetNo;

    let group, triangle, circle, iText, origX, origY;

    selected_canvas.on('mouse:down', function (o) {
        // Get pointer coordinates
        let pointer = selected_canvas.getPointer(o.e);
        origX = pointer.x;
        origY = pointer.y;

        // Define shadow
        let shadow = new fabric.Shadow({
            color: '#0000006b',
            blur: 10,
            offsetX: 0,
            offsetY: 0,
        });

        // Create a triangle
        triangle = new fabric.Triangle({
            originX: 'center',
            originY: 'center',
            selectable: false,
            angle: -180,
            width: 24.4,
            height: 20,
            top: -1.7,
            left: -1.55,
            fill: selectedToolColor,
            stroke: selectedToolColor,
            strokeWidth: 1,
        });

        // Create a circle
        circle = new fabric.Circle({
            radius: 14,
            left: -16.1,
            top: -33,
            fill: selectedToolColor,
            stroke: selectedToolColor,
            strokeWidth: 1,
        });

        // Create text
        iText = new fabric.Text(caseType === 'Lower' ? alphabetArray[alphabetNo].toLowerCase() : alphabetArray[alphabetNo], {
            fontFamily: 'arial',
            fontSize: 12,
            fontWeight: 10,
            left: -2,
            top: -18,
            strokeWidth: 0,
            textAlign: 'center',
            originX: 'center',
            originY: 'center',
            fill: 'white',
            selectable: false,
            stroke: 'white',
            hasControls: false,
            hasBorders: false,
        });

        // Create a group with the shapes and text
        group = new fabric.Group([triangle, circle, iText], {
            id: 'alphabet' + new Date().getTime() + Math.random().toString(36).substr(2, 8) + userId,
            left: origX - 32,
            top: origY - 36,
            fill: selectedToolColor,
            lockUniScaling: true,
            hasRotatingPoint: false,
            shadow: shadow,
            strokeWidth: 30,
            stroke: selectedToolColor,
            object_id: 'alphabet', // Custom property
            userId: userId,
            customEditorId: custom_editor_id,
            shapeName: 'alphabet',
            lastModifiedTime: new Date(),
            selectable: true,
            hasControls: true,
            borderColor: '#000',
            hasBorders: true,
            cornerStyle: 'circle',
            cornerSize: 10,
            cornerColor: '#6B7587',
            padding: 0,
            lockRotation: true,
            transparentCorners: false,
        });

        // Hide specific controls
        group.setControlsVisibility({
            mt: false,
            mb: false,
            ml: false,
            mr: false,
            mtr: false,
        });

        // Add the group to the canvas
        selected_canvas.add(group);
        selected_canvas.setActiveObject(group);
        selected_canvas.renderAll();

        // Update alphabetNo
        alphabetNo = alphabetNo === 25 ? 0 : alphabetNo + 1;

        // Optionally dispatch an event
        // eventBus.dispatch('send-to-websocket-fabric', { type: 'add', userPointer: group });
    });
}


function highlightInCanvas(selected_canvas){
    let rect, isDown, origX, origY;
    removeEvents(selected_canvas);
    selected_canvas.on('mouse:down', function(o) {
        isDown = true;
        let pointer = selected_canvas.getPointer(o.e);
        origX = pointer.x;
        origY = pointer.y;
        rect = new fabric.Rect({
            left: origX,
            top: origY,
            originX: 'left',
            originY: 'top',
            noScaleCache: false,
            strokeUniform: true,
            width: pointer.x - origX,
            height: pointer.y - origY,
            angle: 0,
            fill: selectedToolColor,
            opacity:0.34,
            userId: userId,
            id:'highlight'+new Date().getTime()+Math.random().toString(36).substr(2,8)+userId,
            customEditorId:custom_editor_id,
            shapeName:'highlight',
            lastModifiedTime:new Date(),
            selectable:true,
            hasControls:true,
            borderColor:'#000',
            hasBorders:true,
            cornerStyle:'circle',
            cornerSize:10,
            cornerColor:'#6B7587',
            padding:0,
            LockRotation: true,
            transparentCorners:false,
        });
        selected_canvas.add(rect);
    });

    selected_canvas.on('mouse:move', function(o) {
        if (!isDown) return;
        let pointer = selected_canvas.getPointer(o.e);
        if (origX > pointer.x) {
            rect.set({
                left: (pointer.x)
            });
        }
        if (origY > pointer.y) {
            rect.set({
                top: (pointer.y)
            });
        }

        rect.set({
            width: Math.abs(origX - pointer.x)
        });
        rect.set({
            height: Math.abs(origY - pointer.y)
        });

        selected_canvas.renderAll();
    });

    selected_canvas.on('mouse:up', function() {
        if (!isDown) return;
        isDown = false;
        rect.setCoords();
        if(rect.height === 0 && rect.width === 0){
            selected_canvas.remove(rect);// removing old object
        }else{
            selected_canvas.setActiveObject(rect);
            //eventBus.dispatch('send-to-websocket-fabric',{type:'add',userPointer:rect,resize:true});
        }
        selected_canvas.renderAll();
    });

}

function highlightBlurInCanvas(selected_canvas){
    let rect, isDown, origX, origY;
    removeEvents(selected_canvas);
    selected_canvas.on('mouse:down', function(o) {
        isDown = true;
        let pointer = selected_canvas.getPointer(o.e);
        origX = pointer.x;
        origY = pointer.y;
        rect = new fabric.Rect({
            left: origX,
            top: origY,
            originX: 'left',
            originY: 'top',
            noScaleCache: false,
            stroke:'#5E5E5E',
            strokeWidth:2,
            width: pointer.x - origX,
            height: pointer.y - origY,
            angle: 0,
            fill: '#ffffff',
            opacity:0.3,
            userId: userId,
            id:'blur'+new Date().getTime()+Math.random().toString(36).substr(2,8)+userId,
            customEditorId:custom_editor_id,
            shapeName:'blur',
            lastModifiedTime:new Date(),
            selectable:true,
            hasControls:true,
            borderColor:'#5E5E5E',
            hasBorders:true,
            cornerStyle:'circle',
            cornerSize:10,
            cornerColor:'#0E9AEF',
            padding:0,
            LockRotation: true,
            transparentCorners:false,
        });
        selected_canvas.add(rect);
    });

    selected_canvas.on('mouse:move', function(o) {
        if (!isDown) return;
        let pointer = selected_canvas.getPointer(o.e);
        if (origX > pointer.x) {
            rect.set({
                left: (pointer.x)
            });
        }
        if (origY > pointer.y) {
            rect.set({
                top: (pointer.y)
            });
        }

        rect.set({
            width: Math.abs(origX - pointer.x)
        });
        rect.set({
            height: Math.abs(origY - pointer.y)
        });

        selected_canvas.renderAll();
    });

    selected_canvas.on('mouse:up', function() {
        if (!isDown) return;
        isDown = false;
        rect.setCoords();
        if(rect.height === 0 && rect.width === 0){
            selected_canvas.remove(rect);// removing old object
        }else{
            const copiedCanvas = selected_canvas.toCanvasElement();

            const blurredImage = new fabric.Image(copiedCanvas,{
                userId: rect.userId,
                id:rect.id,
                customEditorId:rect.custom_editor_id,
                shapeName:rect.shapeName,
                lastModifiedTime:new Date(),
                cropX:  rect.left,
                cropY:  rect.top,
                width: rect.width,
                height: rect.height,
                left: rect.left,
                top: rect.top,
                scaleX:1,
                scaleY:1,
                borderColor:'#5E5E5E',
                hasBorders:true,
                cornerStyle:'circle',
                cornerSize:10,
                cornerColor:'#0E9AEF',
                LockRotation: true,
                lockMovementX : true,
                lockMovementY : true
            },{crossOrigin: "anonymous"});

            const filter = new fabric.Image.filters.Blur({
                blur: 0.2
            });
            blurredImage.filters.push(filter);
            blurredImage.setControlsVisibility({
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
            blurredImage.applyFilters();

            selected_canvas.remove(rect);// removing old object

            selected_canvas.add(blurredImage);
            selected_canvas.setActiveObject(blurredImage);
            selected_canvas.renderAll();
            //eventBus.dispatch('send-to-websocket-fabric',{type:'add',userPointer:blurredImage});
        }
        selected_canvas.renderAll();
    });
}

export function speechBubbleInCanvasOnMouseMove(selected_canvas){
    removeEvents(selected_canvas);
    let textbox, rect,poly,poly2, isDown,origX,origY,height,width,arrowWidth = 16;
    selected_canvas.on('mouse:down', function(o) {
        isDown = true;
        let pointer = selected_canvas.getPointer(o.e);
        origX = pointer.x;
        origY = pointer.y;
        width= origX;
        height=origY;
        //text
        textbox = new fabric.Textbox('', {
            strokeWidth: selectedToolStroke+2,
            fill: selectedToolColor,
            stroke: selectedToolColor,
            left: origX,
            top: origY,
            width: pointer.x - origX,
            fontSize: 16,
            originY: 'center',
            originX: 'center',
            id:'text_box'
        });
        //speech bubble background box
        rect = new fabric.Rect({
            fill: 'white',
            stroke: 'black',
            left: origX,
            top: origY,
            width: pointer.x - origX,
            strokeWidth: selectedToolStroke+2,
            rx: 8,
            ry: 8,
            objectCaching: false
        });

        //speech bubble tail polygon
        poly = new fabric.Polygon(
            [{x:0,y:0},{x:1,y:1},{x:1,y:0}],
            {
                fill: 'white',
                stroke: 'black',
                strokeWidth: selectedToolStroke+2,
                objectCaching: false
            }
        );

        //2nd tail poly to overlay the bubble stroke
        poly2 = new fabric.Polygon(
            [{x:0,y:0},{x:1,y:1},{x:1,y:0}],
            {
                fill: 'white',
                objectCaching: false
            }
        );
        selected_canvas.add(poly, rect, poly2, textbox);
    });
    selected_canvas.on('mouse:move', function(o) {
        if (isDown) {
            let pointer = selected_canvas.getPointer(o.e);
            let x= pointer.x,y=pointer.y;
            if (origX > x) {
                rect.set({
                    left: x
                });
                textbox.set({
                    left: x
                });
            }
            if (origY > y) {
                rect.set({
                    top: y
                });
                textbox.set({
                    top: y
                });
            }
            width= Math.abs(origX - x);
            height=Math.abs(origY - y);
            rect.set({
                width: width
            });
            rect.set({
                height: height
            });

            //to support 360° thick tails we have to do some triangulation
            //if the textbox was moved, update the handle position too
            let handleLeft =  origX,handleTop=origY;
            if(x !== origX ||
                y !== origY) {
                handleLeft += (x - origX);
                handleTop += (y - origY);
            }
            let halfPi = Math.PI/2;

            let angleRadians = (handleTop -origY , handleLeft-origX);
            let offsetX = Math.cos(angleRadians + halfPi);
            let offsetY = Math.sin(angleRadians + halfPi);

            //update tail poly
            poly.points[0].x = handleLeft;
            poly.points[0].y = handleTop;
            poly.points[1].x = x - (offsetX * arrowWidth);
            poly.points[1].y = y - (offsetY * arrowWidth);
            poly.points[2].x = x + (offsetX * arrowWidth);
            poly.points[2].y = y + (offsetY * arrowWidth);


            //white overlay poly (prevent dividing line)
            let halfStroke = (selectedToolStroke+2)/2;
            poly2.points[0].x = rect.left;
            poly2.points[0].y = rect.top;
            poly2.points[1].x = x - offsetX * (arrowWidth - halfStroke);
            poly2.points[1].y = y - offsetY * (arrowWidth - halfStroke);
            poly2.points[2].x = x + offsetX * (arrowWidth - halfStroke);
            poly2.points [2].y = y + offsetY * (arrowWidth - halfStroke);
            selected_canvas.renderAll();
        }
    });
    selected_canvas.on('mouse:up', function() {
        if (!isDown) return;
        isDown = false;
        let group = new fabric.Group([poly, rect, poly2, textbox],
            {
                id:'speech-bubble'+new Date().getTime()+Math.random().toString(36).substr(2,8)+userId,
                userId: userId,
                customEditorId:custom_editor_id,
                shapeName:'speech bubble',
                lastModifiedTime:new Date(),
                selectable:true,
                hasControls:true,
                borderColor:'#000',
                hasBorders:true,
                cornerStyle:'circle',
                cornerSize:10,
                cornerColor:'#6B7587',
                padding:0,
                LockRotation: true,
                transparentCorners:false,
                fill: selectedToolColor,
                stroke:selectedToolColor,
                strokeWidth:selectedToolStroke
            }
        );
        selected_canvas.remove(poly, rect, poly2, textbox);// removing old object
        if(height === origY && width === origX){
            return true;
        }else {
            selected_canvas.add(group);
            selected_canvas.setActiveObject(group);
            //eventBus.dispatch('send-to-websocket-fabric', {type: 'add', userPointer: group});
        }
    });
}
export function speechBubbleInCanvas(selected_canvas){
    removeEvents(selected_canvas);
    let boxPadding = 16;
    let arrowWidth = 16;
    let handleSize = 24;
    // Extended fabric line class
    let textbox,handle, rect,poly,poly2, isDown,origX,origY,height,width;
    selected_canvas.on('mouse:down', function(o) {
        isDown = true;
        let pointer = selected_canvas.getPointer(o.e);
        origX = pointer.x;
        origY = pointer.y;
        width= origX;
        height=origY;
        //let points = [pointer.x, pointer.y, pointer.x, pointer.y];

        //speech bubble tail handle
        handle = new fabric.Rect({
            fill: 'transparent',
            left: 128,
            top: 160,
            width: handleSize,
            height: handleSize,
            hasRotatingPoint: false,
            hasControls: false,
            originY: 'center',
            originX: 'center'
        });
        //text
        textbox = new fabric.Textbox('', {
            strokeWidth: selectedToolStroke+2,
            fill: selectedToolColor,
            stroke: selectedToolColor,
            left: 200,
            top: 80,
            width: 180,
            fontSize: 16,
            originY: 'center',
            originX: 'center',
            id:'text_box'
        });
        //to detect changes in the textbox position and update the handle when the textbox was moved, let's store the last known coords
        textbox.lastLeft = textbox.left;
        textbox.lastTop = textbox.top;
        /*let centerX = (line.x1 + line.x2) / 2;
        let centerY = (line.y1 + line.y2) / 2;
        deltaX = textbox.left - centerX;
        deltaY = textbox.top - centerY;*/
        //speech bubble background box
        rect = new fabric.Rect({
            fill: 'white',
            stroke: 'black',
            strokeWidth: selectedToolStroke+2,
            rx: 8,
            ry: 8,
            objectCaching: false
        });

        //speech bubble tail polygon
        poly = new fabric.Polygon(
            [{x:0,y:0},{x:1,y:1},{x:1,y:0}],
            {
                fill: 'white',
                stroke: 'black',
                strokeWidth: selectedToolStroke+2,
                objectCaching: false
            }
        );

        //2nd tail poly to overlay the bubble stroke
        poly2 = new fabric.Polygon(
            [{x:0,y:0},{x:1,y:1},{x:1,y:0}],
            {
                fill: 'white',
                objectCaching: false
            }
        );

        selected_canvas.add(poly, rect, poly2, textbox);
        //  selected_canvas.add(handle).setActiveObject(handle);
    });


    selected_canvas.on('mouse:move', function(o) {
        if (isDown) {
            let pointer = selected_canvas.getPointer(o.e);
            if (origX > pointer.x) {
                rect.set({
                    left: (pointer.x)
                });
            }
            if (origY > pointer.y) {
                rect.set({
                    top: (pointer.y)
                });
            }

            rect.set({
                width: Math.abs(origX - pointer.x)
            });
            //lets spare us some typing
            let x = textbox.left;
            let y = textbox.top;

            //update rect
            let bound = textbox.getBoundingRect();
            rect.left = bound.left - boxPadding;
            rect.top = bound.top - boxPadding;
            rect.width = bound.width + (boxPadding*2);
            rect.height = bound.height + (boxPadding*2);

            //if the textbox was moved, update the handle position too
            if(x !== textbox.lastLeft ||
                y !== textbox.lastTop) {
                handle.left += (x - textbox.lastLeft);
                handle.top += (y - textbox.lastTop);
                handle.setCoords();
            }
            //to support 360° thick tails we have to do some triangulation
            let halfPi = Math.PI/2;
            let angleRadians = Math.atan2(handle.top - y, handle.left - x);
            let offsetX = Math.cos(angleRadians + halfPi);
            let offsetY = Math.sin(angleRadians + halfPi);

            //update tail poly
            poly.points[0].x = handle.left;
            poly.points[0].y = handle.top;
            poly.points[1].x = x - (offsetX * arrowWidth);
            poly.points[1].y = y - (offsetY * arrowWidth);
            poly.points[2].x = x + (offsetX * arrowWidth);
            poly.points[2].y = y + (offsetY * arrowWidth);

            //white overlay poly (prevent dividing line)
            let halfStroke = (selectedToolStroke+2)/2;
            poly2.points[0].x = handle.left;
            poly2.points[0].y = handle.top;
            poly2.points[1].x = x - offsetX * (arrowWidth - halfStroke);
            poly2.points[1].y = y - offsetY * (arrowWidth - halfStroke);
            poly2.points[2].x = x + offsetX * (arrowWidth - halfStroke);
            poly2.points[2].y = y + offsetY * (arrowWidth - halfStroke);
            selected_canvas.renderAll();
        }
    });

    selected_canvas.on('mouse:up', function() {
        if (!isDown) return;
        isDown = false;
        let group = new fabric.Group([poly, rect, poly2, textbox],
            {
                id:'speech-bubble'+new Date().getTime()+Math.random().toString(36).substr(2,8)+userId,
                userId: userId,
                customEditorId:custom_editor_id,
                shapeName:'speech bubble',
                lastModifiedTime:new Date(),
                selectable:true,
                hasControls:true,
                borderColor:'#000',
                hasBorders:true,
                cornerStyle:'circle',
                cornerSize:10,
                cornerColor:'#6B7587',
                padding:0,
                LockRotation: true,
                transparentCorners:false,
                fill: selectedToolColor,
                stroke:selectedToolColor,
                strokeWidth:selectedToolStroke
            }
        );
        selected_canvas.remove(poly, rect, poly2, textbox);// removing old object
        if(height === origY && width === origX){
            selected_canvas.add(group);
            selected_canvas.setActiveObject(group);
            //eventBus.dispatch('send-to-websocket-fabric', {type: 'add', userPointer: group});
            return true;
        }else {
            selected_canvas.add(group);
            selected_canvas.setActiveObject(group);
            //eventBus.dispatch('send-to-websocket-fabric', {type: 'add', userPointer: group});
        }
    });
}

function drawPolygonInCanvas(selected_canvas){
    removeEvents(selected_canvas);
    let min = 99;
    let max = 999999;
    let polygonMode = true;
    let pointArray = [];
    let lineArray = [];
    let activeLine;
    let activeShape = false;
    let canvas,line,polygon,points;

    let prototypefabric = new function () {
        this.initCanvas = function () {
            canvas = selected_canvas;

            canvas.on('mouse:down', function (options) {
                if(options.target && options?.target?.id == pointArray[0]?.id){
                    prototypefabric.polygon.generatePolygon(pointArray);
                }
                if(polygonMode){
                    prototypefabric.polygon.addPoint(options);
                }else{
                    prototypefabric.polygon.drawPolygon();
                }
            });
            canvas.on('mouse:move', function (options) {
                if(activeLine && activeLine.class == "line"){
                    let pointer = canvas.getPointer(options.e);
                    activeLine.set({ x2: pointer.x, y2: pointer.y });

                    let points = activeShape.get("points");
                    points[pointArray.length] = {
                        x:pointer.x,
                        y:pointer.y
                    }
                    activeShape.set({
                        points: points
                    });
                    // canvas.renderAll();
                }
                canvas.renderAll();
            });
        };
    };


    prototypefabric.polygon = {
        drawPolygon : function() {
            polygonMode = true;
            pointArray = new Array();
            lineArray = new Array();
            activeLine;
        },
        addPoint : function(options) {
            let random = Math.floor(Math.random() * (max - min + 1)) + min;
            let id = new Date().getTime() + random;
            let circle = new fabric.Circle({
                radius: 5,
                fill: '#ffffff',
                stroke: '#333333',
                strokeWidth: 0.5,
                left: (options.e.layerX/canvas.getZoom()),
                top: (options.e.layerY/canvas.getZoom()),
                selectable: false,
                hasBorders: false,
                hasControls: false,
                originX:'center',
                originY:'center',
                id:id,
                shapeName:'polygon-start',
                objectCaching:false
            });
            if(pointArray.length === 0){
                circle.set({
                    fill:'red'
                })
            }
            points = [(options.e.layerX/canvas.getZoom()),(options.e.layerY/canvas.getZoom()),(options.e.layerX/canvas.getZoom()),(options.e.layerY/canvas.getZoom())];
            line = new fabric.Line(points, {
                strokeWidth: 2,
                fill: '#999999',
                stroke: '#999999',
                class:'line',
                originX:'center',
                originY:'center',
                selectable: false,
                hasBorders: false,
                hasControls: false,
                evented: false,
                shapeName:'polygon-start',
                objectCaching:false
            });
            if(activeShape){
                let pos = canvas.getPointer(options.e);
                points = activeShape.get("points");
                points.push({
                    x: pos.x,
                    y: pos.y
                });
                polygon = new fabric.Polygon(points,{
                    stroke:'#333333',
                    strokeWidth:1,
                    fill: '#cccccc',
                    opacity: 0.3,
                    selectable: false,
                    hasBorders: false,
                    hasControls: false,
                    evented: false,
                    shapeName:'polygon-start',
                    objectCaching:false
                });
                canvas.remove(activeShape);
                canvas.add(polygon);
                activeShape = polygon;
                canvas.renderAll();
            } else {
                let polyPoint = [{x:(options.e.layerX/canvas.getZoom()),y:(options.e.layerY/canvas.getZoom())}];
                polygon = new fabric.Polygon(polyPoint,{
                    stroke:'#333333',
                    strokeWidth:1,
                    fill: '#cccccc',
                    opacity: 0.3,
                    selectable: false,
                    hasBorders: false,
                    hasControls: false,
                    evented: false,
                    shapeName:'polygon-start',
                    objectCaching:false
                });
                activeShape = polygon;
                canvas.add(polygon);
            }
            activeLine = line;

            pointArray.push(circle);
            lineArray.push(line);

            canvas.add(line);
            canvas.add(circle);
            canvas.selection = false;
        },
        generatePolygon : function(pointArray){
            points = [];
            pointArray.forEach((point) => {
                points.push({
                    x: point.left,
                    y: point.top
                });
                canvas.remove(point);
            });

            lineArray.forEach((line) => {
                canvas.remove(line);
            });
            canvas.remove(activeShape).remove(activeLine);
            polygon = new fabric.Polygon(points,{
                id:'polygon'+new Date().getTime()+Math.random().toString(36).substr(2,8)+userId,
                userId: userId,
                customEditorId:custom_editor_id,
                shapeName:'polygon',
                lastModifiedTime:new Date(),
                selectable:true,
                hasControls:true,
                borderColor:'#000',
                hasBorders:true,
                cornerStyle:'circle',
                cornerSize:10,
                cornerColor:'#6B7587',
                padding:0,
                LockRotation: false,
                transparentCorners:false,
                fill: selectedToolColor,
            });
            canvas.add(polygon);
            canvas.setActiveObject(polygon);
            //eventBus.dispatch('send-to-websocket-fabric',{type:'add',userPointer:polygon,resize:true});
            canvas.renderAll();

            activeLine = null;
            activeShape = null;
            polygonMode = false;
        }
    };

    prototypefabric.initCanvas();
    prototypefabric.polygon.drawPolygon();
}

export function drawObjectInCanvas(id, selectedCanvas){
    let activeObjectElement= selectedCanvas.getActiveObject();

    if (activeObjectElement && typeof activeObjectElement !== "undefined" && activeObjectElement.shapeName === 'text' && activeObjectElement.isEditing){
        activeObjectElement.exitEditing();
    }
    changeObjectSelection(false, selectedCanvas);
    //giving default width to stroke
    //Changing cursor of canvas brush
    // $(".modal_screenshot_image").removeClass('modal_screenshot_image_cursor_move');
    // $(".modal_screenshot_image").addClass('modal_screenshot_image_cursor_crosshair');
    // eventBus.dispatch('call-function-to-selection-tool-active',false);

    //sudo draw mode
    selectedCanvas.isDrawingMode = true;
    selectedCanvas.freeDrawingBrush = new fabric.PencilBrush(selectedCanvas);
    selectedCanvas.freeDrawingBrush.color = "#f1f1f100";
    selectedCanvas.freeDrawingBrush.width = 0;
    drawActive = false;

    switch(id){
        case 'draw':
            drawActive= true;
            selectedCanvas.freeDrawingBrush = new fabric.PencilBrush(selectedCanvas);
            selectedCanvas.freeDrawingBrush.width = Number(selectedToolStroke);
            selectedCanvas.freeDrawingBrush.color = selectedToolColor;
            enableFreeDrawing(selectedCanvas,'free draw');
            break;
        case 'select':
            removeEvents(selectedCanvas);
            selectedCanvas.isDrawingMode = false;
            //Changing cursor of canvas brush
            // $(".modal_screenshot_image").addClass('modal_screenshot_image_cursor_move');
            // $(".modal_screenshot_image").removeClass('modal_screenshot_image_cursor_crosshair');
            changeObjectSelection(true, selectedCanvas);
            // eventBus.dispatch('call-function-to-selection-tool-active',true);
            break;
        case 'addImage':
            removeEvents(selectedCanvas);
            break;
        case 'undo':
        case 'redo':
            removeEvents(selectedCanvas);
            break;
        case 'clear':
            if(selectedCanvas._objects.length > 1){
                selectedCanvas.forEachObject(function(obj){ if(obj.backgroundColor !== '#main_image') { selectedCanvas.remove(obj)} });
                selectedCanvas.selection = false;
            }
            digit = 1;
            alphabetNo = 0;
            break;
        case 'crop':
            changeObjectSelection(false, selectedCanvas);
            drawCrop(selectedCanvas);
            break;
        case 'rectangle':
            changeObjectSelection(false, selectedCanvas);
            drawRectangle(selectedCanvas);
            break;
        case 'triangle':
            changeObjectSelection(false, selectedCanvas);
            drawTriangle(selectedCanvas);
            break;
        case 'image-comment':
            removeEvents(selectedCanvas);
            //$('.upper-canvas').css({cursor: 'default'});
            changeObjectSelection(false, window.fabricCanvas);
            break;
        case 'circle':
            drawCircle(selectedCanvas);
            break;
        case 'arrow':
            drawLineArrow(selectedCanvas);
            break;
        case 'double-headed-arrow':
            drawDoubleEndedArrow(selectedCanvas);
            break;
        case 'line':
            changeObjectSelection(false, selectedCanvas);
            drawLine(selectedCanvas);
            break;
        case 'arrow-line':
            changeObjectSelection(false, selectedCanvas);
            drawLine(selectedCanvas);
            break;
        case 'ellipse':
            changeObjectSelection(false, selectedCanvas);
            drawEllipse(selectedCanvas);
            break;
        case 'text':
            changeObjectSelection(false, selectedCanvas);
            addTextField(selectedCanvas);
            break;
        case 'number':
            changeObjectSelection(false, selectedCanvas);
            addNumberInCanvas(selectedCanvas);
            break;
        case 'alphabet':
            changeObjectSelection(false, selectedCanvas);
            addAlphabetInCanvas(selectedCanvas);
            break;
        case 'highlighter':
            changeObjectSelection(false, selectedCanvas);
            highlightInCanvas(selectedCanvas);
            break;
        case 'blur':
            changeObjectSelection(false, selectedCanvas);
            highlightBlurInCanvas(selectedCanvas);
            break;
        case 'speech-bubbles':
            changeObjectSelection(false, selectedCanvas);
            speechBubbleInCanvas(selectedCanvas);
            break;
        case 'speech-bubble':
            changeObjectSelection(false, selectedCanvas);
            speechBubbleInCanvasOnMouseMove(selectedCanvas);
            break;
        case 'polygon':
            changeObjectSelection(false, selectedCanvas);
            drawPolygonInCanvas(selectedCanvas);
            break;
        // case 'circle-brush':
        //     changeObjectSelection(false, selectedCanvas);
        //     drawCircleBrushInCanvas(selectedCanvas);
        //     break;
        // case 'remove':
        //     //Changing cursor of canvas brush
        //     $(".modal_screenshot_image").addClass('modal_screenshot_image_cursor_move');
        //     $(".modal_screenshot_image").removeClass('modal_screenshot_image_cursor_crosshair');
        //     changeObjectSelection(true, selectedCanvas);
        //     $(actionToolClass+"[data-id='select']").addClass('active');
        //     $(this).removeClass('active');
        //     removeObjectFromCanvas(selectedCanvas);
        //     break;
    }
}


export function infiniteCanvasProperties(selectedFabricCanvas = null){
    if(selectedFabricCanvas == null)
        selectedFabricCanvas = window.fabricCanvas;

    selectedFabricCanvas.off("object:modified");
    selectedFabricCanvas.on("object:modified", function(e) {
        resizeCanvasAndMoveObject(e,selectedFabricCanvas);
    });
    selectedFabricCanvas.off("object:added");
    selectedFabricCanvas.on("object:added", function(e) {
        resizeCanvasAndMoveObject(e,selectedFabricCanvas);
    });
    /*selectedFabricCanvas.off("object:moving");
    selectedFabricCanvas.on("object:moving", function(e) {
        resizeCanvasAndMoveObject(e,selectedFabricCanvas);
    });*/

}

export function resizeCanvasAndMoveObject(e, selectedFabricCanvas) {
    // Get the zoom level
    let zoom = selectedFabricCanvas.getZoom();

    // Current selected object
    let moveB = e.target;

    // Original canvas
    let c = e.target.canvas;

    // Get the top and left of the moved object
    let top = moveB.top;
    let left = moveB.left;

    // Get all objects on the canvas
    let objects = selectedFabricCanvas.getObjects();

    // Initialize the boundaries of objects on the canvas
    let maxLeft = 0, maxTop = 0, minLeft = objects[0].left, minTop = objects[0].top;
    let positiveTop = 0, positiveLeft = 0;

    // Loop through objects to find the max and min coordinates for resizing the canvas
    if (!onLoad) {
        for (let i in objects) {
            if (maxLeft < (objects[i].left + objects[i].width)) {
                maxLeft = objects[i].left + objects[i].width;
            }
            if (minLeft > objects[i].left) {
                minLeft = objects[i].left;
            }
            if (maxTop < (objects[i].top + objects[i].height)) {
                maxTop = objects[i].top + objects[i].height;
            }
            if (minTop > objects[i].top) {
                minTop = objects[i].top;
            }
        }
    }

    // Adjust the canvas if object is moved outside the top boundary
    if (top < 0) {
        positiveTop = -1 * top;
        maxTop = maxTop + positiveTop;
    } else if (minTop > 0 && !onLoad) {
        positiveTop = -1 * minTop;
    }
    if (positiveTop !== 0) {
        for (let i in objects) {
            objects[i].top = objects[i].top + positiveTop;
        }
        c.setHeight(c.height + positiveTop);
    }

    // Adjust the canvas if object is moved outside the left boundary
    if (left < 0 || minLeft > 0) {
        positiveLeft = left < 0 ? -1 * left : -1 * minLeft;
        for (let i in objects) {
            objects[i].left = objects[i].left + positiveLeft;
        }
        c.setWidth(c.width + positiveLeft);
    }

    // Calculate the right boundary of the selected object
    let right = left + moveB.getBoundingRect().width;

    // Check if the canvas needs to be extended horizontally (width)
    if ((c.width - 6) < (right * zoom)) {
        c.setWidth((right * zoom) + 10);
    } else if ((c.width - 6) > ((maxLeft * zoom) + 10) && !onLoad) {
        c.setWidth((maxLeft * zoom) + 10);
    }

    // Check if the canvas needs to be extended vertically (height)
    if ((c.height - 6) < (top * zoom) + (moveB.getBoundingRect().height * zoom)) {
        c.setHeight((top * zoom) + (moveB.getBoundingRect().height * zoom) + 10);
    } else if ((c.height - 6) > ((maxTop * zoom) + 10) && !onLoad) {
        c.setHeight((maxTop * zoom) + 10);
    }
}


