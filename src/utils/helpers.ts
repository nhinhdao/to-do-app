import {StateProps, Todo} from "../atoms/Constants/Interfaces.ts";
import {STATUS} from "../atoms/Constants/Status.ts";

const formatStatus = (status: string): string => {
    if (status === STATUS.Todo) {
        return "To do";
    }
    return status.charAt(0).toUpperCase() + status.slice(1);
}

const setTodosState = (todos: StateProps) => {
    localStorage.setItem("todos", JSON.stringify(todos));
};

const getTodosState = (): StateProps => {
    const todos = localStorage.getItem("todos");
    return todos ? JSON.parse(todos) : {};
};

const setTodosByStatus = (status: string, todos: Todo[]): void => {
    const state = getTodosState();
    const newState = {
        ...state,
        [status]: todos
    }
    setTodosState(newState);
};

const getTodosByStatus = (status: string): Todo[] => {
    const state = getTodosState();
    return state[status as keyof StateProps];
};

const reorderItems = (todos: Todo[], sourceIndex: number, destinationIndex: number): Todo[] => {
    const arr = [...todos];
    const temp = arr[sourceIndex];
    arr[sourceIndex] = arr[destinationIndex];
    arr[destinationIndex] = temp;
    return arr;
};

const isTodosEmpty = (todos: StateProps) => {
    return Object.values(todos).every(t => t == null || t.length === 0);
};

export {
    formatStatus,
    setTodosState,
    getTodosState,
    setTodosByStatus,
    getTodosByStatus,
    reorderItems,
    isTodosEmpty
};