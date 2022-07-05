import { DEFAULT_ROWS_COUNT as rowsCount, DEFAULT_TABLE_TITLE as title } from '../../../constants';
import { createUID, getCurrentDate } from '../../../utils';
import { TableState, ToolbarStyles } from './interface';

export const defaultStyles: ToolbarStyles = {
  textAlign: 'left',
  fontWeight: 'normal',
  textDecoration: 'none',
  fontStyle: 'normal',
};

export const defaultTableState = (): TableState => {
  const currentDate = getCurrentDate();

  return {
    id: createUID(),
    title,
    rowsCount,
    columns: {},
    rows: {},
    cells: {},
    styles: {},
    createdDate: currentDate,
    openedDate: currentDate,
  };
};
