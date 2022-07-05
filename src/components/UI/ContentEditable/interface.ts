import { ChangeEvent, CSSProperties, KeyboardEvent, LegacyRef, MouseEvent } from 'react';

export interface ContentEditableProps {
  reference: LegacyRef<HTMLDivElement>;
  className: string;
  styles?: CSSProperties | undefined;
  spellCheck?: boolean;
  onInput(event: ChangeEvent<HTMLInputElement>): void;
  onMouseDown?(event: MouseEvent<HTMLDivElement>): void;
  onKeyDown?(event: KeyboardEvent<HTMLDivElement>): void;
}
