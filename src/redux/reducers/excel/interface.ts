import { CSSProperties } from 'react';

import { Nullable } from '../../../interfaces';

export interface ExcelState {
  toolbar: ToolbarState;
  formula: FormulaState;
  table: TableState;
  isLoading: boolean;
  error: Nullable<string>;
}

export type ToolbarStyles = Pick<CSSProperties, 'textAlign' | 'fontWeight' | 'textDecoration' | 'fontStyle'>;

export type ToolbarStylesKeys = keyof ToolbarStyles;

export interface ToolbarState {
  styles: ToolbarStyles;
}

export interface FormulaState {
  formulaValue: string;
  cellName: string;
}

export interface TableState {
  id: string;
  title: string;
  rowsCount: number;
  columns: TablePartsState;
  rows: TablePartsState;
  cells: TablePartsState;
  styles: CellsStylesState;
  createdDate: string;
  openedDate: string;
}

export enum TableParts {
  COLUMN = 'column',
  ROW = 'row',
  CELL = 'cell',
}

export interface TablePartsState {
  [id: number | string]: number | string;
}

export interface CellsStylesState {
  [id: string]: ToolbarStyles;
}

export interface ResizeState {
  id: number;
  value: number;
  type: TableParts;
}

export interface CellsDataPayload {
  id: string;
  value: string;
}

export interface CellsStylesPayload {
  ids: string[];
  style: ToolbarStyles;
}

export interface FormulaPayload extends FormulaState {}
