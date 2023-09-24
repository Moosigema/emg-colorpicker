<script>
    //@ts-nocheck
    import { onMount } from 'svelte';
    import {percentageToHex, hexToPercentage} from "../../utils/api"
    import { createEventDispatcher } from 'svelte';

    import CursorSelector from './CursorSelector.svelte';

    export let colorOpacity
    export let opacity = "FF"
    export let isOpacityCursorMoving = false

    const dispatch = createEventDispatcher();

    let pickerOpacityBar;
    let opacityCursorPosition = 100
    
    let opacityColorHexa
    let pickerOpacityBarTop = 0
    

    onMount(async () => {
        setUpPickerOpacityBar()
        setOpacity(opacity)
    })

    //$: colorOpacity, setOpacity(opacity)
    $: pickerOpacityBar, setUpPickerOpacityBar()
    $: setOpacity(opacity)

    function setOpacity(newOpacity){
        opacityColorHexa = newOpacity
        opacityCursorPosition = hexToPercentage(opacityColorHexa)
        
    }

    function setUpPickerOpacityBar(){
        if(pickerOpacityBar != null){
            pickerOpacityBarTop = parseInt(pickerOpacityBar.getBoundingClientRect().top)
        } 
    }

    function handleOpacityCursor(){
        isOpacityCursorMoving = true
    }

    function onPointerMove(e){
        
        if(isOpacityCursorMoving){
            if(pickerOpacityBarTop == 0){
                setUpPickerOpacityBar()
            }
            let tempPosition = ((e.y-pickerOpacityBarTop)/225)*100
            if(tempPosition >=0 && tempPosition <= 100){
                opacityCursorPosition = Math.round(tempPosition)
                opacityColorHexa = percentageToHex(opacityCursorPosition)
                dispatch('opacitychange', {opacityInt: opacityCursorPosition, opacityHexa: opacityColorHexa, update: true});
            }
        }
        
    }

    function onPointerUp(){
        isOpacityCursorMoving = false
    }

    function onClick(e){
        let tempPosition = ((e.y-pickerOpacityBarTop)/225)*100
            if(tempPosition >=0 && tempPosition <= 100){
                opacityCursorPosition = Math.round(tempPosition)
                opacityColorHexa = percentageToHex(opacityCursorPosition)
                
                dispatch('opacitychange', {opacityInt: opacityCursorPosition, opacityHexa: opacityColorHexa, update: true});
            }
    }
</script>

<div class="pickerOpacity" bind:this={pickerOpacityBar} on:pointerdown|preventDefault|stopPropagation={onClick} on:pointermove|stopPropagation={onPointerMove} on:pointerup|stopPropagation={onPointerUp}>
    <div class="pickerOpacityColor" style="background: linear-gradient(180deg, #FFFFFF00 0%, {colorOpacity} 100%);">
        <CursorSelector coordinates={{y: opacityCursorPosition+"%", x:"50%"}} on:pointerdown={handleOpacityCursor}/>
    </div>
</div>

<style>

.pickerOpacity{
        width: 16px;
        height: 225px;
        align-self: center;
        border-radius: 4px;
        border: 0.5px solid #D9D9D9;
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='10' viewBox='0 0 10 10' fill='none'%3E%3Crect width='5' height='5' fill='%23D9D9D9'/%3E%3Crect x='5' y='5' width='5' height='5' fill='%23D9D9D9'/%3E%3Crect y='5' width='5' height='5' fill='white'/%3E%3Crect x='5' width='5' height='5' fill='white'/%3E%3C/svg%3E");
        background-repeat: repeat;
        position: relative;
        cursor: pointer;
    }

    .pickerOpacityColor{
        width: 100%;
        height: 100%;
        position: relative;
        /* background: linear-gradient(180deg, #FFFFFF00 0%, var(--selectedGradientColor) 100%); */
    }


</style>