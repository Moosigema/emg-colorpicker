/** @typedef {typeof __propDef.props}  EmgColorPickerProps */
/** @typedef {typeof __propDef.events}  EmgColorPickerEvents */
/** @typedef {typeof __propDef.slots}  EmgColorPickerSlots */
export default class EmgColorPicker extends SvelteComponentTyped<{
    solidColor: any;
    visible?: boolean | undefined;
    coordinates?: {
        x: number;
        y: number;
    } | undefined;
    gradientColors?: {
        pourcentage: number;
        color: string;
    }[] | undefined;
    useGradient?: boolean | undefined;
}, {
    pointerdown: PointerEvent;
    colorchanged: CustomEvent<any>;
    colorchanging: CustomEvent<any>;
    gradientchanging: CustomEvent<any>;
    gradientchanged: CustomEvent<any>;
} & {
    [evt: string]: CustomEvent<any>;
}, {}> {
}
export type EmgColorPickerProps = typeof __propDef.props;
export type EmgColorPickerEvents = typeof __propDef.events;
export type EmgColorPickerSlots = typeof __propDef.slots;
import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        solidColor: any;
        visible?: boolean | undefined;
        coordinates?: {
            x: number;
            y: number;
        } | undefined;
        gradientColors?: {
            pourcentage: number;
            color: string;
        }[] | undefined;
        useGradient?: boolean | undefined;
    };
    events: {
        pointerdown: PointerEvent;
        colorchanged: CustomEvent<any>;
        colorchanging: CustomEvent<any>;
        gradientchanging: CustomEvent<any>;
        gradientchanged: CustomEvent<any>;
    } & {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export {};
