import { writable } from 'svelte/store';
import type { Server, Modal } from './types';

export const openFilePath = writable<string | null>(null)
export const selectedServer = writable<Server | null>(null)
export const servers = writable<Server[]>([])
export const modal = writable<Modal | null>(null)