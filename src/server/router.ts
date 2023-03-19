import { IncomingMessage, ServerResponse } from "http";

export interface RouterGetEvent {
    address: string;
    callback: (request: IncomingMessage, response: ServerResponse);
}

export class Router {}
