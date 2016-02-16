//our root app component
import {Component, Inject, OnDestroy} from 'angular2/core'
import {AddTodo} from './addTodo';
import {TodoList} from './todoList';
import {Filters} from './filters';
import {AppStore} from '../models/redux';
import {Todo} from '../models/todo';
import {State} from '../models/state';

@Component({
    selector: 'root',
    template: `
    <div>
      <add-todo></add-todo>
      <filters></filters>
      <todo-list [todos]="state?.todos" [currentFilter]="state?.currentFilter"></todo-list>
    </div>
    `,
    directives: [AddTodo, TodoList, Filters]
})
export class App implements OnDestroy {
    unsubscribe : Function;
    state : State;

    constructor(@Inject('AppStore') private appStore:AppStore) {
        this.unsubscribe = this.appStore.subscribe(()=> {
            this.state = this.appStore.getState();
        });
    }

    private ngOnDestroy() {
        //remove listener
        this.unsubscribe();
    }
}