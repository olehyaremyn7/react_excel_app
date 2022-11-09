import { createUID } from '../index';

describe('Utils module', (): void => {
  test('createUID() should return unique id', (): void => {
    const idOne: string = createUID();
    const idTwo: string = createUID();

    expect(idOne).not.toEqual(idTwo);
  });
});
