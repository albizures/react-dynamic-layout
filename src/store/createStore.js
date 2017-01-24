import defaultReducer from './reducer';

export default function createStore(state, reducer = defaultReducer) {
  const store = {
    state: {
      layouts: {},
      containers: {},
      floats: {},
      components: {},
      ...state
    },
    listeners: [],
    reducer
  };
  return {
    dispatch(action, listeners = true) {
      store.state = store.reducer(store.state, action);
      if (!listeners) return;
      for (let index = 0; index < store.listeners.length; index++) {
        store.listeners[index](store.state);
      }
    },
    getLayout: id => store.state.layouts[id],
    getFloat: id => store.state.floats[id],
    getContainer: id => store.state.containers[id],
    getComponent: id => store.state.components[id],
    getState: () => store.state,
    subscribe(listener) {
      store.listeners.push(listener);
    }
  };
}
