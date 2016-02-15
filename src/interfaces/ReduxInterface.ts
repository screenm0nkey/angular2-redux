interface AppStore {
    dispatch : { (source: Object): void;}
    subscribe : Function;
    getState : Function;
}
export {AppStore}