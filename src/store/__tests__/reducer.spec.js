
import { expect } from 'chai';
import { add, remove, update, addChild, removeChild } from '../reducer';

const id = 1;

describe('reducer', () => {
  it('should add a new item', () => {
    const state = {};
    const newState = {
      [id]: { id }
    };
    expect(
      add(state, { id: 1 })
    ).to.deep.equal(
      newState
    );
  });
  it('should remove an item', () => {
    const state = {
      [id]: { id }
    };
    const newState = {};
    expect(
      remove(state, id)
    ).to.deep.equal(
      newState
    );
  });
  it('should update an item', () => {
    const state = {
      [id]: { id }
    };
    const newState = {
      [id]: {
        id,
        foo: 'foo'
      }
    };
    expect(
      update(state, { id, foo: 'foo' })
    ).to.deep.equal(
      newState
    );
  });
  it('should add a new child', () => {
    const state = {
      [id]: {
        id,
        children: []
      }
    };
    const newState = {
      [id]: {
        id,
        children: ['foo']
      }
    };
    expect(
      addChild(state, { id, child: 'foo' }, 'children')
    ).to.deep.equal(
      newState
    );
  });
  it('should remove a child', () => {
    const state = {
      [id]: {
        id,
        children: ['foo']
      }
    };
    const newState = {
      [id]: {
        id,
        children: []
      }
    };
    expect(
      removeChild(state, { id, child: 'foo' }, 'children')
    ).to.deep.equal(
      newState
    );
  });
});
