import {Component, Inject} from 'angular2/core';
import {TodosActionCreator} from '../actionCreator';
import {AppStore} from '../interfaces/ReduxInterface';

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
        private todoActions:TodosActionCreator
    ) {}


    private addTodo(input) {
        if (input.value) {
            this.appStore.dispatch(this.todoActions.addTodo(input.value));
            input.value = '';
        }
    }
}