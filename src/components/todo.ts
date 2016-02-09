import {Component, ContentChildren, Inject, ChangeDetectionStrategy} from 'angular2/core';
import {TodoActions} from '../actionCreator';
import {AppStore} from './ReduxInterface';

@Component({
    selector: 'todo',
    changeDetection: ChangeDetectionStrategy.OnPush,
    inputs: ['completed', 'id'],
    template: `
        <li [style.textDecoration]="completed?'line-through':'none'">
          <span (click)="onTodoClick(id)"><ng-content></ng-content></span>
          <span [style.cursor]="'pointer'" (click)="removeTodo(id)">[remove]</span>
        </li>
    `
})
export class Todo {
    constructor(
        @Inject('AppStore') private appStore:AppStore,
        private todoActions:TodoActions) {}

    private onTodoClick(id) {
        this.appStore.dispatch(this.todoActions.toggleTodo(id));
    }

    private removeTodo(id) {
        this.appStore.dispatch(this.todoActions.removeTodo(id));
    }
}