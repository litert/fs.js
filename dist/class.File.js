"use strict";
const nodeFS = require("fs");
const core_1 = require("@litert/core");
const Errors = require("./constants.Error");
class File {
    constructor(fd, path, pos = 0) {
        this._path = path;
        this._fd = fd;
        this._pos = pos;
    }
    close() {
        let ret = new core_1.RawPromise();
        nodeFS.close(this._fd, (err) => {
            if (err) {
                return ret.reject(err);
            }
            ret.resolve();
        });
        return ret.promise;
    }
    tell() {
        return this._pos;
    }
    seek(newPos) {
        if (newPos < 0) {
            throw new core_1.Exception(Errors.E_INVALID_POSITION, "Position of file pointer cannot be negative.");
        }
        this._pos = newPos;
        return this;
    }
    forward(posDulta) {
        this._pos += posDulta;
        if (this._pos < 0) {
            this._pos = 0;
        }
        return this;
    }
    async read(size) {
        let ret = new core_1.RawPromise();
        nodeFS.read(this._fd, Buffer.alloc(size), 0, size, this._pos, (err, bytes, buffer) => {
            if (err) {
                return ret.reject(err);
            }
            this._pos += bytes;
            ret.resolve(bytes === size ? buffer : buffer.slice(0, bytes));
        });
        return ret.promise;
    }
    async readInt8() {
        try {
            let data = await this.read(1);
            if (data.length !== 1) {
                return Promise.reject(new core_1.Exception(Errors.E_EOL, "End of file."));
            }
            return data.readInt8(0);
        }
        catch (e) {
            return Promise.reject(e);
        }
    }
    async readUInt8() {
        try {
            let data = await this.read(1);
            if (data.length !== 1) {
                return Promise.reject(new core_1.Exception(Errors.E_EOL, "End of file."));
            }
            return data.readUInt8(0);
        }
        catch (e) {
            return Promise.reject(e);
        }
    }
    async readInt16() {
        try {
            let data = await this.read(2);
            if (data.length !== 2) {
                return Promise.reject(new core_1.Exception(Errors.E_EOL, "End of file."));
            }
            return data.readInt16LE(0);
        }
        catch (e) {
            return Promise.reject(e);
        }
    }
    async readUInt16() {
        try {
            let data = await this.read(2);
            if (data.length !== 2) {
                return Promise.reject(new core_1.Exception(Errors.E_EOL, "End of file."));
            }
            return data.readUInt16LE(0);
        }
        catch (e) {
            return Promise.reject(e);
        }
    }
    async readInt16BE() {
        try {
            let data = await this.read(2);
            if (data.length !== 2) {
                return Promise.reject(new core_1.Exception(Errors.E_EOL, "End of file."));
            }
            return data.readInt16BE(0);
        }
        catch (e) {
            return Promise.reject(e);
        }
    }
    async readUInt16BE() {
        try {
            let data = await this.read(2);
            if (data.length !== 2) {
                return Promise.reject(new core_1.Exception(Errors.E_EOL, "End of file."));
            }
            return data.readUInt16BE(0);
        }
        catch (e) {
            return Promise.reject(e);
        }
    }
    async readInt32() {
        try {
            let data = await this.read(4);
            if (data.length !== 4) {
                return Promise.reject(new core_1.Exception(Errors.E_EOL, "End of file."));
            }
            return data.readInt32LE(0);
        }
        catch (e) {
            return Promise.reject(e);
        }
    }
    async readUInt32() {
        try {
            let data = await this.read(4);
            if (data.length !== 4) {
                return Promise.reject(new core_1.Exception(Errors.E_EOL, "End of file."));
            }
            return data.readUInt32LE(0);
        }
        catch (e) {
            return Promise.reject(e);
        }
    }
    async readInt32BE() {
        try {
            let data = await this.read(4);
            if (data.length !== 4) {
                return Promise.reject(new core_1.Exception(Errors.E_EOL, "End of file."));
            }
            return data.readInt32BE(0);
        }
        catch (e) {
            return Promise.reject(e);
        }
    }
    async readUInt32BE() {
        try {
            let data = await this.read(4);
            if (data.length !== 4) {
                return Promise.reject(new core_1.Exception(Errors.E_EOL, "End of file."));
            }
            return data.readUInt32BE(0);
        }
        catch (e) {
            return Promise.reject(e);
        }
    }
    async readInt64() {
        try {
            let data = await this.read(8);
            if (data.length !== 8) {
                return Promise.reject(new core_1.Exception(Errors.E_EOL, "End of file."));
            }
            return data.readIntLE(0, 8);
        }
        catch (e) {
            return Promise.reject(e);
        }
    }
    async readUInt64() {
        try {
            let data = await this.read(8);
            if (data.length !== 8) {
                return Promise.reject(new core_1.Exception(Errors.E_EOL, "End of file."));
            }
            return data.readUIntLE(0, 8);
        }
        catch (e) {
            return Promise.reject(e);
        }
    }
    async readInt64BE() {
        try {
            let data = await this.read(8);
            if (data.length !== 8) {
                return Promise.reject(new core_1.Exception(Errors.E_EOL, "End of file."));
            }
            return data.readIntBE(0, 8);
        }
        catch (e) {
            return Promise.reject(e);
        }
    }
    async readUInt64BE() {
        try {
            let data = await this.read(8);
            if (data.length !== 8) {
                return Promise.reject(new core_1.Exception(Errors.E_EOL, "End of file."));
            }
            return data.readUIntBE(0, 8);
        }
        catch (e) {
            return Promise.reject(e);
        }
    }
    async readFloat() {
        try {
            let data = await this.read(4);
            if (data.length !== 4) {
                return Promise.reject(new core_1.Exception(Errors.E_EOL, "End of file."));
            }
            return data.readFloatLE(0);
        }
        catch (e) {
            return Promise.reject(e);
        }
    }
    async readFloatBE() {
        try {
            let data = await this.read(4);
            if (data.length !== 4) {
                return Promise.reject(new core_1.Exception(Errors.E_EOL, "End of file."));
            }
            return data.readFloatBE(0);
        }
        catch (e) {
            return Promise.reject(e);
        }
    }
    async readDouble() {
        try {
            let data = await this.read(8);
            if (data.length !== 8) {
                return Promise.reject(new core_1.Exception(Errors.E_EOL, "End of file."));
            }
            return data.readDoubleLE(0);
        }
        catch (e) {
            return Promise.reject(e);
        }
    }
    async readDoubleBE() {
        try {
            let data = await this.read(8);
            if (data.length !== 8) {
                return Promise.reject(new core_1.Exception(Errors.E_EOL, "End of file."));
            }
            return data.readDoubleBE(0);
        }
        catch (e) {
            return Promise.reject(e);
        }
    }
    async writeInt8(val) {
        try {
            let data = Buffer.alloc(1);
            data.writeInt8(val, 0);
            if (await this.write(data, data.byteLength) !== 1) {
                return Promise.reject(new core_1.Exception(Errors.E_WRITE_IMCOMPLETED, "Failed to write bytes."));
            }
        }
        catch (e) {
            return Promise.reject(e);
        }
    }
    async writeUInt8(val) {
        try {
            let data = Buffer.alloc(1);
            data.writeUInt8(val, 0);
            if (await this.write(data, data.byteLength) !== 1) {
                return Promise.reject(new core_1.Exception(Errors.E_WRITE_IMCOMPLETED, "Failed to write bytes."));
            }
        }
        catch (e) {
            return Promise.reject(e);
        }
    }
    async writeInt16(val) {
        try {
            let data = Buffer.alloc(2);
            data.writeInt16LE(val, 0);
            if (await this.write(data, data.byteLength) !== 2) {
                return Promise.reject(new core_1.Exception(Errors.E_WRITE_IMCOMPLETED, "Failed to write bytes."));
            }
        }
        catch (e) {
            return Promise.reject(e);
        }
    }
    async writeInt16BE(val) {
        try {
            let data = Buffer.alloc(2);
            data.writeInt16BE(val, 0);
            if (await this.write(data, data.byteLength) !== 2) {
                return Promise.reject(new core_1.Exception(Errors.E_WRITE_IMCOMPLETED, "Failed to write bytes."));
            }
        }
        catch (e) {
            return Promise.reject(e);
        }
    }
    async writeUInt16(val) {
        try {
            let data = Buffer.alloc(2);
            data.writeUInt16LE(val, 0);
            if (await this.write(data, data.byteLength) !== 2) {
                return Promise.reject(new core_1.Exception(Errors.E_WRITE_IMCOMPLETED, "Failed to write bytes."));
            }
        }
        catch (e) {
            return Promise.reject(e);
        }
    }
    async writeUInt16BE(val) {
        try {
            let data = Buffer.alloc(2);
            data.writeUInt16BE(val, 0);
            if (await this.write(data, data.byteLength) !== 2) {
                return Promise.reject(new core_1.Exception(Errors.E_WRITE_IMCOMPLETED, "Failed to write bytes."));
            }
        }
        catch (e) {
            return Promise.reject(e);
        }
    }
    async writeInt32(val) {
        try {
            let data = Buffer.alloc(4);
            data.writeInt32LE(val, 0);
            if (await this.write(data, data.byteLength) !== 4) {
                return Promise.reject(new core_1.Exception(Errors.E_WRITE_IMCOMPLETED, "Failed to write bytes."));
            }
        }
        catch (e) {
            return Promise.reject(e);
        }
    }
    async writeInt32BE(val) {
        try {
            let data = Buffer.alloc(4);
            data.writeInt32BE(val, 0);
            if (await this.write(data, data.byteLength) !== 4) {
                return Promise.reject(new core_1.Exception(Errors.E_WRITE_IMCOMPLETED, "Failed to write bytes."));
            }
        }
        catch (e) {
            return Promise.reject(e);
        }
    }
    async writeUInt32(val) {
        try {
            let data = Buffer.alloc(4);
            data.writeUInt32LE(val, 0);
            if (await this.write(data, data.byteLength) !== 4) {
                return Promise.reject(new core_1.Exception(Errors.E_WRITE_IMCOMPLETED, "Failed to write bytes."));
            }
        }
        catch (e) {
            return Promise.reject(e);
        }
    }
    async writeUInt32BE(val) {
        try {
            let data = Buffer.alloc(4);
            data.writeUInt32BE(val, 0);
            if (await this.write(data, data.byteLength) !== 4) {
                return Promise.reject(new core_1.Exception(Errors.E_WRITE_IMCOMPLETED, "Failed to write bytes."));
            }
        }
        catch (e) {
            return Promise.reject(e);
        }
    }
    async writeInt64(val) {
        try {
            let data = Buffer.alloc(8);
            data.writeIntLE(val, 0, 8);
            if (await this.write(data, data.byteLength) !== 8) {
                return Promise.reject(new core_1.Exception(Errors.E_WRITE_IMCOMPLETED, "Failed to write bytes."));
            }
        }
        catch (e) {
            return Promise.reject(e);
        }
    }
    async writeInt64BE(val) {
        try {
            let data = Buffer.alloc(8);
            data.writeIntBE(val, 0, 8);
            if (await this.write(data, data.byteLength) !== 8) {
                return Promise.reject(new core_1.Exception(Errors.E_WRITE_IMCOMPLETED, "Failed to write bytes."));
            }
        }
        catch (e) {
            return Promise.reject(e);
        }
    }
    async writeUInt64(val) {
        try {
            let data = Buffer.alloc(8);
            data.writeUIntLE(val, 0, 8);
            if (await this.write(data, data.byteLength) !== 8) {
                return Promise.reject(new core_1.Exception(Errors.E_WRITE_IMCOMPLETED, "Failed to write bytes."));
            }
        }
        catch (e) {
            return Promise.reject(e);
        }
    }
    async writeUInt64BE(val) {
        try {
            let data = Buffer.alloc(8);
            data.writeUIntBE(val, 0, 8);
            if (await this.write(data, data.byteLength) !== 8) {
                return Promise.reject(new core_1.Exception(Errors.E_WRITE_IMCOMPLETED, "Failed to write bytes."));
            }
        }
        catch (e) {
            return Promise.reject(e);
        }
    }
    async writeFloat(val) {
        try {
            let data = Buffer.alloc(4);
            data.writeFloatLE(val, 0);
            if (await this.write(data, data.byteLength) !== 4) {
                return Promise.reject(new core_1.Exception(Errors.E_WRITE_IMCOMPLETED, "Failed to write bytes."));
            }
        }
        catch (e) {
            return Promise.reject(e);
        }
    }
    async writeFloatBE(val) {
        try {
            let data = Buffer.alloc(4);
            data.writeFloatBE(val, 0);
            if (await this.write(data, data.byteLength) !== 4) {
                return Promise.reject(new core_1.Exception(Errors.E_WRITE_IMCOMPLETED, "Failed to write bytes."));
            }
        }
        catch (e) {
            return Promise.reject(e);
        }
    }
    async writeDouble(val) {
        try {
            let data = Buffer.alloc(8);
            data.writeDoubleLE(val, 0);
            if (await this.write(data, data.byteLength) !== 8) {
                return Promise.reject(new core_1.Exception(Errors.E_WRITE_IMCOMPLETED, "Failed to write bytes."));
            }
        }
        catch (e) {
            return Promise.reject(e);
        }
    }
    async writeDoubleBE(val) {
        try {
            let data = Buffer.alloc(8);
            data.writeDoubleBE(val, 0);
            if (await this.write(data, data.byteLength) !== 8) {
                return Promise.reject(new core_1.Exception(Errors.E_WRITE_IMCOMPLETED, "Failed to write bytes."));
            }
        }
        catch (e) {
            return Promise.reject(e);
        }
    }
    async writeString(data, encode = "utf-8") {
        let ret = new core_1.RawPromise();
        nodeFS.write(this._fd, data, this._pos, encode, (err, bytes) => {
            if (err) {
                return ret.reject(err);
            }
            this._pos += bytes;
            ret.resolve(bytes);
        });
        return ret.promise;
    }
    async write(data, size) {
        let ret = new core_1.RawPromise();
        nodeFS.write(this._fd, data, 0, data.byteLength, this._pos, (err, bytes) => {
            if (err) {
                return ret.reject(err);
            }
            this._pos += bytes;
            ret.resolve(bytes);
        });
        return ret.promise;
    }
    async readAll() {
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
    static async open(path, method = "r") {
        let ret = new core_1.RawPromise();
        nodeFS.open(path, method, function (err, fd) {
            if (err) {
                return ret.reject(err);
            }
            if (method.indexOf("a") > -1) {
                File.getSize(path).then(function (size) {
                    ret.resolve(new File(fd, path, size));
                }).catch(function (e) {
                    ret.reject(e);
                });
            }
            else {
                ret.resolve(new File(fd, path));
            }
        });
        return ret.promise;
    }
    static async exists(path) {
        let ret = new core_1.RawPromise();
        nodeFS.exists(path, function (exists) {
            if (!exists) {
                return ret.resolve(false);
            }
            nodeFS.stat(path, function (err, stats) {
                if (err) {
                    return ret.reject(err);
                }
                ret.resolve(!stats.isDirectory());
            });
        });
        return ret.promise;
    }
    static async getSize(path) {
        let ret = new core_1.RawPromise();
        nodeFS.stat(path, function (err, stats) {
            if (err) {
                return ret.reject(err);
            }
            ret.resolve(stats.size);
        });
        return ret.promise;
    }
    static async delete(path) {
        let ret = new core_1.RawPromise();
        nodeFS.unlink(path, function (err) {
            if (err) {
                return ret.reject(err);
            }
            ret.resolve();
        });
        return ret.promise;
    }
    static async readFile(path) {
        let ret = new core_1.RawPromise();
        nodeFS.readFile(path, function (err, data) {
            if (err) {
                return ret.reject(err);
            }
            ret.resolve(data);
        });
        return ret.promise;
    }
    static async writeFile(path, data) {
        let ret = new core_1.RawPromise();
        nodeFS.writeFile(path, data, function (err) {
            if (err) {
                return ret.reject(err);
            }
            ret.resolve();
        });
        return ret.promise;
    }
}
module.exports = File;
//# sourceMappingURL=class.File.js.map