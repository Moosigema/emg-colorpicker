<script>
    //@ts-nocheck
    import { onMount } from 'svelte';  
    import {getColorByEyeDropper, handleTextColor, hexToPercentage, getCssGradient, sleep} from "$lib/utils/api"
    import { createEventDispatcher } from 'svelte';

    import RainbowSelector from '$lib/components/tools/RainbowSelector.svelte';
    import ShadeSelector from '$lib/components/tools/ShadeSelector.svelte';
    import OpacitySelector from '$lib/components/tools/OpacitySelector.svelte';
    import GradientSelector from '$lib/components/tools/GradientSelector.svelte';

    import eyeDropperIcon from "$lib/assets/eyeDropper.svg"
    import addIcon from "$lib/assets/add.svg"
    
    export let gradient = [
        {
            pourcentage: 0,
            color: "#01093f"
        },
        {
            pourcentage: 100,
            color: "#FFFFFF"
        }
    ]
    
    let colorHexa;
    const dispatch = createEventDispatcher();


    //variable to handle input field
    let inputTextHexa;
    let inputTextValue = "#FFFFFFFF"
    let isInput = false;

    let hasEyeDropperSupport = false


    // -----------------------------------------

    let shortHexaColor = "#FFFFFF"
    let colorOpacityHexa = "FF"
    let colorOpacityInt = 100
    let fullHexaColor = shortHexaColor+colorOpacityHexa
    let rainbowColor
    let shadeColor 
    let opacityColor
    let resetShade;
    let gradientColors;

    let gradientReturn;


    let isShadeCursorMoving = false
    let isOpacityCursorMoving = false
    let isRainbowCursorMoving = false
    let isGradientCursorMoving = false
    

    let listSavedColor = []


    $: setUpColor(gradient)
    
    $: onGradientChange(isRainbowCursorMoving)
    $: onGradientChange(isShadeCursorMoving)
    $: onGradientChange(isOpacityCursorMoving)
    $: onGradientChange(isGradientCursorMoving)

    onMount(async () => {
        hasEyeDropperSupport = () => ('EyeDropper' in window);
        if(localStorage.getItem('listSavedColor')){
            listSavedColor = JSON.parse(localStorage.getItem('listSavedColor'));
        }
    })

    function onGradientChange(cursorUp){
        
        if(!cursorUp){
            dispatch('gradientchanged', gradientReturn);
        }
    }

    
    function setUpColor(gradient){
        const isValidStructure = gradient.every(item => {
            return (
                typeof item === 'object' && // Vérifie que l'élément est un objet
                'pourcentage' in item && typeof item.pourcentage === 'number' &&
                'color' in item && typeof item.color === 'string'
            );
        });
        if(isValidStructure && gradient.length >= 2){
            colorHexa = gradient[0].color
        }else{
            gradient = [
                {
                    pourcentage: 0,
                    color: "#01093f"
                },
                {
                    pourcentage: 100,
                    color: "#FFFFFF"
                }
            ]
            
        }
        
        initGradient(gradient)
    }

    function initGradient(gradient){
        colorHexa = gradient[0].color
        let textColor = handleTextColor(colorHexa)
 
        setInput(textColor)
        setReturnColor(textColor.substring(0,7), textColor.substring(7,10))
        setOpacityCursor(textColor.substring(7,10))
        setRainbowCursor(textColor.substring(0,7))
        setShadeCursor(textColor.substring(0,7))
        resetShade = Date.now()
    }

    function onPointerUp(){
        isRainbowCursorMoving = false 
        isShadeCursorMoving = false
        isOpacityCursorMoving = false
        isGradientCursorMoving = false
    }


    function onRainbowChange(e){
        setShadeCursor(e.detail.color)
    }

    function onShadeChange(e){
        let fullHexa = setReturnColor(e.detail.color, colorOpacityHexa) 
        if(!isInput){
            setInput(fullHexa)
        }else{
            isInput = false
        }    
        
    }

    function onOpacityChange(e){
        
        opacityColor = e.detail.opacityHexa
        setReturnColor(shortHexaColor, e.detail.opacityHexa)
        setInput(fullHexaColor)
    }

    function setInput(fullHexa){
        inputTextValue = fullHexa
    }

    function setOpacity(opacity){
        colorOpacityInt = parseInt(hexToPercentage(opacity))
    }

    function setReturnColor(shortHexa, opacityHexa){
        shortHexaColor = shortHexa
        colorOpacityHexa = opacityHexa
        
        setOpacity(opacityHexa)
        fullHexaColor = (shortHexaColor+colorOpacityHexa).toLocaleUpperCase()
        
        // console.log(`Dispatch: ${{fullHexaColor: fullHexaColor, shortHexaColor:shortHexaColor, colorOpacityHexa: colorOpacityHexa}}`)
        // dispatch('change', {fullHexaColor: fullHexaColor, shortHexaColor:shortHexaColor, colorOpacityHexa: colorOpacityHexa});
        
        return fullHexaColor
    }

    function setShadeCursor(color){
        shadeColor =  color
    }

    function setRainbowCursor(color){
        rainbowColor = color
    }

    function setOpacityCursor(opacity){
        opacityColor = opacity
    }


    // function that handle the eyedropper
    async function openEyeDropper(){
        if(hasEyeDropperSupport){
            let response = await getColorByEyeDropper()
            console.log(response)
            if(response.statusCode == "200"){
                setRainbowCursor(response.result.color)
                setOpacityCursor("FF")
                setShadeCursor(response.result.color)
                setReturnColor(response.result.color, "FF")
                setOpacity("FF")
            }
        }
    }

    //function that handle the input field
    function handleInputHexaColor(){
        isInput = true

        let textColor = handleTextColor(inputTextValue)
        
        let shortHexa = textColor.substring(0,7)
        let opacityHexa = textColor.substring(7,10)

        setRainbowCursor(shortHexa)
        setShadeCursor(shortHexa)
        setOpacityCursor(opacityHexa)
        setReturnColor(shortHexa,opacityHexa)
        setOpacity(opacityHexa)
        resetShade = Date.now()
    }

    //set the saved color that has been clicked on
    async function setSavedColor(savedColor){
        if(savedColor.type == "solid"){
            let opacityHexa =  savedColor.color.substring(7,10)
            let shortHexa =  savedColor.color.substring(0,7)
            setRainbowCursor(shortHexa)
            setShadeCursor(shortHexa)
            setReturnColor(shortHexa, opacityHexa)
            setOpacityCursor(opacityHexa)
            resetShade = Date.now()
        }else{
            gradient = savedColor.gradient
            initGradient(gradient)
        }
        await sleep(100)
        onGradientChange(false)
    }

    //add color to the saved list. Colors are saved in localStorage. 
    function addColor(){
        listSavedColor = [...listSavedColor, {
            type: "gradient",
            gradient: JSON.parse(JSON.stringify(gradientColors))
        }];
        localStorage.setItem('listSavedColor', JSON.stringify(listSavedColor));
    }

    function changeSelectedColor(e){
        let textColor = handleTextColor( e.detail.color)
        let shortHexa = textColor.substring(0,7)
        let opacityHexa = textColor.substring(7,10)
        setRainbowCursor(shortHexa)
        setShadeCursor(shortHexa)
        setOpacityCursor(opacityHexa)
        setReturnColor(shortHexa, opacityHexa)
        resetShade = Date.now()
    }


    function onGradientChanging(e){
        gradientColors = e.detail.gradient
        gradientReturn =  e.detail
        dispatch("gradientchanging", e.detail)
    }



</script>
    <svelte:body on:pointerup={onPointerUp}/>
     <!-- svelte-ignore a11y-no-noninteractive-element-to-interactive-role -->
        <div class="gradientTools">
            <GradientSelector bind:isGradientCursorMoving  gradientColors={gradient} color={fullHexaColor} on:cursorselected={changeSelectedColor} on:gradientchanging={onGradientChanging} on:gradientchanged/>
        </div>
       
        <div class="colorAjustement">

            <ShadeSelector bind:isShadeCursorMoving={isShadeCursorMoving} colorShade={shadeColor} reset={resetShade} on:shadechange={onShadeChange}/>
            <RainbowSelector bind:isRainbowCursorMoving={isRainbowCursorMoving}  colorRainbow={rainbowColor} on:rainbowchange={onRainbowChange}/>
            <OpacitySelector bind:isOpacityCursorMoving={isOpacityCursorMoving} colorOpacity={shortHexaColor} opacity={opacityColor} on:opacitychange={onOpacityChange}/>

        </div>
        <div class="colorResult">
            <div class="colorFormat">
                <p>Hex</p>
            </div>
            <div class="colorText">
                <input type="text" bind:value={inputTextValue} bind:this={inputTextHexa} on:input={handleInputHexaColor} maxlength="9">
            </div>
            <div class="colorPreview" style="background-color:{fullHexaColor};"></div>
            {#if hasEyeDropperSupport}
                <div class="eyeDropper" role="button" tabindex="0"  on:pointerdown|preventDefault|stopPropagation={openEyeDropper}>
                    <img src={eyeDropperIcon} height="15" width="15" alt="eyeDropper icon ">
                </div>
            {/if}
            <div class="colorOpacityText">
                <p>{colorOpacityInt}%</p>
            </div>
        </div>

        <div class="colorSaved">
            <div class="addColor" role="button" tabindex="0" on:pointerdown|preventDefault|stopPropagation={addColor}>
                <img src={addIcon} height="15" width="15" alt="add color icon">
            </div>
            <div class="listColor">
                {#each listSavedColor as item}
                    {#if item.type == "solid"}
                        <div class="colorItem" style="background-color: {item.color}" role="button" name="saved color {item.color}" tabindex="0" on:pointerdown|preventDefault|stopPropagation={()=>{setSavedColor(item)}}></div>
                    {:else if item.type == "gradient"}
                        <div class="colorItem" style="background: {getCssGradient(item.gradient)}" role="button" tabindex="0" name="saved gradient" on:pointerdown|preventDefault|stopPropagation={()=>{setSavedColor(item)}}></div>
                    {/if}
                {/each}
            </div>
        </div>
        
        
<style>

    .gradientTools{
        width: 100%;
        display: flex;
        flex-direction: row;
        margin-bottom: 10px;
    }

    .colorAjustement{
        display: flex;
        justify-content: space-between;
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