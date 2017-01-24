
import { expect } from 'chai';
import { reducerLayouts } from '../reducer';
import * as actions from '../actions';

const { addLayout, removeLayout, updateLayout } = actions;

describe('reducerLayous', () => {
  it('should add a new layout', () => {
    expect(
      reducerLayouts({}, addLayout({
        id: 1,
        type: 'type',
        name: 'name',
        hiddenType: 'hiddenType',
        resize: true
      }))
    ).to.deep.equal({
      1: {
        id: 1,
        type: 'type',
        name: 'name',
        hiddenType: 'hiddenType',
        resize: true,
        containers: [],
        floats: []
      }
    });
  });
  it('should remove a layout', () => {
    expect(
      reducerLayouts({
        1: {
          id: 1
        }
      }, removeLayout(1))
    ).to.deep.equal({});
  });
  it('should update a layout', () => {
    expect(
      reducerLayouts({
        1: {
          id: 1,
          type: 'type',
          name: 'name',
          hiddenType: 'hiddenType',
          resize: true,
          containers: [],
          floats: []
        }
      }, updateLayout(1, { type: 'new type', name: 'new name' }))
    ).to.deep.equal({
      1: {
        id: 1,
        type: 'new type',
        name: 'new name',
        hiddenType: 'hiddenType',
        resize: true,
        containers: [],
        floats: []
      }
    });
  });
});
