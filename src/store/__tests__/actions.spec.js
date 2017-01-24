
import { expect } from 'chai';
import * as actions from '../actions';

const keys = Object.keys;

describe('actions', () => {
  it('should have a type and a payload', () => {
    keys(actions).forEach(key => {
      const creator = actions[key];
      if (typeof action === 'function') {
        const action = creator({});
        expect(action).to.have.property('type');
        expect(action).to.have.property('payload');
      }
    });
  });
  it('should be `name === value`', () => {
    keys(actions).forEach(key => {
      const type = actions[key];
      if (typeof action === 'string') {
        expect(type).to.equal(key);
      }
    });
  });
});
