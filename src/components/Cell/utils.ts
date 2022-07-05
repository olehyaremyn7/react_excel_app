import { CSSProperties } from 'react';

import { createCellPosition } from '../../excel/utils';
import { TableParts, ToolbarStyles } from '../../redux/reducers/excel/interface';
import { toPixels } from '../../utils';
import { TablePartsDataAttributes, TableResizeType } from '../Table/interface';
import { CellPartAttributes } from './interface';

export const createCellAttributes = (tablePart: TableParts, column: number, row: number): CellPartAttributes => ({
  [TablePartsDataAttributes.TABLE_PART]: tablePart,
  [TablePartsDataAttributes.COLUMN_PART_POSITION]: column,
  [TablePartsDataAttributes.ROW_PART_POSITION]: row,
  [TablePartsDataAttributes.CELL_PART_POSITION]: createCellPosition(row, column),
  [TablePartsDataAttributes.TABLE_RESIZE_TYPE]: TableResizeType.NOT_RESIZABLE,
});

export const createCellPartStyles = (width: number, styles: ToolbarStyles): CSSProperties => ({
  width: toPixels(width),
  ...styles,
});
