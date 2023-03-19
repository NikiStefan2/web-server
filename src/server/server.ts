import * as http from 'http';
import { Router } from './router.js';
import { ServerResponse } from './server-response.js';

export class Server {
    private _httpServer: http.Server;
    public router: Router;

    public constructor(router: Router) {
        this._httpServer = new http.Server();
        this.router = router;

        this._httpServer.on('request', (request, response) =>
            router.emitEvents(
                request.method || 'GET',
                request,
                new ServerResponse(response)
            )
        );
    }

    public listen(port: number, hostName: string) {
        this._httpServer.listen(port, hostName);
    }
}
