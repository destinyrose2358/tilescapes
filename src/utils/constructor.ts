
export type Constructor = new (...args: any[]) => {};

export type GConstructor<T = {}, A = {}> = new (...args: any[]) => T;
