import {Alert} from "@mantine/core";
import {IconInfoCircle} from "@tabler/icons-react";

interface AlertProps {
    type?: string;
    message: string;
}

const AlertItem = ({type, message}: AlertProps) => {
    return (
        <Alert
            variant="light"
            color={type === "error" ? "red" : "blue"}
            icon={<IconInfoCircle/>}>
            {message}
        </Alert>
    );
};

export default AlertItem;