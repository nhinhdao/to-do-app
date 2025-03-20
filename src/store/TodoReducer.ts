import {StateMap, Todo, TodoActions} from "../atoms/Constants/Interfaces.ts";
import {ActionTypes} from "../atoms/Constants/Actions.ts";
import {Dispatch, useContext} from "react";
import {TodoContext, TodoDispatch} from "../templates/TodoContext/ToDoContext.component.tsx";
import {setTodosState} from "../utils/helpers.ts";

const toDoReducer = (state: StateMap, action: TodoActions) => {
    switch (action.type) {
        case ActionTypes.ADD: {
            const {status} = action.payload;
            const todos = new Map(state);
            todos.get(status)?.push(action.payload);

            setTodosState(todos);
            return todos;
        }
        case ActionTypes.UPDATE: {
            const {status} = action.payload;
            const todos = new Map(state);
            const todosByStatus = todos.get(status) || [];
            todos.set(status, todosByStatus.map((t: Todo) => {
                if (t.id === action.payload.id) {
                    return action.payload;
                }
                return t;
            }));

            setTodosState(todos);
            return todos;
        }
        case ActionTypes.DELETE: {
            const {status} = action.payload;
            const todos = new Map(state);
            const todosByStatus = todos.get(status) || [];
            todos.set(status, todosByStatus.filter((t: Todo) => t.id !== action.payload.id));

            setTodosState(todos);
            return todos;
        }
        case ActionTypes.SET: {
            setTodosState(action.payload);
            return action.payload;
        }
        default: {
            return state;
        }
    }
};

const useTodos = (): StateMap => {
    return useContext(TodoContext);
};

const useTodoDispatch = (): Dispatch<TodoActions> | null => {
    return useContext(TodoDispatch);
};

export { toDoReducer, useTodos, useTodoDispatch};