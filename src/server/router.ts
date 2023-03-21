import { IncomingMessage } from 'http';
import { ServerResponse } from './server-response.js';

export interface RouterEvent {
    method: string;
    address: string | RegExp;
    callback: (request: IncomingMessage, response: ServerResponse) => void;
}

export class Router {
    private _events: RouterEvent[] = [];

    public onRequest(event: RouterEvent) {
        this._events.push(event);
    }

    public emitEvents(
        method: string,
        request: IncomingMessage,
        response: ServerResponse
    ): boolean {
        const events = this._events.filter(event => event.method === method);

        events.forEach(event => event.callback(request, response));

        return events.length > 0;
    }
}
