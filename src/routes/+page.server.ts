// import { env } from "$env/dynamic/public"
// import type { Server } from "$lib/types"

// export const load = async () => {
//     const result = await (await fetch(`${env.PUBLIC_BACKEND_HOST}/get-server`)).json()

//     const server: Server = {
//         serverHost: result["server_host"],
//         port: result["server_port"],
//         share: result["share"],
//         username: result["user_name"]
//     }

//     return server
// }