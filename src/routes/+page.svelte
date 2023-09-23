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
    let visible = true
    let newColor = hexa
    function onColorChange(e){
        newColor = e.detail.fullHexaColor
        console.log(e.detail.fullHexaColor)
        console.log(e.detail.shortHexaColor)
        console.log(e.detail.hexaColorOpacity)
        console.log(e.detail.intColorOpacity)
    }

    function onGradientChange(e){
        newColor = e.detail.gradientCss
        console.log(e.detail.gradientCss)
		console.log(e.detail.gradient)
    }
</script>

<div>
    <button on:click={()=>{visible = true}} >Open color picker</button>
    <p>{newColor}</p>
    <EMGColorPicker solidColor={hexa} gradientColors={gradientColors} bind:visible useGradient={true} coordinates={{x: 200,y:200}} on:colorchange={onColorChange} on:gradientchange={onGradientChange}/>
</div>

<style>
    
</style>

