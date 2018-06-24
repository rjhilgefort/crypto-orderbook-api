// tslint:disable:no-console

export type Log = (x: string) => void;
export const log: Log = console.log;

export type Warn = (x: any) => void;
export const warn: Warn = console.warn;

export type Error = (x: string) => void;
export const error: Error = console.error;
