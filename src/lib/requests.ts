import { PUBLIC_BACKEND_HOST } from "$env/static/public";
import { get } from "svelte/store";
import { modal, selectedServer, servers } from "./stores";
import { unauthorizedModal, type Server } from "./types";

export const deployServerRequest = (selectedKind: string, servername: string, callback: (s: any) => void) => {

    let deployUrl = ''
    if (selectedKind === "bedrock" || selectedKind === "paper")
        deployUrl = `${PUBLIC_BACKEND_HOST}/deploy-dedicated?kind=${selectedKind}&cpu=2&memory=4096&servername=${servername}`
    else deployUrl = `${PUBLIC_BACKEND_HOST}/deploy-consumption?cpu=2&memory=4096&servername=${servername}`

    fetch(
        deployUrl,
        {
            method: 'GET',
            credentials: 'include',
            headers: {
                Accept: 'application/json'
            }
        }
    )
        .then((r) => {
            if (r.status % 400 < 100) {
                modal.set(unauthorizedModal);
                throw new Error('Unauthorized');
            }

            if (r.status >= 200 && r.status <= 299) callback('success');
            else callback('error')
        })
        .catch((e) => {
            console.error(e);
            callback('error')
        });
}

export const deleteServerRequest = (server: Server) => {
    fetch(`${PUBLIC_BACKEND_HOST}/delete-${server.tier === "dedicated" ? "dedicated" : "consumption"}?servername=${server.servername}`, {
        method: 'GET',
        credentials: 'include',
        headers: {
            Accept: 'application/json'
        }
    })
        .then((resp) => {
            if (resp.status % 400 < 100) {
                modal.set(unauthorizedModal);
                throw new Error('Unauthorized');
            }
            if (resp.ok) {
                const e = get(servers).find((s) => s.servername === server.servername);
                const i = get(servers).indexOf(e!);
                if (get(selectedServer)?.servername === server.servername) selectedServer.set(null);
                get(servers).splice(i, 1);
                servers.set([...get(servers)]);
            }
        })
        .catch(console.error);
}

export const pingServerRequest = (server: Server, successCallback: any) => {
    fetch(
        `${PUBLIC_BACKEND_HOST}/ping-${server.kind === "bedrock" ? "bedrock" : "java"}-server?servername=${server.servername}`,
        {
            method: 'GET',
            credentials: 'include',
            headers: {
                Accept: 'application/json'
            }
        }
    )
        .then((data) => {
            if (data.status % 400 < 100) {
                modal.set(unauthorizedModal);
                throw new Error('Unauthorized');
            }
            if (data.status % 200 < 100)
                return data.json();
        })
        .then((response) => {
            if (response !== undefined)
                successCallback(response);
        })
        .catch(console.error);
};

export const fetchAllUserServersRequest = () => {
    fetch(`${PUBLIC_BACKEND_HOST}/get-all-user-servers`, {
        method: 'GET',
        credentials: 'include',
        headers: {
            Accept: 'application/json'
        }
    })
        .then((data) => {
            if (data.status % 400 < 100) {
                modal.set(unauthorizedModal);
                throw new Error('Unauthorized');
            }
            return data.json();
        })
        .then((results) => {
            servers.set(
                results?.map((result: any) => {
                    const localServer: Server = {
                        serverHost: result['server_host'],
                        consolePort: result['console_port'],
                        //port: result['server_port'],
                        share: result['share'],
                        servername: result['server_name'],
                        kind: result['kind'],
                        tier: result['tier']
                    };
                    return localServer;
                })
            );
            selectedServer.set(get(servers)[0] ?? null);
            console.log('Found user servers: ', get(servers), ', selected: ', get(selectedServer));
        })
        .catch(console.error);
}

export const startServerRequest = (servername: string, callback: (s: 'offline' | 'online' | 'loading' | 'unknown') => void) => {
    callback('loading')
    fetch(`${PUBLIC_BACKEND_HOST}/start-dedicated?servername=${servername}`, {
        method: 'GET',
        credentials: 'include',
        headers: {
            Accept: 'application/json'
        }
    })
        .then((data) => {
            if (data.status % 400 < 100) {
                modal.set(unauthorizedModal);
                throw new Error('Unauthorized');
            }
            else if (data.status % 200 < 100) callback('online')
        })
        .catch(console.error);
}

export const stopServerRequest = (servername: string, callback: (s: 'offline' | 'online' | 'loading' | 'unknown') => void) => {
    callback('loading')
    fetch(`${PUBLIC_BACKEND_HOST}/stop-dedicated?servername=${servername}`, {
        method: 'GET',
        credentials: 'include',
        headers: {
            Accept: 'application/json'
        }
    })
        .then((data) => {
            if (data.status % 400 < 100) {
                modal.set(unauthorizedModal);
                throw new Error('Unauthorized');
            }
            else if (data.status % 200 < 100) callback('offline')
        })
        .catch(console.error);
}

export const getServerStateRequest = (servername: string, callback: (s: 'offline' | 'online' | 'loading' | 'unknown') => void) => {
    fetch(`${PUBLIC_BACKEND_HOST}/get-state-dedicated?servername=${servername}`, {
        method: 'GET',
        credentials: 'include',
        headers: {
            Accept: 'application/json'
        }
    })
        .then((resp) => {
            if (resp.status % 400 < 100) {
                modal.set(unauthorizedModal);
                throw new Error('Unauthorized');
            }
            else if (resp.status % 200 < 100) return resp.json()
        })
        .then(data => {
            if (data["state"] === "Running") callback('online')
            else if (data["state"] === "Terminated") callback('offline')
            else if (data["state"] === "Waiting") callback('loading')
            else callback('unknown')
        })
        .catch(console.error);
}