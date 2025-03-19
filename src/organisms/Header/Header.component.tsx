import {Container, Group} from "@mantine/core";
import NewTask from "../NewTask/NewTask.component.tsx";

const Header = () => {
    return (
        <header>
            <Container size="xl" className="header-inner">
                <Group justify="space-between">
                    <h1>To Do List</h1>
                    <NewTask />
                </Group>
            </Container>
        </header>
    );
};

export default Header;