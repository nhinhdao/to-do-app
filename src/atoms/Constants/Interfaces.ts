import {ReactNode} from "react";

interface ChildrenProps {
    children: ReactNode;
}

interface TodoForm {
    name: string,
    content: string,
    status : string
}

interface Todo extends TodoForm {
    id: number;
}

interface Action {
    type: string;
    payload: Todo;
}

interface StateProps {
    todo: Todo[];
    doing: Todo[];
    done: Todo[]
}

export type {
    ChildrenProps,
    TodoForm,
    Todo,
    Action,
    StateProps
}