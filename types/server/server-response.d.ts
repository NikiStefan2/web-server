/// <reference types="node" />
/// <reference types="node" />
import * as http from 'http';
export declare class ServerResponse {
    private _response;
    constructor(response: http.ServerResponse);
    write(buffer: Buffer): void;
    writeHead(status: number, headers?: http.OutgoingHttpHeaders): void;
    end(buffer?: Buffer): void;
    writeFile(path: string, writeHead?: boolean): Promise<void>;
}
