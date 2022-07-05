import { Nullable } from '../../interfaces';
import { TableParts, ToolbarStyles } from '../../redux/reducers/excel/interface';
import { Cell } from '../Cell/Cell';
import { Column } from '../Column/Column';

export type TableRow = Cell[];
export type TableColumns = Column[];
export type TableColumn = Column;
export type TableCells = Cell[][];
export type TableCell = Cell;

export interface ITableSelection {
  getStartSelectedCell(): void;
  getCellByColumnLetterAndRow(row: number, columnLetter: string): TableCell;
  selectCell(selectedCell: TableCell): void;
  selectCellsGroup(selectedCell: TableCell): void;
  applyStyle(style: ToolbarStyles): void;
  navigateToNextSelectedCell(pressedKey: NavigationKeys): Promise<TableCell>;
  isCellInGroup(cell: TableCell): boolean;
  isCellSelected(cell: TableCell): boolean;
  compareCellsByRowAndColumnLetter(row: number, columnLetter: string, compareWithGroup: boolean): boolean;
  focusOnCurrentCell(): void;
  updateCurrentCellValue(cellValue: string, isValueFromFormula: boolean): void;
  readonly currentCell: Nullable<TableCell>;
  readonly currentCellValue: string;
  readonly selectedCellsCount: number;
  readonly selectedCellsGroupIds: string[];
}

export interface TableCellPosition {
  [TableParts.ROW]: number;
  [TableParts.COLUMN]: number;
}

export enum NavigationKeys {
  ENTER = 'Enter',
  TAB = 'Tab',
  ArrowRight = 'ArrowRight',
  ArrowDown = 'ArrowDown',
  ArrowUp = 'ArrowUp',
  ArrowLeft = 'ArrowLeft',
}

export enum FormulaEventKeys {
  ENTER = 'Enter',
  TAB = 'Tab',
}
