import { writable } from 'svelte/store';
import type { Server } from './types';
import { PUBLIC_BACKEND_HOST } from '$env/static/public'

export const openFilePath = writable<string | null>(null)
export const selectedServer = writable<Server | null>(null)
export const servers = writable<Server[]>([])