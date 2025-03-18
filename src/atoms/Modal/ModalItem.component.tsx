import {Modal} from "@mantine/core";
import {ReactNode} from "react";

interface ModalProps {
    opened: boolean;
    close: () => void;
    title: string;
    children: ReactNode;
}

const ModalItem = ({opened, close, title, children}: ModalProps) => {
    return (
        <Modal
            centered
            opened={opened}
            onClose={close}
            title={title}
            overlayProps={{backgroundOpacity: 0.3}}
            className="to-do-modal"
            styles={{
                title: {
                    fontSize: 20,
                    fontWeight: 600,
                    color: "var(--mantine-color-cyan-9)"
                },
                body: {
                    fontSize: 14,
                }
            }}>
            {children}
        </Modal>
    );
};

export default ModalItem;