import {bootstrap} from 'angular2/platform/browser';
import {provide} from 'angular2/core';
import {createStore, combineReducers} from 'redux';
import {ActionCreator} from './actionCreator';
import {todos, currentFilter} from './reducers';
import {App} from './components/app';


// this allows us to have multiple reducers
const reducers = combineReducers({
    todos,
    currentFilter
});
//const appStore = createStore(rootReducer);
const store = createStore(reducers);

bootstrap(App, [
    provide('AppStore', {useValue: store}),
    ActionCreator
]).catch(err => console.error(err));