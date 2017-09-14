import File = require("./class.File");
import { IFile } from "./interface.IFile";

export let exists: (path: string) => Promise<boolean> = File.exists;

export let getSize: (path: string) => Promise<number> = File.getSize;

export let open: (
    path: string,
    method?: string
) => Promise<IFile> = File.open;

export let write: (
    path: string,
    data: Buffer
) => Promise<void> = File.writeFile;

export let read: (path: string) => Promise<Buffer> = File.readFile;

let deleteFile: (path: string) => Promise<void> = File.delete;

export { deleteFile as delete };
