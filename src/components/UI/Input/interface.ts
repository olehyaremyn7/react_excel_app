import { ChangeEvent, FocusEvent, HTMLInputTypeAttribute, KeyboardEvent } from 'react';

export interface InputProps {
  type?: HTMLInputTypeAttribute;
  value: string;
  className: string;
  placeholder?: string;
  spellCheck?: boolean;
  autoComplete?: string;
  onChange(event: ChangeEvent<HTMLInputElement>): void;
  onInput?(event: ChangeEvent<HTMLInputElement>): void;
  onKeyDown?(event: KeyboardEvent<HTMLInputElement>): void;
  onFocus?(event: FocusEvent<HTMLInputElement>): void;
  onBlur?(): void;
}
