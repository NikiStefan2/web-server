import * as http from 'http';
import { ServerResponse } from './server-response.js';
export class Server {
    _httpServer;
    router;
    constructor(router) {
        this._httpServer = new http.Server();
        this.router = router;
        this._httpServer.on('request', (request, response) => {
            if (!request.url)
                return;
            const serverResponse = new ServerResponse(response);
            const hasEvents = router.emitEvents(request.method || 'GET', request, serverResponse);
            if (!hasEvents)
                serverResponse.writeFile(request.url);
        });
    }
    listen(port, hostName) {
        this._httpServer.listen(port, hostName);
    }
}
