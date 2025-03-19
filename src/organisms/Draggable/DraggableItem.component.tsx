import {Todo} from "../../atoms/Constants/Interfaces.ts";
import {ReactNode} from "react";
import {Draggable} from "@hello-pangea/dnd";
import {IconGripVertical} from "@tabler/icons-react";
import "./DraggableItem.styles.css"

interface DraggableProps {
    item: Todo;
    index: number;
    children: ReactNode;
}

const DraggableItem = ({item, index, children}: DraggableProps) => {
    return (
        <Draggable index={index} draggableId={item.id.toString()}>
            {(provided, snapshot) => (
                <div
                    className={`draggable-item ${snapshot.isDragging ? "item-is-dragging" : ""}`}
                    ref={provided.innerRef}
                    {...provided.draggableProps}>
                    <div className="draggable-item-content">
                        {children}
                    </div>
                    <div {...provided.dragHandleProps} className="draggable-item-handle">
                        <IconGripVertical size={20}/>
                    </div>
                </div>
            )}
        </Draggable>
    );
};

export default DraggableItem;