import {useReward} from "react-rewards";
import {StateProps} from "../../atoms/Constants/Interfaces.ts";
import {STATUS} from "../../atoms/Constants/Status.ts";
import {SimpleGrid} from "@mantine/core";
import {ActionTypes} from "../../atoms/Constants/Actions.ts";
import NoTasks from "../../organisms/NoTask/NoTasks.component.tsx";
import {useTodoDispatch, useTodos} from "../../store/TodoReducer.ts";
import ToDoSection from "../../organisms/TodoSection/ToDoSection.component.tsx";
import {DragDropContext, DropResult} from "@hello-pangea/dnd";
import {handleDragAndDrop, isTaskDone, isTodosEmpty} from "../../utils/helpers.ts";
import {ConfettiConfig} from "../../atoms/Constants/ConfettiConfig.ts";
import "./ToDoList.styles.css";

const ToDoList = () => {
    const data: StateProps = useTodos();
    const dispatch = useTodoDispatch();
    const {reward: confettiReward} = useReward('confettiReward', 'emoji', ConfettiConfig);

    const onDragEnd = (result: DropResult) => {
        const {destination, source} = result;

        if (destination == null) {
            return;
        }

        const sourceIndex: number = source.index;
        const sourceStatus: string = source.droppableId.replace("dnd-list-", "");

        const destinationIndex = destination.index;
        const destinationStatus = destination.droppableId.replace("dnd-list-", "");

        // if nothing changes after dragging and dropping
        if (source.droppableId === destination.droppableId && sourceIndex === destinationIndex) {
            return;
        }

        const newState = handleDragAndDrop(sourceIndex, sourceStatus, destinationIndex, destinationStatus);

        if (dispatch != null && newState != null) {
            dispatch({
                type: ActionTypes.SET,
                payload: newState
            });

            if (isTaskDone(sourceStatus, destinationStatus)) {
                confettiReward();
            }
        }
    };

    if (isTodosEmpty(data)) {
        return <NoTasks/>;
    }

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <SimpleGrid
                className="todo-list"
                cols={{ base: 1, sm: 1, lg: 3 }}
                spacing={{ base: 10, sm: 'xl' }}
                verticalSpacing={{ base: 'md', sm: 'xl' }}>
                <ToDoSection key={STATUS.Todo} status={STATUS.Todo} items={data.todo}/>
                <ToDoSection key={STATUS.Doing} status={STATUS.Doing} items={data.doing}/>
                <ToDoSection key={STATUS.Done} status={STATUS.Done} items={data.done}/>
            </SimpleGrid>
        </DragDropContext>
    );
};

export default ToDoList;