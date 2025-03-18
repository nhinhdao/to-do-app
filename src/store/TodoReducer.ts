import {Action, StateProps, Todo} from "../atoms/Constants/Interfaces.ts";
import {ActionTypes} from "../atoms/Constants/Actions.ts";
import {Dispatch, useContext} from "react";
import {TodoContext, TodoDispatch} from "../templates/TodoContext/ToDoContext.component.tsx";
import {getTodosByStatus, setTodosState} from "../utils/helpers.ts";

const toDoReducer = (state: StateProps, action: Action) => {
    switch (action.type) {
        case ActionTypes.ADD: {
            const {status} = action.payload;
            const todosByStatus = getTodosByStatus(status);
            const todos = {
                ...state,
                [status]: [...todosByStatus, action.payload]
            };

            setTodosState(todos);
            return todos;
        }
        case ActionTypes.UPDATE: {
            const {status} = action.payload;
            const todosByStatus = getTodosByStatus(status);
            const todos = {
                ...state,
                [status]: todosByStatus.map((t: Todo) => {
                    if (t.id === action.payload.id) {
                        return action.payload;
                    }
                    return t;
                })
            };

            setTodosState(todos);
            return todos;
        }
        case ActionTypes.DELETE: {
            const {status} = action.payload;
            const todosByStatus = getTodosByStatus(status);
            const todos = {
                ...state,
                [status]: todosByStatus.filter((t: Todo) => t.id !== action.payload.id)
            };

            setTodosState(todos);
            return todos;
        }
        default: {
            return state;
        }
    }
};

const useTodos = (): StateProps => {
    return useContext(TodoContext);
};

const useTodoDispatch = (): Dispatch<Action> | null => {
    return useContext(TodoDispatch);
};

export { toDoReducer, useTodos, useTodoDispatch};