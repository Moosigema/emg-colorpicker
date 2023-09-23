<script>
    //@ts-nocheck

    export let coordinates = {
        x: "50%",
        y: "0%"
    }

    export let selected = false;
    
</script>

<div class="colorCursor" class:selected style="top:{coordinates.y}; left:{coordinates.x}"  role="button" tabindex="0" on:pointerdown|preventDefault|stopPropagation on:dblclick|stopPropagation></div>
<style>
     .colorCursor{
        height: 13px;
        width: 13px;
        background: none;
        border: 3px solid white;
        border-radius: 10px;
        position: absolute;
        transform: translate(-50%, -50%);
        box-sizing: border-box;
        cursor: pointer;
        box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
    }

    .selected{
        background: white;
    }

</style>