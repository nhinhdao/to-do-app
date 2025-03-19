import {createRoot} from 'react-dom/client';
import './index.css';
import '@mantine/notifications/styles.css';
import {MantineProvider} from '@mantine/core';
import {TodoProvider} from "./templates/TodoContext/ToDoContext.component.tsx";
import {Notifications} from "@mantine/notifications";
import App from "./templates/App/App.tsx";
import {theme} from "./atoms/Theme/theme.ts";
import "./assets/fonts.css"

createRoot(document.getElementById('root')!).render(
    <TodoProvider>
        <MantineProvider theme={theme}>
            <Notifications className="notification" autoClose={1500} position='top-center'/>
            <App/>
        </MantineProvider>
    </TodoProvider>
)
