import {Field} from "../request";

export interface Request<T> {
    value: Field<Request<T>, T>;
}

export interface Props<T> {
    value: T;
}
