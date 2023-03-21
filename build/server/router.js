export class Router {
    _events = [];
    onRequest(event) {
        this._events.push(event);
    }
    emitEvents(method, request, response) {
        const events = this._events.filter(event => event.method === method);
        events.forEach(event => event.callback(request, response));
        return events.length > 0;
    }
}
