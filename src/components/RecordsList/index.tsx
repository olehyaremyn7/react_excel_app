import React, { FC, ReactElement } from 'react';
import { TableRecord } from 'src/redux/reducers/dashboard/interface';
import Show from 'src/utils/jsx/Show';

import { JSX } from '../../interfaces';
import { isArrayEmpty } from '../../utils';
import For from '../../utils/jsx/For';
import RecordListItem from '../RecordListItem';
import { RecordsListProps } from './interface';
import classes from './styles.module.scss';

const RecordsList: FC<RecordsListProps> = ({ records }): JSX => (
  <Show>
    <Show.When isTrue={!isArrayEmpty(records)}>
      <div className={classes.Table}>
        <header className={classes.Header}>
          <span>Name</span>
          <span>Date of last open</span>
        </header>

        <ul className={classes.List}>
          <For each={records}>
            {(record: TableRecord): ReactElement => {
              const { id } = record;

              return <RecordListItem key={id} record={record} />;
            }}
          </For>
        </ul>
      </div>
    </Show.When>
    <Show.Else>
      <div className={classes.NoRecords}>
        <p>You have not created any tables yet</p>
      </div>
    </Show.Else>
  </Show>
);

export default RecordsList;
