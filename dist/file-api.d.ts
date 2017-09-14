/// <reference types="node" />
import { IFile } from "./interface.IFile";
export declare let exists: (path: string) => Promise<boolean>;
export declare let getSize: (path: string) => Promise<number>;
export declare let open: (path: string, method?: string) => Promise<IFile>;
export declare let write: (path: string, data: Buffer) => Promise<void>;
export declare let read: (path: string) => Promise<Buffer>;
declare let deleteFile: (path: string) => Promise<void>;
export { deleteFile as delete };
