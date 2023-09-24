/** @typedef {typeof __propDef.props}  CursorSelectorProps */
/** @typedef {typeof __propDef.events}  CursorSelectorEvents */
/** @typedef {typeof __propDef.slots}  CursorSelectorSlots */
export default class CursorSelector extends SvelteComponentTyped<{
    coordinates?: {
        x: string;
        y: string;
    } | undefined;
    selected?: boolean | undefined;
}, {
    pointerdown: PointerEvent;
    dblclick: MouseEvent;
} & {
    [evt: string]: CustomEvent<any>;
}, {}> {
}
export type CursorSelectorProps = typeof __propDef.props;
export type CursorSelectorEvents = typeof __propDef.events;
export type CursorSelectorSlots = typeof __propDef.slots;
import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        coordinates?: {
            x: string;
            y: string;
        } | undefined;
        selected?: boolean | undefined;
    };
    events: {
        pointerdown: PointerEvent;
        dblclick: MouseEvent;
    } & {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export {};
