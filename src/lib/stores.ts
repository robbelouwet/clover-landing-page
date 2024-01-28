import { writable } from 'svelte/store';
import type { User } from './types';

export const openFilePath = writable<string | null>(null)
export const user = writable<User | null>({
    serverHost: "capp-paper-robbe4-server--sb4mzj0.wittypond-0c974e4c.westeurope.azurecontainerapps.io",
    username: "robbe",
    port: 61123,
    share: "fs-paper-robbe4"
})
