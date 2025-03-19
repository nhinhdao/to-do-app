import {Todo} from "../../atoms/Constants/Interfaces.ts";
import ToDoCard from "../../organisms/Card/ToDoCard.component.tsx";
import DraggableItem from "../../organisms/Draggable/DraggableItem.component.tsx";
import DroppableZone from "../../organisms/Droppable/DroppableZone.component.tsx";
import {formatStatus} from "../../utils/helpers.ts";

interface ToDoSectionProps {
    status: string;
    items: Todo[];
    handleEditTask: (task: Todo) => void;
    handleDeleteTask: (task: Todo) => void;
}

const ToDoSection = ({status, items, handleEditTask, handleDeleteTask}: ToDoSectionProps) => {
    return (
        <div className="todo-section">
            <p className="todo-section-header">{formatStatus(status)}: {items.length}</p>
            <DroppableZone type={status}>
                {items.map((item: Todo, index: number) => (
                    <DraggableItem key={item.id} item={item} index={index}>
                        <ToDoCard
                            key={item.id}
                            todo={item}
                            {...{handleEditTask, handleDeleteTask}}/>
                    </DraggableItem>
                ))}
            </DroppableZone>
        </div>
    );
};

export default ToDoSection;