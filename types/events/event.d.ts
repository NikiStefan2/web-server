import { Listener, ListenerCallback } from './listener.js';
export declare class Event<T> {
    listeners: Listener<T>[];
    addListener(callback: ListenerCallback<T>): void;
    removeListener(index: number): Listener<T>;
    removeListener(id: string): Listener<T>;
    fire(...data: T[]): void;
}
