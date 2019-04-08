import { stubUser } from './__stubs__';

describe('User', () => {
  it('should allow the assignment of a name', () => {
    const name = 'Foo';
    const user = stubUser({ name });
    expect(user.name).toBe(name);
  });
});
