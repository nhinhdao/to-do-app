import {ReactNode} from "react";

export interface ChildrenProps {
    children: ReactNode;
}

export interface TodoForm {
    name: string,
    content: string,
    status : string
}

export interface Todo extends TodoForm {
    id: number;
    index: number;
}

export interface Action {
    type: string;
    payload: Todo;
}