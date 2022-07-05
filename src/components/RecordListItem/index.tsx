import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { createExcelLink } from 'src/router/utils';

import { JSX } from '../../interfaces';
import { RecordListItemProps } from './interface';
import classes from './styles.module.scss';
import { createDateTime } from './utils';

const RecordsListItem: FC<RecordListItemProps> = ({ record }): JSX => {
  const { title, openedDate, id } = record;
  const date = createDateTime(openedDate);

  return (
    <li className={classes.Record}>
      <Link title={`Open ${title}`} className={classes.Title} to={createExcelLink(id)}>
        {title}
      </Link>
      <span className={classes.LastOpenDate}>{date}</span>
    </li>
  );
};

export default RecordsListItem;
