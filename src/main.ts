import {bootstrap} from 'angular2/platform/browser';
import {provide} from 'angular2/core';
import {createStore, combineReducers} from 'redux';
import {ActionCreator} from './actionCreator';
import {todos, currentFilter} from './reducers';
import {App} from './components/app';


// this allows us to have multiple reducers
const todoApp = combineReducers({
    todos,
    currentFilter
});
//const appStore = createStore(rootReducer);
const appStore = createStore(todoApp);

bootstrap(App, [
    provide('AppStore', {useValue: appStore}),
    ActionCreator
]).catch(err => console.error(err));