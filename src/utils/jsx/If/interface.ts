import { ReactElement } from 'react';

import { JSX } from '../../../interfaces';

export type IfChildren = ReactElement[] | JSX.Element[] | JSX | any;

export interface IfProps {
  isTrue: boolean | unknown;
  children: IfChildren;
}
