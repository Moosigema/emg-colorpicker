
# EMG Color Picker

**emg-color-picker** is a custom color picker built with Svelte that can replace the default browser color picker. It currently supports hexa values (with opacity) and gradients, with plans to add support for RGB and other formats. Saved colors are stored in the browser's localStorage.

## Usage

To use the **EMG Color Picker**, follow these steps:

1. Install it using npm:

   ```bash
   npm install emg-colorpicker
   ```

2. Import the EMGColorPicker component in your Svelte script:

```svelte
<script>
    import { EMGColorPicker } from 'emg-colorpicker';

    let hexa = "#1458FFFF";
    let gradientColors = [
        {
            pourcentage: 0,
            color: "#01093f"
        },
        {
            pourcentage: 100,
            color: "#1458FFFF"
        }
    ];

    let visible = true;

    function onColorChanged(e) {
        console.log(e.detail.fullHexaColor);
        console.log(e.detail.shortHexaColor);
        console.log(e.detail.hexaColorOpacity);
        console.log(e.detail.intColorOpacity);
    }

    function onColorChanging() {
        console.log("changing color");
    }

    function onGradientChanged(e) {
        console.log(e.detail.gradientCss);
        console.log(e.detail.gradient);
    }

    function onGradientChanging() {
        console.log("changing gradient");
    }
</script>

<EMGColorPicker solidColor={hexa} gradientColors={gradientColors} bind:visible useGradient={true} coordinates={{ x: 200, y: 200 }} on:colorchanged={onColorChanged} on:colorchanging={onColorChanging} on:gradientchanged={onGradientChanged} on:gradientchanging={onGradientChanging} />
```

### Parameters

The following parameters are available:

- `solidColor` (string): Initial color value in hexa format (e.g., "#FFFFFF") or hexa format with opacity (e.g., "#FFFFFFFF").

- `gradientColors` (array): Initial gradient value in the following format:
```json
[
 {
        pourcentage: int,
        color: string (hexa format)
    },
    {
        pourcentage: int,
        color: string (hexa format)
    }
]
```

- `visible` (boolean): If true, the color picker is visible; if false, it's invisible.

- `useGradient` (boolean): If true, gradient color tools are enabled.

- `coordinates` (object): Specifies the position of the color picker with x (for left attribute in px) and y (for top attribute in px).

### Event Listeners

The following event listeners are available:

- `on:colorchanged`: Triggered when the color is changed, providing access to:
	- `e.detail.fullHexaColor`  --> hexa color with opacity, example : "#FFFFFFFF"
	- `e.detail.shortHexaColor` --> hexa color without opacity, example : "#FFFFFF"
	- `e.detail.hexaColorOpacity` --> hexa color opacity , example : "FF"
	- `e.detail.intColorOpacity` --> int color opacity , example : 100
- `on:colorchanging`: Triggered during color changes, providing the same details as above.

- `on:gradientchanged`: Triggered when the gradient is changed, providing access to:
	- `e.detail.gradientCss` --> gradient css value, example : `linear-gradient(90deg,#01093FFF 0%,#1458FFFF 100%)`
	- `e.detail.gradient` --> gradient array, example : 
```
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

- `on:gradientchanging`: Triggered during gradient changes, providing the same details as above.