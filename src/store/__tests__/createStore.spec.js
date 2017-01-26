
import sinon from 'sinon/pkg/sinon';
import { expect } from 'chai';
import createStore from '../createStore';

describe('createStore', () => {
  it('should create an empty store', () => {
    const store = createStore();
    const state = store.getState();
    expect(state.layouts).to.deep.equal({});
    expect(state.containers).to.deep.equal({});
    expect(state.floats).to.deep.equal({});
    expect(state.components).to.deep.equal({});
  });
  it('should return the layer', () => {
    const defaultState = { layouts: { 1: 1 } };
    const store = createStore(defaultState);
    expect(store.getLayout(1)).to.equal(1);
  });
  it('should return the component', () => {
    const defaultState = { components: { 1: 1 } };
    const store = createStore(defaultState);
    expect(store.getComponent(1)).to.equal(1);
  });
  it('should return the float', () => {
    const defaultState = { floats: { 1: 1 } };
    const store = createStore(defaultState);
    expect(store.getFloat(1)).to.equal(1);
  });
  it('should return the container', () => {
    const defaultState = { containers: { 1: 1 } };
    const store = createStore(defaultState);
    expect(store.getContainer(1)).to.equal(1);
  });
  it('should dispatch an action and suscribe ', () => {
    const reducer = sinon.spy();
    const cbSuscribe = sinon.spy();
    const action = { type: 'foo' };
    const store = createStore(undefined, reducer);
    store.subscribe(cbSuscribe);
    store.dispatch(action);
    store.dispatch(action, /* don't execute listeners */ false);
    expect(reducer.withArgs(action).calledTwice);
    expect(cbSuscribe.calledOnce);
  });
});
