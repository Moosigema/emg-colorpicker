/** @typedef {typeof __propDef.props}  ShadeSelectorProps */
/** @typedef {typeof __propDef.events}  ShadeSelectorEvents */
/** @typedef {typeof __propDef.slots}  ShadeSelectorSlots */
export default class ShadeSelector extends SvelteComponentTyped<{
    reset: any;
    colorShade: any;
    isShadeCursorMoving?: boolean | undefined;
}, {
    shadechange: CustomEvent<any>;
} & {
    [evt: string]: CustomEvent<any>;
}, {}> {
}
export type ShadeSelectorProps = typeof __propDef.props;
export type ShadeSelectorEvents = typeof __propDef.events;
export type ShadeSelectorSlots = typeof __propDef.slots;
import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        reset: any;
        colorShade: any;
        isShadeCursorMoving?: boolean | undefined;
    };
    events: {
        shadechange: CustomEvent<any>;
    } & {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export {};
