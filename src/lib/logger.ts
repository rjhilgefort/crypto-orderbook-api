// tslint:disable:no-console

export type Log = (x: string) => void;
export const log = (x: any) => console.log(x);

export declare function Warn(x: any): void;
export const warn = console.warn;
