<script>
    //@ts-nocheck
    import EMGColorPicker from "$lib/components/EMGColorPicker.svelte";

    let hexa = "#1458FF"
    let gradientColors = [
        {
            pourcentage: 0,
            color: "#01093f"
        },
        {
            pourcentage: 100,
            color: "#1458FFFF"
        }
    ]
    let visible = false
    let newColor = hexa
    function onColorChanged(e){
        newColor = e.detail.fullHexaColor
        console.log(e.detail.fullHexaColor)
        console.log(e.detail.shortHexaColor)
        console.log(e.detail.hexaColorOpacity)
        console.log(e.detail.intColorOpacity)
    }

    function  onColorChanging(e){
        console.log("color changing")
    }

    function onGradientChanged(e){
        newColor = e.detail.gradientCss
        console.log(e.detail.gradientCss)
		console.log(e.detail.gradient)
    }

    function onGradientChanging(e){
        console.log("gradient changing")
    }
</script>

<div>
    <button on:click={()=>{visible = true}} >Open color picker</button>
    <p>{newColor}</p>
    <EMGColorPicker solidColor={hexa} gradientColors={gradientColors} bind:visible useGradient={true} coordinates={{x: 300,y:300}} on:colorchanged={onColorChanged} on:colorchanging={onColorChanging} on:gradientchanged={onGradientChanged} on:gradientchanging={onGradientChanging}/>
</div>

<style>
    
</style>

