/** @typedef {typeof __propDef.props}  GradientSelectorProps */
/** @typedef {typeof __propDef.events}  GradientSelectorEvents */
/** @typedef {typeof __propDef.slots}  GradientSelectorSlots */
export default class GradientSelector extends SvelteComponentTyped<{
    color: any;
    isGradientCursorMoving?: boolean | undefined;
    gradientColors?: {
        pourcentage: number;
        color: string;
    }[] | undefined;
}, {
    pointerdown: PointerEvent;
    gradientchanging: CustomEvent<any>;
    cursorselected: CustomEvent<any>;
    gradientchanged: CustomEvent<any>;
} & {
    [evt: string]: CustomEvent<any>;
}, {}> {
}
export type GradientSelectorProps = typeof __propDef.props;
export type GradientSelectorEvents = typeof __propDef.events;
export type GradientSelectorSlots = typeof __propDef.slots;
import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        color: any;
        isGradientCursorMoving?: boolean | undefined;
        gradientColors?: {
            pourcentage: number;
            color: string;
        }[] | undefined;
    };
    events: {
        pointerdown: PointerEvent;
        gradientchanging: CustomEvent<any>;
        cursorselected: CustomEvent<any>;
        gradientchanged: CustomEvent<any>;
    } & {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export {};
