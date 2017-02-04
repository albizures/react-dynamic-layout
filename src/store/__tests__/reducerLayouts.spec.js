
import { expect } from 'chai';
import { layoutReducer } from '../reducer';
import * as actions from '../actions';

const {
  addLayout,
  removeLayout,
  updateLayout,
  addLayoutContainer,
  removeLayoutContainer,
  addLayoutFloat,
  removeLayoutFloat
} = actions;

const id = 1;
const child = 2;

describe('layoutReducer', () => {
  it('should add a new layout', () => {
    const state = {};
    const data = {
      id,
      type: 'type',
      name: 'name',
      hiddenType: 'hiddenType',
      resize: true
    };
    const nextState = {
      [id]: {
        id,
        type: 'type',
        name: 'name',
        hiddenType: 'hiddenType',
        resize: true,
        containers: [],
        floats: []
      }
    };
    expect(
      layoutReducer(state, addLayout(data))
    ).to.deep.equal(
      nextState
    );
  });
  it('should remove a layout', () => {
    const state = {
      [id]: {
        id
      }
    };
    const nextState = {};
    expect(
      layoutReducer(state, removeLayout(id))
    ).to.deep.equal(
      nextState
    );
  });
  it('should update a layout', () => {
    const state = {
      [id]: {
        id,
        type: 'type',
        name: 'name',
        hiddenType: 'hiddenType',
        resize: true,
        containers: [],
        floats: []
      }
    };
    const nextState = {
      [id]: {
        id,
        type: 'new type',
        name: 'new name',
        hiddenType: 'hiddenType',
        resize: true,
        containers: [],
        floats: []
      }
    };
    const data = {
      type: 'new type',
      name: 'new name'
    };
    expect(
      layoutReducer(state, updateLayout(id, data))
    ).to.deep.equal(
      nextState
    );
  });
  it('should add a container into a layout', () => {
    const state = {
      [id]: {
        containers: []
      }
    };
    const nextState = {
      [id]: {
        containers: [child]
      }
    };
    expect(
      layoutReducer(state, addLayoutContainer(id, child))
    ).to.deep.equal(
      nextState
    );
  });
  it('should remove a container of the layout', () => {
    const state = {
      [id]: {
        containers: [child]
      }
    };
    const nextState = {
      [id]: {
        containers: []
      }
    };
    expect(
      layoutReducer(state, removeLayoutContainer(id, child))
    ).to.deep.equal(
      nextState
    );
  });
  it('should add a float into a layout', () => {
    const state = {
      [id]: {
        floats: []
      }
    };
    const nextState = {
      [id]: {
        floats: [child]
      }
    };

    expect(
      layoutReducer(state, addLayoutFloat(id, child))
    ).to.deep.equal(
      nextState
    );
  });
  it('should remove a float of the layout', () => {
    const state = {
      [id]: {
        floats: [child]
      }
    };
    const nextState = {
      [id]: {
        floats: []
      }
    };
    expect(
      layoutReducer(state, removeLayoutFloat(id, child))
    ).to.deep.equal(
      nextState
    );
  });
});
