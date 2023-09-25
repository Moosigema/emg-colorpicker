/// <reference types="svelte" />
export let visibleStore: import("svelte/store").Writable<{
    visible: boolean;
    timestamp: null;
}>;
