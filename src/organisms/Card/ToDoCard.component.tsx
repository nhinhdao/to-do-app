import {Button, Card, Group} from "@mantine/core";
import {Todo} from "../../atoms/Constants/Interfaces.ts";
import "./ToDoCard.styles.css"
import {useState} from "react";
import ModalItem from "../../atoms/Modal/ModalItem.component.tsx";
import {IconEdit, IconTrash} from "@tabler/icons-react";
import {ActionTypes} from "../../atoms/Constants/Actions.ts";
import {notifications} from "@mantine/notifications";
import {useTodoDispatch} from "../../store/TodoReducer.ts";

interface ToDoCardProps {
    todo: Todo;
    handleEditTask: (task: Todo) => void;
}

const ToDoCard = ({todo, handleEditTask}: ToDoCardProps) => {
    const [openModal, setOpenModal] = useState<boolean>(false);
    const dispatch = useTodoDispatch();

    const onEditTaskClick = () => {
        handleEditTask(todo);
    };

    const handleDeleteTask = () => {
        setOpenModal(false);

        if (dispatch != null) {
            dispatch({
                type: ActionTypes.DELETE,
                payload: todo
            });

            notifications.show({message: 'Successfully deleted task'});
        }
    };

    return (
        <div className="todo-card">
            <Card padding="xxs">
                <Group justify="space-between">
                    <div className="todo-content">
                        <p className="header">{todo.name}</p>
                        <p className="text">{todo.content}</p>
                    </div>
                    <Group>
                        <IconEdit size={20} color="var(--mantine-color-cyan-9)" onClick={onEditTaskClick}/>
                        <IconTrash size={20} color="red" onClick={() => setOpenModal(true)}/>
                    </Group>
                </Group>
            </Card>

            <ModalItem
                opened={openModal}
                close={() => setOpenModal(false)}
                title="Are you sure?">
                <p>Perform this action will permanently delete the task.</p>
                <Group mt="xl">
                    <Button variant="default" onClick={() => setOpenModal(false)}>Cancel</Button>
                    <Button variant="filled" onClick={handleDeleteTask}>Proceed</Button>
                </Group>
            </ModalItem>
        </div>
    );
};

export default ToDoCard;