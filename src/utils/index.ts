import { CSSProperties } from 'react';

import { Nullable, Timeout } from '../interfaces';

export const createUID = (): string => {
  const head = Date.now().toString(36);
  const tail = Math.random().toString(36).substring(2);

  return head + tail;
};

export function debounce(fn: Function, wait: number = 0): () => void {
  let timeout: Timeout;

  return function (this: unknown, ...args: []): void {
    const later = (): void => {
      clearTimeout(timeout);

      fn.apply(this, args);
    };

    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

export const toDatasetKey = (str: string): string =>
  str
    .replace('data-', '')
    .toLowerCase()
    .replace(/[^a-zA-Z0-9]+(.)/g, (m: string, chr: string): string => chr.toUpperCase())
    .slice(0);

export const storage = <T>(key: string, data: Nullable<T> = null): T | void => {
  if (!data) {
    const storedData = localStorage.getItem(key);

    if (storedData) {
      return JSON.parse(storedData);
    }
  }

  localStorage.setItem(key, JSON.stringify(data));
};

export const delay = (ms: number): Promise<void> => new Promise<void>((resolve) => setTimeout(() => resolve(), ms));

export const isArrayEmpty = <T>(arr: T): boolean => Array.isArray(arr) && arr.length === 0;

export const getCurrentDate = (): string => new Date().toJSON();

export const toPixels = <T>(prop: T): string => `${prop}px`;

export const addCSS = <T extends HTMLElement, U extends { [key in keyof CSSProperties]: string | number }>(
  $el: Nullable<T>,
  styles: U = {} as U,
): void =>
  (Object.keys(styles) as Array<keyof U>).forEach((key: keyof U): void => {
    if ($el) {
      $el.style[key as any] = String(styles[key]);
    }
  });

export const modifyClassList = <T extends HTMLElement>(
  $node: Nullable<T>,
  classes: string[],
  remove: boolean,
): void => {
  if (remove) {
    $node?.classList.remove(...classes);
  } else {
    $node?.classList.add(...classes);
  }
};

export const setTextContent = ($node: Nullable<HTMLDivElement>, value: string): void => {
  if ($node) {
    $node.textContent = value;
  }
};
