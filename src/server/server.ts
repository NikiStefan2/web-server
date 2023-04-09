import * as http from 'http';
import { Router } from './router.js';
import { ServerResponse } from './server-response.js';
import { Socket } from './sockets/socket.js';

export class Server {
    private _httpServer: http.Server;
    public router: Router;

    private _sockets: Socket[] = [];

    public constructor(router: Router) {
        this._httpServer = new http.Server();
        this.router = router;

        this._httpServer.on('request', (request, response) => {
            if (!request.url) return;

            if (this._sockets.length > 0) this.fireSockets(request, response);

            const serverResponse = new ServerResponse(response);

            const hasEvents = router.emitEvents(
                request.method || 'GET',
                request,
                serverResponse
            );

            if (!hasEvents) serverResponse.writeFile(request.url);
        });
    }

    public listen(port: number, hostName: string) {
        this._httpServer.listen(port, hostName);
    }

    private fireSockets(
        request: http.IncomingMessage,
        response: http.ServerResponse
    ) {
        const sockets = this._sockets.filter(
            socket => socket.address === request.url
        );

        const data = [];

        request.on('data', chunk => data.push(chunk));

        request.on('end', () =>
            sockets.forEach(socket => socket.fire(request, response))
        );
    }

    public createSocket(address: string) {}
}
