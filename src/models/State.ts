import {Todo} from "./todo";

interface State {
    todos :Todo[];
    currentFilter : string;
}
export {State}