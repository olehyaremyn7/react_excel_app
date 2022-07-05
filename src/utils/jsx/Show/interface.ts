import { ReactElement } from 'react';

export interface ShowChildrenProps {
  isTrue: boolean;
}

export type ShowChildren = ReactElement<ShowChildrenProps>;

export interface ShowProps {
  children: ShowChildren | ShowChildren[];
}

export interface ElseProps {
  children: ReactElement;
}
