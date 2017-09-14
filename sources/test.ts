/* tslint:disable:no-console */

import * as fs from "./index";

(async () => {

    try {

        await fs.file.delete("./debug/hello.dat");
    }
    catch (e) {

        console.error(e);
    }
})();
