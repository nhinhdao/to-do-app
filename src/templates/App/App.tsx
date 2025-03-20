import '@mantine/core/styles.css';
import {Container, Group, LoadingOverlay} from "@mantine/core";
import Header from "../../organisms/Header/Header.component.tsx";
import {StateMap} from "../../atoms/Constants/Interfaces.ts";
import {useTodos} from "../../store/TodoReducer.ts";
import {lazy, Suspense} from "react";
import {isTodosEmpty} from "../../utils/helpers.ts";
import NoTasks from "../../organisms/NoTask/NoTasks.component.tsx";
const ToDoList = lazy(() => import('../ToDoList/ToDoList.component.tsx'));


function App() {
    const data: StateMap = useTodos();

    const renderContent = () => {
        if (isTodosEmpty(data)) {
            return <NoTasks/>;
        }

        return <ToDoList/>;
    };

    return (
        <Suspense fallback={<LoadingOverlay visible={true} zIndex={1000}/>}>
            <Container size="xl">
                <Header />

                <Group justify="center">
                    <span id="confettiReward"/>
                </Group>

                {renderContent()}
            </Container>
        </Suspense>
    );
}

export default App;
