import {ReactNode} from "react";
import {ActionTypes} from "./Actions.ts";

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

interface ReducerAction {
    type: string;
    payload: Todo;
}

interface StateProps {
    todo: Todo[];
    doing: Todo[];
    done: Todo[]
}

type TodoActions =
    | { type: ActionTypes.ADD; payload: Todo }
    | { type: ActionTypes.UPDATE; payload: Todo }
    | { type: ActionTypes.DELETE; payload: Todo }
    | { type: ActionTypes.SET; payload: StateProps };

export type {
    ChildrenProps,
    TodoForm,
    Todo,
    ReducerAction,
    StateProps,
    TodoActions
}