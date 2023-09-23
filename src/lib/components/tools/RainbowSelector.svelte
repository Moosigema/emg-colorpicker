<script>
    //@ts-nocheck
    import { onMount } from 'svelte';
    import { createEventDispatcher } from 'svelte';
    import {determineRainbowColor, findPercentageByColor} from "$lib/utils/api"

    import CursorSelector from '$lib/components/tools/CursorSelector.svelte';
    
    export let isRainbowCursorMoving = false
    export let rainbowCursorPosition = 0
    export let colorRainbow = null;

    const dispatch = createEventDispatcher();

    let pickerColorBar;
    let pickerColorBarTop; 
    
    $: colorRainbow, setRainbowColor()
    $: pickerColorBar, setUpPickerColorBar()
    
    onMount(async () => {
        setRainbowColor()
    })

    function setUpPickerColorBar(){
        if(pickerColorBar != null){
            pickerColorBarTop = parseInt(pickerColorBar.getBoundingClientRect().top)
        } 
    }

    function setRainbowColor(){
        if(colorRainbow != null){
            rainbowCursorPosition = findPercentageByColor(colorRainbow.substring(0, 7))
        }
        //dispatch('rainbowchange', {color: colorRainbow.substring(0, 7)});
    }

    function handleRainbowCursor(e){
        isRainbowCursorMoving = true
    }

    function onPointerMove(e){
        if(isRainbowCursorMoving){
            let tempPosition =((e.y-pickerColorBarTop)/225)*100
            if(tempPosition >=0 && tempPosition <= 100){
                rainbowCursorPosition = tempPosition
                // console.log(rainbowCursorPosition)
                let rainBowColor = determineRainbowColor(rainbowCursorPosition)
                dispatch('rainbowchange', {color: rainBowColor});
            }
        }
        
    }

    function onPointerUp(){
        isRainbowCursorMoving = false
    }

    function onClick(e){
        let tempPosition = ((e.y-pickerColorBarTop)/225)*100
            if(tempPosition >=0 && tempPosition <= 100){
                rainbowCursorPosition = tempPosition
                // console.log(rainbowCursorPosition)
                let rainBowColor = determineRainbowColor(rainbowCursorPosition)
                dispatch('rainbowchange', {color: rainBowColor});
            }
    }


</script>



<div class="pickerColor" bind:this={pickerColorBar} on:pointerdown|preventDefault|stopPropagation={onClick} on:pointermove|stopPropagation={onPointerMove} on:pointerup|stopPropagation={onPointerUp}>
    <CursorSelector coordinates={{y: rainbowCursorPosition+"%", x:"50%"}} on:pointerdown={handleRainbowCursor}/>
</div>

<style>

.pickerColor{
        width: 16px;
        height: 225px;
        align-self: center;
        position: relative;
        border-radius: 4px;
        cursor: pointer;
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

</style>