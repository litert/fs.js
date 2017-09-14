
export type FSError = NodeJS.ErrnoException;

export interface IFile {

    close(): Promise<void>;

    readAll(): Promise<Buffer>;

    read(size: number): Promise<Buffer>;

    write(data: Buffer, size: number): Promise<number>;

    writeString(
        data: string,
        encode?: string
    ): Promise<number>;

    readInt8(): Promise<number>;

    readUInt8(): Promise<number>;

    readInt16(): Promise<number>;

    readUInt16(): Promise<number>;

    readInt16BE(): Promise<number>;

    readUInt16BE(): Promise<number>;

    readInt32(): Promise<number>;

    readUInt32(): Promise<number>;

    readInt32BE(): Promise<number>;

    readUInt32BE(): Promise<number>;

    readInt64(): Promise<number>;

    readUInt64(): Promise<number>;

    readInt64BE(): Promise<number>;

    readUInt64BE(): Promise<number>;

    readFloat(): Promise<number>;

    readFloatBE(): Promise<number>;

    readDouble(): Promise<number>;

    readDoubleBE(): Promise<number>;

    writeInt8(val: number): Promise<void>;

    writeUInt8(val: number): Promise<void>;

    writeInt16(val: number): Promise<void>;

    writeUInt16(val: number): Promise<void>;

    writeInt16BE(val: number): Promise<void>;

    writeUInt16BE(val: number): Promise<void>;

    writeInt32(val: number): Promise<void>;

    writeUInt32(val: number): Promise<void>;

    writeInt32BE(val: number): Promise<void>;

    writeUInt32BE(val: number): Promise<void>;

    writeInt64(val: number): Promise<void>;

    writeUInt64(val: number): Promise<void>;

    writeInt64BE(val: number): Promise<void>;

    writeUInt64BE(val: number): Promise<void>;

    writeFloat(val: number): Promise<void>;

    writeFloatBE(val: number): Promise<void>;

    writeDouble(val: number): Promise<void>;

    writeDoubleBE(val: number): Promise<void>;

    seek(newPos: number): IFile;

    tell(): number;

    forward(posDulta: number): IFile;
}
