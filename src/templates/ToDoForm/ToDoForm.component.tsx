import {Button, Group, Textarea, TextInput} from "@mantine/core";
import {ChangeEvent, FormEvent, useEffect, useState} from "react";
import "./ToDoForm.styles.css"
import ChipItem from "../../atoms/Chip/Chip.component.tsx";
import {Todo, TodoForm} from "../../atoms/Constants/Interfaces.ts";
import {STATUS} from "../../atoms/Constants/Status.ts";

interface ToDoFormProps {
    task? : Todo;
    handleSubmit: (todo: Todo) => void;
}

const INITIAL_VALUES: TodoForm = {
    name: "",
    content: "",
    status: STATUS.Todo
}

const ToDoForm = ({task, handleSubmit}: ToDoFormProps) => {
    const [formValues, setFormValues] = useState<TodoForm>(INITIAL_VALUES);

    useEffect(() => {
        if (task != null){
            setFormValues(task);
        }
    }, [task]);

    const handleClearInput = () => {
        if (task != null){
            setFormValues({
                ...task,
                name: "",
                content: "",
            });
        }
        else {
            setFormValues(INITIAL_VALUES);
        }
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormValues(prevState => {
            return {
                ...prevState,
                [e.target.name] : e.target.value
            };
        });
    };

    const handleChipClick = (type: string, value: string) => {
        setFormValues(prevState => {
            return {
                ...prevState,
                [type] : value
            };
        });
    };

    const onFormSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        handleSubmit({
            id: performance.now(),
            ...formValues,
        });
    };

    return (
        <div className="to-do-form">
            <form onSubmit={onFormSubmit}>
                <div className="flex row">
                    <span className="row-header">Status:</span>
                    <Group>
                        {Object.values(STATUS).map((value: string) => (
                            <ChipItem
                                key={value}
                                checked={formValues.status === value}
                                value={value}
                                handleClick={() => handleChipClick("status", value)}/>
                        ))}
                    </Group>
                </div>

                <div className="row">
                    <TextInput
                        required
                        withAsterisk
                        maxLength={40}
                        label="Name"
                        name="name"
                        value={formValues.name}
                        onChange={handleChange}/>
                </div>

                <div className="row">
                    <Textarea
                        required
                        withAsterisk
                        maxLength={100}
                        label="Content"
                        name="content"
                        value={formValues.content}
                        onChange={handleChange}/>
                </div>

                <Group justify="flex-end" mt="xl">
                    <Button
                        variant="default"
                        type="button"
                        onClick={handleClearInput}>Clear</Button>
                    <Button type="submit">Submit</Button>
                </Group>
            </form>
        </div>
    )
}

export default ToDoForm;