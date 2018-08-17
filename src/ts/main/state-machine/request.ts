export interface Path<T> {
    $path: string,
};
export function isPath(p: any): boolean {
    return null != p && typeof p == 'object' && '$path' in p;
}

export function path<T>(p: string): Path<T> {
    return {
        $path: p
    };
};

export interface Request {
    $id: string | Path<string>;
    [key: string]: any;
}

export interface RequestArray {
    $id: string[] | Path<string[]>;
}

export interface Function<P, T> {
    $function: string,
    $prop: Single<P>,
};


export type Field<R, T> = T | Path<T> | Function<R, T>;

export type Single<T> = T | T & Request;
export type Plural<T> = T[] | (T & Request)[] | T & RequestArray;
