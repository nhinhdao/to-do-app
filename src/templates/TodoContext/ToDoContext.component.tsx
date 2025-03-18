import {createContext, Dispatch, useMemo, useReducer} from "react";
import {Action, ChildrenProps, StateProps} from "../../atoms/Constants/Interfaces.ts";
import {toDoReducer} from "../../store/TodoReducer.ts";
import {getTodosState} from "../../utils/helpers.ts";

const InitialState: StateProps = {
    todo: [],
    doing: [],
    done: []
};

const TodoContext = createContext<StateProps>(InitialState);
const TodoDispatch = createContext<Dispatch<Action> | null>(null);

const TodoProvider = ({children}: ChildrenProps) => {
    const [todos, dispatch] = useReducer(toDoReducer, getTodosState());
    const todolist = useMemo(() => todos, [todos]);

    return (
        <TodoContext.Provider value={todolist}>
            <TodoDispatch.Provider value={dispatch}>
                {children}
            </TodoDispatch.Provider>
        </TodoContext.Provider>
    );
};

export {TodoContext, TodoDispatch, TodoProvider};