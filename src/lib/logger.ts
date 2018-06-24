// tslint:disable:no-console

export type Log = (x: string) => void;
export const log = console.log;

export type Warn = (x: any) => void;
export const warn = console.warn;
