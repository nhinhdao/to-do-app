import {Button, Group} from "@mantine/core";

interface ConfirmDeleteProps {
    onConfirmClick: () => void;
    onCancelClick: () => void;
}

const ConfirmDelete = ({onConfirmClick, onCancelClick}: ConfirmDeleteProps) => {
    return (
        <div>
            <p>Perform this action will permanently delete the task.</p>
            <Group mt="xl">
                <Button variant="default" onClick={onCancelClick}>Cancel</Button>
                <Button variant="filled" onClick={onConfirmClick}>Proceed</Button>
            </Group>
        </div>
    );
};

export default ConfirmDelete;