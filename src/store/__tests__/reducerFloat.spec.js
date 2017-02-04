
import { expect } from 'chai';
import { floatReducer } from '../reducer';
import * as actions from '../actions';

const { addFloat, removeFloat, updateFloat } = actions;

const id = 1;

describe('floatReducer', () => {
  it('should add a new float', () => {
    const state = {};
    const nextState = {
      [id]: {
        id,
        width: 10,
        height: 10,
        x: 10,
        y: 10,
        open: true,
        layout: 1
      }
    };
    const data = {
      id,
      width: 10,
      height: 10,
      x: 10,
      y: 10,
      open: true,
      layout: 1
    };
    expect(
      floatReducer(state, addFloat(data))
    ).to.deep.equal(
      nextState
    );
  });
  it('should remove a float', () => {
    const state = {
      [id]: {
        id
      }
    };
    const nextState = {};
    expect(
      floatReducer(state, removeFloat(id))
    ).to.deep.equal(
      nextState
    );
  });
  it('should update a float', () => {
    const state = {
      [id]: {
        id,
        width: 10,
        height: 10,
        x: 10,
        y: 10,
        open: true,
        layout: 1
      }
    };
    const nextState = {
      [id]: {
        id,
        width: 20,
        height: 10,
        x: 15,
        y: 10,
        open: true,
        layout: 1
      }
    };
    const data = {
      width: 20,
      x: 15
    };
    expect(
      floatReducer(state, updateFloat(id, data))
    ).to.deep.equal(
      nextState
    );
  });
});
