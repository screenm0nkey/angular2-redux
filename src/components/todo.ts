import {Component, ContentChildren, Inject, ChangeDetectionStrategy} from 'angular2/core';
import {TodosActionCreator} from '../actionCreator';
import {AppStore} from '../interfaces/ReduxInterface';

@Component({
    selector: 'todo',
    changeDetection: ChangeDetectionStrategy.OnPush,
    inputs: ['completed', 'id'],
    template: `
        <li [style.cursor]="'pointer'">
            <span
                (click)="toggleTodo(id)"
                [style.textDecoration]="completed?'line-through':'none'">
                <ng-content></ng-content>
            </span>
            <span (click)="removeTodo(id)">[remove]</span>
        </li>
    `
})
export class Todo {
    constructor(
        @Inject('AppStore') private appStore:AppStore,
        private todoActions:TodosActionCreator) {}

    private toggleTodo(id) {
        this.appStore.dispatch(this.todoActions.toggleTodo(id));
    }

    private removeTodo(id) {
        this.appStore.dispatch(this.todoActions.removeTodo(id));
    }
}