import { generateRandomId } from '../math.js';
import { Listener, ListenerCallback } from './listener.js';

export class Event<T> {
    public listeners: Listener<T>[] = [];

    public addListener(callback: ListenerCallback<T>) {
        this.listeners.push({
            id: generateRandomId(),
            callback: callback
        });
    }

    public removeListener(index: number): Listener<T>;
    public removeListener(id: string): Listener<T>;
    public removeListener(data: number | string): Listener<T> {
        if (typeof data === 'number') return this.listeners.splice(data, 1)[0];

        const index = this.listeners.findIndex(
            listener => listener.id === data
        );

        return this.listeners.splice(index, 1)[0];
    }

    public fire(...data: T[]) {
        this.listeners.forEach(listener => listener.callback(...data));
    }
}
