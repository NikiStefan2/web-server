import * as fs from 'fs/promises';
export class ServerResponse {
    _response;
    constructor(response) {
        this._response = response;
    }
    write(buffer) {
        this._response.write(buffer);
    }
    writeHead(status, headers) {
        this._response.writeHead(status, headers);
    }
    end(buffer) {
        this._response.end(buffer);
    }
    async writeFile(path, writeHead = true) {
        let file;
        try {
            file = await fs.readFile(path);
        }
        catch (e) {
            this.writeHead(404);
            console.error(e);
        }
        if (!file)
            return;
        if (writeHead)
            this.writeHead(200);
        this.write(file);
    }
}
