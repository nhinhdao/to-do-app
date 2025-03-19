import {StateProps, Todo} from "../../atoms/Constants/Interfaces.ts";
import {memo} from "react";
import {STATUS} from "../../atoms/Constants/Status.ts";
import {Group, SimpleGrid} from "@mantine/core";
import {ActionTypes} from "../../atoms/Constants/Actions.ts";
import NoTasks from "../../organisms/NoTask/NoTasks.component.tsx";
import {useTodoDispatch, useTodos} from "../../store/TodoReducer.ts";
import ToDoSection from "../../organisms/TodoSection/ToDoSection.component.tsx";
import {DragDropContext, DropResult} from "@hello-pangea/dnd";
import {handleDragAndDrop, isTodosEmpty} from "../../utils/helpers.ts";
import "./ToDoList.styles.css";
import {useReward} from "react-rewards";

interface ToDoListProps {
    handleEditTask: (task: Todo) => void;
}

const ToDoList = ({handleEditTask}: ToDoListProps) => {
    const data: StateProps = useTodos();
    const dispatch = useTodoDispatch();
    const {reward: confettiReward} = useReward('confettiReward', 'emoji', {
        lifetime: 250,
        spread: 100,
        elementCount: 42,
        elementSize: 40,
        zIndex: 1000,
        emoji: ['👍', '💐', '🥳']
    });

    const DragAndDropSection = memo((({status, items}: { status: string, items: Todo[] }) => {
        return (
            <ToDoSection key={status} {...{status, items, handleEditTask}}/>
        );
    }));

    const onDragEnd = (result: DropResult) => {
        const {destination, source} = result;

        if (destination == null || (source.droppableId === destination.droppableId && source.index === destination.index)) {
            return;
        }

        const newState = handleDragAndDrop(result);

        if (dispatch != null && newState != null) {
            dispatch({
                type: ActionTypes.SET,
                payload: newState
            });

            const sourceStatus: string = source.droppableId.replace("dnd-list-", "");
            const destinationStatus = destination.droppableId.replace("dnd-list-", "");
            if (sourceStatus !== destinationStatus && destinationStatus === STATUS.Done) {
                confettiReward();
            }
        }
    };

    if (isTodosEmpty(data)) {
        return <NoTasks/>;
    }

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Group justify="center">
                <span id="confettiReward"/>
            </Group>
            <SimpleGrid cols={3} spacing="lg" mt={50} className="todo-list">
                <DragAndDropSection status={STATUS.Todo} items={data.todo}/>
                <DragAndDropSection status={STATUS.Doing} items={data.doing}/>
                <DragAndDropSection status={STATUS.Done} items={data.done}/>
            </SimpleGrid>
        </DragDropContext>
    );
};

export default ToDoList;