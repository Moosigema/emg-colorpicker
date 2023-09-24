/** @typedef {typeof __propDef.props}  SolidPickerProps */
/** @typedef {typeof __propDef.events}  SolidPickerEvents */
/** @typedef {typeof __propDef.slots}  SolidPickerSlots */
export default class SolidPicker extends SvelteComponentTyped<{
    colorHexa?: string | undefined;
}, {
    colorchanged: CustomEvent<any>;
    colorchanging: CustomEvent<any>;
} & {
    [evt: string]: CustomEvent<any>;
}, {}> {
}
export type SolidPickerProps = typeof __propDef.props;
export type SolidPickerEvents = typeof __propDef.events;
export type SolidPickerSlots = typeof __propDef.slots;
import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        colorHexa?: string | undefined;
    };
    events: {
        colorchanged: CustomEvent<any>;
        colorchanging: CustomEvent<any>;
    } & {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export {};
