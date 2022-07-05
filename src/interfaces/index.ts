import { ReactElement } from 'react';

export type Nullable<T> = T | null;

export interface Codes {
  A: number;
  Z: number;
}

export type JSX = ReactElement | JSX.Element | null;

export type Timeout = ReturnType<typeof setTimeout>;
