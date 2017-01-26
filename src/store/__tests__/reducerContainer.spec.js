
import { expect } from 'chai';
import { reducerContainers } from '../reducer';
import * as actions from '../actions';

const {
  addContainer,
  removeContainer,
  updateContainer,
  addContainerChild,
  removeContainerChild
} = actions;

const id = 1;
const child = 2;

describe('reducerContainers', () => {
  it('should add a new container', () => {
    expect(
      reducerContainers({}, addContainer({
        id: 1,
        components: [],
        size: 10,
        tabs: true
      }))
    ).to.deep.equal({
      1: {
        id: 1,
        components: [],
        size: 10,
        tabs: true
      }
    });
  });
  it('should remove a container', () => {
    expect(
      reducerContainers({
        1: {
          id: 1
        }
      }, removeContainer(1))
    ).to.deep.equal({});
  });
  it('should update a container', () => {
    expect(
      reducerContainers({
        1: {
          id: 1,
          components: [],
          size: 10,
          tabs: true
        }
      }, updateContainer(1, { size: 20 }))
    ).to.deep.equal({
      1: {
        id: 1,
        components: [],
        size: 20,
        tabs: true
      }
    });
  });
  it('should add a components into a container', () => {
    const state = {
      [id]: {
        components: []
      }
    };
    const nextState = {
      [id]: {
        components: [child]
      }
    };

    expect(
      reducerContainers(state, addContainerChild(id, child))
    ).to.deep.equal(
      nextState
    );
  });
  it('should remove a components of the container', () => {
    const state = {
      [id]: {
        components: [child]
      }
    };
    const nextState = {
      [id]: {
        components: []
      }
    };
    expect(
      reducerContainers(state, removeContainerChild(id, child))
    ).to.deep.equal(
      nextState
    );
  });
});
