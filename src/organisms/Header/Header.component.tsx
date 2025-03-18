import {Button, Container, Group} from "@mantine/core";

interface HeaderProps {
    handleAddTask: () => void;
}

const Header = ({handleAddTask}: HeaderProps) => {
    return (
        <header>
            <Container size="xl" className="header-inner">
                <Group justify="space-between">
                    <h1>To Do List</h1>

                    <Button
                        variant="light"
                        onClick={handleAddTask}>
                        Add Task
                    </Button>
                </Group>
            </Container>
        </header>
    );
};

export default Header;