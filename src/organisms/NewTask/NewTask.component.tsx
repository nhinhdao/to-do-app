import {Button} from "@mantine/core";
import {Dispatch, useState} from "react";
import ToDoForm from "../../templates/ToDoForm/ToDoForm.component.tsx";
import ModalItem from "../../atoms/Modal/ModalItem.component.tsx";
import {Todo, TodoActions} from "../../atoms/Constants/Interfaces.ts";
import {useTodoDispatch} from "../../store/TodoReducer.ts";
import {ActionTypes} from "../../atoms/Constants/Actions.ts";
import {notifications} from "@mantine/notifications";
import {useReward} from "react-rewards";
import {ConfettiConfig} from "../../atoms/Constants/ConfettiConfig.ts";
import {STATUS} from "../../atoms/Constants/Status.ts";

const NewTask = () => {
    const [showForm, setShowForm] = useState<boolean>(false);
    const dispatch: Dispatch<TodoActions> | null = useTodoDispatch();
    const {reward: confettiReward} = useReward('confettiReward', 'emoji', ConfettiConfig);

    const handleSubmit = (task: Todo) => {
        if (dispatch != null) {
            dispatch({
                type: ActionTypes.ADD,
                payload: task
            });

            setShowForm(false);
            if (task.status === STATUS.Done) {
                confettiReward();
            }
            notifications.show({message: 'Successfully created task'});
        }
    };

    return (
        <div>
            <Button
                variant="light"
                onClick={() => setShowForm(true)}>
                Add Task
            </Button>
            <ModalItem
                opened={showForm}
                close={() => setShowForm(false)}
                title="Add Task">
                <ToDoForm handleSubmit={handleSubmit}/>
            </ModalItem>
        </div>
    );
};

export default NewTask;