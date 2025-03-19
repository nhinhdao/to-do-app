import {StateProps, Todo} from "../atoms/Constants/Interfaces.ts";
import {STATUS} from "../atoms/Constants/Status.ts";
import {DropResult} from "@hello-pangea/dnd";

const formatStatus = (status: string): string => {
    if (status === STATUS.Todo) {
        return "To do";
    }
    return status.charAt(0).toUpperCase() + status.slice(1);
}

const setTodosState = (todos: StateProps): void => {
    localStorage.setItem("todos", JSON.stringify(todos));
};

const getTodosState = (): StateProps => {
    const todos = localStorage.getItem("todos");
    return todos ? JSON.parse(todos) : {};
};

const getTodosByStatus = (status: string): Todo[] => {
    const state = getTodosState();
    const todos = state[status as keyof StateProps] || [];
    return [...todos];
};

const reorderItems = (todos: Todo[], sourceIndex: number, destinationIndex: number): Todo[] => {
    const arr = [...todos];
    const temp = arr[sourceIndex];
    arr[sourceIndex] = arr[destinationIndex];
    arr[destinationIndex] = temp;
    return arr;
};

const isTodosEmpty = (todos: StateProps): boolean => {
    return Object.values(todos).every(t => t == null || t.length === 0);
};

const handleDragAndDrop = ({destination, source}: DropResult): StateProps | null => {
    if ( destination == null){
        return null;
    }

    const state = getTodosState();
    const tempState = {
        todo: [...state.todo],
        doing: [...state.doing],
        done: [...state.done]
    };

    const sourceIndex: number = source.index;
    const sourceStatus: string = source.droppableId.replace("dnd-list-", "");
    const sourceCollection: Todo[] = tempState[sourceStatus as keyof StateProps];

    const destinationIndex = destination.index;
    const destinationStatus = destination.droppableId.replace("dnd-list-", "");

    // handle drop within the same status section
    if (sourceStatus === destinationStatus) {
        tempState[sourceStatus as keyof StateProps] = reorderItems(sourceCollection, sourceIndex, destinationIndex);
    }
    // handle drop across status section
    else {
        const destinationCollection: Todo[] = tempState[destinationStatus as keyof StateProps];

        // remove item from source list and set status
        const [sourceTodo]: Todo[] = sourceCollection.splice(sourceIndex, 1);
        sourceTodo.status = destinationStatus;

        // add item to the destination list
        destinationCollection.splice(destinationIndex, 0, sourceTodo);

        // set collections to new state
        tempState[sourceStatus as keyof StateProps] = sourceCollection;
        tempState[destinationStatus as keyof StateProps] = destinationCollection;
    }

    return tempState;
}

export {
    formatStatus,
    setTodosState,
    getTodosState,
    getTodosByStatus,
    reorderItems,
    isTodosEmpty,
    handleDragAndDrop
};