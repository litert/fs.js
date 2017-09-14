"use strict";
/* tslint:disable:no-console */
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("./index");
(async () => {
    try {
        await fs.file.delete("./debug/hello.dat");
    }
    catch (e) {
        console.error(e);
    }
})();
//# sourceMappingURL=test.js.map