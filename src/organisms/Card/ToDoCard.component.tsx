import {Button, Card, Group} from "@mantine/core";
import {Todo} from "../../atoms/Constants/Interfaces.ts";
import "./ToDoCard.styles.css"
import {useEffect, useState} from "react";
import {useDisclosure} from "@mantine/hooks";
import ModalItem from "../../atoms/Modal/ModalItem.component.tsx";
import {IconEdit, IconTrash} from "@tabler/icons-react";

interface ToDoCardProps {
    todo: Todo;
    handleEditTask: (task: Todo) => void;
    handleDeleteTask: (task: Todo) => void;
}

const ToDoCard = ({todo, handleEditTask, handleDeleteTask}: ToDoCardProps) => {
    const [toBeDeleted, setToBeDeleted] = useState<boolean>(false);
    const [opened, { open, close }] = useDisclosure(false);

    useEffect(() => {
        if (toBeDeleted) {
            close();
            handleDeleteTask(todo);
        }
    }, [toBeDeleted])

    const onEditTaskClick = () => {
        handleEditTask(todo);
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
                        <IconEdit
                            size={20}
                            color="var(--mantine-color-cyan-9)"
                            onClick={onEditTaskClick}/>
                        <IconTrash
                            size={20}
                            color="red"
                            onClick={open}/>
                    </Group>
                </Group>
            </Card>

            <ModalItem
                opened={opened}
                close={close}
                title="Are you sure?">
                <p>Perform this action will permanently delete the task.</p>
                <Group  mt="xl">
                    <Button variant="default" onClick={close}>Cancel</Button>
                    <Button variant="filled" onClick={() => setToBeDeleted(true)}>Proceed</Button>
                </Group>
            </ModalItem>
        </div>
    );
};

export default ToDoCard;