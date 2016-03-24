import {Component, Inject} from 'angular2/core';
import {ActionCreator} from '../actionCreator';
import {AppStore} from '../models/redux';

@Component({
    selector: 'add-todo',
    template: `
    <div>
      <input #todoRef>
      <button (click)="addTodo(todoRef)">Add todo</button>
    </div>`
})
export class AddTodo {
    constructor(
        @Inject('AppStore') private appStore:AppStore,
        private actionCreator:ActionCreator
    ) {}

    private addTodo(input) {
        if (input.value) {
            this.appStore.dispatch(this.actionCreator.addTodo(input.value));
            input.value = '';
        }
    }
}