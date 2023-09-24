<script>
    //@ts-nocheck
    import { onMount } from 'svelte';
    import { createEventDispatcher } from 'svelte';
    import {determineColor} from "../../utils/api"

    import CursorSelector from './CursorSelector.svelte';

    export let colorShade;
    export let isShadeCursorMoving = false
    export let reset; 

    const dispatch = createEventDispatcher();

    let shadeCursorPosition = {
        x: 98,
        y:2
    }

    let shadeColorZone;
    let shadeColorZoneTop = null; 
    let shadeColorZoneLeft = null 

    $: shadeColorZone, setUpShadeColorZone()
    $: colorShade, onShadeChange()

    $: reset, onResetShade()

    onMount(async () => {
        setUpShadeColorZone()
    })

    function onResetShade(){
        shadeCursorPosition = {
            x: 98,
            y:2
        }
    }

    function setUpShadeColorZone(){
        if(shadeColorZone != null){
            shadeColorZoneTop = parseInt(shadeColorZone.getBoundingClientRect().top)
            shadeColorZoneLeft = parseInt(shadeColorZone.getBoundingClientRect().left)
        } 
    }

    function handleGradientCursor(){
        isShadeCursorMoving = true
    }

    function onPointerMove(e){
        
        if(isShadeCursorMoving){
            if(shadeColorZoneTop == 0 && shadeColorZoneLeft == 0){
                setUpShadeColorZone()
            }
            
            let tempPositionY = ((e.y-shadeColorZoneTop)/225)*100
            let tempPositionX = ((e.x-shadeColorZoneLeft)/225)*100
            
            if(tempPositionY >=0 && tempPositionY <= 100){
                shadeCursorPosition.y = tempPositionY

            }
            if(tempPositionX >=0 && tempPositionX <= 100){
                shadeCursorPosition.x = tempPositionX

            }
            
            onShadeChange()
        }
        
    }

    // function setShade(){
    //     let colorHexa = determineColor(colorShade,shadeCursorPosition)
    // }

    function onShadeChange(){
        let colorHexa = determineColor(colorShade,shadeCursorPosition)
        dispatch('shadechange', {color: colorHexa});
    }

    function onPointerUp(colorShade){
        isShadeCursorMoving = false
    }

    function onClick(e){
        let tempPositionY = parseInt(((e.y-shadeColorZoneTop)/225)*100)
            let tempPositionX = parseInt(((e.x-shadeColorZoneLeft)/225)*100)
            
            if(tempPositionY >=0 && tempPositionY <= 100){
                shadeCursorPosition.y = tempPositionY

            }
            if(tempPositionX >=0 && tempPositionX <= 100){
                shadeCursorPosition.x = tempPositionX

            }
            
            onShadeChange()
    }
</script>

<div    class="gradientColor" 
        bind:this={shadeColorZone} 
        on:pointerdown|preventDefault|stopPropagation={onClick} 
        on:pointermove|stopPropagation={onPointerMove} 
        on:pointerup|stopPropagation={onPointerUp}
        style="background: linear-gradient(180deg, rgba(255, 255, 255, 0.00) 0%, #000 100%), linear-gradient(270deg, {colorShade} 0%, #FFF 100%);">
    <CursorSelector coordinates={{y: shadeCursorPosition.y+"%", x:shadeCursorPosition.x+"%"}} on:pointerdown={handleGradientCursor}/>
</div>

<style>

    .gradientColor{
        width: 225px;
        height: 225px;
        border-radius: 10px;
        /* background: linear-gradient(180deg, rgba(255, 255, 255, 0.00) 0%, #000 100%), linear-gradient(270deg, var(--colorShade) 0%, #FFF 100%); */
        position: relative;
        cursor: pointer;
    }


</style>