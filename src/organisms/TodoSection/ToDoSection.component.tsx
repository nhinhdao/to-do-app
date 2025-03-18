import {Todo} from "../../atoms/Constants/Interfaces.ts";
import ToDoCard from "../../organisms/Card/ToDoCard.component.tsx";
import {DragDropContext, DropResult} from "@hello-pangea/dnd";
import {useListState} from "@mantine/hooks";
import DraggableItem from "../../organisms/Draggable/DraggableItem.component.tsx";
import DroppableZone from "../../organisms/Droppable/DroppableZone.component.tsx";
import {reorderItems, setTodosState} from "../../utils/helpers.ts";

interface ToDoSectionProps {
    type: string;
    items: Todo[];
    handleEditTask: (task: Todo) => void;
    handleDeleteTask: (task: Todo) => void;
}

const ToDoSection = ({type, items, handleEditTask, handleDeleteTask}: ToDoSectionProps) => {
    const [data, handlers] = useListState(items);

    const onDragEnd = ({destination, source}: DropResult) => {
        const sourceIndex = source.index || 0;
        const destinationIndex = destination?.index || 0;

        const orderedTodos = reorderItems(items, sourceIndex, destinationIndex);
        console.log(items);
        console.log(orderedTodos)
        // setTodosState(orderedTodos);
        return handlers.reorder({from: source.index, to: destination?.index || 0});
    };

    return (
        <div className="todo-section">
            <DragDropContext onDragEnd={onDragEnd}>
                <DroppableZone type={type}>
                    <p className="todo-section-header">{type.replace(/-/g, " ")}: {items.length}</p>
                    {data.map((item: Todo, index: number) => (
                        <DraggableItem key={item.id} item={item} index={index}>
                            <ToDoCard
                                todo={item}
                                {...{handleEditTask, handleDeleteTask}}/>
                        </DraggableItem>
                    ))}
                </DroppableZone>
            </DragDropContext>
        </div>
    );
}

export default ToDoSection;