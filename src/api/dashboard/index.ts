import { DELAY } from 'src/constants';

import { TableRecord } from '../../redux/reducers/dashboard/interface';
import { defaultTableState } from '../../redux/reducers/excel/default';
import { TableState } from '../../redux/reducers/excel/interface';
import { delay, storage } from '../../utils';

export const fetch = async (): Promise<TableRecord[]> => {
  const tables = storage<TableState[]>('tables') ?? [];
  const records = tables.map(
    ({ id, title, createdDate, openedDate }: TableRecord): TableRecord => ({
      id,
      title,
      createdDate,
      openedDate,
    }),
  );

  await delay(DELAY);

  return records;
};

export const create = async (): Promise<TableRecord> => {
  const tables = storage<TableState[]>('tables') ?? [];
  const table = defaultTableState();

  storage('tables', [...tables, table]);

  await delay(DELAY);

  const { id, title, createdDate, openedDate } = table;

  return {
    id,
    title,
    createdDate,
    openedDate,
  };
};
