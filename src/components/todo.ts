import {Component, ContentChildren, Input, Inject, ChangeDetectionStrategy, OnChanges} from 'angular2/core';
import {ActionCreator} from '../actionCreator';
import {AppStore} from '../models/redux';

@Component({
    selector: 'todo',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <li>
            <span [style.textDecoration]="completed?'line-through':'none'">
                <ng-content></ng-content>
            </span>
            <a href="#" (click)="toggleTodo($event, id)">[Mark as {{completed ? 'Active' : 'Completed'}}]</a>
            <a href="#" (click)="removeTodo($event, id)">[x]</a>
        </li>
    `
})
export class Todo implements OnChanges {
    @Input('completed') completed:boolean;
    @Input('id') id : number;

    constructor(
        @Inject('AppStore') private appStore:AppStore,
        private todoActions:ActionCreator
    ) {}

    private toggleTodo(evt, id) {
        evt.preventDefault();
        let action = this.todoActions.toggleTodo(id);
        this.appStore.dispatch(action);
    }

    private removeTodo(evt, id) {
        evt.preventDefault();
        let action = this.todoActions.removeTodo(id);
        this.appStore.dispatch(action);
    }

    ngOnChanges() {
        console.log(this);
    }
}