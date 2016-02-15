import {Component, Inject, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy} from 'angular2/core';
import {Todo} from './todo';
import {VisibleTodosPipe} from '../pipes/visibleTodosPipe';
import {AppStore} from '../interfaces/ReduxInterface';
import {Todo} from '../interfaces/ToDoInterface';

@Component({
    selector: 'todo-list',
    changeDetection: ChangeDetectionStrategy.OnPush,
    directives: [Todo],
    pipes: [VisibleTodosPipe],
    template: `
        <ul>
          <todo
            *ngFor="#todo of todos | visibleTodos:currentFilter"
            [completed]="todo.completed"
            [id]="todo.id">
                {{todo.text}}
          </todo>
        </ul>
    `
})
export class TodoList implements OnDestroy {
    unsubscribe : Function;
    currentFilter : string;
    todos:Todo[] = [];

    constructor(
        private ref: ChangeDetectorRef,
        @Inject('AppStore') private appStore:AppStore
    )
    {
        this.unsubscribe = this.appStore.subscribe(()=> {
            let state = this.appStore.getState();
            this.currentFilter = state.currentFilter;
            this.todos = state.todos;
            this.ref.markForCheck();
        });
    }

    private ngOnDestroy() {
        //remove listener
        this.unsubscribe();
    }
}

