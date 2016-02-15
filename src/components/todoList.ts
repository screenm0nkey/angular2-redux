import {Component, Inject, Input, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy, OnChanges} from 'angular2/core';
import {Todo} from './todo';
import {VisibleTodosPipe} from '../pipes/visibleTodosPipe';
import {AppStore} from '../interfaces/ReduxInterface';
import {Todo} from '../interfaces/ToDoInterface';

@Component({
    selector: 'todo-list',
    directives: [Todo],
    pipes: [VisibleTodosPipe],
    changeDetection: ChangeDetectionStrategy.OnPush,
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
export class TodoList implements OnChanges {
    @Input('todos') todos:Todo[];
    @Input('currentFilter') currentFilter;

    ngOnChanges() {
        console.log(this);
    }
}

