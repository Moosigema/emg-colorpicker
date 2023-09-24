/** @typedef {typeof __propDef.props}  GradientPickerProps */
/** @typedef {typeof __propDef.events}  GradientPickerEvents */
/** @typedef {typeof __propDef.slots}  GradientPickerSlots */
export default class GradientPicker extends SvelteComponentTyped<{
    gradient?: {
        pourcentage: number;
        color: string;
    }[] | undefined;
}, {
    gradientchanged: CustomEvent<any>;
    gradientchanging: CustomEvent<any>;
} & {
    [evt: string]: CustomEvent<any>;
}, {}> {
}
export type GradientPickerProps = typeof __propDef.props;
export type GradientPickerEvents = typeof __propDef.events;
export type GradientPickerSlots = typeof __propDef.slots;
import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        gradient?: {
            pourcentage: number;
            color: string;
        }[] | undefined;
    };
    events: {
        gradientchanged: CustomEvent<any>;
        gradientchanging: CustomEvent<any>;
    } & {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export {};
