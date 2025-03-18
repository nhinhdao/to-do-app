import {Droppable} from "@hello-pangea/dnd";
import {ReactNode} from "react";

interface DroppableProps {
    type: string;
    children: ReactNode;
}

const DroppableZone = ({type, children} : DroppableProps) => {
    return (
        <Droppable
            droppableId={`dnd-list-${type}`}
            direction="vertical">
            {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                    {children}
                    {provided.placeholder}
                </div>
            )}
        </Droppable>
    );
};

export default DroppableZone;