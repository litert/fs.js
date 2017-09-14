import nodeFS = require("fs");
import { Exception, RawPromise } from "@litert/core";
import * as Errors from "./constants.Error";
import { IFile, FSError } from "./interface.IFile";

class File implements IFile {

    protected _fd: number;

    protected _pos: number;

    protected _path: string;

    public constructor(
        fd: number,
        path: string,
        pos: number = 0
    ) {

        this._path = path;
        this._fd = fd;
        this._pos = pos;
    }

    public close(): Promise<void> {

        let ret = new RawPromise<void, FSError>();

        nodeFS.close(this._fd, (err) => {

            if (err) {

                return ret.reject(err);
            }

            ret.resolve();
        });

        return ret.promise;
    }

    public tell(): number {

        return this._pos;
    }

    public seek(newPos: number): File {

        if (newPos < 0) {

            throw new Exception(
                Errors.E_INVALID_POSITION,
                "Position of file pointer cannot be negative."
            );
        }

        this._pos = newPos;

        return this;
    }

    public forward(posDulta: number): File {

        this._pos += posDulta;

        if (this._pos < 0) {

            this._pos = 0;
        }

        return this;
    }

    public async read(size: number): Promise<Buffer> {

        let ret = new RawPromise<Buffer, FSError>();

        nodeFS.read(
            this._fd,
            Buffer.alloc(size),
            0,
            size,
            this._pos,
            (err: FSError, bytes: number, buffer: Buffer): void => {

                if (err) {

                    return ret.reject(err);
                }

                this._pos += bytes;

                ret.resolve(bytes === size ? buffer : buffer.slice(0, bytes));
            }
        );

        return ret.promise;
    }

    public async readInt8(): Promise<number> {

        try {

            let data = await this.read(1);

            if (data.length !== 1) {

                return Promise.reject(new Exception(
                    Errors.E_EOL,
                    "End of file."
                ));
            }

            return data.readInt8(0);
        }
        catch (e) {

            return Promise.reject(e);
        }
    }

    public async readUInt8(): Promise<number> {

        try {

            let data = await this.read(1);

            if (data.length !== 1) {

                return Promise.reject(new Exception(
                    Errors.E_EOL,
                    "End of file."
                ));
            }

            return data.readUInt8(0);
        }
        catch (e) {

            return Promise.reject(e);
        }
    }

    public async readInt16(): Promise<number> {

        try {

            let data = await this.read(2);

            if (data.length !== 2) {

                return Promise.reject(new Exception(
                    Errors.E_EOL,
                    "End of file."
                ));
            }

            return data.readInt16LE(0);
        }
        catch (e) {

            return Promise.reject(e);
        }
    }

    public async readUInt16(): Promise<number> {

        try {

            let data = await this.read(2);

            if (data.length !== 2) {

                return Promise.reject(new Exception(
                    Errors.E_EOL,
                    "End of file."
                ));
            }

            return data.readUInt16LE(0);
        }
        catch (e) {

            return Promise.reject(e);
        }
    }

    public async readInt16BE(): Promise<number> {

        try {

            let data = await this.read(2);

            if (data.length !== 2) {

                return Promise.reject(new Exception(
                    Errors.E_EOL,
                    "End of file."
                ));
            }

            return data.readInt16BE(0);
        }
        catch (e) {

            return Promise.reject(e);
        }
    }

    public async readUInt16BE(): Promise<number> {

        try {

            let data = await this.read(2);

            if (data.length !== 2) {

                return Promise.reject(new Exception(
                    Errors.E_EOL,
                    "End of file."
                ));
            }

            return data.readUInt16BE(0);
        }
        catch (e) {

            return Promise.reject(e);
        }
    }

    public async readInt32(): Promise<number> {

        try {

            let data = await this.read(4);

            if (data.length !== 4) {

                return Promise.reject(new Exception(
                    Errors.E_EOL,
                    "End of file."
                ));
            }

            return data.readInt32LE(0);
        }
        catch (e) {

            return Promise.reject(e);
        }
    }

    public async readUInt32(): Promise<number> {

        try {

            let data = await this.read(4);

            if (data.length !== 4) {

                return Promise.reject(new Exception(
                    Errors.E_EOL,
                    "End of file."
                ));
            }

            return data.readUInt32LE(0);
        }
        catch (e) {

            return Promise.reject(e);
        }
    }

    public async readInt32BE(): Promise<number> {

        try {

            let data = await this.read(4);

            if (data.length !== 4) {

                return Promise.reject(new Exception(
                    Errors.E_EOL,
                    "End of file."
                ));
            }

            return data.readInt32BE(0);
        }
        catch (e) {

            return Promise.reject(e);
        }
    }

    public async readUInt32BE(): Promise<number> {

        try {

            let data = await this.read(4);

            if (data.length !== 4) {

                return Promise.reject(new Exception(
                    Errors.E_EOL,
                    "End of file."
                ));
            }

            return data.readUInt32BE(0);
        }
        catch (e) {

            return Promise.reject(e);
        }
    }

    public async readInt64(): Promise<number> {

        try {

            let data = await this.read(8);

            if (data.length !== 8) {

                return Promise.reject(new Exception(
                    Errors.E_EOL,
                    "End of file."
                ));
            }

            return data.readIntLE(0, 8);
        }
        catch (e) {

            return Promise.reject(e);
        }
    }

    public async readUInt64(): Promise<number> {

        try {

            let data = await this.read(8);

            if (data.length !== 8) {

                return Promise.reject(new Exception(
                    Errors.E_EOL,
                    "End of file."
                ));
            }

            return data.readUIntLE(0, 8);
        }
        catch (e) {

            return Promise.reject(e);
        }
    }

    public async readInt64BE(): Promise<number> {

        try {

            let data = await this.read(8);

            if (data.length !== 8) {

                return Promise.reject(new Exception(
                    Errors.E_EOL,
                    "End of file."
                ));
            }

            return data.readIntBE(0, 8);
        }
        catch (e) {

            return Promise.reject(e);
        }
    }

    public async readUInt64BE(): Promise<number> {

        try {

            let data = await this.read(8);

            if (data.length !== 8) {

                return Promise.reject(new Exception(
                    Errors.E_EOL,
                    "End of file."
                ));
            }

            return data.readUIntBE(0, 8);
        }
        catch (e) {

            return Promise.reject(e);
        }
    }

    public async readFloat(): Promise<number> {

        try {

            let data = await this.read(4);

            if (data.length !== 4) {

                return Promise.reject(new Exception(
                    Errors.E_EOL,
                    "End of file."
                ));
            }

            return data.readFloatLE(0);
        }
        catch (e) {

            return Promise.reject(e);
        }
    }

    public async readFloatBE(): Promise<number> {

        try {

            let data = await this.read(4);

            if (data.length !== 4) {

                return Promise.reject(new Exception(
                    Errors.E_EOL,
                    "End of file."
                ));
            }

            return data.readFloatBE(0);
        }
        catch (e) {

            return Promise.reject(e);
        }
    }

    public async readDouble(): Promise<number> {

        try {

            let data = await this.read(8);

            if (data.length !== 8) {

                return Promise.reject(new Exception(
                    Errors.E_EOL,
                    "End of file."
                ));
            }

            return data.readDoubleLE(0);
        }
        catch (e) {

            return Promise.reject(e);
        }
    }

    public async readDoubleBE(): Promise<number> {

        try {

            let data = await this.read(8);

            if (data.length !== 8) {

                return Promise.reject(new Exception(
                    Errors.E_EOL,
                    "End of file."
                ));
            }

            return data.readDoubleBE(0);
        }
        catch (e) {

            return Promise.reject(e);
        }
    }

    public async writeInt8(val: number): Promise<void> {

        try {

            let data = Buffer.alloc(1);
            data.writeInt8(val, 0);

            if (await this.write(data, data.byteLength) !== 1) {

                return Promise.reject(new Exception(
                    Errors.E_WRITE_IMCOMPLETED,
                    "Failed to write bytes."
                ));
            }
        }
        catch (e) {

            return Promise.reject(e);
        }
    }

    public async writeUInt8(val: number): Promise<void> {

        try {

            let data = Buffer.alloc(1);
            data.writeUInt8(val, 0);

            if (await this.write(data, data.byteLength) !== 1) {

                return Promise.reject(new Exception(
                    Errors.E_WRITE_IMCOMPLETED,
                    "Failed to write bytes."
                ));
            }
        }
        catch (e) {

            return Promise.reject(e);
        }
    }

    public async writeInt16(val: number): Promise<void> {

        try {

            let data = Buffer.alloc(2);
            data.writeInt16LE(val, 0);

            if (await this.write(data, data.byteLength) !== 2) {

                return Promise.reject(new Exception(
                    Errors.E_WRITE_IMCOMPLETED,
                    "Failed to write bytes."
                ));
            }
        }
        catch (e) {

            return Promise.reject(e);
        }
    }

    public async writeInt16BE(val: number): Promise<void> {

        try {

            let data = Buffer.alloc(2);
            data.writeInt16BE(val, 0);

            if (await this.write(data, data.byteLength) !== 2) {

                return Promise.reject(new Exception(
                    Errors.E_WRITE_IMCOMPLETED,
                    "Failed to write bytes."
                ));
            }
        }
        catch (e) {

            return Promise.reject(e);
        }
    }

    public async writeUInt16(val: number): Promise<void> {

        try {

            let data = Buffer.alloc(2);
            data.writeUInt16LE(val, 0);

            if (await this.write(data, data.byteLength) !== 2) {

                return Promise.reject(new Exception(
                    Errors.E_WRITE_IMCOMPLETED,
                    "Failed to write bytes."
                ));
            }
        }
        catch (e) {

            return Promise.reject(e);
        }
    }

    public async writeUInt16BE(val: number): Promise<void> {

        try {

            let data = Buffer.alloc(2);
            data.writeUInt16BE(val, 0);

            if (await this.write(data, data.byteLength) !== 2) {

                return Promise.reject(new Exception(
                    Errors.E_WRITE_IMCOMPLETED,
                    "Failed to write bytes."
                ));
            }
        }
        catch (e) {

            return Promise.reject(e);
        }
    }

    public async writeInt32(val: number): Promise<void> {

        try {

            let data = Buffer.alloc(4);
            data.writeInt32LE(val, 0);

            if (await this.write(data, data.byteLength) !== 4) {

                return Promise.reject(new Exception(
                    Errors.E_WRITE_IMCOMPLETED,
                    "Failed to write bytes."
                ));
            }
        }
        catch (e) {

            return Promise.reject(e);
        }
    }

    public async writeInt32BE(val: number): Promise<void> {

        try {

            let data = Buffer.alloc(4);
            data.writeInt32BE(val, 0);

            if (await this.write(data, data.byteLength) !== 4) {

                return Promise.reject(new Exception(
                    Errors.E_WRITE_IMCOMPLETED,
                    "Failed to write bytes."
                ));
            }
        }
        catch (e) {

            return Promise.reject(e);
        }
    }

    public async writeUInt32(val: number): Promise<void> {

        try {

            let data = Buffer.alloc(4);
            data.writeUInt32LE(val, 0);

            if (await this.write(data, data.byteLength) !== 4) {

                return Promise.reject(new Exception(
                    Errors.E_WRITE_IMCOMPLETED,
                    "Failed to write bytes."
                ));
            }
        }
        catch (e) {

            return Promise.reject(e);
        }
    }

    public async writeUInt32BE(val: number): Promise<void> {

        try {

            let data = Buffer.alloc(4);
            data.writeUInt32BE(val, 0);

            if (await this.write(data, data.byteLength) !== 4) {

                return Promise.reject(new Exception(
                    Errors.E_WRITE_IMCOMPLETED,
                    "Failed to write bytes."
                ));
            }
        }
        catch (e) {

            return Promise.reject(e);
        }
    }

    public async writeInt64(val: number): Promise<void> {

        try {

            let data = Buffer.alloc(8);
            data.writeIntLE(val, 0, 8);

            if (await this.write(data, data.byteLength) !== 8) {

                return Promise.reject(new Exception(
                    Errors.E_WRITE_IMCOMPLETED,
                    "Failed to write bytes."
                ));
            }
        }
        catch (e) {

            return Promise.reject(e);
        }
    }

    public async writeInt64BE(val: number): Promise<void> {

        try {

            let data = Buffer.alloc(8);
            data.writeIntBE(val, 0, 8);

            if (await this.write(data, data.byteLength) !== 8) {

                return Promise.reject(new Exception(
                    Errors.E_WRITE_IMCOMPLETED,
                    "Failed to write bytes."
                ));
            }
        }
        catch (e) {

            return Promise.reject(e);
        }
    }

    public async writeUInt64(val: number): Promise<void> {

        try {

            let data = Buffer.alloc(8);
            data.writeUIntLE(val, 0, 8);

            if (await this.write(data, data.byteLength) !== 8) {

                return Promise.reject(new Exception(
                    Errors.E_WRITE_IMCOMPLETED,
                    "Failed to write bytes."
                ));
            }
        }
        catch (e) {

            return Promise.reject(e);
        }
    }

    public async writeUInt64BE(val: number): Promise<void> {

        try {

            let data = Buffer.alloc(8);
            data.writeUIntBE(val, 0, 8);

            if (await this.write(data, data.byteLength) !== 8) {

                return Promise.reject(new Exception(
                    Errors.E_WRITE_IMCOMPLETED,
                    "Failed to write bytes."
                ));
            }
        }
        catch (e) {

            return Promise.reject(e);
        }
    }

    public async writeFloat(val: number): Promise<void> {

        try {

            let data = Buffer.alloc(4);
            data.writeFloatLE(val, 0);

            if (await this.write(data, data.byteLength) !== 4) {

                return Promise.reject(new Exception(
                    Errors.E_WRITE_IMCOMPLETED,
                    "Failed to write bytes."
                ));
            }
        }
        catch (e) {

            return Promise.reject(e);
        }
    }

    public async writeFloatBE(val: number): Promise<void> {

        try {

            let data = Buffer.alloc(4);
            data.writeFloatBE(val, 0);

            if (await this.write(data, data.byteLength) !== 4) {

                return Promise.reject(new Exception(
                    Errors.E_WRITE_IMCOMPLETED,
                    "Failed to write bytes."
                ));
            }
        }
        catch (e) {

            return Promise.reject(e);
        }
    }

    public async writeDouble(val: number): Promise<void> {

        try {

            let data = Buffer.alloc(8);
            data.writeDoubleLE(val, 0);

            if (await this.write(data, data.byteLength) !== 8) {

                return Promise.reject(new Exception(
                    Errors.E_WRITE_IMCOMPLETED,
                    "Failed to write bytes."
                ));
            }
        }
        catch (e) {

            return Promise.reject(e);
        }
    }

    public async writeDoubleBE(val: number): Promise<void> {

        try {

            let data = Buffer.alloc(8);
            data.writeDoubleBE(val, 0);

            if (await this.write(data, data.byteLength) !== 8) {

                return Promise.reject(new Exception(
                    Errors.E_WRITE_IMCOMPLETED,
                    "Failed to write bytes."
                ));
            }
        }
        catch (e) {

            return Promise.reject(e);
        }
    }

    public async writeString(data: string, encode: string = "utf-8"): Promise<number> {

        let ret = new RawPromise<number, FSError>();

        nodeFS.write(
            this._fd,
            data,
            this._pos,
            encode,
            (err: FSError, bytes: number): void => {

                if (err) {

                    return ret.reject(err);
                }

                this._pos += bytes;

                ret.resolve(bytes);
            }
        );

        return ret.promise;
    }

    public async write(data: Buffer, size: number): Promise<number> {

        let ret = new RawPromise<number, FSError>();

        nodeFS.write(
            this._fd,
            data,
            0,
            data.byteLength,
            this._pos,
            (err: FSError, bytes: number): void => {

                if (err) {

                    return ret.reject(err);
                }

                this._pos += bytes;

                ret.resolve(bytes);
            }
        );

        return ret.promise;
    }

    public async readAll(): Promise<Buffer> {

        try {

            let pos = this._pos;

            this.seek(0);

            let ret = this.read(await File.getSize(this._path));

            this.seek(pos);

            return ret;
        }
        catch (e) {

            return Promise.reject(e);
        }
    }

    public static async open(path: string, method: string = "r"): Promise<IFile> {

        let ret = new RawPromise<IFile, FSError>();

        nodeFS.open(path, method, function(err, fd: number) {

            if (err) {

                return ret.reject(err);
            }

            if (method.indexOf("a") > -1) {

                File.getSize(path).then(function(size: number) {

                    ret.resolve(new File(fd, path, size));

                }).catch(function(e) {

                    ret.reject(e);
                });
            }
            else {

                ret.resolve(new File(fd, path));
            }
        });

        return ret.promise;
    }

    public static async exists(path: string): Promise<boolean> {

        let ret = new RawPromise<boolean, FSError>();

        nodeFS.exists(path, function(exists: boolean): void {

            if (!exists) {

                return ret.resolve(false);
            }

            nodeFS.stat(path, function(err, stats) {

                if (err) {

                    return ret.reject(err);
                }

                ret.resolve(!stats.isDirectory());
            });
        });

        return ret.promise;
    }

    public static async getSize(path: string): Promise<number> {

        let ret = new RawPromise<number, FSError>();

        nodeFS.stat(path, function(err, stats) {

            if (err) {

                return ret.reject(err);
            }

            ret.resolve(stats.size);
        });

        return ret.promise;
    }

    public static async delete(path: string): Promise<void> {

        let ret = new RawPromise<void, FSError>();

        nodeFS.unlink(path, function(err) {

            if (err) {

                return ret.reject(err);
            }

            ret.resolve();
        });

        return ret.promise;
    }

    public static async readFile(path: string): Promise<Buffer> {

        let ret = new RawPromise<Buffer, FSError>();

        nodeFS.readFile(path, function(err, data: Buffer) {

            if (err) {

                return ret.reject(err);
            }

            ret.resolve(data);
        });

        return ret.promise;
    }

    public static async writeFile(path: string, data: Buffer): Promise<void> {

        let ret = new RawPromise<void, FSError>();

        nodeFS.writeFile(path, data, function(err) {

            if (err) {

                return ret.reject(err);
            }

            ret.resolve();
        });

        return ret.promise;
    }
}

export = File;
