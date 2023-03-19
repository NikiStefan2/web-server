import { Router } from './router.js';
export declare class Server {
    private _httpServer;
    router: Router;
    constructor(router: Router);
    listen(port: number, hostName: string): void;
}
