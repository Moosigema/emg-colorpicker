<script>
    //@ts-nocheck
    import exitIcon from "../assets/exit.svg"
    import eyeDropperIcon from "../assets/eyeDropper.svg"
    import addIcon from "../assets/add.svg"
    import { onMount } from 'svelte';  

    
    export let hexa =  "#FFFFFFFF"
    export let visible = false
    export let coordinates = {
        x: 100,
        y: 100
    }

    let themeColor = "#01093f"

    //global variable to store hexa value
    let colorHexa = "#FFFFFF"
    let opacityHexa = "FF"
 
    //variable to handle gradient zone
    let isGradientCursorMoving = false
    let selectedGradientColor = "#FF0000"
    let gradientColorZone;
    let gradientCursorPosition = {
        x: 2,
        y:2
    }

     //variable to handle rainbow bar
    let colorCursorPosition = 0
    let isColorCursorMoving = false
    let pickerColorBar;
    

     //variable to handle opacity bar
    let opacityCursorPosition = 100
    let isOpacityCursorMoving = false
    let pickerOpacityBar;

    //variable to handle input field
    let inputTextHexa;
    let inputTextValue = "#FFFFFFFF"
    let isInput = false;

    let hasEyeDropperSupport = false


    $: updateInputText(colorHexa,opacityHexa)


    $: onHexaChange(hexa)

    

    let listSavedColor = []

    onMount(async () => {
        hasEyeDropperSupport = () => ('EyeDropper' in window);
        if(localStorage.getItem('listSavedColor')){
            listSavedColor = JSON.parse(localStorage.getItem('listSavedColor'));
        }

        colorHexa = hexa.slice(0,7);
        opacityHexa =  hexa.slice(7,10);
        setSavedColor(hexa)
    })

    function onHexaChange(hexa){
        //We only do something is the update comme from outside than the input field
        if(!isInput){
            if(hexa.length == 7){
                colorHexa = hexa.slice(0,7);
                opacityHexa = "FF"
            }else{
                opacityHexa =  hexa.slice(7,10);
            }
            updateInputText(colorHexa,opacityHexa)
            setSavedColor(hexa)
        }else{
            isInput = false
        }
    }

    //function that update the input text
    function updateInputText(colorHexa,opacityHexa){
        inputTextValue = colorHexa+opacityHexa
    }

    //functions to know if we are moving cursors
    function handleColorCursor(){
        isColorCursorMoving = true
    }

    function handleGradientCursor(){
        isGradientCursorMoving = true
    }

    function handleOpacityCursor(){
        isOpacityCursorMoving = true
    }

    //function to calcultate the mix between 2 colors (with no opacity) with a factor
    // it returns an hexa value without opacity
    function interpolateColor(color1, color2, factor) {
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

    //function to determine between which colors the rainbow cursor is, and the call `interpolateColor` function to have the mix
    function determineColorGradient(percentage) {
        let colors = [
            '#FF0000', '#FFFF00', '#00FF00', '#00F7FF', '#0000FF', '#FF00E6', '#FF0000'
        ];
        let numSegments = colors.length - 1;
        let segmentSize = 100 / numSegments;
        
        let lowerIndex = Math.floor(percentage / segmentSize);
        let upperIndex = lowerIndex + 1;
        
        if (upperIndex >= numSegments) {
            upperIndex = numSegments - 1;
        }
        
        let segmentPercentage = (percentage % segmentSize) / segmentSize;

        selectedGradientColor = interpolateColor(colors[lowerIndex], colors[upperIndex], segmentPercentage);
        
    }

    // function that determine what is the cursor position from a hexa color
    function findPercentageByColor(color) {
        const colors = [
            '#FF0000', '#FFFF00', '#00FF00', '#00F7FF', '#0000FF', '#FF00E6', '#FF0000'
        ];

        
        const nearestColorIndex = findNearestColorIndex(color, colors);

        const percentage = (nearestColorIndex / (colors.length - 1)) * 100;

        return percentage;
    }

    // function that determine what is the cursor position from a hexa color
    function findNearestColorIndex(targetColor, colorArray) {
        
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

    //function that convert an opacity percentage into a hexa value, example : 0% = 00, or 100% = FF 
    function percentageToHex(percentage) {
        const value = Math.round((percentage * 255) / 100);
        const hexValue = value.toString(16).padStart(2, '0'); 
    
        return hexValue;
    }

    //function that stop cursors movement
    function onPointerUp(){
        isColorCursorMoving = false 
        isGradientCursorMoving = false
        isOpacityCursorMoving = false
    }


    //function that determine the color at the cursor position on the gradient zone
    function determineColor(){
        if(selectedGradientColor.length==7){
                selectedGradientColor +="ff"
        }

        let color1 = interpolateColor('#ffffff', '#000000', gradientCursorPosition.y/100);
        let color2 = interpolateColor('#ffffff', selectedGradientColor, gradientCursorPosition.x/100);
        isInput = true
        colorHexa = interpolateColor(color2,color1,gradientCursorPosition.y/100);
        hexa = (colorHexa+opacityHexa).toUpperCase()
    }

    //function that handles cursors movement
    function onPointerMove(e){
        if(isColorCursorMoving){
            let tempPosition = ((e.y-pickerColorBar.getBoundingClientRect().top)/225)*100
            if(tempPosition >=0 && tempPosition <= 100){
                colorCursorPosition = tempPosition

            }
            determineColorGradient(colorCursorPosition)
            determineColor()
        }else if(isGradientCursorMoving){
            let tempPositionY = ((e.y-gradientColorZone.getBoundingClientRect().top)/225)*100
            let tempPositionX = ((e.x-gradientColorZone.getBoundingClientRect().left)/225)*100

            if(tempPositionY >=0 && tempPositionY <= 100){
                gradientCursorPosition.y = tempPositionY

            }

            if(tempPositionX >=0 && tempPositionX <= 100){
                gradientCursorPosition.x = tempPositionX

            }

            determineColor()
        }else if(isOpacityCursorMoving){
            let tempPosition = ((e.y-pickerOpacityBar.getBoundingClientRect().top)/225)*100
            if(tempPosition >=0 && tempPosition <= 100){
                opacityCursorPosition = Math.round(tempPosition)
                 opacityHexa = percentageToHex(opacityCursorPosition)
            }
            isInput = true
            hexa = (colorHexa+opacityHexa).toUpperCase()
        }
    }

    // function that handle the eyedropper
    function openEyeDropper(){
        const eyeDropper = new EyeDropper();

        eyeDropper
            .open()
            .then((result) => {
                console.log("new hexa : "+result.sRGBHex)
                colorCursorPosition = Math.round(findPercentageByColor(result.sRGBHex))
                gradientCursorPosition = {
                    x: 100,
                    y:0
                }
                selectedGradientColor = result.sRGBHex
                colorHexa = result.sRGBHex
                opacityHexa = "FF"
                opacityCursorPosition = 100
                hexa = (colorHexa+opacityHexa).toUpperCase()
            })
            .catch((e) => {
               console.log(e)
            });

        
    }

    //function that handle the input field
    function handleInputHexaColor(){
        
        //value has to start with '#'
        if (!inputTextValue.startsWith('#')) {
            inputTextValue = '#' + inputTextValue;
        }

        //remove all unecessary caracters (only hexa caracters)
        inputTextValue = inputTextValue.substring(0, 9);
        inputTextValue = inputTextValue.replace(/[^0-9A-Fa-f#]/g, "");
        
        isInput = true
        
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

        hexa = setColor.toUpperCase()
        colorCursorPosition = Math.round(findPercentageByColor(setColor.substring(0, 7)))
        gradientCursorPosition = {
                    x: 100,
                    y:0
                }

        let decimalValue = parseInt(setColor.substring(7, 10), 16);
        opacityCursorPosition = Math.round((decimalValue / 255) * 100);
        selectedGradientColor = setColor.substring(0, 7)
    }

    //set the saved color that has been clicked on
    function setSavedColor(savedColor){
        colorCursorPosition = Math.round(findPercentageByColor(savedColor.substring(0, 7)))
        gradientCursorPosition = {
                    x: 100,
                    y:0
                }
        opacityHexa = savedColor.substring(7, 10)
        let decimalValue = parseInt(savedColor.substring(7, 10), 16);
        opacityCursorPosition = Math.round((decimalValue / 255) * 100);
        colorHexa = savedColor.substring(0, 7)
        selectedGradientColor = colorHexa
        hexa = (colorHexa+opacityHexa).toUpperCase()
        hexa = hexa
    }

    //add color to the saved list. Colors are saved in localStorage. 
    function addColor(){
        listSavedColor.push(colorHexa+opacityHexa)
        listSavedColor = listSavedColor
        localStorage.setItem('listSavedColor', JSON.stringify(listSavedColor));
    }

</script>
    <svelte:body on:pointerup={onPointerUp}/>
     <!-- svelte-ignore a11y-no-noninteractive-element-to-interactive-role -->
    <div class="colorPicker" role="button" tabindex="0" on:pointerdown|preventDefault|stopPropagation on:pointermove|preventDefault={onPointerMove} class:visible style="top:{coordinates.y}px; left:{coordinates.x}px; --theme-color: {themeColor}; --selectedGradientColor: {selectedGradientColor};" >
        <img class="exitIcon" src={exitIcon} alt="exit icon" role="button" tabindex="0" on:pointerdown|preventDefault|stopPropagation={()=>{visible = false}}>
        <div class="colorAjustement">
            <div class="gradientColor" bind:this={gradientColorZone} >
                <!-- svelte-ignore a11y-no-static-element-interactions -->
                <div class="gradientCursor" style="top:{gradientCursorPosition.y}%; left:{gradientCursorPosition.x}%;" on:pointerdown|preventDefault|stopPropagation={handleGradientCursor}></div>
            </div>
            <div class="pickerColor" bind:this={pickerColorBar} >
                <div class="colorCursor" style="top:{colorCursorPosition}%"  role="button" tabindex="0" on:pointerdown|preventDefault|stopPropagation={handleColorCursor} ></div>
            </div>

            <div class="pickerOpacity" bind:this={pickerOpacityBar}>
                <div class="pickerOpacityColor">
                    <div class="opacityCursor" style="top:{opacityCursorPosition}%" role="button" tabindex="0" on:pointerdown|preventDefault|stopPropagation={handleOpacityCursor}></div>
                </div>
            </div>
        </div>
        <div class="colorResult">
            <div class="colorFormat">
                <p>Hex</p>
            </div>
            <div class="colorText">
                <input type="text" bind:value={inputTextValue} bind:this={inputTextHexa} on:input={handleInputHexaColor} maxlength="9">
            </div>
            <div class="colorPreview" style="background-color:{hexa};"></div>
            {#if hasEyeDropperSupport}
                <div class="eyeDropper" role="button" tabindex="0"  on:pointerdown|preventDefault|stopPropagation={openEyeDropper}>
                    <img src={eyeDropperIcon} alt="eyeDropper icon ">
                </div>
            {/if}
            <div class="colorOpacityText">
                <p>{opacityCursorPosition}%</p>
            </div>
        </div>

        <div class="colorSaved">
            <div class="addColor" role="button" tabindex="0" on:pointerdown|preventDefault|stopPropagation={addColor}>
                <img src={addIcon} alt="add color icon">
            </div>
            <div class="listColor">
                {#each listSavedColor as item}
                    <div class="colorItem" style="background-color: {item}" role="button" tabindex="0" on:pointerdown|preventDefault|stopPropagation={()=>{setSavedColor(item)}}></div>
                {/each}
            </div>
        </div>
        
    </div>

<style>

    .colorPicker{
        width: 309px;
        height: auto;
        border-radius: 20px;
        background: #F5F5F8;
        box-shadow: 0px 0px 17px -4px rgba(0, 0, 0, 0.23);
        position: absolute;
        display: none;
        flex-direction: column;
        padding-left: 15px;
        padding-right: 15px;
        padding-top: 30px;
        padding-bottom: 30px;
        box-sizing: border-box;
    }

    .visible{
        display: flex !important;
    }

    .exitIcon{
        width: 25px;
        height: 25px;
        align-self: flex-end;
        cursor: pointer;
        user-select:none;
        margin-bottom: 20px;
    }

    .colorAjustement{
        display: flex;
        justify-content: space-between;
    }

    .gradientColor{
        width: 225px;
        height: 225px;
        border-radius: 10px;
        background: linear-gradient(180deg, rgba(255, 255, 255, 0.00) 0%, #000 100%), linear-gradient(270deg, var(--selectedGradientColor) 0%, #FFF 100%);
        position: relative;
    }

    .gradientCursor{
        height: 13px;
        width: 13px;
        background: none;
        border: 3px solid white;
        border-radius: 10px;
        position: absolute;
        transform: translate(-50%, -50%);
        left: 50%;
        box-sizing: border-box;
        cursor: pointer;
    }

    .pickerColor{
        width: 16px;
        height: 225px;
        align-self: center;
        position: relative;
        border-radius: 4px;
        background: linear-gradient(to bottom,
            #FF0000,
            #FFFF00,
            #00FF00,
            #00F7FF,
            #0000FF,
            #FF00E6,
            #FF0000 
        );
    }

    .colorCursor{
        height: 13px;
        width: 13px;
        background: none;
        border: 3px solid white;
        border-radius: 10px;
        position: absolute;
        transform: translate(-50%, -50%);
        left: 50%;
        box-sizing: border-box;
        cursor: pointer;
    }

    .pickerOpacity{
        width: 16px;
        height: 225px;
        align-self: center;
        border-radius: 4px;
        border: 0.5px solid #D9D9D9;
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='10' viewBox='0 0 10 10' fill='none'%3E%3Crect width='5' height='5' fill='%23D9D9D9'/%3E%3Crect x='5' y='5' width='5' height='5' fill='%23D9D9D9'/%3E%3Crect y='5' width='5' height='5' fill='white'/%3E%3Crect x='5' width='5' height='5' fill='white'/%3E%3C/svg%3E");
        background-repeat: repeat;
        /* background: linear-gradient(180deg, #D9D9D9 0%, rgba(217, 217, 217, 0.00) 100%); */
        position: relative;
        
    }

    .pickerOpacityColor{
        width: 100%;
        height: 100%;
        position: relative;
        background: linear-gradient(180deg, #FFFFFF00 0%, var(--selectedGradientColor) 100%);
    }

    .opacityCursor{
        height: 13px;
        width: 13px;
        background: none;
        border: 3px solid white;
        border-radius: 10px;
        position: absolute;
        transform: translate(-50%, -50%);
        left: 50%;
        box-sizing: border-box;
        cursor: pointer;
    }



    .colorResult{
        width: 100%;
        min-height: 50px;
        display: flex;
        font-family: "Tahoma", sans-serif;
        justify-content: space-between;
        color: var(--theme-color);
        margin-bottom: 10px;
    }

    .colorFormat{
        display: flex;
        align-self: center;
    }

    .colorFormat > p{
        font-weight: 600;
    }

    .colorText{
        width: 106px;
        height: 20px;
        align-self: center;
        border-bottom: 1px solid #7D82A1;
        padding-bottom: 5px;
        margin-top: 5px;
    }

    .colorText > input{
        padding: 0;
        margin: 0;
        text-transform: uppercase;
        width: 100%;
        border: none;
        background: none;
        outline: none;
        font-family: "Tahoma", sans-serif;
        font-size: 16px;
    }


    .colorPreview{
        width: 22px;
        height: 22px;
        align-self: center;
    }

    .eyeDropper{
        width: 22px;
        height: 22px;
        border: 1.5px solid var(--theme-color);
        border-radius: 25%;
        align-self: center;
        display: flex;
        flex-direction: column;
        justify-content: center;
        cursor: pointer;
    }

    .eyeDropper > img {
        align-self: center;
        width: 80%;
    }

    .colorOpacityText{
        width: 50px;
        display: flex;
        flex-direction: row;
        justify-content: center;
    }

    .colorOpacityText > p{
        align-self: center;
        font-family: "Tahoma", sans-serif;
        font-size: 16px;
    }

    .colorSaved{
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }

    .addColor{
        height: 25px;
        width: 25px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        border: 1.5px solid var(--theme-color);
        border-radius: 20%;
        box-sizing: border-box;
        cursor: pointer;
    }

    .addColor > img{
        width: 60%;
        align-self: center;
    }

    .listColor{
        width: calc(100% - 40px);
        min-height: 25px;
        display: flex;
        gap: 10.6px;
        flex-wrap: wrap;
    }

    .colorItem{
        width: 25px;
        height: 25px;
        cursor: pointer;
    }

</style>