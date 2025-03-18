import {Todo} from "../../atoms/Constants/Interfaces.ts";
import {memo} from "react";
import {STATUS} from "../../atoms/Constants/Status.ts";
import {SimpleGrid} from "@mantine/core";
import {ActionTypes} from "../../atoms/Constants/Actions.ts";
import { notifications } from '@mantine/notifications';
import NoTasks from "../../organisms/NoTask/NoTasks.component.tsx";
import {useTodoDispatch, useTodos} from "../../store/TodoReducer.ts";
import ToDoSection from "../../organisms/TodoSection/ToDoSection.component.tsx";
import "./ToDoList.styles.css"
import {getMaxIndexTaskByStatus} from "../../utils/helpers.ts";

interface ToDoListProps {
    handleEditTask: (task: Todo) => void;
}

const ToDoList = ({handleEditTask}: ToDoListProps) => {
    const todos: Todo[] = useTodos();
    const dispatch = useTodoDispatch();

    const data: { todo: Todo[], doing: Todo[], done: Todo[] } = {
        todo: getMaxIndexTaskByStatus(todos, STATUS.Todo),
        doing: getMaxIndexTaskByStatus(todos, STATUS.Doing),
        done: getMaxIndexTaskByStatus(todos, STATUS.Done)
    };

    const DragAndDropSection = memo((({type, items} : {type: string, items: Todo[]}) => {
        return (
            <ToDoSection {...{type, items, handleEditTask, handleDeleteTask}}/>
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

    if (todos.length === 0){
        return <NoTasks/>;
    }

    return (
        <SimpleGrid cols={3} spacing="lg" mt={50} className="todo-list">
            <DragAndDropSection type={STATUS.Todo} items={data.todo}/>
            <DragAndDropSection type={STATUS.Doing} items={data.doing}/>
            <DragAndDropSection type={STATUS.Done} items={data.done}/>
        </SimpleGrid>
    );
};

export default ToDoList;