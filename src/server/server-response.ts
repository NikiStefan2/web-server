import * as http from 'http';
import * as fs from 'fs/promises';

export class ServerResponse {
    private _response: http.ServerResponse;

    public constructor(response: http.ServerResponse) {
        this._response = response;
    }

    public write(buffer: Buffer) {
        this._response.write(buffer);
    }

    public writeHead(status: number, headers?: http.OutgoingHttpHeaders) {
        this._response.writeHead(status, headers);
    }

    public end(buffer?: Buffer) {
        this._response.end(buffer);
    }

    public async writeFile(path: string, writeHead: boolean = true) {
        let file;

        try {
            file = await fs.readFile(path);
        } catch (e) {
            this.writeHead(404);
            console.error(e);
        }

        if (!file) return;

        if (writeHead) this.writeHead(200);

        this.write(file);
    }
}
