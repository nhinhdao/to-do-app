import {StateMap, Todo, TodoObj} from "../atoms/Constants/Interfaces.ts";
import {STATUS} from "../atoms/Constants/Status.ts";
import {DefaultState} from "../atoms/Constants/InitialState.ts";

// format string to display in button and header
const formatStatus = (status: string): string => {
    if (status === STATUS.Todo) {
        return "To do";
    }
    return status.charAt(0).toUpperCase() + status.slice(1);
};

// save todos to localStorage
const setTodosState = (todos: StateMap): void => {
    const entries: TodoObj = Object.fromEntries(todos)
    localStorage.setItem("todos", JSON.stringify(entries));
};

// get todos from localStorage
const getTodosState = (): StateMap => {
    const todos = localStorage.getItem("todos");
    if (!todos) return new Map(DefaultState);
    const entries = JSON.parse(todos)
    return new Map(Object.entries(entries));
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
const isTodosEmpty = (todos: StateMap): boolean => {
    const entries: TodoObj = Object.fromEntries(todos);
    return Object.values(entries).every(t => t == null || t.length === 0);
};

// Check if a task is marked as done when it is previously not done
const isTaskDone = (oldStatus: string, newStatus: string): boolean => {
    return oldStatus !== newStatus && newStatus === STATUS.Done;
};

export {
    formatStatus,
    setTodosState,
    getTodosState,
    reorderItems,
    isTodosEmpty,
    isTaskDone
};