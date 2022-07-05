import { Children, ReactElement } from 'react';

import { ForProps } from './inteface';

const For = <T, U extends JSX.Element | ReactElement>({ each, children }: ForProps<T, U>): U[] | any =>
  Children.toArray(each.map((item: T, index: number): U => children(item, index)));

export default For;
