
import { expect } from 'chai';
import { reducerFloats } from '../reducer';
import * as actions from '../actions';

const { addFloat, removeFloat, updateFloat } = actions;

describe('reducerFloats', () => {
  it('should add a new float', () => {
    expect(
      reducerFloats({}, addFloat({
        id: 1,
        width: 10,
        height: 10,
        x: 10,
        y: 10,
        open: true,
        layout: 1
      }))
    ).to.deep.equal({
      1: {
        id: 1,
        width: 10,
        height: 10,
        x: 10,
        y: 10,
        open: true,
        layout: 1
      }
    });
  });
  it('should remove a float', () => {
    expect(
      reducerFloats({
        1: {
          id: 1
        }
      }, removeFloat(1))
    ).to.deep.equal({});
  });
  it('should update a float', () => {
    expect(
      reducerFloats({
        1: {
          id: 1,
          width: 10,
          height: 10,
          x: 10,
          y: 10,
          open: true,
          layout: 1
        }
      }, updateFloat(1, { width: 20, x: 15 }))
    ).to.deep.equal({
      1: {
        id: 1,
        width: 20,
        height: 10,
        x: 15,
        y: 10,
        open: true,
        layout: 1
      }
    });
  });
});
