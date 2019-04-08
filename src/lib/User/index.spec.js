import { stubUser } from './__stubs__';

describe('User', () => {
  it('should allow the assignment of a name', () => {
    const name = 'Foo';
    const user = stubUser({ name });
    expect(user.name).toBe(name);
  });

  it('should allow the assignement of an id', () => {
    const id = '8675309';
    const user = stubUser({ id });
    expect(user.id).toBe(id);
  });
});
