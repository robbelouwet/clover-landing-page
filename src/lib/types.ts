export type Server = {
    /** @property {string} username The username of the user. */
    username: string

    /** @property {string} serverHost The host of this user's server. */
    serverHost: string

    /** @property {number} port The port of this user's server, the STDIO werver is this port + 1. */
    port: number

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
    filepath: string
};