import { add, remove, update, addChild, removeChild } from '../reducer';

const id = 1;

describe('reducer', () => {
  it('should add a new item', () => {
    const state = {};
    const nextState = {
      [id]: { id },
    };
    expect(add(state, { id: 1 })).toEqual(nextState);
  });
  it('should remove an item', () => {
    const state = {
      [id]: { id },
    };
    const nextState = {};
    expect(remove(state, id)).toEqual(nextState);
  });
  it('should update an item', () => {
    const state = {
      [id]: { id },
    };
    const nextState = {
      [id]: {
        id,
        foo: 'foo',
      },
    };
    expect(update(state, { id, foo: 'foo' })).toEqual(nextState);
  });
  it('should add a new child', () => {
    const state = {
      [id]: {
        id,
        children: [],
      },
    };
    const nextState = {
      [id]: {
        id,
        children: ['foo'],
      },
    };
    expect(addChild(state, { id, child: 'foo' }, 'children')).toEqual(
      nextState,
    );
  });
  it('should remove a child', () => {
    const state = {
      [id]: {
        id,
        children: ['foo'],
      },
    };
    const nextState = {
      [id]: {
        id,
        children: [],
      },
    };
    expect(removeChild(state, { id, child: 'foo' }, 'children')).toEqual(
      nextState,
    );
  });
});
