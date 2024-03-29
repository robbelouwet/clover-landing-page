import { get } from "svelte/store"
import { selectedServer, modal } from "./stores"
import { unauthorizedModal, type UserFolder } from "./types"
import { PUBLIC_BACKEND_HOST } from "$env/static/public"

export const loadFolderContent = async (folderPath: string = "") => {
    if (get(selectedServer) === null) {
        console.log("Server null: ", get(selectedServer))
        throw new Error("Loading folder content when user is not logged in!")
    }

    let folder: UserFolder = {
        name: folderPath.includes('/') ? folderPath.split("/").slice(-1)[0] : folderPath,
        path: folderPath,
        files: [],
        subfolders: []
    }

    const response: any = await fetch(`${PUBLIC_BACKEND_HOST}/list-dir?path=${folderPath}&servername=${get(selectedServer)!.servername}`, {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Accept': 'application/json'
        }
    })

    if (response.status % 400 < 100) {
        modal.set(unauthorizedModal)
        throw new Error("Unauthorized")
    }

    const contents: any = await response.json()

    console.log("Directory items: ", contents)

    let i = 1;
    for (const item of contents) {
        if (item["is_directory"]) {
            folder.subfolders.push({
                name: item.name,
                path: folderPath + `/${item.name}`,
                files: [],
                subfolders: []
            })
            console.log(`${i} - directory\t: ${item.name}`);
        } else {
            folder.files.push({
                name: item.name,
                filepath: folderPath + `/${item.name}`
            })
            console.log(`${i} - file\t: ${item.name}`);
        }
        i++;
    }

    return folder

}

export const loadFileContent = async (filepath: string) => {
    if (get(selectedServer) === null) {
        throw new Error("Loading file content when user is not logged in!")
    }

    const response = await fetch(`${PUBLIC_BACKEND_HOST}/get-file?filepath=${filepath}&servername=${get(selectedServer)!.servername}`, {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Accept': 'text/plain'
        }
    })

    if (response.status % 400 < 100) {
        modal.set(unauthorizedModal)
        throw new Error("Unauthorized")
    }

    return await response.text()
}

export const upsertFileContent = async (content: string, filepath: string) => {
    if (get(selectedServer) === null) {
        throw new Error("Uploading file when user is not logged in!")
    }

    const response = await fetch(`${PUBLIC_BACKEND_HOST}/upsert-file?filepath=${filepath}&servername=${get(selectedServer)!.servername}`, {
        method: 'POST',
        credentials: 'include',
        // mode: "no-cors",
        headers: {
            'Content-Type': 'text/plain',
            'User-Agent': 'Foobar'  // Currently, the auth container fires a 403 because it thinks XSRF is taking place, this is a workaround
        },
        body: content
    })

    if (response.status % 400 < 100) {
        modal.set(unauthorizedModal)
        throw new Error("Unauthorized")
    }
}

export const expandFolderRecursively: (
    currentFolder: UserFolder,
    path: string,
    i: number
) => Promise<UserFolder> = async (currentFolder: UserFolder, path: string, i: number) => {
    console.log('current folder: ', currentFolder, ', path: ', path.split('/'), ', i: ', i);

    // Leaf case
    console.log(i, ' >= ', path.split('/').length - 1, ' = ', i >= path.length - 1);
    if (i >= path.split('/').length - 1) {
        console.log(
            'Leaf reached, leaf dir: ',
            currentFolder.name,
            ' querying folder contents of ',
            path,
            'and updating ',
            currentFolder.path
        );

        // Success scenario:
        if (currentFolder.subfolders.length !== 0 || currentFolder.files.length !== 0) return currentFolder

        const expandedTargetDir = await loadFolderContent(path);
        console.log(
            'Success case reached, current folder: ',
            currentFolder,
            ' inserting expanded target dir: ',
            expandedTargetDir
        );
        return { ...expandedTargetDir };
    }

    const nextSubDirName = path.split('/')[i + 1];

    // Recursive case
    const nextSubDir = currentFolder.subfolders.find((f) => f.name === nextSubDirName)!;
    console.log(
        'Now traversing subfolder: ',
        nextSubDirName,
        ' from ancestor: ',
        currentFolder.name
    );

    // Remove and re-insert the recursively expanded subfolder at the same index,
    // otherwise folders in the file explorer will jump around
    const ancestor = currentFolder.subfolders.find((f) => f.name === nextSubDirName)!;
    const j = currentFolder.subfolders.indexOf(ancestor);
    currentFolder.subfolders[j] = await expandFolderRecursively(nextSubDir, path, i + 1);
    return { ...currentFolder };
};