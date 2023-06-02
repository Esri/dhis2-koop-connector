import { Statement, Expr, QName, Point, Line, Segment, Box, Path, Polygon, Circle, Interval, PGComment } from './syntax/ast';
/** Parse the first SQL statement in the given text (discards the rest), and return its AST */
export declare function parseFirst(sql: string): Statement;
export interface ParseOptions {
    /**
     *  [Advanced usage only] This allows to parse sub-expressions, not necessarily full valid statements.
     *
     *  For instance, `parse('2+2', {entry: 'expr'})`  will return the AST of the given expression (which is not a valid statement)
     */
    entry?: string;
    /** If true, then a detailed location will be available on each node */
    locationTracking?: boolean;
}
/** Parse an AST from SQL, and get the comments */
export declare function parseWithComments(sql: string, options?: ParseOptions): {
    ast: Statement[];
    comments: PGComment[];
};
/** Parse an AST from SQL */
export declare function parse(sql: string): Statement[];
export declare function parse(sql: string, entry: 'expr'): Expr;
export declare function parse(sql: string, entry: 'qualified_name'): QName;
export declare function parse(sql: string, options?: ParseOptions): Statement[];
export declare function parseArrayLiteral(sql: string): string[];
export declare function parseIntervalLiteral(literal: string): Interval;
export declare function parseGeometricLiteral(sql: string, type: 'point'): Point;
export declare function parseGeometricLiteral(sql: string, type: 'line'): Line;
export declare function parseGeometricLiteral(sql: string, type: 'lseg'): Segment;
export declare function parseGeometricLiteral(sql: string, type: 'box'): Box;
export declare function parseGeometricLiteral(sql: string, type: 'path'): Path;
export declare function parseGeometricLiteral(sql: string, type: 'polygon'): Polygon;
export declare function parseGeometricLiteral(sql: string, type: 'circle'): Circle;
//# sourceMappingURL=parser.d.ts.map