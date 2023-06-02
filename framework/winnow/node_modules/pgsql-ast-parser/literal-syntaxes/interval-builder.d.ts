import { Interval } from '../syntax/ast';
declare type E = [keyof Interval, number];
declare type K = E | K[];
export declare function buildInterval(orig: string, vals: 'invalid' | K): Interval;
/** Returns a normalized copy of the given interval */
export declare function normalizeInterval(value: Interval): Interval;
/** Interval value to postgres string representation  */
export declare function intervalToString(value: Interval): String;
export {};
//# sourceMappingURL=interval-builder.d.ts.map