import {StateProps, Todo} from "../../atoms/Constants/Interfaces.ts";
import {memo} from "react";
import {STATUS} from "../../atoms/Constants/Status.ts";
import {SimpleGrid} from "@mantine/core";
import {ActionTypes} from "../../atoms/Constants/Actions.ts";
import { notifications } from '@mantine/notifications';
import NoTasks from "../../organisms/NoTask/NoTasks.component.tsx";
import {useTodoDispatch, useTodos} from "../../store/TodoReducer.ts";
import ToDoSection from "../../organisms/TodoSection/ToDoSection.component.tsx";
import "./ToDoList.styles.css"
import {isTodosEmpty} from "../../utils/helpers.ts";

interface ToDoListProps {
    handleEditTask: (task: Todo) => void;
}

const ToDoList = ({handleEditTask}: ToDoListProps) => {
    const data: StateProps = useTodos();
    const dispatch = useTodoDispatch();

    const DragAndDropSection = memo((({status, items} : {status: string, items: Todo[]}) => {
        return (
            <ToDoSection {...{status, items, handleEditTask, handleDeleteTask}}/>
        );
    }));

    const handleDeleteTask = (task: Todo) => {
        if (dispatch != null) {
            dispatch({
                type: ActionTypes.DELETE,
                payload: task
            });

            notifications.show({message: 'Successfully deleted task'});
        }
    };

    if (isTodosEmpty(data)){
        return <NoTasks/>;
    }

    return (
        <SimpleGrid cols={3} spacing="lg" mt={50} className="todo-list">
            <DragAndDropSection status={STATUS.Todo} items={data.todo}/>
            <DragAndDropSection status={STATUS.Doing} items={data.doing}/>
            <DragAndDropSection status={STATUS.Done} items={data.done}/>
        </SimpleGrid>
    );
};

export default ToDoList;