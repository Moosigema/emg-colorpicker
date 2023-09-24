
## Description
emg-color-picker is custom color picker that can replace the default browser color picker. It is written is svelte. For now, you can only have hexa values (with opacity) and gradients, but I plan to add RGV and other formats.
The saved colors are stored in the localStorage.

## How to use it ?

```svelte
<script>
	import {EMGColorPicker} from 'emg-colorpicker';
	
	let hexa = "#1458FFFF"
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

    
    function onColorChanged(e){
        console.log(e.detail.fullHexaColor)
        console.log(e.detail.shortHexaColor)
        console.log(e.detail.hexaColorOpacity)
        console.log(e.detail.intColorOpacity)
    }

	function onColorChanging(){
		console.log("changing color")
	}

    function onGradientChanged(e){
	    console.log(e.detail.gradientCss)
		console.log(e.detail.gradient)
    }

	function onGradientChanging(){
		console.log("changing gradient")
	}
}

</script>

<EMGColorPicker solidColor={hexa} gradientColors={gradientColors} bind:visible useGradient={true} coordinates={{x: 200,y:200}} on:colorchanged={onColorChanged} on:colorchanging={onColorChanging} on:gradientchanged={onGradientChanged} on:gradientchanging={onGradientChanging}/>

```


For now you only have 3 parameters :

- `solidColor` : *string* type, color value for initialization, it has to be in hexa format  : "#FFFFFF", or hexa format with opacity : "#FFFFFFFF"
- `gradientColors`: *array* type, gradient value for initialization, format : ```
```
[
	{
		pourcentage: int,
		color: string (hexa format), 
	},
	{
		pourcentage: int,
		color: string (hexa format), 
	}
]
    
example: 
[
	{
		pourcentage: 0,
		color: "#01093FF"
	},
	{
		pourcentage: 100,
		color: "#1458FFFF"
	}
]

```
- `visible` : *boolean* type, if true, the color picker is visible, false the color picker is invisible.
- `useGradient` *boolean* type, if true, you will tools for gradient color
- `coordinates` : *object* type, the color picker has the css attribute `position: absolute;` and `x` (`int` type) is for `left` attribute in px and `y` is for `top` attribute

<<<<<<< HEAD
```json

colorPickerCoordinates = {
	"x": 300,
	"y": 300
=======
```
let colorPickerCoordinates = {
	x: 300,
	y: 300
>>>>>>> 90c4dcaa075eb0c9781c061b318eacbf92cff60d
}

```

- `on:colorchanged`, event listener, it will be triggered when you haved changed the color. You will have access to 3 variables : 
```
e.detail.fullHexaColor     --> hexa color with opacity, example : "#FFFFFFFF"
e.detail.shortHexaColor    --> hexa color without opacity, example : "#FFFFFF"
e.detail.hexaColorOpacity  --> hexa color opacity , example : "FF"
e.detail.intColorOpacity   --> int color opacity , example : 100
```

- `on:colorchanging`, event listener, it will be triggered when you are changing the color. You will have access to 3 variables : 
```
e.detail.fullHexaColor     --> hexa color with opacity, example : "#FFFFFFFF"
e.detail.shortHexaColor    --> hexa color without opacity, example : "#FFFFFF"
e.detail.hexaColorOpacity  --> hexa color opacity , example : "FF"
e.detail.intColorOpacity   --> int color opacity , example : 100
```

- `on:gradientchanged`, event listener, it will be triggered when you have changed the gradient. You will have access to 2 variables : 
```
e.detail.gradientCss  --> gradient css value, example : linear-gradient(90deg,#01093FFF 0%,#1458FFFF 100%)
e.detail.gradient     --> gradient array, example : 
	[
	    {
	        "pourcentage": 0,
	        "color": "#01093FFF"
	    },
	    {
	        "pourcentage": 100,
	        "color": "#1458FFFF"
	    }
	]
```

- `on:gradientchanging`, event listener, it will be triggered when you are changing the gradient. You will have access to 2 variables : 
```
e.detail.gradientCss  --> gradient css value, example : linear-gradient(90deg,#01093FFF 0%,#1458FFFF 100%)
e.detail.gradient     --> gradient array, example : 
	[
	    {
	        "pourcentage": 0,
	        "color": "#01093FFF"
	    },
	    {
	        "pourcentage": 100,
	        "color": "#1458FFFF"
	    }
	]
```

