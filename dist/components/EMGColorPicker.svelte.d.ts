/** @typedef {typeof __propDef.props}  EmgColorPickerProps */
/** @typedef {typeof __propDef.events}  EmgColorPickerEvents */
/** @typedef {typeof __propDef.slots}  EmgColorPickerSlots */
export default class EmgColorPicker extends SvelteComponentTyped<{
    hexa?: string | undefined;
    visible?: boolean | undefined;
    coordinates?: {
        x: number;
        y: number;
    } | undefined;
}, {
    pointerdown: PointerEvent;
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
        hexa?: string | undefined;
        visible?: boolean | undefined;
        coordinates?: {
            x: number;
            y: number;
        } | undefined;
    };
    events: {
        pointerdown: PointerEvent;
    } & {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export {};
