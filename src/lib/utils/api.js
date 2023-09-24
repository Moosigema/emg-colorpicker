//@ts-nocheck
const colors = [
    '#FF0000', '#FFFF00', '#00FF00', '#00F7FF', '#0000FF', '#FF00E6', '#FF0000'

];


export function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

//function to determine between which colors the rainbow cursor is, and the call `interpolateColor` function to have the mix
export function determineRainbowColor(percentage) {
    
    let numSegments = colors.length;
    let segmentSize = 100 / numSegments;
    
    let lowerIndex = Math.floor(percentage / segmentSize);
    let upperIndex = lowerIndex + 1;
    
    if (upperIndex >= numSegments) {
        upperIndex = numSegments - 1;
    }
    
    let segmentPercentage = (percentage % segmentSize) / segmentSize;

    let selectedGradientColor = interpolateColor(colors[lowerIndex], colors[upperIndex], segmentPercentage);

    return selectedGradientColor
    
}


//function to calcultate the mix between 2 colors (with no opacity) with a factor
// it returns an hexa value without opacity
export function interpolateColor(color1, color2, factor) {
        const r1 = parseInt(color1.slice(1, 3), 16);
        const g1 = parseInt(color1.slice(3, 5), 16);
        const b1 = parseInt(color1.slice(5, 7), 16);
        
        
        const r2 = parseInt(color2.slice(1, 3), 16);
        const g2 = parseInt(color2.slice(3, 5), 16);
        const b2 = parseInt(color2.slice(5, 7), 16);
    
        
        const interpolatedColor = `#${Math.round(r1 + factor * (r2 - r1)).toString(16).padStart(2, '0')}` +
                                    `${Math.round(g1 + factor * (g2 - g1)).toString(16).padStart(2, '0')}` +
                                    `${Math.round(b1 + factor * (b2 - b1)).toString(16).padStart(2, '0')}` 
        
        return interpolatedColor;
}


 //function that determine the color at the cursor position on the gradient zone
 export function determineColor(colorShade, shadeCursorPosition){
    if(colorShade.length==7){
        colorShade +="ff"
    }

    let color1 = interpolateColor('#ffffff', '#000000', shadeCursorPosition.y/100);
    let color2 = interpolateColor('#ffffff', colorShade, shadeCursorPosition.x/100);

    let colorHexa = interpolateColor(color2,color1,shadeCursorPosition.y/100);
    // hexa = (colorHexa+opacityHexa).toUpperCase()

    return colorHexa
}



// function that determine what is the cursor position from a hexa color
export function findPercentageByColor(color) {
    
    const nearestColorIndex = findNearestColorIndex(color, colors);

    const percentage = (nearestColorIndex / (colors.length)) * 100;

    return percentage;
}

// function that determine what is the cursor position from a hexa color
function findNearestColorIndex(targetColor, colorArray) {
        
    // const r = parseInt(targetColor.slice(1, 3), 16);
    // const g = parseInt(targetColor.slice(3, 5), 16);
    // const b = parseInt(targetColor.slice(5, 7), 16);

    const r = parseInt(targetColor.slice(1, 3), 16);
    const g = parseInt(targetColor.slice(3, 5), 16);
    const b = parseInt(targetColor.slice(5, 7), 16);

   
    let nearestIndex = 0;
    let nearestDistance = Number.MAX_VALUE;

    for (let i = 0; i < colorArray.length; i++) {
        const color = colorArray[i];
        const rDiff = Math.abs(r - parseInt(color.slice(1, 3), 16));
        const gDiff = Math.abs(g - parseInt(color.slice(3, 5), 16));
        const bDiff = Math.abs(b - parseInt(color.slice(5, 7), 16));
        const totalDiff = rDiff + gDiff + bDiff;

        if (totalDiff < nearestDistance) {
            nearestIndex = i;
            nearestDistance = totalDiff;
        }
    }

    return nearestIndex;
}

export function percentageToHex(percentage) {
    const value = Math.round((percentage * 255) / 100);
    const hexValue = value.toString(16).padStart(2, '0'); 

    return hexValue;
}

export function hexToPercentage(hexOpacity) {
  
    const decimalOpacity = parseInt(hexOpacity, 16);
  
    const percentageOpacity = (decimalOpacity / 255) * 100;
  
    return percentageOpacity;
}



export async function getColorByEyeDropper(){
    // eslint-disable-next-line no-undef
    const eyeDropper = new EyeDropper();
    let response = {}
    response = await eyeDropper
        .open()
        .then(async (result) => {
            // console.log("new hexa : "+result.sRGBHex)
            return {
                statusCode: 200,
                status: "OK",
                result: {
                    color: result.sRGBHex
                }
            }
        })
        .catch(async (e) => {
            return {
                statusCode: 400,
                status: "error",
                message: e
            }
        });
    
        return response
}



export function handleTextColor(inputTextValue){
     //value has to start with '#'
     if (!inputTextValue.startsWith('#')) {
        inputTextValue = '#' + inputTextValue;
    }

    //remove all unecessary caracters (only hexa caracters)
    inputTextValue = inputTextValue.substring(0, 9);
    inputTextValue = inputTextValue.replace(/[^0-9A-Fa-f#]/g, "");
    
    
    //in function of the number of caracters, it set a specific color to the gradient, rainbow, and opacity
    let setColor;
    if(inputTextValue.length==7){
        setColor = inputTextValue+"FF"
    }else if(inputTextValue.length<2){
        setColor = "#FFFFFFFF"
    }else if(inputTextValue.length==2){
        setColor = inputTextValue[0]+inputTextValue[1]+inputTextValue[1]+inputTextValue[1]+inputTextValue[1]+inputTextValue[1]+inputTextValue[1]+"FF"
    }else if(inputTextValue.length==3){
        setColor = inputTextValue[0]+inputTextValue[1]+inputTextValue[1]+inputTextValue[1]+inputTextValue[1]+inputTextValue[1]+inputTextValue[1]+inputTextValue[2]+inputTextValue[2]
    }else if(inputTextValue.length==4){
        setColor = inputTextValue[0]+inputTextValue[1]+inputTextValue[1]+inputTextValue[2]+inputTextValue[2]+inputTextValue[3]+inputTextValue[3]+"FF"
    }else if(inputTextValue.length==5){
        setColor = inputTextValue[0]+inputTextValue[1]+inputTextValue[2]+inputTextValue[3]+inputTextValue[3]+inputTextValue[4]+inputTextValue[4]+"FF"
    }else if(inputTextValue.length==6){
        setColor = inputTextValue[0]+inputTextValue[1]+inputTextValue[2]+inputTextValue[3]+inputTextValue[4]+inputTextValue[5]+inputTextValue[5]+"FF"
    }else if(inputTextValue.length==8){
        setColor = inputTextValue[0]+inputTextValue[1]+inputTextValue[2]+inputTextValue[3]+inputTextValue[4]+inputTextValue[5]+inputTextValue[6]+"0"+inputTextValue[7]
    }else{
        setColor = inputTextValue
    }

    return setColor.toUpperCase()
}




export function getCssGradient(gradient){
    let linearCss = 'linear-gradient(90deg'
        for(let i =0; i <  gradient.length; i++){
            linearCss += ','+gradient[i].color+' '+gradient[i].pourcentage+'%'
        }
        linearCss += ')'
    
    return linearCss
}



export function deepClone(obj) {
    if (obj === null || typeof obj !== 'object') {
        return obj;
    }

    if (Array.isArray(obj)) {
        const newArray = [];
        for (let i = 0; i < obj.length; i++) {
            newArray[i] = deepClone(obj[i]);
        }
        return newArray;
    }

    const newObj = {};
    for (const key in obj) {
        newObj[key] = deepClone(obj[key]);
    }
    return newObj;
}