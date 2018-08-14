import {Field} from "../state-machine/request";

export interface Request<T> {
    value: Field<Request<T>, T>;
}

export interface Props<T> {
    value: T;
}
