import {Todo} from "../../atoms/Constants/Interfaces.ts";
import ToDoCard from "../../organisms/Card/ToDoCard.component.tsx";
import DraggableItem from "../../organisms/Draggable/DraggableItem.component.tsx";
import DroppableZone from "../../organisms/Droppable/DroppableZone.component.tsx";
import {formatStatus} from "../../utils/helpers.ts";

interface ToDoSectionProps {
    status: string;
    items: Todo[] | undefined;
}

const ToDoSection = ({status, items}: ToDoSectionProps) => {
    return (
        <div className="todo-section">
            <p className="todo-section-header">{formatStatus(status)}: {items?.length  || 0}</p>
            <DroppableZone type={status}>
                {items?.map((todo: Todo, index: number) => (
                    <DraggableItem key={todo.id} item={todo} index={index}>
                        <ToDoCard todo={todo}/>
                    </DraggableItem>
                ))}
            </DroppableZone>
        </div>
    );
};

export default ToDoSection;