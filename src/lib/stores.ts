import { writable } from 'svelte/store';
import type { Server } from './types';
import { PUBLIC_BACKEND_HOST } from '$env/static/public'

const resolve: () => Promise<Server> = async () => {
    const result = await (await fetch(`${PUBLIC_BACKEND_HOST}/get-server`)).json()

    const server: Server = {
        serverHost: result["server_host"],
        port: result["server_port"],
        share: result["share"],
        username: result["user_name"]
    }

    return server
}

export const openFilePath = writable<string | null>(null)
export const server = writable<Server>(await resolve())