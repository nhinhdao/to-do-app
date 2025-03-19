import '@mantine/core/styles.css';
import {TodoActions, Todo, TodoForm} from "../../atoms/Constants/Interfaces.ts";
import {Dispatch, useCallback, useState} from "react";
import {ActionTypes} from "../../atoms/Constants/Actions.ts";
import {notifications} from "@mantine/notifications";
import {Container} from "@mantine/core";
import Header from "../../organisms/Header/Header.component.tsx";
import ToDoList from "../ToDoList/ToDoList.component.tsx";
import ModalItem from "../../atoms/Modal/ModalItem.component.tsx";
import ToDoForm from "../ToDoForm/ToDoForm.component.tsx";
import {useTodoDispatch} from "../../store/TodoReducer.ts";

function App() {
    const [showForm, setShowForm] = useState<boolean>(false);
    const [currentTask, setCurrentTask] = useState<Todo | null>(null);
    const dispatch: Dispatch<TodoActions> | null = useTodoDispatch();

    const handleAddTask = () => {
        setCurrentTask(null);
        setShowForm(true);
    }

    const handleEditTask = useCallback((task: Todo) => {
        setCurrentTask(task);
        setShowForm(true);
    }, []);

    const handleSubmit = (formValues: Todo | TodoForm) => {
        if (dispatch != null) {
            const id = "id" in formValues ? formValues.id : null
            const action = id ? ActionTypes.UPDATE : ActionTypes.ADD;
            const task = {
                // Generate a random id
                id: id || performance.now(),
                ...formValues,
            };

            dispatch({
                type: action,
                payload: task
            });

            setShowForm(false);
            notifications.show({message: `Successfully ${action}d task.`});
        }
    };


    return (
        <Container size="xl">
            <Header handleAddTask={handleAddTask} />

            <ToDoList {...{handleEditTask}}/>

            <ModalItem
                opened={showForm}
                close={() => setShowForm(false)}
                title={currentTask == null ? "Add Task" : "Update Task"}>
                <ToDoForm task={currentTask} handleSubmit={handleSubmit}/>
            </ModalItem>
        </Container>
    )
}

export default App
