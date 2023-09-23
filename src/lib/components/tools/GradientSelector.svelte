<script>
    //@ts-nocheck
    import { onMount } from 'svelte';
    import { createEventDispatcher } from 'svelte';
    import {determineRainbowColor, findPercentageByColor} from "$lib/utils/api"

    import CursorSelector from '$lib/components/tools/CursorSelector.svelte';
    
    export let isGradientCursorMoving = false
    export let gradientColors = [
        {
            pourcentage: 0,
            color: "#01093f"
        },
        {
            pourcentage: 100,
            color: "#FFFFFF"
        }
    ]
    export let color

    const dispatch = createEventDispatcher();

    let pickerGradientBar;
    let pickerGradientLeft;
    let  pickerGradientWidth
    
    let linearCss;
    let movingCursorIndex = 0
    
    $: gradientColors, setGradient()
    $: color, changeColor()
    
    onMount(async () => {
        if(pickerGradientBar != null){
            pickerGradientLeft = parseInt(pickerGradientBar.getBoundingClientRect().left)
            pickerGradientWidth = parseInt(pickerGradientBar.getBoundingClientRect().width)
        } 
        setGradient()
    })

    function setGradient(){
        linearCss = 'linear-gradient(90deg'
        for(let i =0; i <  gradientColors.length; i++){
            linearCss += ','+gradientColors[i].color+' '+gradientColors[i].pourcentage+'%'
        }
        linearCss += ')'
        dispatch('gradientchange', {"gradient": gradientColors, "gradientCss": linearCss})
    }

    function changeColor(){
        gradientColors[movingCursorIndex].color = color
        gradientColors = [...gradientColors];
        setGradient()
        dispatch('gradientchange', {"gradient": gradientColors, "gradientCss": linearCss})
    }


    function handleGradientCursor(index){
        isGradientCursorMoving = true
        movingCursorIndex = index
        dispatch('cursorselected', {"color": gradientColors[movingCursorIndex].color})
    }

    function onPointerMove(e){
        if(isGradientCursorMoving){
            let tempPosition =((e.x-pickerGradientLeft)/(pickerGradientWidth))*100
            if(tempPosition >=0 && tempPosition <= 100){
                gradientColors[movingCursorIndex].pourcentage = parseInt(tempPosition)
                if(movingCursorIndex == 0 || (movingCursorIndex < gradientColors.length-1)){
                    if(tempPosition > gradientColors[movingCursorIndex +1].pourcentage){
                        movingCursorIndex +=1
                        sortGradient()
                       
                    }
                }
                
                if(movingCursorIndex == gradientColors.length-1 || movingCursorIndex > 0){
                    if(tempPosition < gradientColors[movingCursorIndex -1].pourcentage){
                        movingCursorIndex -=1
                        sortGradient()
                        
                    }
                }

                gradientColors = gradientColors
                
            }
            
        }
        
    }

    function onPointerUp(){
        isGradientCursorMoving = false
    }

    function onDblClickArea(e){
        let tempPosition =((e.x-pickerGradientLeft)/(pickerGradientWidth))*100
            if(tempPosition >=0 && tempPosition <= 100){
                
                let newElement =  {
                    pourcentage: parseInt(tempPosition),
                    color: color
                }
                gradientColors = insertOrdered(gradientColors, newElement)
            }
    }

    function onDblClickCursor(index){
        if(gradientColors.length > 2){
            gradientColors.splice(index,1)
            gradientColors = gradientColors
        }
    }

    function insertOrdered(tab, newElement){
        let insertIndex = 0;
        for (let i = 0; i < tab.length; i++) {
            if (newElement.pourcentage < tab[i].pourcentage) {
                break;
            }
            insertIndex++;
        }
        
        // Insérer le nouvel élément à l'index approprié
        tab.splice(insertIndex, 0, newElement);
        movingCursorIndex = insertIndex
        return tab
    }

    function sortGradient(){
        gradientColors.sort((a, b) => a.pourcentage - b.pourcentage);
        gradientColors = gradientColors
    }


</script>



<!-- svelte-ignore a11y-click-events-have-key-events -->
<div    class="pickerColor" 
        bind:this={pickerGradientBar}
        role="button"
        tabindex="0" 
        on:pointerdown|preventDefault|stopPropagation
        on:pointermove|stopPropagation={onPointerMove} 
        on:pointerup|stopPropagation={onPointerUp}
        on:dblclick|stopPropagation={onDblClickArea}
        style="background: {linearCss}">

        {#each gradientColors as color, index}
            <CursorSelector coordinates={{y: "50%", x: color.pourcentage+"%"}} selected={(index == movingCursorIndex ? true : false)} on:pointerdown={()=>{handleGradientCursor(index)}} on:dblclick={()=>{onDblClickCursor(index)}}/>
            
        {/each}
</div>

<style>

.pickerColor{
        width: 100%;
        height: 16px;
        align-self: center;
        position: relative;
        border-radius: 4px;
        cursor: pointer;
    }

</style>