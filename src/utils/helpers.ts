import {StateProps, Todo} from "../atoms/Constants/Interfaces.ts";
import {STATUS} from "../atoms/Constants/Status.ts";
import {InitialState} from "../atoms/Constants/InitialState.ts";

// format string to display in button and header
const formatStatus = (status: string): string => {
    if (status === STATUS.Todo) {
        return "To do";
    }
    return status.charAt(0).toUpperCase() + status.slice(1);
};

// save todos to localStorage
const setTodosState = (todos: StateProps): void => {
    localStorage.setItem("todos", JSON.stringify(todos));
};

// get todos from localStorage
const getTodosState = (): StateProps => {
    const todos = localStorage.getItem("todos");
    return todos ? JSON.parse(todos) : InitialState;
};

// get todos by status
const getTodosByStatus = (state: StateProps, status: string): Todo[] => {
    const todos = state[status as keyof StateProps] || [];
    return [...todos];
};

// return new array with items swapped between source and destination index
const reorderItems = (todos: Todo[], sourceIndex: number, destinationIndex: number): Todo[] => {
    const arr = [...todos];
    const temp = arr[sourceIndex];
    arr[sourceIndex] = arr[destinationIndex];
    arr[destinationIndex] = temp;
    return arr;
};

// check if to do state is empty
const isTodosEmpty = (todos: StateProps): boolean => {
    return Object.values(todos).every(t => t == null || t.length === 0);
};

// Check if a task is marked as done when it is previously not done
const isTaskDone = (oldStatus: string, newStatus: string): boolean => {
    return oldStatus !== newStatus && newStatus === STATUS.Done;
};

export {
    formatStatus,
    setTodosState,
    getTodosState,
    getTodosByStatus,
    reorderItems,
    isTodosEmpty,
    isTaskDone
};