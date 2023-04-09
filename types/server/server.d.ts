import { Router } from './router.js';
export declare class Server {
    private _httpServer;
    router: Router;
    private _sockets;
    constructor(router: Router);
    listen(port: number, hostName: string): void;
    private fireSockets;
    createSocket(address: string): void;
}
