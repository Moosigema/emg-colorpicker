<script>
    //@ts-nocheck
    import {visibleStore} from "$lib/stores/colorPickerStore"

    import SolidPicker from "$lib/components/SolidPicker.svelte";
    import GradientPicker from "$lib/components/GradientPicker.svelte";

    import exitIcon from "$lib/assets/exit.svg"

    export let solidColor
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
    
    export let visible = false
    export let coordinates = {
        x: 100,
        y: 100
    }
    export let useGradient = false

    

    let themeColor = "#01093f"
    
    let solidSelected = true
    let gradientSelected = false

    $: onVisibleChange(visible)

    function switchTo(type){
        if(type =="gradient"){
            solidSelected = false
            gradientSelected = true
        }else if(type == "solid"){
            solidSelected = true
            gradientSelected = false
        }
    }

    function onVisibleChange(visiblePicker){
        visibleStore.set({
            visible: visiblePicker,
            timestamp: Date.now()
        })
    }

</script>


<div class="colorPicker" role="button" tabindex="0" on:pointerdown|stopPropagation  class:visible style="top:{coordinates.y}px; left:{coordinates.x}px; --theme-color: {themeColor};" >

    <!-- svelte-ignore a11y-no-noninteractive-element-to-interactive-role -->
    <img class="exitIcon" src={exitIcon} alt="exit icon" role="button" tabindex="0" height="21" width="21" on:pointerdown|preventDefault|stopPropagation={()=>{visible = false}}>

    {#if useGradient}
        <div class="typeButtons">
            <button class="solidColor typeButtonColor" class:solidSelected on:pointerdown|stopPropagation={()=>{switchTo("solid")}}></button>
            <button class="gradientColor typeButtonColor" class:gradientSelected on:pointerdown|stopPropagation={()=>{switchTo("gradient")}}></button>
        </div>
    {/if}
    {#if solidSelected}
        <SolidPicker  colorHexa={solidColor} on:colorchanged on:colorchanging/>
    {:else if gradientSelected}
        <GradientPicker gradient={gradientColors} on:gradientchanging on:gradientchanged/>
    {/if}
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
    }

    .typeButtons{
        display: flex;
        flex-direction: row;
        width: 100%;
        height: auto;
        margin-bottom: 10px;
        gap: 15px;
    }

    .typeButtonColor{
        width: 25px;
        height: 25px;
        border-radius: 3px;
        border: 2px solid #F5F5F8FF;
        cursor: pointer;
    }

    .solidColor{
        background-color: var(--theme-color);
    }

    .gradientColor{
        background: linear-gradient(180deg,  var(--theme-color) 0%, rgba(1, 9, 63, 0.00) 100%);
    }

    .solidSelected{
        border-radius: 3px;
        border: 2px solid var(--FF6059, #FF6059);
    }

    .gradientSelected{
        border-radius: 3px;
        border: 2px solid var(--FF6059, #FF6059);
    }

</style>