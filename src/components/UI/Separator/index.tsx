import React, { FC, memo } from 'react';

import { JSX } from '../../../interfaces';
import classes from './styles.module.scss';

const Separator: FC = (): JSX => (
  <div className={classes.Separator}>
    <div />
  </div>
);

export default memo(Separator, (): boolean => true);
