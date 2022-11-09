import { createUID, isArrayEmpty } from '../index';

describe('Utils module', (): void => {
  test('createUID() should return id', (): void => {
    expect(createUID()).toBeTruthy();
  });

  test('createUID() should return unique id', (): void => {
    const idOne: string = createUID();
    const idTwo: string = createUID();

    expect(idOne).not.toEqual(idTwo);
  });

  test('isArrayEmpty() should return true if array is empty', (): void => {
    expect(isArrayEmpty([])).toBeTruthy();
  });

  test('isArrayEmpty() should return false if array is not empty', (): void => {
    expect(isArrayEmpty([1, 2, 3, 4, 5])).toBeFalsy();
  });
});
