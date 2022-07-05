import React, { FC } from 'react';

import { JSX } from '../../../interfaces';
import { ContentEditableProps } from './interface';

const ContentEditable: FC<ContentEditableProps> = ({
  reference,
  className,
  styles,
  onInput,
  spellCheck = false,
  ...attrs
}): JSX => (
  <div
    ref={reference}
    spellCheck={spellCheck}
    className={className}
    style={styles}
    onInput={onInput}
    contentEditable
    suppressContentEditableWarning
    {...attrs}
  />
);

export default ContentEditable;
