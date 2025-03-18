import {Todo} from "../atoms/Constants/Interfaces.ts";

const setTodosState = (todos: Todo[]) => {
    localStorage.setItem("todos", JSON.stringify(todos));
};

const getTodosState = (): Todo[] => {
    const todos= localStorage.getItem("todos");
    return todos ? JSON.parse(todos) : [];
};

const getMaxIndexTaskByStatus = (todos: Todo[], status: string): Todo[] => {
    return todos.filter(t => t.status === status);
}


const reorderItems = (todos: Todo[], sourceIndex: number, destinationIndex: number): Todo[] => {
    const arr = [...todos];
    const temp = arr[sourceIndex];
    arr[sourceIndex] = arr[destinationIndex];
    arr[destinationIndex] = temp;
    return arr;
}

export {
    getTodosState,
    setTodosState,
    getMaxIndexTaskByStatus,
    reorderItems
};