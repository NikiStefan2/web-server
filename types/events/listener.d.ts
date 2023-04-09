export declare type ListenerCallback<T> = (...data: T[]) => void;
export interface Listener<T> {
    id: string;
    callback: ListenerCallback<T>;
}
