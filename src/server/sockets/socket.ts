import { IncomingMessage, ServerResponse } from 'http';
import { Event } from '../../events/event.js';

export interface SocketData {
    request: IncomingMessage;
    response: ServerResponse;
}

export class Socket {
    public address: string;

    private _onFire: Event<SocketData>;

    public constructor(address: string) {
        this.address = address;

        this._onFire = new Event();
    }

    public fire(request: IncomingMessage, response: ServerResponse) {
        this._onFire.fire({
            request,
            response
        });
    }

    public get onFire(): Event<SocketData> {
        return this._onFire;
    }
}
