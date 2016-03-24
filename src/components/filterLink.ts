import {Component, ContentChildren, Input, Inject, OnInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef} from 'angular2/core';
import {ActionCreator} from '../actionCreator';
import {AppStore} from '../models/redux';
import {State} from "../models/state";

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
    @Input('filter') filter : string;
    state : State;
    filter:String;
    active : Boolean;
    unsubscribe : Function;

    constructor(
        @Inject('AppStore') private appStore:AppStore,
        private ref: ChangeDetectorRef,
        private actionCreator:ActionCreator
    ){
        this.state = this.appStore.getState();
        // this is alternative way to update the view, by explicitly calling markForCheck()
        // when a change to the store happens. The "todoList.ts" doesn't have to explicitly
        // call update because it's parent "App" view subscribes to the store and updates to the
        // todoList's @Inputs implicitly triggers a markForCheck();
        this.unsubscribe = this.appStore.subscribe((args) => {
            this.state = this.appStore.getState();
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
        this.appStore.dispatch(this.actionCreator.setCurrentFilter(filter));
    }

    private updateActive() {
        this.active = this.filter === this.state.currentFilter;
    }
}