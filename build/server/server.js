import * as http from 'http';
import { ServerResponse } from './server-response.js';
export class Server {
    _httpServer;
    router;
    _sockets = [];
    constructor(router) {
        this._httpServer = new http.Server();
        this.router = router;
        this._httpServer.on('request', (request, response) => {
            if (!request.url)
                return;
            if (this._sockets.length > 0)
                this.fireSockets(request, response);
            const serverResponse = new ServerResponse(response);
            const hasEvents = router.emitEvents(request.method || 'GET', request, serverResponse);
            if (!hasEvents)
                serverResponse.writeFile(request.url);
        });
    }
    listen(port, hostName) {
        this._httpServer.listen(port, hostName);
    }
    fireSockets(request, response) {
        const sockets = this._sockets.filter(socket => socket.address === request.url);
        const data = [];
        request.on('data', chunk => data.push(chunk));
        request.on('end', () => sockets.forEach(socket => socket.fire(request, response)));
    }
    createSocket(address) { }
}
