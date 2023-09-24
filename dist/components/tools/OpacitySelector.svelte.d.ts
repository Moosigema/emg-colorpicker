/** @typedef {typeof __propDef.props}  OpacitySelectorProps */
/** @typedef {typeof __propDef.events}  OpacitySelectorEvents */
/** @typedef {typeof __propDef.slots}  OpacitySelectorSlots */
export default class OpacitySelector extends SvelteComponentTyped<{
    colorOpacity: any;
    opacity?: string | undefined;
    isOpacityCursorMoving?: boolean | undefined;
}, {
    opacitychange: CustomEvent<any>;
} & {
    [evt: string]: CustomEvent<any>;
}, {}> {
}
export type OpacitySelectorProps = typeof __propDef.props;
export type OpacitySelectorEvents = typeof __propDef.events;
export type OpacitySelectorSlots = typeof __propDef.slots;
import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        colorOpacity: any;
        opacity?: string | undefined;
        isOpacityCursorMoving?: boolean | undefined;
    };
    events: {
        opacitychange: CustomEvent<any>;
    } & {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export {};
