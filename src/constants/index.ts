import { TableCellPosition } from '../excel/interfaces';
import { Codes } from '../interfaces';

export const CODES: Codes = {
  A: 65,
  Z: 90,
};

export const START_SELECTED_CELL_POSITION: TableCellPosition = {
  row: 0,
  column: 0,
};

export const DEFAULT_ROWS_COUNT = 35;
export const DEFAULT_TABLE_TITLE = 'New table';
export const RESIZER_POSITION_VALUE = -5000;
export const DEFAULT_CELL_WIDTH = 120;
export const DEFAULT_CELL_HEIGHT = 24;
export const DECISION_DELETE_TABLE_TEXT = 'Are you sure you want to delete this table?';
export const DELAY = 200;
export const DASHBOARD_PAGE_DOCUMENT_TITLE = 'Dashboard';
