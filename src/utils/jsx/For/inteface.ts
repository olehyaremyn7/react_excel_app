export interface ForProps<T, U> {
  each: readonly T[];
  children: (item: T, index: number) => U;
}
