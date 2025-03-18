import {Image} from "@mantine/core";
import "./NoTasks.styles.css"
import Img from "../../assets/no-tasks.png";

const NoTasks = () => {
    return (
        <div className="no-tasks">
            <Image
                h="auto"
                w="auto"
                fit="contain"
                src={Img}/>
            <h1>It seems you don't have any tasks</h1>
            <p>When you do, you will see them here</p>
        </div>
    );
};

export default NoTasks;