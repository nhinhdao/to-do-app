import {createContext, Dispatch, useReducer} from "react";
import {TodoActions, ChildrenProps, StateProps} from "../../atoms/Constants/Interfaces.ts";
import {toDoReducer} from "../../store/TodoReducer.ts";
import {getTodosState} from "../../utils/helpers.ts";

const InitialState: StateProps = {
    todo: [],
    doing: [],
    done: []
};

const TodoContext = createContext<StateProps>(InitialState);
const TodoDispatch = createContext<Dispatch<TodoActions> | null>(null);

const TodoProvider = ({children}: ChildrenProps) => {
    const [todos, dispatch] = useReducer(toDoReducer, getTodosState());

    return (
        <TodoContext.Provider value={todos}>
            <TodoDispatch.Provider value={dispatch}>
                {children}
            </TodoDispatch.Provider>
        </TodoContext.Provider>
    );
};

export {TodoContext, TodoDispatch, TodoProvider};