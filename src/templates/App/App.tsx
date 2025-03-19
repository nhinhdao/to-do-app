import '@mantine/core/styles.css';
import {Container, Group} from "@mantine/core";
import Header from "../../organisms/Header/Header.component.tsx";
import ToDoList from "../ToDoList/ToDoList.component.tsx";

function App() {
    return (
        <Container size="xl">
            <Header />

            <Group justify="center">
                <span id="confettiReward"/>
            </Group>

            <ToDoList/>


        </Container>
    );
};

export default App
