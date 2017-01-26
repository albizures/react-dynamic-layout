import { expect } from 'chai';
import cuid from '../cuid';

describe('cuid', () => {
  it('should call the callback with the id', done => {
    const id = cuid(sameId => {
      expect(sameId).to.equal(id);
      done();
    });
  });
});
