/** @typedef {typeof __propDef.props}  RainbowSelectorProps */
/** @typedef {typeof __propDef.events}  RainbowSelectorEvents */
/** @typedef {typeof __propDef.slots}  RainbowSelectorSlots */
export default class RainbowSelector extends SvelteComponentTyped<{
    isRainbowCursorMoving?: boolean | undefined;
    rainbowCursorPosition?: number | undefined;
    colorRainbow?: null | undefined;
}, {
    rainbowchange: CustomEvent<any>;
} & {
    [evt: string]: CustomEvent<any>;
}, {}> {
}
export type RainbowSelectorProps = typeof __propDef.props;
export type RainbowSelectorEvents = typeof __propDef.events;
export type RainbowSelectorSlots = typeof __propDef.slots;
import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        isRainbowCursorMoving?: boolean | undefined;
        rainbowCursorPosition?: number | undefined;
        colorRainbow?: null | undefined;
    };
    events: {
        rainbowchange: CustomEvent<any>;
    } & {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export {};
