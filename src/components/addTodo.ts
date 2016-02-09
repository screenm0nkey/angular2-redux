import {Component, Inject} from 'angular2/core';
import {TodoActions} from '../actionCreator';
import {AppStore} from './ReduxInterface';

@Component({
    selector: 'add-todo',
    template: `
    <div>
      <input #todo>
      <button (click)="addTodo(todo)">Add todo</button>
    </div>`
})
export class AddTodo {
    constructor(
        @Inject('AppStore') private appStore:AppStore,
        private todoActions:TodoActions) {}


    private addTodo(input) {
        if (input.value) {
            this.appStore.dispatch(this.todoActions.addTodo(input.value));
            input.value = '';
        }
    }
}