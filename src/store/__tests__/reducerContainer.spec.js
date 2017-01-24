
import { expect } from 'chai';
import { reducerContainers } from '../reducer';
import * as actions from '../actions';

const { addContainer, removeContainer, updateContainer } = actions;

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
});
