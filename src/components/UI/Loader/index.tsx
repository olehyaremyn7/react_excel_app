import React, { FC } from 'react';

import { JSX } from '../../../interfaces';
import classes from './styles.module.scss';

const Loader: FC = (): JSX => (
  <div className={classes.Loader}>
    <div className={classes.Dot} />
    <div className={classes.Dot} />
    <div className={classes.Dot} />
  </div>
);

export default Loader;
