import {Action, Todo} from "../atoms/Constants/Interfaces.ts";
import {ActionTypes} from "../atoms/Constants/Actions.ts";
import {Dispatch, useContext} from "react";
import {TodoContext, TodoDispatch} from "../templates/TodoContext/ToDoContext.component.tsx";
import {getMaxIndexTaskByStatus, setTodosState} from "../utils/helpers.ts";

const toDoReducer = (state: Todo[], action: Action) => {
    switch (action.type) {
        case ActionTypes.ADD: {
            // set index of the item under its status
            const maxIndex = getMaxIndexTaskByStatus(state, action.payload.status).length;
            const todos = [...state, {
                ...action.payload,
                index: maxIndex,
            }];

            setTodosState(todos);
            return todos;
        }
        case ActionTypes.UPDATE: {
            const todos =  state.map((t: Todo) => {
                if (t.id === action.payload.id) {
                    return action.payload;
                }
                return t;
            });

            setTodosState(todos);
            return todos;
        }
        case ActionTypes.DELETE: {
            const todos =  state.filter((t: Todo) => t.id !== action.payload.id);

            setTodosState(todos);
            return todos;
        }
        default: {
            return state;
        }
    }
};

const useTodos = (): Todo[] => {
    return useContext(TodoContext);
};

const useTodoDispatch = (): Dispatch<Action> | null => {
    return useContext(TodoDispatch);
};

export { toDoReducer, useTodos, useTodoDispatch};