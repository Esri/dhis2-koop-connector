export declare type Optional<T> = {
    [key in keyof T]?: T[key];
};
export declare type nil = undefined | null;
declare type Impossible<K extends keyof any> = {
    [P in K]: never;
};
export declare type NoExtraProperties<T, U extends T = T> = U & Impossible<Exclude<keyof U, keyof T>>;
export declare type ReplaceReturnType<T, TNewReturn> = T extends (...a: any) => any ? (...a: Parameters<T>) => TNewReturn : never;
export declare class NotSupported extends Error {
    constructor(what?: string);
    static never(value: never, msg?: string): NotSupported;
}
export declare function trimNullish<T>(value: T, depth?: number): T;
export {};
//# sourceMappingURL=utils.d.ts.map