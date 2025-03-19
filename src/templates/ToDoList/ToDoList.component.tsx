import {StateProps, Todo} from "../../atoms/Constants/Interfaces.ts";
import {memo} from "react";
import {STATUS} from "../../atoms/Constants/Status.ts";
import {SimpleGrid} from "@mantine/core";
import {ActionTypes} from "../../atoms/Constants/Actions.ts";
import {notifications} from '@mantine/notifications';
import NoTasks from "../../organisms/NoTask/NoTasks.component.tsx";
import {useTodoDispatch, useTodos} from "../../store/TodoReducer.ts";
import ToDoSection from "../../organisms/TodoSection/ToDoSection.component.tsx";
import "./ToDoList.styles.css"
import {
    getTodosByStatus,
    getTodosState,
    isTodosEmpty,
    reorderItems,
    setTodosByStatus,
    setTodosState
} from "../../utils/helpers.ts";
import {DragDropContext, DropResult} from "@hello-pangea/dnd";

interface ToDoListProps {
    handleEditTask: (task: Todo) => void;
}

const ToDoList = ({handleEditTask}: ToDoListProps) => {
    const data: StateProps = useTodos();
    const dispatch = useTodoDispatch();

    const DragAndDropSection = memo((({status, items} : {status: string, items: Todo[]}) => {
        return (
            <ToDoSection {...{status, items, handleEditTask, handleDeleteTask}}/>
        );
    }));

    const handleDeleteTask = (task: Todo) => {
        if (dispatch != null) {
            dispatch({
                type: ActionTypes.DELETE,
                payload: task
            });

            notifications.show({message: 'Successfully deleted task'});
        }
    };

    const onDragEnd = (result: DropResult) => {
        const {destination, source} = result;
        console.log(result)

        if (destination == null) {
            return
        }

        if (source.droppableId === destination.droppableId && source.index === destination.index){
            return;
        }

        const state = getTodosState();
        const tempState = {
            todo: [...state.todo],
            doing: [...state.doing],
            done: [...state.done]
        }
        const sourceIndex = source.index;
        const destinationIndex = destination.index;
        const sourceStatus = source.droppableId.replace("dnd-list-", "");
        const destinationStatus = destination.droppableId.replace("dnd-list-", "");


        // handle drop within the same status section
        if (sourceStatus === destinationStatus) {
            console.log("SORT WITHIN SAME STATUS");
            const items = getTodosByStatus(sourceStatus);
            const orderedTodos = reorderItems(items, sourceIndex, destinationIndex);
            console.log("old ", items);
            console.log("new ", orderedTodos);
            setTodosByStatus(sourceStatus, orderedTodos);
            tempState[sourceStatus as keyof StateProps] = orderedTodos;
        }
        else {
            console.log("SORT BETWEEN STATUSES");
            console.log("old state ", state);
            console.log("new state ", tempState);
            const toDosBySourceStatus = getTodosByStatus(sourceStatus);
            const toDosByDestinationStatus = getTodosByStatus(destinationStatus);
            const sourceTodo = toDosBySourceStatus[sourceIndex];
            sourceTodo.status = destinationStatus;
            toDosBySourceStatus.splice(sourceIndex, 1);
            toDosByDestinationStatus.splice(destinationIndex, 0, sourceTodo);
            tempState[sourceStatus as keyof StateProps] = toDosBySourceStatus;
            tempState[destinationStatus as keyof StateProps] = toDosByDestinationStatus
            const newState = {
                ...state,
                [sourceStatus]: toDosBySourceStatus,
                [destinationStatus]: toDosByDestinationStatus
            }
            console.log("status ", sourceStatus, destinationStatus);
            console.log("todos ", toDosBySourceStatus);
            console.log("done ", toDosByDestinationStatus);
            console.log("source todo ", sourceTodo);
            console.log("old state ", state);
            console.log("new state ", newState);
            setTodosState(newState);
        }

        console.log(tempState);;

        if (dispatch != null) {
            dispatch({
                type: ActionTypes.SET,
                payload: tempState
            })
        }
    };

    if (isTodosEmpty(data)){
        return <NoTasks/>;
    }

    return (
        <SimpleGrid cols={3} spacing="lg" mt={50} className="todo-list">
            <DragDropContext onDragEnd={onDragEnd}>
                <DragAndDropSection status={STATUS.Todo} items={data.todo}/>
                <DragAndDropSection status={STATUS.Doing} items={data.doing}/>
                <DragAndDropSection status={STATUS.Done} items={data.done}/>
            </DragDropContext>
        </SimpleGrid>
    );
};

export default ToDoList;