import reducer from './reducer';

const { assign } = Object;

export default function createStore(state) {
  const store = {
    state: assign({}, state || {
      layouts: [],
      containers: [],
      floats: [],
      components: []
    }),
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
    getLayout(id) {
      return store.state.layouts[id];
    },
    getContainer(id) {
      return store.state.containers[id];
    },
    getComponent(id) {
      return store.state.components[id];
    },
    getState() {
      return store.state;
    },
    subscribe(listener) {
      store.listeners.push(listener);
    }
  };
}
