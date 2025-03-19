import {Todo} from "../../atoms/Constants/Interfaces.ts";
import ToDoCard from "../../organisms/Card/ToDoCard.component.tsx";
import DraggableItem from "../../organisms/Draggable/DraggableItem.component.tsx";
import DroppableZone from "../../organisms/Droppable/DroppableZone.component.tsx";
import {formatStatus} from "../../utils/helpers.ts";
import {ActionTypes} from "../../atoms/Constants/Actions.ts";
import {notifications} from "@mantine/notifications";
import {useTodoDispatch} from "../../store/TodoReducer.ts";

interface ToDoSectionProps {
    status: string;
    items: Todo[];
    handleEditTask: (task: Todo) => void;
}

const ToDoSection = ({status, items, handleEditTask}: ToDoSectionProps) => {
    const dispatch = useTodoDispatch();

    const handleDeleteTask = (task: Todo) => {
        if (dispatch != null) {
            dispatch({
                type: ActionTypes.DELETE,
                payload: task
            });

            notifications.show({message: 'Successfully deleted task'});
        }
    };

    return (
        <div className="todo-section">
            <p className="todo-section-header">{formatStatus(status)}: {items.length}</p>
            <DroppableZone type={status}>
                {items.map((todo: Todo, index: number) => (
                    <DraggableItem key={todo.id} item={todo} index={index}>
                        <ToDoCard {...{todo, handleEditTask, handleDeleteTask}}/>
                    </DraggableItem>
                ))}
            </DroppableZone>
        </div>
    );
};

export default ToDoSection;