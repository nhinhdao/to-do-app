import {StateMap, Todo} from "./Interfaces.ts";
import {STATUS} from "./Status.ts";

export const DefaultState: StateMap = new Map<string, Todo[]>([
    [STATUS.Todo, []],
    [STATUS.Doing, []],
    [STATUS.Done, []]
])