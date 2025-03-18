import {Chip} from "@mantine/core";
import {formatStatus} from "../../utils/helpers.ts";

interface ChipItemProps {
    checked: boolean;
    value: string;
    handleClick: () => void;
}

const ChipItem = (props: ChipItemProps) => {
    const {value, checked, handleClick} = props;

    return (
        <Chip
            size="xs"
            className={`chip ${value}`}
            checked={checked}
            onChange={handleClick}>
            {formatStatus(value)}
        </Chip>
    );
};

export default ChipItem;