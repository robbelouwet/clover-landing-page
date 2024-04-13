export type Server = {
    /** @property {string} username The username of the user. */
    // username: string

    /** @property {"bedrock" | "java"} kind The kind of minecraft server. */
    kind: "bedrock" | "java"

    /** @property {"dedicated" | "consumption"} tier The server tier. */
    tier: "dedicated" | "consumption"

    /** @property {string} serverHost The host of this user's server. */
    serverHost: string

    /** @property {number} consolePort The port for the console if this is a consumption server. */
    consolePort: number | null

    /** @property {number} port The port of this user's server, the STDIO server is this port + 1. */
    // port: number

    /** @property {string} share The storage account file share name of this user's game files. */
    share: string

    /** @property {string} servername The name of the server. */
    servername: string
}

export type UserFolder = {
    name: string;
    path: string;
    subfolders: UserFolder[];
    files: UserFile[];
};

export type UserFile = {
    name: string;
    filepath: string;
};

export type Modal = {
    // type: "success" | "info" | "warning" | "danger";
    title: string;
    message: string;
    closeCallback: () => void;
}

export const unauthorizedModal: Modal = {
    title: 'Unauthorized',
    message: 'Please log in before continuing',
    closeCallback: () => null
}