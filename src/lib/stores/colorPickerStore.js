import { writable } from "svelte/store";

export let visibleStore = writable({
    visible: false,
    timestamp: null
});