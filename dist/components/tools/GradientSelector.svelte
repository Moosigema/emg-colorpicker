<script>
    //@ts-nocheck
    import { onMount } from 'svelte';
    import { createEventDispatcher } from 'svelte';
    import {visibleStore} from "../../stores/colorPickerStore"

    import {determineRainbowColor, findPercentageByColor,  getCssGradient,deepClone} from "../../utils/api"

    import CursorSelector from './CursorSelector.svelte';
    
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
    let gradientToEdit;
    
    let linearCss;
    let movingCursorIndex = 0
    
    $: gradientColors, setGradient(gradientColors)
    $: color, changeColor()
    $: $visibleStore, onVisibleChange()
    
    onMount(async () => {
        setPickerGradientBar()
    })

    function onVisibleChange(){
        movingCursorIndex = 0
    }

    function setPickerGradientBar(){
        if(pickerGradientBar != null){
            pickerGradientLeft = parseInt(pickerGradientBar.getBoundingClientRect().left)
            pickerGradientWidth = parseInt(pickerGradientBar.getBoundingClientRect().width)
        } 
    }

    function setGradient(gradient){
        gradientToEdit = deepClone(gradient)

        setGradientCSS(deepClone(gradientToEdit))
    }

    function setGradientCSS(gradient){
        
        linearCss = 'linear-gradient(90deg'
        for(let i =0; i <  gradient.length; i++){
            linearCss += ','+gradient[i].color+' '+gradient[i].pourcentage+'%'
        }
        linearCss += ')'
        dispatch('gradientchanging', {"gradient": gradient, "gradientCss": linearCss})
    }

    function changeColor(){
        gradientToEdit[movingCursorIndex].color = color
        gradientToEdit = [...gradientToEdit];
        setGradient(gradientToEdit)
        dispatch('gradientchanging', {"gradient": gradientToEdit, "gradientCss": linearCss})
    }


    function handleGradientCursor(index){
        isGradientCursorMoving = true
        movingCursorIndex = index
        dispatch('cursorselected', {"color": gradientToEdit[movingCursorIndex].color})
    }

    function onPointerMove(e){
        if(isGradientCursorMoving){
            if(pickerGradientLeft == 0 && pickerGradientWidth == 0){
                setPickerGradientBar()
            }
            let tempPosition =((e.x-pickerGradientLeft)/(pickerGradientWidth))*100
            if(tempPosition >=0 && tempPosition <= 100){
                gradientToEdit[movingCursorIndex].pourcentage = parseInt(tempPosition)
                if(movingCursorIndex == 0 || (movingCursorIndex < gradientToEdit.length-1)){
                    if(tempPosition > gradientToEdit[movingCursorIndex +1].pourcentage){
                        movingCursorIndex +=1
                        sortGradient()
                       
                    }
                }
                
                if(movingCursorIndex == gradientToEdit.length-1 || movingCursorIndex > 0){
                    if(tempPosition < gradientToEdit[movingCursorIndex -1].pourcentage){
                        movingCursorIndex -=1
                        sortGradient()
                        
                    }
                }

                gradientToEdit = gradientToEdit
                setGradientCSS(gradientToEdit)
            }
            
        }
        
    }

    function onPointerUp(){
        isGradientCursorMoving = false
    }

    async function onDblClickArea(e){
        let tempPosition =((e.x-pickerGradientLeft)/(pickerGradientWidth))*100
            if(tempPosition >=0 && tempPosition <= 100){
                
                let newElement =  {
                    pourcentage: parseInt(tempPosition),
                    color: color
                }
                gradientToEdit = await insertOrdered(gradientToEdit, newElement)
                dispatch('gradientchanged', {"gradient": gradientToEdit, "gradientCss":  getCssGradient(gradientToEdit)})
            }
    }

    function onDblClickCursor(index){
        if(gradientToEdit.length > 2){
            gradientToEdit.splice(index,1)
            gradientToEdit = gradientToEdit
            dispatch('gradientchanged', {"gradient": gradientToEdit, "gradientCss":  getCssGradient(gradientToEdit)})
        }
    }

    async function insertOrdered(tab, newElement){
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
        gradientToEdit.sort((a, b) => a.pourcentage - b.pourcentage);
        gradientToEdit = gradientToEdit
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

        {#each gradientToEdit as color, index}
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