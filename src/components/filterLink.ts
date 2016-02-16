import {Component, ContentChildren, Inject, OnInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef} from 'angular2/core';
import {TodosActionCreator} from '../actionCreator';
import {AppStore} from '../models/redux';

@Component({
    selector: 'filter-link',
    changeDetection: ChangeDetectionStrategy.OnPush,
    inputs: ['filter'],
    template: `
    <a href="#"
        (click)="applyFilter(filter);"
        [ngClass]="{'active': active, 'inactive': !active}">
        <ng-content></ng-content>
    </a>`
})
export class FilterLink implements OnInit, OnDestroy {
    filter:String;
    active : Boolean;
    unsubscribe : Function;

    constructor(
        @Inject('AppStore') private appStore:AppStore,
        private ref: ChangeDetectorRef,
        private todosActionCreator:TodosActionCreator
    ){
        // this is alternative way to update the view by subscribing to the store
        // and explicitly updating the view. see the "todoList" for a better way
        this.unsubscribe = this.appStore.subscribe(() => {
            this.updateActive();
            this.ref.markForCheck(); // force the view to update as it's using OnPush
        });

    }

    private ngOnInit() {
        //set initial state
        this.updateActive();
    }

    private ngOnDestroy() {
        //remove change listener
        this.unsubscribe();
    }

    // Helper methods
    private applyFilter(filter) {
        this.appStore.dispatch(this.todosActionCreator.setCurrentFilter(filter));
    }

    private updateActive() {
        this.active = this.filter === this.appStore.getState().currentFilter;
    }
}