import * as http from 'http';
import { Router } from './router.js';

export class Server {
    private _httpServer: http.Server;
    public router: Router;

    public constructor(router: Router) {
        this._httpServer = new http.Server();
        this.router = router;
    }
}
