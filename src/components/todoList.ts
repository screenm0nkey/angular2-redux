import {Component, Inject, Input, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy, OnChanges} from 'angular2/core';
import {Todo} from './todo';
import {VisibleTodosPipe} from '../pipes/visibleTodosPipe';
import {AppStore} from '../models/redux';
import {Todo} from '../models/todo';

@Component({
    selector: 'todo-list',
    directives: [Todo],
    pipes: [VisibleTodosPipe],
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <div *ngIf="!todos || !todos.length">There are no Todos</div>
        <ul *ngIf="todos && todos.length">
          <todo
            *ngFor="#todo of todos | visibleTodos:currentFilter"
            [completed]="todo.completed"
            [id]="todo.id">
                {{todo.text}}
          </todo>
        </ul>
    `
})
export class TodoList implements OnChanges {
    @Input('todos') todos:Todo[];
    @Input('currentFilter') currentFilter;

    ngOnChanges() {
        console.log(this);
    }
}

