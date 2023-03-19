/// <reference types="node" />
import { IncomingMessage } from 'http';
import { ServerResponse } from './server-response.js';
export interface RouterEvent {
    method: string;
    address: string | RegExp;
    callback: (request: IncomingMessage, response: ServerResponse) => void;
}
export declare class Router {
    private _events;
    onRequest(event: RouterEvent): void;
    emitEvents(method: string, request: IncomingMessage, response: ServerResponse): void;
}
