import { containerReducer } from '../reducer';
import * as actions from '../actions';

const {
  addContainer,
  removeContainer,
  updateContainer,
  addContainerChild,
  removeContainerChild,
} = actions;

const id = 1;
const child = 2;

describe('containerReducer', () => {
  it('should add a new container', () => {
    expect(
      containerReducer(
        {},
        addContainer({
          id: 1,
          components: [],
          size: 10,
          tabs: true,
        }),
      ),
    ).toEqual({
      1: {
        id: 1,
        components: [],
        size: 10,
        tabs: true,
      },
    });
  });
  it('should remove a container', () => {
    expect(
      containerReducer(
        {
          1: {
            id: 1,
          },
        },
        removeContainer(1),
      ),
    ).toEqual({});
  });
  it('should update a container', () => {
    expect(
      containerReducer(
        {
          1: {
            id: 1,
            components: [],
            size: 10,
            tabs: true,
          },
        },
        updateContainer(1, { size: 20 }),
      ),
    ).toEqual({
      1: {
        id: 1,
        components: [],
        size: 20,
        tabs: true,
      },
    });
  });
  it('should add a components into a container', () => {
    const state = {
      [id]: {
        components: [],
      },
    };
    const nextState = {
      [id]: {
        components: [child],
      },
    };

    expect(containerReducer(state, addContainerChild(id, child))).toEqual(
      nextState,
    );
  });
  it('should remove a components of the container', () => {
    const state = {
      [id]: {
        components: [child],
      },
    };
    const nextState = {
      [id]: {
        components: [],
      },
    };
    expect(containerReducer(state, removeContainerChild(id, child))).toEqual(
      nextState,
    );
  });
});
