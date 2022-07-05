import { CODES, DEFAULT_CELL_HEIGHT, DEFAULT_CELL_WIDTH } from 'src/constants';

import { Nullable } from '../../interfaces';
import { defaultStyles } from '../../redux/reducers/excel/default';
import { TableParts, TablePartsState, ToolbarStyles } from '../../redux/reducers/excel/interface';
import { TableCell, TableCells } from '../interfaces';

export const isTableColumn = (value: number): boolean => value === 0;

export const isInGroupOneCell = (groupLength: number): boolean => groupLength === 1;

export const range = (begin: number, endExclusive: number): number[] => {
  if (begin > endExclusive) {
    [endExclusive, begin] = [begin, endExclusive];
  }

  return Array.from({ length: endExclusive - begin + 1 }, (_, index: number): number => begin + index);
};

export const getWidth = (state: TablePartsState, index: number): number =>
  (state[index] as number) || DEFAULT_CELL_WIDTH;

export const getHeight = (state: TablePartsState, index: number): number =>
  (state[index] as number) || DEFAULT_CELL_HEIGHT;

export const getRowIndex = (rowIndex: number): number => rowIndex - 1;

export const getCellRowIndex = (rowIndex: number): number => rowIndex + 1;

export const createCellPosition = (row: number, column: number): string => `${row}:${column}`;

export const isTableBoundaries = (cells: TableCells, column: number, row: number): boolean => {
  const MIN_VALUE = 0;

  return column < MIN_VALUE || column >= cells[MIN_VALUE].length || row < MIN_VALUE || row >= cells.length;
};

export const transformColumnLetterToIndex = (letter: string): number => {
  const { A } = CODES;

  return Math.abs(A - letter.toUpperCase().charCodeAt(0));
};

export const createCellName = (
  startCell: Nullable<TableCell>,
  endCell: Nullable<TableCell>,
  condition: boolean,
): string => {
  let currentCellName: string = startCell?.name!;

  if (condition) {
    currentCellName = `${currentCellName}:${endCell?.name!}`;
  }

  return currentCellName;
};

export const isResizeTypeColumn = (type: TableParts): boolean => type === TableParts.COLUMN;

export const createCellStyles = (styles: ToolbarStyles): ToolbarStyles => ({
  ...defaultStyles,
  ...styles,
});

export const shouldUpdateCellInFormula = (shouldUpdate: boolean, cell: TableCell): Nullable<TableCell> =>
  shouldUpdate ? null : cell;

export const isEnteredRowMoreThanCurrentRowCount = (row: number, cells: TableCells): number => {
  const cellsLength = cells.length;

  return row > cellsLength ? cellsLength : row;
};
