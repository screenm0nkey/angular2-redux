//main entry point
import {bootstrap} from 'angular2/platform/browser';
import {provide} from 'angular2/core';

import {App} from './components/app';
import {createStore, combineReducers} from 'redux';
import {rootReducer} from './rootReducer';
import {TodoActions} from './actionCreator';
import {todo, todos, currentFilter} from './reducers';


// this allows us to have multiple reducers
const todoApp = combineReducers({
    todos,
    currentFilter
});
//const appStore = createStore(rootReducer);

const appStore = createStore(todoApp);

bootstrap(App, [
    provide('AppStore', {useValue: appStore}),
    TodoActions
]).catch(err => console.error(err));