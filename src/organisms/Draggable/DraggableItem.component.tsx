import {Todo} from "../../atoms/Constants/Interfaces.ts";
import {ReactNode} from "react";
import classes from './DraggableItem.module.css';
import {Draggable} from "@hello-pangea/dnd";
import {IconGripVertical} from "@tabler/icons-react";
import cx from 'clsx';

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
                    className={cx(classes.item, { [classes.itemDragging]: snapshot.isDragging })}
                    ref={provided.innerRef}
                    {...provided.draggableProps}>
                    <div className={classes.toDoItem}>
                        {children}
                    </div>
                    <div {...provided.dragHandleProps} className={classes.dragHandle}>
                        <IconGripVertical size={20}/>
                    </div>
                </div>
            )}
        </Draggable>
    );
}

export default DraggableItem;