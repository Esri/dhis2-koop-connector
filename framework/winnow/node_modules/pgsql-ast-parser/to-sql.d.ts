import { IAstPartialMapper } from './ast-mapper';
import { ReplaceReturnType } from './utils';
export declare type IAstToSql = {
    readonly [key in keyof IAstPartialMapper]-?: ReplaceReturnType<IAstPartialMapper[key], string>;
};
export declare const toSql: IAstToSql;
//# sourceMappingURL=to-sql.d.ts.map