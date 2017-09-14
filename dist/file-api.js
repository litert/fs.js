"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const File = require("./class.File");
exports.exists = File.exists;
exports.getSize = File.getSize;
exports.open = File.open;
exports.write = File.writeFile;
exports.read = File.readFile;
let deleteFile = File.delete;
exports.delete = deleteFile;
//# sourceMappingURL=file-api.js.map