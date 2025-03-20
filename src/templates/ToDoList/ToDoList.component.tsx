import {useReward} from "react-rewards";
import {StateMap, Todo} from "../../atoms/Constants/Interfaces.ts";
import {STATUS} from "../../atoms/Constants/Status.ts";
import {SimpleGrid} from "@mantine/core";
import {ActionTypes} from "../../atoms/Constants/Actions.ts";
import NoTasks from "../../organisms/NoTask/NoTasks.component.tsx";
import {useTodoDispatch, useTodos} from "../../store/TodoReducer.ts";
import ToDoSection from "../../organisms/TodoSection/ToDoSection.component.tsx";
import {DragDropContext, DropResult} from "@hello-pangea/dnd";
import {isTaskDone, isTodosEmpty, reorderItems} from "../../utils/helpers.ts";
import {ConfettiConfig} from "../../atoms/Constants/ConfettiConfig.ts";
import "./ToDoList.styles.css";

const ToDoList = () => {
    const data: StateMap = useTodos();
    const dispatch = useTodoDispatch();
    const {reward: confettiReward} = useReward('confettiReward', 'emoji', ConfettiConfig);

    const onDragEnd = (result: DropResult) => {
        const {destination, source} = result;

        if (destination == null) {
            return;
        }

        // get new indexes and statuses
        const sourceIndex: number = source.index;
        const sourceStatus: string = source.droppableId.replace("dnd-list-", "");

        const destinationIndex: number = destination.index;
        const destinationStatus: string = destination.droppableId.replace("dnd-list-", "");

        // if nothing changes after dragging and dropping
        if (sourceStatus === destinationStatus && sourceIndex === destinationIndex) {
            return;
        }

        const tempState = new Map(data);
        const sourceCollection: Todo[] = tempState.get(sourceStatus) || [];

        if (sourceStatus === destinationStatus) {
            tempState.set(sourceStatus, reorderItems(sourceCollection, sourceIndex, destinationIndex));
        }
        // handle drop across status section
        else {
            const destinationCollection: Todo[] = tempState.get(destinationStatus) || [];

            // remove item from source list and set status
            const [sourceTodo]: Todo[] = sourceCollection.splice(sourceIndex, 1);
            sourceTodo.status = destinationStatus;

            // add item to the destination list
            destinationCollection.splice(destinationIndex, 0, sourceTodo);

            // set collections to new state
            tempState.set(sourceStatus, sourceCollection);
            tempState.set(destinationStatus, destinationCollection);
        }

        if (dispatch != null) {
            dispatch({
                type: ActionTypes.SET,
                payload: tempState
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
                <ToDoSection key={STATUS.Todo} status={STATUS.Todo} items={data.get(STATUS.Todo)}/>
                <ToDoSection key={STATUS.Doing} status={STATUS.Doing} items={data.get(STATUS.Doing)}/>
                <ToDoSection key={STATUS.Done} status={STATUS.Done} items={data.get(STATUS.Done)}/>
            </SimpleGrid>
        </DragDropContext>
    );
};

export default ToDoList;