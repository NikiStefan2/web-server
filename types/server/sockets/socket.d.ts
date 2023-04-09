/// <reference types="node" />
import { IncomingMessage, ServerResponse } from 'http';
import { Event } from '../../events/event.js';
export interface SocketData {
    request: IncomingMessage;
    response: ServerResponse;
}
export declare class Socket {
    address: string;
    private _onFire;
    constructor(address: string);
    fire(request: IncomingMessage, response: ServerResponse): void;
    get onFire(): Event<SocketData>;
}
