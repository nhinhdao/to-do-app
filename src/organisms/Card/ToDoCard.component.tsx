import {Card, Group} from "@mantine/core";
import {StateProps, Todo, TodoActions} from "../../atoms/Constants/Interfaces.ts";
import "./ToDoCard.styles.css"
import {Dispatch, useState} from "react";
import ModalItem from "../../atoms/Modal/ModalItem.component.tsx";
import {IconEdit, IconTrash} from "@tabler/icons-react";
import {ActionTypes} from "../../atoms/Constants/Actions.ts";
import {useTodoDispatch, useTodos} from "../../store/TodoReducer.ts";
import ToDoForm from "../../templates/ToDoForm/ToDoForm.component.tsx";
import ConfirmDelete from "../../atoms/ConfirmDelete/ConfirmDelete.component.tsx";
import {useReward} from "react-rewards";
import {ConfettiConfig} from "../../atoms/Constants/ConfettiConfig.ts";
import {isTaskDone} from "../../utils/helpers.ts";
import {notifications} from "@mantine/notifications";

interface ToDoCardProps {
    todo: Todo;
}

interface ModalState {
    isConfirming: boolean;
    isEditing: boolean;
}

const InitialModalState: ModalState = {
    isConfirming: false,
    isEditing: false,
}

const ToDoCard = ({todo,}: ToDoCardProps) => {
    const data: StateProps = useTodos();
    const {reward: confettiReward} = useReward('confettiReward', 'emoji', ConfettiConfig);
    const dispatch: Dispatch<TodoActions> | null = useTodoDispatch();
    const [modal, setModal] = useState<ModalState>(InitialModalState);

    const hideModal = () => {
        setModal(InitialModalState);
    };

    const setModalState = (state?: Partial<ModalState>): void => {
        setModal({
            isConfirming: state?.isConfirming || false,
            isEditing: state?.isEditing || false,
        });
    };

    const handleDelete = (): void => {
        if (dispatch != null) {
            const type = modal.isEditing ? ActionTypes.UPDATE : ActionTypes.DELETE;
            dispatch({
                type: type,
                payload: todo
            });

            hideModal();
            notifications.show({message: `Successfully ${type}d task`});
        }
    };

    const handleUpdate = (formValues: Todo) => {
        const oldStatus = todo.status;
        const newStatus = formValues.status;
        const sourceCollection: Todo[] = [...data[oldStatus as keyof StateProps]];
        const destinationCollection: Todo[] = [...data[newStatus as keyof StateProps]];

        if (dispatch == null) return;

        // perform update on the same status
        if (oldStatus == newStatus) {
            dispatch({
                type: ActionTypes.UPDATE,
                payload: formValues
            });
        }
        else {
            const currentIndex = sourceCollection.findIndex(task => task.id === todo.id);
            // remove item from source list
            const [sourceTodo]: Todo[] = sourceCollection.splice(currentIndex, 1);
            sourceTodo.status = newStatus

            // add item to the destination list
            destinationCollection.push(sourceTodo);

            // set collections to new state
            const newState = {
                ...data,
                [oldStatus]: sourceCollection,
                [newStatus]: destinationCollection
            }

            dispatch({
                type: ActionTypes.SET,
                payload: newState
            });
        }

        hideModal();
        notifications.show({message: "Successfully updated task"});
        if (isTaskDone(oldStatus, newStatus)){
            confettiReward();
        }
    }

    return (
        <div className="todo-card">
            <Card padding="xxs">
                <Group justify="space-between">
                    <div className="todo-content">
                        <p className="header">{todo.name}</p>
                        <p className="text">{todo.content}</p>
                    </div>
                    <Group>
                        <IconEdit size={20} color="var(--mantine-color-cyan-9)" onClick={() => setModalState({isEditing: true})}/>
                        <IconTrash size={20} color="red" onClick={() => setModalState({isConfirming: true})}/>
                    </Group>
                </Group>
            </Card>

            <ModalItem
                opened={modal.isConfirming}
                close={hideModal}
                title="Are you sure?">
                <ConfirmDelete onConfirmClick={handleDelete} onCancelClick={hideModal}/>
            </ModalItem>

            <ModalItem
                opened={modal.isEditing}
                close={hideModal}
                title="Update Task">
                <ToDoForm task={todo} handleSubmit={handleUpdate}/>
            </ModalItem>
        </div>
    );
};

export default ToDoCard;