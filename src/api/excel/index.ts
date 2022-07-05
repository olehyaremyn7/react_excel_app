import { DELAY } from '../../constants';
import { Nullable } from '../../interfaces';
import { TableState } from '../../redux/reducers/excel/interface';
import { delay, storage } from '../../utils';

export const fetchById = async (tableId: string): Promise<Nullable<TableState>> => {
  const tables = storage<TableState[]>('tables') ?? [];
  const table = tables.find(({ id }: TableState): boolean => id === tableId) ?? null;

  await delay(DELAY);

  return table;
};

export const update = async (tableState: TableState): Promise<void> => {
  const { id: tableId } = tableState;
  const tables = storage<TableState[]>('tables') ?? [];
  const tableIndex = tables.findIndex(({ id }: TableState): boolean => id === tableId);

  tables[tableIndex] = {
    ...tableState,
  };

  storage('tables', tables);

  await delay(DELAY);
};

export const remove = async (tableId: string): Promise<string> => {
  const tables = storage<TableState[]>('tables') ?? [];

  storage(
    'tables',
    tables.filter(({ id }: TableState): boolean => id !== tableId),
  );

  await delay(200);

  return 'Table has been deleted';
};
