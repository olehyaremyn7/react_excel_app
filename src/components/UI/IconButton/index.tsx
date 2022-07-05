import './styles.scss';

import clsx from 'clsx';
import React, { FC } from 'react';

import { JSX } from '../../../interfaces';
import { ButtonProps } from './interface';

const IconButton: FC<ButtonProps> = ({
  title = '',
  onClick = () => {},
  disabled = false,
  iconName = '',
  color = 'primary',
  className = '',
  type = 'button',
  active = false,
}): JSX => (
  <button
    title={title}
    type={type}
    disabled={disabled}
    onClick={onClick}
    className={clsx('button', color, className && className, active && 'active')}
  >
    <i className={clsx('buttonIcon', 'material-icons')}>{iconName}</i>
  </button>
);

export default IconButton;
