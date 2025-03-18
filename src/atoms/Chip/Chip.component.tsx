import {Chip} from "@mantine/core";

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
            {value}
        </Chip>
    );
};

export default ChipItem;