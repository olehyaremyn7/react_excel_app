import React, { FC, useId } from 'react';

import { JSX } from '../../../interfaces';
import { InputProps } from './interface';

const Input: FC<InputProps> = ({
  type,
  value,
  className,
  onChange,
  autoComplete = 'off',
  placeholder = '',
  spellCheck = false,
  ...attrs
}): JSX => {
  const id = useId();
  const inputType = type ?? 'text';

  return (
    <input
      autoComplete={autoComplete}
      spellCheck={spellCheck}
      placeholder={placeholder}
      className={className}
      name={id}
      type={inputType}
      value={value}
      onChange={onChange}
      {...attrs}
    />
  );
};

export default Input;
