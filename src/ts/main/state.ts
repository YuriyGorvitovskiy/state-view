import {Path} from "./path";

export interface State {
    $id: string;
    [key: string]: any;
}

export interface Request {
    $id: Path | string | string[];
    [key: string]: Path | Request | any;
}
