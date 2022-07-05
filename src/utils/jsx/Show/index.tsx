import { Children } from 'react';

import { JSX, Nullable } from '../../../interfaces';
import If from '../If';
import { ElseProps, ShowChildren, ShowProps } from './interface';

const Show = ({ children }: ShowProps): JSX => {
  let when: Nullable<ShowChildren> = null;
  let otherwise: Nullable<ShowChildren> = null;

  Children.forEach(children, (children: ShowChildren): void => {
    const {
      props: { isTrue },
    } = children;

    if (isTrue === undefined) {
      otherwise = children;
    } else if (!when && isTrue) {
      when = children;
    }
  });

  return when || otherwise;
};

Show.When = If;
Show.Else = ({ children }: ElseProps): JSX => children;

export default Show;
