import {createContext, Dispatch, useMemo, useReducer} from "react";
import {Action, ChildrenProps, Todo} from "../../atoms/Constants/Interfaces.ts";
import {toDoReducer} from "../../store/TodoReducer.ts";
import {getTodosState} from "../../utils/helpers.ts";

const TodoContext = createContext<Todo[]>([]);
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