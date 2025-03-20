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

type TodoObj = {[status: string]: Todo[]};

type StateMap = Map<string, Todo[]>;

type TodoActions =
    | { type: ActionTypes.ADD; payload: Todo }
    | { type: ActionTypes.UPDATE; payload: Todo }
    | { type: ActionTypes.DELETE; payload: Todo }
    | { type: ActionTypes.SET; payload: StateMap };

export type {
    ChildrenProps,
    TodoForm,
    Todo,
    TodoObj,
    StateMap,
    TodoActions
}