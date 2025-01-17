export function generateUniqueIdForBlock() {
    const s4 = () => Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    return `${s4()}-${new Date().getTime()}`;
}

export function getInitialFabricDoxData(dataUri,height,width){
    return `{"version":"6.5.4","height":${height},"width":${width},"objects":[{"id":"main_image","cropX":0,"cropY":0,"type":"Image","version":"6.5.4","originX":"left","originY":"top","left":0,"top":0,"width":1901,"height":894,"fill":"rgb(0,0,0)","stroke":null,"strokeWidth":0,"strokeDashArray":null,"strokeLineCap":"butt","strokeDashOffset":0,"strokeLineJoin":"miter","strokeUniform":false,"strokeMiterLimit":4,"scaleX":1,"scaleY":1,"angle":0,"flipX":false,"flipY":false,"opacity":1,"shadow":null,"visible":true,"backgroundColor":"#ffffff","fillRule":"nonzero","paintFirst":"fill","globalCompositeOperation":"source-over","skewX":0,"skewY":0,"src":"${dataUri}","crossOrigin":"anonymous","filters":[]}]}`
}